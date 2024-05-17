import '../../node_modules/i18next/i18next.min.js'



const responseEn = await fetch('./javascript/jsfiles/en.json');
const responseRu = await fetch('./javascript/jsfiles/ru.json');
const translationsEnData = await responseEn.json();
const translationsRuData = await responseRu.json();
await i18next.init({
    lng: player.settings.currentLanguage,
    resources: {
        en: { translation: translationsEnData },
        ru: { translation: translationsRuData }
    },
    interpolation: {
        escapeValue: false,
    }
    });

const loadTranslationsFromChangeLanguage = async () => {
try {
    eventSelect.innerHTML = i18next.t('eventButton');
    settingsSelect.innerHTML = i18next.t('settingsButton');
    mainSelect.innerHTML = i18next.t('clickerButton');
    achSelect.innerHTML = i18next.t('achievementsButton');
    infoSelect.innerHTML = i18next.t('informationSubButton');
    statisticsSelect.innerHTML = i18next.t('statisticsSubButton');
    multiplierSelect.innerHTML = i18next.t('multipliersSubButton');
    aboutGameSelect.innerHTML = i18next.t('aboutButton');
    challengesTimeSelect.innerHTML = i18next.t('challengeTimeButton');
    recentPrestigesSelect.innerHTML =i18next.t('recentPrestigesButton');
    saveSelect.innerHTML = i18next.t('saveButton');
    graphicSelect.innerHTML = i18next.t('graphicButton');
    otherSelect.innerHTML = i18next.t('otherButton');
    coinsSelect.innerHTML = i18next.t('moneyButton');
    challengeSelect.innerHTML = i18next.t('challengeButton');
    overdriveSelect.innerHTML = i18next.t('overdriveButton');
    prestigeSelect.innerHTML = i18next.t('prestigeButton');
    upgradesSelect.innerHTML = i18next.t('prestigeUpgradesButton');
    milestonesSelect.innerHTML = i18next.t('milestonesButton');
    automationSelect.innerHTML = i18next.t('automationButton');
    shardsSelect.innerHTML = i18next.t('shardsButton');
    superCrystalsSelect.innerHTML = i18next.t('superCrystalButton');
    mineralsSelect.innerHTML = i18next.t('mineralsButton');

    settingsTitle.innerHTML = i18next.t('saveTitle');
    settingsTitle2.innerHTML = i18next.t('graphicTitle');
    settingsTitle3.innerHTML = i18next.t('otherTitle');
    savingGame.innerHTML = i18next.t('saveGame');
    loadingGame.innerHTML = i18next.t('loadGame');

    statsTitle.innerHTML = i18next.t('stastisticsTitle');
    recentPrestigesTitle.innerHTML = i18next.t('recentPrestigesTitle');
    challengesTimeTitle.innerHTML = i18next.t('challengesTimeTitle');

    impSave.innerHTML = i18next.t('importGame');
    fileUploader.innerHTML = i18next.t('importGameFromAFile');
    expSave.innerHTML = i18next.t('exportGame');
    changingLanguage.innerHTML = i18next.t('changeLanguage');
    changelogOpen.innerHTML = i18next.t('changelog');
    hardRes.innerHTML = i18next.t('hardReset');
    gameLore.innerHTML = i18next.t('gameLore');
    howToPlay.innerHTML = i18next.t('howToPlay');
    hotkeys.innerHTML = i18next.t('hotkeys');
    chooseSaveButton.innerHTML = i18next.t('chooseSaveButton');

    text.window.hard = i18next.t('resetConfirm');
    text.window.NaN = i18next.t('oopsNaNed');

    yesHR.innerHTML = i18next.t('yes');
    yesRP.innerHTML = i18next.t('yes');
    no.innerHTML = i18next.t('no');

    selectSave.innerHTML = i18next.t('chooseSaveTitle');
    save1.innerHTML = i18next.t('save1');
    save2.innerHTML = i18next.t('save2');
    save3.innerHTML = i18next.t('save3');

    harshUmulti.innerHTML = i18next.t('harshUmulti');

    maxbuy.innerHTML = i18next.t('maxBuy');

    overdriveType1Name.innerHTML = i18next.t('overdriveType1Name');
    overdriveType2Name.innerHTML = i18next.t('overdriveType2Name');

    maxBuyPrestige.innerHTML = i18next.t('maxBuy')

    singleACTitle.innerHTML = i18next.t('singleAutomationTitle')
    buyableACTitle.innerHTML = i18next.t('buyableAutomationTitle')
    umultiplierACTitle.innerHTML = i18next.t('umultiplierAutomationTitle')
    upowerACTitle.innerHTML = i18next.t('upowerAutomationTitle')
    prestigeACTitle.innerHTML = i18next.t('prestigeAutomationTitle')

    autoUmultiInterval.innerHTML = i18next.t('intervalText')
    autoUpowerInterval.innerHTML = i18next.t('intervalText')
    autoUpowerInterval2.innerHTML = i18next.t('requirementText')

    text.automation.prestige_req = i18next.t('timePrestigeMode')
    text.automation.coin_req = i18next.t('coinsPrestigeMode')

    doBreakCrystal.innerHTML = i18next.t('doBreakCrystal')
    howMuchCrystals.innerHTML = i18next.t('breakCrystalTitle')
    howMuchCrystalsDesc.innerHTML = i18next.t('breakCrystalDesc')
    submitBreak.innerHTML = i18next.t('doBreak')

    multiplierTitle.innerHTML = i18next.t('multipliersTitle');

    for (let i = 0; i < 11; i++){
        text.multiBreakdown[i] = i18next.t(`mbTitle${i+1}`)
    }

    chooseClick.innerHTML = i18next.t('mbTitle1')
    chooseSecond.innerHTML = i18next.t('mbTitle2')
    chooseGain.innerHTML = i18next.t('mbTitle3')
    chooseSuperCoins.innerHTML = i18next.t('mbTitle4')
    chooseCrystals.innerHTML = i18next.t('mbTitle5')
    chooseShardsClick.innerHTML = i18next.t('mbTitle6')
    chooseShardsSecond.innerHTML = i18next.t('mbTitle7')
    chooseShardsEffect.innerHTML = i18next.t('mbTitle8')
    chooseCritChance.innerHTML = i18next.t('mbTitle9')
    chooseCritMulti.innerHTML = i18next.t('mbTitle10')
    chooseSimulation.innerHTML = i18next.t('mbTitle11')

    postE15SoftcapGainStats.innerHTML = i18next.t('postE15CoinSoftcap')

    doublerStats.innerHTML = i18next.t('doublerName');
    midasCursorStats.innerHTML = i18next.t('midasCursorName');
    rewardForFeatsStats.innerHTML = i18next.t('rewardName');
    goldenGloveStats.innerHTML = i18next.t('goldenGloveName');
    gainStats.innerHTML = i18next.t('gainName');
    alphaPowerStats.innerHTML = i18next.t('alphaPowerName');
    challenge6Stats.innerHTML = i18next.t('challenge6Name');

    summaryClickStats.innerHTML = i18next.t('totalMultiplier');

    smallInvestmentStats.innerHTML = i18next.t('smallInvestmentName');
    multiplierUpgradeStats.innerHTML = i18next.t('multiplierName');
    richFameStats.innerHTML = i18next.t('richFameName');
    negativeAlphaStats.innerHTML = i18next.t('negativeAlphaName');
    gain2Stats.innerHTML = i18next.t('gainName');
    summarySecondStats.innerHTML = i18next.t('totalMultiplier');
    achievement15Stats.innerHTML = i18next.t('achievement15Name');
    goldenClockStats.innerHTML = i18next.t('goldenClockName');
    challenge8Stats.innerHTML = i18next.t('challenge8Name');
    challenge3Stats.innerHTML = i18next.t('challenge3Name');

    doublerPlusStats.innerHTML = i18next.t('doublerPlusName');
    cashBackStats.innerHTML = i18next.t('cashBack');
    goldenKeyStats.innerHTML = i18next.t('goldenKeyName');
    overdriveType1Stats.innerHTML = i18next.t('overdrive');
    achievementsStats.innerHTML = i18next.t('achievementsName');
    achievement28Stats.innerHTML = i18next.t('achievement28Name');
    hourglassStats.innerHTML = i18next.t('pse9Name');
    antiHourglassStats.innerHTML = i18next.t('pse10Name');
    shardsStats.innerHTML = i18next.t('shardsName');
    secondMineralEffect1Stats.innerHTML = i18next.t('secondMineral2Name');
    umultiplierStats.innerHTML = i18next.t('umultiplierName');
    upowerStats.innerHTML = i18next.t('upowerName');
    activity2Stats.innerHTML = i18next.t('pse2Name');
    challenge1Stats.innerHTML = i18next.t('challenge1Name');
    summaryGainStats.innerHTML = i18next.t('totalMultiplier');

    luckyCloverStats.innerHTML = i18next.t('luckyCloverName');
    charismaStats.innerHTML = i18next.t('charismaName');
    thirdSingleSuperEffectStats.innerHTML = i18next.t('thirdSingleSuperEffectName');
    firstSuperCrystalEffectStats.innerHTML = i18next.t('firstSuperCrystalEffectName');
    firstMineralEffect3Stats.innerHTML = i18next.t('firstMineralEffect3Name');
    achievement37Stats.innerHTML = i18next.t('achievement37Name');
    summarySCChanceStats.innerHTML = i18next.t('totalMultiplier');

    achievement282Stats.innerHTML = i18next.t('achievement28Name');
    brilliantDoublerStats.innerHTML = i18next.t('brilliantDoublerName');
    recyclingStats.innerHTML = i18next.t('recyclingName');
    challenge10Stats.innerHTML = i18next.t('challenge10Name');
    crystalBoostStats.innerHTML = i18next.t('crystalBoostName');
    overdrive2EffectStats.innerHTML = i18next.t('overdrive2Name');
    thirdMineralEffect1Stats.innerHTML = i18next.t('thirdMineralEffect1Name');
    secondSuperCrystalSingleEffectStats.innerHTML = i18next.t('secondSuperCrystalSingleEffectName');
    achievementBonus2Stats.innerHTML = i18next.t('achievementBonus2Name');
    summaryCrystalStats.innerHTML = i18next.t('totalMultiplier');

    firstShardBuyableEffectStats.innerHTML = i18next.t('firstShardBuyableEffectName');
    fifthShopBuyableEffectStats.innerHTML = i18next.t('fifthShopBuyableEffect1Name');
    ninthSuperCrystalSingleEffectStats.innerHTML = i18next.t('ninthSuperCrystalSingleEffectName');
    summaryShPerClickStats.innerHTML = i18next.t('totalMultiplier');

    secondShardBuyableEffectStats.innerHTML = i18next.t('secondShardBuyableEffectName');
    fifthShopBuyableEffect2Stats.innerHTML = i18next.t('fifthShopBuyableEffectStats2Name');
    thirdMineralEffect2Stats.innerHTML = i18next.t('thirdMineralEffect2Name');
    achievement39Stats.innerHTML = i18next.t('achievement39Name');
    achievementBonus3Stats.innerHTML = i18next.t('achievementBonus3Name');
    summaryShPerSecondStats.innerHTML = i18next.t('totalMultiplier');

    shardStats.innerHTML = i18next.t('shardName');
    achievement30Stats.innerHTML = i18next.t('achievement30Name');
    fourthShardSingleEffectStats.innerHTML = i18next.t('fourthShardSingleEffectName');
    postE7SoftcapStats.innerHTML = i18next.t('postE7ShardSoftcap');
    challengeReward7Stats.innerHTML = i18next.t('challengeReward7Name');
    summaryShEffectStats.innerHTML = i18next.t('totalMultiplier');

    baseCriticalChanceEffectStats.innerHTML = i18next.t('baseCriticalChanceEffectName');
    fourthSuperCrystalSingleEffectStats.innerHTML = i18next.t('fourthSuperCrystalSingleEffectName');
    eighthShopBuyableEffectStats.innerHTML = i18next.t('eighthShopBuyableEffectName');
    firstMineralEffect1Stats.innerHTML = i18next.t('firstMineralEffect1Name');
    fifthBuyableSuperEffectStats.innerHTML = i18next.t('fifthBuyableSuperEffectName');
    summaryCritChanceStats.innerHTML = i18next.t('totalMultiplier');
    
    baseCriticalGainEffectStats.innerHTML = i18next.t('baseCriticalGainEffectName');
    fifthSuperCrystalSingleEffectStats.innerHTML = i18next.t('fifthSuperCrystalSingleEffectName');
    ninthShopBuyableEffectStats.innerHTML = i18next.t('ninthShopBuyableEffectName');
    firstMineralEffect2Stats.innerHTML = i18next.t('firstMineralEffect2Name');
    thirdBuyableSuperEffectStats.innerHTML = i18next.t('thirdBuyableSuperEffectName');
    summaryCritMultiStats.innerHTML = i18next.t('totalMultiplier');

    thirdSuperCrystalSingleEffectStats.innerHTML = i18next.t('thirdSuperCrystalSingleEffectName');
    summaryClickSimStats.innerHTML = i18next.t('totalMultiplier');

    aboutGameTitle.innerHTML = i18next.t('aboutGameTitle');

    aboutGame.innerHTML = i18next.t('aboutGame');
    galaxyClickButton.innerHTML = i18next.t('galaxyClickText');
    discordButton.innerHTML = i18next.t('discordText');
    // telegramChannelButton.innerHTML = i18next.t('telegramChannelText');
    // telegramChatButton.innerHTML = i18next.t('telegramChatText');
    gmailButton.innerHTML = i18next.t('gmailText');

    shopDesc.innerHTML = i18next.t('shopDesc');
    shopTitle.innerHTML = i18next.t('shopTitle2');

    shopBuyableU1Title.innerHTML = i18next.t('firstShopBuyableTitle');
    shopBuyableU2Title.innerHTML = i18next.t('secondShopBuyableTitle');
    shopBuyableU3Title.innerHTML = i18next.t('thirdShopBuyableTitle');
    shopBuyableU4Title.innerHTML = i18next.t('fourthShopBuyableTitle');
    shopBuyableU5Title.innerHTML = i18next.t('fifthShopBuyableTitle');
    shopBuyableU6Title.innerHTML = i18next.t('sixthShopBuyableTitle');
    shopBuyableU7Title.innerHTML = i18next.t('seventhShopBuyableTitle');
    shopBuyableU8Title.innerHTML = i18next.t('eighthShopBuyableTitle');
    shopBuyableU9Title.innerHTML = i18next.t('ninthShopBuyableTitle');

    shopSingleU1Title.innerHTML = i18next.t('firstShopSingleTitle');
    shopSingleU2Title.innerHTML = i18next.t('secondShopSingleTitle');
    shopSingleU3Title.innerHTML = i18next.t('thirdShopSingleTitle');

    bulkBuyAmount.innerHTML = i18next.t('bulkBuy');
    bulkBuy10.innerHTML = i18next.t('buy10');
    bulkBuyMax.innerHTML = i18next.t('buyMax');
    bulkBuyClear.innerHTML = i18next.t('resetBulkBuy');

    achievementsTitle.innerHTML = i18next.t('achievementsTitle');
    achievementsDesc.innerHTML = i18next.t('achievementsDesc');

    falseBrokeCrystals.innerHTML = i18next.t('didNotBreakCrystal')

    text.notification.save = i18next.t('saveGameNotification');
    text.notification.load = i18next.t('loadGameNotification');
    text.notification.export = i18next.t('exportGameNotification');
    text.notification.import = i18next.t('importGameNotification');
    text.notification.hard = i18next.t('resetGameNotification');
    text.notification.dailyRewardRestart = i18next.t('dailyRewardRestartNotification');
    text.notification.achievement = i18next.t('achievementGameNotification');
    text.notification.lore = i18next.t('loreGameNotification');

    welcomeToDigitalGod.innerHTML = i18next.t('welcomeToGame')

    text.changelog.start = i18next.t('startDescription');
    changelogTitle.innerHTML = i18next.t('changeLogTitleText');

    text.chapter.start = i18next.t('startLoreDescription');
    loreTitle.innerHTML = i18next.t('storyTitleText');

    text.help.start = i18next.t('startHelpDescription');
    helpTitle.innerHTML = i18next.t('helpTitleText');

    for (let i = 0; i < text.code.rewards.length; i++) {
        text.code.rewards[i] = i18next.t(`codeReward${i+1}`);
    }

    text.changelog['0.0'] = i18next.t('version00');
    text.changelog['0.1'] = i18next.t('version01');
    text.changelog['0.2'] = i18next.t('version02');
    text.changelog['0.3'] = i18next.t('version03');
    text.changelog['0.4'] = i18next.t('version04');
    text.changelog['0.5'] = i18next.t('version05');
    text.changelog['0.5.1'] = i18next.t('version051');
    text.changelog['0.6'] = i18next.t('version06');
    text.changelog['0.7'] = i18next.t('version07');
    text.changelog['0.7.1'] = i18next.t('version071');
    text.changelog['0.8'] = i18next.t('version08');
    text.changelog['0.8.0.1'] = i18next.t('version0801');
    text.changelog['0.9'] = i18next.t('version09');
    text.changelog['0.9.1'] = i18next.t('version091');
    text.changelog['0.9.2'] = i18next.t('version092');
    text.changelog['0.10'] = i18next.t('version010');
    text.changelog['0.10.1'] = i18next.t('version0101');
    text.changelog['0.11'] = i18next.t('version011');
    text.changelog['0.12'] = i18next.t('version012');
    text.changelog['0.12.1'] = i18next.t('version0121');

    noEvent.innerHTML = i18next.t('noEvent');

    spiritualEventTitle.innerHTML = i18next.t('spiritualEventTitle');
    spiritualEventDesc.innerHTML = i18next.t('spiritualEventDesc');

    triplePowerEventTitle.innerHTML = i18next.t('triplePowerEventTitle');
    triplePowerEventDesc.innerHTML = i18next.t('triplePowerEventDesc');
    triplePowerEventTime.innerHTML = i18next.t('triplePowerEventTime');

    exitChallenge.innerHTML = i18next.t('exitChallenge');
    challengeTabDesc.innerHTML = i18next.t('challengeTabDesc');
    restartTheChallenge.innerHTML = i18next.t('restartTheChallenge');

    text.notification.used_item = i18next.t('useItemNotification');
    text.notification.dont_have_item = i18next.t('dontHaveItemNotification');
    text.notification.limit_item = i18next.t('limitItemNotification');
    text.notification.limit_item_2 = i18next.t('limitItemNotification2');

    for (let i = 0; i < text.itemNames.length; i++) {
        text.itemNames[i] = i18next.t(`shopItemTitle${i+1}`);
        window[`shopItem${i+1}Title`].innerHTML = i18next.t(`shopItemTitle${i+1}`);
        document.getElementsByClassName("useButton")[i].innerHTML = i18next.t('useTitle');
    }    

    for (let i = 0; i < 12; i++){
        document.getElementsByClassName("challengeTitle")[i].innerHTML = i18next.t('challengeTitle', {x: i+1});
        document.getElementsByClassName("challengeCond")[i].innerHTML = i18next.t(`challengeConditionText${i+1}`);
        document.getElementsByClassName("challengeReward")[i].innerHTML = i18next.t(`challengeReward${i+1}`);
        document.getElementsByClassName("challengeGoal")[i].innerHTML = i18next.t(`challengeGoal`);
        if (player.challenge.completed.includes(i+1)) document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeCompleted')
        else document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeStart');
    }

    mineralsTabDesc.innerHTML = i18next.t('mineralsDesc');
    respecMineralsButton.innerHTML = i18next.t('respecShop');
}
catch (error) {
    console.error('Ошибка загрузки и инициализации переводов:', error);
}
}

setInterval(() => {
    loadTranslations()
}, 50);

// Загрузка переводов
function loadTranslations() {
    coinsCount.innerHTML = i18next.t('moneyCount', { money: formatNumber(player.coin.currency)});
    coinsGain.innerHTML = i18next.t('moneyPerSec', { gainPerSec: formatNumber(GAIN.coin.second.effect(), 'boost')});

    crystalCount.innerHTML = i18next.t('crystalCount', {crystals: formatNumber(player.prestige.currency, 'floor')});
    
    if (player.coin.currency >= 1e15) {
        doPrestige.innerHTML = i18next.t('prestigeEnabled', { crystalsTemp: formatNumber(GAIN.crystal.reset()), prestigeCountMultiplierText: MILESTONES.has(15) ? i18next.t('prestigeCountMultiplierText', {prestigeCountMultiplier: formatNumber(GAIN.prestige.reset()) }) : ''});
    }
    else doPrestige.innerHTML = i18next.t('prestigeDisabled');

    maxOrNoUpgrades.innerHTML = (player.settings.buy_max_activate) ? i18next.t('maxUpgradesTrue') : i18next.t('maxUpgradesFalse');

    shopSelect.innerHTML = i18next.t('shopButton', {superCoins: formatNumber(player.supercoin.currency)});
    muteAudio.innerHTML = i18next.t('mutingAudio', {status: player.settings.mutedAudio});

    autoSavingGame.innerHTML = i18next.t('autosaveGame', {autoSave: player.settings.auto_save});

    autoTimer.innerHTML = i18next.t('autoSave', {autoSaverTimer: MISC.auto_save_timer.toFixed(2)});
    umultiplierBoost.innerHTML = i18next.t('umultiplierText', {umultipliercount: formatNumber(player.umultipliers), umultiplierBase: formatNumber(GAIN.umultiplier.base(), 'boost'), umultiplier: formatNumber(GAIN.umultiplier.effect(), 'boost'), umultiplierCost: formatNumber(LAYERS.umultiplier.cost())});
    upowerBoost.innerHTML = i18next.t('upowerText', {upowercount: formatNumber(player.upowers), upowerBase: formatNumber(GAIN.upower.base(), 'power'), upower: formatNumber(GAIN.upower.effect(), 'power'), upowerCost: formatNumber(LAYERS.upower.cost())});

    if (!player.settings.modernization_activated) {
        buyableU1.innerHTML = i18next.t('firstBuyable', {amount: formatNumber(player.coin.upgrades[1]), free: MISC.free_upgrade[1]() > 0 ? i18next.t('free', {free: formatNumber(MISC.free_upgrade[1]())}) : '', bulk: formatNumber(UPGS.coin.buyables[1].bulk()), effect: formatNumber(UPGS.coin.buyables[1].effect()), super_effect: player.coin.superUpgrades.includes(11) ? i18next.t('super_effect_plus', {effect: formatNumber(UPGS.coin.buyables[1].effect_super())}) : '', cost: formatNumber(UPGS.coin.buyables.bulk_cost(1))});
        buyableU2.innerHTML = i18next.t('secondBuyable', {amount: formatNumber(player.coin.upgrades[2]), bulk: formatNumber(UPGS.coin.buyables[2].bulk()), effect: formatNumber(UPGS.coin.buyables[2].effect(), 'percent'), super_effect: player.coin.superUpgrades.includes(12) ? i18next.t('super_effect_mul', {effect: formatNumber(UPGS.coin.buyables[2].effect_super(), 'boost')}) : '', cost: formatNumber(UPGS.coin.buyables.bulk_cost(2))});
        buyableU3.innerHTML = i18next.t('thirdBuyable', {amount: formatNumber(player.coin.upgrades[3]), bulk: formatNumber(UPGS.coin.buyables[3].bulk()), effect: formatNumber(UPGS.coin.buyables[3].effect(), 'boost'), super_effect: player.coin.superUpgrades.includes(13) ? i18next.t('super_effect_mul', {effect: formatNumber(UPGS.coin.buyables[3].effect_super(), 'boost')}) : '', cost: formatNumber(UPGS.coin.buyables.bulk_cost(3))});
        buyableU4.innerHTML = i18next.t('fourthBuyable', {amount: formatNumber(player.coin.upgrades[4]), free: MISC.free_upgrade[4]() > 0 ? i18next.t('free', {free: formatNumber(MISC.free_upgrade[4]())}) : '', bulk: formatNumber(UPGS.coin.buyables[4].bulk()), base: UPGS.prestige.singles[22].unl() ? 1.075 : 1.05, effect: formatNumber(UPGS.coin.buyables[4].effect(), 'boost'), super_effect: player.coin.superUpgrades.includes(14) ? i18next.t('super_effect_mul', {effect: formatNumber(UPGS.coin.buyables[4].effect_super(), 'boost')}) : '', cost: formatNumber(UPGS.coin.buyables.bulk_cost(4))});
        buyableU5.innerHTML = i18next.t('fifthBuyable', {amount: formatNumber(player.coin.upgrades[5]), bulk: formatNumber(UPGS.coin.buyables[5].bulk()), effect: formatNumber(UPGS.coin.buyables[5].effect(), 'power'), super_effect: player.coin.superUpgrades.includes(15) ? i18next.t('super_effect_exp', {effect: formatNumber(UPGS.coin.buyables[5].effect_super(), 'power')}) : '', cost: formatNumber(UPGS.coin.buyables.bulk_cost(5))});    
    }
    else {
        buyableU1.innerHTML = i18next.t('superfirstBuyable', {cost: !player.coin.superUpgrades.includes(11) ? i18next.t('super_cost', {cost: UPGS.coin.buyables[1].cost_super()}) : ''})
        buyableU2.innerHTML = i18next.t('supersecondBuyable', {cost: !player.coin.superUpgrades.includes(12) ? i18next.t('super_cost', {cost: UPGS.coin.buyables[2].cost_super()}) : ''})
        buyableU3.innerHTML = i18next.t('superthirdBuyable', {cost: !player.coin.superUpgrades.includes(13) ? i18next.t('super_cost', {cost: UPGS.coin.buyables[3].cost_super()}) : ''})
        buyableU4.innerHTML = i18next.t('superfourthBuyable', {cost: !player.coin.superUpgrades.includes(14) ? i18next.t('super_cost', {cost: UPGS.coin.buyables[4].cost_super()}) : ''})
        buyableU5.innerHTML = i18next.t('superfifthBuyable', {cost: !player.coin.superUpgrades.includes(15) ? i18next.t('super_cost', {cost: UPGS.coin.buyables[5].cost_super()}) : ''})
    }

    progressBarGain.innerHTML = i18next.t('overdriveType1Progress', {overdrivePercent: formatNumber(UNL.overdrive.type1.percent(), 'boost'), overdriveEffect: formatNumber(UNL.overdrive.type1.effect(), 'boost'), overdrivePrice: formatNumber(UNL.overdrive.type1.cost())});
    progressBarGain2.innerHTML = i18next.t('overdriveType2Progress', {overdrivePercent: formatNumber(UNL.overdrive.type2.percent(), 'boost'), overdriveEffect: formatNumber(UNL.overdrive.type2.effect(), 'boost'), overdrivePrice: formatNumber(UNL.overdrive.type2.cost())});

    const singles = [
        singleU1, singleU2, singleU3, singleU4, singleU5,
        singleU6, singleU7, singleU8, singleU9, singleU10
    ]
    const singlesNames = [
        "firstSingle", "secondSingle", "thirdSingle", "fourthSingle", "fifthSingle",
        "sixthSingle", "seventhSingle", "eighthSingle", "ninthSingle", "tenthSingle",
    ]
    const super_types = [
        'super_effect_mul', 'super_effect_mul', 'super_effect_mul', 'super_effect_mul', 'super_effect_plus',
        'super_effect_mul',  'empty', 'super_effect_exp', 'empty', 'empty', 
    ]
    for (let j = 1; j <= 2; j++)
        for (let i = 0; i <= 4; i++) {
            const id = i+((j-1)*5), upg_id = j*10+i+1
            if (!player.settings.modernization_activated) {
                singles[id].innerHTML = i18next.t(singlesNames[id], {
                        effect: id != 9 ? formatNumber(UPGS.coin.singles[upg_id].effect(), 'boost') : formatNumber(UPGS.coin.singles[upg_id].effect(), 'power'), 
                        super_effect: player.coin.superUpgrades.includes(upg_id+10) ? i18next.t(super_types[id], {
                            effect: id != 4 ? formatNumber(UPGS.coin.singles[upg_id].effect_super(), 'boost') : formatNumber(UPGS.coin.singles[upg_id].effect_super())
                        }) : '', 
                        cost: !player.coin.singleUpgrades.includes(upg_id) ? i18next.t('single_cost', {
                            cost: formatNumber(UPGS.coin.singles[upg_id].cost())
                        }) : ''
                    })
                if (id == 6) {
                    singles[id].innerHTML = i18next.t(singlesNames[id], {
                        cap: !UPGS.prestige.singles[23].unl() && UPGS.coin.singles[22].effect() == 100 && !UPGS.coin.singles[22].unl_super() ? i18next.t('capped') : i18next.t('notCapped'),
                        effect: formatNumber(UPGS.coin.singles[upg_id].effect(), 'boost'), 
                        super_effect: player.coin.superUpgrades.includes(upg_id+10) ? i18next.t(super_types[id], {
                            effect: formatNumber(UPGS.coin.singles[upg_id].effect_super(), 'boost')
                        }) : '', 
                        cost: !player.coin.singleUpgrades.includes(upg_id) ? i18next.t('single_cost', {
                            cost: formatNumber(UPGS.coin.singles[upg_id].cost())
                        }) : ''
                    })
                }
                else if (id == 8) {
                    singles[id].innerHTML = i18next.t(singlesNames[id], {
                        cap: UPGS.coin.singles[24].effect() == 1.25*UPGS.coin.singles[24].effect_super() ? i18next.t('capped') : i18next.t('notCapped'), 
                        effect: formatNumber(UPGS.coin.singles[upg_id].effect(), 'power'), 
                        super_effect: player.coin.superUpgrades.includes(upg_id+10) ? i18next.t(super_types[id], {
                            effect: formatNumber(UPGS.coin.singles[upg_id].effect_super(), 'power')
                        }) : '', 
                        cost: !player.coin.singleUpgrades.includes(upg_id) ? i18next.t('single_cost', {
                            cost: formatNumber(UPGS.coin.singles[upg_id].cost())
                        }) : ''
                    })
                }
            }
            else singles[id].innerHTML = i18next.t('super' + singlesNames[id], {
                cost: !player.coin.superUpgrades.includes(upg_id+10) ? i18next.t('super_cost', {
                    cost: UPGS.coin.singles[upg_id].cost_super()
                }) : ''
            })
        }

    pBuyableU1.innerHTML = i18next.t('firstPrestigeBuyable', {
        amount: formatNumber(player.prestige.upgrades[1]), 
        effect: formatNumber(UPGS.prestige.buyables[1].effect(), 'boost'), 
        cost: formatNumber(UPGS.prestige.buyables[1].cost())
    });
    pBuyableU2.innerHTML = i18next.t('secondPrestigeBuyable', {
        amount: formatNumber(player.prestige.upgrades[2]), 
        effect: formatNumber(UPGS.prestige.buyables[2].effect(), 'boost'), 
        cost: formatNumber(UPGS.prestige.buyables[2].cost())
    });

    const prestige_singles = [
        pSingleU1, pSingleU2, pSingleU3, pSingleU4, 
        pSingleU5,pSingleU6, pSingleU7, pSingleU8, 
        pSingleU9, pSingleU10, pSingleU11, pSingleU12, 
        pSingleU13, pSingleU14, pSingleU15, pSingleU16,
    ]
    const prestige_singles_name = [
        "firstPrestigeSingle", "secondPrestigeSingle", "thirdPrestigeSingle", "fourthPrestigeSingle",
        "fifthPrestigeSingle", "sixthPrestigeSingle", "seventhPrestigeSingle", "eighthPrestigeSingle",
        "ninthPrestigeSingle", "tenthPrestigeSingle", "eleventhPrestigeSingle", "twelfthPrestigeSingle",
        "thirteenthPrestigeSingle", "fourteenthPrestigeSingle", "fifteenthPrestigeSingle", "sixteenthPrestigeSingle",
    ]

    for (let j = 1; j <= 4; j++)
    for (let i = 1; i <= 4; i++) {
        const id = i+((j-1)*4)-1, upg_id = j*10+i
            prestige_singles[id].innerHTML = i18next.t(prestige_singles_name[id], {
                    effect: upg_id != 12 ? i18next.t('prestige_effect_mul', {
                        effect: formatNumber(UPGS.prestige.singles[upg_id].effect(), 'boost')
                    }) : 
                    i18next.t('prestige_effect_exp', {
                        effect: formatNumber(UPGS.prestige.singles[upg_id].effect(), 'power')
                    }),  
                    cost: !player.prestige.singleUpgrades.includes(upg_id) ? i18next.t('prestige_cost', {
                        cost: formatNumber(UPGS.prestige.singles[upg_id].cost(), 'power')
                    }) : '',
                    multi: ACHS.has(27) ? 10 : 2,
                    time: ACHS.has(27) ? 10 : 5
                })
        }

    shBuyableU1.innerHTML = i18next.t('firstShardBuyable', {
        amount: formatNumber(player.shard.upgrades[1]), 
        effect: formatNumber(UPGS.shard.buyables[1].effect(), 'boost'), 
        cost: formatNumber(UPGS.shard.buyables[1].cost())
    });
    shBuyableU2.innerHTML = i18next.t('secondShardBuyable', {
        amount: formatNumber(player.shard.upgrades[2]), 
        effect: formatNumber(UPGS.shard.buyables[2].effect(), 'boost'), 
        cost: formatNumber(UPGS.shard.buyables[2].cost())
    });
    shBuyableU3.innerHTML = i18next.t('thirdShardBuyable', {
        amount: formatNumber(player.shard.upgrades[3]), 
        effect1: formatNumber(UPGS.shard.buyables[3].effect().min, 'boost'), 
        effect2: formatNumber(UPGS.shard.buyables[3].effect().max, 'boost'), 
        cost: formatNumber(UPGS.shard.buyables[3].cost())
    });

    const shard_singles = [
        shSingleU1, shSingleU2, shSingleU3, shSingleU4, shSingleU5, shSingleU6,
    ];

    const shard_singles_name = [
        "firstShardSingle", "secondShardSingle", "thirdShardSingle", "fourthShardSingle", "fifthShardSingle", "sixthShardSingle", 
    ];
//xx/^^/
    for (let j = 1; j <= 2; j++)
    for (let i = 1; i <= 3; i++) {
        const id = i+((j-1)*3)-1, upg_id = j*10+i
            shard_singles[id].innerHTML = i18next.t(shard_singles_name[id], {
                    effect: upg_id != 11 && upg_id != 12 ? //if it's not x
                    upg_id != 13 && upg_id != 23 ? //if it's not / (then it's ^)
                    i18next.t('shard_effect_exp', {
                        effect: formatNumber(UPGS.shard.singles[upg_id].effect(), 'power')
                    }) : 
                    i18next.t('shard_effect_div', {
                        effect: formatNumber(UPGS.shard.singles[upg_id].effect(), 'boost')
                    }) :
                    i18next.t('shard_effect_mul', {
                        effect: formatNumber(UPGS.shard.singles[upg_id].effect(), 'boost')
                    }),  
                    cost: !player.shard.singleUpgrades.includes(upg_id) ? i18next.t('shard_cost', {
                        cost: formatNumber(UPGS.shard.singles[upg_id].cost())
                    }) : '',
                })
        }

    const tooltips = [
        tooltipbuyableU1, tooltipbuyableU2, tooltipbuyableU3, tooltipbuyableU4, tooltipbuyableU5,
        tooltipsingleU1, tooltipsingleU2, tooltipsingleU3, tooltipsingleU4, tooltipsingleU5,
        tooltipsingleU6, tooltipsingleU7, tooltipsingleU8, tooltipsingleU9, tooltipsingleU10
    ]

    const tooltips_name = [
        'firstBuyableTooltip', 'secondBuyableTooltip', 'thirdBuyableTooltip', 'fourthBuyableTooltip', 'fifthBuyableTooltip', 
        'firstSingleTooltip', 'secondSingleTooltip', 'thirdSingleTooltip', 'fourthSingleTooltip', 'fifthSingleTooltip', 'sixthSingleTooltip', 'seventhSingleTooltip', 'eighthSingleTooltip', 'ninthSingleTooltip', 'tenthSingleTooltip', 
    ]

    for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 5; c++){
            const id = c+((r-1)*5)-1, upg_id = (r*10+c)-10
            let effect = ''
            if (r == 1) {
                if (c == 1) effect = formatNumber(UPGS.coin.buyables[c].effect_super())
                else if (c == 5) effect = formatNumber(UPGS.coin.buyables[c].effect_super(), 'power')
                else effect = formatNumber(UPGS.coin.buyables[c].effect_super(), 'boost')
                tooltips[id].innerHTML = i18next.t(tooltips_name[id], {
                    x: effect,  
                })
            }
            else {
                if (upg_id == 15) effect = formatNumber(UPGS.coin.singles[upg_id].effect_super())
                else if (upg_id == 23) effect = formatNumber(UPGS.coin.singles[upg_id].effect_super(), 'power')
                else effect = formatNumber(UPGS.coin.singles[upg_id].effect_super(), 'boost')
                tooltips[id].innerHTML = i18next.t(tooltips_name[id], {
                    x: effect,  
                })
            }
        }
    }

    const supercrystal_singles = [
        sCSingleU1, sCSingleU2, sCSingleU3, sCSingleU4, sCSingleU5,
        sCSingleU6, sCSingleU7, sCSingleU8, sCSingleU9
    ];

    const supercrystal_singles_name = [
        "firstSuperCrystalSingle", "secondSuperCrystalSingle", "thirdSuperCrystalSingle", "fourthSuperCrystalSingle", "fifthSuperCrystalSingle",
        "sixthSuperCrystalSingle", "seventhSuperCrystalSingle", "eighthSuperCrystalSingle", "ninthSuperCrystalSingle"
    ];

    for (let j = 1; j <= 3; j++)
    for (let i = 1; i <= 3; i++) {
        const id = i+((j-1)*3)-1, upg_id = j*10+i
        supercrystal_singles[id].innerHTML = i18next.t(supercrystal_singles_name[id], {
                    effect: formatNumber(UPGS.supercrystal[upg_id].effect(), 'boost'),  
                    cost: !player.supercrystal.upgrades.includes(upg_id) ? i18next.t('supercrystal_cost', {
                        cost: formatNumber(UPGS.supercrystal[upg_id].cost())
                    }) : '',
                })
        }

    pouredShards.innerHTML = i18next.t('pourShards', {x: formatNumber(player.supercrystal.consumedShards), y: formatNumber(UNL.supercrystal.cost())});

    superCrystalCount.innerHTML = i18next.t('superCrystalAmount', {x: formatNumber(player.supercrystal.currency)})

    for (let i = 1; i < 21; i++) {
        const milestoneEl = document.getElementById(`pMilestone${i}`)
        const milestoneEl2 = `prestigeMilestone${i}`
        milestoneEl.innerHTML = i18next.t(milestoneEl2);
    }

    singleACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber(MISC.automation.single.time()/1000, 'power')});
    buyableACInterval.innerHTML = i18next.t('automationDesc2', {interval: formatNumber(MISC.automation.buyable.time()/1000, 'power'), bulkBuyDesc: i18next.t('bulkBuyDesc', {bulk: formatNumber(MISC.automation.buyable.bulk())})});
    umultiplierACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber(MISC.automation.umultiplier.time()/1000, 'power')});
    upowerACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber(MISC.automation.upower.time()/1000, 'power')});
    prestigeACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber(MISC.automation.prestige.time()/1000, 'power')});

    ELS.automationUpgradesArray[0].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(MISC.automation.single.cost())})
    ELS.automationUpgradesArray[1].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(MISC.automation.buyable.cost())})
    ELS.automationUpgradesArray[2].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(MISC.automation.umultiplier.cost())})
    ELS.automationUpgradesArray[3].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(MISC.automation.upower.cost())})
    ELS.automationUpgradesArray[4].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(MISC.automation.prestige.cost())})

    increaseBulkBuyButton.innerHTML = i18next.t('increaseBulk', {price: formatNumber(MISC.automation.buyable.cost())})

    if (player.settings.whichPrestigeMode == 'time') autoPrestigeMode.innerHTML = text.automation.prestige_req
    if (player.settings.whichPrestigeMode == 'coins') autoPrestigeMode.innerHTML = text.automation.coin_req

    shardsCountText.innerHTML = i18next.t('shardCount', {shards: formatNumber(player.shard.currency), percent: formatNumber(GAIN.shard.effect.effect(), 'percent')})
    shardsPerSecondText.innerHTML = i18next.t('shardsPerSec', {shards: formatNumber(GAIN.shard.second(), 'boost')})

    brokeCrystals.innerHTML = i18next.t('didBreakCrystal', {crystals: formatNumber(text.broken_crystals.broken_crystals), shards: formatNumber(text.broken_crystals.gain)})

    shardUnlock1Text.innerHTML = i18next.t('shardUnlockable1', {percent: formatNumber(UNL.shard.second.percent(), 'boost'), consumedShards: formatNumber(player.shard.consumed.second), price: formatNumber(UNL.shard.second.cost)});
    shardUnlock2Text.innerHTML = i18next.t('shardUnlockable2', {percent: formatNumber(UNL.shard.click.percent(), 'boost'), consumedShards: formatNumber(player.shard.consumed.click), price: formatNumber(UNL.shard.click.cost)});
    shardUnlock3Text.innerHTML = i18next.t('shardUnlockable3', {percent: formatNumber(UNL.shard.buyables.percent(), 'boost'), consumedShards: formatNumber(player.shard.consumed.buyables), price: formatNumber(UNL.shard.buyables.cost)});
    shardUnlock4Text.innerHTML = i18next.t('shardUnlockable4', {percent: formatNumber(UNL.shard.singles.percent(), 'boost'), consumedShards: formatNumber(player.shard.consumed.singles), price: formatNumber(UNL.shard.singles.cost)});

    achBonus.innerHTML = i18next.t('achievementsBonus', {
        achievementBonus: formatNumber(ACHS.effect.coin(), 'boost'), 
        1: UPGS.coin.singles[25].unl_super() ? i18next.t('achievementsBonus1', {x: formatNumber(ACHS.effect.crystal(), 'boost')}) : '', 
        2: UPGS.coin.singles[25].unl_super() ? i18next.t('achievementsBonus2', {x: formatNumber(ACHS.effect.shard(), 'boost')}) : ''
    })
    for (let i = 0; i < 30; i++) {
        const achNaming = window["achName" + (i + 11)]; // Добавляем 11, чтобы начать с 11-го элемента
        const achNameKey = `achRow1.name.${i}`;
        const achNameWithoutQuotes = i18next.t(achNameKey).replace(/"/g, ''); // Удалить все кавычки из строки
        achNaming.innerHTML = i18next.t(achNameWithoutQuotes);
        ACHS.names[i] = i18next.t(`achRow1.name.${i}`);
        document.getElementsByClassName("tooltipAch")[i].innerHTML = i18next.t(`achievement${i + 11}Desc`); // Добавляем 11, чтобы начать с 11-го элемента
    }    

    totalCoins.innerHTML = i18next.t('totalMoney', {totalCoins: formatNumber(player.coin.total_currency)});
    totalSuperCoinsStats.innerHTML = i18next.t('totalSuperMoney', {totalSuperCoins: formatNumber(player.supercoin.total_currency)});
    totalCrystalsStats.innerHTML = i18next.t('totalCrystals', {totalCrystals: formatNumber(player.prestige.total_currency)});
    totalPrestigesStats.innerHTML = i18next.t('totalPrestiges', {prestiges: formatNumber(player.prestige.resets)});
    gameTime.innerHTML = i18next.t('gameTime', {
        gameDaysText: formatNumber(player.time.game.total.days, 'floor'),
        gameHoursText: formatNumber(player.time.game.total.hours, 'floor'), 
        gameMinutesText: formatNumber(player.time.game.total.minutes, 'floor'), 
        gameSecondsText: formatNumber(player.time.game.total.seconds, 'floor')
    });
    realTime.innerHTML = i18next.t('realTime', {
        w: formatNumber(player.time.real.total.days, 'floor'),
        x: formatNumber(player.time.real.total.hours, 'floor'),
        y: formatNumber(player.time.real.total.minutes, 'floor'),
        z: formatNumber(player.time.real.total.seconds, 'floor')
    });
    prestigeTime.innerHTML = i18next.t('prestigeTime', {
        prestigeDaysText: formatNumber(player.time.game.prestige.days, 'floor'),
        prestigeHoursText: formatNumber(player.time.game.prestige.hours, 'floor'), 
        prestigeMinutesText: formatNumber(player.time.game.prestige.minutes, 'floor'), 
        prestigeSecondsText: formatNumber(player.time.game.prestige.seconds, 'floor')
    });

    fastestPrestigeTime.innerHTML = i18next.t('fastestPrestigeTime', {
        days: player.time.real.fastestPrestige.timer > 86399 ? i18next.t('daysText', {
            days: formatNumber(player.time.game.fastestPrestige.days, 'floor')
        }) : '',
        hours: player.time.real.fastestPrestige.timer > 3599 ? i18next.t('hoursText', {
            hours: formatNumber(player.time.game.fastestPrestige.hours, 'floor')
        }) : '',
        minutes: player.time.real.fastestPrestige.timer > 59 ? i18next.t('minutesText', {
            minutes: formatNumber(player.time.real.fastestPrestige.minutes, 'floor')
        }) : '',
        seconds: player.time.real.fastestPrestige.timer >= 1 ? formatNumber(player.time.real.fastestPrestige.seconds, 'floor') : formatNumber(player.time.real.fastestPrestige.timer, 'boost'),
    });

    offlinePrestigeFarm.innerHTML = ACHS.has(22) || MILESTONES.has(16) ? i18next.t('offlinePrestigesStats', {
        prestiges: MILESTONES.has(16) ? i18next.t('offlinePrestige', {
            prestiges: formatNumber(GAIN.prestige.offline(60), 'boost')
        }) : '',
        crystals: ACHS.has(22) ? i18next.t('offlineCrystal', {
            crystals: formatNumber(GAIN.crystal.offline(undefined, 60), 'boost')
        }) : '',
    }) : ''
    
    totalClicks.innerHTML = i18next.t('totalClicks', {clickCount: formatNumber(player.clicks.real)})
    totalGameClicks.innerHTML = i18next.t('totalGameClicks', {clickCount: formatNumber(player.clicks.simulated)})
    totalCriticalClicks.innerHTML = i18next.t('totalCriticalClicks', {clickCount: formatNumber(player.clicks.critical)})

    postE13coinsSoftcapClickStats.innerHTML =  i18next.t('postE13CoinSoftcap', {
        x: formatNumber(GAIN.coin.click.softcap().softcap_start, 'boost')
    })
    postE13coinsSoftcapSecondStats.innerHTML =  i18next.t('postE13CoinSoftcap', {
        x: formatNumber(GAIN.coin.second.softcap().softcap_start, 'boost')
    })

    postE13coinsSoftcapClickStatsEffect.innerHTML = player.prestige.singleUpgrades.includes(11) ? '^'+0.45 : '^'+0.4
    postE13coinsSoftcapSecondStatsEffect.innerHTML = player.prestige.singleUpgrades.includes(11) ? '^'+0.55 : '^'+0.5
    
    superCount.innerHTML = i18next.t('superCoinCount', {supercoins: formatNumber(player.supercoin.currency)});
    respecShop.innerHTML = i18next.t('respecShop');
    respecSuperCrystalSingle.innerHTML = i18next.t('respecShop');

    const shop_buyables = [
        tooltipShopBuyableU1, tooltipShopBuyableU2, tooltipShopBuyableU3, tooltipShopBuyableU4, tooltipShopBuyableU5,
    ];

    const shop_buyables_name = [
        "firstShopBuyable", "secondShopBuyable", "thirdShopBuyable", "fourthShopBuyable", "fifthShopBuyable",
    ];

    for (let i = 0; i < 5; i++){
        const id = i+1
        shop_buyables[i].innerHTML = i18next.t(shop_buyables_name[i], {
            amount: formatNumber(player.shop.upgrades[id]), 
            bulk: formatNumber(UPGS.shop.buyables[id].bulk()), 
            effect: formatNumber(UPGS.shop.buyables[id].effect(), 'percent'), 
            cost: player.shop.upgrades[id] != UPGS.shop.buyables[id].maxAmount ? i18next.t('shop_cost', {
                cost: formatNumber(UPGS.shop.buyables.bulk_cost(id))
            }) : ''
        })
        window[`shopBuyableU${id}Req`].innerHTML = formatNumber(player.shop.upgrades[id]) + '/' + UPGS.shop.buyables[id].maxAmount
    }

    const shop_permanents = [
        tooltipShopBuyableU6, tooltipShopBuyableU7, tooltipShopBuyableU8, tooltipShopBuyableU9,
    ];

    const shop_permanent_name = [
        "sixthShopBuyable", "seventhShopBuyable", "eighthShopBuyable", "ninthShopBuyable",
    ];

    for (let i = 0; i < 4; i++){
        const id = i+1
        if (id != 3) shop_permanents[i].innerHTML = i18next.t(shop_permanent_name[i], {
            amount: formatNumber(player.shop.permanentUpgrades[id]), 
            effect: formatNumber(UPGS.shop.permanent[id].effect(), 'percent'), 
            cost: player.shop.permanentUpgrades[id] != UPGS.shop.permanent[id].maxAmount ? i18next.t('shop_cost', {
                cost: formatNumber(UPGS.shop.permanent[id].cost())
            }) : ''
        })
        else shop_permanents[i].innerHTML = i18next.t(shop_permanent_name[i], {
            amount: formatNumber(player.shop.permanentUpgrades[id]), 
            effect: formatNumber(UPGS.shop.permanent[id].effect(), 'boost'), 
            cost: player.shop.permanentUpgrades[id] != UPGS.shop.permanent[id].maxAmount ? i18next.t('shop_cost', {
                cost: formatNumber(UPGS.shop.permanent[id].cost())
            }) : ''
        })
        window[`shopBuyableU${id+5}Req`].innerHTML = formatNumber(player.shop.permanentUpgrades[id]) + '/' + UPGS.shop.permanent[id].maxAmount
    }

    const shop_unlockables = [
        tooltipShopSingleU1, tooltipShopSingleU2, tooltipShopSingleU3,
    ];

    const shop_unlockables_name = [
        "firstShopSingle", "secondShopSingle", "thirdShopSingle",
    ];
    
    for (let i = 0; i < 3; i++){
        const id = i+1
        shop_unlockables[i].innerHTML = i18next.t(shop_unlockables_name[i], {
            cost: !player.shop.unlockables.includes(id) ? i18next.t('shop_cost', {
                cost: formatNumber(UPGS.shop.unlockables[id].cost())
            }) : ''
        })
        window[`shopSingleU${id}Req`].innerHTML = formatNumber(Number(player.shop.unlockables.includes(id))) + '/' + 1
    }

    const shop_items = [
        tooltipshopItem1, tooltipshopItem2, tooltipshopItem3, tooltipshopItem4,
    ];

    const shop_items_name = [
        "firstShopItem", "secondShopItem", "thirdShopItem", "fourthShopItem",
    ];
    
    for (let i = 0; i < 4; i++){
        const id = i+1
        shop_items[i].innerHTML = i18next.t(shop_items_name[i], {
            amount: player.shop.items.amount[id],
            max: UPGS.shop.items[id].maxAmount,
            cost: i18next.t('shop_cost', {
                cost: formatNumber(UPGS.shop.items[id].cost())
            })
        })
        window[`shopItem${id}Req`].innerHTML = formatNumber(player.shop.items.amount[id]) + '/' + UPGS.shop.items[id].maxAmount
    }

    offlineGainTitle.innerHTML = i18next.t('offlineGainTitle');   
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

    for (let i = 1; i < 17; i++) {
        if (i < 12) {
            window[`chapter${i}Tab`].innerHTML = i18next.t(`chapter${i}Name`);
            text.chapter[i] = i18next.t(`chapter${i}`);
        }
        window[`helpTab${i}`].innerHTML = i18next.t(`help${i}Name`);
        text.helpTitle[i] = i18next.t(`help${i}Name`);
        if (i != 13) text.help[i] = i18next.t(`help${i}`);
    }

    text.help[13] = i18next.t(`help13`, {
        x: formatNumber(GAIN.coin.click.softcap().softcap_start),
        y: player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5,
        z: player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4
        })

    challengeCondition.innerHTML = ''
    if (player.challenge.activated == 2) challengeCondition.innerHTML = i18next.t('challengeCondition2')
    if (player.challenge.activated == 7) {
        (MISC.amount_of_upgrades.coin()/50*100) <= 100 ? challengeCondition.innerHTML = i18next.t('challengeCondition7', {x: formatNumber(MISC.amount_of_upgrades.coin()/50*100, 'boost')}) : challengeCondition.innerHTML = i18next.t('challengeCondition7', {x: 100})
    }
    if (player.challenge.activated == 8) challengeCondition.innerHTML = i18next.t('challengeCondition8', {x: formatNumber(CHALL.virusCoins_gen())})
    if (player.challenge.activated == 10) challengeCondition.innerHTML = i18next.t('challengeCondition10', {x: 25-MISC.amount_of_upgrades.coin()}) 

    challenge3Reward.innerHTML = i18next.t('challengeReward3', {
        x: player.challenge.completed.includes(3) ? formatNumber(CHALL[3].effect(), 'power') : formatNumber(1, 'power')
    })
    challenge4Reward.innerHTML = i18next.t('challengeReward4', {
        x: player.challenge.completed.includes(4) ? formatNumber(CHALL[4].effect()) : formatNumber(0)
    })
    challenge5Reward.innerHTML = i18next.t('challengeReward5', {
        x: player.challenge.completed.includes(5) ? formatNumber(CHALL[5].effect(), 'boost') : formatNumber(1, 'boost')
    })
    challenge6Reward.innerHTML = i18next.t('challengeReward6', {
        x: player.challenge.completed.includes(6) ? formatNumber(CHALL[6].effect(), 'boost') : formatNumber(1, 'boost')
    })
    challenge7Reward.innerHTML = i18next.t('challengeReward7', {
        x: player.challenge.completed.includes(7) ? formatNumber(CHALL[7].effect(), 'boost') : formatNumber(1, 'boost')
    })
    challenge8Reward.innerHTML = i18next.t('challengeReward8', {
        x: player.challenge.completed.includes(8) ? formatNumber(CHALL[8].effect(), 'boost') : formatNumber(1, 'boost')
    })
    challenge9Reward.innerHTML = i18next.t('challengeReward9', {
        x: player.challenge.completed.includes(9) ? formatNumber(CHALL[9].effect(), 'boost') : formatNumber(1, 'boost')
    })
    challenge10Reward.innerHTML = i18next.t('challengeReward10', {
        x: player.challenge.completed.includes(10) ? formatNumber(CHALL[10].effect(), 'boost') : formatNumber(1, 'boost')
    })

    if (player.challenge.activated == 0) youAreInXWorld.innerHTML = i18next.t('challengeDeactivated')
    else youAreInXWorld.innerHTML = i18next.t('challengeActivated', {x: player.challenge.activated})

    for (let i = 0; i < 12; i++){
        const id = i+1
        if (player.challenge.completed.includes(id)) document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeCompleted')
        else document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeStart');
    }

    superCrystalPour.innerHTML = UNL.supercrystal.pour()+'%'

    tooltipMineral1.innerHTML = i18next.t('makeMineral', {x: formatNumber(UPGS.minerals[1].cost2())});
    tooltipMineral2.innerHTML = i18next.t('makeMineral', {x: formatNumber(UPGS.minerals[2].cost2())});
    tooltipMineral3.innerHTML = i18next.t('makeMineral', {x: formatNumber(UPGS.minerals[3].cost2())});

    mineral1Desc.innerHTML = i18next.t('mineral1', {
        x: formatNumber(player.minerals[1]), 
        e1: formatNumber(UPGS.minerals[1].effect1(), 'boost'), 
        e2: formatNumber(UPGS.minerals[1].effect2(), 'boost'), 
        e3: formatNumber(UPGS.minerals[1].effect3(), 'boost')
    })
    mineral2Desc.innerHTML = i18next.t('mineral2', {
        x: formatNumber(player.minerals[2]), 
        e1: formatNumber(UPGS.minerals[2].effect1(), 'boost'), 
        e2: formatNumber(UPGS.minerals[2].effect2(), 'boost'), 
        e3: formatNumber(UPGS.minerals[2].effect3(), 'boost')
    })
    mineral3Desc.innerHTML = i18next.t('mineral3', {
        x: formatNumber(player.minerals[3]), 
        e1: formatNumber(UPGS.minerals[3].effect1(), 'boost'), 
        e2: formatNumber(UPGS.minerals[3].effect2(), 'boost'), 
        e3: formatNumber(UPGS.minerals[3].effect3(), 'boost')
    })

    runesCount.innerHTML = i18next.t('runesCount', {x: formatNumber(player.rune.currency)})
    shardsCountForMinerals.innerHTML = i18next.t('shardsCountForMinerals', {x: formatNumber(player.shard.currency)})

    generateRunes.innerHTML = i18next.t('generateRunes', {x: formatNumber(UNL.rune.cost())})

    PROGRESS.name[0] = i18next.t('pbtitle1');
    PROGRESS.name[1] = i18next.t('pbtitle2');
    PROGRESS.name[2] = i18next.t('pbtitle3');
    PROGRESS.name[3] = i18next.t('pbtitle4');
    PROGRESS.name[4] = i18next.t('pbtitle5');
    PROGRESS.name[5] = i18next.t('pbtitle6');

    PROGRESS.currency[0] = i18next.t('pbcurrency1');
    PROGRESS.currency[1] = i18next.t('pbcurrency1');
    PROGRESS.currency[2] = i18next.t('pbcurrency1');
    PROGRESS.currency[3] = i18next.t('pbcurrency2');
    PROGRESS.currency[4] = i18next.t('pbcurrency1');
    PROGRESS.currency[5] = i18next.t('pbcurrency1');

    for (let i = 0; i < 12; i++){
        const id = i+1
        if (player.challenge.completed.includes(id) && player.challenge.time[id].timer > 0.999) 
        window[`challengeTime${id}`].innerHTML = i18next.t('challengeTime', {
            n: formatNumber(i+1), 
            h: convertToTwoDigits(player.challenge.time[id].hours), 
            m: convertToTwoDigits(player.challenge.time[id].minutes), 
            s: convertToTwoDigits(player.challenge.time[id].seconds)
        })
        else if (player.challenge.completed.includes(id)) 
            window[`challengeTime${id}`].innerHTML = i18next.t('challengeTimeFast', {
            n: formatNumber(i+1), 
            ms: formatNumber(player.challenge.time[id].timer*1000)
            })
        else 
            window[`challengeTime${id}`].innerHTML = i18next.t('challengeNotCompletedYet', {
            n: formatNumber(i+1)
            })
        }

    for (let i = 0; i < 10; i++) {
        const id = i
        if (i == 0) document.getElementsByClassName('runTable')[i].innerHTML = i18next.t('prestigesAgoZero')
        else document.getElementsByClassName('runTable')[i].innerHTML = i18next.t('prestigesAgo', {i});
        if (player.prestige.prestigeTable[id].prestiges != '') 
        document.getElementsByClassName('prestigesTable')[i].innerHTML = i18next.t('prestigesCountTable', {
            x: formatNumber(player.prestige.prestigeTable[id].prestiges)
        });
        if (player.prestige.prestigeTable[id].crystals != '') 
        document.getElementsByClassName('crystalsTable')[i].innerHTML = i18next.t('crystalCountTable', {
            x: formatNumber(player.prestige.prestigeTable[id].crystals)
        });
        if (player.prestige.prestigeTable[id].time.game.timer != '') {
            if (player.prestige.prestigeTable[id].time.game.timer >= 1) 
            document.getElementsByClassName('gameTimeTable')[i].innerHTML = i18next.t('gameTimeTable', {
                h: convertToTwoDigits(player.prestige.prestigeTable[id].time.game.hours), 
                m: convertToTwoDigits(player.prestige.prestigeTable[id].time.game.minutes), 
                s: convertToTwoDigits(player.prestige.prestigeTable[id].time.game.seconds)
            });
            else document.getElementsByClassName('gameTimeTable')[i].innerHTML = i18next.t('gameTimeTableMs', {
                ms: formatNumber(player.prestige.prestigeTable[id].time.game.timer*1000)
            });
        } 
        if (player.prestige.prestigeTable[id].time.real.timer != '') {
            if (player.prestige.prestigeTable[id].time.real.timer >= 1) 
            document.getElementsByClassName('realTimeTable')[i].innerHTML = i18next.t('realTimeTable', {
                h: convertToTwoDigits(player.prestige.prestigeTable[id].time.real.hours), 
                m: convertToTwoDigits(player.prestige.prestigeTable[id].time.real.minutes), 
                s: convertToTwoDigits(player.prestige.prestigeTable[id].time.real.seconds)
            });
            else document.getElementsByClassName('realTimeTable')[i].innerHTML = i18next.t('realTimeTableMs', {
                ms: formatNumber(player.prestige.prestigeTable[id].time.real.timer*1000)
            });
        } 
    }

    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName('tableTitle')[i].innerHTML = i18next.t(`titleTable${i+1}`);
    }

    autosaveSlider.innerHTML = i18next.t('autoSaveSlider', {x: mySlider.value/1000 < 1 ? formatNumber(JSON.parse(mySlider.value/1000), 'boost') : formatNumber(JSON.parse(mySlider.value/1000))});
    toggleOffline.innerHTML = i18next.t('offlineGainToggle', {offline: player.settings.offline})
}

document.getElementById('changingLanguage').addEventListener('click', () => {
    player.settings.currentLanguage = i18next.language == 'ru' ? 'en' : 'ru';
    i18next.changeLanguage(player.settings.currentLanguage, () => {
      // Обновление текста после смены языка
    loadTranslationsFromChangeLanguage();
    showChangelog(text.changelog.start)
    showStory(text.chapter.start)
    showHelpPage(text.help.start, text.empty)
    });
});

setTimeout(() => {
    loadingScreen.style.display = 'none'
    document.documentElement.style.overflowY = 'auto'
    wholeGame.style.display = 'block'
}, 2000);

window.onload = loadTranslationsFromChangeLanguage();

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
    case 7:
        player.supercoin.currency += 128
        player.supercoin.total_currency += 128
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
                loadTranslations()
                whichCode.innerHTML = text.code.true_code
                player.code.activated.push(codeInput.value)

            }
        }
    }
    openWindow('code', true)
}
