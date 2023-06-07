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
    power: 6.15
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
    power: 2.2
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
function buyBuyableUpgrade(buyable) {
    buyable.amount != 0 ? buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)) : buyable.price = buyable.basePrice;
    if (money >= buyable.price) {
        buyable.amount++; 
        money -= buyable.price; 
        buyable.baseEffect++;
        // console.log(buyable.amount); 
        // console.log(money + " " + buyable.baseEffect + " " + buyable.basePrice +  " " + buyable.updateText + " " + buyable.price);
        buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount))
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

function singleUpgradeTextUpdate () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    firstSingle.priceText = "<br> Стоимость: 25000 α-монет"
    secondSingle.priceText = "<br> Стоимость: 250000 α-монет"
    thirdSingle.priceText = "<br> Стоимость: 1e6 α-монет"
    fourthSingle.priceText = "<br> Стоимость: 5e6 α-монет"
    fifthSingle.priceText = "<br> Стоимость: 2.5e7 α-монет"
    sixthSingle.priceText = "<br> Стоимость: 7.77e7 α-монет"
    seventhSingle.priceText = "<br> Стоимость: 1.5e8 α-монет"
    eighthSingle.priceText = "<br> Стоимость: 5e9 α-монет"
    ninthSingle.priceText = "<br> Стоимость: 9.9e9 α-монет"
    tenthSingle.priceText = "<br> Стоимость: 1.33e11 α-монет" 
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
var midasFormula = (1+ (clickCount/50000))


function checkUpgradesText () {
    amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount 
    firstBuyableEffect = firstBuyable.baseEffect * (1+(secondBuyableEffect/10))
    secondBuyableEffect = secondBuyable.baseEffect * (Math.pow(Math.pow(Math.log10(firstBuyable.amount+10)/1.5, 2), fourthSingle.amount))
    thirdBuyableEffect = Math.pow(2, thirdBuyable.baseEffect)
    fourthBuyableEffect = Math.pow(1.05, fourthBuyable.amount) * (Math.pow(Math.pow((Math.log10(fourthBuyable.amount+10)), 1.5), fifthSingle.amount))
    fifthBuyableEffect = 1+fifthBuyable.baseEffect*(Math.log10(gainPerSecond+10)/3.5)
    firstSingleEffect = 1-firstSingle.baseEffect+(Math.pow((firstSingle.baseEffect*(Math.log10(total)/1.4)), ninthSingleEffect))
    secondSingleEffect = 1 - secondSingle.baseEffect+ (secondSingle.baseEffect*midasFormula)
    thirdSingleEffect = 1 - thirdSingle.baseEffect + (thirdSingle.baseEffect*2)
    fourthSingleEffect = Math.pow(fourthSingle.baseEffect +(fourthSingle.baseEffect*(Math.pow((Math.log10(firstBuyable.amount+10)/1.5), 2))), fourthSingle.amount)
    fifthSingleEffect = 1 - fifthSingle.baseEffect + (fifthSingle.baseEffect*(Math.pow(Math.log10(fourthBuyable.amount+10), 1.15)))
    sixthSingleEffect = 1-sixthSingle.baseEffect+(sixthSingle.baseEffect*(Math.log10(gainPerClick+10)/1.07))
    seventhSingleEffect = 1 - seventhSingle.baseEffect+ (Math.pow((1 + 0.000138*gameTimer), achRow1.completion[6])*seventhSingle.baseEffect*(1+ (Math.log(amountsOfUpgrades+10))))
    eighthSingleEffect = Math.pow((Math.pow((achCount-1) * 40, 0.2)), eighthSingle.amount)
    ninthSingleEffect = 1 - ninthSingle.baseEffect +(ninthSingle.baseEffect*(1 + (gameTimer/360000)))
    tenthSingleEffect = Math.pow(1.5, tenthSingle.baseEffect)

    achRow1.completion[5] ? secondBuyableEffect *= 1.1 : secondBuyableEffect = secondBuyableEffect
    achRow1.completion[8] ? midasFormula = (1 + (clickCount/40000)) : midasFormula = midasFormula = (1+ (clickCount/100000))
}

setInterval(checkUpgradesText, 50)

function singleUpgradePurchased () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (var i = 0; i < singleArray.length; i++){
        if (singleArray[i].amount == 1) {singleArray[i].updateText.classList.add('purchased')}
    }
    return singleArray;
}

document.addEventListener("keydown", function(event) {
    if (event.key == "M" || event.key == "m" || event.key == "ь" || event.key == "Ь") {
    maxBuyAll();
    }
});

coinGain.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
    alert('You can just hold on it!')
    }
});

function maxBuyAll () {
    var singleArray2 = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    var buyableArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (var i = 0; i < singleArray2.length; i++) {
        while (money >= singleArray2[i].price && singleArray2[i].amount != 1) buySingleUpgrade(singleArray2[i])
    }
    for (var i = 0; i < buyableArray.length; i++) {
        while (money >= buyableArray[i].price) buyBuyableUpgrade(buyableArray[i])
    }

}