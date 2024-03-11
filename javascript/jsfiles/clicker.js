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
let codeIsFalse, codeIsTrue, codeIsUsed;
let codeChecks = [false, false, false, false, false]
let codeRewards = ['', '', '', '', '']
let codes = ['digitalgod', 'shirakamifubuki', 'suisei', 'koyori', 'manilovefauna']
let code, codeReward
let superCoinsTemp2 = 0
let gainPerClickTitle, gainPerSecondTitle, gainTitle, superCoinsChanceTitle, crystalsMultiplierTitle
let multIdentifier = 0
let resetTitle, NaNedTitle
let dailyIsTrue, dailyIsFalse
let dailySeconds = 0, dailyMinutes = 0, dailyHours = 0, dailyTimer = 0;
let gameHours = 0, gameMinutes = 0, gameSeconds = 0, gameTimer = 0, gameDays = 0, gameSecondsTemp = 1, gameTimerTemp = 1, realSecondsTemp = 1, realTimerTemp = 1
let prestigeSeconds = 0, prestigeMinutes = 0, prestigeHours = 0, prestigeDays = 0, prestigeTimer = 0, prestigeSecondsTemp = 1, prestigeTimerTemp = 1, umultiplierTimer = 0, upowerTimer = 0
let realTimer = 0, realSeconds = 0, realMinutes = 0, realHours = 0, realDays = 0
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
let isSpiritualEvent = false, isTriplePowerEvent = false
let progressBarTitles = ['Престиж: ', 'Испытания Монет: ']
let progressBarCurrencies = ['монеты']
const mediaQuery = window.matchMedia('screen and (max-width: 600px)');
let challengeActivated = [false, false, false, false, false, false, false, false, false, false, false, false]
let challengeActivate = false
let virusCoins = 1
let challengeStartedID = 0
let challengeCompleted = [false, false, false, false, false, false, false, false, false, false, false, false]
let challengesCompleted = 0
let itemNames = ['Бесплатный У-множитель', 'Бесплатный У-силитель', 'Ускорение Времени', 'Ускорение Времени +']
let useNotify, notUseNotify, notUseNotify2, notUseNotify3
let reqDivider = 1
let progressBarGoals = [false, false, false]


function randomNumber (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min))
}

function addSecond() {
    gameTimer += 0.05
    realTimer += 0.05
    gameSeconds += 0.05
    realSeconds += 0.05
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
    convertingTime(realSeconds, realMinutes, realHours, realDays, 'real');
    whatsYourCurrentTime2()
    whatsYourCurrentTime() 
}

setInterval(()=>{
    if (!progressBarGoals[0] || challengeActivate) {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e15)*100, 100)  + "%"
        percent.innerHTML = progressBarTitles[0] + ": " + formatNumber2(money) + "/1e15 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e15), 100) + "%)"
    }
    else if (!progressBarGoals[1]) {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e25)*100, 100)  + "%"
        percent.innerHTML = progressBarTitles[1] + ": " + formatNumber2(money) + "/1e25 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e25), 100) + "%)"
    }
    else if (!progressBarGoals[2]) {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e50)*100, 100)  + "%"
        percent.innerHTML = progressBarTitles[2] + ": " + formatNumber2(money) + "/1e50 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e50), 100) + "%)"
    }
    else {
        progress.style.width = Math.min(Math.log(money)/Math.log(1e308)*100, 100)  + "%"
        percent.innerHTML = "GG" + ": " + formatNumber2(money) + "/1.79e308 " + progressBarCurrencies[0] + " (" + Math.min(findRatio(money, 1e308), 100) + "%)"
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
                let sub = money/100
                overdriveType1.consumed += sub
                money -= sub
                overdriveType1.percent = Math.log10(overdriveType1.consumed)
                overdriveType1.percent = Math.min(overdriveType1.percent, 100)
                overdriveType1.effect = (1+Math.pow(2, overdriveType1.percent/2.5)/9)-0.11
                achRow1.completion[18] ? overdriveType1.effect *= 1.1 : overdriveType1.effect
                overdriveType1.price = 1000+Math.pow(10, overdriveType1.percent)/20*2;
            }
        }, 50)
    }
    else {clearInterval(overdriveType1Activate)
    clearInterval(overdriveChange)
    overdriveType1ProgressBarActive.style.opacity = 0}
})

function fillTheProgressBar(shardUnlockable) {
    let subPerTick = shardUnlockable.price/500
        shardUnlockable.interval = setInterval(()=> {
            if (shards >= subPerTick){
                shards -= subPerTick*(1+shardUnlockable.percent/20)
                shardUnlockable.consumedShards += subPerTick*(1+shardUnlockable.percent/20)
                shardUnlockable.percent += 0.2*(1+shardUnlockable.percent/20);
                shardUnlockable.percent = Math.min(shardUnlockable.percent, 100)
                if (shardUnlockable.percent == 100) {
                    shards += shardUnlockable.consumedShards - shardUnlockable.price
                }
            }
        }, 50)
}

shardUnlockableBase1.addEventListener("mousedown", () => {
    fillTheProgressBar(shardUnlockablePerSecond)
})

shardUnlockableBase1.addEventListener("mouseup", () => {
    clearInterval(shardUnlockablePerSecond.interval)
})

shardUnlockableBase1.addEventListener("mouseleave", () => {
    clearInterval(shardUnlockablePerSecond.interval)
})

shardUnlockableBase2.addEventListener("mousedown", () => {
    fillTheProgressBar(shardUnlockableClick)
})

shardUnlockableBase2.addEventListener("mouseup", () => {
    clearInterval(shardUnlockableClick.interval)
})

shardUnlockableBase2.addEventListener("mouseleave", () => {
    clearInterval(shardUnlockableClick.interval)
})

shardUnlockableBase3.addEventListener("mousedown", () => {
    fillTheProgressBar(shardUnlockableBuyables)
})

shardUnlockableBase3.addEventListener("mouseup", () => {
    clearInterval(shardUnlockableBuyables.interval)
})

shardUnlockableBase3.addEventListener("mouseleave", () => {
    clearInterval(shardUnlockableBuyables.interval)
})

shardUnlockableBase4.addEventListener("mousedown", () => {
    fillTheProgressBar(shardUnlockableSingles)
})

shardUnlockableBase4.addEventListener("mouseup", () => {
    clearInterval(shardUnlockableSingles.interval)
})

shardUnlockableBase4.addEventListener("mouseleave", () => {
    clearInterval(shardUnlockableSingles.interval)
})


function convertingTime(seconds, minutes, hours, days, type) {
    seconds = Math.round(seconds)
    let minutesTemp, hoursTemp, daysTemp
    const boolGame = (type == 'game'), boolPrestige = (type == 'prestige'), boolReal = (type == 'real')
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
            else if (boolReal) {
                realSeconds = seconds
                realMinutes = minutes
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
            else if (boolReal) {
                realHours = hours
                realMinutes = minutes
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
            else if (boolReal) {
                realHours = hours
                realDays = days
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
    !challengeActivate && challengeCompleted[0] ? gain = Math.pow(gain, 1.1) : gain

    gain = softCap(gain, 1e15, 0.5)

    gainPerSecond = firstBuyableEffect
    for (let i = 0; i < gainPerSecondArray.length; i++) {
        gainPerSecond *= gainPerSecondArray[i]
    }
    fourthBuyable.amount >= 1 ? gainPerSecond *= fourthBuyableEffect : gainPerSecond
    achRow1.completion[4] ? gainPerSecond *= (1+0.0001*clickCount) : gainPerSecond
    firstSingle.amount == 1 ? gainPerSecond *= firstSingleEffect : gainPerSecond
    !challengeActivate && challengeCompleted[7] ? gainPerSecond *= prestigeTimer : gainPerSecond
    !challengeActivate && challengeCompleted[2] ? gainPerSecond = Math.pow(gainPerSecond, 1+(Math.log(prestigeCount)/111)) : gainPerSecond

    if (challengeActivate) {
        challengeActivated[3] ? gainPerSecond = Math.sqrt(gainPerSecond) : gainPerSecond
        if (challengeActivated[6]){
            gainPerSecond = Math.pow(gainPerSecond, 1-amountsOfUpgrades/50)
            if (amountsOfUpgrades > 50) {
                gainPerSecond = 0
            }
        }
        challengeActivated[7] ? virusCoins *= 1.065 : virusCoins = 1
        virusCoins >= 1e100 ? virusCoins = 1e100 : virusCoins
        
        
        if (challengeActivated[11]) {
            gainPerSecond = Math.pow(gainPerSecond, 0.01)
            gainPerSecond = gainPerSecond * umultiplier
            gainPerSecond = Math.pow(gainPerSecond, upower)
        }
    }

    gainPerSecond /= virusCoins

    if (challengeActivated[8]) {
        gainPerSecond = softCap(gainPerSecond, 1e8, prestigeSinglesEffects[10][1])
        gainPerSecond = softCap(gainPerSecond, 1e8, prestigeSinglesEffects[10][1])
    }
    else {
        if (!challengeActivate && challengeCompleted[8]) gainPerSecond = softCap(gainPerSecond, 1e13*Math.pow(totalSuperCoins, 1.2), prestigeSinglesEffects[10][1]) 
        else gainPerSecond = softCap(gainPerSecond, 1e13, prestigeSinglesEffects[10][1])
    }

    getCoinPerClick()
    gainPerSecond /= 20.0

    challengeActivated[2] ? gainPerSecond = 0 : gainPerSecond


    money = money+gainPerSecond;
    total = total+gainPerSecond;

    if (money >= 1e25) progressBarGoals[1] = true
    if (money >= 1e50) progressBarGoals[2] = true

    if (challengeActivate && money >= 1e15) {
        money = 1e15
    }
    if (!challengeActivate && challengeCompleted[11]) {
        umultipliercount >= 20 ? umultiplierCost = (100 + (40 * umultipliercount))*(1+((umultipliercount-19)/50)) : umultiplierCost = 100 + (40 * umultipliercount)
        upowercount >= 10 ? upowerCost = (250 + (80 * upowercount))*(1+((upowercount-9)/15)) : upowerCost = 250 + (80 * upowercount)
        
    }
    else  {
        umultipliercount >= 20 ? umultiplierCost = (100 + (50 * umultipliercount)) * (1+((umultipliercount-19)/50)) : umultiplierCost = 100 + (50 * umultipliercount)
        upowercount >= 10 ? upowerCost = (250 + (100 * upowercount)) * (1+((upowercount-9)/15)) : upowerCost = 250 + (100 * upowercount)
    }
    if (achRow1.completion[13]) {
        upowerCost = upowerCost - (10 * (1+upowercount))
    }
    
    if (challengeActivated[11]) {
        umultiplierCost = 9 + Math.pow((5 * umultipliercount), umultipliercount/11)
        upowerCost = 24+ Math.pow((10 * upowercount), upowercount/20)
    }
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
    if (progressBarGoals[1]) {
        challengeHelpDiv.style.display = 'block'
        challengeSelect.style.display = 'block'
    }
}
let superCoinChance, spiritChance

function getCoin() {
    if (clicksPerSecond < 10) {
        clickCount++; prestigeClicks++; blueCoin.currency++;
        superCoinChance = randomNumber(0, (100/(1+fourthShopBuyableEffect)/prestigeSinglesEffects[2][0]/spiritEffects[1]/(1+blueCoin.effect)))
        if (superCoinChance == 0) {
        superCoins++, totalSuperCoins++
        }
        // spiritChance = randomNumber(0, 80)
        // spiritChance == 0 ? spirits++ : spirits
        getCoinPerClick();
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

function getCoinPerClick() {
    gainPerClick = 1;
    gainPerClick *= Math.pow(2, thirdBuyable.baseEffect);
    gainPerClick *= 1 + firstShopBuyableEffect;
    eighthSingle.amount == 1 ? gainPerClick *= eighthSingleEffect : gainPerClick = gainPerClick;
    secondSingle.amount == 1 ? gainPerClick *= midasFormula : gainPerClick = gainPerClick;
    gainPerClick *= gain;
    challengeActivated[2] ? gainPerClick /= umultiplier * 1000000 : gainPerClick;
    challengeActivated[3] || challengeActivated[5] ? gainPerClick = Math.sqrt(gainPerClick) : gainPerClick;
    challengeActivated[5] ? gainPerClick = gainPerClick * Math.pow(1 + amountsOfUpgrades, Math.pow(1.00185, prestigeClicks)) : gainPerClick;
    !challengeActivate && challengeCompleted[5] ? gainPerClick = gainPerClick * Math.pow(1.99, challengesCompleted) : gainPerClick;
    if (challengeActivated[11]) {
        gainPerClick = Math.pow(gainPerClick, 0.01);
        gainPerClick = gainPerClick * umultiplier;
        gainPerClick = Math.pow(gainPerClick, upower);
    }
    if (challengeActivated[6]) {
        gainPerClick = Math.pow(gainPerClick, 1 - amountsOfUpgrades / 50);
        if (amountsOfUpgrades > 50) {
            gainPerClick = 0;
        }
    }
    gainPerClick = Math.pow(gainPerClick, fifthBuyableEffect);
    gainPerClick /= virusCoins;
    if (challengeActivated[8]) {
        gainPerClick = softCap(gainPerClick, 1e8, prestigeSinglesEffects[10][0]);
        gainPerClick = softCap(gainPerClick, 1e8, prestigeSinglesEffects[10][0]);
    }
    else {
        if (!challengeActivate && challengeCompleted[8]) gainPerClick = softCap(gainPerClick, 1e13 * Math.pow(totalSuperCoins, 1.2), prestigeSinglesEffects[10][0]);
        else gainPerClick = softCap(gainPerClick, 1e13, prestigeSinglesEffects[10][0]);
    }
}

function startChallenge(number) {
    restartChallenge.checked && number == 'exit' ? number = challengeStartedID+'' : number
    if (number != 'exit') {
        challengeStartedID = parseInt(number)
    }
    exitChallenge.style.display = "inline-block"
    virusCoins = 1
    for (let i = 0; i < challengeActivated.length; i++) {
        challengeActivated[i] = false
    }
    harshUmulti.style.display = "none"
    if (number == 'exit') {
        if (!restartChallenge.checked) {
            exitChallenge.style.display = "none"
            upowercount = prestigeSinglesEffects[12][1]
            umultipliercount = prestigeSinglesEffects[12][0]
            challengeStartedID = 0
        }
    }
    else {
        challengeActivated[challengeStartedID-1] = true
        if (challengeStartedID == 5 || challengeStartedID == 7) {
            harshUmulti.style.display = "block"
        }
    }
    checkChallenge()
    doReset()
    doHarsherReset()
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
}

function checkChallenge() {
    for (let i = 0; i < challengeActivated.length; i++) {
        if (challengeActivated[i] == true) {
            challengeActivate = true
            break;
        }
        else challengeActivate = false
    }
}

function areYouInChallenge() {
    harshUmulti.style.display = "none"
    if (challengeStartedID > 0 && challengeStartedID <= 12) {
        challengeActivated[challengeStartedID-1] = true
        exitChallenge.style.display = "inline-block"
        if (challengeStartedID == 5 || challengeStartedID == 7) {
            harshUmulti.style.display = "block"
        }
    }
    checkChallenge()
}

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
        shardsPerClick *= 1+fifthShopBuyableEffect
        shardsPerClick *= 1+greenCoin.effect
        shards += shardsPerClick
        
    }
}

function getShardPerSec() {
    if (shardUnlockablePerSecond.percent == 100) {
        shardsPerSecond = 1
        shardsPerSecond *= secondShardBuyableEffect
        shardsPerSecond *= spiritEffects[3]
        shardsPerSecond *= 1+fifthShopBuyableEffect
        shardsPerSecond *= 1+greenCoin.effect
        shardsPerSecond /= 20
        
        shards += shardsPerSecond
    }
    shardsEffect = shards/100
    shardsEffect = Math.pow(shardsEffect, fourthShardSingleEffect)
    achRow1.completion[19] ? shardsEffect *= 1+prestigeCount/100 : shardsEffect
    shardsEffect = softCap(shardsEffect, 1e7, 0.5)
    let challengeReward7N = Math.log2(shards)
    isNaN(challengeReward7N) ? challengeReward7N = 1 : challengeReward7N
    !challengeActivate && challengeCompleted[6] ? shardsEffect *= challengeReward7N : shardsEffect
    
    if (challengeActivate) {
        shardsEffect = Math.sqrt(shardsEffect)
    }
    if (challengeActivated[1]) {
        shardsEffect = -0.99
    }
    if (challengeActivated[4] || challengeActivated[5]  || challengeActivated[6]) {
        shardsEffect = Math.sqrt(shardsEffect)
    }
    if (challengeActivated[7]) {
        shardsEffect = Math.pow(shardsEffect, 0.25)
    }
    if (challengeActivated[11]) {
        shardsEffect = Math.pow(shardsEffect, 0.02)
    }
    if (challengeActivated[9]) {
        shardsEffect = 0
    }
    shardChanceMinimum = thirdShardBuyableEffect[0]
    shardChanceMaximum = 50*thirdShardBuyableEffect[1]
}

function selectTab(argument, isFlex) {
    const tabsToHide = ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab', 'challengeTab']
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
    if (challengeActivated[5] || (challengeActivated[9] && amountsOfUpgrades >= 25) || challengeActivated[10]) {
        document.getElementById(y).disabled = true
    }
    else money >= x.price ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkShopBuyableDisabledUpgrade (x, y, z) {
    superCoins >= Math.round(x.price) || x.amount == z ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
}
function checkSingleDisabledUpgrade (x, y) {
    if (challengeActivated[0] || (challengeActivated[9] && amountsOfUpgrades >= 25)  || challengeActivated[10]) {
        document.getElementById(y).disabled = true
    }
    else money >= x.price || x.amount == 1 ? document.getElementById(y).disabled = false : document.getElementById(y).disabled = true
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
        }, 1800); // подождать завершения анимации исчезновения
      }, 1700); // показывать уведомление 5 секунд
    }, 100);
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
        yesHR.style.display = "none"; yesRP.style.display = "none"
        if (arg == 'hardReset') {
        windowTitle2.style.fontSize = '24px'; 
        windowTitle2.innerHTML = resetTitle; 
        yesHR.style.display = "block"
        }
        else if (arg == 'gotNaNed') {
            windowTitle2.style.fontSize = '14px';
            windowTitle2.innerHTML = NaNedTitle
            yesRP.style.display = "block"
        }
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
    timeDifference <= 0 ? timeDifference = 1 : timeDifference
    checkUpgradesText()
    prestigeSingleEffect()

    if (timeDifference >= (1000/(1+(fourthShopBuyableEffect)/prestigeSinglesEffects[2][1]/spiritEffects[1]))) {
        superCoinsTemp = timeDifference/(1000/(1+fourthShopBuyableEffect)/prestigeSinglesEffects[2][1]/spiritEffects[1])
    }
    else superCoinsTemp = 0
    if (achRow1.completion[11]) {
        offlineCrystalsTemp = timeDifference/(7200/secondPrestigeBuyableEffect)
        checkCrystalsTemp()
        offlineCrystalsTemp *= crystalsTemp
        crystals += offlineCrystalsTemp
        totalCrystals += offlineCrystalsTemp
        }
    if (prestigeMilestonesEffects[15]){
        offlinePrestigesTemp = (timeDifference/60)*(fastestNoMaxBuyPrestiges/20)
        prestigeCount += offlinePrestigesTemp
        pinkCoin.currency += (timeDifference/60)
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
    realSecondsTemp = timeDifference
    realTimerTemp = timeDifference
    gameSeconds += gameSecondsTemp
    gameTimer += gameTimerTemp
    prestigeSeconds += prestigeSecondsTemp
    prestigeTimer += prestigeTimerTemp
    realSeconds += realSecondsTemp
    realTimer += realTimerTemp
    umultiplierTimer += timeDifference
    upowerTimer += timeDifference
}
//если ты находишься 10 секунд в игре затем ливаешь и перезаходишь то ты получаешь ещё 10 секунд получения монет. 


function offlineGainTime() {
    convertingTime(gameSeconds, gameMinutes, gameHours, gameDays, 'game')
    convertingTime(prestigeSeconds, prestigeMinutes, prestigeHours, prestigeDays, 'prestige')
    convertingTime(realSeconds, realMinutes, realHours, realDays, 'real')
    whatsYourCurrentTime()
}

document.addEventListener("visibilitychange", function() {
    if (!document.hidden) { // проверяем, что страница стала видимой
    clearInterval(everythingInterval)
    clearInterval(autosaver)
    clearInterval(autoSaveTime)
    clearInterval(getCoinPerSecond)
    clearInterval(addTheSecond)
    offlineGain();
    autoSaverTimer = 0
    autosaver = setInterval(autoSaveThis, 30000); //таймер
    everythingInterval = setInterval(updateTick, 50)
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
    addTheSecond = setInterval(addSecond, 50)
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
        clearInterval(addTheSecond)
        whatsYourCurrentTime2()
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
    window.open('https://discord.gg/WdbaQC4nuM', '_blank');
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
const shopButtons = document.querySelectorAll('.shopButton');

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

for (const shopButton of shopButtons) {
    const tooltip = document.getElementById('tooltip-' + shopButton.id);
    const popperInstance = Popper.createPopper(shopButton, tooltip, {
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
        shopButton.addEventListener(event, () => show(tooltip, popperInstance));
    });
    
    hideEvents.forEach((event) => {
        shopButton.addEventListener(event, () => hide(tooltip));
      });
    }