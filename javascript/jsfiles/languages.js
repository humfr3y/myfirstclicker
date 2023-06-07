import '../../node_modules/i18next/i18next.min.js'



const responseEn = await fetch('./javascript/jsfiles/en.json');
const responseRu = await fetch('./javascript/jsfiles/ru.json');
const translationsEnData = await responseEn.json();
const translationsRuData = await responseRu.json();
await i18next.init({
    lng: 'ru',
    resources: {
        en: { translation: translationsEnData },
        ru: { translation: translationsRuData }
    }
    });

// Загрузка переводов
const loadTranslations = async () => {
try {
    coinsCount.innerHTML = i18next.t('moneyCount', { money: formatNumber(money)});
    coinsGain.innerHTML = i18next.t('moneyPerSec', { gainPerSec: formatBoost(gainPerSecond*20)});

    settingsTab.innerHTML = i18next.t('settingsButton');
    mainTab.innerHTML = i18next.t('clickerButton');
    achTab.innerHTML = i18next.t('achievementsButton');
    infoTab.innerHTML = i18next.t('informationSubButton');
    statisticsTab.innerHTML = i18next.t('statisticsSubButton');
    aboutGameTab.innerHTML = i18next.t('aboutButton');

    settingsTitle.innerHTML = i18next.t('settingsTitle');

    savingGame.innerHTML = i18next.t('saveGame');
    loadingGame.innerHTML = i18next.t('loadGame');
    autoSavingGame.innerHTML = i18next.t('autosaveGame', {autoSave: autoSaving});
    impSave.innerHTML = i18next.t('importGame');
    fileUploader.innerHTML = i18next.t('importGameFromAFile');
    expSave.innerHTML = i18next.t('exportGame');
    changingLanguage.innerHTML = i18next.t('changeLanguage');
    changelogOpen.innerHTML = i18next.t('changelog');
    hardRes.innerHTML = i18next.t('hardReset');

    umultiplierBoost.innerHTML = i18next.t('umultiplierText', {umultipliercount: formatNumber(umultipliercount), umultiplier: formatBoost(umultiplier), umultiplierCost: formatNumber(umultiplierCost)});
    upowerBoost.innerHTML = i18next.t('upowerText', {upowercount: formatNumber(upowercount), upower: formatPower(upower), upowerCost: formatNumber(upowerCost)});

    maxbuy.innerHTML = i18next.t('maxBuy');

    buyableU1.innerHTML = i18next.t('firstBuyable', {firstBuyableAmount: formatNumber(firstBuyable.amount), firstBuyableEffect: formatNumber(firstBuyableEffect), firstBuyablePrice: formatNumber(firstBuyable.price)});
    buyableU2.innerHTML = i18next.t('secondBuyable', {secondBuyableAmount: formatNumber(secondBuyable.amount), secondBuyableEffect: formatNumber(secondBuyableEffect*10), secondBuyablePrice: formatNumber(secondBuyable.price)});
    buyableU3.innerHTML = i18next.t('thirdBuyable', {thirdBuyableAmount: formatNumber(thirdBuyable.amount), thirdBuyableEffect: formatBoost(thirdBuyableEffect), thirdBuyablePrice: formatNumber(thirdBuyable.price)});
    buyableU4.innerHTML = i18next.t('fourthBuyable', {fourthBuyableAmount: formatNumber(fourthBuyable.amount), fourthBuyableEffect: formatBoost(fourthBuyableEffect), fourthBuyablePrice: formatNumber(fourthBuyable.price)});
    buyableU5.innerHTML = i18next.t('fifthBuyable', {fifthBuyableAmount: formatNumber(fifthBuyable.amount), fifthBuyableEffect: formatBoost(fifthBuyableEffect), fifthBuyablePrice: formatNumber(fifthBuyable.price)});

    singleU1.innerHTML = i18next.t('firstSingle', {firstSingleEffect: formatBoost(firstSingleEffect), firstSinglePrice: firstSingle.priceText});
    if (firstSingle.amount == 0) {
        firstSingle.priceText = i18next.t('firstSinglePriceText')
    }
    else firstSingle.priceText = ""
    singleU2.innerHTML = i18next.t('secondSingle', {secondSingleEffect: formatPower(secondSingleEffect), secondSinglePrice: secondSingle.priceText});
    if (secondSingle.amount == 0) {
        secondSingle.priceText = i18next.t('secondSinglePriceText')
    }
    else secondSingle.priceText = ""
    singleU3.innerHTML = i18next.t('thirdSingle', {thirdSingleEffect: formatBoost(thirdSingleEffect), thirdSinglePrice: thirdSingle.priceText});
    if (thirdSingle.amount == 0) {
        thirdSingle.priceText = i18next.t('thirdSinglePriceText')
    }
    else thirdSingle.priceText = ""
    singleU4.innerHTML = i18next.t('fourthSingle', {fourthSingleEffect: formatBoost(fourthSingleEffect), fourthSinglePrice: fourthSingle.priceText});
    if (fourthSingle.amount == 0) {
        fourthSingle.priceText = i18next.t('fourthSinglePriceText')
    }
    else fourthSingle.priceText = ""
    singleU5.innerHTML = i18next.t('fifthSingle', {fifthSingleEffect: formatBoost(fifthSingleEffect), fifthSinglePrice: fifthSingle.priceText});
    if (fifthSingle.amount == 0) {
        fifthSingle.priceText = i18next.t('fifthSinglePriceText')
    }
    else fifthSingle.priceText = ""
    singleU6.innerHTML = i18next.t('sixthSingle', {sixthSingleEffect: formatBoost(sixthSingleEffect), sixthSinglePrice: sixthSingle.priceText});
    if (sixthSingle.amount == 0) {
        sixthSingle.priceText = i18next.t('sixthSinglePriceText')
    }
    else sixthSingle.priceText = ""
    singleU7.innerHTML = i18next.t('seventhSingle', {seventhSingleEffect: formatBoost(seventhSingleEffect), seventhSinglePrice: seventhSingle.priceText});
    if (seventhSingle.amount == 0) {
        seventhSingle.priceText = i18next.t('seventhSinglePriceText')
    }
    else seventhSingle.priceText = ""
    singleU8.innerHTML = i18next.t('eighthSingle', {eighthSingleEffect: formatBoost(eighthSingleEffect), eighthSinglePrice: eighthSingle.priceText});
    if (eighthSingle.amount == 0) {
        eighthSingle.priceText = i18next.t('eighthSinglePriceText')
    }
    else eighthSingle.priceText = ""
    singleU9.innerHTML = i18next.t('ninthSingle', {ninthSingleEffect: formatPower(ninthSingleEffect), ninthSinglePrice: ninthSingle.priceText});
    if (ninthSingle.amount == 0) {
        ninthSingle.priceText = i18next.t('ninthSinglePriceText')
    }
    else ninthSingle.priceText = ""
    singleU10.innerHTML = i18next.t('tenthSingle', {tenthSingleEffect: formatBoost(tenthSingleEffect), tenthSinglePrice: tenthSingle.priceText});
    if (tenthSingle.amount == 0) {
        tenthSingle.priceText = i18next.t('tenthSinglePriceText')
    }
    else tenthSingle.priceText = ""

    achievementsTitle.innerHTML = i18next.t('achievementsTitle');
    achievementsDesc.innerHTML = i18next.t('achievementsDesc');
    achBonus.innerHTML = i18next.t('achievementsBonus', {achievementBonus: formatBoost(achievementBonus)});
    for (var i = 0; i < 9; i++){
        achRow1.name[i] = i18next.t(`achRow1.name.${i}`);
        document.getElementsByClassName("tooltip")[i].innerHTML = i18next.t(`achievement1${i+1}Desc`);
    }
    document.getElementById('tooltip-ach20').innerHTML = i18next.t('achievement20Desc');

    statsTitle.innerHTML = i18next.t('stastisticsTitle');

    totalCoins.innerHTML = i18next.t('totalMoney', {totalCoins: formatNumber(total)});
    gameTime.innerHTML = i18next.t('gameTime', {gameHoursText: gameHoursText, gameMinutesText: gameMinutesText, gameSecondsText: gameSecondsText});

    aboutGameTitle.innerHTML = i18next.t('aboutGameTitle');

    aboutGame.innerHTML = i18next.t('aboutGame');

    offlineGainTitle.innerHTML = i18next.t('offlineGainTitle');   
    offlineShowGain.innerHTML = i18next.t('offlineGain', {timeDifference: timeDifference, moneyTemp: formatNumber(moneyTemp)});

    saveNotify = i18next.t('saveGameNotification');
    loadNotify = i18next.t('loadGameNotification');
    exportNotify = i18next.t('exportGameNotification');
    importNotify = i18next.t('importGameNotification');
    hardNotify = i18next.t('resetGameNotification');
    achNotify = i18next.t('achievementGameNotification');

    startDesc = i18next.t('startDescription');

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

} catch (error) {
    console.error('Ошибка загрузки и инициализации переводов:', error);
}
};

setInterval(loadTranslations, 50)

function formatNumber(number) {
    if (number < 1000000) {
        return number.toFixed(0);
    } else {
        return number.toExponential(2).replace("+","");
    }
}

  // Функция для форматирования значения усиления в соответствии с условиями
    function formatBoost(boost) {
    if (boost < 100) {
        return boost.toFixed(2);
    } else if (boost >= 100 && boost < 1000000) {
        return boost.toFixed(0);
    } else {
        return boost.toExponential(2).replace("+","");
    }
}

function formatPower(power) {
    if (power < 10) {
        return power.toFixed(3);
    } else if (power >= 10 && power < 1000000) {
        return power.toFixed(0);
    } else {
        return power.toExponential(2).replace("+","");
    }
}

document.getElementById('changingLanguage').addEventListener('click', () => {

    const currentLanguage = i18next.language === 'ru' ? 'en' : 'ru';
    // console.log(currentLanguage)
    i18next.changeLanguage(currentLanguage, () => {
      // Обновление текста после смены языка
    loadTranslations();
    showChangelog(startDesc)
    });
});
