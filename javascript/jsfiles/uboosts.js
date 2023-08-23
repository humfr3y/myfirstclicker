let umultiplier = 1
let umultipliercount = 0
let upower = 1
let upowercount = 0
let umultipliertext = document.getElementById('umultiplier')
let upowertext = document.getElementById('upower')
// let prestigeCount = 0, crystals = 0, crystalsTemp = 1, totalCrystals = 0

//(100 + (50 * umultipliercount))

let umultiplierCost = 100 + (50 * umultipliercount)
let upowerCost = 250 + (100 * upowercount)

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

// function doPrestigeReset(){
//     if (money >= 1e15){
//         doReset()
//         getCoinPerSecond = setInterval(getCoinPerSec, 50)
//         crystals += crystalsTemp
//         totalCrystals += crystalsTemp
//         upower = 1
//         umultiplier = 1
//         upowercount = 0
//         umultipliercount = 0
//     }
// }

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
