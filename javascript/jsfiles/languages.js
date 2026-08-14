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

        case 'reflashTab':
            loadTranslationsReflash();
            break;
    }
}, 50);

// ============================================================
// Функция для ВСЕГДА обновляемых элементов (верхняя панель)
// ============================================================
function loadTranslationsAlways() {
    const globals = getGlobalNumbers();
    // 1. Верхняя панель (СВЕРХБЫСТРОЕ ОБНОВЛЕНИЕ ЦИФР)
    document.getElementById('top_coins_val').textContent = formatNumber(player.coin.currency);
    document.getElementById('top_coins_gain_val').textContent = formatNumber(GAIN.coin.second.effect(), 'boost');
    document.getElementById('worldSpeedValue').textContent = formatNumber(UPGS.reflash.accelerator[5].effect(), 'boost');

    const topCrystals = document.getElementById('top_crystals_val');
    if (topCrystals) topCrystals.textContent = formatNumber(player.prestige.currency, 'floor');

    const topBits = document.getElementById('top_ref_cur_val');
    if (topBits) topBits.textContent = formatNumber(player.reflash.currency, 'boost', 2, true)
    document.getElementById('bitsCount_currency').textContent = i18next.t(getBitOrByteKey(player.reflash.currency))

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
        i18next.t('prestigeEnabledAdvanced', {crystalsTemp: formatNumber(cGain), crystalsPerMin: formatNumber(cGain * 60 / player.time.real.prestige.timer), ...globals }) :
        i18next.t('prestigeEnabled', {crystalsTemp: formatNumber(cGain), prestigeCountMultiplierText: extra, ...globals});
    } else if (player.prestige.challenge.activated !== 0) {
        let goal = formatNumber(PRES_CHALL.goals[player.prestige.challenge.activated]);
        if (player.coin.currency >= PRES_CHALL.goals[player.prestige.challenge.activated]) {
            btnPrestige.textContent = i18next.t('prestigeInChallengeCompleted', {coins: goal});
        } else {
            btnPrestige.textContent = i18next.t('prestigeInChallenge', {coins: goal});
        }
    } else {
        btnPrestige.textContent = i18next.t('prestigeDisabled', globals);
    }

    // Кнопки "Купить один/макс"
    document.getElementById('maxOrNoUpgrades').textContent = player.settings.buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');
    document.getElementById('maxOrNoShardUpgrades').textContent = player.settings.shard_buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');
    document.getElementById('maxOrNoBreakPrestigeUpgrades').textContent = player.settings.breakprestige_buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');
    document.getElementById('maxOrNoBalanceUpgrades').textContent = player.settings.balance_buy_max_activate ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');

    let bGain = GAIN.reflash.reset();
    const btnReflash = document.getElementById('doReflash');
    if ((player.coin.currency >= 1.79e308 || player.coin.currency == Infinity) && player.prestige.challenge.completed.includes(8)) {
        btnReflash.textContent = bGain > 1 ? 
        i18next.t('reflashEnabled', {reflashesTemp: formatNumber(bGain, 'boost', 2, true), ref_cur: i18next.t(getBitOrByteKey(bGain))}) :
        i18next.t('reflashFirst', globals);
    } else {
        btnReflash.textContent = i18next.t('reflashDisabled', globals); // И СЮДА!
    }

    // == VIRUS ==
    document.getElementById('virus-percent').textContent = formatNumber(VIRUS.ratio(), 'boost') + '%'
    
    document.getElementById('virusType').textContent = player.virus.type
    document.getElementById('virusLevel').textContent = player.virus.level
    document.getElementById('virusTime').textContent = formatNumber(player.virus.time, 'boost')

    document.getElementById('virusReq').textContent = i18next.t(`virus.${player.virus.type}`, {
        x: formatNumber(player.virus.current),
        y: formatNumber(player.virus.goal)
    })

    let virusSeconds = convert_time_temp(player.virus.effect.time).seconds
    let virusMinutes = convert_time_temp(player.virus.effect.time).minutes

    document.getElementById('bonus-virus-timer').textContent = player.virus.effect.time >= 60 ? 
    i18next.t('tempBoostTimer_1', {
        m: convertToTwoDigits(virusMinutes),
        s: convertToTwoDigits(virusSeconds)
    }):
    i18next.t('tempBoostTimer_2', {
        s: formatNumber(virusSeconds, 'boost')
    })

    document.getElementById('bonus-virus').textContent = formatNumber(player.virus.effect.multiplier, 'boost')
    document.getElementById('virus-effect-status').textContent = player.virus.effect.status == 'buff' ?
    'x':'/'

    document.getElementById('virus-effect-type').textContent = i18next.t(`virus_effects.${player.virus.effect.type}`)
    
    document.getElementById('shop_item_1_timer').textContent = i18next.t('tempBoostTimer_2', {
        s: formatNumber(player.shop.items.timer[1], 'boost')
    })
    document.getElementById('shop_item_2_timer').textContent = i18next.t('tempBoostTimer_2', {
        s: formatNumber(player.shop.items.timer[2], 'boost')
    })


    document.getElementById('shop_item_4_timer').textContent = i18next.t('tempBoostTimer_2', {
        s: formatNumber(player.shop.items.timer[4], 'boost')
    })
    document.getElementById('shop_item_5_timer').textContent = i18next.t('tempBoostTimer_2', {
        s: formatNumber(player.shop.items.timer[5], 'boost')
    })
    document.getElementById('shop_item_6_timer').textContent = i18next.t('tempBoostTimer_2', {
        s: formatNumber(player.shop.items.timer[6], 'boost')
    })

    document.getElementById('shop_item_1_eff').textContent = formatNumber(player.shop.items.used[1])
    document.getElementById('shop_item_2_eff').textContent = formatNumber(player.shop.items.used[2])
}

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

    document.getElementById('od3_percent').textContent = formatNumber(UNL.overdrive.type3.percent(), 'boost');
    document.getElementById('od3_effect').textContent = formatNumber(UNL.overdrive.type3.effect(), 'boost');
    document.getElementById('od3_cost').textContent = formatNumber(UNL.overdrive.type3.cost());

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
    const types = ['single', 'buyable', 'umultiplier', 'upower', 'prestige', 'uadder', 'ureducer'];
    const pcts = [40, 40, 40, 40, 40, 33, 50]; // Проценты скидки интервала
    
    // Обновляем интервалы и стоимость кнопок снижения интервала
    for (let i = 0; i < 7; i++) {
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
    document.getElementById('top_shop_sc_val').textContent = formatNumber(player.supercoin.currency, 'boost');;
    document.getElementById('top_scoins_gain_val').textContent = formatNumber(GAIN.supercoin.gain_per_second(), 'power', 3);

    // 1. Покупаемые улучшения (Buyables 1-11)
    for (let i = 1; i <= 15; i++) {
        let max = UPGS.shop.buyables[i].maxAmount;
        let amt = player.shop.upgrades[i];
        
        document.getElementById(`sb${i}_amt`).textContent = formatNumber(amt);
        document.getElementById(`sb${i}_max`).textContent = max;
        document.getElementById(`sb${i}_bulk`).textContent = formatNumber(UPGS.shop.buyables[i].bulk());
        if (i != 12) {
            document.getElementById(`sb${i}_eff`).textContent = formatNumber(UPGS.shop.buyables[i].effect(), 'percent');
            document.getElementById(`sb${i}_neff`).textContent = formatNumber(UPGS.shop.buyables[i].next_effect(), 'percent');
        }
        else {
            document.getElementById(`sb${i}_eff`).textContent = formatNumber(UPGS.shop.buyables[i].effect());
            document.getElementById(`sb${i}_neff`).textContent = formatNumber(UPGS.shop.buyables[i].next_effect());
        }
        
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
        8: 'number',   // Fortune Ticket (+2)
        9: 'percent',
        10: 'percent',
        11: 'number',
        12: 'number'
    };

    // 2. Постоянные улучшения (Permanents 1-10)
    for (let i = 1; i <= 12; i++) {
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
    for (let i = 1; i <= 8; i++) {
        let isBought = player.shop.special.includes(i);
        document.getElementById(`su${i}s_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) document.getElementById(`su${i}s_cost`).textContent = formatNumber(UPGS.shop.special[i].cost());
        
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

    document.getElementById('shards_currency_val_2').textContent = formatNumber(player.shard.currency);

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

    document.getElementById('stat_pt_d').textContent = formatNumber(player.time.real.prestige.days, 'floor');
    document.getElementById('stat_pt_h').textContent = formatNumber(player.time.real.prestige.hours, 'floor');
    document.getElementById('stat_pt_m').textContent = formatNumber(player.time.real.prestige.minutes, 'floor');
    document.getElementById('stat_pt_s').textContent = formatNumber(player.time.real.prestige.seconds, 'floor');

    document.getElementById('stat_total_bits').textContent = formatNumber(player.reflash.total_currency);
    document.getElementById('stat_total_refs').textContent = formatNumber(player.reflash.resets);

    document.getElementById('stat_ret_d').textContent = formatNumber(player.time.real.reflash.days, 'floor');
    document.getElementById('stat_ret_h').textContent = formatNumber(player.time.real.reflash.hours, 'floor');
    document.getElementById('stat_ret_m').textContent = formatNumber(player.time.real.reflash.minutes, 'floor');
    document.getElementById('stat_ret_s').textContent = formatNumber(player.time.real.reflash.seconds, 'floor');

    let fpt_timer = player.time.real.fastestPrestige.timer;
    let fpt_str = '';
    if (fpt_timer > 86399) fpt_str += formatNumber(player.time.real.fastestPrestige.days, 'floor') + ' ' + i18next.t('daysText') + ' ';
    if (fpt_timer > 3599) fpt_str += formatNumber(player.time.real.fastestPrestige.hours, 'floor') + ' ' + i18next.t('hoursText') + ' ';
    if (fpt_timer > 59) fpt_str += formatNumber(player.time.real.fastestPrestige.minutes, 'floor') + ' ' + i18next.t('minutesText') + ' ';
    fpt_str += (fpt_timer >= 1 ? formatNumber(player.time.real.fastestPrestige.seconds, 'floor') : formatNumber(fpt_timer, 'boost')) + ' ' + i18next.t('secondsText');
    document.getElementById('stat_fpt').textContent = fpt_str;

    let fret_timer = player.time.real.fastestReflash.timer;
    let fret_str = '';
    if (fret_timer > 86399) fret_str += formatNumber(player.time.real.fastestReflash.days, 'floor') + ' ' + i18next.t('daysText') + ' ';
    if (fret_timer > 3599) fret_str += formatNumber(player.time.real.fastestReflash.hours, 'floor') + ' ' + i18next.t('hoursText') + ' ';
    if (fret_timer > 59) fret_str += formatNumber(player.time.real.fastestReflash.minutes, 'floor') + ' ' + i18next.t('minutesText') + ' ';
    fret_str += (fret_timer >= 1 ? formatNumber(player.time.real.fastestReflash.seconds, 'floor') : formatNumber(fret_timer, 'boost')) + ' ' + i18next.t('secondsText');
    document.getElementById('stat_fret').textContent = fret_str;

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
                ? i18next.t('gameTimeTable', { d: convertToTwoDigits(pt.time.game.days),  h: convertToTwoDigits(pt.time.game.hours), m: convertToTwoDigits(pt.time.game.minutes), s: convertToTwoDigits(pt.time.game.seconds) }) 
                : i18next.t('gameTimeTableMs', { ms: formatNumber(pt.time.game.timer * 1000) });
        } else {
            document.getElementById(`rp_gt_${i}`).textContent = '';
        }

        if (pt.time.real.timer !== '') {
            document.getElementById(`rp_rt_${i}`).textContent = pt.time.real.timer >= 1 
                ? i18next.t('realTimeTable', { d: convertToTwoDigits(pt.time.real.days), h: convertToTwoDigits(pt.time.real.hours), m: convertToTwoDigits(pt.time.real.minutes), s: convertToTwoDigits(pt.time.real.seconds) }) 
                : i18next.t('realTimeTableMs', { ms: formatNumber(pt.time.real.timer * 1000) });
        } else {
            document.getElementById(`rp_rt_${i}`).textContent = '';
        }
        
        document.getElementById(`rp_ppm_${i}`).textContent = pt.prestiges !== '' && pt.time.real.timer > 0 
            ? i18next.t('prestigesPerMinCountTable', { x: formatNumber(pt.prestiges * 60 / pt.time.real.timer) }) : '';
            
        document.getElementById(`rp_cpm_${i}`).textContent = pt.crystals !== '' && pt.time.real.timer > 0 
            ? i18next.t('crystalPerMinCountTable', { x: formatNumber(pt.crystals * 60 / pt.time.real.timer) }) : '';
    }

    document.getElementById(`rp_avg_pres`).textContent = i18next.t('prestigesCountTable', { x: formatNumber(MISC.average.prestiges(), 'boost') });
    document.getElementById(`rp_avg_crys`).textContent = i18next.t('crystalCountTable', { x: formatNumber(MISC.average.crystals(), 'boost') });

    let avg_gt = player.time.game.average;
    document.getElementById(`rp_avg_gt`).textContent = avg_gt.timer >= 1 
        ? i18next.t('gameTimeTable', { d: convertToTwoDigits(avg_gt.days), h: convertToTwoDigits(avg_gt.hours), m: convertToTwoDigits(avg_gt.minutes), s: convertToTwoDigits(avg_gt.seconds) }) 
        : i18next.t('gameTimeTableMs', { ms: formatNumber(avg_gt.timer * 1000) });
        
    let avg_rt = player.time.real.average;
    document.getElementById(`rp_avg_rt`).textContent = avg_rt.timer >= 1 
        ? i18next.t('realTimeTable', { d: convertToTwoDigits(avg_rt.days), h: convertToTwoDigits(avg_rt.hours), m: convertToTwoDigits(avg_rt.minutes), s: convertToTwoDigits(avg_rt.seconds) }) 
        : i18next.t('realTimeTableMs', { ms: formatNumber(avg_rt.timer * 1000) });
        
    document.getElementById(`rp_avg_ppm`).textContent = i18next.t('prestigesPerMinCountTable', { x: formatNumber(MISC.average.prestiges_per_min(), 'boost') });
    document.getElementById(`rp_avg_cpm`).textContent = i18next.t('crystalPerMinCountTable', { x: formatNumber(MISC.average.crystals_per_min(), 'boost') });

    //Таблица Перепрошиваний


    for (let i = 0; i < 10; i++) {

        document.getElementById(`rr_run_${i}`).textContent = i === 0 ? i18next.t('reflashesAgoZero') : i18next.t('reflashesAgo', {i});
        let rt = player.reflash.resetTable[i];
        let currencyName = i18next.t(getBitOrByteKey(rt.currency));
        
        document.getElementById(`rr_res_${i}`).textContent = rt.resets !== '' 
            ? i18next.t('reflashResetCountTable', { x: formatNumber(rt.resets) }) : '';
            
        document.getElementById(`rr_bits_${i}`).textContent = rt.currency !== '' 
            ? i18next.t('reflashCurrencyCountTable', { x: formatNumber(rt.currency), ref_cur: currencyName }) : '';
        
        if (rt.time.game.timer !== '') {
            document.getElementById(`rr_gt_${i}`).textContent = rt.time.game.timer >= 1 
                ? i18next.t('gameTimeTable', { d: convertToTwoDigits(rt.time.game.days), h: convertToTwoDigits(rt.time.game.hours), m: convertToTwoDigits(rt.time.game.minutes), s: convertToTwoDigits(rt.time.game.seconds) }) 
                : i18next.t('gameTimeTableMs', { ms: formatNumber(rt.time.game.timer * 1000) });
        } else {
            document.getElementById(`rr_gt_${i}`).textContent = '';
        }

        if (rt.time.real.timer !== '') {
            document.getElementById(`rr_rt_${i}`).textContent = rt.time.real.timer >= 1 
                ? i18next.t('realTimeTable', { d: convertToTwoDigits(rt.time.real.days), h: convertToTwoDigits(rt.time.real.hours), m: convertToTwoDigits(rt.time.real.minutes), s: convertToTwoDigits(rt.time.real.seconds) }) 
                : i18next.t('realTimeTableMs', { ms: formatNumber(rt.time.real.timer * 1000) });
        } else {
            document.getElementById(`rr_rt_${i}`).textContent = '';
        }
        
        document.getElementById(`rr_rpm_${i}`).textContent = rt.resets !== '' && rt.time.real.timer > 0 
            ? i18next.t('reflashResetPerMinCountTable', { x: formatNumber(rt.resets * 60 / rt.time.real.timer) }) : '';
            
        document.getElementById(`rr_bpm_${i}`).textContent = rt.currency !== '' && rt.time.real.timer > 0 
            ? i18next.t('reflashCurrencyPerMinCountTable', { x: formatNumber(rt.currency * 60 / rt.time.real.timer), ref_cur: currencyName }) : '';
    }
    
    document.getElementById(`rr_avg_res`).textContent = i18next.t('reflashResetCountTable', { x: formatNumber(MISC.average.reflash.resets(), 'boost') });
    document.getElementById(`rr_avg_bits`).textContent = i18next.t('reflashCurrencyCountTable', { x: formatNumber(MISC.average.reflash.currency(), 'boost') });
    // Средние значения (Averages)

    let avg_gt_ref = convert_time_temp(MISC.average.reflash.game_time());
    document.getElementById(`rr_avg_gt`).textContent = avg_gt_ref.timer >= 1 
        ? i18next.t('gameTimeTable', { d: convertToTwoDigits(avg_gt_ref.days), h: convertToTwoDigits(avg_gt_ref.hours), m: convertToTwoDigits(avg_gt_ref.minutes), s: convertToTwoDigits(avg_gt_ref.seconds) }) 
        : i18next.t('gameTimeTableMs', { ms: formatNumber(avg_gt_ref.timer * 1000) });
        
    let avg_rt_ref = convert_time_temp(MISC.average.reflash.real_time());
    document.getElementById(`rr_avg_rt`).textContent = avg_rt_ref.timer >= 1 
        ? i18next.t('realTimeTable', { d: convertToTwoDigits(avg_rt_ref.days), h: convertToTwoDigits(avg_rt_ref.hours), m: convertToTwoDigits(avg_rt_ref.minutes), s: convertToTwoDigits(avg_rt_ref.seconds) }) 
        : i18next.t('realTimeTableMs', { ms: formatNumber(avg_rt_ref.timer * 1000) });
        
    document.getElementById(`rr_avg_rpm`).textContent = i18next.t('reflashResetPerMinCountTable', { x: formatNumber(MISC.average.reflash.resets_per_min(), 'boost') });
    document.getElementById(`rr_avg_bpm`).textContent = i18next.t('reflashCurrencyPerMinCountTable', { x: formatNumber(MISC.average.reflash.currency_per_min(), 'boost') });



    // 4. Ослабления (Softcaps)
    for (let i = 1; i <= 5; i++) {
        let id = i - 1;
        document.getElementById(`sc_name_${i}`).textContent = i18next.t(`softcaps.${id}.codename`);
        document.getElementById(`sc_desc_${i}`).textContent = i18next.t(`softcaps.${id}.desc`);
        let start = 0, power = 1;
        switch (i) {
            case 1: start = UPGS.coin.singles[22].softcap_start(); power = 0.5; break;
            case 2: start = GAIN.coin.second.softcap().softcap_start; power = GAIN.coin.second.softcap().softcap_power; break;
            case 3: start = GAIN.coin.click.softcap().softcap_start; power = GAIN.coin.click.softcap().softcap_power; break;
            case 4: start = GAIN.crystal.softcap().softcap_start; power = GAIN.crystal.softcap().softcap_power; break;
            case 5: start = GAIN.shard.effect.softcap().softcap_start; power = GAIN.shard.effect.softcap().softcap_power; break;
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
    document.getElementById('ft_coin_cost').textContent = formatNumber(MISC.fortune.cost.coin());
    document.getElementById('ft_cryst_cost').textContent = formatNumber(MISC.fortune.cost.crystal());
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
        document.getElementById(`bb${i}_amt`).textContent = formatNumber(player.balance.upgrades.buyables[i]);
        document.getElementById(`bb${i}_bulk`).textContent = formatNumber(UPGS.balance.buyables[i].bulk());
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
    document.getElementById('switchConfirmation').textContent = i18next.t('switchConfirmation', {status: player.settings.confirmations.reflash});
    document.getElementById('toggleOffline').textContent = i18next.t('offlineGainToggle', {offline: player.settings.offline});
    
    // Обновление текста ползунка автосохранения
    let sliderVal = mySlider.value / 1000;
    let formattedVal = sliderVal < 1 ? formatNumber(sliderVal, 'boost') : formatNumber(sliderVal);
    document.getElementById('autosaveSlider').textContent = i18next.t('autoSaveSlider', {x: formattedVal});

    switch (player.got_export_reward) {
        case false:
            document.getElementById('expSave').innerHTML = i18next.t('exportGame2', {sc: formatNumber(GAIN.supercoin.export.reward())});
            break;
        case true:
            document.getElementById('expSave').innerHTML = i18next.t('exportGame3', {
            s: formatNumber(player.time.real.daily.seconds), 
            m: formatNumber(player.time.real.daily.minutes), 
            h: formatNumber(player.time.real.daily.hours)
        });
            break;
        default:
            break;
    }
}

function loadTranslationsReflash() {
    for (let i = 1; i <= 1; i++) {
        document.getElementById(`rBuyableU${i}_amount`).textContent = formatNumber(player.reflash.upgrades[i]);
        document.getElementById(`rBuyableU${i}_effect`).textContent = formatNumber(UPGS.reflash.buyables[i].effect(), 'boost');
        document.getElementById(`rBuyableU${i}_cost`).textContent = formatNumber(UPGS.reflash.buyables[i].cost(), 'boost', 2, true);
        document.getElementById(`rBuyableU${i}_currency`).textContent = i18next.t(getBitOrByteKey(UPGS.reflash.buyables[i].cost()))
    }

    // 2. Единичные (Single) улучшения перепрошивания
    const rSingleUpgIds = [11, 12, 13, 21, 22, 23];
    for (let i = 1; i <= 3; i++) {
        let upg_id = rSingleUpgIds[i - 1];
        let isBought = player.reflash.singleUpgrades.includes(upg_id);
        
        // Скрываем цену, если куплено
        document.getElementById(`rSingleU${i}_cost_cont`).style.display = isBought ? 'none' : 'inline';
        if (!isBought) {
            document.getElementById(`rSingleU${i}_cost`).textContent = formatNumber(UPGS.reflash.singles[upg_id].cost(), 'boost', 2, true);
            document.getElementById(`rSingleU${i}_currency`).textContent = i18next.t(getBitOrByteKey(UPGS.reflash.singles[upg_id].cost()))
        }
        if (i == 1 || i == 2) {
        document.getElementById(`rSingleU${i}_effect`).textContent = formatNumber(UPGS.reflash.singles[upg_id].effect(), 'boost');
        }
    }
    // 3. Акселератор
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`acceleratorU${i}_effect`).textContent = formatNumber(UPGS.reflash.accelerator[i].effect(), 'boost');
        document.getElementById(`acceleratorU${i}_amount`).textContent = formatNumber(player.reflash.acceleratorUpgrades[i]);
        
        if (i != 5) {
            document.getElementById(`acceleratorU${i}_cost`).textContent = formatNumber(UPGS.reflash.accelerator[i].cost(), 'boost', 2, true)
            document.getElementById(`acceleratorU${i}_currency`).textContent = i18next.t(getBitOrByteKey(UPGS.reflash.accelerator[i].cost()))
        }
        else document.getElementById(`acceleratorU${i}_cost`).textContent = formatNumber(UPGS.reflash.accelerator[i].cost())
    }

    document.getElementById('acceleratorU5_current_utils').textContent = formatNumber(MISC.sum_of_utils())
    document.getElementById('acceleratorMachineBarPercent').textContent = formatNumber(MISC.acc_ratio(), 'boost')

    document.getElementById('acceleratorU5_effect_min').textContent = formatNumber(UPGS.reflash.accelerator[5].min_effect(), 'boost')
    document.getElementById('acceleratorU5_effect_max').textContent = formatNumber(UPGS.reflash.accelerator[5].max_effect(), 'boost')

    // 4. Алгоритм древо
        UPGS.reflash.algo.tree.forEach(node => {
            let btn = document.getElementById('algoNode_' + node.id);
            if (btn) {
                // Достаем переводы
                const globals = getGlobalNumbers()
                let name = i18next.t(`upg_algo_${node.id}_name`);
                let desc = i18next.t(`upg_algo_${node.id}_desc`, globals);
                let costWord = i18next.t('word_cost')
                let currencyWord = i18next.t(getBitOrByteKey(node.cost));
                
                // Собираем всё в саму кнопку: Название (жирное) -> Описание -> Стоимость (тусклая)
                btn.innerHTML = `
                    <ut>${name}</ut>
                    <span>${desc}</span>`;
                if (!player.reflash.algo.includes(node.id)) btn.innerHTML += `<span>${costWord} ${formatNumber(node.cost, 'boost', 2, true)} ${currencyWord}</span>`
            }
        });

        const topBits = document.getElementById('top_ref_cur_val2');
        if (topBits) topBits.textContent = formatNumber(player.reflash.currency, 'boost', 2, true)
        document.getElementById('bitsCount2_currency').textContent = i18next.t(getBitOrByteKey(player.reflash.currency))

        // 5, Компуктер
        for (let i = 0; i < 5; i++) {
            document.getElementsByClassName('computerComponentLevel')[i].textContent = formatNumber(player.reflash.computer[i+1]);
            document.getElementsByClassName('computerComponentPrice')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].cost(), undefined, undefined, true);
            document.getElementsByClassName('computerComponentCurrency')[i].textContent = i18next.t(getBitOrByteKey(UPGS.reflash.computer[i+1].cost()))

            //tooltip
            document.getElementsByClassName('computerComponentName')[i].textContent = i18next.t(`computer.component.names.${i+1}.${player.reflash.computer[i+1]}`)
            if (i+1 != 3) {
                document.getElementsByClassName('computerComponentEffect')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].effect());
                document.getElementsByClassName('computerComponentEffect_next')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].next_effect());
            }
            if (i+1 != 2) {
                document.getElementsByClassName('computerComponentUsage')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].consumation());
                document.getElementsByClassName('computerComponentUsage_next')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].next_consumation());
            }
            if (i+1 == 4) {
                document.getElementsByClassName('computerComponentEffect')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].effect(), 'boost', 2, true);
                document.getElementById('computerComponentEffect4_currency_1').textContent = i18next.t(getBitOrByteKey(UPGS.reflash.computer[4].effect()))
                document.getElementById('computerComponentEffect4_currency_2').textContent = i18next.t(getBitOrByteKey(UPGS.reflash.computer[4].next_effect()))
                document.getElementsByClassName('computerComponentEffect_next')[i].textContent = formatNumber(UPGS.reflash.computer[i+1].next_effect(), 'boost', 2, true);
            }
        }

        document.getElementById('cur_watt_val').textContent = formatNumber(MISC.sum_watt())
        document.getElementById('max_watt_val').textContent = formatNumber(UPGS.reflash.computer[2].effect())
        document.getElementById('cur_comp_lvl').textContent = formatNumber(UPGS.reflash.computer[1].effect())
}

function loadTranslationsEvent() {
    if (player.event.digitalization.activated) {
        document.getElementById('digitalizationEventTimer').textContent = 
        DIGITALIZATION.time_left().timer >= 86400 ? i18next.t('digitalization.eventEnds_1', { d: Math.floor(DIGITALIZATION.time_left().days), h: Math.floor(DIGITALIZATION.time_left().hours) }) :
        DIGITALIZATION.time_left().timer >= 3600 ? i18next.t('digitalization.eventEnds_2', { h: Math.floor(DIGITALIZATION.time_left().hours), m: Math.floor(DIGITALIZATION.time_left().minutes) }) :
        i18next.t('digitalization.eventEnds_3', { m: Math.floor(DIGITALIZATION.time_left().minutes), s: Math.floor(DIGITALIZATION.time_left().seconds) });

        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName('digitalizationDailyQuestTitle')[i].textContent = i18next.t(`digitalization.dailyQuests.${i+1}.name`, { 
                x: formatNumber(
                    Math.min(
                        findRatio2(player.event.digitalization.quests.daily.progress[i], DIGITALIZATION.quests.daily[i+1].requirement())
                        , 100)
                    , 'boost')
                })
            document.getElementsByClassName('digitalizationDailyQuestReward')[i].textContent = i18next.t(`digitalization.dailyQuests.${i+1}.reward`)
            if (i != 1)
            document.getElementsByClassName('digitalizationDailyQuestDesc')[i].textContent = i18next.t(`digitalization.dailyQuests.${i+1}.desc`, { x: Math.floor(player.event.digitalization.quests.daily.progress[i]) })
            else
            document.getElementsByClassName('digitalizationDailyQuestDesc')[i].textContent = i18next.t(`digitalization.dailyQuests.${i+1}.desc`, { x: Math.floor(convert_time_temp(player.event.digitalization.quests.daily.progress[i]).minutes) })
        } 
        for (let i = 0; i < 5; i++) {
            document.getElementsByClassName('digitalizationWeeklyQuestTitle')[i].textContent = i18next.t(`digitalization.weeklyQuests.${i+1}.name`, { 
                x: formatNumber(
                    Math.min(
                        findRatio2(player.event.digitalization.quests.weekly.progress[i], DIGITALIZATION.quests.weekly[i+1].requirement())
                        , 100)
                    , 'boost')
                })
            document.getElementsByClassName('digitalizationWeeklyQuestReward')[i].textContent = i18next.t(`digitalization.weeklyQuests.${i+1}.reward`)
            if (i != 1)
            document.getElementsByClassName('digitalizationWeeklyQuestDesc')[i].textContent = i18next.t(`digitalization.weeklyQuests.${i+1}.desc`, { x: Math.floor(player.event.digitalization.quests.weekly.progress[i]) })
            else 
            document.getElementsByClassName('digitalizationWeeklyQuestDesc')[i].textContent = i18next.t(`digitalization.weeklyQuests.${i+1}.desc`, { x: Math.floor(convert_time_temp(player.event.digitalization.quests.weekly.progress[i]).hours) })
        } 

        document.getElementById('digitalizationQuestTimerDaily').textContent = 
        DIGITALIZATION.quests.daily.left().timer >= 3600 ? i18next.t('digitalization.questReset_2', { 
            h: Math.floor(DIGITALIZATION.quests.daily.left().hours), 
            m: Math.floor(DIGITALIZATION.quests.daily.left().minutes),
            s: Math.floor(DIGITALIZATION.quests.daily.left().seconds) 
        }) :
        i18next.t('digitalization.questReset_3', { 
            m: Math.floor(DIGITALIZATION.quests.daily.left().minutes), 
            s: Math.floor(DIGITALIZATION.quests.daily.left().seconds) 
        });

        document.getElementById('digitalizationQuestTimerWeekly').textContent = 
        DIGITALIZATION.quests.weekly.left().timer >= 86400 ? i18next.t('digitalization.questReset_1', { 
            d: Math.floor(DIGITALIZATION.quests.weekly.left().days), 
            h: Math.floor(DIGITALIZATION.quests.weekly.left().hours),
            m: Math.floor(DIGITALIZATION.quests.weekly.left().minutes) 
        }) :
        DIGITALIZATION.quests.weekly.left().timer >= 3600 ? i18next.t('digitalization.questReset_2', { 
            h: Math.floor(DIGITALIZATION.quests.weekly.left().hours), 
            m: Math.floor(DIGITALIZATION.quests.weekly.left().minutes),
            s: Math.floor(DIGITALIZATION.quests.weekly.left().seconds) 
        }) :
        i18next.t('digitalization.questReset_3', { 
            m: Math.floor(DIGITALIZATION.quests.weekly.left().minutes), 
            s: Math.floor(DIGITALIZATION.quests.weekly.left().seconds) 
        });

        document.getElementById ('digitalizationPassPoints').textContent = i18next.t(`digitalization.points`, { 
            x: formatNumber(player.event.digitalization.pass_points),
            y: formatNumber(DIGITALIZATION.pass.requirement()) 
        })

        document.getElementById('digitalizationPassLevel').textContent = player.event.digitalization.pass_level
        document.getElementById('digitalization-pass-percent').textContent = formatNumber(
                    Math.min(
                        findRatio2(player.event.digitalization.pass_points, DIGITALIZATION.pass.requirement())
                        , 100)
                    )
                
        


    }
    else {
        document.getElementById('digitalizationEventTimer2').textContent = 
        DIGITALIZATION.time_left_to_start().timer >= 86400 ? i18next.t('digitalization.eventStarts_1', { d: Math.floor(DIGITALIZATION.time_left_to_start().days), h: Math.floor(DIGITALIZATION.time_left_to_start().hours) }) :
        DIGITALIZATION.time_left_to_start().timer >= 3600 ? i18next.t('digitalization.eventStarts_2', { h: Math.floor(DIGITALIZATION.time_left_to_start().hours), m: Math.floor(DIGITALIZATION.time_left_to_start().minutes) }) :
        i18next.t('digitalization.eventStarts_3', { m: Math.floor(DIGITALIZATION.time_left_to_start().minutes), s: Math.floor(DIGITALIZATION.time_left_to_start().seconds) });
    }
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
    const globals = getGlobalNumbers(); // Вызываем словарь

    // 1. Быстрый перевод всего статического HTML
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const translated = i18next.t(key, globals); // Подставляем сюда
            if (translated && translated !== key) el.innerHTML = translated;
        }
    });

    // 2. Инициализация массивов для Лора
    for (let i = 1; i <= 21; i++) {
        text.chapter[i] = i18next.t(`chapter${i}`, globals); 
        text.chapterTitle[i] = i18next.t(`chapter${i}Name`, globals);
        let tab = document.getElementById(`chapter${i}Tab`);
        if (tab) tab.textContent = i18next.t(`chapter${i}Name`, globals);
    }

    // 3. Инициализация массивов для Помощи
    for (let i = 1; i <= 25; i++) {
        text.helpTitle[i] = i18next.t(`help${i}Name`, globals);
        if (i !== 13) {
            text.help[i] = i18next.t(`help${i}`, globals);
        } else {
            text.help[13] = i18next.t(`help13`, {
                ...globals, // Подставляем все глобальные числа
                x: formatNumber(GAIN.coin.click.softcap().softcap_start),
                y: player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5,
                z: player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4
            });
        }
        let tab = document.getElementById(`helpTab${i}`);
        if (tab) tab.textContent = i18next.t(`help${i}Name`, globals);
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
    text.notification.challenge_item = i18next.t('challengeItemNotification');

    text.notification.reflash.copy = i18next.t('presetCopyNotification');
    text.notification.reflash.paste = i18next.t('presetPasteNotification');
    text.notification.reflash.save = i18next.t('presetSaveNotification');
    text.notification.reflash.reset = i18next.t('presetResetNotification');
    text.notification.reflash.import = i18next.t('presetImportNotification');

    text.notification.digitalization.daily = i18next.t('digitalization.dailyQuests.notify');
    text.notification.digitalization.weekly = i18next.t('digitalization.weeklyQuests.notify');

    text.changelog.start = i18next.t('startDescription');
    text.chapter.start = i18next.t('startLoreDescription');
    text.help.start = i18next.t('startHelpDescription');

    const versions = ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.5.1', '0.6', '0.7', '0.7.1', '0.8', '0.8.0.1', '0.9', '0.9.1', '0.9.2', '0.10', '0.10.1', '0.11', '0.12', '0.12.1', '0.13', '0.14', '0.15', '0.15.x', '1.0', '1.0.x'];
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
        'Infinity?', i18next.t('pbtitle10'), i18next.t('pbtitle11')
    ];
    PROGRESS.currency = [
        i18next.t('pbcurrency1'), i18next.t('pbcurrency1'), i18next.t('pbcurrency1'), 
        i18next.t('pbcurrency2'), i18next.t('pbcurrency3'), i18next.t('pbcurrency4'), 
        i18next.t('pbcurrency4'), i18next.t('pbcurrency3'), i18next.t('pbcurrency5'), 
        i18next.t('pbcurrency1'), i18next.t('pbcurrency6'), i18next.t('pbcurrency7')
    ];

    // 5. Инициализация 50 Обычных Ачивок
    for (let i = 0; i < 60; i++) {
        const achNaming = window["achName" + (i + 11)];
        if (achNaming) {
            const achNameKey = `achRow1.name.${i}`;
            const achNameWithoutQuotes = i18next.t(achNameKey).replace(/"/g, '');
            achNaming.innerHTML = i18next.t(achNameWithoutQuotes, globals);
            ACHS.names[i] = i18next.t(`achRow1.name.${i}`, globals);
            if (i != 49) {
                const tooltipEl = document.getElementsByClassName("tooltipAch")[i];
                if (tooltipEl) tooltipEl.innerHTML = i18next.t(`achievement${i + 11}Desc`, globals); // И сюда
            }
        }
    }

    // 6. Безопасное обновление Мультипликаторов (графики из clicker.js)
    for (let i = 0; i < 12; i++) text.multiBreakdown[i] = i18next.t(`mbTitles.${i}`);

    text.talk[1].name = i18next.t(`talk.1.name`, { returnObjects: true });
    for (let i = 1; i <= 5; i++) {
        let array = i18next.t(`talk.1.${i}`, { returnObjects: true });
        text.talk[1].stages[i].replies = []
        for (let j = 0; j < array.length; j++) {
            text.talk[1].stages[i].replies.push(i18next.t(`talk.1.${i}`, { returnObjects: true })[j])
        }
    }
}

function getGlobalNumbers() {
    return {
        n1000: formatNumber(1000),
        n2500: formatNumber(2500),
        n10000: formatNumber(10000),
        n100000: formatNumber(100000),
        n1e6: formatNumber(1e6),
        n1e7: formatNumber(1e7),
        n1e8: formatNumber(1e8),
        n1e9: formatNumber(1e9),
        n1e10: formatNumber(1e10),
        n1e15: formatNumber(1e15),
        n1e21: formatNumber(1e21),
        n1e25: formatNumber(1e25),
        n1e50: formatNumber(1e50),
        n1e100: formatNumber(1e100),
        nInf: formatNumber(1.79e308),

        ref_cur: i18next.t('currency_bits.' + updateBitToByteUI())
    };
}

document.getElementById('changingLanguage').addEventListener('click', () => {
    player.settings.currentLanguage = i18next.language == 'ru' ? 'en' : 'ru';
    i18next.changeLanguage(player.settings.currentLanguage, () => {
        updateStaticTranslations(); // Мгновенно переводит всю статику
        showChangelog(text.changelog.start);
        showHelpPage(text.help.start, text.empty);
        initAlgoTree()
    });
});

function changeNotations(option) { player.settings.notation = option.value; updateStaticTranslations()}

changeNotation.addEventListener("change", function(){
        selectedOption2 = select2.options[select2.selectedIndex];
        changeNotations(selectedOption2)
    })

function formatOfflineTime(timeInSeconds) {
    let t = Math.floor(timeInSeconds);
    let d = Math.floor(t / 86400);
    let h = Math.floor((t % 86400) / 3600);
    let m = Math.floor((t % 3600) / 60);
    let s = Math.floor(t % 60);

    let parts = [];
    if (d > 0) parts.push(`${d} ${i18next.t('time_d')}`);
    if (h > 0) parts.push(`${h} ${i18next.t('time_h')}`);
    if (m > 0) parts.push(`${m} ${i18next.t('time_m')}`);
    
    // Секунды показываем, если они больше 0, ИЛИ если всё остальное по нулям
    if (s > 0 || parts.length === 0) parts.push(`${s} ${i18next.t('time_s')}`);

    return parts.join(' ');
}

setTimeout(() => {
    loadingScreen.style.display = 'none'
    document.documentElement.style.overflowY = 'auto'
    wholeGame.style.display = 'block'
    player.time.savedTime = Date.now()
    setInterval(loop, 50)
    offlineGainTitle.innerHTML = i18next.t('offlineGainTitle');   
    player.offline_gain.time == null ? offlineShowGain.innerHTML = '' :
    offlineShowGain.innerHTML = i18next.t('offlineGain', {
    timeDifference: formatOfflineTime(player.offline_gain.time),
    
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
    initAlgoTree();
    renamePresets();
    changeFonts2(player.cosmetics.fonts.current);
}, 3200);

codeInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        readCode();
    }
});

function checkCode(id=999) {
    id += 1
    switch (id) {
        case 1:
            player.shop.items.amount[1] += 2
        break;
        case 2:
            player.shop.items.amount[2] += 1
        break;
        case 3:
            player.shop.items.amount[3] += 5
        break;
        case 4:
            player.shop.items.amount[3] += 10
        break;
        case 5:
            player.supercoin.currency += 150
            player.supercoin.total_currency += 150
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
    const globals = getGlobalNumbers(); // Добавляем
    if (document.getElementById('tooltip-ach60').getAttribute('data-show') == '') {
        if (!ELS.isAch60Opened) {
            document.getElementsByClassName("tooltipAch")[49].innerHTML = i18next.t(`achievement${60}Desc`, {
                trick: i18next.t(`achievement60Tricks.${randomNumber(0, 26)}`, globals), // Сюда
                ...globals // И сюда
            });
            ELS.isAch60Opened = true
        }
    }
    else {
        ELS.isAch60Opened = false
        document.getElementsByClassName("tooltipAch")[49].innerHTML = ''
    }
}

