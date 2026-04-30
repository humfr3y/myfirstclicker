let save_number = 1;

// --- УТИЛИТЫ ---

function toggleAutoSave() { player.settings.auto_save = !player.settings.auto_save; }
function toggleOfflineGain() { player.settings.offline = !player.settings.offline; }

// Умное получение ключа сохранения (больше никаких switch/case!)
const getSaveKey = (num = save_number) => num === 1 ? 'player' : `player${num}`;

// --- СОХРАНЕНИЕ И СБРОС ---

function performSave(isAuto = false) {
    // Защита от повреждения сейва NaN-значениями
    if (isNaN(player.coin.currency) || isNaN(player.prestige.currency) || isNaN(player.shard.currency) || isNaN(player.coin.total_currency)) {
        console.error("Save prevented: NaN detected in currencies!");
        return;
    }

    MISC.auto_save_timer = 0;

    // Временно обнуляем оффлайн-доходы, чтобы не раздувать размер сейва, но сохраняем их для текущей сессии
    let tempOffline = { ...player.offline_gain };
    if (player.offline_gain) {
        player.offline_gain.time = 0;
        player.offline_gain.coin = 0;
        player.offline_gain.supercoin = 0;
        player.offline_gain.crystal = 0;
        player.offline_gain.prestige = 0;
        player.offline_gain.shard = 0;
    }

    localStorage.setItem('SAVE_NUMBER', JSON.stringify(save_number));
    localStorage.setItem(getSaveKey(), JSON.stringify(player));
    if (!isAuto) notify(text.notification.save, 'limegreen');

    // Возвращаем доходы обратно в игру
    player.offline_gain = tempOffline;
}

function saveGame() { performSave(false); }
function autoSaveThis() { if (player.settings.auto_save) performSave(true); }

function doHardReset() {
    notify(text.notification.hard, "red");
    let currentSaveNum = JSON.parse(localStorage.getItem('SAVE_NUMBER')) || 1;
    localStorage.removeItem(getSaveKey(currentSaveNum));
    location.reload(); 
}

function chooseSave(number) {
    save_number = number;
    localStorage.setItem('SAVE_NUMBER', JSON.stringify(save_number));
    location.reload();
}

function updateNestedProperties(targetObj, sourceObj) {
    for (const key in sourceObj) {
        if (sourceObj.hasOwnProperty(key)) {
            if (typeof sourceObj[key] === 'object' && sourceObj[key] !== null && !Array.isArray(sourceObj[key])) {
                if (!targetObj[key]) targetObj[key] = {};
                updateNestedProperties(targetObj[key], sourceObj[key]);
            } else {
                targetObj[key] = sourceObj[key];
            }
        }
    }
}

// --- ЗАГРУЗКА ИГРЫ ---

function loadGame() {
    save_number = JSON.parse(localStorage.getItem('SAVE_NUMBER')) || 1;
    let storedData = localStorage.getItem(getSaveKey()); 

    if (localStorage.getItem('datasaving') != null && !storedData) {
        convert_save();
        updateNestedProperties(player, newData);
    } else if (storedData) {
        updateNestedProperties(player, JSON.parse(storedData));
    }

    // Восстановление после NaN
    if (isNaN(player.coin.currency)) player.coin.currency = 10;
    if (isNaN(player.coin.total_currency) || player.coin.total_currency < 0) player.coin.total_currency = 10;
    if (isNaN(player.prestige.currency)) { player.prestige.total_currency = 0; player.prestige.currency = 0; }
    if (isNaN(player.shard.currency)) player.shard.currency = 0;
    if (player.shard.currency < 0) player.shard.currency = 0;

    if (player.supercoin.total_currency > 1e7) {
        player.supercoin.total_currency = player.supercoin.spent_currency + player.supercoin.currency;
    }

    // Оффлайн прогресс
    GAIN.offline_gain();
    if (player.settings.offline) {
        player.offline_gain.time = MISC.offline();
        player.offline_gain.coin = GAIN.coin.offline();
        player.offline_gain.supercoin = GAIN.supercoin.offline();
        player.offline_gain.crystal = ACHS.has(22) ? GAIN.crystal.offline() : 0;
        player.offline_gain.prestige = MILESTONES.has(16) ? GAIN.prestige.offline() : 0;
        player.offline_gain.shard = UNL.shard.second.unl() ? GAIN.shard.offline() : 0;
    } else {
        Object.keys(player.offline_gain).forEach(k => { if (k !== 'daily') player.offline_gain[k] = 0; });
    }
    player.offline_gain.daily = GAIN.supercoin.daily.reward();

    resetDailyReward();

    // UI и Уведомления
    setTimeout(() => {
        notify(text.notification.load, 'limegreen');        
        showChangelog(text.changelog.start);
        showStory(text.chapter.start);
        showHelpPage(text.help.start, text.empty);
    }, 3000);
    
    if (!player.got_daily_reward) setTimeout(() => notify(text.notification.dailyRewardRestart, 'mediumspringgreen'), 5000);

    // Логика первого захода
    if (player.coin.total_currency === 10) {
        let userLang = navigator.language || navigator.userLanguage;
        player.settings.currentLanguage = (userLang.includes('ru')) ? 'ru' : 'en';
        openWindow('welcome', false);
        player.time.savedTime = Date.now();
    }

    // Восстановление настроек UI
    player.code.name = [];
    changeFonts2(player.settings.font);
    changeFont.value = player.settings.font;
    changeNotation.value = player.settings.notation;
    shopBulkBuyInput.value = player.settings.shop_bulkbuy;
    mySlider.value = player.settings.autosave_interval;
    mineralsBulkInput.value = player.settings.minerals_bulkbuy;

    // Восстановление условий автоматизации
    autoUmultiInput.value = player.automation.conditions.umultiplier;
    autoUpowerInput.value = player.automation.conditions.upower.time;
    autoUpowerInput2.value = player.automation.conditions.upower.x_of_umulti;
    autoUadderInput.value = player.automation.conditions.uadder.time;
    autoUadderInput2.value = player.automation.conditions.uadder.x_of_upower;

    // Режим престижа
    const pModes = { time: 'time', prestige: 'prestige', crystals: 'crystals' };
    let modeKey = pModes[player.settings.whichPrestigeMode] || 'coins';
    autoPrestigeInput.value = player.automation.conditions.prestige[modeKey];

    // ЗАПУСК АВТОМАТИЗАЦИИ ЧЕРЕЗ НАШИ НОВЫЕ КЛАССЫ
    const autoKeys = ['single', 'buyable', 'umultiplier', 'upower', 'prestige', 'uadder'];
    autoKeys.forEach(type => {
        if (player.automation.checkbox[type]) {
            // Чекбоксы в HTML имеют вид autoSingleUpgradeCheckbox, autoBuyableUpgradeCheckbox и т.д.
            const checkboxId = `auto${type.charAt(0).toUpperCase() + type.slice(1)}${type === 'single' || type === 'buyable' ? 'Upgrade' : ''}Checkbox`;
            const checkboxEl = document.getElementById(checkboxId);
            if (checkboxEl) checkboxEl.checked = true;
            
            // Запускаем через метод класса, который мы написали ранее!
            if (AUTO[type]) AUTO[type].start();
        }
    });

    if (!player.shop.unlockables.includes(0) && player.shop.unlockables.length != 0) {
        for (let i = 0; i < player.shop.unlockables.length; i++) {
        player.shop.unlockables[i]--
        }
        player.supercoin.currency += 250
    }

    player.settings.modernization_activated = false;
}

function resetDailyReward() {
    const currentDate = new Date();
    if (currentDate.getTime() > player.time.next_daily) { 
        let nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        player.time.next_daily = nextDay.getTime();
        player.got_daily_reward = false;
        player.fortune.daily_resets = player.fortune.upgrades.singles.includes(23) ? 20 : 10;
    }
}

// --- ИМПОРТ / ЭКСПОРТ ---

function exportSave() {
    notify(text.notification.export, 'limegreen');
    let base64 = btoa(JSON.stringify(player));
    navigator.clipboard.writeText(base64);
    
    let today = new Date();
    let date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    let a = document.createElement('a');
    a.download = `Digital-God-Save-${date}.txt`;
    a.href = URL.createObjectURL(new Blob([base64], {type: 'text/plain'}));
    a.click();
}

function importSave() {
    const base64 = prompt("Insert save in base64 format");
    if (base64) importing(base64);
}

function importing(base64) {
    try {
        let importedStr = base64.includes('|') ? atob(base64.split("|")[0]) : atob(base64);
        let parsed = JSON.parse(importedStr);
        
        if (base64.includes('|')) {
            localStorage.setItem('datasaving', importedStr);
            convert_save();
            updateNestedProperties(player, newData);
        } else {
            updateNestedProperties(player, parsed);
        }
        performSave(true);
        notify(text.notification.import, 'limegreen');
        location.reload();
    } catch (e) {
        console.error("Invalid save format!", e);
        notify("Save string is invalid or corrupted!", "red");
    }
}

let fileUpload = document.getElementById('file-upload');
let fileName = document.querySelector('.file-name');

if (fileUpload) {
    fileUpload.addEventListener('change', function(e) {
        let file = e.target.files[0];
        if (!file) return;
        fileName.textContent = file.name;
        let reader = new FileReader();
        reader.onload = function(evt) { importing(evt.target.result); };
        reader.readAsText(file);
        fileUpload.value = null;
    });
}

// --- СТАРЫЙ КОНВЕРТЕР СОХРАНЕНИЙ (ОПТИМИЗИРОВАННЫЙ) ---
let newData = {};

function convert_save() {
    let savedStr = localStorage.getItem('datasaving');
    if (!savedStr) return;
    
    console.log('CONVERTING OLD SAVE FORMAT...');
    let p = JSON.parse(savedStr); 

    // Базовый скелет
    newData = {
        clicks: { real: 0, simulated: 0, critical: 0, prestige: 0 },
        achievements: [], achievement_rows: [], shard_achievements: [],
        progressBarGoals: [0], umultipliers: 0, upowers: 0, uadders: 0, ureducers: 0,
        coin: { upgrades: {1:0, 2:0, 3:0, 4:0, 5:0}, singleUpgrades: [], superUpgrades: [0], currency: 10, total_currency: 10 },
        supercoin: { currency: 0, total_currency: 0, spent_currency: 0 },
        prestige: { upgrades: {1:0, 2:0}, singleUpgrades: [], break: { buyables: {1:0, 2:0, 3:0, 4:0, 5:0}, singles: [] }, milestones: [], currency: 0, total_currency: 0, broken_currency: 0, resets: 0, prestigeTable: {}, table_resets: 1 },
        shard: { upgrades: {1:0, 2:0, 3:0}, singleUpgrades: [], currency: 0, unlockables: [], consumed: { click: 0, second: 0, buyables: 0, singles: 0 }, achievements: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0} },
        shop: { upgrades: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0}, permanentUpgrades: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0}, unlockables: [], items: { amount: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0}, used: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0} } },
        supercrystal: { upgrades: [0], currency: 0, total_currency: 0, consumedShards: 0 },
        rune: { currency: 0, total_currency: 0 },
        minerals: { 1: 0, 2: 0, 3: 0 },
        time: { savedTime: Date.now(), currentTime: 0, game: { total: {timer:0}, prestige: {timer:0}, fastestPrestige: {timer:1e69}, average: {} }, real: { total: {timer:0}, prestige: {timer:0}, fastestPrestige: {timer:1e69}, daily: {timer:0}, average: {} }, next_daily: 0, umultiplier: 0, upower: 0, uadder: 0, ureducer: 0 },
        challenge: { completed: [], activated: 0, time: {} },
        tabs: { main: [], settings_sub: [], clicker_sub: [], info_sub: [], prestige_sub: [], multi_breakdown_sub: [] },
        settings: { currentLanguage: 'en', auto_save: true, mutedAudio: false, shop_bulkbuy: 1, minerals_bulkbuy: 1, font: 'option1', notation: 'option1', buy_max_activate: false, shard_buy_max_activate: false, breakprestige_buy_max_activate: false, modernization_activated: false, loreBoolean: [], event: { spiritual: false, triplePower: false }, whichPrestigeMode: 'time', autosave_interval: 30000, offline: true },
        automation: { checkbox: { single: false, buyable: false, umultiplier: false, upower: false, prestige: false }, setIntervals: {}, upgrades: { single: 0, buyable: 0, umultiplier: 0, upower: 0, prestige: 0, uadder: 0 }, conditions: { umultiplier: 0, upower: { time: 0, x_of_umulti: 0 }, prestige: { time: 3600, coins: 1e15, prestige: 10000, crystals: 1e50 }, uadder: { time: 0, x_of_upower: 0 } } },
        got_daily_reward: false,
        code: { activated: [], name: [] },
        overdrive: { consumed: { type1: 0, type2: 0 } },
        offline_gain: { time: 0, coin: 0, supercoin: 0, crystal: 0, prestige: 0, shard: 0 }
    };

    // Генерируем 10 пустых слотов для таблицы престижа и 12 челленджей
    for(let i=0; i<10; i++) newData.prestige.prestigeTable[i] = { crystals: '', prestiges: '', time: { game: {timer:''}, real: {timer:''} } };
    for(let i=1; i<=12; i++) newData.challenge.time[i] = { timer: 99999 };

    // --- ФУНКЦИИ-ПОМОЩНИКИ ДЛЯ ПЕРЕНОСА ДАННЫХ ---
    const transfer = (oldKey, obj, newKey) => { if (p[oldKey] !== undefined) obj[newKey] = p[oldKey]; };
    const transferArr = (oldKey, arr, val) => { if (p[oldKey] === 1 && !arr.includes(val)) arr.push(val); };
    const prefixes = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth'];

    // Перенос покупок Buyables
    for (let i = 0; i < 5; i++) transfer(`${prefixes[i]}Buyable_amount`, newData.coin.upgrades, i+1);
    for (let i = 0; i < 2; i++) transfer(`${prefixes[i]}PrestigeBuyable_amount`, newData.prestige.upgrades, i+1);
    for (let i = 0; i < 3; i++) transfer(`${prefixes[i]}ShardBuyable_amount`, newData.shard.upgrades, i+1);
    for (let i = 0; i < 5; i++) transfer(`${prefixes[i]}ShopBuyable_amount`, newData.shop.upgrades, i+1);
    for (let i = 5; i < 7; i++) transfer(`${prefixes[i]}ShopBuyable_amount`, newData.shop.permanentUpgrades, i-4);

    // Перенос синглов монет
    const coinSingleIds = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25];
    for (let i = 0; i < 10; i++) transferArr(`${prefixes[i]}Single_amount`, newData.coin.singleUpgrades, coinSingleIds[i]);

    // Перенос синглов престижа
    const presSingleIds = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];
    for (let i = 0; i < 16; i++) transferArr(`${prefixes[i]}PrestigeSingle_amount`, newData.prestige.singleUpgrades, presSingleIds[i]);

    // Перенос синглов осколков
    const shardSingleIds = [11, 12, 13, 21, 22, 23];
    for (let i = 0; i < 6; i++) transferArr(`${prefixes[i]}ShardSingle_amount`, newData.shard.singleUpgrades, shardSingleIds[i]);

    // Магазин (вещи)
    for (let i = 0; i < 4; i++) {
        transfer(`${prefixes[i]}ShopItem_used`, newData.shop.items.used, i+1);
        transfer(`${prefixes[i]}ShopItem_amount`, newData.shop.items.amount, i+1);
    }

    // Прочие данные
    transfer('gameTimer', newData.time.game.total, 'timer');
    transfer('gameTimer', newData.time.real.total, 'timer');
    transfer('lastOnlineTime', newData.time, 'savedTime');
    transfer('money', newData.coin, 'currency');
    transfer('optionValue', newData.settings, 'font');
    transfer('overdriveType1_consumed', newData.overdrive.consumed, 'type1');
    transfer('prestigeCount', newData.prestige, 'resets');
    transfer('prestigeTimer', newData.time.real.prestige, 'timer');
    transfer('prestigeTimer', newData.time.game.prestige, 'timer');
    transfer('shards', newData.shard, 'currency');
    
    transfer('shardUnlockablePerSecond_consumedShards', newData.shard.consumed, 'second');
    transfer('shardUnlockableClick_consumedShards', newData.shard.consumed, 'click');
    transfer('shardUnlockableSingles_consumedShards', newData.shard.consumed, 'singles');
    transfer('shardUnlockableBuyables_consumedShards', newData.shard.consumed, 'buyables');

    if (newData.shard.consumed.second >= 1000) transferArr('shardUnlockablePerSecond_consumedShards', newData.shard.unlockables, 1);
    if (newData.shard.consumed.click >= 1000) transferArr('shardUnlockableClick_consumedShards', newData.shard.unlockables, 2);
    if (newData.shard.consumed.buyables >= 10000) transferArr('shardUnlockableBuyables_consumedShards', newData.shard.unlockables, 3);
    if (newData.shard.consumed.singles >= 100000) transferArr('shardUnlockableSingles_consumedShards', newData.shard.unlockables, 4);

    transfer('spentSuperCoins', newData.supercoin, 'spent_currency');
    transfer('superCoins', newData.supercoin, 'currency');
    transfer('totalSuperCoins', newData.supercoin, 'total_currency');
    transfer('total', newData.coin, 'total_currency');
    transfer('totalCrystals', newData.prestige, 'total_currency');
    transfer('umultiplierTimer', newData.time, 'umultiplier');
    transfer('upowerTimer', newData.time, 'upower');
    transfer('umultipliercount', newData, 'umultipliers');
    transfer('upowercount', newData, 'upowers');

    let challenge = p.challengeCompleted ? JSON.parse(p.challengeCompleted) : [];
    for (let i = 0; i < 12; i++) if (challenge[i]) newData.challenge.completed.push(i+1);

    localStorage.removeItem('datasaving');
}