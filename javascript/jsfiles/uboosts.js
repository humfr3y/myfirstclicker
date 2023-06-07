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
        doUmultireset()
        umultipliercount++
        umultiplier *= 2
        saveGame()
        money = 10
        doUmultireset()
        saveGame()
    }
}


function doUpower () {
    if ((firstBuyable.amount >= upowerCost) && (umultipliercount >= 4)){
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
    gainPerSecond = 1
    upgradeReset();        
    singleUpgradePurchasedRemove()
    singleUpgradeTextUpdate()
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
}

var shiftKeyPressed = false;
var mKeyPressed = false;

document.addEventListener('keydown', function(event) {
if (event.key === 'Shift') {
    shiftKeyPressed = true;
} else if (event.key.toLowerCase() === 'm' || event.keytoLowerCase() === 'Ь') {
    mKeyPressed = true;
}

if (shiftKeyPressed && mKeyPressed) {
    doUmulti();
}
});

document.addEventListener('keyup', function(event) {
if (event.key === 'Shift') {
    shiftKeyPressed = false;
} else if (event.key.toLowerCase() === 'm' || event.keytoLowerCase() === 'Ь') {
    mKeyPressed = false;
}
});



var shiftKeyPressed2 = false;
var pKeyPressed = false;

document.addEventListener('keydown', function(event) {
if (event.key === 'Shift') {
    shiftKeyPressed2 = true;
} else if (event.key.toLowerCase() === 'p' || event.keytoLowerCase() === 'з') {
    pKeyPressed = true;
}

if (shiftKeyPressed2 && pKeyPressed) {
    doUpower();
}
});

document.addEventListener('keyup', function(event) {
if (event.key === 'Shift') {
    shiftKeyPressed2 = false;
} else if (event.key.toLowerCase() === 'p' || event.keytoLowerCase() === 'з') {
    pKeyPressed = false;
}
});