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
let noMaxBuyPrestiges = 0, fastestNoMaxBuyPrestiges = 0, prestigeCountMultiplier = 1
let umultiplierBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-50))/50) //(SI's - prev umulti cost) / scaling -> floored number
let upowerBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-100))/100)

function doUmulti () {
    if (firstBuyable.amount >= umultiplierCost){
        umultiplierBulkCost = Math.floor((firstBuyable.amount-(umultiplierCost-50))/50)
        doReset()
        if (!prestigeMilestonesEffects[11]) {
            umultipliercount++
        }
        else umultipliercount += umultiplierBulkCost
        umultiplier = Math.pow(baseUmult, umultipliercount)
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        umultiplierTimer = 0
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){

        if (achRow1.completion[13]) {
            upowerBulkCost = Math.floor((firstBuyable.amount-(upowerCost-90))/90)
        }
        else upowerBulkCost = Math.floor((firstBuyable.amount-(upowerCost-100))/100)
        doReset()
        if (!prestigeMilestonesEffects[12]) {
            upowercount++
        }
        else upowercount += upowerBulkCost
        upower = 1 + baseUpow*upowercount
        umultiplier = 1
        umultipliercount = prestigeSinglesEffects[12][0]
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        upowerTimer = 0
    }
}

function doPrestigeReset(){
    if (prestigeMilestonesEffects[14]) {
        prestigeCountMultiplier = Math.floor(Math.log10(money+10)-14)
        console.log(prestigeCountMultiplier + " pSM")
    }
    else prestigeCountMultiplier = 1; console.log(prestigeCountMultiplier + " pSM = 1")
    if (money >= 1e15){
        if (upowercount == prestigeSinglesEffects[12][1]) {
            noResets = true
        }
        doReset()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        checkCrystalsTemp()
        crystals += crystalsTemp
        totalCrystals += crystalsTemp
        console.log(prestigeCount + "+ 1 *" + prestigeCountMultiplier + " = " + (prestigeCount + 1 * prestigeCountMultiplier))
        prestigeCount += 1 * prestigeCountMultiplier
        console.log(prestigeCount + " pS")
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
        shards += prestigeSinglesEffects[11]
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

function doReset(){
    clearInterval(getCoinPerSecond)
    whatsYourCurrentTime()
    prestigeMilestonesEffects[6] ? money = 1e6 : money = prestigeSinglesEffects[0]
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 0;
    gainPerSecondSave = 0
    upgradeReset();
    if (prestigeMilestonesEffects[8] === false) {
        singleUpgradePurchasedRemove()
        singlesReset()
    }
    const buyablesArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (let i = 0; i < buyablesArray.length; i++){
        buyablesArray[i].amount = prestigeSinglesEffects[4]
        buyablesArray[i].baseEffect = prestigeSinglesEffects[4]
        buyablesArray[i].amount != 0 ? buyablesArray[i].price = Math.round(buyablesArray[i].basePrice*Math.pow(buyablesArray[i].power, buyablesArray[i].amount)) : buyablesArray[i].price = buyablesArray[i].basePrice;
    }
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "P" || event.key == "p" || event.key == "з" || event.key == "З") && totalCrystals >= 1) {
    doPrestigeReset();
    }
});