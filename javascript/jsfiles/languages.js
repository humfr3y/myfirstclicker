try {
    // 1. Сначала пытаемся загрузить модуль с быстрого CDN
    await import('https://cdn.jsdelivr.net/npm/i18next@23/i18next.min.js');
} catch (error) {
    // 2. Если CDN недоступен (или нет интернета), грузим из твоей папки
    await import('../../node_modules/i18next/i18next.min.js');
}



const responseEn = await fetch('./javascript/jsfiles/en.json');
const responseRu = await fetch('./javascript/jsfiles/ru.json');
const translationsEnData = await responseEn.json();
const translationsRuData = await responseRu.json();
await i18next.init({
    lng: player.settings.currentLanguage,
    fallbackLng: 'en',
    resources: {
        en: { translation: translationsEnData },
        ru: { translation: translationsRuData }
    },
    interpolation: {
        escapeValue: false,
    }
});

// Helper: safely set translated text into element
function setText(el, key, opts) {
    try {
        if (!el) return;
        el.innerHTML = i18next.t(key, opts);
    }
    catch (e) {
        console.error('setText error', key, e);
    }
}

// Helper: apply array of [el, key, opts?]
function applyMap(map) {
    if (!Array.isArray(map)) return;
    map.forEach(item => {
        const [el, key, opts] = item;
        setText(el, key, opts);
    });
}

updateStaticTranslations();

// ОСНОВНОЙ ИНТЕРВАЛ ОБНОВЛЕНИЯ ПЕРЕВОДОВ
setInterval(() => {
    changeText()
    // Обновления которые всегда нужны (верхняя панель)
    loadTranslationsAlways();
    
    // Обновления для активной вкладки и подвкладки
    TabUpdater.getActiveTab();
    switch (TabUpdater.currentMainTab) {
        case 'mainTab':
            loadTranslationsCoins();
            break;

        case 'prestigeTab':
            switch (TabUpdater.currentSubTab) {
                case 'upgradesTab':
                    loadTranslationsPrestige();
                    break;
                case 'shardsTab':
                    loadTranslationsShards();
                    break;
                case 'superCrystalsTab':
                    loadTranslationsSuperCrystal();
                    break;
                case 'breakPrestigeTab':
                    loadTranslationsBreakPrestige();
                    break;
                case 'fortuneTab':
                    loadTranslationsFortune();
                    break;
                case 'balanceTab':
                    loadTranslationsBalance();
                    break;
                case 'automationTab':
                    loadTranslationsAutomation()
                    break;
                case 'milestonesTab':
                    loadTranslationsBreakPrestige();
                    break;
                case 'mineralsTab':
                    loadTranslationsMinerals()
                    break;
            }
            break;
            
        case 'shopTab':
            loadTranslationsShop();
            break;
            
        case 'challengeTab':
            loadTranslationsChallenges();
            break;
            
        case 'infoTab':
            loadTranslationsInfo();
            break;
            
        case 'achTab':
            loadTranslationsAchievements();
            break;
            
        case 'settingsTab':
            loadTranslationsSettings();
            loadTranslationsCode()
            break;
            
        case 'eventTab':
            loadTranslationsEvent();
            break;
    }
}, 50);

// ============================================================
// Функция для ВСЕГДА обновляемых элементов (верхняя панель)
// ============================================================
function loadTranslationsAlways() {
    // 1. Верхняя панель (СВЕРХБЫСТРОЕ ОБНОВЛЕНИЕ ЦИФР)
    document.getElementById('top_coins_val').textContent = formatNumber(player.coin.currency);
    document.getElementById('top_coins_gain_val').textContent = formatNumber(GAIN.coin.second.effect(), 'boost');
    
    const topCrystals = document.getElementById('top_crystals_val');
    if (topCrystals) topCrystals.textContent = formatNumber(player.prestige.currency, 'floor');

    document.getElementById('top_supercoins_val').textContent = formatNumber(player.supercoin.currency);
    
    // Обновляем таймер в подвале (footer)
    const autoTimerEl = document.getElementById('autoTimer');
    if (autoTimerEl) autoTimerEl.textContent = i18next.t('autoSave', {autoSaverTimer: MISC.auto_save_timer.toFixed(2)});

    // Текст текущего мира/испытания
    const worldText = document.getElementById('youAreInXWorld');
    if (player.challenge.activated === 0 && player.prestige.challenge.activated === 0) {
        worldText.textContent = i18next.t('challengeDeactivated');
    } else if (player.prestige.challenge.activated !== 0) {
        worldText.textContent = i18next.t('challengePActivated', {x: player.prestige.challenge.activated});
    } else {
        worldText.textContent = i18next.t('challengeActivated', {x: player.challenge.activated});
    }

    // Кнопка Престижа
    const btnPrestige = document.getElementById('doPrestige');
    if (player.coin.currency >= 1e15 && player.prestige.challenge.activated === 0) {
        let pGain = GAIN.prestige.reset();
        let cGain = GAIN.crystal.reset();
        let extra = MILESTONES.has(15) && player.prestige.total_currency < 1e15? i18next.t('prestigeCountMultiplierText', {prestigeCountMultiplier: formatNumber(pGain)}) : '';
        btnPrestige.textContent = player.prestige.total_currency >= 1e15 ? 
        i18next.t('prestigeEnabledAdvanced', {crystalsTemp: formatNumber(cGain), crystalsPerMin: formatNumber(cGain * 60 / player.time.real.prestige.timer) }) :
        i18next.t('prestigeEnabled', {crystalsTemp: formatNumber(cGain), prestigeCountMultiplierText: extra});
    } else if (player.prestige.challenge.activated !== 0) {
        let goal = formatNumber(PRES_CHALL.goals[player.prestige.challenge.activated]);
        if (player.coin.currency >= PRES_CHALL.goals[player.prestige.challenge.activated]) {
            btnPrestige.textContent = i18next.t('prestigeInChallengeCompleted', {coins: goal});
        } else {
            btnPrestige.textContent = i18next.t('prestigeInChallenge', {coins: goal});
        }
    } else {
        btnPrestige.textContent = i18next.t('prestigeDisabled');
    }

    // Кнопки "Купить один/макс"
    document.getElementById('maxOrNoUpgrades').textContent = player.settings.buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');
    document.getElementById('maxOrNoShardUpgrades').textContent = player.settings.shard_buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');
    document.getElementById('maxOrNoBreakPrestigeUpgrades').textContent = player.settings.breakprestige_buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');

    const btnReflash = document.getElementById('doReflash');
    if ((player.coin.currency >= 1.79e308 || player.coin.currency == Infinity) && player.prestige.challenge.completed.includes(8)) {
        btnReflash.textContent = i18next.t('reflashFirst');
    } else {
        btnReflash.textContent = i18next.t('reflashDisabled');
    }
}

// ============================================================
// Функция для Вкладки Настроек
// ============================================================


// ============================================================
// Функция для вкладки COINS (монеты) — 100% ОПТИМИЗИРОВАНА
// ============================================================
function loadTranslationsCoins() {
    const isModern = player.settings.modernization_activated;

    // 1. СВЕРХБЫСТРОЕ ОБНОВЛЕНИЕ 5 ПОКУПАЕМЫХ УЛУЧШЕНИЙ
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`buyableU${i}_normal_view`).style.display = isModern ? 'none' : 'block';
        document.getElementById(`buyableU${i}_super_view`).style.display = isModern ? 'block' : 'none';

        if (!isModern) {
            document.getElementById(`buyableU${i}_amount`).textContent = formatNumber(player.coin.upgrades[i]);
            if (i === 1 || i === 2 || i === 4) {
                let free = MISC.free_upgrade[i]();
                document.getElementById(`buyableU${i}_free`).textContent = free > 0 ? `+${formatNumber(free)}` : '';
            }
            document.getElementById(`buyableU${i}_bulk`).textContent = formatNumber(UPGS.coin.buyables[i].bulk());
            let effFormat = (i === 2) ? 'percent' : (i === 3 || i === 4) ? 'boost' : 'number';
            document.getElementById(`buyableU${i}_effect`).textContent = formatNumber(UPGS.coin.buyables[i].effect(), effFormat);
            
            let isSuperBought = player.coin.superUpgrades.includes(10 + i);
            let sPrefix = (i === 1) ? '+' : 'x';
            let sFormat = 'boost';
            
            document.getElementById(`buyableU${i}_super`).innerHTML = isSuperBought 
                ? ` | <super>⧋ ${sPrefix}${formatNumber(UPGS.coin.buyables[i].effect_super(), sFormat)}</super>` : '';
            document.getElementById(`buyableU${i}_cost`).textContent = formatNumber(UPGS.coin.buyables.bulk_cost(i));
            if (i === 4) document.getElementById('buyableU4_base').textContent = UPGS.prestige.singles[22].unl() ? '1.075' : '1.05';
        } else {
            let isSuperBought = player.coin.superUpgrades.includes(10 + i);
            document.getElementById(`buyableU${i}_scost_cont`).style.display = isSuperBought ? 'none' : 'inline';
            if (!isSuperBought) document.getElementById(`buyableU${i}_scost`).textContent = UPGS.coin.buyables[i].cost_super();
        }

        let ttFormat = (i === 1) ? 'number' : (i === 5) ? 'power' : 'boost';
        document.getElementById(`buyableU${i}_tt`).textContent = formatNumber(UPGS.coin.buyables[i].effect_super(), ttFormat);
    }

    // 2. СВЕРХБЫСТРОЕ ОБНОВЛЕНИЕ 10 ОДИНОЧНЫХ УЛУЧШЕНИЙ
    const singleUpgIds = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25];
    for (let i = 1; i <= 10; i++) {
        let upg_id = singleUpgIds[i - 1];
        let isSuperBought = player.coin.superUpgrades.includes(10 + upg_id); 
        let isBought = player.coin.singleUpgrades.includes(upg_id);

        document.getElementById(`singleU${i}_normal_view`).style.display = isModern ? 'none' : 'block';
        document.getElementById(`singleU${i}_super_view`).style.display = isModern ? 'block' : 'none';

        if (!isModern) {
            let effFormat = (i === 9) ? 'power' : 'boost';
            document.getElementById(`singleU${i}_effect`).textContent = formatNumber(UPGS.coin.singles[upg_id].effect(), effFormat);
            
            let sPrefix = (i === 5) ? '+' : (i === 8 || i === 9) ? '^' : 'x';
            let sFormat = (i === 5 || i === 7 || i === 10) ? 'number' : (i === 8 || i === 9) ? 'power' : 'boost';
            
            if (isSuperBought) {
                if (i !== 3 && i !== 7 && i !== 9 && i !== 10) {
                    document.getElementById(`singleU${i}_super`).innerHTML = ` | <super>⧋ ${sPrefix}${formatNumber(UPGS.coin.singles[upg_id].effect_super(), sFormat)}</super>`;
                }
            } else {
                document.getElementById(`singleU${i}_super`).innerHTML = '';
            }

            document.getElementById(`singleU${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
            if (!isBought) document.getElementById(`singleU${i}_cost`).textContent = formatNumber(UPGS.coin.singles[upg_id].cost());

            // Capped-текст для 7 и 9
            if (i === 7) { 
                let isCapped = !UPGS.prestige.singles[23].unl() && UPGS.coin.singles[22].effect() == 100 && !UPGS.coin.singles[22].unl_super();
                document.getElementById(`singleU${i}_cap_text`).textContent = i18next.t(isCapped ? 'word_capped' : 'word_currently');
            } else if (i === 9) {
                let isCapped = UPGS.coin.singles[24].effect() == 1.25 * UPGS.coin.singles[24].effect_super();
                document.getElementById(`singleU${i}_cap_text`).textContent = i18next.t(isCapped ? 'word_capped' : 'word_currently');
            }
        } else {
            document.getElementById(`singleU${i}_scost_cont`).style.display = isSuperBought ? 'none' : 'inline';
            if (!isSuperBought) document.getElementById(`singleU${i}_scost`).textContent = UPGS.coin.singles[upg_id].cost_super();
        }

        if (i !== 3 && i !== 7 && i !== 9 && i !== 10) {
            let ttFormat = (i === 5) ? 'number' : (i === 8 || i === 9) ? 'power' : 'boost';
            document.getElementById(`singleU${i}_tt`).textContent = formatNumber(UPGS.coin.singles[upg_id].effect_super(), ttFormat);
        }

        document.getElementById('umulti_amt').textContent = formatNumber(player.umultipliers);
        let um_free = MISC.free_upgrade.umultiplier();
        document.getElementById('umulti_free').textContent = um_free > 0 ? `+${formatNumber(um_free, 'boost')}` : '';
        document.getElementById('umulti_base').textContent = formatNumber(GAIN.umultiplier.base(), 'boost');
        document.getElementById('umulti_eff').textContent = formatNumber(GAIN.umultiplier.effect(), 'boost');
        document.getElementById('umulti_cost').textContent = formatNumber(LAYERS.umultiplier.cost());

        document.getElementById('upower_amt').textContent = formatNumber(player.upowers);
        let up_free = MISC.free_upgrade.upower();
        document.getElementById('upower_free').textContent = up_free > 0 ? `+${formatNumber(up_free, 'boost')}` : '';
        document.getElementById('upower_base').textContent = formatNumber(GAIN.upower.base(), 'power');
        document.getElementById('upower_eff').textContent = formatNumber(GAIN.upower.effect(), 'power');
        document.getElementById('upower_cost').textContent = formatNumber(LAYERS.upower.cost());

        document.getElementById('uadder_amt').textContent = formatNumber(player.uadders);
        document.getElementById('uadder_base').textContent = formatNumber(GAIN.uadder.base(), 'number');
        document.getElementById('uadder_eff').textContent = formatNumber(GAIN.uadder.effect(), 'number');
        document.getElementById('uadder_cost').textContent = formatNumber(LAYERS.uadder.cost());

        document.getElementById('ureducer_amt').textContent = formatNumber(player.ureducers);
        document.getElementById('ureducer_base').textContent = formatNumber(GAIN.ureducer.base(), 'number');
        document.getElementById('ureducer_eff').textContent = formatNumber(GAIN.ureducer.effect(), 'number');
        document.getElementById('ureducer_cost').textContent = formatNumber(LAYERS.ureducer.cost());
    }

    // 3. БЫСТРОЕ ОБНОВЛЕНИЕ ОВЕРДРАЙВА
    document.getElementById('od1_percent').textContent = formatNumber(UNL.overdrive.type1.percent(), 'boost');
    document.getElementById('od1_effect').textContent = formatNumber(UNL.overdrive.type1.effect(), 'boost');
    document.getElementById('od1_cost').textContent = formatNumber(UNL.overdrive.type1.cost());

    document.getElementById('od2_percent').textContent = formatNumber(UNL.overdrive.type2.percent(), 'boost');
    document.getElementById('od2_effect').textContent = formatNumber(UNL.overdrive.type2.effect(), 'boost');
    document.getElementById('od2_cost').textContent = formatNumber(UNL.overdrive.type2.cost());

    // 4. ТЕКСТ УСЛОВИЯ ИСПЫТАНИЯ
    const ccEl = document.getElementById('challengeCondition');
    ccEl.textContent = '';
    if (player.challenge.activated == 7) {
        let val = (MISC.amount_of_upgrades.coin() / 50 * 100) <= 100 ? formatNumber(MISC.amount_of_upgrades.coin() / 50 * 100, 'boost') : 100;
        ccEl.textContent = i18next.t('challengeCondition7', {x: val});
    }
    if (player.challenge.activated == 8 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
        ccEl.textContent = i18next.t('challengeCondition8', {x: formatNumber(CHALL.virusCoins_gen())});
    }
    if (player.challenge.activated == 10 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
        ccEl.textContent = i18next.t('challengeCondition10', {x: 25 - MISC.amount_of_upgrades.coin()});
    }
}

// ============================================================
// Функция для вкладки PRESTIGE (престиж)
// ============================================================
function loadTranslationsPrestige() {
    // 1. Покупаемые улучшения престижа
    for (let i = 1; i <= 1; i++) {
        document.getElementById(`pBuyableU${i}_amount`).textContent = formatNumber(player.prestige.upgrades[i]);
        document.getElementById(`pBuyableU${i}_effect`).textContent = formatNumber(UPGS.prestige.buyables[i].effect(), 'boost');
        document.getElementById(`pBuyableU${i}_cost`).textContent = formatNumber(UPGS.prestige.buyables[i].cost());
    }

    // 2. Единичные (Single) улучшения престижа
    const pSingleUpgIds = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];
    for (let i = 1; i <= 16; i++) {
        let upg_id = pSingleUpgIds[i - 1];
        let isBought = player.prestige.singleUpgrades.includes(upg_id);
        
        // Скрываем цену, если куплено
        document.getElementById(`pSingleU${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) {
            document.getElementById(`pSingleU${i}_cost`).textContent = formatNumber(UPGS.prestige.singles[upg_id].cost());
        }

        // Индивидуальные динамические эффекты
        if (i === 2) { 
            // Activity 2.0 (показывает ^эффект)
            document.getElementById('pSingleU2_effect').textContent = formatNumber(UPGS.prestige.singles[12].effect(), 'power');
        } else if (i === 9) { 
            // Hourglass (меняется в зависимости от ачивки 27)
            document.getElementById('pSingleU9_multi').textContent = ACHS.has(27) ? 10 : 2;
            document.getElementById('pSingleU9_time').textContent = ACHS.has(27) ? 10 : 5;
        } else if (i === 10) { 
            // Anti-Hourglass (показывает xэффект)
            document.getElementById('pSingleU10_effect').textContent = formatNumber(UPGS.prestige.singles[32].effect(), 'boost');
        }
    }
}

// ============================================================
// Функция для вкладки SHARDS (осколки)
// ============================================================
function loadTranslationsShards() {
    // 1. Верхние счетчики
    document.getElementById('shards_currency_val').textContent = formatNumber(player.shard.currency);
    document.getElementById('shards_effect_val').textContent = formatNumber(GAIN.shard.effect.effect(), 'percent');
    document.getElementById('shards_sec_val').textContent = formatNumber(GAIN.shard.second(), 'boost');

    // 2. Прогресс-бары разблокировок (Unlockables)
    const u_keys = ['second', 'click', 'buyables', 'singles'];
    for (let i = 1; i <= 4; i++) {
        let key = u_keys[i-1];
        document.getElementById(`su${i}_perc`).textContent = formatNumber(UNL.shard[key].percent(), 'boost');
        document.getElementById(`su${i}_cons`).textContent = formatNumber(player.shard.consumed[key]);
        document.getElementById(`su${i}_cost`).textContent = formatNumber(UNL.shard[key].cost);
    }

    // 3. Покупаемые улучшения (Buyables)
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`shb${i}_amount`).textContent = formatNumber(player.shard.upgrades[i]);
        document.getElementById(`shb${i}_bulk`).textContent = formatNumber(UPGS.shard.buyables[i].bulk());
        document.getElementById(`shb${i}_cost`).textContent = formatNumber(UPGS.shard.buyables.bulk_cost(i));
    }
    document.getElementById('shb1_eff').textContent = formatNumber(UPGS.shard.buyables[1].effect(), 'boost');
    document.getElementById('shb2_eff').textContent = formatNumber(UPGS.shard.buyables[2].effect(), 'boost');
    document.getElementById('shb3_eff1').textContent = formatNumber(UPGS.shard.buyables[3].effect().min, 'boost');
    document.getElementById('shb3_eff2').textContent = formatNumber(UPGS.shard.buyables[3].effect().max, 'boost');

    // 4. Одиночные улучшения (Singles)
    const s_ids = [11, 12, 13, 21, 22, 23];
    for (let i = 1; i <= 6; i++) {
        let upg = s_ids[i-1];
        let isBought = player.shard.singleUpgrades.includes(upg);
        
        // Для 13 и 23 форматирование 'boost' (т.к. мы делим), для остальных - 'power' или 'boost'
        let effFormat = (upg === 11 || upg === 12 || upg === 13 || upg === 23 || upg === 21) ? 'boost' : 'power';
        document.getElementById(`shs${i}_eff`).textContent = formatNumber(UPGS.shard.singles[upg].effect(), effFormat);
        
        // Скрываем цену, если куплено
        document.getElementById(`shs${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) {
            document.getElementById(`shs${i}_cost`).textContent = formatNumber(UPGS.shard.singles[upg].cost());
        }
    }
}

function loadTranslationsAutomation() {
    const types = ['single', 'buyable', 'umultiplier', 'upower', 'prestige', 'uadder'];
    const pcts = [40, 40, 40, 40, 40, 33]; // Проценты скидки интервала
    
    // Обновляем интервалы и стоимость кнопок снижения интервала
    for (let i = 0; i < 6; i++) {
        let type = types[i];
        let intEl = document.getElementById(`auto_${type}_int`);
        if (intEl) intEl.textContent = formatNumber(MISC.automation[type].time() / 1000, 'power');
        
        let percEl = document.getElementById(`auto_${type}_perc`);
        if (percEl) percEl.textContent = pcts[i];
        
        let costEl = document.getElementById(`auto_${type}_cost`);
        if (costEl) costEl.textContent = formatNumber(MISC.automation[type].cost());
    }
    
    // Обновляем оптовые покупки (Buyables)
    document.getElementById('auto_buyable_bulk').textContent = formatNumber(MISC.automation.buyable.bulk());
    document.getElementById('auto_bulk_cost').textContent = formatNumber(MISC.automation.buyable.cost());
    
    // Режим Престижа
    const modeMap = {
        'time': 'timePrestigeMode',
        'coins': 'coinsPrestigeMode',
        'prestige': 'prestigePrestigeMode',
        'crystals': 'crystalsPrestigeMode'
    };
    document.getElementById('autoPrestigeMode').textContent = i18next.t(modeMap[player.settings.whichPrestigeMode]);
}

// ============================================================
// Функция для SHOP и TOOLTIPS (магазин и подсказки)
// ============================================================
// ============================================================
// Функция для SUPERSHOP (суперлавка) — 100% ОПТИМИЗИРОВАНА
// ============================================================
function loadTranslationsShop() {
    // Верхний счетчик
    document.getElementById('top_shop_sc_val').textContent = formatNumber(player.supercoin.currency, 'boost');

    // 1. Покупаемые улучшения (Buyables 1-7)
    for (let i = 1; i <= 7; i++) {
        let max = UPGS.shop.buyables[i].maxAmount;
        let amt = player.shop.upgrades[i];
        
        document.getElementById(`sb${i}_amt`).textContent = formatNumber(amt);
        document.getElementById(`sb${i}_max`).textContent = max;
        document.getElementById(`sb${i}_bulk`).textContent = formatNumber(UPGS.shop.buyables[i].bulk());
        document.getElementById(`sb${i}_eff`).textContent = formatNumber(UPGS.shop.buyables[i].effect(), 'percent');
        document.getElementById(`sb${i}_neff`).textContent = formatNumber(UPGS.shop.buyables[i].next_effect(), 'percent');
        
        // Скрываем "=>" и цену, если макс. уровень
        document.getElementById(`sb${i}_next_cont`).style.display = (amt === max) ? 'none' : 'inline';
        document.getElementById(`sb${i}_cost_cont`).style.display = (amt === max) ? 'none' : 'inline';
        if (amt !== max) document.getElementById(`sb${i}_cost`).textContent = formatNumber(UPGS.shop.buyables.bulk_cost(i), 'boost');
        
        document.getElementById(`shopBuyableU${i}Req`).textContent = `${formatNumber(amt)}/${max}`;
    }

    // Правильное форматирование для Постоянных улучшений
    const fmtMap = {
        1: 'percent', // Crystal Booster (x2 -> 100%)
        2: 'percent', // Credit Card (x3 -> 200%)
        3: 'boost',   // Super Muscles (+0.4)
        4: 'percent',   // Flame Hand (+0.2)
        5: 'number',  // Midas Touch (+1)
        6: 'power',   // Energy Shard (^0.5)
        7: 'number',  // Crystal Sword (-1)
        8: 'number'   // Fortune Ticket (+2)
    };

    // 2. Постоянные улучшения (Permanents 1-8)
    for (let i = 1; i <= 8; i++) {
        let max = UPGS.shop.permanent[i].maxAmount;
        let amt = player.shop.permanentUpgrades[i];
        let fmt = fmtMap[i];
        
        document.getElementById(`sp${i}_amt`).textContent = formatNumber(amt);
        document.getElementById(`sp${i}_max`).textContent = max;
        
        document.getElementById(`sp${i}_eff`).textContent = formatNumber(UPGS.shop.permanent[i].effect(), fmt);
        document.getElementById(`sp${i}_neff`).textContent = formatNumber(UPGS.shop.permanent[i].next_effect(), fmt);
        
        // Скрываем "=>" и цену, если макс. уровень

        document.getElementById(`sp${i}_next_cont`).style.display = (amt === max) ? 'none' : 'inline';
        document.getElementById(`sp${i}_cost_cont`).style.display = (amt === max) ? 'none' : 'inline';
        if (amt !== max) document.getElementById(`sp${i}_cost`).textContent = formatNumber(UPGS.shop.permanent[i].cost());
        
        document.getElementById(`shopPermanentU${i}Req`).textContent = `${formatNumber(amt)}/${max}`;
    }

    // 3. Разблокируемые (Unlockables / Singles 1-6)
    for (let i = 1; i <= 5; i++) {
        let isBought = player.shop.unlockables.includes(i);
        document.getElementById(`su${i}s_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) document.getElementById(`su${i}s_cost`).textContent = formatNumber(UPGS.shop.unlockables[i].cost());
        
        document.getElementById(`shopSingleU${i}Req`).textContent = `${isBought ? 1 : 0}/1`;
    }

    // 4. Предметы (Items 1-6)
    for (let i = 1; i <= 6; i++) {
        let max = UPGS.shop.items[i].maxAmount;
        let amt = player.shop.items.amount[i];
        
        document.getElementById(`si${i}_amt`).textContent = formatNumber(amt);
        document.getElementById(`si${i}_max`).textContent = max;
        document.getElementById(`si${i}_cost`).textContent = formatNumber(UPGS.shop.items[i].cost());
        
        document.getElementById(`shopItem${i}Req`).textContent = `${formatNumber(amt)}/${max}`;
    }
}

// ============================================================
// Функция для SUPERCRYSTAL (супер-кристаллы)
// ============================================================
function loadTranslationsSuperCrystal() {
    const sc_ids = [11, 12, 13, 21, 22, 23, 31, 32, 33];
    for (let i = 1; i <= 9; i++) {
        let upg = sc_ids[i-1];
        let isBought = player.supercrystal.upgrades.includes(upg);
        
        if (i === 9) document.getElementById('scs9_eff').textContent = formatNumber(UPGS.supercrystal[33].effect(), 'boost');
        
        document.getElementById(`scs${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) {
            document.getElementById(`scs${i}_cost`).textContent = formatNumber(UPGS.supercrystal[upg].cost());
        }
    }

    document.getElementById('sc_poured_val').textContent = formatNumber(player.supercrystal.consumedShards);
    document.getElementById('sc_req_val').textContent = formatNumber(UNL.supercrystal.cost());
    document.getElementById('sc_count_val').textContent = formatNumber(player.supercrystal.currency);
    document.getElementById('superCrystalPour').textContent = UNL.supercrystal.pour() + '%';
}

// ============================================================
// Функция для SUPERPRESTIGE (супер-престиж)
// ============================================================
function loadTranslationsBreakPrestige() {
    // 1. Покупаемые улучшения
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`bpb${i}_amt`).textContent = formatNumber(player.prestige.break.buyables[i]);
        document.getElementById(`bpb${i}_bulk`).textContent = formatNumber(UPGS.prestige.break.buyables[i].bulk());
        
        let effFormat = (i === 1) ? 'power' : (i === 2) ? 'percent' : 'boost';
        // Специальный формат для 5-го апгрейда из старого кода ('power', 4 знака)
        if (i === 5) {
            document.getElementById(`bpb${i}_eff`).textContent = formatNumber(UPGS.prestige.break.buyables[i].effect(), 'power', 4);
        } else {
            document.getElementById(`bpb${i}_eff`).textContent = formatNumber(UPGS.prestige.break.buyables[i].effect(), effFormat);
        }
        
        document.getElementById(`bpb${i}_cost`).textContent = formatNumber(UPGS.prestige.break.buyables.bulk_cost(i));
    }

    // 2. Одиночные улучшения (включая 10-е Superhammer, которое мы вывели под индексом 10)
    const sp_s_ids = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25]; // 25 - это Superhammer
    for (let i = 1; i <= 10; i++) {
        let upg = sp_s_ids[i-1];
        let isBought = player.prestige.break.singles.includes(upg);
        
        // Обновляем эффект, если это не Superhammer (25)
        if (upg !== 25) {
            let effFormat = (upg === 14 || upg === 24) ? 'number' : 'boost';
            document.getElementById(`bps${i}_eff`).textContent = formatNumber(UPGS.prestige.break.singles[upg].effect(), effFormat);
        }

        document.getElementById(`bps${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) {
            document.getElementById(`bps${i}_cost`).textContent = formatNumber(UPGS.prestige.break.singles[upg].cost());
        }
    }
}

// ============================================================
// Функция для INFO (информация, статистика, челленджи) — 100% ОПТИМИЗИРОВАНА
// ============================================================
function loadTranslationsInfo() {
    // 1. Статистика
    document.getElementById('stat_total_coins').textContent = formatNumber(player.coin.total_currency);
    document.getElementById('stat_total_scoins').textContent = formatNumber(player.supercoin.total_currency);
    
    document.getElementById('stat_gt_d').textContent = formatNumber(player.time.game.total.days, 'floor');
    document.getElementById('stat_gt_h').textContent = formatNumber(player.time.game.total.hours, 'floor');
    document.getElementById('stat_gt_m').textContent = formatNumber(player.time.game.total.minutes, 'floor');
    document.getElementById('stat_gt_s').textContent = formatNumber(player.time.game.total.seconds, 'floor');

    document.getElementById('stat_rt_d').textContent = formatNumber(player.time.real.total.days, 'floor');
    document.getElementById('stat_rt_h').textContent = formatNumber(player.time.real.total.hours, 'floor');
    document.getElementById('stat_rt_m').textContent = formatNumber(player.time.real.total.minutes, 'floor');
    document.getElementById('stat_rt_s').textContent = formatNumber(player.time.real.total.seconds, 'floor');

    document.getElementById('stat_total_crys').textContent = formatNumber(player.prestige.total_currency);
    document.getElementById('stat_total_pres').textContent = formatNumber(player.prestige.resets);

    document.getElementById('stat_pt_d').textContent = formatNumber(player.time.game.prestige.days, 'floor');
    document.getElementById('stat_pt_h').textContent = formatNumber(player.time.game.prestige.hours, 'floor');
    document.getElementById('stat_pt_m').textContent = formatNumber(player.time.game.prestige.minutes, 'floor');
    document.getElementById('stat_pt_s').textContent = formatNumber(player.time.game.prestige.seconds, 'floor');

    let fpt_timer = player.time.real.fastestPrestige.timer;
    let fpt_str = '';
    if (fpt_timer > 86399) fpt_str += formatNumber(player.time.game.fastestPrestige.days, 'floor') + ' ' + i18next.t('daysText') + ' ';
    if (fpt_timer > 3599) fpt_str += formatNumber(player.time.game.fastestPrestige.hours, 'floor') + ' ' + i18next.t('hoursText') + ' ';
    if (fpt_timer > 59) fpt_str += formatNumber(player.time.real.fastestPrestige.minutes, 'floor') + ' ' + i18next.t('minutesText') + ' ';
    fpt_str += (fpt_timer >= 1 ? formatNumber(player.time.real.fastestPrestige.seconds, 'floor') : formatNumber(fpt_timer, 'boost')) + ' ' + i18next.t('secondsText');
    document.getElementById('stat_fpt').textContent = fpt_str;

    document.getElementById('stat_clicks_real').textContent = formatNumber(player.clicks.real);
    document.getElementById('stat_clicks_game').textContent = formatNumber(player.clicks.simulated);
    document.getElementById('stat_clicks_crit').textContent = formatNumber(player.clicks.critical);

    let offText = '';
    if (ACHS.has(22) || MILESTONES.has(16)) {
        let presStr = MILESTONES.has(16) ? i18next.t('offlinePrestige', {prestiges: formatNumber(GAIN.prestige.offline(60), 'boost')}) : '';
        let crysStr = ACHS.has(22) ? i18next.t('offlineCrystal', {crystals: formatNumber(GAIN.crystal.offline(undefined, 60), 'boost')}) : '';
        offText = i18next.t('offlinePrestigesStats', {prestiges: presStr, crystals: crysStr});
    }
    document.getElementById('stat_offline_pres_farm').textContent = offText;

    // 2. Время испытаний
    for (let i = 1; i <= 12; i++) {
        let el = document.getElementById(`ch_time_${i}`);
        if (!el) continue;
        if (player.challenge.completed.includes(i)) {
            let t = player.challenge.time[i];
            el.textContent = t.timer > 0.999 ? i18next.t('challengeTime', {n: i, h: convertToTwoDigits(t.hours), m: convertToTwoDigits(t.minutes), s: convertToTwoDigits(t.seconds)}) : i18next.t('challengeTimeFast', {n: i, ms: formatNumber(t.timer*1000)});
        } else el.textContent = i18next.t('challengeNotCompletedYet', {n: i});
    }
    for (let i = 1; i <= 8; i++) {
        let el = document.getElementById(`pch_time_${i}`);
        if (!el) continue;
        if (player.prestige.challenge.completed.includes(i)) {
            let t = player.prestige.challenge.time[i];
            el.textContent = t.timer > 0.999 ? i18next.t('challengePTime', {n: i, h: convertToTwoDigits(t.hours), m: convertToTwoDigits(t.minutes), s: convertToTwoDigits(t.seconds)}) : i18next.t('challengePTimeFast', {n: i, ms: formatNumber(t.timer*1000)});
        } else el.textContent = i18next.t('challengePNotCompletedYet', {n: i});
    }

    // 3. Таблица Недавних Престижей
    // 3. Таблица Недавних Престижей
    for (let i = 0; i < 10; i++) {
        document.getElementById(`rp_run_${i}`).textContent = i === 0 ? i18next.t('prestigesAgoZero') : i18next.t('prestigesAgo', {i});
        let pt = player.prestige.prestigeTable[i];
        
        document.getElementById(`rp_pres_${i}`).textContent = pt.prestiges !== '' 
            ? i18next.t('prestigesCountTable', { x: formatNumber(pt.prestiges) }) : '';
            
        document.getElementById(`rp_crys_${i}`).textContent = pt.crystals !== '' 
            ? i18next.t('crystalCountTable', { x: formatNumber(pt.crystals) }) : '';
        
        if (pt.time.game.timer !== '') {
            document.getElementById(`rp_gt_${i}`).textContent = pt.time.game.timer >= 1 
                ? i18next.t('gameTimeTable', { h: convertToTwoDigits(pt.time.game.hours), m: convertToTwoDigits(pt.time.game.minutes), s: convertToTwoDigits(pt.time.game.seconds) }) 
                : i18next.t('gameTimeTableMs', { ms: formatNumber(pt.time.game.timer * 1000) });
        } else {
            document.getElementById(`rp_gt_${i}`).textContent = '';
        }

        if (pt.time.real.timer !== '') {
            document.getElementById(`rp_rt_${i}`).textContent = pt.time.real.timer >= 1 
                ? i18next.t('realTimeTable', { h: convertToTwoDigits(pt.time.real.hours), m: convertToTwoDigits(pt.time.real.minutes), s: convertToTwoDigits(pt.time.real.seconds) }) 
                : i18next.t('realTimeTableMs', { ms: formatNumber(pt.time.real.timer * 1000) });
        } else {
            document.getElementById(`rp_rt_${i}`).textContent = '';
        }
        
        document.getElementById(`rp_ppm_${i}`).textContent = pt.prestiges !== '' && pt.time.real.timer > 0 
            ? i18next.t('prestigesPerMinCountTable', { x: formatNumber(pt.prestiges * 60 / pt.time.real.timer) }) : '';
            
        document.getElementById(`rp_cpm_${i}`).textContent = pt.crystals !== '' && pt.time.real.timer > 0 
            ? i18next.t('crystalPerMinCountTable', { x: formatNumber(pt.crystals * 60 / pt.time.real.timer) }) : '';
    }
    
    // Средние значения (Averages)
    document.getElementById(`rp_avg_pres`).textContent = i18next.t('prestigesCountTable', { x: formatNumber(MISC.average.prestiges(), 'boost') });
    document.getElementById(`rp_avg_crys`).textContent = i18next.t('crystalCountTable', { x: formatNumber(MISC.average.crystals(), 'boost') });
    
    let avg_gt = player.time.game.average;
    document.getElementById(`rp_avg_gt`).textContent = avg_gt.timer >= 1 
        ? i18next.t('gameTimeTable', { h: convertToTwoDigits(avg_gt.hours), m: convertToTwoDigits(avg_gt.minutes), s: convertToTwoDigits(avg_gt.seconds) }) 
        : i18next.t('gameTimeTableMs', { ms: formatNumber(avg_gt.timer * 1000) });
        
    let avg_rt = player.time.real.average;
    document.getElementById(`rp_avg_rt`).textContent = avg_rt.timer >= 1 
        ? i18next.t('realTimeTable', { h: convertToTwoDigits(avg_rt.hours), m: convertToTwoDigits(avg_rt.minutes), s: convertToTwoDigits(avg_rt.seconds) }) 
        : i18next.t('realTimeTableMs', { ms: formatNumber(avg_rt.timer * 1000) });
        
    document.getElementById(`rp_avg_ppm`).textContent = i18next.t('prestigesPerMinCountTable', { x: formatNumber(MISC.average.prestiges_per_min(), 'boost') });
    document.getElementById(`rp_avg_cpm`).textContent = i18next.t('crystalPerMinCountTable', { x: formatNumber(MISC.average.crystals_per_min(), 'boost') });


    // 4. Ослабления (Softcaps)
    for (let i = 1; i <= 6; i++) {
        let id = i - 1;
        document.getElementById(`sc_name_${i}`).textContent = i18next.t(`softcaps.${id}.codename`);
        let start = 0, power = 1;
        switch (i) {
            case 1: start = UPGS.coin.singles[22].softcap_start(); power = 0.5; break;
            case 2: start = GAIN.coin.second.softcap().softcap_start; power = GAIN.coin.second.softcap().softcap_power; break;
            case 3: start = GAIN.coin.click.softcap().softcap_start; power = GAIN.coin.click.softcap().softcap_power; break;
            case 4: start = GAIN.coin.gain.softcap().softcap_start; power = GAIN.coin.gain.softcap().softcap_power; break;
            case 5: start = GAIN.crystal.softcap().softcap_start; power = GAIN.crystal.softcap().softcap_power; break;
            case 6: start = GAIN.shard.effect.softcap().softcap_start; power = GAIN.shard.effect.softcap().softcap_power; break;
        }
        document.getElementById(`sc_start_${i}`).textContent = formatNumber(start);
        document.getElementById(`sc_eff_${i}`).textContent = formatNumber(power, 'boost');
    }
}

// ============================================================
// Функции-заглушки для других вкладок
// ============================================================
function loadTranslationsOverdrive() {
    // Overdrive обновляется вместе с Coins
}

function loadTranslationsFortune() {
    // 1. Верхние счетчики и конвертация
    document.getElementById('ft_tokens_val').textContent = formatNumber(player.fortune.tokens);
    document.getElementById('ft_tokens_val2').textContent = formatNumber(player.fortune.tokens);
    document.getElementById('ft_sc_val').textContent = formatNumber(player.supercrystal.currency);
    document.getElementById('ft_coin_cost').textContent = MISC.fortune.cost.coin();
    document.getElementById('ft_cryst_cost').textContent = MISC.fortune.cost.crystal();
    document.getElementById('ft_rand_time').textContent = formatNumber(60 * UPGS.fortune.upgrades.buyables[3].effect());
    document.getElementById('ft_respec_amt').textContent = player.fortune.daily_resets;
    document.getElementById('ft_total_sc_val').textContent = formatNumber(player.supercrystal.total_currency);

    // 2. 12 Бустов фортуны
    for (let i = 1; i <= 12; i++) {
        let b = UPGS.fortune.boosts[i];
        document.getElementById(`fb_min_${i}`).textContent = formatNumber(b.min(), b.min() < 1.1 ? 'power' : (b.min() < 10 ? 'boost' : 'number'));
        document.getElementById(`fb_max_${i}`).textContent = formatNumber(b.max(), b.max() < 1.1 ? 'power' : (b.max() < 10 ? 'boost' : 'number'));
        document.getElementById(`fb_eff_${i}`).textContent = formatNumber(b.effect(), b.effect() < 1.1 ? 'power' : (b.effect() < 10 ? 'boost' : 'number'));

        let timeEl = document.getElementById(`fb_time_${i}`);
        let t = player.fortune.activatedBoosts[i].time;
        timeEl.textContent = t > 0 ? formatNumber(t) + 's' : '';
    }

    // 3. Покупаемые улучшения
    for (let i = 1; i <= 3; i++) {
        let b = UPGS.fortune.upgrades.buyables[i];
        let eff = (i === 3) ? b.effect() : (b.effect() - 1) * 100;
        document.getElementById(`fbb_eff_${i}`).textContent = formatNumber(eff);
        document.getElementById(`fbb_cost_${i}`).textContent = formatNumber(b.cost());
    }

    // 4. Одиночные улучшения
    for (let j = 1; j <= 3; j++) {
        for (let i = 1; i <= 3; i++) {
            let upg_id = j * 10 + i;
            let isBought = player.fortune.upgrades.singles.includes(upg_id);
            document.getElementById(`fsb_req_cont_${upg_id}`).style.display = isBought ? 'none' : 'inline';
            if (!isBought) {
                document.getElementById(`fsb_cost_${upg_id}`).textContent = formatNumber(UPGS.fortune.upgrades.singles[upg_id].req());
            }
        }
    }
}

function loadTranslationsBalance() {
    // 1. Весы и проценты
    document.getElementById('bal_plus_count').textContent = player.balance.coins.plus + '⊕';
    document.getElementById('bal_plus_perc').textContent = MISC.balance.ratio().leftPercent + '%';
    document.getElementById('bal_min_count').textContent = player.balance.coins.minus + '⊖';
    document.getElementById('bal_min_perc').textContent = MISC.balance.ratio().rightPercent + '%';
    
    document.getElementById('bal_ft_tokens').textContent = formatNumber(player.fortune.tokens);
    document.getElementById('bal_neutral_val').textContent = formatNumber(player.balance.neutral, 'boost');

    // 2. Генерация весов
    let has23 = player.balance.upgrades.singles.includes(23);
    document.getElementById('bal_scale_v1').style.display = !has23 ? 'inline' : 'none';
    document.getElementById('bal_scale_v2').style.display = has23 ? 'inline' : 'none';
    
    if (!has23) {
        document.getElementById('bsc_sob1').textContent = formatNumber(MISC.balance.scales_of_balance());
        document.getElementById('bsc_neu1').textContent = formatNumber(GAIN.balance.generation(), 'boost');
    } else {
        document.getElementById('bsc_sobc').textContent = formatNumber(GAIN.balance.scales_of_balance(), 'power', 5);
        document.getElementById('bsc_sob2').textContent = formatNumber(MISC.balance.scales_of_balance());
        document.getElementById('bsc_sob3').textContent = formatNumber(player.balance.scales_of_balance, 'boost');
        document.getElementById('bsc_neu2').textContent = formatNumber(GAIN.balance.generation());
    }

    // 3. Описания Плюс-монет (управление видимостью строк)
    document.getElementById('bal_p_amt').textContent = player.balance.coins.plus;
    let p_buff = MISC.balance.plusCoins.buff(), p_nerf = MISC.balance.plusCoins.nerf();
    document.getElementById('bal_p_e1').textContent = formatNumber(p_buff.coinBuff);
    document.getElementById('bal_p_n1').textContent = formatNumber(p_nerf.crystalGainNerf);
    
    let has11 = player.balance.upgrades.singles.includes(11);
    document.getElementById('bal_p_line2').style.display = has11 ? 'block' : 'none';
    if(has11){
        document.getElementById('bal_p_e2').textContent = formatNumber(p_buff.coinGainSoftcapPusher);
        document.getElementById('bal_p_n2').textContent = formatNumber(p_nerf.crystalSoftcapHarsher, 'boost');
    }
    let has21 = player.balance.upgrades.singles.includes(21);
    document.getElementById('bal_p_line3').style.display = has21 ? 'block' : 'none';
    if(has21){
        document.getElementById('bal_p_e3').textContent = formatNumber(p_buff.upgradePriceDivisor);
        document.getElementById('bal_p_n3').textContent = formatNumber(p_nerf.utilsCostIncreaser, 'boost');
    }
    let has31 = player.balance.upgrades.singles.includes(31);
    document.getElementById('bal_p_line4').style.display = has31 ? 'block' : 'none';
    if(has31) document.getElementById('bal_p_e4').textContent = formatNumber(p_buff.chanceBuffer, 'boost');

    // 4. Описания Минус-монет
    document.getElementById('bal_m_amt').textContent = player.balance.coins.minus;
    let m_buff = MISC.balance.minusCoins.buff(), m_nerf = MISC.balance.minusCoins.nerf();
    document.getElementById('bal_m_e1').textContent = formatNumber(m_buff.crystalGainBuff);
    document.getElementById('bal_m_n1').textContent = formatNumber(m_nerf.coinNerf);

    let has12 = player.balance.upgrades.singles.includes(12);
    document.getElementById('bal_m_line2').style.display = has12 ? 'block' : 'none';
    if(has12){
        document.getElementById('bal_m_e2').textContent = formatNumber(m_buff.crystalSoftcapSofter, 'boost');
        document.getElementById('bal_m_n2').textContent = formatNumber(m_nerf.coinGainSoftcapPuller);
    }
    let has22 = player.balance.upgrades.singles.includes(22);
    document.getElementById('bal_m_line3').style.display = has22 ? 'block' : 'none';
    if(has22){
        document.getElementById('bal_m_e3').textContent = formatNumber(m_buff.utilsCostReducer, 'boost');
        document.getElementById('bal_m_n3').textContent = formatNumber(m_nerf.upgradePriceMultiplier);
    }
    let has32 = player.balance.upgrades.singles.includes(32);
    document.getElementById('bal_m_line4').style.display = has32 ? 'block' : 'none';
    if(has32) document.getElementById('bal_m_e4').textContent = formatNumber(m_buff.crystalSoftcapPusher);

    // 5. Улучшения Баланса
    for(let i=1; i<=3; i++) {
        document.getElementById(`bal_b_eff_${i}`).textContent = formatNumber((UPGS.balance.buyables[i].effect() - 1) * 100, 'boost');
        document.getElementById(`bal_b_cost_${i}`).textContent = formatNumber(UPGS.balance.buyables[i].cost());
    }
    for (let j = 1; j <= 3; j++) {
        for (let i = 1; i <= 3; i++) {
            let upg_id = j * 10 + i;
            let isBought = player.balance.upgrades.singles.includes(upg_id);
            document.getElementById(`bal_s_req_cont_${upg_id}`).style.display = isBought ? 'none' : 'inline';
            if (!isBought) {
                document.getElementById(`bal_s_cost_${upg_id}`).textContent = formatNumber(UPGS.balance.singles[upg_id].cost());
            }
        }
    }

    document.getElementById('convertToPlusCoin').textContent = player.balance.coins.plus >= 10 ? i18next.t('fullConvert') : i18next.t('convertToPlusCoin')
    document.getElementById('convertToMinusCoin').textContent = player.balance.coins.minus >= 10 ? i18next.t('fullConvert') : i18next.t('convertToMinusCoin')
}
// ============================================================
// Функция для вкладки ИСПЫТАНИЙ (CHALLENGES) — 100% ОПТИМИЗИРОВАНА И БЕЗОПАСНА
// ============================================================
function loadTranslationsChallenges() {
    // Вспомогательная функция для безопасного обновления
    const setTxt = (id, val) => { 
        const el = document.getElementById(id); 
        if (el) el.textContent = val; 
    };

    // 1. Динамические цифры в наградах обычных Испытаний
    setTxt('c3_eff', formatNumber(player.challenge.completed.includes(3) ? CHALL[3].effect() : 1, 'power'));
    setTxt('c4_eff', formatNumber(player.challenge.completed.includes(4) ? CHALL[4].effect() : 0));
    setTxt('c5_eff', formatNumber(player.challenge.completed.includes(5) ? CHALL[5].effect() : 1, 'boost'));
    setTxt('c1_eff', formatNumber(player.challenge.completed.includes(1) ? CHALL[1].effect() : 1, 'boost'));
    setTxt('c7_eff', formatNumber(player.challenge.completed.includes(7) ? CHALL[7].effect() : 1, 'boost'));
    setTxt('c8_eff', formatNumber(player.challenge.completed.includes(8) ? CHALL[8].effect() : 1, 'boost'));
    setTxt('c9_eff', formatNumber(player.challenge.completed.includes(9) ? CHALL[9].effect() : 1, 'boost'));
    setTxt('c10_eff', formatNumber(player.challenge.completed.includes(10) ? CHALL[10].effect() : 1, 'boost'));

    // 2. Кнопки обычных Испытаний
    for (let i = 1; i <= 12; i++) {
        setTxt(`challenge${i}Start`, i18next.t(player.challenge.completed.includes(i) ? 'challengeCompleted' : 'challengeStart'));
    }

    setTxt('cp1_eff', formatNumber(player.prestige.challenge.completed.includes(1) ? PRES_CHALLENGE[1].effect() : 1));
    setTxt('cp2_eff', formatNumber(player.prestige.challenge.completed.includes(2) ? PRES_CHALLENGE[2].effect() : 1, 'boost'));
    setTxt('cp3_eff', formatNumber(player.prestige.challenge.completed.includes(3) ? PRES_CHALLENGE[3].effect() : 1, 'boost'));
    setTxt('cp4_eff', formatNumber(player.prestige.challenge.completed.includes(4) ? PRES_CHALLENGE[4].effect() : 0));
    setTxt('cp5_eff', formatNumber(player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1, 'power'));
    setTxt('cp6_eff', formatNumber(player.prestige.challenge.completed.includes(6) ? PRES_CHALLENGE[6].effect() : 1));
    setTxt('cp7_eff', formatNumber(player.prestige.challenge.completed.includes(7) ? PRES_CHALLENGE[7].effect() : 1, 'boost'));
    
    // 3. Цели и кнопки Престижных Испытаний
    for (let i = 1; i <= 8; i++) {
        setTxt(`pc${i}_goal`, formatNumber(PRES_CHALL.goals[i]));
        setTxt(`pChallenge${i}Start`, i18next.t(player.prestige.challenge.completed.includes(i) ? 'challengeCompleted' : 'challengeStart'));
    }
}


function loadTranslationsMinerals() {
    // 1. Верхние счетчики и Руны
    document.getElementById('runes_count_val').textContent = formatNumber(player.rune.currency);
    document.getElementById('shards_for_minerals_val').textContent = formatNumber(player.shard.currency);
    document.getElementById('rune_cost_val').textContent = formatNumber(UNL.rune.cost());
    
    let maxCost = UNL.rune.max_cost();
    document.getElementById('rune_bulk_iter').textContent = formatNumber(maxCost.iter);
    document.getElementById('rune_bulk_cost').textContent = formatNumber(maxCost.cost);

    // 2. Минералы и Тултипы (4 штуки)
    for (let i = 1; i <= 4; i++) {
        // Тултипы
        let bulkData = UPGS.minerals[i].bulk();
        document.getElementById(`min${i}_tt_runes`).textContent = formatNumber(bulkData.bulk1);
        document.getElementById(`min${i}_tt_shards`).textContent = formatNumber(bulkData.bulk2);

        // Количество минералов
        document.getElementById(`min${i}_amt`).textContent = formatNumber(player.minerals[i]);

        // Эффекты
        document.getElementById(`min${i}_e1`).textContent = formatNumber(UPGS.minerals[i].effect1(), 'boost');
        document.getElementById(`min${i}_e2`).textContent = formatNumber(UPGS.minerals[i].effect2(), 'boost');
        document.getElementById(`min${i}_e3`).textContent = formatNumber(UPGS.minerals[i].effect3(), 'boost');
    }
}

function loadTranslationsAchievements() {
    // 1. Бонусы обычных ачивок
    document.getElementById('ach_coin_eff').textContent = formatNumber(ACHS.effect.coin(), 'boost');
    
    let hasSuper25 = UPGS.coin.singles[25].unl_super();
    document.getElementById('ach_cryst_cont').style.display = hasSuper25 ? 'inline' : 'none';
    if (hasSuper25) document.getElementById('ach_cryst_eff').textContent = formatNumber(ACHS.effect.crystal(), 'boost');
    
    document.getElementById('ach_shard_cont').style.display = hasSuper25 ? 'inline' : 'none';
    if (hasSuper25) document.getElementById('ach_shard_eff').textContent = formatNumber(ACHS.effect.shard(), 'boost');

    // 2. Прогресс-бары Ачивок Осколков (10 штук)
    for (let i = 1; i <= 10; i++) {
        let compEl = document.getElementById(`sa_comp_${i}`);
        if (compEl) {
            compEl.textContent = formatNumber(player.shard.achievements[i]);
            document.getElementById(`sa_cur_${i}`).textContent = formatNumber(UNL.shard_achievements[i].current(), 'boost');
            document.getElementById(`sa_goal_${i}`).textContent = formatNumber(UNL.shard_achievements[i].goal(), 'boost');
            document.getElementById(`sa_eff_${i}`).textContent = formatNumber(UNL.shard_achievements[i].effect(), 'boost');
        }
        
        // Разблокировки рядов
        if (i <= 5) {
            let unlBtn = document.getElementById(`shardAchUnlockable${i}`);
            if (unlBtn && !unlBtn.hasAttribute('data-i18n-initialized')) {
                unlBtn.innerHTML = i18next.t(`shardAchUnlockable.${i-1}`);
                unlBtn.setAttribute('data-i18n-initialized', 'true');
            }
        }
    }
}

function loadTranslationsSettings() {
    // Используем textContent для мгновенного обновления текста на переключателях
    document.getElementById('autoSavingGame').textContent = i18next.t('autosaveGame', {autoSave: player.settings.auto_save});
    document.getElementById('muteAudio').textContent = i18next.t('mutingAudio', {status: player.settings.mutedAudio});
    document.getElementById('toggleOffline').textContent = i18next.t('offlineGainToggle', {offline: player.settings.offline});
    
    // Обновление текста ползунка автосохранения
    let sliderVal = mySlider.value / 1000;
    let formattedVal = sliderVal < 1 ? formatNumber(sliderVal, 'boost') : formatNumber(sliderVal);
    document.getElementById('autosaveSlider').textContent = i18next.t('autoSaveSlider', {x: formattedVal});
}

function loadTranslationsEvent() {
    // События обновляются вместе с Always
}

function loadTranslationsCode() {
        text.code.name_of_code = document.getElementById('codeInput').value

        inputText.innerHTML = i18next.t('codeInput');

        text.code.wrong_code = i18next.t('codeIsFalse', {code: text.code.name_of_code});
        text.code.true_code = i18next.t('codeIsTrue', {code: text.code.name_of_code, codeReward: text.code.reward});
        text.code.used_code = i18next.t('codeIsUsed', {code: text.code.name_of_code});

        if (!player.got_daily_reward) {
        getDailyReward.innerHTML = i18next.t('getDailyReward');
        }
        else {
            getDailyReward.innerHTML = ("0" + formatNumber(player.time.real.daily.hours)).slice(-2)+":"+("0" + formatNumber(player.time.real.daily.minutes)).slice(-2)+":"+("0" + formatNumber(player.time.real.daily.seconds)).slice(-2)
        }

        text.daily.true = i18next.t('dailyIsTrue', {
            superCoinsTemp2: player.offline_gain.daily
        });
        text.daily.false = i18next.t('dailyIsFalse', {
            dailySeconds: formatNumber(player.time.real.daily.seconds), 
            dailyMinutes: formatNumber(player.time.real.daily.minutes), 
            dailyHours: formatNumber(player.time.real.daily.hours)
        });
}

// --- НОВЫЙ ДВИЖОК СТАТИЧНЫХ ПЕРЕВОДОВ ---
// --- УЛЬТИМАТИВНЫЙ ДВИЖОК СТАТИЧНЫХ ПЕРЕВОДОВ ---
function updateStaticTranslations() {
    // 1. Быстрый перевод всего статического HTML
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const translated = i18next.t(key);
            if (translated && translated !== key) el.innerHTML = translated;
        }
    });

    // 2. Инициализация массивов для Лора (My Diary)
    for (let i = 1; i <= 18; i++) {
        text.chapter[i] = i18next.t(`chapter${i}`);
        let tab = document.getElementById(`chapter${i}Tab`);
        if (tab) tab.textContent = i18next.t(`chapter${i}Name`);
    }

    // 3. Инициализация массивов для Помощи (How to play)
    for (let i = 1; i <= 22; i++) {
        text.helpTitle[i] = i18next.t(`help${i}Name`);
        if (i !== 13) {
            text.help[i] = i18next.t(`help${i}`);
        } else {
            text.help[13] = i18next.t(`help13`, {
                x: formatNumber(GAIN.coin.click.softcap().softcap_start),
                y: player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5,
                z: player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4
            });
        }
        let tab = document.getElementById(`helpTab${i}`);
        if (tab) tab.textContent = i18next.t(`help${i}Name`);
    }

    // 4. Тексты окон, уведомлений и массивы прогресса (внутри JS)
    text.window.hard = i18next.t('resetConfirm');
    text.window.NaN = i18next.t('oopsNaNed');
    
    text.automation.time_req = i18next.t('timePrestigeMode');
    text.automation.coin_req = i18next.t('coinsPrestigeMode');
    text.automation.prestige_req = i18next.t('prestigePrestigeMode');
    text.automation.crystal_req = i18next.t('crystalsPrestigeMode');

    text.notification.save = i18next.t('saveGameNotification');
    text.notification.load = i18next.t('loadGameNotification');
    text.notification.export = i18next.t('exportGameNotification');
    text.notification.import = i18next.t('importGameNotification');
    text.notification.hard = i18next.t('resetGameNotification');
    text.notification.dailyRewardRestart = i18next.t('dailyRewardRestartNotification');
    text.notification.achievement = i18next.t('achievementGameNotification');
    text.notification.lore = i18next.t('loreGameNotification');
    text.notification.used_item = i18next.t('useItemNotification');
    text.notification.dont_have_item = i18next.t('dontHaveItemNotification');
    text.notification.limit_item = i18next.t('limitItemNotification');
    text.notification.limit_item_2 = i18next.t('limitItemNotification2');

    text.changelog.start = i18next.t('startDescription');
    text.chapter.start = i18next.t('startLoreDescription');
    text.help.start = i18next.t('startHelpDescription');

    const versions = ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.5.1', '0.6', '0.7', '0.7.1', '0.8', '0.8.0.1', '0.9', '0.9.1', '0.9.2', '0.10', '0.10.1', '0.11', '0.12', '0.12.1', '0.13', '0.14', '0.15'];
    versions.forEach(v => {
        let key = 'version' + v.replace(/\./g, '');
        text.changelog[v] = i18next.t(key);
    });

    for (let i = 0; i < text.code.rewards.length; i++) text.code.rewards[i] = i18next.t(`codeReward${i+1}`);
    for (let i = 0; i < text.itemNames.length; i++) {
        text.itemNames[i] = i18next.t(`shop_i${i+1}_name`);
        // HTML мы не трогаем, data-i18n переведет всё сам!
    }
    
    document.querySelectorAll('.useButton').forEach(btn => btn.innerHTML = i18next.t('useTitle'));

    PROGRESS.name = [
        i18next.t('pbtitle1'), i18next.t('pbtitle2'), i18next.t('pbtitle3'), 
        i18next.t('pbtitle4'), i18next.t('pbtitle5'), i18next.t('pbtitle6'), 
        i18next.t('pbtitle7'), i18next.t('pbtitle8'), i18next.t('pbtitle9'), 
        'Infinity?', i18next.t('pbtitle10')
    ];
    PROGRESS.currency = [
        i18next.t('pbcurrency1'), i18next.t('pbcurrency1'), i18next.t('pbcurrency1'), 
        i18next.t('pbcurrency2'), i18next.t('pbcurrency3'), i18next.t('pbcurrency4'), 
        i18next.t('pbcurrency4'), i18next.t('pbcurrency3'), i18next.t('pbcurrency5'), 
        i18next.t('pbcurrency1'), i18next.t('pbcurrency6')
    ];

    // 5. Инициализация 50 Обычных Ачивок
    for (let i = 0; i < 50; i++) {
        const achNaming = window["achName" + (i + 11)];
        if (achNaming) {
            const achNameKey = `achRow1.name.${i}`;
            const achNameWithoutQuotes = i18next.t(achNameKey).replace(/"/g, '');
            achNaming.innerHTML = i18next.t(achNameWithoutQuotes);
            ACHS.names[i] = i18next.t(`achRow1.name.${i}`);
            if (i != 49) {
                const tooltipEl = document.getElementsByClassName("tooltipAch")[i];
                if (tooltipEl) tooltipEl.innerHTML = i18next.t(`achievement${i + 11}Desc`);
            }
        }
    }

    // 6. Безопасное обновление Мультипликаторов (графики из clicker.js)
    for (let i = 0; i < 12; i++) text.multiBreakdown[i] = i18next.t(`mbTitles.${i}`);
    
    const dynamicStats = [
        ['postE15SoftcapGainStats', 'postE15CoinSoftcap'], ['doublerStats', 'doublerName'], ['midasCursorStats', 'midasCursorName'],
        ['rewardForFeatsStats', 'rewardName'], ['goldenGloveStats', 'goldenGloveName'], ['gainClickStats', 'gainName'],
        ['alphaPowerStats', 'alphaPowerName'], ['challenge6Stats', 'challenge6Name'], ['smallInvestmentStats', 'smallInvestmentName'],
        ['multiplierUpgradeStats', 'multiplierName'], ['richFameStats', 'richFameName'], ['negativeAlphaStats', 'negativeAlphaName'],
        ['gainSecondStats', 'gainName'], ['achievement15Stats', 'achievement15Name'], ['goldenClockStats', 'goldenClockName'],
        ['challenge8Stats', 'challenge8Name'], ['challenge3Stats', 'challenge3Name'], ['doublerPlusStats', 'doublerPlusName'],
        ['cashBackStats', 'cashBack'], ['goldenKeyStats', 'goldenKeyName'], ['overdriveType1Stats', 'overdrive'],
        ['achievementsStats', 'achievementsName'], ['achievement28Stats', 'achievement28Name'], ['hourglassStats', 'pse9Name'],
        ['antiHourglassStats', 'pse10Name'], ['shardsStats', 'shardsName'], ['secondMineralEffect1Stats', 'secondMineral2Name'],
        ['umultiplierStats', 'umultiplierName'], ['upowerStats', 'upowerName'], ['activity2Stats', 'pse2Name'],
        ['challenge1Stats', 'challenge1Name'], ['coinFactoryStats', 'coinFactoryName'], ['fortuneBoostCoinStats', 'coinBlessingName'],
        ['plusCoinsForGainStats', 'plusCoinForCoinsName'], ['luckyCloverStats', 'luckyCloverName'], ['charismaStats', 'charismaName'],
        ['thirdSingleSuperEffectStats', 'thirdSingleSuperEffectName'], ['firstSuperCrystalEffectStats', 'firstSuperCrystalEffectName'],
        ['firstMineralEffect3Stats', 'firstMineralEffect3Name'], ['superDvorStats', 'superDvorName'], ['hercCursorStats', 'hercCursorName'],
        ['achievement37Stats', 'achievement37Name'], ['fortuneBoostSupercoinStats', 'supercoinBlessingName'], ['plusCoinForSupercoinStats', 'plusCoinForSupercoinsName'],
        ['baseCrystalStats', 'baseCrystalName'], ['achievement282Stats', 'achievement28Name'], ['brilliantDoublerStats', 'brilliantDoublerName'],
        ['recyclingStats', 'recyclingName'], ['challenge10Stats', 'challenge10Name'], ['crystalBoostStats', 'crystalBoostName'],
        ['overdrive2EffectStats', 'overdrive2Name'], ['thirdMineralEffect1Stats', 'thirdMineralEffect1Name'], ['secondSuperCrystalSingleEffectStats', 'secondSuperCrystalSingleEffectName'],
        ['prestigeFameStats', 'prestigeFameName'], ['crystalShAchStats', 'crystalShAchName'], ['achievementBonus2Stats', 'achievementBonus2Name'],
        ['fortuneBoostCrystalStats', 'crystalBlessingName'], ['minusCoinsForCrystalsStats', 'minusCoinForCrystalsName'], ['firstShardBuyableEffectStats', 'firstShardBuyableEffectName'],
        ['fifthShopBuyableEffectStats', 'fifthShopBuyableEffect1Name'], ['ninthSuperCrystalSingleEffectStats', 'ninthSuperCrystalSingleEffectName'], ['fortuneBoostShardClickStats', 'shardBlessingName'],
        ['secondShardBuyableEffectStats', 'secondShardBuyableEffectName'], ['fifthShopBuyableEffect2Stats', 'fifthShopBuyableEffectStats2Name'], ['thirdMineralEffect2Stats', 'thirdMineralEffect2Name'],
        ['shardShAchStats', 'shardShAchName'], ['achievement39Stats', 'achievement39Name'], ['achievementBonus3Stats', 'achievementBonus3Name'],
        ['fortuneBoostShardSecondStats', 'shardBlessingName'], ['shardStats', 'shardName'], ['achievement30Stats', 'achievement30Name'],
        ['fourthShardSingleEffectStats', 'fourthShardSingleEffectName'], ['challengeReward7Stats', 'challengeReward7Name'], ['baseCriticalChanceEffectStats', 'baseCriticalChanceEffectName'],
        ['fourthSuperCrystalSingleEffectStats', 'fourthSuperCrystalSingleEffectName'], ['eighthShopBuyableEffectStats', 'eighthShopBuyableEffectName'], ['firstMineralEffect1Stats', 'firstMineralEffect1Name'],
        ['critChShAchStats', 'critChShAchName'], ['fortuneBoostCritChanceStats', 'critChanceBlessingName'], ['plusCoinsForCritChanceStats', 'plusCoinForCritChanceName'],
        ['baseCriticalGainEffectStats', 'baseCriticalGainEffectName'], ['fifthSuperCrystalSingleEffectStats', 'fifthSuperCrystalSingleEffectName'], ['ninthShopBuyableEffectStats', 'ninthShopBuyableEffectName'],
        ['firstMineralEffect2Stats', 'firstMineralEffect2Name'], ['critMuShAchStats', 'critMuShAchName'], ['thirdBuyableSuperEffectStats', 'thirdBuyableSuperEffectName'],
        ['fortuneBoostCritMultiStats', 'critMultiplierBlessingName'], ['thirdSuperCrystalSingleEffectStats', 'thirdSuperCrystalSingleEffectName'], ['fortuneBoostSimulationStats', 'simulationBlessingName'],
        ['prestigeBaseStats', 'basePrestigesName'], ['prestigeAch35Stats', 'achievement35Name'], ['prestigeBreakSingle13Stats', 'thirdBreakPrestigeSingleEffectName'],
        ['prestigeShop6Stats', 'sixthShopBuyableEffectName'], ['prestigeShardAch7Stats', 'prestigeShAchName'], ['prestigeFortune22Stats', 'fifthFortuneSingleEffectName'],
        ['pchall7Stats', 'pchall7Name'], ['pchall1Stats', 'pchall1Name'], ['pchall3Stats', 'pchall3Name'], ['breakPrestigeBuyable31Stats', 'triplerName'], ['breakPrestigeBuyable32Stats', 'triplerName'],
    ];
    dynamicStats.forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = i18next.t(key);
    });
}

document.getElementById('changingLanguage').addEventListener('click', () => {
    player.settings.currentLanguage = i18next.language == 'ru' ? 'en' : 'ru';
    i18next.changeLanguage(player.settings.currentLanguage, () => {
        updateStaticTranslations(); // Мгновенно переводит всю статику
        showChangelog(text.changelog.start);
        showStory(text.chapter.start);
        showHelpPage(text.help.start, text.empty);
    });
});

setTimeout(() => {
    loadingScreen.style.display = 'none'
    document.documentElement.style.overflowY = 'auto'
    wholeGame.style.display = 'block'
    player.time.savedTime = Date.now()
    setInterval(loop, 50)
    offlineGainTitle.innerHTML = i18next.t('offlineGainTitle');   
    player.offline_gain.time == null ? offlineShowGain.innerHTML = '' :
    offlineShowGain.innerHTML = i18next.t('offlineGain', {
        timeDifference: formatNumber(player.offline_gain.time),
        moneyTemp: formatNumber(player.offline_gain.coin), 
        superCoinsTemp: formatNumber(player.offline_gain.supercoin), 
        crystals: ACHS.has(22) ? i18next.t('offlineCrystalsTempText', {
            crystals: formatNumber(player.offline_gain.crystal, 'floor')
        }) : '', 
        prestiges: MILESTONES.has(16) ? i18next.t('offlinePrestigesTempText', {
            prestiges: formatNumber(player.offline_gain.prestige, 'floor')
        }) : '',
        shards: UNL.shard.second.unl() ? i18next.t('offlineShardsTempText', {
            shards: formatNumber(player.offline_gain.shard)
        }) : ''
    });
    renderSavedAchievements();
    renderSavedLore();
}, 2000);

codeInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        readCode();
    }
});

function checkCode(id=999) {
    id += 1
    switch (id) {
    case 1:
        player.supercoin.currency += 69
        player.supercoin.total_currency += 69
        break;
    case 2:
        if (!player.settings.event.spiritual) return 1

        break;
    case 3:
        if (!player.settings.event.triplePower) return 1

        break;
    case 4:
        if (!player.settings.event.triplePower) return 1
        
        break;
    case 5:
        if (!player.settings.event.triplePower) return 1
        
        break;
    case 6:
        player.shop.items.amount[3] += 5
        break;
    case 9:
        player.shop.items.amount[3] += 5
        break;
    case 7:
        player.supercoin.currency += 128
        player.supercoin.total_currency += 128
        break;
    case 8: 
        player.shop.items.amount[4] += 1
        break;
    default:
        return 1
    }
}

function readCode() {
    if (player.code.name.includes(codeInput.value)) {
        let id = player.code.name.indexOf(codeInput.value)
        text.code.name_of_code = codeInput.value
        if (player.code.activated.includes(codeInput.value)) {
            whichCode.innerHTML = text.code.used_code
            
        }
        else {
            let number = checkCode(id)
            if (number == 1) {
                whichCode.innerHTML = text.code.wrong_code
            }
            else {
                text.code.reward = text.code.rewards[id]
                loadTranslationsCode()
                whichCode.innerHTML = text.code.true_code
                if (!player.code.activated.includes(codeInput.value)) player.code.activated.push(codeInput.value)

            }
        }
    }
    else whichCode.innerHTML = text.code.wrong_code
    openWindow('code', true)
}

function changeText() {
    if (document.getElementById('tooltip-ach60').getAttribute('data-show') == '') {
        if (!ELS.isAch60Opened) {
            document.getElementsByClassName("tooltipAch")[49].innerHTML = i18next.t(`achievement${60}Desc`, {trick: i18next.t(`achievement60Tricks.${randomNumber(0, 26)}`)})
            ELS.isAch60Opened = true
        }
    }
    else {
        ELS.isAch60Opened = false
        document.getElementsByClassName("tooltipAch")[49].innerHTML = ''
    }
}