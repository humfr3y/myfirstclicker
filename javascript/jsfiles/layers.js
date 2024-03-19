let umultiplier = 1
let umultipliercount = 0
let upower = 1
let upowercount = 0
let baseUmult = prestigeSinglesEffects[3], baseUpow = prestigeSinglesEffects[7]
let umultipliertext = document.getElementById('umultiplier')
let upowertext = document.getElementById('upower')
let prestigeCount = 0, crystals = 0, crystalsTemp = 1, totalCrystals = 0
let noResets = false
let umultiplierCost = 100 + (50 * umultipliercount)
let upowerCost = 250 + (100 * upowercount)
let noMaxBuyPrestiges = 0, fastestNoMaxBuyPrestiges = 0, prestigeCountMultiplier = 1, prestigeCountMultiplier2 = 1
// let umultiplierBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-50))/50) //(SI's - prev umulti cost) / scaling -> floored number
// let upowerBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-100))/100)
let prestigeClicks = 0

function doUmulti () {
    if (firstBuyable.amount >= umultiplierCost){
        if (!prestigeMilestonesEffects[11]) {
            umultipliercount++
        }
        else {
            while (firstBuyable.amount >= umultiplierCost) {
                umultipliercount++
                if (!challengeActivate && challengeCompleted[11]) {
                    umultipliercount >= 20 ? umultiplierCost = (100 + (40 * umultipliercount)) * (1+((umultipliercount-19)/50)) : umultiplierCost = 100 + (40 * umultipliercount)
                }
                else  {
                    umultipliercount >= 20 ? umultiplierCost = (100 + (50 * umultipliercount)) * (1+((umultipliercount-19)/50)) : umultiplierCost = 100 + (50 * umultipliercount)
                }
                if (challengeActivated[11]) break
            }
        }
        doReset()
        umultiplier = Math.pow(baseUmult, umultipliercount)
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        umultiplierTimer = 0
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){

        if (!prestigeMilestonesEffects[12]) {
            upowercount++
        }
        else {
            while (firstBuyable.amount >= upowerCost) {
                upowercount++
                if (!challengeActivate && challengeCompleted[11]) {
                    upowercount >= 10 ? upowerCost = (250 + (80 * upowercount)) * (1+((upowercount-9)/15)) : upowerCost = 250 + (80 * upowercount)
                }
                else  {
                    upowercount >= 10 ? upowerCost = (250 + (100 * upowercount)) * (1+((upowercount-9)/15)) : upowerCost = 250 + (100 * upowercount)
                }
                if (achRow1.completion[13]) {
                    upowerCost = upowerCost - (10 * (1+upowercount))
                }
                if (challengeActivated[11]) break
            }
        }
        doReset()
        upower = 1 + baseUpow*upowercount
        umultiplier = 1
        if (!challengeActivate) umultipliercount = prestigeSinglesEffects[12][0]
        else umultipliercount = 0
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        upowerTimer = 0
    }
}

function doPrestigeReset(){
    if (prestigeMilestonesEffects[14]) {
        prestigeCountMultiplier = Math.floor(Math.log10(money+10)-14)
    }
    else prestigeCountMultiplier = 1; 
    if (money >= 1e15){
        if (challengeActivate) {
            challengeCompleted[challengeStartedID-1] == false ? challengesCompleted++ : challengesCompleted
            challengeCompleted[challengeStartedID-1] = true
            window[`challenge${challengeStartedID}Start`].innerHTML = 'Пройден'
            window[`challenge${challengeStartedID}Start`].style.backgroundColor = '#3dde3d'
        }
        if (!restartChallenge.checked)
        for (let i = 0; i < challengeActivated.length; i++) {
            challengeActivated[i] = false
        }
        if (challengeActivate) startChallenge('exit')
        if (upowercount == prestigeSinglesEffects[12][1]) {
            noResets = true
        }
        greenCoin.currency = 0
        doReset()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        checkCrystalsTemp()
        progressBarGoals[0] = true
        crystals += crystalsTemp
        totalCrystals += crystalsTemp
        prestigeCount += 1 * prestigeCountMultiplier
        pinkCoin.currency++
        upower = 1
        umultiplier = 1
        upowercount = prestigeSinglesEffects[12][1]
        umultipliercount = prestigeSinglesEffects[12][0]
        overdriveType1.percent = 0
        overdriveType1.effect = 1
        overdriveType1.price = 1000
        overdriveType1.consumed = 0
        if (prestigeTimer < fastestPrestigeTimer) {
            fastestPrestigeSeconds = prestigeSeconds
            fastestPrestigeMinutes = prestigeMinutes
            fastestPrestigeHours = prestigeHours
            fastestPrestigeDays = prestigeDays
            fastestPrestigeTimer = prestigeTimer
        }
        fastestPrestigeSeconds = Math.max(fastestPrestigeSeconds, 0.05)
        fastestPrestigeTimer = Math.max(fastestPrestigeTimer, 0.05)
        !challengeActivate && challengeCompleted[1] ? shards += prestigeSinglesEffects[11]*(1000000*crystals) : shards += prestigeSinglesEffects[11]
        if (didMaxBuy == false){
            noMaxBuyPrestiges = 60 / (prestigeTimer+0.05)
            prestigeMilestonesEffects[14] ? noMaxBuyPrestiges *= prestigeCountMultiplier : noMaxBuyPrestiges // prestiges per min
        }
        if (noMaxBuyPrestiges > fastestNoMaxBuyPrestiges) {
            fastestNoMaxBuyPrestiges = noMaxBuyPrestiges
        }
        prestigeSeconds = 0
        prestigeMinutes = 0
        prestigeHours = 0
        prestigeDays = 0
        prestigeTimer = 0

        didMaxBuy = false
        


    }
}

function doHarsherReset() { //for challenges
    overdriveType1.percent = 0
    overdriveType1.effect = 1
    overdriveType1.price = 1000
    overdriveType1.consumed = 0
    upower = 1
    umultiplier = 1
    upowercount = 0
    umultipliercount = 0
    money = 10

    prestigeSeconds = 0
    prestigeMinutes = 0
    prestigeHours = 0
    prestigeDays = 0
    prestigeTimer = 0

    prestigeClicks = 0

    firstShopItem.used = 0
    secondShopItem.used = 0
    thirdShopItem.used = 0
    fourthShopItem.used = 0
}

function doHarshUmulti() {
if (umultipliercount > 0) {
    umultipliercount--
}
    doReset()
    umultiplier = Math.pow(baseUmult, umultipliercount)
    getCoinPerSecond = setInterval(getCoinPerSec, 50)
    umultiplierTimer = 0
}

function doReset(){
    clearInterval(getCoinPerSecond)
    whatsYourCurrentTime()
    prestigeMilestonesEffects[6] && !challengeActivate ? money = 1e6 : money = prestigeSinglesEffects[0]
    challengeActivate ? money = 10 : money
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 0;
    gainPerSecondSave = 0
    upgradeReset();
    if (prestigeMilestonesEffects[8] === false || challengeActivate) {
        singleUpgradePurchasedRemove()
        singlesReset()
    }
    const buyablesArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    if (!challengeActivate) {
        for (let i = 0; i < buyablesArray.length; i++){
            buyablesArray[i].amount = prestigeSinglesEffects[4]
            buyablesArray[i].baseEffect = prestigeSinglesEffects[4]
            buyablesArray[i].amount != 0 ? buyablesArray[i].price = Math.round(buyablesArray[i].basePrice*Math.pow(buyablesArray[i].power, buyablesArray[i].amount)) : buyablesArray[i].price = buyablesArray[i].basePrice;
        }
    }
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "P" || event.key == "p" || event.key == "з" || event.key == "З") && totalCrystals >= 1) {
    doPrestigeReset();
    }
});
