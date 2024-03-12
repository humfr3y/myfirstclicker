import '../../node_modules/i18next/i18next.min.js'



const responseEn = await fetch('./javascript/jsfiles/en.json');
const responseRu = await fetch('./javascript/jsfiles/ru.json');
const translationsEnData = await responseEn.json();
const translationsRuData = await responseRu.json();
await i18next.init({
    lng: currentLanguage,
    resources: {
        en: { translation: translationsEnData },
        ru: { translation: translationsRuData }
    }
    });

const loadTranslationsFromChangeLanguage = async () => {
try {
    progressBarTitles[0] = i18next.t('pbtitle1');
    progressBarTitles[1] = i18next.t('pbtitle2');
    progressBarTitles[2] = i18next.t('pbtitle3');

    progressBarCurrencies[0] = i18next.t('pbcurrency1');

    harshUmulti.innerHTML = i18next.t('harshUmulti');
    
    eventSelect.innerHTML = i18next.t('eventButton');
    settingsSelect.innerHTML = i18next.t('settingsButton');
    mainSelect.innerHTML = i18next.t('clickerButton');
    achSelect.innerHTML = i18next.t('achievementsButton');
    infoSelect.innerHTML = i18next.t('informationSubButton');
    statisticsSelect.innerHTML = i18next.t('statisticsSubButton');
    multiplierSelect.innerHTML = i18next.t('multipliersSubButton');
    aboutGameSelect.innerHTML = i18next.t('aboutButton');
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

    settingsTitle.innerHTML = i18next.t('saveTitle');
    settingsTitle2.innerHTML = i18next.t('graphicTitle');
    settingsTitle3.innerHTML = i18next.t('otherTitle');
    savingGame.innerHTML = i18next.t('saveGame');
    loadingGame.innerHTML = i18next.t('loadGame');

    impSave.innerHTML = i18next.t('importGame');
    fileUploader.innerHTML = i18next.t('importGameFromAFile');
    expSave.innerHTML = i18next.t('exportGame');
    changingLanguage.innerHTML = i18next.t('changeLanguage');
    changelogOpen.innerHTML = i18next.t('changelog');
    hardRes.innerHTML = i18next.t('hardReset');
    gameLore.innerHTML = i18next.t('gameLore');
    howToPlay.innerHTML = i18next.t('howToPlay');
    hotkeys.innerHTML = i18next.t('hotkeys');

    resetTitle = i18next.t('resetConfirm');
    NaNedTitle = i18next.t('oopsNaNed');

    yesHR.innerHTML = i18next.t('yes');
    yesRP.innerHTML = i18next.t('yes');
    no.innerHTML = i18next.t('no');

    maxbuy.innerHTML = i18next.t('maxBuy');

    capped = i18next.t('capped');
    notCapped = i18next.t('notCapped');

    overdriveType1Name.innerHTML = i18next.t('overdriveType1Name');

    maxBuyPrestige.innerHTML = i18next.t('maxBuy')

    singleACTitle.innerHTML = i18next.t('singleAutomationTitle')
    buyableACTitle.innerHTML = i18next.t('buyableAutomationTitle')
    umultiplierACTitle.innerHTML = i18next.t('umultiplierAutomationTitle')
    upowerACTitle.innerHTML = i18next.t('upowerAutomationTitle')
    prestigeACTitle.innerHTML = i18next.t('prestigeAutomationTitle')

    autoUmultiInterval.innerHTML = i18next.t('intervalText')
    autoUpowerInterval.innerHTML = i18next.t('intervalText')
    autoUpowerInterval2.innerHTML = i18next.t('requirementText')

    autoPrestigeTime = i18next.t('timePrestigeMode')
    autoPrestigeCoins = i18next.t('coinsPrestigeMode')

    doBreakCrystal.innerHTML = i18next.t('doBreakCrystal')
    howMuchCrystals.innerHTML = i18next.t('breakCrystalTitle')
    howMuchCrystalsDesc.innerHTML = i18next.t('breakCrystalDesc')
    submitBreak.innerHTML = i18next.t('doBreak')

    multiplierTitle.innerHTML = i18next.t('multipliersTitle');

    gainPerClickTitle = i18next.t('clickTitle')
    gainPerSecondTitle = i18next.t('secondTitle')
    gainTitle = i18next.t('gainTitle')
    superCoinsChanceTitle = i18next.t('superCoinsChanceTitle')
    crystalsMultiplierTitle = i18next.t('crystalsGainTitle')

    chooseClick.innerHTML = i18next.t('clickTitle')
    chooseSecond.innerHTML = i18next.t('secondTitle')
    chooseGain.innerHTML = i18next.t('gainTitle')
    chooseSuperCoins.innerHTML = i18next.t('superCoinsChanceTitle')
    chooseCrystals.innerHTML = i18next.t('crystalsGainTitle')

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
    umultiplierStats.innerHTML = i18next.t('umultiplierName');
    upowerStats.innerHTML = i18next.t('upowerName');
    activity2Stats.innerHTML = i18next.t('pse2Name');
    challenge1Stats.innerHTML = i18next.t('challenge1Name');
    summaryGainStats.innerHTML = i18next.t('totalMultiplier');

    luckyCloverStats.innerHTML = i18next.t('luckyCloverName');
    charismaStats.innerHTML = i18next.t('charismaName');
    summarySCChanceStats.innerHTML = i18next.t('totalMultiplier');

    achievement282Stats.innerHTML = i18next.t('achievement28Name');
    brilliantDoublerStats.innerHTML = i18next.t('brilliantDoublerName');
    recyclingStats.innerHTML = i18next.t('recyclingName');
    challenge10Stats.innerHTML = i18next.t('challenge10Name');
    crystalBoostStats.innerHTML = i18next.t('crystalBoostName');
    summaryCrystalStats.innerHTML = i18next.t('totalMultiplier');

    aboutGameTitle.innerHTML = i18next.t('aboutGameTitle');

    aboutGame.innerHTML = i18next.t('aboutGame');
    galaxyClickButton.innerHTML = i18next.t('galaxyClickText');
    discordButton.innerHTML = i18next.t('discordText');
    telegramChannelButton.innerHTML = i18next.t('telegramChannelText');
    telegramChatButton.innerHTML = i18next.t('telegramChatText');
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
    shopSingleU1Title.innerHTML = i18next.t('firstShopSingleTitle');

    bulkBuyAmount.innerHTML = i18next.t('bulkBuy');
    bulkBuy10.innerHTML = i18next.t('buy10');
    bulkBuyMax.innerHTML = i18next.t('buyMax');
    bulkBuyClear.innerHTML = i18next.t('resetBulkBuy');

    achievementsTitle.innerHTML = i18next.t('achievementsTitle');
    achievementsDesc.innerHTML = i18next.t('achievementsDesc');

    falseBrokeCrystals.innerHTML = i18next.t('didNotBreakCrystal')

    statsTitle.innerHTML = i18next.t('stastisticsTitle');

    saveNotify = i18next.t('saveGameNotification');
    loadNotify = i18next.t('loadGameNotification');
    exportNotify = i18next.t('exportGameNotification');
    importNotify = i18next.t('importGameNotification');
    hardNotify = i18next.t('resetGameNotification');
    achNotify = i18next.t('achievementGameNotification');
    loreNotify = i18next.t('loreGameNotification');

    startDesc = i18next.t('startDescription');
    changelogTitle.innerHTML = i18next.t('changeLogTitleText');

    startChapDesc = i18next.t('startLoreDescription');
    loreTitle.innerHTML = i18next.t('storyTitleText');

    startHelpDesc = i18next.t('startHelpDescription');
    helpTitle.innerHTML = i18next.t('helpTitleText');

    for (let i = 0; i < codeRewards.length; i++) {
        codeRewards[i] = i18next.t(`codeReward${i+1}`);
    }

    desc00 = i18next.t('version00');
    desc01 = i18next.t('version01');
    desc02 = i18next.t('version02');
    desc03 = i18next.t('version03');
    desc04 = i18next.t('version04');
    desc05 = i18next.t('version05');
    desc051 = i18next.t('version051');
    desc06 = i18next.t('version06');
    desc07 = i18next.t('version07');
    desc071 = i18next.t('version071');
    desc08 = i18next.t('version08');
    desc0801 = i18next.t('version0801');
    desc09 = i18next.t('version09');
    desc091 = i18next.t('version091');
    desc092 = i18next.t('version092');
    desc010 = i18next.t('version010');
    desc0101 = i18next.t('version0101');
    desc011 = i18next.t('version011');

    noEvent.innerHTML = i18next.t('noEvent');

    spiritualEventTitle.innerHTML = i18next.t('spiritualEventTitle');
    spiritualEventDesc.innerHTML = i18next.t('spiritualEventDesc');

    triplePowerEventTitle.innerHTML = i18next.t('triplePowerEventTitle');
    triplePowerEventDesc.innerHTML = i18next.t('triplePowerEventDesc');
    triplePowerEventTime.innerHTML = i18next.t('triplePowerEventTime');

    exitChallenge.innerHTML = i18next.t('exitChallenge');
    challengeTabDesc.innerHTML = i18next.t('challengeTabDesc');
    restartTheChallenge.innerHTML = i18next.t('restartTheChallenge');

    useNotify = i18next.t('useItemNotification');
    notUseNotify = i18next.t('dontHaveItemNotification');
    notUseNotify2 = i18next.t('limitItemNotification');
    notUseNotify3 = i18next.t('limitItemNotification2');

    for (let i = 0; i < itemNames.length; i++) {
        itemNames[i] = i18next.t(`shopItemTitle${i+1}`);
        window[`shopItem${i+1}Title`].innerHTML = i18next.t(`shopItemTitle${i+1}`);
        document.getElementsByClassName("useButton")[i].innerHTML = i18next.t('useTitle');
    }    

    for (let i = 0; i < 12; i++){
        document.getElementsByClassName("challengeTitle")[i].innerHTML = i18next.t('challengeTitle', {x: i+1});
        document.getElementsByClassName("challengeCond")[i].innerHTML = i18next.t(`challengeConditionText${i+1}`);
        document.getElementsByClassName("challengeReward")[i].innerHTML = i18next.t(`challengeReward${i+1}`);
        document.getElementsByClassName("challengeGoal")[i].innerHTML = i18next.t(`challengeGoal`);
        if (challengeCompleted[i]) document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeCompleted')
        else document.getElementsByClassName("challengeStart")[i].innerHTML = i18next.t('challengeStart');
    }

}
catch (error) {
    console.error('Ошибка загрузки и инициализации переводов:', error);
}
}
// Загрузка переводов
const loadTranslations = async () => {

    coinsCount.innerHTML = i18next.t('moneyCount', { money: formatNumber(money)});
    coinsGain.innerHTML = i18next.t('moneyPerSec', { gainPerSec: formatBoost(gainPerSecond*20)});

    crystalCount.innerHTML = i18next.t('crystalCount', {crystals: formatNumber3(crystals)});
    if (prestigeMilestonesEffects[14])
    prestigeCountText = i18next.t('prestigeCountMultiplierText', {prestigeCountMultiplier: formatNumber(prestigeCountMultiplier2)});
    else prestigeCountText = ''
    
    if (money >= 1e15) {
        doPrestige.innerHTML = i18next.t('prestigeEnabled', { crystalsTemp: formatNumber(crystalsTemp), prestigeCountMultiplierText: prestigeCountText});
    }
    else doPrestige.innerHTML = i18next.t('prestigeDisabled');

    if (maxOrNoVar) {
        maxOrNoUpgrades.innerHTML = i18next.t('maxUpgradesTrue');
    }
    else {
        maxOrNoUpgrades.innerHTML = i18next.t('maxUpgradesFalse');
    }

    // if (isSpiritualEvent) eventSelect.innerHTML = i18next.t('eventButtonSpiritual', {spirits: formatNumber(spirits)});
    // else eventSelect.innerHTML = i18next.t('eventButton');
    shopSelect.innerHTML = i18next.t('shopButton', {superCoins: formatNumber(superCoins)});
    muteAudio.innerHTML = i18next.t('mutingAudio', {status: isMuted});

    autoSavingGame.innerHTML = i18next.t('autosaveGame', {autoSave: autoSaving});

    autoSaverTimer += 0.05
    autoTimer.innerHTML = i18next.t('autoSave', {autoSaverTimer: autoSaverTimer.toFixed(2)});
    umultiplierBoost.innerHTML = i18next.t('umultiplierText', {umultipliercount: formatNumber(umultipliercount), umultiplierBase: formatBoost(baseUmult), umultiplier: formatBoost(umultiplier), umultiplierCost: formatNumber(umultiplierCost)});
    upowerBoost.innerHTML = i18next.t('upowerText', {upowercount: formatNumber(upowercount), upowerBase: formatPower(baseUpow), upower: formatPower(upower), upowerCost: formatNumber(upowerCost)});


    if (challengeCompleted[3]) {
        buyableU1.innerHTML = i18next.t('firstBuyable2', {firstBuyableAmount: formatNumber(firstBuyable.amount), x: formatNumber(firstBuyable.bulkAmount), firstBuyableFreeAmount: formatNumber(firstBuyable.freeAmount), firstBuyableEffect: formatNumber(firstBuyableEffect), firstBuyablePrice: formatNumber(firstBuyable.bulkPrice)});
    }
    else buyableU1.innerHTML = i18next.t('firstBuyable', {firstBuyableAmount: formatNumber(firstBuyable.amount), x: formatNumber(firstBuyable.bulkAmount), firstBuyableEffect: formatNumber(firstBuyableEffect), firstBuyablePrice: formatNumber(firstBuyable.bulkPrice)});
    
    buyableU2.innerHTML = i18next.t('secondBuyable', {secondBuyableAmount: formatNumber(secondBuyable.amount), x: formatNumber(secondBuyable.bulkAmount), secondBuyableEffect: formatNumber(secondBuyableEffect*10), secondBuyablePrice: formatNumber(secondBuyable.bulkPrice)});
    buyableU3.innerHTML = i18next.t('thirdBuyable', {thirdBuyableAmount: formatNumber(thirdBuyable.amount), x: formatNumber(thirdBuyable.bulkAmount), thirdBuyableEffect: formatBoost(thirdBuyableEffect), thirdBuyablePrice: formatNumber(thirdBuyable.bulkPrice)});
    buyableU4.innerHTML = i18next.t('fourthBuyable', {effect: prestigeSinglesEffects[5], fourthBuyableAmount: formatNumber(fourthBuyable.amount), x: formatNumber(fourthBuyable.bulkAmount), fourthBuyableEffect: formatBoost(fourthBuyableEffect), fourthBuyablePrice: formatNumber(fourthBuyable.bulkPrice)});
    buyableU5.innerHTML = i18next.t('fifthBuyable', {fifthBuyableAmount: formatNumber(fifthBuyable.amount), x: formatNumber(fifthBuyable.bulkAmount), fifthBuyableEffect: formatPower(fifthBuyableEffect), fifthBuyablePrice: formatNumber(fifthBuyable.bulkPrice)});


    progressBarGain.innerHTML = i18next.t('overdriveType1Progress', {overdrivePercent: formatBoost(overdriveType1.percent), overdriveEffect: formatBoost(overdriveType1.effect), overdrivePrice: formatNumber(overdriveType1.price)});

const singleElements = [
    singleU1, singleU2, singleU3, singleU4, singleU5,
    singleU6, singleU7, singleU8, singleU9, singleU10,
    pSingleU1, pSingleU2, pSingleU3, pSingleU4, pSingleU5,
    pSingleU6, pSingleU7, pSingleU8, pSingleU9, pSingleU10,
    pSingleU11, pSingleU12, pSingleU13, pSingleU14, pSingleU15, pSingleU16,
    shSingleU1, shSingleU2, shSingleU3, shSingleU4, shSingleU5, shSingleU6
];

const singleNames = [
    "firstSingle", "secondSingle", "thirdSingle", "fourthSingle", "fifthSingle",
    "sixthSingle", "seventhSingle", "eighthSingle", "ninthSingle", "tenthSingle",
    "firstPrestigeSingle", "secondPrestigeSingle", "thirdPrestigeSingle", "fourthPrestigeSingle",
    "fifthPrestigeSingle", "sixthPrestigeSingle", "seventhPrestigeSingle", "eighthPrestigeSingle",
    "ninthPrestigeSingle", "tenthPrestigeSingle", "eleventhPrestigeSingle", "twelfthPrestigeSingle",
    "thirteenthPrestigeSingle", "fourteenthPrestigeSingle", "fifteenthPrestigeSingle", "sixteenthPrestigeSingle",
    "firstShardSingle", "secondShardSingle", "thirdShardSingle", "fourthShardSingle", "fifthShardSingle", "sixthShardSingle", 
];

for (const [index, singleName] of singleNames.entries()) {
    const single = window[singleName];
    const singleElement = singleElements[index];
    const effectKey = `${singleName}Effect`;
    const priceTextKey = `${singleName}PriceText`;
    const priceKey = `${singleName}Price`;


    const singleEffect = window[effectKey];

    if (singleName.includes("Prestige")) {
        singleElement.innerHTML = i18next.t(singleName, {
            [priceKey]: single.priceText
        });
    } else {
    singleElement.innerHTML = i18next.t(singleName, {
        [effectKey]: formatBoost(singleEffect),
        [priceKey]: single.priceText
    });
    if (singleName.includes('fourthShardSingle') || singleName.includes('fifthShardSingle')) {
        singleElement.innerHTML = i18next.t(singleName, {
            [effectKey]: formatPower(singleEffect),
            [priceKey]: single.priceText
        });
    }
}

    if (single.amount === 0) {
        single.priceText = i18next.t(priceTextKey, { [priceKey]: formatNumber(single.price) });
    } else {
        single.priceText = "";
    }
}
    if (secondPrestigeSingle.amount == 1) {
        secondPrestigeSingle.priceText = i18next.t('prestigeSingleEffectPowerText', {effect: formatPower(prestigeSinglesEffects[1])});
        pSingleU2.innerHTML = i18next.t('secondPrestigeSingle', {secondPrestigeSinglePrice: secondPrestigeSingle.priceText});
    }

    if (ninthPrestigeSingle.amount == 1) {
        ninthPrestigeSingle.priceText = i18next.t('prestigeSingleEffectText', {effect: formatBoost(prestigeSinglesEffects[8])});
    }
        if (!achRow1.completion[16]){
            pSingleU9.innerHTML = i18next.t('ninthPrestigeSingle', {multi: 2, time: 5, ninthPrestigeSinglePrice: ninthPrestigeSingle.priceText});
        }
        else {
            pSingleU9.innerHTML = i18next.t('ninthPrestigeSingle', {multi: 10, time: 10, ninthPrestigeSinglePrice: ninthPrestigeSingle.priceText});
        }
    

    if (tenthPrestigeSingle.amount == 1) {
        tenthPrestigeSingle.priceText = i18next.t('prestigeSingleEffectText', {effect: formatBoost(prestigeSinglesEffects[9])});
        pSingleU10.innerHTML = i18next.t('tenthPrestigeSingle', {tenthPrestigeSinglePrice: tenthPrestigeSingle.priceText});
    }

    if (seventhSingleEffect == 100) {
        singleU7.innerHTML = i18next.t('seventhSingle', {isCapped: capped, seventhSingleEffect: formatBoost(seventhSingleEffect), seventhSinglePrice: seventhSingle.priceText});
    }
    else {
        singleU7.innerHTML = i18next.t('seventhSingle', {isCapped: notCapped, seventhSingleEffect: formatBoost(seventhSingleEffect), seventhSinglePrice: seventhSingle.priceText});
    }

    if (ninthSingleEffect == 1.25) {
        singleU9.innerHTML = i18next.t('ninthSingle', {isCapped: capped, ninthSingleEffect: formatPower(ninthSingleEffect), ninthSinglePrice: ninthSingle.priceText});
    }
    else {
        singleU9.innerHTML = i18next.t('ninthSingle', {isCapped: notCapped, ninthSingleEffect: formatPower(ninthSingleEffect), ninthSinglePrice: ninthSingle.priceText});
    }
    

    pBuyableU1.innerHTML = i18next.t('firstPrestigeBuyable', {firstPrestigeBuyableAmount: formatNumber(firstPrestigeBuyable.amount), firstPrestigeBuyableEffect: formatNumber(firstPrestigeBuyableEffect), firstPrestigeBuyablePrice: formatNumber(firstPrestigeBuyable.price)});
    pBuyableU2.innerHTML = i18next.t('secondPrestigeBuyable', {secondPrestigeBuyableAmount: formatNumber(secondPrestigeBuyable.amount), secondPrestigeBuyableEffect: formatNumber(secondPrestigeBuyableEffect), secondPrestigeBuyablePrice: formatNumber(secondPrestigeBuyable.price)});

    for (let i = 1; i < 21; i++) {
        const milestoneEl = document.getElementById(`pMilestone${i}`)
        const milestoneEl2 = `prestigeMilestone${i}`
        milestoneEl.innerHTML = i18next.t(milestoneEl2);
    }

    const shardBuyables = ['firstShardBuyable', 'secondShardBuyable']
    for (const i of shardBuyables) {
        window['shBuyableU' + (shardBuyables.indexOf(i) + 1)].innerHTML = i18next.t(i, {
            amount: formatNumber(window[i].amount),
            effect: formatBoost(window[i + 'Effect']),
            price: formatNumber(window[i].price)
        });
    }
    shBuyableU3.innerHTML = i18next.t('thirdShardBuyable', {amount: formatNumber(thirdShardBuyable.amount), effect1: formatBoost(thirdShardBuyableEffect[0]), effect2: formatBoost(thirdShardBuyableEffect[1]), price: formatNumber(thirdShardBuyable.price)});



    bulkBuyText = i18next.t('bulkBuyDesc', {bulk: buyableInterval.effect})

    singleACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber4(singleInterval.time/1000)});
    buyableACInterval.innerHTML = i18next.t('automationDesc2', {interval: formatNumber4(buyableInterval.time/1000), bulkBuyDesc: bulkBuyText});
    umultiplierACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber4(umultiplierInterval.time/1000)});
    upowerACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber4(upowerInterval.time/1000)});
    prestigeACInterval.innerHTML = i18next.t('automationDesc', {interval: formatNumber4(prestigeInterval.time/1000)});

    automationUpgradesArray[0].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(singleInterval.price)})
    automationUpgradesArray[1].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(buyableInterval.price)})
    automationUpgradesArray[2].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(umultiplierInterval.price)})
    automationUpgradesArray[3].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(upowerInterval.price)})
    automationUpgradesArray[4].innerHTML =  i18next.t('decreaseInterval', {percent: 40, price: formatNumber(prestigeInterval.price)})

    const intervalArray = [singleInterval, buyableInterval, umultiplierInterval, upowerInterval, prestigeInterval]

    for (let i = 0; i < intervalArray.length; i++) {
        if (intervalArray[i].time == 50) {
            automationUpgradesArray[i].style.display = 'none'
        }
        else automationUpgradesArray[i].style.display = 'block'
        if (intervalArray[4].time == 50 && prestigeMilestonesEffects[13]) {
            prestigeModeDiv.style.display = 'flex'
            prestigeACInterval.style.display = 'none'
        }
        else {
            prestigeModeDiv.style.display = 'none' 
            prestigeACInterval.style.display = 'block'
        }
        if ((intervalArray[1].time == 50 && prestigeMilestonesEffects[5]) && buyableInterval.effect != 512) {
            increaseBulkBuyButton.style.display = 'flex'
        }
        else increaseBulkBuyButton.style.display = 'none'
        if (intervalArray[2].time == 50) {
            umultiIntervalDiv.style.display = 'flex'
            umultiplierACInterval.style.display = 'none'
        }
        else {
            umultiIntervalDiv.style.display = 'none'
            umultiplierACInterval.style.display = 'block'
        }
        if (intervalArray[3].time == 50) {
            upowerIntervalDiv.style.display = 'flex'
            upowerACInterval.style.display = 'none'
        }
        else {
            upowerIntervalDiv.style.display = 'none'
            upowerACInterval.style.display = 'block'
        }
    }

    increaseBulkBuyButton.innerHTML = i18next.t('increaseBulk', {price: formatNumber(buyableInterval.price)})

    
    if (whichPrestigeMode == 'time') autoPrestigeMode.innerHTML = autoPrestigeTime
    if (whichPrestigeMode == 'coins') autoPrestigeMode.innerHTML = autoPrestigeCoins

    shardsCountText.innerHTML = i18next.t('shardCount', {shards: formatNumber(shards), percent: formatPercent((shardsEffect))})
    shardsPerSecondText.innerHTML = i18next.t('shardsPerSec', {shards: formatBoost(shardsPerSecond*20)})

    brokeCrystals.innerHTML = i18next.t('didBreakCrystal', {crystals: formatNumber(brokenCrystalsTemp), shards: formatNumber(shardsTemp)})


    shardUnlock1Text.innerHTML = i18next.t('shardUnlockable1', {percent: formatBoost(shardUnlockablePerSecond.percent), consumedShards: formatNumber(shardUnlockablePerSecond.consumedShards), price: formatNumber(shardUnlockablePerSecond.price)});
    shardUnlock2Text.innerHTML = i18next.t('shardUnlockable2', {percent: formatBoost(shardUnlockableClick.percent), consumedShards: formatNumber(shardUnlockableClick.consumedShards), price: formatNumber(shardUnlockableClick.price)});
    shardUnlock3Text.innerHTML = i18next.t('shardUnlockable3', {percent: formatBoost(shardUnlockableBuyables.percent), consumedShards: formatNumber(shardUnlockableBuyables.consumedShards), price: formatNumber(shardUnlockableBuyables.price)});
    shardUnlock4Text.innerHTML = i18next.t('shardUnlockable4', {percent: formatBoost(shardUnlockableSingles.percent), consumedShards: formatNumber(shardUnlockableSingles.consumedShards), price: formatNumber(shardUnlockableSingles.price)});


    achBonus.innerHTML = i18next.t('achievementsBonus', {achievementBonus: formatBoost(achievementBonus)});
    for (let i = 0; i < 20; i++) {
        const achNaming = window["achName" + (i + 11)]; // Добавляем 11, чтобы начать с 11-го элемента
        const achNameKey = `achRow1.name.${i}`;
        const achNameWithoutQuotes = i18next.t(achNameKey).replace(/"/g, ''); // Удалить все кавычки из строки
        achNaming.innerHTML = i18next.t(achNameWithoutQuotes);
        achRow1.name[i] = i18next.t(`achRow1.name.${i}`);
        document.getElementsByClassName("tooltipAch")[i].innerHTML = i18next.t(`achievement${i + 11}Desc`); // Добавляем 11, чтобы начать с 11-го элемента
    }    


    totalCoins.innerHTML = i18next.t('totalMoney', {totalCoins: formatNumber(total)});
    totalSuperCoinsStats.innerHTML = i18next.t('totalSuperMoney', {totalSuperCoins: formatNumber(totalSuperCoins)});
    totalCrystalsStats.innerHTML = i18next.t('totalCrystals', {totalCrystals: formatNumber(totalCrystals)});
    totalPrestigesStats.innerHTML = i18next.t('totalPrestiges', {prestiges: formatNumber(prestigeCount)});
    gameTime.innerHTML = i18next.t('gameTime', {gameDaysText: gameDays, gameHoursText: gameHours, gameMinutesText: gameMinutes, gameSecondsText: formatNumber(gameSeconds)});
    realTime.innerHTML = i18next.t('realTime', {w: realDays, x: realHours, y: realMinutes, z: formatNumber(realSeconds)});
    prestigeTime.innerHTML = i18next.t('prestigeTime', {prestigeDaysText: prestigeDays, prestigeHoursText: prestigeHours, prestigeMinutesText: prestigeMinutes, prestigeSecondsText: formatNumber4(prestigeSeconds)});
    if (fastestPrestigeTimer <= 86399) {
        fastestPrestigeDaysText = ''
    }
    else fastestPrestigeDaysText = i18next.t('fastestPrestigeDaysText', {fastestPrestigeDaysText: fastestPrestigeDays});
    if (fastestPrestigeTimer <= 3599) {
        fastestPrestigeHoursText = ''
    }
    else fastestPrestigeHoursText = i18next.t('fastestPrestigeHoursText', {fastestPrestigeHoursText: fastestPrestigeHours});
    if (fastestPrestigeTimer <= 59) {
        fastestPrestigeMinutesText = ''
    }
    else fastestPrestigeMinutesText = i18next.t('fastestPrestigeMinutesText', {fastestPrestigeMinutesText: fastestPrestigeMinutes});
    fastestPrestigeTime.innerHTML = i18next.t('fastestPrestigeTime', {fastestPrestigeDaysTextBool: fastestPrestigeDaysText, fastestPrestigeHoursTextBool: fastestPrestigeHoursText, fastestPrestigeMinutesTextBool: fastestPrestigeMinutesText, fastestPrestigeSecondsText: formatNumber4(fastestPrestigeSeconds)});
    let offlineCrystalsFormula 
    achRow1.completion[11] ? offlineCrystalsFormula = 60/(7200/secondPrestigeBuyableEffect) : offlineCrystalsFormula = 0
    checkCrystalsTemp() 
    offlineCrystalsFormula *= crystalsTemp
    let offlinePrestigesFormula
    prestigeMilestonesEffects[15] ? offlinePrestigesFormula = fastestNoMaxBuyPrestiges/30 : offlinePrestigesFormula = 0
    offlinePrestigeFarm.innerHTML = i18next.t('offlinePrestigesStats', {prestiges: formatBoost(offlinePrestigesFormula), crystals: formatBoost(offlineCrystalsFormula)});
    totalClicks.innerHTML = i18next.t('totalClicks', {clickCount})



    if (multIdentifier == 0) {multBreakdownTitle.innerHTML = gainPerClickTitle}
    else if (multIdentifier == 1) {multBreakdownTitle.innerHTML = gainPerSecondTitle}
    else if (multIdentifier == 2) {multBreakdownTitle.innerHTML = gainTitle}
    else if (multIdentifier == 3) {multBreakdownTitle.innerHTML = superCoinsChanceTitle}
    else if (multIdentifier == 4) {multBreakdownTitle.innerHTML = crystalsMultiplierTitle}

    if (!challengeActivate && challengeCompleted[8]) {
        postE13coinsSoftcapClickStats.innerHTML =  i18next.t('postE13CoinSoftcap', {x: formatBoost(1e13 * Math.pow(totalSuperCoins, 1.2))})
        postE13coinsSoftcapSecondStats.innerHTML =  i18next.t('postE13CoinSoftcap', {x: formatBoost(1e13 * Math.pow(totalSuperCoins, 1.2))})
    }
    else {
        postE13coinsSoftcapClickStats.innerHTML =  i18next.t('postE13CoinSoftcap', {x: formatBoost(1e13)})
        postE13coinsSoftcapSecondStats.innerHTML =  i18next.t('postE13CoinSoftcap', {x: formatBoost(1e13)})
    }

    postE13coinsSoftcapClickStatsEffect.innerHTML = '^'+prestigeSinglesEffects[10][0]
    postE13coinsSoftcapSecondStatsEffect.innerHTML = '^'+prestigeSinglesEffects[10][1]

    
    superCount.innerHTML = i18next.t('superCoinCount', {supercoins: formatNumber(superCoins)});
    respecShop.innerHTML = i18next.t('respecShop');

    tooltipShopBuyableU1.innerHTML = i18next.t('firstShopBuyable', {fshbAmount: formatNumber(firstShopBuyable.amount), w: formatNumber(firstShopBuyable.bulkAmount), fshbEffect: formatPercent(firstShopBuyableEffect), fshbPrice: firstShopBuyable.priceText});
    if (firstShopBuyable.amount < 100) {
        firstShopBuyable.priceText = i18next.t('firstShopBuyablePriceText', {fshbPrice: formatNumber(firstShopBuyable.bulkPrice)});
    }
    else firstShopBuyable.priceText = ''
    tooltipShopBuyableU2.innerHTML = i18next.t('secondShopBuyable', {sshbAmount: formatNumber(secondShopBuyable.amount), w: formatNumber(secondShopBuyable.bulkAmount), sshbEffect: formatPercent(secondShopBuyableEffect), sshbPrice: secondShopBuyable.priceText});
    if (secondShopBuyable.amount < 100) {
        secondShopBuyable.priceText = i18next.t('secondShopBuyablePriceText', {sshbPrice: formatNumber(secondShopBuyable.bulkPrice)});
    }
    else secondShopBuyable.priceText = ''
    tooltipShopBuyableU3.innerHTML = i18next.t('thirdShopBuyable', {tshbAmount: formatNumber(thirdShopBuyable.amount), w: formatNumber(thirdShopBuyable.bulkAmount), tshbEffect: formatPercent(thirdShopBuyableEffect), tshbPrice: thirdShopBuyable.priceText});
    if (thirdShopBuyable.amount < 100) {
        thirdShopBuyable.priceText = i18next.t('thirdShopBuyablePriceText', {tshbPrice: formatNumber(thirdShopBuyable.bulkPrice)});
    }
    else thirdShopBuyable.priceText = ''
    tooltipShopBuyableU4.innerHTML = i18next.t('fourthShopBuyable', {foshbAmount: formatNumber(fourthShopBuyable.amount), w: formatNumber(fourthShopBuyable.bulkAmount), foshbEffect: formatPercent(fourthShopBuyableEffect), foshbPrice: fourthShopBuyable.priceText});
    if (fourthShopBuyable.amount < 100) {
        fourthShopBuyable.priceText = i18next.t('fourthShopBuyablePriceText', {foshbPrice: formatNumber(fourthShopBuyable.bulkPrice)});
    }
    else fourthShopBuyable.priceText = ''

    tooltipShopBuyableU5.innerHTML = i18next.t('fifthShopBuyable', {x: formatNumber(fifthShopBuyable.amount), w: formatNumber(fifthShopBuyable.bulkAmount), y: formatPercent(fifthShopBuyableEffect), z: fifthShopBuyable.priceText});
    if (fifthShopBuyable.amount < 50) {
        fifthShopBuyable.priceText = i18next.t('fifthShopBuyablePriceText', {x: formatNumber(fifthShopBuyable.bulkPrice)});
    }
    else fifthShopBuyable.priceText = ''

    tooltipShopBuyableU6.innerHTML = i18next.t('sixthShopBuyable', {x: formatNumber(sixthShopBuyable.amount), w: formatNumber(sixthShopBuyable.bulkAmount), y: formatPercent(sixthShopBuyableEffect), z: sixthShopBuyable.priceText});
    if (sixthShopBuyable.amount < 25) {
        sixthShopBuyable.priceText = i18next.t('sixthShopBuyablePriceText', {x: formatNumber(sixthShopBuyable.bulkPrice)});
    }
    else sixthShopBuyable.priceText = ''

    tooltipShopBuyableU7.innerHTML = i18next.t('seventhShopBuyable', {x: formatNumber(seventhShopBuyable.amount), w: formatNumber(seventhShopBuyable.bulkAmount), y: formatPercent(seventhShopBuyableEffect), z: seventhShopBuyable.priceText});
    if (seventhShopBuyable.amount < 5) {
        seventhShopBuyable.priceText = i18next.t('seventhShopBuyablePriceText', {x: formatNumber(seventhShopBuyable.bulkPrice)});
    }
    else seventhShopBuyable.priceText = ''

    tooltipShopSingleU1.innerHTML = i18next.t('firstShopSingle', { fshsPrice: firstShopSingle.priceText});
    if (firstShopSingle.amount < 1) {
        firstShopSingle.priceText = i18next.t('firstShopSinglePriceText', {fshsPrice: formatNumber(firstShopSingle.price)});
    }
    else firstShopSingle.priceText = ''

    tooltipshopItem1.innerHTML = i18next.t('firstShopItem', {x: formatNumber(firstShopItem.amount), y: formatNumber(firstShopItem.max), z: firstShopItem.priceText});
    if (firstShopItem.amount < firstShopItem.max) {
        firstShopItem.priceText = i18next.t('shopItemPriceText', {x: formatNumber(firstShopItem.price)});
    }
    else firstShopItem.priceText = ''

    tooltipshopItem2.innerHTML = i18next.t('secondShopItem', {x: formatNumber(secondShopItem.amount), y: formatNumber(secondShopItem.max), z: secondShopItem.priceText});
    if (secondShopItem.amount < secondShopItem.max) {
        secondShopItem.priceText = i18next.t('shopItemPriceText', {x: formatNumber(secondShopItem.price)});
    }
    else secondShopItem.priceText = ''

    tooltipshopItem3.innerHTML = i18next.t('thirdShopItem', {x: formatNumber(thirdShopItem.amount), y: formatNumber(thirdShopItem.max), z: thirdShopItem.priceText});
    if (thirdShopItem.amount < thirdShopItem.max) {
        thirdShopItem.priceText = i18next.t('shopItemPriceText', {x: formatNumber(thirdShopItem.price)});
    }
    else thirdShopItem.priceText = ''

    tooltipshopItem4.innerHTML = i18next.t('fourthShopItem', {x: formatNumber(fourthShopItem.amount), y: formatNumber(fourthShopItem.max), z: fourthShopItem.priceText});
    if (fourthShopItem.amount < fourthShopItem.max) {
        fourthShopItem.priceText = i18next.t('shopItemPriceText', {x: formatNumber(fourthShopItem.price)});
    }
    else fourthShopItem.priceText = ''

    shopBuyableU1Req.innerHTML = firstShopBuyable.amount + '/' + firstShopBuyable.max
    shopBuyableU2Req.innerHTML = secondShopBuyable.amount + '/' + secondShopBuyable.max
    shopBuyableU3Req.innerHTML = thirdShopBuyable.amount + '/' + thirdShopBuyable.max
    shopBuyableU4Req.innerHTML = fourthShopBuyable.amount + '/' + fourthShopBuyable.max
    shopBuyableU5Req.innerHTML = fifthShopBuyable.amount + '/' + fifthShopBuyable.max
    shopBuyableU6Req.innerHTML = sixthShopBuyable.amount + '/' + sixthShopBuyable.max
    shopBuyableU7Req.innerHTML = seventhShopBuyable.amount + '/' + seventhShopBuyable.max

    shopSingleU1Req.innerHTML = firstShopSingle.amount + '/' + 1

    shopItem1Req.innerHTML = firstShopItem.amount + '/' + firstShopItem.max
    shopItem2Req.innerHTML = secondShopItem.amount + '/' + secondShopItem.max
    shopItem3Req.innerHTML = thirdShopItem.amount + '/' + thirdShopItem.max
    shopItem4Req.innerHTML = fourthShopItem.amount + '/' + fourthShopItem.max

    offlineGainTitle.innerHTML = i18next.t('offlineGainTitle');   
    offlineShowGain.innerHTML = i18next.t('offlineGain', {timeDifference: timeDifference, moneyTemp: formatNumber(moneyTemp), superCoinsTemp: formatNumber(superCoinsTemp), offlineCrystalsTempText: offlineCrystalsGain, offlinePrestigesTempText: offlinePrestigesGain, offlineShardsTempText: offlineShardsGain});

    if (achRow1.completion[11]) {
        offlineCrystalsGain = i18next.t('offlineCrystalsTempText', { offlineCrystalsTemp: formatNumber3(offlineCrystalsTemp)});
        if (prestigeMilestonesEffects[15]) {
            offlinePrestigesGain = i18next.t('offlinePrestigesTempText', { offlinePrestigesTemp: formatNumber3(offlinePrestigesTemp)});
        }
        else offlinePrestigesGain = ''
    }
    else offlineCrystalsGain = ''

    if (shardUnlockablePerSecond.percent == 100) {
        offlineShardsGain = i18next.t('offlineShardsTempText', { offlineShardsTemp: formatNumber3(offlineShardsTemp)});
        }
    else offlineShardsGain = ''
    
    code = document.getElementById('codeInput').value

    inputText.innerHTML = i18next.t('codeInput');

    codeIsFalse = i18next.t('codeIsFalse', {code: code});
    codeIsTrue = i18next.t('codeIsTrue', {code: code, codeReward: codeReward});
    codeIsUsed = i18next.t('codeIsUsed', {code: code});
    if (dailySeconds == 0 && dailyMinutes == 0 && dailyHours == 0) {
        getDailyReward.innerHTML = i18next.t('getDailyReward');
    }
    else {getDailyReward.innerHTML = ("0" + formatNumber(dailyHours)).slice(-2)+":"+("0" + formatNumber(dailyMinutes)).slice(-2)+":"+("0" + formatNumber(dailySeconds)).slice(-2)
    if (dailySeconds >= 55 && dailyMinutes >= 59 && dailyHours >= 23) convertingDailyTime()
    }
    superCoinsTemp2 = randomNumber(25*(1+seventhShopBuyableEffect), 100*(1+seventhShopBuyableEffect)) 
    if (isSpiritualEvent) superCoinsTemp2 *= 2
    dailyIsTrue = i18next.t('dailyIsTrue', {superCoinsTemp2: superCoinsTemp2});
    dailyIsFalse = i18next.t('dailyIsFalse', {dailySeconds: formatNumber(dailySeconds), dailyMinutes: formatNumber(dailyMinutes), dailyHours: formatNumber(dailyHours)});

    for (let i = 1; i < 14; i++) {
        if (i < 10) {
            window[`chapter${i}Tab`].innerHTML = i18next.t(`chapter${i}Name`);
            window[`chapter${i}`] = i18next.t(`chapter${i}`);
        }
        window[`helpTab${i}`].innerHTML = i18next.t(`help${i}Name`);
        window[`helpName${i}`] = i18next.t(`help${i}Name`);
        if (i != 13) window[`help${i}`] = i18next.t(`help${i}`);
    }

    challengeCompleted[8] ? help13 = i18next.t(`help13`, {x: formatNumber(1e13*Math.pow(totalSuperCoins, 1.2)), y: prestigeSinglesEffects[10][1], z: prestigeSinglesEffects[10][0]}) :
    help13 = i18next.t(`help13`, {x: formatNumber(1e13), y: prestigeSinglesEffects[10][1], z: prestigeSinglesEffects[10][0]});

    spiritualEventCurrency.innerHTML = i18next.t('spiritualEventCurrency', {spirits: formatNumber(spirits)});
    spiritualEventEffects.innerHTML = i18next.t('spiritualEventEffects', {effect1: formatBoost(spiritEffects[0]), effect2: formatBoost(spiritEffects[1]), effect3: formatBoost(spiritEffects[2]), effect4: formatBoost(spiritEffects[3])});
    spiritualEventTime.innerHTML = i18next.t('spiritualEventTime');

    triplePowerEventCurrency1.innerHTML = i18next.t('triplePowerEventCurrency1', {x: formatNumber(pinkCoin.totalAmount), y: formatPercent(pinkCoin.effect)});
    triplePowerEventCurrency2.innerHTML = i18next.t('triplePowerEventCurrency2', {x: formatNumber(greenCoin.totalAmount), y: formatPercent(greenCoin.effect)});
    triplePowerEventCurrency3.innerHTML = i18next.t('triplePowerEventCurrency3', {x: formatNumber(blueCoin.totalAmount), y: formatPercent(blueCoin.effect)});

    sacrificePink.innerHTML = i18next.t('pinkSacrifice', {y: formatNumber(pinkCoin.requirement), x: formatNumber(pinkCoin.currency)});
    sacrificeGreen.innerHTML = i18next.t('greenSacrifice', {y: formatNumber(greenCoin.requirement), x: formatNumber(greenCoin.currency)});
    sacrificeBlue.innerHTML = i18next.t('blueSacrifice', {y: formatNumber(blueCoin.requirement), x: formatNumber(blueCoin.currency)});

    upgradePink.innerHTML = i18next.t('pinkUpgrade', {x: formatNumber(pinkCoin.price), y: formatNumber(pinkCoin.amount)});
    upgradeGreen.innerHTML = i18next.t('greenUpgrade', {x: formatNumber(greenCoin.price), y: formatNumber(greenCoin.amount)})
    upgradeBlue.innerHTML = i18next.t('blueUpgrade', {x: formatNumber(blueCoin.price), y: formatNumber(blueCoin.amount)})

    upgradeGrey.innerHTML = i18next.t('greyUpgrade', {x: formatNumber(greyCoin.price), y: formatNumber(greyCoin.amount)})

    challengeCondition.innerHTML = ''
    if (challengeActivated[1]) challengeCondition.innerHTML = i18next.t('challengeCondition2')
    if (challengeActivated[6]) {
        (amountsOfUpgrades/50*100) <= 100 ? challengeCondition.innerHTML = i18next.t('challengeCondition7', {x: formatBoost(amountsOfUpgrades/50*100)}) : challengeCondition.innerHTML = i18next.t('challengeCondition7', {x: 100})
    }
    if (challengeActivated[7]) challengeCondition.innerHTML = i18next.t('challengeCondition8', {x: formatNumber(virusCoins)})
    if (challengeActivated[9]) challengeCondition.innerHTML = i18next.t('challengeCondition10', {x: 25-amountsOfUpgrades}) 

    challengeCompleted[2] ? challenge3Reward.innerHTML = i18next.t('challengeReward3', {x: formatPower(1+(Math.log(prestigeCount)/111))}) : challenge3Reward.innerHTML = i18next.t('challengeReward3', {x: 1})
    challengeCompleted[3] ? challenge4Reward.innerHTML = i18next.t('challengeReward4', {x: formatNumber(Math.pow(1.43, achCount))}) : challenge4Reward.innerHTML = i18next.t('challengeReward4', {x: 0})
    challengeCompleted[4] ? challenge5Reward.innerHTML = i18next.t('challengeReward5', {x: 0.9}) : challenge5Reward.innerHTML = i18next.t('challengeReward5', {x: 1})
    challengeCompleted[5] ? challenge6Reward.innerHTML = i18next.t('challengeReward6', {x: formatBoost(Math.pow(1.99, challengesCompleted))}) : challenge6Reward.innerHTML = i18next.t('challengeReward6', {x: 1})
    challengeCompleted[6] ? challenge7Reward.innerHTML = i18next.t('challengeReward7', {x: formatBoost(Math.log2(shards))}) :  challenge7Reward.innerHTML = i18next.t('challengeReward7', {x: 1})
    challengeCompleted[7] ? challenge8Reward.innerHTML = i18next.t('challengeReward8', {x: formatBoost(prestigeTimer)}) : challenge8Reward.innerHTML = i18next.t('challengeReward8', {x: 1})
    challengeCompleted[8] ? challenge9Reward.innerHTML = i18next.t('challengeReward9', {x: formatNumber(1e13*Math.pow(totalSuperCoins, 1.2))}) : challenge9Reward.innerHTML = i18next.t('challengeReward9', {x: formatNumber(1e13)})
    challengeCompleted[9] ? challenge10Reward.innerHTML = i18next.t('challengeReward10', {x: formatBoost(Math.log(amountsOfUpgrades))}) : challenge10Reward.innerHTML = i18next.t('challengeReward10', {x: 1})

    if (!challengeActivate) youAreInXWorld.innerHTML = i18next.t('challengeDeactivated')
    else youAreInXWorld.innerHTML = i18next.t('challengeActivated', {x: challengeStartedID})
}

setInterval(loadTranslations, 50);

document.getElementById('changingLanguage').addEventListener('click', () => {

    currentLanguage = i18next.language === 'ru' ? 'en' : 'ru';
    i18next.changeLanguage(currentLanguage, () => {
      // Обновление текста после смены языка
    loadTranslationsFromChangeLanguage();
    showChangelog(startDesc)
    showStory(startChapDesc)
    showHelpPage(startHelpDesc, empty)
    if (multIdentifier == 0) {multBreakdownTitle.innerHTML = gainPerClickTitle}
    else if (multIdentifier == 1) {multBreakdownTitle.innerHTML = gainPerSecondTitle}
    else if (multIdentifier == 2) {multBreakdownTitle.innerHTML = gainTitle}
    });
});

setTimeout(() => {
    loadingScreen.style.display = 'none'
    document.documentElement.style.overflowY = 'auto'
}, 1000);

window.onload = loadTranslationsFromChangeLanguage();

codeInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        readCode();
    }
});

function readCode () {
    let id = 0
    for (let i = 0; i < codes.length; i++) {
        if (code === codes[i]){
            id = i+1
            break
        }
    }
    if (!codeChecks[id-1] && id != 0) {
        if (id == 1){
            superCoins += 69
            totalSuperCoins += 69
        } 
        if (!codeChecks[id-1]) {
            codeChecks[id-1] = true
        }
        if (id == 0 || (id == 2 && !isSpiritualEvent) || ((id == 3 || id == 4 || id == 5) && !isTriplePowerEvent)) {
            whichCode.innerHTML = codeIsFalse
            codeChecks[id-1] = false
        } 
        else {
            if (id == 2) {
                spirits += 55
            }
            if (id == 3) {
                firstShopItem.amount++
            }
            if (id == 3) {
                secondShopItem.amount++
            }
            if (id == 3) {
                fourthShopItem.amount++
            }
            loadTranslations()
            codeReward = codeRewards[id-1]
            loadTranslations()
            whichCode.innerHTML = codeIsTrue
        }
    }
    else if (id != 0) whichCode.innerHTML = codeIsUsed
    else whichCode.innerHTML = codeIsFalse
    openWindow('code', true)
}
