let money = 10, total = 10;
let notCapped, capped;
let lastOnlineTime = 0, currentOnlineTime = 0;
let gain = 1, gainPerClick = 1, gainPerSecond = 0, getCoinPerSecond
let clickCount = 0
let gameMinutesTemp = 0, gameHoursTemp = 0, gameDaysTemp = 0;
let autoSaving = 'yes'; 
let totalCoins = document.getElementById('totalCoins');
let link = document.getElementById('link');
let gameHours = 0, gameMinutes = 0, gameSeconds = 0, gameTimer = 0, gameDays = 0, gameSecondsText, gameMinutesText, gameHoursText, gameDaysText
let dailySeconds = 0, dailyMinutes = 0, dailyHours = 0, dailyTimer = 0;
let backdrop1 = document.getElementById("myPopupBackdrop1")
let popup = document.getElementById("changelogWindow");
let popup2 = document.getElementById("gameLoreWindow");
let popup3 = document.getElementById("gameHelpWindow");
let openedWindow = document.getElementById("window");
let offlinePopup = document.getElementById("offlineGainWindow");
let progress = document.getElementById("progressbar")
let notiString = '', notiColor, notiWidth;
let coinGains = document.getElementById("coinGain");
let timeDifference = currentOnlineTime - lastOnlineTime, moneyTemp = 1, gameSecondsTemp = 1, gameTimerTemp = 1
let superCoins = 0, totalSuperCoins = 0, superCoinsTemp = 0;
let optionValue = "option1"
let overdriveType1Activate, overdriveType1Bool = false, overdriveType1Price = 0
let codeIsFalse, codeIsTrue, codeIsUsed, code1Reward;
let code, codeReward
let superCoinsTemp2 = 0
let dailyIsTrue, dailyIsFalse
let gainPerClickTitle, gainPerSecondTitle, gainTitle
let multIdentifier = 0
let resetTitle, NaNedTitle, clicksPerSecond = 0

const versionDiv = document.getElementById('versionDiv');
let startY;
let startScrollTop;

versionDiv.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
    startScrollTop = versionDiv.scrollTop;
});

versionDiv.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    versionDiv.scrollTop = startScrollTop - deltaY;

    event.preventDefault(); // Отменяем стандартное скроллирование
});


function randomNumber (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min))
}

function addSecond () {
    gameTimer++
    gameSeconds++
    convertingTime2()
    dailyTimer <= 0 ? dailyTimer = 0 : dailyTimer--
    dailySeconds <= 0 ? dailySeconds = 0 : dailySeconds--
    convertingTime();
}

setInterval(()=>{
    progress.style.width = Math.min(Math.log(money)/Math.log(1e15)*100, 100)  + "%"
    percent.innerHTML = formatNumber2(money) + "/1e15 (" + Math.min(findRatio(money, 1e15), 100) + "%)"

    overdriveType1ProgressBar.style.width = overdriveType1.percent + "%"
},50)
setInterval(addSecond, 1000)
var overdriveType1ProgressBarBase = document.getElementById('overdriveType1ProgressBarBase')
var overdriveType1ProgressBar = document.getElementById('overdriveType1ProgressBar')

overdriveType1ProgressBarBase.addEventListener("click", function() {
    overdriveType1Bool ? overdriveType1Bool = false : overdriveType1Bool = true
    if (overdriveType1Bool){
        overdriveType1Activate = setInterval(()=> {
            if (money >= overdriveType1.price){
                money -= overdriveType1.price
                overdriveType1.percent += 0.033
                overdriveType1.effect = 1+Math.pow(2, overdriveType1.percent/3.33)/1.5
                overdriveType1.price = 100+Math.pow(10, overdriveType1.percent)/20*2
            }
        }, 50)
    }
    else clearInterval(overdriveType1Activate)
})

function convertingTime() {
    gameSecondsText = Math.round(gameSeconds)
    gameMinutesText = gameMinutes
    gameHoursText = gameHours
    gameDaysText = gameDays
    if (gameSeconds >= 60) {
        gameMinutesTemp = Math.floor(gameSeconds / 60)
        gameSeconds = Math.round(((gameSeconds / 60) - gameMinutesTemp) * 60)
        gameMinutes += gameMinutesTemp
        gameSecondsText = gameSeconds;
        gameMinutesText = gameMinutes; 
        }
    if (gameMinutes >= 60) {
            gameHoursTemp = Math.floor(gameMinutes / 60)
            gameMinutes = Math.round(((gameMinutes / 60) - gameHoursTemp) * 60)
            gameHours += gameHoursTemp
            gameMinutesText = gameMinutes;
            gameHoursText = gameHours
            }
    if (gameHours >= 24) {
            gameDaysTemp = Math.floor(gameHours / 24) //100/24 = 4
            gameHours = Math.round(((gameHours / 24) - gameDaysTemp) * 24) //4.16-4=0.16*24=4
            gameDays += gameDaysTemp // 0 + 4 = 4
            gameHoursText = gameHours; // text = 4 (100-24*4=4)
            gameDaysText = gameDays // text = 4
            }
}

function convertingTime2() {
    if (dailySeconds >= 60) {
        let minutesTemp = Math.floor(dailySeconds / 60)
        dailySeconds = Math.round(((dailySeconds / 60) - minutesTemp) * 60)
        dailyMinutes += minutesTemp
        }
    if (dailyMinutes >= 60) {
            let hoursTemp = Math.floor(dailyMinutes / 60)
            dailyMinutes = Math.round(((dailyMinutes / 60) - hoursTemp) * 60)
            dailyHours += hoursTemp
        }
    if (dailyMinutes <= 0 && dailySeconds <= 0 && dailyHours != 0) {
            dailyHours--
            dailyMinutes += 60
    }
    if (dailySeconds <= 0 && dailyMinutes != 0 && dailyHours != 0) {
        dailyMinutes--
        dailySeconds += 60
    }
}

function softCap(resource, conditionCount, softCapPower) {
    if (resource >= conditionCount) { // gain >= 1e13
        let needToSoftCap = resource / conditionCount 
        needToSoftCap = Math.pow(needToSoftCap, softCapPower)
        return conditionCount * needToSoftCap
    }
    else return resource
}

function getCoinPerSec() {
    randomNumber(0, 2000/1+fourthShopBuyableEffect) == 0 ? (superCoins++, totalSuperCoins++) : superCoins;
    superCoins = Math.round(superCoins)
    gain = 1-thirdSingle.baseEffect+(thirdSingle.baseEffect*2)
    gain *= 1+thirdShopBuyableEffect
    gain *= overdriveType1.effect
    gain *= achievementBonus
    gain *= seventhSingleEffect
    gain *= umultiplier
    gain = Math.pow(gain, upower)
    gainPerSecond = firstBuyableEffect
    gainPerSecond *= 1+secondShopBuyableEffect
    gainPerSecond *= sixthSingleEffect
    fourthBuyable.amount >= 1 ? gainPerSecond *= fourthBuyableEffect : gainPerSecond = gainPerSecond
    achRow1.completion[4] ? gainPerSecond *= (1+0.0001*clickCount) : gainPerSecond = gainPerSecond
    firstSingle.amount == 1 ? gainPerSecond *= firstSingleEffect : gainPerSecond = gainPerSecond
    gainPerSecond *= gain
    gainPerSecond = softCap(gainPerSecond, 1e13, 0.5)
    gainPerSecond /= 20.0
    money = money+gainPerSecond;
    total = total+gainPerSecond;
    umultiplierCost = 100 + (50 * umultipliercount)
    upowerCost = 250 + (100 * upowercount)
    // if (total >= 1e15) {
    //     crystalCount.style.display = 'block'
    //     doPrestige.style.display = 'block'
    //     totalCrystalsStats.style.display = 'block'
    // }
}


function getCoin() {
    if (clicksPerSecond < 10) {
        clickCount++
        randomNumber(0, 100/1+fourthShopBuyableEffect) == 0 ? (superCoins++, totalSuperCoins++) : superCoins;
        gainPerClick = 1
        gainPerClick *= Math.pow(2, thirdBuyable.baseEffect) 
        gainPerClick *= 1+firstShopBuyableEffect
        eighthSingle.amount == 1 ? gainPerClick *= eighthSingleEffect : gainPerClick = gainPerClick
        secondSingle.amount == 1 ? gainPerClick *= midasFormula : gainPerClick = gainPerClick
        gainPerClick *= gain
        gainPerClick = Math.pow(gainPerClick, fifthBuyableEffect)
        gainPerClick = softCap(gainPerClick, 1e13, 0.5)
        clicksPerSecond++
        coinGains.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
                event.preventDefault(); // Эта строка предотвращает стандартное поведение (например, отправку формы)
                // Ничего не делаем, не меняем значение gainPerClick
            }})
        money = money+gainPerClick;
        total = total+gainPerClick;
    }
}

setInterval(() => {
    clicksPerSecond = 0
}, 1000);

function selectTab(argument, isFlex) {
    const tabsToHide = ['mainTab', 'infoTab', 'settingsTab', 'achTab', 'newsTab', 'shopTab']
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    if (!isFlex) argument.style.display = "block"
    else argument.style.display = "flex"
}

function selectSubTab(argument, isFlex, mainTab) {
    const settingsTabsToHide = ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab']
    const clickerTabsToHide = ['coinsTab', 'overdriveTab']
    const infoTabsToHide = ['aboutGameTab', 'statisticsTab', 'multipliersTab']
    let tabsToHide
    if (mainTab == 'settings') tabsToHide = settingsTabsToHide
    else if (mainTab == 'clicker') tabsToHide = clickerTabsToHide
    else if (mainTab == 'info') tabsToHide = infoTabsToHide
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    if (!isFlex) argument.style.display = "block"
    else argument.style.display = "flex"
}

function showStats(multId) {
    const tabsToHide = ['gainPerClickStats', 'gainPerSecondStats', 'wholeGainStats', 'gainPerClickGraphic', 'gainPerSecondGraphic', 'gainGraphic']
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    multIdentifier = multId
    if (multId == 0) {gainPerClickStats.style.display = 'block'; gainPerClickGraphic.style.display = 'block'; multBreakdownTitle.innerHTML = gainPerClickTitle}
    else if (multId == 1) {gainPerSecondStats.style.display = 'block'; gainPerSecondGraphic.style.display = 'block'; multBreakdownTitle.innerHTML = gainPerSecondTitle}
    else if (multId == 2) {wholeGainStats.style.display = 'block'; gainGraphic.style.display = 'block'; multBreakdownTitle.innerHTML = gainTitle}
}

function checkBuyableDisabledUpgrade (x, y) {
    money >= x.price ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkShopBuyableDisabledUpgrade (x, y, z) {
    superCoins >= Math.round(x.price) || x.amount == z ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkSingleDisabledUpgrade (x, y) {
    money >= x.price || x.amount == 1 ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkShopSingleDisabledUpgrade (x, y) {
    superCoins >= Math.round(x.price) || x.amount == 1 ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function disabledUpgrades(){
    checkBuyableDisabledUpgrade(firstBuyable, 'buyableU1')
    checkBuyableDisabledUpgrade(secondBuyable, 'buyableU2')
    checkBuyableDisabledUpgrade(thirdBuyable, 'buyableU3')
    checkBuyableDisabledUpgrade(fourthBuyable, 'buyableU4')
    checkBuyableDisabledUpgrade(fifthBuyable, 'buyableU5')
    checkSingleDisabledUpgrade(firstSingle, 'singleU1')
    checkSingleDisabledUpgrade(secondSingle, 'singleU2')
    checkSingleDisabledUpgrade(thirdSingle, 'singleU3')
    checkSingleDisabledUpgrade(fourthSingle, 'singleU4')
    checkSingleDisabledUpgrade(fifthSingle, 'singleU5')
    checkSingleDisabledUpgrade(sixthSingle, 'singleU6')
    checkSingleDisabledUpgrade(seventhSingle, 'singleU7')
    checkSingleDisabledUpgrade(eighthSingle, 'singleU8')
    checkSingleDisabledUpgrade(ninthSingle, 'singleU9')
    checkSingleDisabledUpgrade(tenthSingle, 'singleU10')
    checkShopBuyableDisabledUpgrade(firstShopBuyable, 'shopBuyableU1', 100)
    checkShopBuyableDisabledUpgrade(secondShopBuyable, 'shopBuyableU2', 100)
    checkShopBuyableDisabledUpgrade(thirdShopBuyable, 'shopBuyableU3', 100)
    checkShopBuyableDisabledUpgrade(fourthShopBuyable, 'shopBuyableU4', 100)
    checkShopSingleDisabledUpgrade(firstShopSingle, 'shopSingleU1')
    firstBuyable.amount >= 100 + (50 * umultipliercount) ? document.getElementById('umultiplierBoost').disabled = false : document.getElementById('umultiplierBoost').disabled = true;
    (firstBuyable.amount >= 250 + (100 * upowercount)) && (umultipliercount >= 4) ? document.getElementById('upowerBoost').disabled = false : document.getElementById('upowerBoost').disabled = true
    }
setInterval(disabledUpgrades, 50)



function notify(notiString, notiColor, notiWidth) {
    const notification = document.createElement('div');

    notification.classList.add('notification');
    notification.innerHTML = notiString;
    notification.style.backgroundColor = notiColor;
    notification.style.width = notiWidth;
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 1500); // подождать завершения анимации исчезновения
      }, 1700); // показывать уведомление 5 секунд
    }, );
  }



function changelog(){
    changelogWindow.style.display = "block"
    backdrop1.style.display = "flex";
}

function gameLoreOpen(){
    gameLoreWindow.style.display = "block"
    backdrop1.style.display = "flex";
}

function howToPlayOpen(){
    gameHelpWindow.style.display = "flex"
    backdrop1.style.display = "flex";
}

function resetConfirmationOpen(){
    popup4.style.display = "block"
    backdrop1.style.display = "flex";
}

function openWindow(arg, isFlex) {
    const descsToHide = ['confirmationButtons', 'whichCode', 'dailyDesc']
    for (const descId of descsToHide) {
        const desc = document.getElementById(descId);
        if (desc) {
            desc.style.display = "none";
        }
    }
    if (!isFlex) openedWindow.style.display = "block"
    else openedWindow.style.display = "flex"
    if (arg == 'hardReset' || arg == 'gotNaNed') {
        confirmationButtons.style.display = "flex";windowTitleDiv.style.display = 'block' 
        if (arg == 'hardReset') {windowTitle2.innerHTML = resetTitle}
        else if (arg == 'gotNaNed') {windowTitle2.innerHTML = NaNedTitle}
}
    else if (arg == 'code') {whichCode.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'daily') {dailyDesc.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    backdrop1.style.display = "flex";
}



function hidePopup() {
    popup.style.display = "none";
    popup2.style.display = "none";
    popup3.style.display = "none";
    openedWindow.style.display = "none";
    backdrop1.style.display = "none";
    backdrop2.style.display = "none";
    offlinePopup.style.display = "none";
    showChangelog(startDesc)
    showStory(startChapDesc)
    showHelpPage(startHelpDesc, empty)
    }

backdrop1.addEventListener("click", hidePopup);
//чтобы монеты показывались при нажатии

coinGains.addEventListener("click", function(event) {
{
    const myMessage = document.createElement('div');

    var x = event.clientX;
    var y = event.clientY;

    myMessage.style.left = (x - 20 ) + "px";
    myMessage.style.top = (y - 35) + "px";

    myMessage.classList.add('myMessage');
    myMessage.innerHTML = ("+" + formatNumber2(gainPerClick));
    document.body.appendChild(myMessage);

    setTimeout(() => {
        myMessage.classList.add('show');
        setTimeout(() => {
        myMessage.classList.remove('show');
        myMessage.classList.add('hide')
        setTimeout(() => {
            myMessage.remove();
          }, 500); // подождать завершения анимации исчезновения
        }, 0); // показывать уведомление 5 секунд
    },0 );

}})
function formatNumber2(number) {
    if (number < 1000000) {
        return number.toFixed(0);
    } else {
        return number.toExponential(2).replace("+","");
    }
}
function whatsYourCurrentTime () {
    let now = new Date()

    var realSeconds = now.getSeconds()
    var realMinutes = now.getMinutes()
    var realHours = now.getHours()
    var realDays = now.getDate() 
    var realMonths = now.getMonth()+1
    var realYear = now.getFullYear()
    realMonths += realYear * 12
    realDays += realMonths * 30
    realHours += realDays * 24
    realMinutes += realHours * 60
    realSeconds += realMinutes * 60
    lastOnlineTime = realSeconds
    return lastOnlineTime
}

function whatsYourCurrentTime2 () {
    let now = new Date()

    var realSeconds = now.getSeconds()
    var realMinutes = now.getMinutes()
    var realHours = now.getHours()
    var realDays = now.getDate() 
    var realMonths = now.getMonth()+1
    var realYear = now.getFullYear()
    realMonths += realYear * 12
    realDays += realMonths * 30
    realHours += realDays * 24
    realMinutes += realHours * 60
    realSeconds += realMinutes * 60
    currentOnlineTime = realSeconds

    return currentOnlineTime
}

setInterval(whatsYourCurrentTime2, 1000)

function offlineGain () {
    timeDifference = currentOnlineTime - lastOnlineTime
    if (timeDifference >= 1000) {
        superCoinsTemp = timeDifference/(1000/(1+fourthShopBuyableEffect))
    }
    else superCoinsTemp = 0
    dailyTimer -= timeDifference
    dailyTimer += autoSaverTimer
    dailyMinutes = 0
    dailyHours = 0
    dailySeconds = dailyTimer
    convertingTime2()
    superCoins += superCoinsTemp
    totalSuperCoins += superCoinsTemp
    moneyTemp = gainPerSecondSave * timeDifference
    moneyTemp -= gainPerSecondSave * autoSaverTimer
    money += moneyTemp
    total += moneyTemp
    gameSecondsTemp = timeDifference
    gameSecondsTemp -= autoSaverTimer
    gameTimerTemp = timeDifference
    gameTimerTemp -= autoSaverTimer
    gameSeconds += gameSecondsTemp
    gameTimer += gameTimerTemp
}
//если ты находишься 10 секунд в игре затем ливаешь и перезаходишь то ты получаешь ещё 10 секунд получения монет. 


function offlineGainTime() {
    convertingTime()
    whatsYourCurrentTime()
}

document.addEventListener("visibilitychange", function() {
    if (!document.hidden) { // проверяем, что страница стала видимой
    clearInterval(getCoinPerSecond)
    clearInterval(autosaver)
    clearInterval(autoSaveTime)
    offlineGain();
    autoSaverTimer = 0
    autosaver = setInterval(autoSaveThis, 30000); //таймер
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
    saveGame()
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) { // проверяем, что страница стала невидимой
        clearInterval(getCoinPerSecond)
        clearInterval(autosaver)
        clearInterval(autoSaveTime)
    }
});

function hoverColor(iden){
    let stats = iden + "Stats";
    let effect = iden + "StatsEffect"
    let element = document.getElementById(stats)
    let element2 = document.getElementById(effect)
    element.style.color = 'yellow';
    element2.style.color = 'yellow';
}

function hoverColorInverse(iden){
    let stats = iden + "Stats";
    let effect = iden + "StatsEffect"
    let element = document.getElementById(stats)
    let element2 = document.getElementById(effect)
    element.style.color = 'white';
    element2.style.color = 'white';
}


function playSong1() {
    audio1.play()

    audio1.addEventListener("ended", function() {
        playSong2()
    })
}
function playSong2() {
    audio2.play()

    audio2.addEventListener("ended", function() {
        playSong1()
    })
}

function changeFonts(option) {
    var font
    if (option.value == 'option1') {
        font = 'Poly'
        
    }
    if (option.value == 'option2') {
        font = 'serif'
    }
    if (option.value == 'option3') {
        font = 'Impact'
    }
    if (option.value == 'option4') {
        font = 'Courier'
    }
    if (option.value == 'option5') {
        font = 'Verdana'
    }
    if (option.value == 'option6') {
        font = 'system-ui'
    }
    if (option.value == 'option7') {
        font = 'PAPYRUS THE GREAT'
        playSong1();
    }
    if (option.value == 'option8') {
        font = 'Comic Sans'
    }
    if (option.value == 'option9') {
        font = 'monotyper'
    }
    if (option.value == 'option10') {
        font = 'swkeys'
    }
    if (option.value != 'option7'){
        audio1.currentTime = 0
        audio1.pause()
        audio2.currentTime = 0
        audio2.pause()
    }
    body.style.fontFamily = font
    select.style.fontFamily = font
    label.style.fontFamily = font
    for (var i = 0; i < buttons.length; i++){
        buttons[i].style.fontFamily = font
    }
    optionValue = option.value
}

function changeFonts2(option) {
    var font;
    if (option == 'option1') {
        font = 'Poly'
    }
    if (option == 'option2') {
        font = 'serif'
    }
    if (option == 'option3') {
        font = 'Impact'
    }
    if (option == 'option4') {
        font = 'Courier'
    }
    if (option == 'option5') {
        font = 'Verdana'
    }
    if (option == 'option6') {
        font = 'system-ui'
    }
    if (option == 'option7') {
        font = 'PAPYRUS THE GREAT'
        setTimeout(playSong1,3000);
    }
    if (option == 'option8') {
        font = 'Comic Sans'
    }
    if (option == 'option9') {
        font = 'monotyper'
    }
    if (option == 'option10') {
        font = 'swkeys'
    }
    if (option != 'option7'){
        audio1.currentTime = 0
        audio1.pause()
        audio2.currentTime = 0
        audio2.pause()
    }
    body.style.fontFamily = font
    select.style.fontFamily = font
    label.style.fontFamily = font
    for (var i = 0; i < buttons.length; i++){
        buttons[i].style.fontFamily = font
    }
}

// function changeTheme(option) {
//     if (option.value == 'theme1') { //dark
//             body.style.backgroundColor = '#060606'
//     }
//     if (option.value == 'theme2') { //light
//             body.style.backgroundColor = 'white'
//     }
//     // body.style.backgroundColor = themeColor
//     // select.style.backgroundColor = themeColor
//     // label.style.backgroundColor = themeColor
//     // for (var i = 0; i < buttons.length; i++){
//     //     buttons[i].style.backgroundColor = themeColor
//     // }
// }

codeInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        readCode();
    }
});

var code1Check = false;
function readCode () {
    if (code == 'digitalgod' && code1Check == false) {
        code1Check = true
        superCoins += 69
        totalSuperCoins += 69
        codeReward = code1Reward
        whichCode.innerHTML = codeIsTrue
    }
    else if (code == 'digitalgod' && code1Check == true) whichCode.innerHTML = codeIsUsed
    else if (code != 'digitalgod') whichCode.innerHTML = codeIsFalse
    openWindow('code', true)
}

function getDaily() {
    if (dailySeconds == 0 && dailyMinutes == 0 && dailyHours == 0){
        superCoins += superCoinsTemp2
        totalSuperCoins += superCoinsTemp2
        dailyTimer = 86399
        dailySeconds = dailyTimer
        dailyDesc.innerHTML = dailyIsTrue
        convertingTime2()
    }
    else {dailyDesc.innerHTML = dailyIsFalse}
    openWindow('daily', true)
}
function nextShopPage(direction) {
    if (direction == 'right'){
        firstShopRow.style.display = 'none'
        secondShopRow.style.display = 'none'
        rightShopArrowDiv.style.display = 'none'
        firstItemRow.style.display = 'flex'
        secondItemRow.style.display = 'flex'
        leftShopArrowDiv.style.display = 'flex'
        shoppingDiv.style.borderRadius = '0px 0px 5px 0px'
    }
    if (direction == 'left'){
        firstShopRow.style.display = 'flex'
        secondShopRow.style.display = 'flex'
        rightShopArrowDiv.style.display = 'flex'
        firstItemRow.style.display = 'none'
        secondItemRow.style.display = 'none'
        leftShopArrowDiv.style.display = 'none'
        shoppingDiv.style.borderRadius = '0px 0px 0px 5px'
    }
}

galaxyClickButton.addEventListener('click', function() {
    window.open('https://galaxy.click/play/131', '_blank');
  });


const achEls = document.querySelectorAll('.ach');

function show(tooltip, popperInstance) {
  // Make the tooltip visible
tooltip.setAttribute('data-show', '');

  // Update its position
popperInstance.update();

  // other code
}

function hide(tooltip) {
  // Hide the tooltip
tooltip.removeAttribute('data-show');

  // other code
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

for (const achEl of achEls) {
const tooltip = document.getElementById('tooltip-' + achEl.id);
const popperInstance = Popper.createPopper(achEl, tooltip, {
    modifiers: [
    {
        name: 'offset',
        options: {
        offset: [0, 8],
        },
    },
    ],
    placement: 'top',
});

showEvents.forEach((event) => {
    achEl.addEventListener(event, () => show(tooltip, popperInstance));
});

hideEvents.forEach((event) => {
    achEl.addEventListener(event, () => hide(tooltip));
  });
}