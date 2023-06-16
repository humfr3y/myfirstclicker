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
        gainPerSecond = 1
        gainPerSecondSave = 1
        moneyTemp = 1
        whatsYourCurrentTime()
        doUmultireset()
        umultipliercount++
        umultiplier *= 2
        saveGame()
        money = 10
        gainPerSecond = 1
        money = 10
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){
        gainPerSecond = 1
        gainPerSecondSave = 1
        moneyTemp = 1
        whatsYourCurrentTime()
        doUpowerreset()
        upowercount++
        upower += 0.1
        saveGame()
        money = 10
    }
}



function doUmultireset() {
    money = 10
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 1;
    upgradeReset();        
    singleUpgradePurchasedRemove()
    singleUpgradeTextUpdate()
    money = 10
}

function doUpowerreset() {
    money = 10
    gain = 1;
    gainPerClick = 1;
    gainPerSecond = 1
    upgradeReset();        
    singleUpgradePurchasedRemove()
    singleUpgradeTextUpdate()
    umultiplier = 1
    umultipliercount = 0
    money = 10
}
