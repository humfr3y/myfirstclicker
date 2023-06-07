var money = 10;
var total = 10;
var lastOnlineTime = 0;
var currentOnlineTime = 0;
var gain = 1;
var gainPerClick = 1;
var gainPerSecond = 1;
var clickCount = 0
var gameMinutesTemp = 0;
var gameHoursTemp = 0;
var autoSaving = 'no'; 
var endGoal = 1e100;
var completion;
var unlockedPrestige;
var totalCoins = document.getElementById('totalCoins');
var totalDiamond = 0
var totalPrestiges = 0
let link = document.getElementById('link');
var onecheck = 0;
var data = 0;
var container1 = document.getElementById('auto-buy1-container')
var container2 = document.getElementById('auto-buy2-container')
var container3 = document.getElementById('auto-buy3-container')
var crystalCount = document.getElementById('crystalCount')
var doPrestige = document.getElementById('doPrestige')
var gameHours = 0, gameMinutes = 0, gameSeconds = 0, gameTimer = 0
var prestigeHours = 0, prestigeMinutes = 0, prestigeSeconds = 0
var fastPrestigeHours = 0, fastPrestigeMinutes = 0, fastPrestigeSeconds = 0
var fastPrestigeSecondsTimer = 0
var gameSecondsText = ("0" + gameSeconds).slice(-2)
var gameMinutesText = ("0" + gameMinutes).slice(-2)
var gameHoursText = ("0" + gameHours).slice(-2)
var prestigeSecondsText = ("0" + prestigeSeconds).slice(-2)
var prestigeMinutesText = ("0" + prestigeMinutes).slice(-2)
var prestigeHoursText = ("0" + prestigeHours).slice(-2)
var fastPrestigeSecondsText = ("0" + fastPrestigeSeconds).slice(-2)
var fastPrestigeMinutesText = ("0" + fastPrestigeMinutes).slice(-2)
var fastPrestigeHoursText = ("0" + fastPrestigeHours).slice(-2)



function addSecond () {
    gameTimer++
    gameSeconds++
    prestigeSeconds++
    fastPrestigeSecondsTimer++
    convertingTime();
}
setInterval(addSecond, 1000)

    // setInterval(disabledUpgrades, 10); 

statsScreen.style.display = "none"
prestigeButtons.style.display = "none"
doPrestige.style.display = "none"
crystalCount.style.display = "none"
settingButtons.style.display = "none"
automationScreen.style.display = "none"
endGoodGameScreen.style.display = "none"
prestigeTab.style.display = "none"
autoTab.style.display = "none"
achivScreen.style.display = "none"
fortuneTab.style.display = "none"
fortuneButtons.style.display = "none"
prestigeAutoUpgrades.style.display = "none"
prestigeSingleUpgrades.style.display = "none"
aboutGamePage.style.display = "none"
latestPrestigesPage.style.display = "none"
latestPrestigesTab.style.display = "none"
container1.style.display = "none"
container2.style.display = "none"
container3.style.display = "none"
maxbuy.style.display = 'none' 


function convertingTime() {
    gameSecondsText = gameSeconds
    gameMinutesText = gameMinutes
    gameHoursText = gameHours
    prestigeSecondsText = ("0" + prestigeSeconds).slice(-2);
    prestigeMinutesText = ("0" + prestigeMinutes).slice(-2);
    prestigeHoursText = ("0" + prestigeHours).slice(-2);
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
    while (gameMinutes >= 60) { gameMinutes %= 60, gameHours++; gameMinutesText = gameMinutes }
    while (prestigeSeconds >= 60) { prestigeSeconds %= 60, prestigeMinutes++; prestigeSecondsText = ("0" + prestigeSeconds).slice(-2); prestigeMinutesText = ("0" + prestigeMinutes).slice(-2); }
    while (prestigeMinutes >= 60) { prestigeMinutes %= 60, prestigeHours++; prestigeMinutesText = ("0" + prestigeMinutes).slice(-2); }
}

function getCoinPerSec() {
    gain = 1-thirdSingle.baseEffect+(thirdSingle.baseEffect*2)
    gain *= seventhSingleEffect
    gain *= achievementBonus
    gain *= umultiplier
    gain = Math.pow(gain, upower)
    gainPerSecond = 1+firstBuyableEffect
    gainPerSecond *= sixthSingleEffect
    fourthBuyable.amount >= 1 ? gainPerSecond *= fourthBuyableEffect : gainPerSecond = gainPerSecond
    achRow1.completion[4] ? gainPerSecond *= (1+0.0001*clickCount) : gainPerSecond = gainPerSecond
    firstSingle.amount == 1 ? gainPerSecond *= Math.log10(total) : gainPerSecond = gainPerSecond
    gainPerSecond *= gain
    gainPerSecond /= 20.0
    money = money+gainPerSecond;
    total = total+gainPerSecond;
    umultiplierCost = 100 + (50 * umultipliercount)
    upowerCost = 250 + (100 * upowercount)
}
let getCoinPerSecond

function getCoin() {
    clickCount++
    gainPerClick = 1
    gainPerClick *= Math.pow(2, thirdBuyable.baseEffect) 
    gainPerClick *= fifthBuyableEffect
    eighthSingle.amount == 1 ? gainPerClick *= eighthSingleEffect : gainPerClick = gainPerClick
    secondSingle.amount == 1 ? gainPerClick = Math.pow(gainPerClick, midasFormula) : gainPerClick = gainPerClick
    gainPerClick *= gain
    money = money+gainPerClick;
    total = total+gainPerClick;
}


function settingsScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "block";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"

}
function mainScreen() {
    mainButtons.style.display = "block";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"
}
function prestigeScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "block";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"
}
function infoScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "block";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"
}
function autoScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "flex"
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"
}

function fortuneScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "block"
    achivScreen.style.display = "none"
}

function endGameScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    automationScreen.style.display = "none"
    endGoodGameScreen.style.display = "block";
    fortuneButtons.style.display = "none"
    achivScreen.style.display = "none"
}

function statisticScreen() {
    aboutGamePage.style.display = "none";
    statisticsPage.style.display = "block";
    latestPrestigesPage.style.display = "none";
    achivScreen.style.display = "none"
}


function aboutGameScreen() {
    aboutGamePage.style.display = "block";
    statisticsPage.style.display = "none"
    latestPrestigesPage.style.display = "none";
    achivScreen.style.display = "none"
}

function latestPrestigesScreen() {
    aboutGamePage.style.display = "none";
    statisticsPage.style.display = "none"
    latestPrestigesPage.style.display = "block";
    achivScreen.style.display = "none"
}

function achScreen () {
    achivScreen.style.display = "block"
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "flex"
    fortuneButtons.style.display = "none"

}

function checkBuyableDisabledUpgrade (x, y) {
    money >= x.price ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkSingleDisabledUpgrade (x, y) {
    money >= x.price || x.amount == 1 ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
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
    firstBuyable.amount >= 100 + (50 * umultipliercount) ? document.getElementById('umultiplierBoost').disabled = false : document.getElementById('umultiplierBoost').disabled = true;
    (firstBuyable.amount >= 250 + (100 * upowercount)) && (umultipliercount >= 4) ? document.getElementById('upowerBoost').disabled = false : document.getElementById('upowerBoost').disabled = true
    }
setInterval(disabledUpgrades, 50)

var notiString = ''
var notiColor;
var notiWidth;

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

var backdrop1 = document.getElementById("myPopupBackdrop1")
var popup = document.getElementById("changelogWindow");
var offlinePopup = document.getElementById("offlineGainWindow");

function changelog(){
    changelogWindow.style.display = "block"
    backdrop1.style.display = "flex";
}

function hidePopup() {
    popup.style.display = "none";
    backdrop1.style.display = "none";
    backdrop2.style.display = "none";
    offlinePopup.style.display = "none";
    showChangelog(startDesc)
    }

backdrop1.addEventListener("click", hidePopup);




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

var coinGains = document.getElementById("coinGain");

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
var timeDifference = currentOnlineTime - lastOnlineTime
var moneyTemp = 1
var gameSecondsTemp = 1
var gameTimerTemp = 1
function offlineGain () {
    timeDifference = currentOnlineTime - lastOnlineTime
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
    // console.log(` `)
    // console.log(moneyTemp + " temp")
    // console.log(gainPerSecondSave + " gain")

    // console.log(timeDifference + ` timedif`)
    //     console.log( + " - gain * autosavertimer")
}
//если ты находишься 10 секунд в игре затем ливаешь и перезаходишь то ты получаешь ещё 10 секунд получения монет. 


function offlineGainTime() {
    convertingTime()
    whatsYourCurrentTime()
    // console.log(gameTimer + " gameT")
    // console.log(gameSeconds + " gamesec")
    // console.log(timeDifference + " разница")
    // console.log( " ")
}

document.addEventListener("visibilitychange", function() {
    if (!document.hidden) { // проверяем, что страница стала видимой
            clearInterval(autosaver)
            clearInterval(getCoinPerSecond)
            clearInterval(autosaver)
            clearInterval(getCoinPerSecond)
    offlineGain();
    autoSaverTimer = 0
    autosaver = setInterval(autoSaveThis, 30000); //таймер
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
    clearInterval(autoSaveTime)
    autoSaveTime = setInterval(autoSaveTimer, 1000)
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
    saveGame()
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) { // проверяем, что страница стала невидимой
    clearInterval(autosaver)
    clearInterval(getCoinPerSecond)
    clearInterval(autosaver)
    clearInterval(getCoinPerSecond)
    clearInterval(autosaver)
    clearInterval(getCoinPerSecond)

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

    }
});

