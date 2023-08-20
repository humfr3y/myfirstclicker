var version = "0.9"
function singleUpgradePurchasedRemove () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (var i = 0; i < singleArray.length; i++){
        singleArray[i].updateText.classList.remove('purchased')
    }
}

function achievementGottenRemove () {
    for (var i = 0; i < 10; i++){
        var element = document.getElementsByClassName("ach")[i]
        element.classList.remove("green");
        element.classList.remove("greenborder");
    }
}

function autoSaveGame(){
    autoSaving == 'yes' ? autoSaving = 'no' : autoSaving = 'yes'
}

let datasave
var gainPerSecondSave

function saveGame () { 
    gainPerSecondSave = gainPerSecond * 20
    whatsYourCurrentTime()
    datasave = savingTheGame(); //образуем переменную с кучей других переменных
    autoSaverTimer = 0
    notify(saveNotify);
    let stringifiedData = JSON.stringify(datasave); //превратим в строчку

    localStorage.setItem('completion', JSON.stringify(achRow1.completion))
    localStorage.setItem('chapters', JSON.stringify(loreBoolean))
    // сохранить в LocalStorage по ключу коунтдата
    localStorage.setItem('datasaving', stringifiedData);
    
}
var loadNotify
var saveNotify
var exportNotify
var importNotify
var hardNotify

function loadGame() {
        achievementGottenRemove ()
        singleUpgradePurchasedRemove ()
        loadingTheGame();
        singleUpgradeTextUpdate ()
        singleUpgradePurchased ()
        const achCompletions = localStorage.getItem('completion')
        const loreChapters = localStorage.getItem('chapters')
        if (achCompletions != null){
            achRow1.completion = JSON.parse(achCompletions).map(Boolean);
        }
        if (loreChapters != null){
            loreBoolean = JSON.parse(loreChapters).map(Boolean);
            for (let i = 0; i < loreBoolean.length; i++){
                checkLoreShorter(loreBoolean, i)
            }
        }
        checkShopSingle (firstShopSingle.amount, 'overdriveTab')
        achCompletionsChecker()
        getCoinPerSec()
        whatsYourCurrentTime2()
        offlineGain()
        offlineGainTime()
        convertingTime()
        changeFonts2(optionValue)
        autoSaverTimer = 0
        clearInterval(autoSaveTime)
        if (isNaN(money)) {
            money = 10;
        }
        if (isNaN(total)) {
            total = 10;
        }
        gainPerSecondSave = gainPerSecond * 20
        notify(loadNotify);
        version = "0.9"
}


var autoSaverTimer = 0
var autoSaveTime

function autoSaveThis () {
    if (autoSaving == 'yes')
        {
            saveGame()
        }

    }

function doHardReset () {
        gainPerSecondSave = gainPerSecond * 20
            gain = 1;
            gainPerClick = 1;
            clickCount = 0
            money = 10
            total = 10
            autoSaving = 'yes';
            totalDiamond = 0
            totalPrestiges = 0
            gameTimer = 0
            gameSeconds = 0
            gameMinutes = 0
            gameHours = 0
            gameDays = 0
            maxOrNoVar = false
            achievementBonus = 1
            achBonus = document.getElementById('achBonus')
            achCount = 0
            achRowCount = 0
            achRow1 = {
                condition: [1, 1000, 2.01, 1, 1000, 666, 1000, 1, 1e6, 1],
                reward: [0, 0, 0, 0, 1.01, 11, 1.05, 0, 1.33, 0],
                completion: [false, false, false, false, false, false, false, false, false, false],
                name: ['"Без ходуль"', '"Первая тысяча"', '"Я вызываю полицию! Нет, я!"', '"Есть пробитие!"', '"Мастер-кликер"', '"Адская продуктивность"', '"Пора спать!"', '"Снова стена и снова пробитие!"', '"Миллионный множитель"', '"Финишная прямая?"'],
                fullRow: 0
            }
            loreBoolean = [false, false, false, false]
            umultiplier = 1
            umultipliercount = 0
            upower = 1
            upowercount = 0
            upgradeReset();
            whatsYourCurrentTime()
            autoSaverTimer = 0
            clearInterval(autoSaveTime)
            saveGame();
            gainPerSecondSave = gainPerSecond * 20
            var hardNotifyColor
            hardNotifyColor = "red";
            notify(hardNotify, hardNotifyColor);
            singleUpgradePurchasedRemove()
            achievementGottenRemove()
            localStorage.clear()
            location.reload()
}

function exportSave() {
    gainPerSecondSave = gainPerSecond * 20;
    whatsYourCurrentTime();

    let datasave = savingTheGame(); 

    notify(exportNotify);
    let exportedData = JSON.stringify(datasave); //превратим в строчку
    let exportedData2 = JSON.stringify(achRow1.completion)
    let exportedData3 = JSON.stringify(loreBoolean)
    let base641 = btoa(exportedData); // кодируем строку в base64
    let base642 = btoa(exportedData2); // кодируем строку в base64
    let base643 = btoa(exportedData3); // кодируем строку в base64
    var base64 = `${base641}|${base642}|${base643}`
    navigator.clipboard.writeText(base64)
    
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let filename = 'Digital-God-Save-' + date + '.txt';

  // создание и запись содержимого в новый файл
    let file = new Blob([base64], {type: 'text/plain'});
    let a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(file);
    a.click();
}

function importSave() {
    const base64 = prompt("Insert save in base64 format");
    importing(base64);
}

function importing(base64) {
    const [base64DataSave, base64Completion, base64Chapters] = base64.split("|");
    const importedData1 = atob(base64DataSave);
    const importedData2 = atob(base64Completion);
    if (base64Chapters != null){
        var importedData3 = atob(base64Chapters)
            localStorage.setItem('chapters', importedData3);
            loreBoolean = JSON.parse(localStorage.getItem('chapters')).map(Boolean);
    }
    localStorage.setItem('datasaving', importedData1);
    localStorage.setItem('completion', importedData2);
    achRow1.completion = JSON.parse(localStorage.getItem('completion')).map(Boolean);

    achievementGottenRemove ()
    singleUpgradePurchasedRemove ()
    importingTheGame();
    loadingTheGame()
    for (let i = 0; i < loreBoolean.length; i++){
        checkLoreShorter(loreBoolean, i)
    }
    singleUpgradeTextUpdate ()
    singleUpgradePurchased ()
    checkShopSingle (firstShopSingle.amount, 'overdriveTab')
    achCompletionsChecker()
    getCoinPerSec()
    whatsYourCurrentTime2()
    offlineGain()
    offlineGainTime()
    convertingTime()
    changeFonts2(optionValue)
    autoSaverTimer = 0
    clearInterval(autoSaveTime)
    notify(importNotify);
    version = "0.9"
}


var fileUpload = document.getElementById('file-upload');
var fileName = document.querySelector('.file-name');

fileUpload.addEventListener('change', function(base64) {
    var file = base64.target.files[0];

    fileName.textContent = file.name;

    var reader = new FileReader();

    reader.onload = function(base64) {
    importing(base64.target.result)
    };

    reader.readAsText(file);
    fileUpload.value = null;
});
var currentLanguage = 'en'
function savingTheGame() {
    return {
        version: version,
        select_selectedIndex: select.selectedIndex,
        gainPerSecondSave: gainPerSecondSave,
        lastOnlineTime: lastOnlineTime,
        money: money,
        superCoins: superCoins,
        totalSuperCoins: totalSuperCoins,
        spentSuperCoins: spentSuperCoins,
        autoSaving: autoSaving,
        maxOrNoVar: maxOrNoVar,
        gainPerSecond: gainPerSecond,
        gainPerClick: gainPerClick,
        total: total,
        clickCount: clickCount,
        gameTimer: gameTimer,
        amountsOfUpgrades: amountsOfUpgrades,
        gameSeconds: gameSeconds,
        gameMinutes: gameMinutes,
        gameHours: gameHours,
        gameDays: gameDays,
        dailyTimer: dailyTimer,
        dailySeconds: dailySeconds,
        dailyMinutes: dailyMinutes,
        dailyHours: dailyHours,
        currentLanguage: currentLanguage,
        optionValue: optionValue,
        code1Check: code1Check,
        firstBuyable_amount: firstBuyable.amount,
        firstBuyable_baseEffect: firstBuyable.baseEffect,
        firstBuyable_price: firstBuyable.price,
        firstBuyable_basePrice: firstBuyable.basePrice,
        firstBuyable_power: firstBuyable.power,
        secondBuyable_amount: secondBuyable.amount,
        secondBuyable_baseEffect: secondBuyable.baseEffect,
        secondBuyable_price: secondBuyable.price,
        secondBuyable_basePrice: secondBuyable.basePrice,
        secondBuyable_power: secondBuyable.power,
        thirdBuyable_amount: thirdBuyable.amount,
        thirdBuyable_baseEffect: thirdBuyable.baseEffect,
        thirdBuyable_price: thirdBuyable.price,
        thirdBuyable_basePrice: thirdBuyable.basePrice,
        thirdBuyable_power: thirdBuyable.power,
        fourthBuyable_amount: fourthBuyable.amount,
        fourthBuyable_baseEffect: fourthBuyable.baseEffect,
        fourthBuyable_price: fourthBuyable.price,
        fourthBuyable_basePrice: fourthBuyable.basePrice,
        fourthBuyable_power: fourthBuyable.power,
        fifthBuyable_amount: fifthBuyable.amount,
        fifthBuyable_baseEffect: fifthBuyable.baseEffect,
        fifthBuyable_price: fifthBuyable.price,
        fifthBuyable_basePrice: fifthBuyable.basePrice,
        fifthBuyable_power: fifthBuyable.power,
        firstSingle_amount: firstSingle.amount,
        firstSingle_baseEffect: firstSingle.baseEffect,
        firstSingle_price: firstSingle.price,
        secondSingle_amount: secondSingle.amount,
        secondSingle_baseEffect: secondSingle.baseEffect,
        secondSingle_price: secondSingle.price,
        thirdSingle_amount: thirdSingle.amount,
        thirdSingle_baseEffect: thirdSingle.baseEffect,
        thirdSingle_price: thirdSingle.price,
        fourthSingle_amount: fourthSingle.amount,
        fourthSingle_baseEffect: fourthSingle.baseEffect,
        fourthSingle_price: fourthSingle.price,
        fifthSingle_amount: fifthSingle.amount,
        fifthSingle_baseEffect: fifthSingle.baseEffect,
        fifthSingle_price: fifthSingle.price,
        sixthSingle_amount: sixthSingle.amount,
        sixthSingle_baseEffect: sixthSingle.baseEffect,
        sixthSingle_price: sixthSingle.price,
        seventhSingle_amount: seventhSingle.amount,
        seventhSingle_baseEffect: seventhSingle.baseEffect,
        seventhSingle_price: seventhSingle.price,
        eighthSingle_amount: eighthSingle.amount,
        eighthSingle_baseEffect: eighthSingle.baseEffect,
        eighthSingle_price: eighthSingle.price,
        ninthSingle_amount: ninthSingle.amount,
        ninthSingle_baseEffect: ninthSingle.baseEffect,
        ninthSingle_price: ninthSingle.price,
        tenthSingle_amount: tenthSingle.amount,
        tenthSingle_baseEffect: tenthSingle.baseEffect,
        tenthSingle_price: tenthSingle.price,
        umultiplier: umultiplier,
        umultipliercount: umultipliercount,
        upower: upower,
        upowercount: upowercount,
        firstShopBuyable_amount: firstShopBuyable.amount,
        firstShopBuyable_price: firstShopBuyable.price,
        secondShopBuyable_amount: secondShopBuyable.amount,
        secondShopBuyable_price: secondShopBuyable.price,
        thirdShopBuyable_amount: thirdShopBuyable.amount,
        thirdShopBuyable_price: thirdShopBuyable.price,
        fourthShopBuyable_amount: fourthShopBuyable.amount,
        fourthShopBuyable_price: fourthShopBuyable.price,
        firstShopSingle_amount: firstShopSingle.amount,
        firstShopSingle_price: firstShopSingle.price,
        overdriveType1_percent: overdriveType1.percent,
        overdriveType1_effect: overdriveType1.effect,
        overdriveType1_price: overdriveType1.price,
    };
}

function loadingTheGame() {
    let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
    let parsedData = JSON.parse(storedData);

    if (parsedData != null) {
    gainPerSecondSave = parseFloat(parsedData.gainPerSecondSave)
    lastOnlineTime = parseFloat(parsedData.lastOnlineTime)
    gainPerSecond = parseFloat(parsedData.gainPerSecond)
    money = parseFloat(parsedData.money);
    autoSaving = parsedData.autoSaving;
    total = parseFloat(parsedData.total);
    gainPerSecond = parseFloat(parsedData.gainPerSecond);
    gainPerClick = parseFloat(parsedData.gainPerClick);
    currentLanguage = parsedData.currentLanguage;
    maxOrNoVar = parsedData.maxOrNoVar;
    amountsOfUpgrades = parseFloat(parsedData.amountsOfUpgrades);
    clickCount = parseFloat(parsedData.clickCount);
    gameTimer = parseFloat(parsedData.gameTimer);
    gameSeconds = parseFloat(parsedData.gameSeconds);
    gameMinutes = parseFloat(parsedData.gameMinutes);
    gameHours = parseFloat(parsedData.gameHours);
    firstBuyable.amount = parseFloat(parsedData.firstBuyable_amount);
    firstBuyable.baseEffect = parseFloat(parsedData.firstBuyable_baseEffect);
    firstBuyable.price = parseFloat(parsedData.firstBuyable_price);
    firstBuyable.basePrice = parseFloat(parsedData.firstBuyable_basePrice);
    firstBuyable.power = parseFloat(parsedData.firstBuyable_power);
    secondBuyable.amount = parseFloat(parsedData.secondBuyable_amount);
    secondBuyable.baseEffect = parseFloat(parsedData.secondBuyable_baseEffect);
    secondBuyable.price = parseFloat(parsedData.secondBuyable_price);
    secondBuyable.basePrice = parseFloat(parsedData.secondBuyable_basePrice);
    secondBuyable.power = parseFloat(parsedData.secondBuyable_power);
    thirdBuyable.amount = parseFloat(parsedData.thirdBuyable_amount);
    thirdBuyable.baseEffect = parseFloat(parsedData.thirdBuyable_baseEffect);
    thirdBuyable.price = parseFloat(parsedData.thirdBuyable_price);
    thirdBuyable.basePrice = parseFloat(parsedData.thirdBuyable_basePrice);
    thirdBuyable.power = parseFloat(parsedData.thirdBuyable_power);
    fourthBuyable.amount = parseFloat(parsedData.fourthBuyable_amount);
    fourthBuyable.baseEffect = parseFloat(parsedData.fourthBuyable_baseEffect);
    fourthBuyable.price = parseFloat(parsedData.fourthBuyable_price);
    fourthBuyable.basePrice = parseFloat(parsedData.fourthBuyable_basePrice);
    fourthBuyable.power = parseFloat(parsedData.fourthBuyable_power);
    fifthBuyable.amount = parseFloat(parsedData.fifthBuyable_amount);
    fifthBuyable.baseEffect = parseFloat(parsedData.fifthBuyable_baseEffect);
    fifthBuyable.price = parseFloat(parsedData.fifthBuyable_price);
    fifthBuyable.basePrice = parseFloat(parsedData.fifthBuyable_basePrice);
    fifthBuyable.power = parseFloat(parsedData.fifthBuyable_power);
    firstSingle.amount = parseFloat(parsedData.firstSingle_amount);
    firstSingle.baseEffect = parseFloat(parsedData.firstSingle_baseEffect);
    firstSingle.price = parseFloat(parsedData.firstSingle_price);
    secondSingle.amount = parseFloat(parsedData.secondSingle_amount);
    secondSingle.baseEffect = parseFloat(parsedData.secondSingle_baseEffect);
    secondSingle.price = parseFloat(parsedData.secondSingle_price);
    thirdSingle.amount = parseFloat(parsedData.thirdSingle_amount);
    thirdSingle.baseEffect = parseFloat(parsedData.thirdSingle_baseEffect);
    thirdSingle.price = parseFloat(parsedData.thirdSingle_price);
    fourthSingle.amount = parseFloat(parsedData.fourthSingle_amount);
    fourthSingle.baseEffect = parseFloat(parsedData.fourthSingle_baseEffect);
    fourthSingle.price = parseFloat(parsedData.fourthSingle_price);
    fifthSingle.amount = parseFloat(parsedData.fifthSingle_amount);
    fifthSingle.baseEffect = parseFloat(parsedData.fifthSingle_baseEffect);
    fifthSingle.price = parseFloat(parsedData.fifthSingle_price);
    sixthSingle.amount = parseFloat(parsedData.sixthSingle_amount);
    sixthSingle.baseEffect = parseFloat(parsedData.sixthSingle_baseEffect);
    sixthSingle.price = parseFloat(parsedData.sixthSingle_price);
    seventhSingle.amount = parseFloat(parsedData.seventhSingle_amount);
    seventhSingle.baseEffect = parseFloat(parsedData.seventhSingle_baseEffect);
    seventhSingle.price = parseFloat(parsedData.seventhSingle_price);
    eighthSingle.amount = parseFloat(parsedData.eighthSingle_amount);
    eighthSingle.baseEffect = parseFloat(parsedData.eighthSingle_baseEffect);
    eighthSingle.price = parseFloat(parsedData.eighthSingle_price);
    ninthSingle.amount = parseFloat(parsedData.ninthSingle_amount);
    ninthSingle.baseEffect = parseFloat(parsedData.ninthSingle_baseEffect);
    ninthSingle.price = parseFloat(parsedData.ninthSingle_price);
    tenthSingle.amount = parseFloat(parsedData.tenthSingle_amount);
    tenthSingle.baseEffect = parseFloat(parsedData.tenthSingle_baseEffect);
    tenthSingle.price = parseFloat(parsedData.tenthSingle_price);
    umultiplier = parseFloat(parsedData.umultiplier);
    umultipliercount = parseFloat(parsedData.umultipliercount);
    upower = parseFloat(parsedData.upower);
    upowercount = parseFloat(parsedData.upowercount);
    if (parsedData.firstShopBuyable_amount != null) {
        version = parsedData.version;
        firstShopBuyable.amount = parseFloat(parsedData.firstShopBuyable_amount);
        firstShopBuyable.price = parseFloat(parsedData.firstShopBuyable_price);
        secondShopBuyable.amount = parseFloat(parsedData.secondShopBuyable_amount);
        secondShopBuyable.price = parseFloat(parsedData.secondShopBuyable_price);
        thirdShopBuyable.amount = parseFloat(parsedData.thirdShopBuyable_amount);
        thirdShopBuyable.price = parseFloat(parsedData.thirdShopBuyable_price);
        fourthShopBuyable.amount = parseFloat(parsedData.fourthShopBuyable_amount);
        fourthShopBuyable.price = parseFloat(parsedData.fourthShopBuyable_price);
        firstShopSingle.amount = parseFloat(parsedData.firstShopSingle_amount);
        firstShopSingle.price = parseFloat(parsedData.firstShopSingle_price);
        overdriveType1.percent = parseFloat(parsedData.overdriveType1_percent);
        overdriveType1.effect = parseFloat(parsedData.overdriveType1_effect);
        overdriveType1.price = parseFloat(parsedData.overdriveType1_price);
        gameDays = parseFloat(parsedData.gameDays);
        dailyTimer = parseFloat(parsedData.dailyTimer);
        dailySeconds = parseFloat(parsedData.dailySeconds);
        dailyMinutes = parseFloat(parsedData.dailyMinutes);
        dailyHours = parseFloat(parsedData.dailyHours);
        code1Check = parsedData.code1Check
        select.selectedIndex = parseFloat(parsedData.select_selectedIndex)
        superCoins = parseFloat(parsedData.superCoins)
        totalSuperCoins = parseFloat(parsedData.totalSuperCoins)
        spentSuperCoins = parseFloat(parsedData.spentSuperCoins)
        optionValue = parsedData.optionValue;
    }

}
}

function importingTheGame() {


}

function upgradeReset() {
    let arrayReset = ['secondBuyable', 'firstBuyable', 'thirdBuyable', 'fourthBuyable', 'fifthBuyable', 'firstSingle', 'secondSingle', 'thirdSingle', 'fourthSingle', 'fifthSingle', 'sixthSingle', 'seventhSingle', 'eighthSingle', 'ninthSingle', 'tenthSingle']
    arrayReset.forEach((item) => {
    item.amount = 0
    item.baseEffect = 0
    });
    firstBuyable.price = 10
    secondBuyable.price = 100
    thirdBuyable.price = 500
    fourthBuyable.price = 1000
    fifthBuyable.price = 5000

    firstSingle.price = 1e5
    secondSingle.price = 1.5e6
    thirdSingle.price = 3.5e6
    fourthSingle.price = 3e7
    fifthSingle.price = 5e8
    sixthSingle.price = 3e9
    seventhSingle.price = 1.1e10
    eighthSingle.price = 1.5e11
    ninthSingle.price = 1.2e12
    tenthSingle.price = 1e13
}
