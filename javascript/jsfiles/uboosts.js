var umultiplier = 1
var umultipliercount = 0
var upower = 1
var upowercount = 0
var umultipliertext = document.getElementById('umultiplier')
var upowertext = document.getElementById('upower')

//(100 + (50 * umultipliercount))

var umultiplierCost = 100 + (50 * umultipliercount)
var upowerCost = 250 + (100 * upowercount)


function doUmulti () {
    if (firstBuyable.amount >= umultiplierCost){
        clearInterval(getCoinPerSecond)
        gainPerSecond = 0
        gainPerSecondSave = 0
        moneyTemp = 0
        whatsYourCurrentTime()
        doUmultireset()
        umultipliercount++
        umultiplier *= 2
        saveGame()
        gainPerSecond = 0
        gain = 0
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){
        clearInterval(getCoinPerSecond)
        gainPerSecond = 0
        gainPerSecondSave = 0
        moneyTemp = 1
        whatsYourCurrentTime()
        doUpowerreset()
        upowercount++
        upower += 0.045
        saveGame()
        getCoinPerSecond = setInterval(getCoinPerSec, 50)
    }
}



function doUmultireset() {
    money = 10
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 0;
    upgradeReset();        
    singleUpgradePurchasedRemove()
    money = 10
}

function doUpowerreset() {
    money = 10
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 0
    upgradeReset();        
    singleUpgradePurchasedRemove()
    singleUpgradeTextUpdate()
    umultiplier = 1
    umultipliercount = 0
    money = 10
}
