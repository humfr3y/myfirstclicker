let money = 10, total = 10, moneyTemp = 1, clicksPerSecond = 0, clickCount = 0, gain = 1, gainPerClick = 1, gainPerSecond = 0, getCoinPerSecond;
let notCapped, capped;
let lastOnlineTime = 0, currentOnlineTime = 0;
let autoSaving = 'yes', isMuted = 'no'; 
let totalCoins = document.getElementById('totalCoins');
let link = document.getElementById('link');
let backdrop1 = document.getElementById("myPopupBackdrop1")
let popup = document.getElementById("changelogWindow");
let popup2 = document.getElementById("gameLoreWindow");
let popup3 = document.getElementById("gameHelpWindow");
let openedWindow = document.getElementById("window");
let offlinePopup = document.getElementById("offlineGainWindow");
let progress = document.getElementById("progressbar")
let notiString = '', notiColor, notiWidth;
let coinGains = document.getElementById("coinGain");
let shardGains = document.getElementById("shardsClick");
let timeDifference = currentOnlineTime - lastOnlineTime
let superCoins = 0, totalSuperCoins = 0, superCoinsTemp;
let optionValue = "option1"
let overdriveType1Activate, overdriveType1Bool = false, overdriveType1Price = 0
let codeIsFalse, codeIsTrue, codeIsUsed, code1Reward, code2Reward;
let code1Check = false, code2Check = false
let code, codeReward
let superCoinsTemp2 = 0
let gainPerClickTitle, gainPerSecondTitle, gainTitle, superCoinsChanceTitle, crystalsMultiplierTitle
let multIdentifier = 0
let resetTitle, NaNedTitle
let dailyIsTrue, dailyIsFalse
let dailySeconds = 0, dailyMinutes = 0, dailyHours = 0, dailyTimer = 0;
let gameHours = 0, gameMinutes = 0, gameSeconds = 0, gameTimer = 0, gameDays = 0, gameSecondsTemp = 1, gameTimerTemp = 1
let prestigeSeconds = 0, prestigeMinutes = 0, prestigeHours = 0, prestigeDays = 0, prestigeTimer = 0, prestigeSecondsTemp = 1, prestigeTimerTemp = 1, umultiplierTimer = 0, upowerTimer = 0
let fastestPrestigeSeconds = 0, fastestPrestigeMinutes = 0, fastestPrestigeHours = 0, fastestPrestigeDays = 0, fastestPrestigeTimer = 1e69
let fastestPrestigeDaysText, fastestPrestigeHoursText, fastestPrestigeMinutesText
let offlineCrystalsTemp = 0, offlineCrystalsGain
let didMaxBuy = false
let offlinePrestigesGain = '', offlinePrestigesTemp
let automationUpgradesArray = document.getElementsByClassName('automationUpgrade')
let coinsFromAutoPrestige = '', timeFromAutoPrestige = ''
let autoPrestigeTime = '', autoPrestigeCoins = ''
let whichPrestigeMode = 'time', prestigeConditionTime = 3600, prestigeConditionCoins = 1e15
let prestigeCountText = '', bulkBuyText = ''
let shards = 0, brokenCrystals = 0, brokenCrystalsTemp = 0, shardsPerClick = 0, shardsPerSecond = 0, shardsTemp = 0, shardsEffect = 0, offlineShardsTemp = 1
let shardChanceMinimum = 1, shardChanceMaximum = 50
let getShardsPerSecond
let offlineShardsGain = ''
let mutedAudio = false
let spirits = 0, spiritEffects = [1, 1, 1, 1]
let dayOfMonth = new Date().getDate(), currentMonth = new Date().getMonth() + 1;
let isSpiritualEvent = false
let progressBarTitles = ['Престиж: ', 'Испытания Монет: ']
let progressBarCurrencies = ['монеты']
const mediaQuery = window.matchMedia('screen and (max-width: 600px)');


function randomNumber (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min))
}

function addSecond() {
    gameTimer += 0.05
    gameSeconds += 0.05
    prestigeSeconds += 0.05
    prestigeTimer += 0.05
    umultiplierTimer += 0.05
    upowerTimer += 0.05
    prestigeSeconds = Math.max(0, prestigeSeconds)
    prestigeTimer = Math.max(0, prestigeTimer)
    convertingDailyTime()
    dailyTimer <= 0 ? dailyTimer = 0 : dailyTimer -= 0.05
    dailySeconds <= 0 ? dailySeconds = 0 : dailySeconds -= 0.05
    convertingTime(gameSeconds, gameMinutes, gameHours, gameDays, 'game');
    convertingTime(prestigeSeconds, prestigeMinutes, prestigeHours, prestigeDays, 'prestige');
    whatsYourCurrentTime2()
    whatsYourCurrentTime() 
}

setInterval(()=>{
    if (totalCrystals == 0) {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e15)*100, 100)  + "%"
        percent.innerHTML = progressBarTitles[0] + ": " + formatNumber2(money) + "/1e15 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e15), 100) + "%)"
    }
    else {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e30)*100, 100)  + "%"
        percent.innerHTML = progressBarTitles[1] + ": " + formatNumber2(money) + "/1e30 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e30), 100) + "%)"
    }
    if (mediaQuery.matches) {
        overdriveType1ProgressBarActive.style.width = (overdriveType1.percent*3) + "px"
        overdriveType1ProgressBar.style.width = (overdriveType1.percent*3) + "px"
    } else {
        overdriveType1ProgressBarActive.style.width = (overdriveType1.percent*8) + "px"
        overdriveType1ProgressBar.style.width = (overdriveType1.percent*8) + "px"
    }

    shardUnlock1.style.width = shardUnlockablePerSecond.percent + "%"
    shardUnlock2.style.width = shardUnlockableClick.percent + "%"
    shardUnlock3.style.width = shardUnlockableBuyables.percent + "%"
    shardUnlock4.style.width = shardUnlockableSingles.percent + "%"
    const shardUnlockableArray = [shardUnlockablePerSecond, shardUnlockableClick, shardUnlockableBuyables, shardUnlockableSingles]
    const shardUnlockableTextArray = ['shardsPerSecondText', 'shardsClick', 'shardBuyables', 'shardSingles']
    for (let i = 0; i < 4; i++) {
        if (shardUnlockableArray[i].percent == 100) {
            clearInterval(shardUnlockableArray[i].interval)
            window['shardUnlockableBase'+(i+1)].style.display = 'none'
            document.getElementById(shardUnlockableTextArray[i]).style.display = 'flex'
        }
        else  {
            window['shardUnlockableBase'+(i+1)].style.display = 'flex'
            document.getElementById(shardUnlockableTextArray[i]).style.display = 'none'
        }
    }
},50)
var overdriveType1ProgressBarBase = document.getElementById('overdriveType1ProgressBarBase')
var overdriveType1ProgressBar = document.getElementById('overdriveType1ProgressBar')
let overdriveType1ProgressBarActive = document.getElementById('overdriveType1ProgressBarActive')
let overdriveChange
overdriveType1ProgressBarBase.addEventListener("click", function() {
    overdriveType1Bool ? overdriveType1Bool = false : overdriveType1Bool = true
    if (overdriveType1Bool){
        overdriveChange = setInterval(()=> {
            overdriveType1ProgressBarActive.style.opacity == 1 ? overdriveType1ProgressBarActive.style.opacity = 0 :  overdriveType1ProgressBarActive.style.opacity = 1
        }, 500)
        overdriveType1Activate = setInterval(()=> {
            if (money >= overdriveType1.price){
                money -= overdriveType1.price;
                overdriveType1.percent += 0.033;
                overdriveType1.percent = Math.min(overdriveType1.percent, 100)
                overdriveType1.effect = 1+Math.pow(2, overdriveType1.percent/2.33)/8
                achRow1.completion[18] ? overdriveType1.effect *= 1.1 : overdriveType1.effect
                overdriveType1.price = 100+Math.pow(10, overdriveType1.percent)/20*2;
            }
        }, 50)
    }
    else {clearInterval(overdriveType1Activate)
    clearInterval(overdriveChange)
    overdriveType1ProgressBarActive.style.opacity = 0}
})

function fillTheProgressBar(shardUnlockable) {
    let subPerTick = shardUnlockable.price/500
    shardUnlockable.bool ? shardUnlockable.bool = false : shardUnlockable.bool = true
    if (shardUnlockable.bool){
        shardUnlockable.interval = setInterval(()=> {
            if (shards >= subPerTick){
                shards -= subPerTick
                shardUnlockable.consumedShards += subPerTick
                shardUnlockable.percent += 0.2;
                shardUnlockable.percent = Math.min(shardUnlockable.percent, 100)
            }
        }, 50)
    }
    else clearInterval(shardUnlockable.interval)
}

shardUnlockableBase1.addEventListener("click", () => {
    fillTheProgressBar(shardUnlockablePerSecond)
})

shardUnlockableBase2.addEventListener("click", () => {
    fillTheProgressBar(shardUnlockableClick)
})

shardUnlockableBase3.addEventListener("click", () => {
    fillTheProgressBar(shardUnlockableBuyables)
})

shardUnlockableBase4.addEventListener("click", () => {
    fillTheProgressBar(shardUnlockableSingles)
})


function convertingTime(seconds, minutes, hours, days, type) {
    seconds = Math.round(seconds)
    let minutesTemp, hoursTemp, daysTemp
    const boolGame = (type == 'game'), boolPrestige = (type == 'prestige') 
    if (seconds >= 60) {
            minutesTemp = Math.floor(seconds / 60)
            seconds = Math.round(((seconds / 60) - minutesTemp) * 60)
            minutes += minutesTemp
            if (boolGame) {
                gameSeconds = seconds
                gameMinutes = minutes
            }
            else if (boolPrestige) {
                prestigeSeconds = seconds
                prestigeMinutes = minutes
            }
        }
    if (minutes >= 60) {
            hoursTemp = Math.floor(minutes / 60)
            minutes = Math.round(((minutes / 60) - hoursTemp) * 60)
            hours += hoursTemp
            if (boolGame) {
                gameMinutes = minutes
                gameHours = hours
            }
            else if (boolPrestige) {
                prestigeMinutes = minutes
                prestigeHours = hours
            }
            }
    if (hours >= 24) {
            daysTemp = Math.floor(hours / 24) //100/24 = 4
            hours = Math.round(((hours / 24) - daysTemp) * 24) //4.16-4=0.16*24=4
            days += daysTemp // 0 + 4 = 4
            if (boolGame) {
                gameHours = hours
                gameDays= days
            }
            else if (boolPrestige) {
                prestigeHours = hours
                prestigeDays = days
            }
            }
}

function convertingDailyTime() {
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

function limits(variable, min, max) {
    if (variable >= min && variable <= max) {
        return true
    }
    else return false
}

function getCoinPerSec() {
    overdriveType1.effect = 1+Math.pow(2, overdriveType1.percent/2.5)/15
    randomNumber(0, (2000/(1+fourthShopBuyableEffect)/prestigeSinglesEffects[2][0]/spiritEffects[1])) == 0 ? (superCoins++, totalSuperCoins++) : superCoins;
    superCoins = Math.round(superCoins)
    umultiplier = Math.pow(baseUmult, umultipliercount)
    upower = 1 + baseUpow*upowercount
    const gainMultiplierArray = [1+thirdShopBuyableEffect, overdriveType1.effect, achievementBonus, seventhSingleEffect, umultiplier, prestigeSinglesEffects[8], prestigeSinglesEffects[9], 1+shardsEffect, spiritEffects[0]]
    const gainPerSecondArray = [1+secondShopBuyableEffect, sixthSingleEffect, gain]
    gain = 1+thirdSingle.baseEffect
    for (let i = 0; i < gainMultiplierArray.length; i++) {
        gain *= gainMultiplierArray[i]
    }
    achRow1.completion[17] ? gain *= 4 : gain
    gain = Math.pow(gain, upower)
    gain = Math.pow(gain, prestigeSinglesEffects[1])

    gain = softCap(gain, 1e15, 0.5)
    gainPerSecond = firstBuyableEffect
    for (let i = 0; i < gainPerSecondArray.length; i++) {
        gainPerSecond *= gainPerSecondArray[i]
    }
    fourthBuyable.amount >= 1 ? gainPerSecond *= fourthBuyableEffect : gainPerSecond = gainPerSecond
    achRow1.completion[4] ? gainPerSecond *= (1+0.0001*clickCount) : gainPerSecond = gainPerSecond
    firstSingle.amount == 1 ? gainPerSecond *= firstSingleEffect : gainPerSecond = gainPerSecond
    gainPerSecond = softCap(gainPerSecond, 1e13, prestigeSinglesEffects[10])
    gainPerSecond /= 20.0

    gainPerClick = 1
    gainPerClick *= Math.pow(2, thirdBuyable.baseEffect) 
    gainPerClick *= 1+firstShopBuyableEffect
    eighthSingle.amount == 1 ? gainPerClick *= eighthSingleEffect : gainPerClick = gainPerClick
    secondSingle.amount == 1 ? gainPerClick *= midasFormula : gainPerClick = gainPerClick
    gainPerClick *= gain
    gainPerClick = Math.pow(gainPerClick, fifthBuyableEffect)
    gainPerClick = softCap(gainPerClick, 1e13, prestigeSinglesEffects[10])
    money = money+gainPerSecond;
    total = total+gainPerSecond;
    umultiplierCost = 100 + (50 * umultipliercount)
    upowerCost = 250 + (100 * upowercount)
    umultiplierBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-50))/50) //(SI's - prev umulti cost) / scaling -> floored number
    if (achRow1.completion[13]) {
        upowerCost = upowerCost - (10 * (1+upowercount))
        upowerBulkCost = Math.floor((firstBuyable.amount-(upowerCost-90))/90)
    }
    else upowerBulkCost = Math.floor((firstBuyable.amount-(upowerCost-100))/100)
    if (achRow1.completion[9]) doPrestige.style.display = 'block'
    else doPrestige.style.display = 'none'
    if (totalCrystals >= 1) {
        crystalCount.style.display = 'block'
        prestigeSection.style.display = 'block'
        prestigeSelect.style.display = 'block'
        totalPrestigesStats.style.display = 'block'
        offlinePrestigeFarm.style.display = 'block'
        prestigeHelpDiv.style.display = 'block'
    }
    else {
        crystalCount.style.display = 'none'
        prestigeSection.style.display = 'none'
        prestigeSelect.style.display = 'none'
        totalPrestigesStats.style.display = 'none'
        offlinePrestigeFarm.style.display = 'none'
        prestigeHelpDiv.style.display = 'none'
    }
}
let superCoinChance, spiritChance

function getCoin() {
    if (clicksPerSecond < 10) {
        clickCount++
        superCoinChance = randomNumber(0, (100/(1+fourthShopBuyableEffect)/prestigeSinglesEffects[2][0]/spiritEffects[1]))
        if (superCoinChance == 0) {
        superCoins++, totalSuperCoins++
        }
        spiritChance = randomNumber(0, 100)
        spiritChance == 0 ? spirits++ : spirits
        gainPerClick = 1
        gainPerClick *= Math.pow(2, thirdBuyable.baseEffect) 
        gainPerClick *= 1+firstShopBuyableEffect
        eighthSingle.amount == 1 ? gainPerClick *= eighthSingleEffect : gainPerClick = gainPerClick
        secondSingle.amount == 1 ? gainPerClick *= midasFormula : gainPerClick = gainPerClick
        gainPerClick *= gain
        gainPerClick = Math.pow(gainPerClick, fifthBuyableEffect)
        gainPerClick = softCap(gainPerClick, 1e13, prestigeSinglesEffects[10])
        clicksPerSecond++
        coinGains.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
                event.preventDefault();
            }})
        money = money+gainPerClick;
        total = total+gainPerClick;
    }
}

setInterval(() => {
    clicksPerSecond = 0
}, 1000);

function getShardPerClick() {
    if (clicksPerSecond < 10 && shardUnlockableClick.percent == 100) {
        clickCount++
        clicksPerSecond++
        shardGains.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                    event.preventDefault();
                }})
        shardsPerClick = 1
        shardsPerClick *= firstShardBuyableEffect
        shards += shardsPerClick
    }
}

function getShardPerSec() {
    if (shardUnlockablePerSecond.percent == 100) {
        shardsPerSecond = 1
        shardsPerSecond *= secondShardBuyableEffect
        shardsPerSecond *= spiritEffects[3]
        shardsPerSecond /= 20
        shards += shardsPerSecond
    }
    shardsEffect = shards/100
    shardsEffect = Math.pow(shardsEffect, fourthShardSingleEffect)
    shardsEffect = softCap(shardsEffect, 1e7, 0.3)
    
    achRow1.completion[19] ? shardsEffect *= 1+prestigeCount/100 : shardsEffect
    shardChanceMinimum = thirdShardBuyableEffect[0]
    shardChanceMaximum = 50*thirdShardBuyableEffect[1]
}

function selectTab(argument, isFlex) {
    const tabsToHide = ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab']
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
    const prestigeTabsToHide = ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab']
    let tabsToHide
    if (mainTab == 'settings') tabsToHide = settingsTabsToHide
    else if (mainTab == 'clicker') tabsToHide = clickerTabsToHide
    else if (mainTab == 'info') tabsToHide = infoTabsToHide
    else if (mainTab == 'prestige') tabsToHide = prestigeTabsToHide
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
    const tabsToHide = ['gainPerClickStats', 'gainPerSecondStats', 'wholeGainStats', 'superCoinsChanceStats', 'crystalsMultiplierStats', 'gainPerClickGraphic', 'gainPerSecondGraphic', 'gainGraphic', 'superCoinsChanceGraphic', 'crystalsMultiplierGraphic']
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
    else if (multId == 3) {superCoinsChanceStats.style.display = 'block'; superCoinsChanceGraphic.style.display = 'block'; multBreakdownTitle.innerHTML = superCoinsChanceTitle}
    else if (multId == 4) {crystalsMultiplierStats.style.display = 'block'; crystalsMultiplierGraphic.style.display = 'block'; multBreakdownTitle.innerHTML = crystalsMultiplierTitle}
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
function checkPrestigeBuyableDisabledUpgrade (x, y) {
    crystals >= x.price ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkPrestigeSingleDisabledUpgrade (x, y, z) {
    if ((crystals >= x.price || x.amount == 1) && (z == 1)) {
    document.getElementById(y).disabled = false
    }
    else document.getElementById(y).disabled = true
}
function checkShardBuyableDisabledUpgrade (x, y) {
    shards >= x.price ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkShardSingleDisabledUpgrade (x, y) {
    shards >= x.price || x.amount == 1 ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function disabledUpgrades(){
    const buyableUpgrades = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable];
    const singleUpgrades = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle];
    const prestigeBuyableUpgrades = [firstPrestigeBuyable, secondPrestigeBuyable];
    const prestigeSingleUpgrades = [
        [firstPrestigeSingle, secondPrestigeSingle, thirdPrestigeSingle, fourthPrestigeSingle],
        [fifthPrestigeSingle, sixthPrestigeSingle, seventhPrestigeSingle, eighthPrestigeSingle],
        [ninthPrestigeSingle, tenthPrestigeSingle, eleventhPrestigeSingle, twelfthPrestigeSingle],
        [thirteenthPrestigeSingle, fourteenthPrestigeSingle, fifteenthPrestigeSingle, sixteenthPrestigeSingle]];
    const shardsBuyableUpgrades = [firstShardBuyable, secondShardBuyable, thirdShardBuyable];
    const shardsSingleUpgrades = [firstShardSingle, secondShardSingle, thirdShardSingle, fourthShardSingle, fifthShardSingle, sixthShardSingle];
    for (let i = 0; i < buyableUpgrades.length; i++) {
        checkBuyableDisabledUpgrade(buyableUpgrades[i], 'buyableU' + (i + 1));
    }
    for (let i = 0; i < singleUpgrades.length; i++) {
        checkSingleDisabledUpgrade(singleUpgrades[i], 'singleU' + (i + 1));
    }
    for (let i = 0; i < prestigeBuyableUpgrades.length; i++) {
    checkPrestigeBuyableDisabledUpgrade(prestigeBuyableUpgrades[i], 'pBuyableU' + (i + 1));
    }
    for (let i = 0; i < shardsBuyableUpgrades.length; i++) {
        checkShardBuyableDisabledUpgrade(shardsBuyableUpgrades[i], 'shBuyableU' + (i + 1));
    }
    for (let i = 0; i < shardsSingleUpgrades.length; i++) {
        checkShardSingleDisabledUpgrade(shardsSingleUpgrades[i], 'shSingleU' + (i + 1));
        }
    let j = 0, m = 0
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 4; k++) {
            let variable = {
                amount: 1
            }
            if (k > 0) variable = prestigeSingleUpgrades[i][m]
            checkPrestigeSingleDisabledUpgrade(prestigeSingleUpgrades[i][k], 'pSingleU' + (j + 1), variable.amount);
            if (k > 0) m++
            j++
        }
        m = 0
    }
    checkShopBuyableDisabledUpgrade(firstShopBuyable, 'shopBuyableU1', 100)
    checkShopBuyableDisabledUpgrade(secondShopBuyable, 'shopBuyableU2', 100)
    checkShopBuyableDisabledUpgrade(thirdShopBuyable, 'shopBuyableU3', 100)
    checkShopBuyableDisabledUpgrade(fourthShopBuyable, 'shopBuyableU4', 100)
    checkShopSingleDisabledUpgrade(firstShopSingle, 'shopSingleU1')
    firstBuyable.amount >= umultiplierCost ? document.getElementById('umultiplierBoost').disabled = false : document.getElementById('umultiplierBoost').disabled = true;
    (firstBuyable.amount >= upowerCost) && (umultipliercount >= 4) ? document.getElementById('upowerBoost').disabled = false : document.getElementById('upowerBoost').disabled = true
    }



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
    const descsToHide = ['confirmationButtons', 'whichCode', 'dailyDesc', 'breakCrystal', 'brokeCrystals', 'falseBrokeCrystals']
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
    else if (arg == 'break') {breakCrystal.style.display = "flex"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'submit') {brokeCrystals.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'falseSubmit') {falseBrokeCrystals.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
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

    myMessage.style.left = (x - 20) + "px";
    myMessage.style.top = (y - 30) + "px";

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

shardGains.addEventListener("click", function(event) {
    {
        const shardCountPerClick = document.createElement('div');
    
        var x = event.clientX;
        var y = event.clientY;
    
        shardCountPerClick.style.left = (x - 20) + "px";
        shardCountPerClick.style.top = (y - 20) + "px";
    
        shardCountPerClick.classList.add('shardCountPerClick');
        shardCountPerClick.innerHTML = ("+" + formatNumber2(shardsPerClick));
        document.body.appendChild(shardCountPerClick);
    
        setTimeout(() => {
            shardCountPerClick.classList.add('show');
            setTimeout(() => {
            shardCountPerClick.classList.remove('show');
            shardCountPerClick.classList.add('hide')
            setTimeout(() => {
                shardCountPerClick.remove();
              }, 500); // подождать завершения анимации исчезновения
            }, 0); // показывать уведомление 5 секунд
        },0 );
    }})

    coinGains.addEventListener("click", function(event) {
            if (superCoinChance == 0) {
                const superCoinText = document.createElement('div');
        
                var x = event.clientX;
                var y = event.clientY;
            
                superCoinText.style.left = (x - 20) + "px";
                superCoinText.style.top = (y - 10) + "px";
            
                superCoinText.classList.add('superCoinText');
                superCoinText.innerHTML = ("+1");
                document.body.appendChild(superCoinText);
            
                setTimeout(() => {
                    superCoinText.classList.add('show');
                    setTimeout(() => {
                        superCoinText.classList.remove('show');
                        superCoinText.classList.add('hide')
                    setTimeout(() => {
                        superCoinText.remove();
                      }, 500); // подождать завершения анимации исчезновения
                    }, 0); // показывать уведомление 5 секунд
                },0 );
            }})

    coinGains.addEventListener("click", function(event) {
        if (spiritChance == 0 && isSpiritualEvent) {
            const spiritText = document.createElement('div');
            
            var x = event.clientX;
            var y = event.clientY;
                
            spiritText.style.left = (x - 20) + "px";
            spiritText.style.top = (y) + "px";
                
            spiritText.classList.add('spiritText');
            spiritText.innerHTML = ("+1");
            document.body.appendChild(spiritText);
                
                setTimeout(() => {
                    spiritText.classList.add('show');
                    setTimeout(() => {
                        spiritText.classList.remove('show');
                        spiritText.classList.add('hide')
                    setTimeout(() => {
                        spiritText.remove();
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
function formatNumber21(number) {
    if (number < 1000000) {
        return number.toFixed(0);
    } else {
        return number.toExponential(0).replace("+","");
    }
}
function whatsYourCurrentTime () {
    lastOnlineTime = new Date()
}

function whatsYourCurrentTime2 () {
    currentOnlineTime = new Date()
}

function offlineGain() {
    timeDifference = (currentOnlineTime - lastOnlineTime)/1000
    timeDifference = Math.min(1000000, timeDifference)
    checkUpgradesText()
    prestigeSingleEffect()

    if (timeDifference >= (1000/(1+(fourthShopBuyableEffect)/prestigeSinglesEffects[2][1]/spiritEffects[1]))) {
        superCoinsTemp = timeDifference/(1000/(1+fourthShopBuyableEffect)/prestigeSinglesEffects[2][1]/spiritEffects[1])
    }
    else superCoinsTemp = 0
    if (achRow1.completion[11]) {
        offlineCrystalsTemp = timeDifference/(43200/secondPrestigeBuyableEffect)
        achRow1.completion[17] ? offlineCrystalsTemp *= 4 : offlineCrystalsTemp
        offlineCrystalsTemp *= firstShardSingleEffect
        offlineCrystalsTemp *= firstPrestigeBuyableEffect
        crystals += offlineCrystalsTemp
        }
    if (prestigeMilestonesEffects[15]){
        offlinePrestigesTemp = (timeDifference/60)*(fastestNoMaxBuyPrestiges/20)
        prestigeCount += offlinePrestigesTemp
        }
    if (shardUnlockablePerSecond.percent == 100) {
        getShardPerSec()
        offlineShardsTemp = shardsPerSecond * 20 * timeDifference
        shards += offlineShardsTemp
        }

    dailyTimer -= timeDifference
    dailyMinutes = 0
    dailyHours = 0
    dailySeconds = dailyTimer
    convertingDailyTime()
    superCoins += superCoinsTemp
    totalSuperCoins += superCoinsTemp
    setTimeout(() => {
        getCoinPerSec()
        moneyTemp = gainPerSecond * 20 * timeDifference
        moneyTemp = Math.max(0, moneyTemp)  
        money += moneyTemp
        total += moneyTemp
    }, 300);

    gameSecondsTemp = timeDifference
    gameTimerTemp = timeDifference
    prestigeSecondsTemp = timeDifference
    prestigeTimerTemp = timeDifference
    gameSeconds += gameSecondsTemp
    gameTimer += gameTimerTemp
    prestigeSeconds += prestigeSecondsTemp
    prestigeTimer += prestigeTimerTemp
    umultiplierTimer += timeDifference
    upowerTimer += timeDifference
}
//если ты находишься 10 секунд в игре затем ливаешь и перезаходишь то ты получаешь ещё 10 секунд получения монет. 


function offlineGainTime() {
    convertingTime(gameSeconds, gameMinutes, gameHours, gameDays, 'game')
    convertingTime(prestigeSeconds, prestigeMinutes, prestigeHours, prestigeDays, 'prestige')
    whatsYourCurrentTime()
}

document.addEventListener("visibilitychange", function() {
    if (!document.hidden) { // проверяем, что страница стала видимой
    clearInterval(everythingInterval)
    clearInterval(autosaver)
    clearInterval(autoSaveTime)
    clearInterval(getCoinPerSecond)
    offlineGain();
    autoSaverTimer = 0
    autosaver = setInterval(autoSaveThis, 30000); //таймер
    everythingInterval = setInterval(updateTick, 50)
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
    saveGame()
    if (optionValue == 'option7' && !mutedAudio) {
        audio.play()
    }
    }
});

document.addEventListener("visibilitychange", function() {
    if (document.hidden) { // проверяем, что страница стала невидимой
        clearInterval(everythingInterval)
        clearInterval(autosaver)
        clearInterval(autoSaveTime)
        clearInterval(getCoinPerSecond)
        if (optionValue == 'option7' && !mutedAudio) {
            audio.pause()
        }
    }
});

function playSong1() {
    audio.play()

    audio.addEventListener("ended", function() {
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
        if (!mutedAudio) {
            playSong1();
        }
        else {
            audio.currentTime = 0
            audio.pause()
        }
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
        audio.currentTime = 0
        audio.pause()
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
        if (!mutedAudio) {
            setTimeout(playSong1,3000);
        }
        else {
            audio.currentTime = 0
            audio.pause()
        }
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
        audio.currentTime = 0
        audio.pause()
    }
    body.style.fontFamily = font
    select.style.fontFamily = font
    label.style.fontFamily = font
    for (var i = 0; i < buttons.length; i++){
        buttons[i].style.fontFamily = font
    }
}

function muteTheAudio() {
    mutedAudio ? (mutedAudio = false, isMuted = 'no') : (mutedAudio = true, isMuted = 'yes')
    if (optionValue == 'option7' && !mutedAudio) {
        setTimeout(playSong1,1000);
    }
    else {
        audio.currentTime = 0
        audio.pause()
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


function readCode () {
    if (code == 'digitalgod'){
        if (code1Check == false) {
            code1Check = true
            superCoins += 69
            totalSuperCoins += 69
            codeReward = code1Reward
            whichCode.innerHTML = codeIsTrue
        } 
        else {
        whichCode.innerHTML = codeIsUsed
        }
    }
    else if (code == 'shirakamifubuki' && isSpiritualEvent) {
        if (code2Check == false) {
            code2Check = true
            spirits += 55
            codeReward = code2Reward
            whichCode.innerHTML = codeIsTrue
        }
        else {
        whichCode.innerHTML = codeIsUsed
        }
    }
    else whichCode.innerHTML = codeIsFalse
    openWindow('code', true)
}

function getDaily() {
    if (dailySeconds == 0 && dailyMinutes == 0 && dailyHours == 0){
        superCoins += superCoinsTemp2
        totalSuperCoins += superCoinsTemp2
        dailyTimer = 86399
        dailySeconds = dailyTimer
        dailyDesc.innerHTML = dailyIsTrue
        convertingDailyTime()
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

gmailButton.addEventListener('click', function() {
    window.open('mailto:madkotodax@gmail.com', '_blank');
});

discordButton.addEventListener('click', function() {
    window.open('https://discord.gg/jdnnX2Vq5Q', '_blank');
});

telegramChatButton.addEventListener('click', function() {
    window.open('https://t.me/+zy5z7obW4cBjMTA6', '_blank');
});

telegramChannelButton.addEventListener('click', function() {
    window.open('https://t.me/+pqju4vzGrrY2NzI6', '_blank');
});


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