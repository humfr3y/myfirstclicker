




// function loadUpgrades() {
//     if (money>1e9 || diamonds>=1) {unlockedPrestige = 1}
//     else {unlockedPrestige = 0}
//     if (unlockedPrestige == 1) {unlockPrestige.call()}
// }

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
    if (autoSaving== 'no') 
    {
        autoSaving = 'yes';
    } 
    else {
        autoSaving = 'no';
   }
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
    
    // сохранить в LocalStorage по ключу коунтдата
    localStorage.setItem('datasaving', stringifiedData);
}
var loadNotify
var saveNotify
var exportNotify
var importNotify
var hardNotify

function loadGame () {
        achievementGottenRemove ()
        singleUpgradePurchasedRemove ()
        loadingTheGame();
        singleUpgradeTextUpdate ()
        singleUpgradePurchased ()
        achRow1.completion = JSON.parse(localStorage.getItem('completion')).map(Boolean);
        achCompletionsChecker()
        getCoinPerSec()
        whatsYourCurrentTime2()
        offlineGain()
        offlineGainTime()
        convertingTime()
        autoSaverTimer = 0
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        clearInterval(autoSaveTime)
        autoSaveTime = setInterval(autoSaveTimer, 1000)

        notify(loadNotify);
//         loadStats.call()
//         changedLanguage.call()
//         loadUpgrades.call()
//         checkThisBox.call()
        loadingTheGame2();
}


var autoSaverTimer = 0
var autoSaveTime

function autoSaveThis () {
    if (autoSaving == 'yes')
        {
            saveGame()
        }

    }

    function autoSaveTimer () {
        autoSaverTimer++
        // console.log(autoSaverTimer + " autosaver time")
    }

function doHardReset () {
    if (data==1) var hr = confirm("Вы точно хотите стереть весь прогресс? Это так же коснётся ваших сохранений.")
    else var hr = confirm ("Do you want erase the whole progress? This is also affects on your save.")
    if (hr){
        gainPerSecondSave = gainPerSecond * 20
            gain = 1;
            gainPerClick = 1;
            clickCount = 0
            money = 10
            total = 10
            completion = 0;
            onecheck = 0
            unlockedPrestige = 0;
            autoSaving = 'yes';
            totalDiamond = 0
            totalPrestiges = 0
            gameTimer = 0
            gameSeconds = 0
            gameMinutes = 0
            gameHours = 0
            prestigeSeconds = 0
            prestigeMinutes = 0
            prestigeHours = 0
            fastPrestigeSeconds = 0
            fastPrestigeMinutes = 0
            fastPrestigeHours = 0
            fastPrestigeSecondsTimer = 0
            bestPrestigeRun = 1e9
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
            umultiplier = 1
            umultipliercount = 0
            upower = 1
            upowercount = 0
            upgradeReset();
            whatsYourCurrentTime()
            firstBank = ""
            secondBank = ""
            thirdBank = ""
            fourthBank = ""
            fifthBank = ""
            sixthBank = ""
            seventhBank = ""
            eighthBank = ""
            ninthBank = ""
            tenthBank = ""
            autoSaverTimer = 0
            clearInterval(autoSaveTime)
            autoSaveTime = setInterval(autoSaveTimer, 1000)
            saveGame();
            gainPerSecondSave = gainPerSecond * 20
            prestigeAutoUpgrades.style.display = "none"
            prestigeSingleUpgrades.style.display = "none"
            prestigeTab.style.display = "none"
            crystalCount.style.display = "none"
            doPrestige.style.display = "none"  
            autoTab.style.display = "none"
            fortuneTab.style.display = "none"
            container1.style.display = "none"
            container2.style.display = "none"
            container3.style.display = "none"
            latestPrestigesTab.style.display = "none"
            latestPrestigesPage.style.display = "none"
            check46.checked = false
            check13.checked = false
            checkCoin.checked = false
            
            tenthPrestigeRun.innerHTML = ""
            ninthPrestigeRun.innerHTML = ""
            eighthPrestigeRun.innerHTML = ""
            seventhPrestigeRun.innerHTML = ""
            sixthPrestigeRun.innerHTML = ""
            fifthPrestigeRun.innerHTML = ""
            fourthPrestigeRun.innerHTML = ""
            thirdPrestigeRun.innerHTML = ""
            secondPrestigeRun.innerHTML = ""
            firstPrestigeRun.innerHTML = ""
            var hardNotifyColor
            hardNotifyColor = "red";
            notify(hardNotify, hardNotifyColor);
            singleUpgradePurchasedRemove()
            achievementGottenRemove()}
}


function prestigeReset (){
            money = 10
            first.price = 10
            second.price = 100
            third.price = 1000
            first.amount = 0
            second.amount = 0
            third.amount = 0
            first.b  = 0
            second.b  = 0
            third.b  = 0
            second.boost = 1
            third.boost = 1
            fourth.amount = 0
            fifth.amount = 0
            sixth.amount = 0
            fourth.x = 1
            fifth.x = 1
            sixth.x = 1
            fourth.price = 10000
            fifth.price = 1200000
            sixth.price = 5000000
            firstprice = 10
            secondprice = 100
            thirdprice = 1000
            prestigeSeconds = 0
            prestigeMinutes = 0
            prestigeHours = 0
            fastPrestigeSecondsTimer = 0
            prestigeSeconds = ("0" + prestigeSeconds).slice(-2)
            prestigeMinutes = ("0" + prestigeMinutes).slice(-2)
            prestigeHours = ("0" + prestigeHours).slice(-2)
            stopPRInterval.call()
            stopPRInterval.call()
            startTextOfUpgrades.call();
            purchasedButtonSingleU1.classList.remove('purchased');
            purchasedButtonSingleU2.classList.remove('purchased');
            purchasedButtonSingleU3.classList.remove('purchased');


            
}

function exportSave() {
    gainPerSecondSave = gainPerSecond * 20;
    whatsYourCurrentTime();

    let datasave = savingTheGame(); 

    notify(exportNotify);

    //     let obj = {
    //     achiRow: achRow1.completion,
    //     datasave: datasave
    // };
    // console.log(obj)
    let exportedData = JSON.stringify(datasave); //превратим в строчку
    let exportedData2 = JSON.stringify(achRow1.completion)
    let base641 = btoa(exportedData); // кодируем строку в base64
    let base642 = btoa(exportedData2); // кодируем строку в base64
    var base64 = `${base641}|${base642}`
    console.log(base64)
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
    const [base64DataSave, base64Completion] = base64.split("|");
    const importedData1 = atob(base64DataSave);
    const importedData2 = atob(base64Completion);
    console.log(importedData1) 
    console.log (importedData2)
    localStorage.setItem('datasaving', importedData1);
    localStorage.setItem('completion', importedData2);
    // const datasave = JSON.parse(base64DataSave);
    // console.log(datasave);
    achievementGottenRemove ()
    singleUpgradePurchasedRemove ()
    importingTheGame();
    singleUpgradeTextUpdate ()
    singleUpgradePurchased ()
    achCompletionsChecker()
    getCoinPerSec()
    whatsYourCurrentTime2()
    offlineGain()
    offlineGainTime()
    convertingTime()
    autoSaverTimer = 0
    clearInterval(autoSaveTime)
    autoSaveTime = setInterval(autoSaveTimer, 1000)
    notify(importNotify);

}

function checkThisBox () {
            if (check46.checked) { // флажок отмечен
              autoBuy46Interval = setInterval(autoBuy46, 100); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoBuy46Interval); // останавливаем запуск функции autoBuy46()
            }
            if (check13.checked) { // флажок отмечен
              autoBuy13Interval = setInterval(autoBuy13, 33); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoBuy13Interval); // останавливаем запуск функции autoBuy46()
            }
            if (checkCoin.checked) { // флажок отмечен
              autoCoinInterval = setInterval(autoCoin, 33); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoCoinInterval); // останавливаем запуск функции autoBuy46()
            }
            return autoCoinInterval, autoBuy46Interval, autoBuy13Interval;
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

function savingTheGame() {
    return {
        gainPerSecondSave: gainPerSecondSave,
        lastOnlineTime: lastOnlineTime,
        money: money,
        completion: completion,
        onecheck: onecheck,
        autoSaving: autoSaving,
        unlockedPrestige: unlockedPrestige,
        gainPerSecond: gainPerSecond,
        gainPerClick: gainPerClick,
        total: total,
        clickCount: clickCount,
        gameTimer: gameTimer,
        totalDiamond: totalDiamond,
        totalPrestiges: totalPrestiges,
        amountsOfUpgrades: amountsOfUpgrades,
        check46_checked: check46.checked,
        check13_checked: check13.checked,
        checkCoin_checked: checkCoin.checked,
        gameSeconds: gameSeconds,
        gameMinutes: gameMinutes,
        gameHours: gameHours,
        prestigeSeconds: prestigeSeconds,
        prestigeMinutes: prestigeMinutes,
        prestigeHours: prestigeHours,
        fastPrestigeSeconds: fastPrestigeSeconds,
        fastPrestigeMinutes: fastPrestigeMinutes,
        fastPrestigeHours: fastPrestigeHours,
        fastPrestigeSecondsTimer: fastPrestigeSecondsTimer,
        bestPrestigeRun: bestPrestigeRun,
        firstBank: (encodeURIComponent(firstBank)),
        secondBank: (encodeURIComponent(secondBank)),
        thirdBank: (encodeURIComponent(thirdBank)),
        fourthBank: (encodeURIComponent(fourthBank)),
        fifthBank: (encodeURIComponent(fifthBank)),
        sixthBank: (encodeURIComponent(sixthBank)),
        seventhBank: (encodeURIComponent(seventhBank)),
        eighthBank: (encodeURIComponent(eighthBank)),
        ninthBank: (encodeURIComponent(ninthBank)),
        tenthBank: (encodeURIComponent(tenthBank)),
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
    };
}

function loadingTheGame() {
    let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
    let parsedData = JSON.parse(storedData);
    //тут мы парсируем не datasave а именно весь obj, но нам нужно достать из obj datasave и сделать это с ачивками
    // можно попробовать datasave {*переменные*} сделать


    gainPerSecondSave = parseFloat(parsedData.gainPerSecondSave)
    lastOnlineTime = parseFloat(parsedData.lastOnlineTime)
    gainPerSecond = parseFloat(parsedData.gainPerSecond)
    money = parseFloat(parsedData.money);
    autoSaving = parsedData.autoSaving;
    completion = parseFloat(parsedData.completion);
    onecheck = parseFloat(parsedData.onecheck);
    total = parseFloat(parsedData.total);
    gainPerSecond = parseFloat(parsedData.gainPerSecond);
    gainPerClick = parseFloat(parsedData.gainPerClick);
    // totalDiamond = parseFloat(parsedData.totalDiamond);
    // totalPrestiges = parseFloat(parsedData.totalPrestiges);
    amountsOfUpgrades = parseFloat(parsedData.amountsOfUpgrades);
    clickCount = parseFloat(parsedData.clickCount);
    gameTimer = parseFloat(parsedData.gameTimer);
    // unlockedPrestige = parseFloat(parsedData.unlockedPrestige)
    // diamonds = parseFloat(parsedData.diamonds);
    // diamondsBoost = parseFloat(parsedData.diamondsBoost);
    check13.checked = parsedData.check13_checked;
    check46.checked = parsedData.check46_checked;
    checkCoin.checked = parsedData.checkCoin_checked;
    gameSeconds = parseFloat(parsedData.gameSeconds);
    gameMinutes = parseFloat(parsedData.gameMinutes);
    gameHours = parseFloat(parsedData.gameHours);
    prestigeSeconds = parseFloat(parsedData.prestigeSeconds);
    prestigeMinutes = parseFloat(parsedData.prestigeMinutes);
    prestigeHours = parseFloat(parsedData.prestigeHours);
    fastPrestigeSeconds = parseFloat(parsedData.fastPrestigeSeconds);
    fastPrestigeMinutes = parseFloat(parsedData.fastPrestigeMinutes);
    fastPrestigeHours = parseFloat(parsedData.fastPrestigeHours);
    fastPrestigeSecondsTimer = parseFloat(parsedData.fastPrestigeSecondsTimer);
    bestPrestigeRun = parseFloat(parsedData.bestPrestigeRun);
    firstBank = decodeURIComponent((parsedData.firstBank));
    secondBank = decodeURIComponent((parsedData.secondBank));;
    thirdBank = decodeURIComponent((parsedData.thirdBank));
    fourthBank = decodeURIComponent((parsedData.fourthBank));
    fifthBank = decodeURIComponent((parsedData.fifthBank));
    sixthBank = decodeURIComponent((parsedData.sixthBank));
    seventhBank = decodeURIComponent((parsedData.seventhBank));
    eighthBank = decodeURIComponent((parsedData.eighthBank));
    ninthBank = decodeURIComponent((parsedData.ninthBank));
    tenthBank = decodeURIComponent((parsedData.tenthBank));
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

}

function importingTheGame() {
    let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
    let parsedData = JSON.parse(storedData);
    //тут мы парсируем не datasave а именно весь obj, но нам нужно достать из obj datasave и сделать это с ачивками
    // можно попробовать datasave {*переменные*} сделать хз
    achRow1.completion = JSON.parse(localStorage.getItem('completion')).map(Boolean);
    console.log(achRow1.completion)

    gainPerSecondSave = parseFloat(parsedData.gainPerSecondSave)
    lastOnlineTime = parseFloat(parsedData.lastOnlineTime)
    gainPerSecond = parseFloat(parsedData.gainPerSecond)
    money = parseFloat(parsedData.money);
    autoSaving = parsedData.autoSaving
    completion = parseFloat(parsedData.completion);
    onecheck = parseFloat(parsedData.onecheck);
    total = parseFloat(parsedData.total);
    gainPerSecond = parseFloat(parsedData.gainPerSecond);
    gainPerClick = parseFloat(parsedData.gainPerClick);
    // totalDiamond = parseFloat(parsedData.totalDiamond);
    // totalPrestiges = parseFloat(parsedData.totalPrestiges);
    amountsOfUpgrades = parseFloat(parsedData.amountsOfUpgrades);
    clickCount = parseFloat(parsedData.clickCount);
    gameTimer = parseFloat(parsedData.gameTimer);
    // unlockedPrestige = parseFloat(parsedData.unlockedPrestige)
    // diamonds = parseFloat(parsedData.diamonds);
    // diamondsBoost = parseFloat(parsedData.diamondsBoost);
    check13.checked = parsedData.check13_checked;
    check46.checked = parsedData.check46_checked;
    checkCoin.checked = parsedData.checkCoin_checked;
    gameSeconds = parseFloat(parsedData.gameSeconds);
    gameMinutes = parseFloat(parsedData.gameMinutes);
    gameHours = parseFloat(parsedData.gameHours);
    prestigeSeconds = parseFloat(parsedData.prestigeSeconds);
    prestigeMinutes = parseFloat(parsedData.prestigeMinutes);
    prestigeHours = parseFloat(parsedData.prestigeHours);
    fastPrestigeSeconds = parseFloat(parsedData.fastPrestigeSeconds);
    fastPrestigeMinutes = parseFloat(parsedData.fastPrestigeMinutes);
    fastPrestigeHours = parseFloat(parsedData.fastPrestigeHours);
    fastPrestigeSecondsTimer = parseFloat(parsedData.fastPrestigeSecondsTimer);
    bestPrestigeRun = parseFloat(parsedData.bestPrestigeRun);
    firstBank = decodeURIComponent((parsedData.firstBank));
    secondBank = decodeURIComponent((parsedData.secondBank));;
    thirdBank = decodeURIComponent((parsedData.thirdBank));
    fourthBank = decodeURIComponent((parsedData.fourthBank));
    fifthBank = decodeURIComponent((parsedData.fifthBank));
    sixthBank = decodeURIComponent((parsedData.sixthBank));
    seventhBank = decodeURIComponent((parsedData.seventhBank));
    eighthBank = decodeURIComponent((parsedData.eighthBank));
    ninthBank = decodeURIComponent((parsedData.ninthBank));
    tenthBank = decodeURIComponent((parsedData.tenthBank));
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
}




function loadingTheGame2() {
    singleUpgradePurchased();
    if (unlockedPrestige == 1 || totalDiamond >= 1) {
        prestigeTab.style.display = "block"; unlockPrestige(); latestPrestigesTab.style.display = "block";
        if (totalDiamond > 1)
            crystalCount.style.display = "block";
    }
    tenthPrestigeRun.innerHTML = tenthBank;
    ninthPrestigeRun.innerHTML = ninthBank;
    eighthPrestigeRun.innerHTML = eighthBank;
    seventhPrestigeRun.innerHTML = seventhBank;
    sixthPrestigeRun.innerHTML = sixthBank;
    fifthPrestigeRun.innerHTML = fifthBank;
    fourthPrestigeRun.innerHTML = fourthBank;
    thirdPrestigeRun.innerHTML = thirdBank;
    secondPrestigeRun.innerHTML = secondBank;
    firstPrestigeRun.innerHTML = firstBank;
}





function upgradeReset() {
    secondBuyable = {
        amount: 0,
        baseEffect: 0,
        price: 100,
        basePrice: 100,
        updateText: document.getElementById('buyableU2'),
        power: 1.1415
    };
    firstBuyable = {
        amount: 0,
        baseEffect: 0,
        price: 10,
        basePrice: 10,
        updateText: document.getElementById('buyableU1'),
        power: 1.095
    };
    thirdBuyable = {
        amount: 0,
        baseEffect: 0,
        price: 500,
        basePrice: 500,
        updateText: document.getElementById('buyableU3'),
        power: 6.15
    };
    fourthBuyable = {
        amount: 0,
        baseEffect: 0,
        price: 1000,
        basePrice: 1000,
        updateText: document.getElementById('buyableU4'),
        power: 1.55
    };
    fifthBuyable = {
        amount: 0,
        baseEffect: 0,
        price: 5000,
        basePrice: 5000,
        updateText: document.getElementById('buyableU5'),
        power: 2.2
    };
    firstSingle = {
        amount: 0,
        baseEffect: 0,
        price: 100000,
        updateText: document.getElementById('singleU1'),
        priceText: "<br> Стоимость: 25000 α-монет"
    }
    secondSingle = {
        amount: 0,
        baseEffect: 0,
        price: 1.5e6,
        updateText: document.getElementById('singleU2'),
        priceText: "<br> Стоимость: 250000 α-монет"
    }
    thirdSingle = {
        amount: 0,
        baseEffect: 0,
        price: 3.5e6,
        updateText: document.getElementById('singleU3'),
        priceText: "<br> Стоимость: 1e6 α-монет"
    }
    fourthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 3e7,
        updateText: document.getElementById('singleU4'),
        priceText: "<br> Стоимость: 5e6 α-монет"
    }
    fifthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 5e8,
        updateText: document.getElementById('singleU5'),
        priceText: "<br> Стоимость: 2.5e7 α-монет"
    }
    sixthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 3e9,
        updateText: document.getElementById('singleU6'),
        priceText: "<br> Стоимость: 7.77e7 α-монет"
    }
    seventhSingle = {
        amount: 0,
        baseEffect: 0,
        price: 1.1e10,
        updateText: document.getElementById('singleU7'),
        priceText: "<br> Стоимость: 1.5e8 α-монет"
    }
    eighthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 1.5e11,
        updateText: document.getElementById('singleU8'),
        priceText: "<br> Стоимость: 1e10 α-монет"
    }
    ninthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 1.2e12,
        updateText: document.getElementById('singleU9'),
        priceText: "<br> Стоимость: 1.11e11 α-монет"
    }
    tenthSingle = {
        amount: 0,
        baseEffect: 0,
        price: 1e13,
        updateText: document.getElementById('singleU10'),
        priceText: "<br> Стоимость: 2e12 α-монет"
    }

}