var secondBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 100,
    basePrice: 100,
    updateText: document.getElementById('buyableU2'),
    power: 1.1415
}    
var firstBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 10,
    basePrice: 10,
    updateText: document.getElementById('buyableU1'),
    power: 1.095
}
var thirdBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 500,
    basePrice: 500,
    updateText: document.getElementById('buyableU3'),
    power: 6.1
}
var fourthBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 1000,
    basePrice: 1000,
    updateText: document.getElementById('buyableU4'),
    power: 1.55
}
var fifthBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 5000,
    basePrice: 5000,
    updateText: document.getElementById('buyableU5'),
    power: 1.99
}
var firstSingle = {
    amount: 0,
    baseEffect: 0,
    price: 100000,
    updateText: document.getElementById('singleU1'),
    priceText: "<br> Стоимость: 25000 α-монет"
}
var secondSingle = {
    amount: 0,
    baseEffect: 0,
    price: 1.5e6,
    updateText: document.getElementById('singleU2'),
    priceText: "<br> Стоимость: 250000 α-монет"
}
var thirdSingle = {
    amount: 0,
    baseEffect: 0,
    price: 3.5e6,
    updateText: document.getElementById('singleU3'),
    priceText: "<br> Стоимость: 1e6 α-монет"
}
var fourthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 3e7,
    updateText: document.getElementById('singleU4'),
    priceText: "<br> Стоимость: 5e6 α-монет"
}
var fifthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 5e8,
    updateText: document.getElementById('singleU5'),
    priceText: "<br> Стоимость: 2.5e7 α-монет"
}
var sixthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 3e9,
    updateText: document.getElementById('singleU6'),
    priceText: "<br> Стоимость: 7.77e7 α-монет"
}
var seventhSingle = {
    amount: 0,
    baseEffect: 0,
    price: 1.1e10,
    updateText: document.getElementById('singleU7'),
    priceText: "<br> Стоимость: 1.5e8 α-монет"
}
var eighthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 1.5e11,
    updateText: document.getElementById('singleU8'),
    priceText: "<br> Стоимость: 1e10 α-монет"
}
var ninthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 1.2e12,
    updateText: document.getElementById('singleU9'),
    priceText: "<br> Стоимость: 1.11e11 α-монет"
}
var tenthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 1e13,
    updateText: document.getElementById('singleU10'),
    priceText: "<br> Стоимость: 2e12 α-монет"
}

var firstShopBuyable = {
    amount: 0,
    baseprice: 1.3,
    price: 1.3,
    power: 1.05,
    getEl: document.getElementById('shopBuyableU1'),
    priceText: " "
}
var secondShopBuyable = {
    amount: 0,
    baseprice: 1.3,
    price: 1.3,
    power: 1.05,
    getEl: document.getElementById('shopBuyableU2'),
    priceText: " "
}
var thirdShopBuyable = {
    amount: 0,
    baseprice: 1.4,
    price: 1.4,
    power: 1.055,
    getEl: document.getElementById('shopBuyableU3'),
    priceText: " "
}
var fourthShopBuyable = {
    amount: 0,
    baseprice: 1.5,
    price: 1.5,
    power: 1.06,
    getEl: document.getElementById('shopBuyableU4'),
    priceText: " "
}
var firstShopSingle = {
    amount: 0,
    price: 100,
    getEl: document.getElementById('shopSingleU1'),
    priceText: " "
}
var spentSuperCoins = 0
var overdriveType1 = {
    percent: 0,
    effect: 1,
    price: 100
}

function buyBuyableUpgrade(buyable) {
    buyable.amount != 0 ? buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)) : buyable.price = buyable.basePrice;
    if (!maxOrNoVar) {
        if (money >= buyable.price) {
            buyable.amount++; 
            money -= buyable.price; 
            buyable.baseEffect++;
            buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount))
        }
    }
    else {
        while (money >= buyable.price) {
            buyable.amount++; 
            money -= buyable.price; 
            buyable.baseEffect++;
            buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount))
        }
    }
}

function buySingleUpgrade(single) {
    if (money >= single.price && single.amount == 0) {
        single.amount++;
        money -= single.price;
        single.baseEffect++;
        single.updateText.classList.add('purchased')
        single.priceText = ''
    }
}

function buyShopBuyable(item, max) {
    if (superCoins >= Math.round(item.price) && item.amount != max) {
        item.amount++;
        superCoins -= Math.round(item.price);
        spentSuperCoins += Math.round(item.price);
        item.price = Math.round(item.baseprice*Math.pow(item.power, item.amount))
    }
}

function buyShopSingle(item, max, unlockableID) {
    if (superCoins >= Math.round(item.price) && item.amount != max) {
        item.amount++;
        checkShopSingle(item.amount, unlockableID)
        superCoins -= Math.round(item.price);
    }
}
function checkShopSingle (unlockableCondition, unlockableID){ //unlockableCondition means xSingle.amount
    let unlockable = document.getElementById(unlockableID)
    if (unlockableCondition >= 1) {
        unlockable.style.display = 'block'
    }
    else unlockable.style.display = 'none'
}

function respecBuyables() {
    firstShopBuyable.amount = 0
    firstShopBuyable.price = firstShopBuyable.baseprice
    secondShopBuyable.amount = 0
    secondShopBuyable.price = secondShopBuyable.baseprice
    thirdShopBuyable.amount = 0
    thirdShopBuyable.price = thirdShopBuyable.baseprice
    fourthShopBuyable.amount = 0
    fourthShopBuyable.price = fourthShopBuyable.baseprice
    superCoins += spentSuperCoins
    spentSuperCoins = 0
}

function singleUpgradeTextUpdate () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (var i = 0; i < singleArray.length; i++){
        if (singleArray[i].amount == 1) {singleArray[i].priceText = ''}
    }
}



var amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount 
var secondBuyableEffect = secondBuyable.baseEffect * Math.pow(Math.pow(Math.log(firstBuyable.amount+10), 2), fourthSingle.amount)
var firstBuyableEffect = firstBuyable.baseEffect * (1+(secondBuyableEffect/10))
var thirdBuyableEffect = Math.pow(2, thirdBuyable.baseEffect)
var fourthBuyableEffect = 1 - fourthBuyable.baseEffect * (Math.pow(Math.pow(Math.log(fourthBuyable.amount+10), 2), fifthSingle.amount))
var fifthBuyableEffect = 1+fifthBuyable.baseEffect*(Math.log10((gainPerSecond+10)/6))
var firstSingleEffect = 1-firstSingle.baseEffect+(firstSingle.baseEffect*(Math.log10(total)/1.4))
var secondSingleEffect = 1 - secondSingle.baseEffect+ (secondSingle.baseEffect*midasFormula)
var thirdSingleEffect = 1 - thirdSingle.baseEffect + (thirdSingle.baseEffect*2)
var fourthSingleEffect = 1 - fourthSingle.baseEffect +(fourthSingle.baseEffect*(Math.pow(Math.log10(firstBuyable.amount+10), 2)))
var fifthSingleEffect = 1 - fifthSingle.baseEffect + (fifthSingle.baseEffect*(Math.pow(Math.log10(fourthBuyable.amount+10), 2)))
var sixthSingleEffect = 1-sixthSingle.baseEffect+(sixthSingle.baseEffect*(Math.log10(gainPerClick)*2.33))
var seventhSingleEffect = 1 - seventhSingle.baseEffect+ (Math.pow((1 + 0.00083*gameTimer), achRow1.completion[6])*(1+ (Math.sqrt(amountsOfUpgrades))))
var eighthSingleEffect = eighthSingle.baseEffect + Math.pow(1 + (Math.pow((achCount-1) * 43, 0.5)), eighthSingle.amount)
var ninthSingleEffect = 1 - ninthSingle.baseEffect +(ninthSingle.baseEffect*(1 + (gameTimer/360000)))
var tenthSingleEffect = Math.pow(1.5, tenthSingle.baseEffect)
var midasPower = 1.125
var midasFormula = Math.log1p(Math.pow(Math.pow(clickCount, 1.5), midasPower))
var firstShopBuyableEffect = 0, secondShopBuyableEffect = 0, thirdShopBuyableEffect = 0, fourthShopBuyableEffect = 0


function checkUpgradesText () {
    amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount 
    firstBuyableEffect = firstBuyable.baseEffect * (1+(secondBuyableEffect/10))
    secondBuyableEffect = secondBuyable.baseEffect * fourthSingleEffect
    thirdBuyableEffect = Math.pow(2, thirdBuyable.baseEffect)
    fourthBuyableEffect = Math.pow(1.05, fourthBuyable.amount) * fifthSingleEffect
    fifthBuyableEffect = 1+fifthBuyable.baseEffect/1000
    firstSingleEffect = 1-firstSingle.baseEffect+(Math.pow((firstSingle.baseEffect*(Math.log10(total)/1.4)), ninthSingleEffect))
    secondSingleEffect = 1 - secondSingle.baseEffect + (secondSingle.baseEffect*midasFormula)
    thirdSingleEffect = 1 - thirdSingle.baseEffect + (thirdSingle.baseEffect*2)
    fourthSingleEffect = Math.pow(fourthSingle.baseEffect +(fourthSingle.baseEffect*(Math.pow((Math.log10(firstBuyable.amount+10)/1.5), 2))), fourthSingle.amount)
    fifthSingleEffect = 1 - fifthSingle.baseEffect + (fifthSingle.baseEffect*(Math.pow(Math.log10(fourthBuyable.amount+10), 1.15)))
    sixthSingleEffect = 1-sixthSingle.baseEffect+(sixthSingle.baseEffect*(Math.log10(gainPerClick+10)/1.07))
    var sevEff = 1 - seventhSingle.baseEffect+ (Math.pow((1 + 0.000138*gameTimer), achRow1.completion[6])*seventhSingle.baseEffect*(1+ (Math.log(amountsOfUpgrades+10))))
    seventhSingleEffect = sevEff
    eighthSingleEffect = Math.pow((Math.pow((achCount-1) * 40, 0.2)), eighthSingle.amount)
    ninthSingleEffect = 1 - ninthSingle.baseEffect +(ninthSingle.baseEffect*(1 + (gameTimer/360000)))
    tenthSingleEffect = Math.pow(1.5, tenthSingle.baseEffect)
    midasFormula = Math.log1p(Math.pow(Math.pow(clickCount, 1.5), midasPower))
    seventhSingleEffect = Math.min(sevEff, 100)
    ninthSingleEffect = Math.min(ninthSingleEffect, 2)

    achRow1.completion[5] ? secondBuyableEffect *= 1.1 : secondBuyableEffect = secondBuyableEffect
    achRow1.completion[8] ? midasPower = 1.175 : midasPower = 1.125

    firstShopBuyableEffect = firstShopBuyable.amount/50
    secondShopBuyableEffect = secondShopBuyable.amount/50
    thirdShopBuyableEffect = thirdShopBuyable.amount/66.66666
    fourthShopBuyableEffect = fourthShopBuyable.amount/100
}

setInterval(checkUpgradesText, 50)

function checkMaxShop () {
    if (firstShopBuyable.amount == 100) {
        firstShopBuyable.getEl.classList.add('purchased')
    }
    else firstShopBuyable.getEl.classList.remove('purchased')
    if (secondShopBuyable.amount == 100) {
        secondShopBuyable.getEl.classList.add('purchased')
    }
    else secondShopBuyable.getEl.classList.remove('purchased')
    if (thirdShopBuyable.amount == 100) {
        thirdShopBuyable.getEl.classList.add('purchased')
    }
    else thirdShopBuyable.getEl.classList.remove('purchased')
    if (fourthShopBuyable.amount == 100) {
        fourthShopBuyable.getEl.classList.add('purchased')
    }
    else fourthShopBuyable.getEl.classList.remove('purchased')
    if (firstShopSingle.amount == 1) {
        firstShopSingle.getEl.classList.add('purchased')
    }
    else firstShopSingle.getEl.classList.remove('purchased')
}
setInterval(checkMaxShop, 50)
function singleUpgradePurchased () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (var i = 0; i < singleArray.length; i++){
        if (singleArray[i].amount == 1) {singleArray[i].updateText.classList.add('purchased')}
    }
    return singleArray;
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "M" || event.key == "m" || event.key == "ь" || event.key == "Ь") && clickCount >= 1000) {
    maxBuyAll();
    }
});

coinGain.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
    alert('You can\'t just hold on it!')
    }
});




function maxBuyAll () {
    var singleArray2 = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    var buyableArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (var i = 0; i < singleArray2.length; i++) {
        while (money >= singleArray2[i].price && singleArray2[i].amount != 1) buySingleUpgrade(singleArray2[i])
    }
    let minimal = Math.min(firstBuyable.price, secondBuyable.price, thirdBuyable.price, fourthBuyable.price, fifthBuyable.price);
    while (money >= minimal) {
        for (var i = 0; i < buyableArray.length; i++) {
            buyBuyableUpgrade(buyableArray[i]);
            minimal = Math.min(firstBuyable.price, secondBuyable.price, thirdBuyable.price, fourthBuyable.price, fifthBuyable.price);
        }
    }
}

buyableU1.addEventListener("click", function(){
    buyBuyableUpgrade(firstBuyable);
}
)
buyableU2.addEventListener("click", function(){
    buyBuyableUpgrade(secondBuyable);
}
)
buyableU3.addEventListener("click", function(){
    buyBuyableUpgrade(thirdBuyable);
}
)
buyableU4.addEventListener("click", function(){
    buyBuyableUpgrade(fourthBuyable);
}
)
buyableU5.addEventListener("click", function(){
    buyBuyableUpgrade(fifthBuyable);
}
)

let maxOrNoVar = false
function maxOrNo () {
    maxOrNoVar ? maxOrNoVar = false : maxOrNoVar = true
}

/*   var singleArray2 = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    var buyableArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (var i = 0; i < singleArray2.length; i++) {
        while (money >= singleArray2[i].price && singleArray2[i].amount != 1) buySingleUpgrade(singleArray2[i])
    }
    for (var i = 0; i < buyableArray.length; i++) {
        while (money >= buyableArray[i].price) buyBuyableUpgrade(buyableArray[i])
    }*/