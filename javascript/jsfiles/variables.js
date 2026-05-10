// --- ФАБРИКИ БАЗОВЫХ ОБЪЕКТОВ (Генераторы структуры) ---

const getZeroTime = () => ({ seconds: 0, minutes: 0, hours: 0, days: 0, timer: 0 });
const getEmptyTime = () => ({ days: '', hours: '', minutes: '', seconds: '', timer: '' });
const getMaxTime = () => ({ days: 999, hours: 99, minutes: 59, seconds: 59, timer: 99999 });

const getPrestigeTable = () => {
    let table = {};
    for (let i = 0; i <= 9; i++) table[i] = { crystals: '', prestiges: '', time: { game: getEmptyTime(), real: getEmptyTime() } };
    return table;
};

const getChallengeTime = () => {
    let table = {};
    for (let i = 1; i <= 11; i++) table[i] = getMaxTime();
    table[12] = { ...getMaxTime(), times_completed: 0 };
    return table;
};

const getFortuneBoosts = () => {
    let table = { list: [] };
    for (let i = 1; i <= 12; i++) table[i] = { activated: false, effect: 0, time: 0 };
    return table;
};

const getShopItems = () => {
    let amount = {}, used = {};
    for (let i = 1; i <= 6; i++) { amount[i] = 0; used[i] = 0; }
    return { amount, used };
};

const generateEmptyObj = (count, hasStart = false) => {
    let obj = hasStart ? { start: '' } : {};
    for (let i = 1; i <= count; i++) obj[i] = '';
    return obj;
};

// --- ГЛАВНЫЙ ОБЪЕКТ ИГРОКА (Blueprint) ---

let player = {
    saveName: 'Save',
    clicks: { real: 0, simulated: 0, critical: 0, prestige: 0 },
    achievements: [], achievement_rows: [], shard_achievements: [], progressBarGoals: [0],
    umultipliers: 0, upowers: 0, uadders: 0, ureducers: 0,
    
    coin: {
        upgrades: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        singleUpgrades: [], superUpgrades: [],
        currency: 10, total_currency: 10,
    },
    supercoin: { currency: 0, total_currency: 0, spent_currency: 0 },
    prestige: {
        upgrades: { 1: 0 },
        singleUpgrades: [],
        break: { buyables: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, singles: [] },
        milestones: [],
        currency: 0, total_currency: 0, broken_currency: 0, resets: 0,
        prestigeTable: getPrestigeTable(),
        table_resets: 1,
        challenge: { completed: [], activated: 0, time: getChallengeTime() }
    },
    shard: {
        upgrades: { 1: 0, 2: 0, 3: 0 }, singleUpgrades: [], currency: 0, unlockables: [],
        consumed: { click: 0, second: 0, buyables: 0, singles: 0 },
        achievements: generateEmptyObj(10, false) // 1-10 ключи со значением 0 (JS инициализирует пустые строки как 0 при мат. операциях, но лучше задать явно:
    },
    shop: {
        upgrades: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
        permanentUpgrades: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
        unlockables: [],
        items: getShopItems(),
    },
    supercrystal: { upgrades: [], currency: 0, total_currency: 0, spent_currency_on_fortune_upgrades: 0, consumedShards: 0 },
    rune: { currency: 0, total_currency: 0 },
    minerals: { 1: 0, 2: 0, 3: 0, 4: 0 },
    fortune: {
        tokens: 0, total_tokens: 0, spent_tokens: 0, daily_resets: 10,
        converted: { coins: 0, crystals: 0 },
        upgrades: { buyables: { 1: 0, 2: 0, 3: 0 }, singles: [] },
        activatedBoosts: getFortuneBoosts()
    },
    balance: {
        coins: { plus: 0, minus: 0 }, total_coins: { plus: 0, minus: 0 },
        neutral: 0, scales_of_balance: 0,
        upgrades: { buyables: { 1: 0, 2: 0, 3: 0 }, singles: [] }
    },
    reflash: {
        currency: 0, total_currency: 0, resets: 0
    },
    time: {
        savedTime: Date.now(), currentTime: 0,
        game: {
            total: getZeroTime(), prestige: getZeroTime(), fastestPrestige: { ...getZeroTime(), timer: 1e69 }, average: getEmptyTime()
        },
        real: {
            total: getZeroTime(), prestige: getZeroTime(), fastestPrestige: { ...getZeroTime(), timer: 1e69 }, daily: getZeroTime(), average: getEmptyTime()
        },
        next_daily: 0, umultiplier: 0, upower: 0, uadder: 0, ureducer: 0,
    },
    challenge: { completed: [], activated: 0, time: getChallengeTime() },
    tabs: { main: [], settings_sub: [], clicker_sub: [], info_sub: [], prestige_sub: [], multi_breakdown_sub: [] },
    settings: {
        currentLanguage: 'en', auto_save: true, mutedAudio: false, shop_bulkbuy: 1, minerals_bulkbuy: 1,
        font: 'option1', notation: 'option1',
        buy_max_activate: false, shard_buy_max_activate: false, breakprestige_buy_max_activate: false, balance_buy_max_activate: false, modernization_activated: false,
        loreBoolean: [], event: { spiritual: false, triplePower: false },
        whichPrestigeMode: 'time', autosave_interval: 30000, offline: true
    },
    automation: {
        checkbox: { single: false, buyable: false, umultiplier: false, upower: false, prestige: false },
        setIntervals: { single: '', buyable: '', umultiplier: '', upower: '', prestige: '' },
        upgrades: { single: 0, buyable: 0, umultiplier: 0, upower: 0, prestige: 0, uadder: 0 },
        conditions: { umultiplier: 0, upower: { time: 0, x_of_umulti: 0 }, prestige: { time: 3600, coins: 1e15, prestige: 10000, crystals: 1e50 }, uadder: { time: 0, x_of_upower: 0 } }
    },
    got_daily_reward: false,
    checked: {
        lore: false,
        h2p: false
    },
    code: { activated: [], name: ['umultiplier', 'upower', 'timemachine', 'hardmachine', 'sorry'] },
    overdrive: { consumed: { type1: 0, type2: 0 } },
    offline_gain: { time: '', coin: '', supercoin: '', crystal: '', prestige: '', shard: '' }
};

// Явное выставление нулей для ачивок (чтобы не было проблем с пустыми строками)
for (let i = 1; i <= 10; i++) player.shard.achievements[i] = 0;


const ELS = {
    automationUpgradesArray: document.getElementsByClassName('automationUpgrade'),
    verDesc: document.getElementById("versionDescription"),
    chapDesc: document.getElementById("chapterDescription"),
    helpDesc: document.getElementById("helpDescription"),
    mediaQuery: window.matchMedia('screen and (max-width: 600px)'),
    isAch60Opened: false
};

const text = {
    optionValue: "option1",
    broken_crystals: { gain: 0, broken_crystals: 0 },
    daily: { true: '', false: '' },
    whichPrestigeMode: 'time',
    multiBreakdown: Array(12).fill(''),
    itemNames: Array(6).fill(''),
    notification: {
        lore: '', load: '', save: '', export: '', import: '', hard: '', achievement: '', dailyRewardRestart: '',
        used_item: '', dont_have_item: '', limit_item: '', limit_item_2: '',
    },
    window: { hard: '', NaN: '' },
    automation: { prestige_req: '', coin_req: '', time_req: '', crystal_req: '' },
    code: {
        rewards: Array(5).fill(''),
        reward: '', used_code: '', wrong_code: '', true_code: '', name_of_code: ''
    },
    changelog: {
        start: '', "0.0":'', "0.1":'', "0.2":'', "0.3":'', "0.4":'', "0.5":'', "0.5.1":'', "0.6":'', "0.7":'', "0.7.1":'', "0.8":'',
        "0.8.0.1":'', "0.9":'', "0.9.1":'', "0.9.2":'', "0.10":'', "0.10.1":'', "0.11":'', "0.11.1":'', "0.12":'', "0.12.1": '', "0.13": '', "0.14": '', "0.15": '', "0.15.x": ""
    },
    // Генерируем повторяющиеся тексты с помощью функции
    chapter: generateEmptyObj(17, true),
    helpTitle: generateEmptyObj(21, true),
    help: generateEmptyObj(21, true),
    empty: '',
};

const PRES_CHALL = {
    goals: {
        1: 1e25, 2: 1e25, 3: 1e89, 4: 1e91, 5: 5e75, 6: 5e94, 7: 1e20, 8: 1e15,
    }
};