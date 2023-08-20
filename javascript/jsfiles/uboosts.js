var umultiplier = 1
var umultipliercount = 0
var upower = 1
var upowercount = 0
var umultipliertext = document.getElementById('umultiplier')
var upowertext = document.getElementById('upower')
var prestigeCount = 0, crystals = 0, crystalsTemp = 1

//(100 + (50 * umultipliercount))

var umultiplierCost = 100 + (50 * umultipliercount)
var upowerCost = 250 + (100 * upowercount)

// setInterval(()=>{
//     crystalsTemp = 
// }, 50)

function doUmulti () {
    if (firstBuyable.amount >= umultiplierCost){
        doReset()
        umultipliercount++
        umultiplier *= 2
        saveGame()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){
        doReset()
        upowercount++
        upower += 0.045
        umultiplier = 1
        umultipliercount = 0
        saveGame()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
    }
}

function doPrestigeReset(){
    if (money >= 1e15){
        doReset()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
        crystals += crystalsTemp
        upower = 1
        umultiplier = 1
        upowercount = 0
        umultipliercount = 0
    }
}

function doReset(){
    clearInterval(getCoinPerSecond)
    whatsYourCurrentTime()
    money = 10
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 0;
    gainPerSecondSave = 0
    upgradeReset();        
    singleUpgradePurchasedRemove()

}
