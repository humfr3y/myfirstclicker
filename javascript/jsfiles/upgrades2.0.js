var spentSuperCoins = 0
let amountOfPrestigeUpgrades = 0
let singleCheckbox = document.getElementById('autoSingleUpgradeCheckbox'), buyableCheckbox = document.getElementById('autoBuyableUpgradeCheckbox'), umultiplierCheckbox = document.getElementById('autoUmultiplierCheckbox'), upowerCheckbox = document.getElementById('autoUpowerCheckbox'), prestigeCheckbox = document.getElementById('autoPrestigeCheckbox') 
let autoSetIntervals = ['', '', '', '', '']
let firstAutoPrestigeInputValue, secondAutoPrestigeInputValue
let challengeReward5 = 1
autoUmultiInput.value = 0
autoUpowerInput.value = 0
autoUpowerInput2.value = 0
shopBulkBuyInput.value = 1
{
var singleInterval = {
    time: 2000,
    price: 1,
}
var buyableInterval = {
    time: 1000,
    price: 1,
    effect: 1,
}
var umultiplierInterval = {
    time: 15000,
    price: 1,
}
var upowerInterval = {
    time: 30000,
    price: 1,
}
var prestigeInterval = {
    time: 60000,
    price: 1,
}
}
{
var secondBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 100,
    basePrice: 100,
    updateText: document.getElementById('buyableU2'),
    power: 1.3,
    bulkAmount: 1,
    bulkPrice: 1
}    
var firstBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 10,
    basePrice: 10,
    updateText: document.getElementById('buyableU1'),
    power: 1.099,
    freeAmount: 0,
    bulkAmount: 1,
    bulkPrice: 1
}
var thirdBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 500,
    basePrice: 500,
    updateText: document.getElementById('buyableU3'),
    power: 9.33,
    bulkAmount: 1,
    bulkPrice: 1
}
var fourthBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 1000,
    basePrice: 1000,
    updateText: document.getElementById('buyableU4'),
    power: 1.85,
    bulkAmount: 1,
    bulkPrice: 1
}
var fifthBuyable = {
    amount: 0,
    baseEffect: 0,
    price: 5000,
    basePrice: 5000,
    updateText: document.getElementById('buyableU5'),
    power: 1.8,
    bulkAmount: 1,
    bulkPrice: 1
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
    price: 3e6,
    updateText: document.getElementById('singleU2'),
    priceText: "<br> Стоимость: 250000 α-монет"
}
var thirdSingle = {
    amount: 0,
    baseEffect: 0,
    price: 5e6,
    updateText: document.getElementById('singleU3'),
    priceText: "<br> Стоимость: 1e6 α-монет"
}
var fourthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 2.5e7,
    updateText: document.getElementById('singleU4'),
    priceText: "<br> Стоимость: 5e6 α-монет"
}
var fifthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 6.5e8,
    updateText: document.getElementById('singleU5'),
    priceText: "<br> Стоимость: 2.5e7 α-монет"
}
var sixthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 5e9,
    updateText: document.getElementById('singleU6'),
    priceText: "<br> Стоимость: 7.77e7 α-монет"
}
var seventhSingle = {
    amount: 0,
    baseEffect: 0,
    price: 5e10,
    updateText: document.getElementById('singleU7'),
    priceText: "<br> Стоимость: 1.5e8 α-монет"
}
var eighthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 7e11,
    updateText: document.getElementById('singleU8'),
    priceText: "<br> Стоимость: 1e10 α-монет"
}
var ninthSingle = {
    amount: 0,
    baseEffect: 0,
    price: 2e12,
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
    priceText: " ",
    max: 100,
    bulkAmount: 1,
    bulkPrice: 1,
}
var secondShopBuyable = {
    amount: 0,
    baseprice: 1.3,
    price: 1.3,
    power: 1.05,
    getEl: document.getElementById('shopBuyableU2'),
    priceText: " ",
    max: 100,
    bulkAmount: 1,
    bulkPrice: 1,
}
var thirdShopBuyable = {
    amount: 0,
    baseprice: 1.4,
    price: 1.4,
    power: 1.055,
    getEl: document.getElementById('shopBuyableU3'),
    priceText: " ",
    max: 100,
    bulkAmount: 1,
    bulkPrice: 1,
}
var fourthShopBuyable = {
    amount: 0,
    baseprice: 1.5,
    price: 1.5,
    power: 1.06,
    getEl: document.getElementById('shopBuyableU4'),
    priceText: " ",
    max: 100,
    bulkAmount: 1,
    bulkPrice: 1,
}
var fifthShopBuyable = {
    amount: 0,
    baseprice: 5,
    price: 5,
    power: 1.08,
    getEl: document.getElementById('shopBuyableU5'),
    priceText: " ",
    max: 50,
    bulkAmount: 1,
    bulkPrice: 1,
}
var sixthShopBuyable = {
    amount: 0,
    baseprice: 10,
    price: 10,
    power: 1.2,
    getEl: document.getElementById('shopBuyableU6'),
    priceText: " ",
    max: 25,
    bulkAmount: 1,
    bulkPrice: 1,
}
var seventhShopBuyable = {
    amount: 0,
    baseprice: 25,
    price: 25,
    power: 2,
    getEl: document.getElementById('shopBuyableU7'),
    priceText: " ",
    max: 5,
    bulkAmount: 1,
    bulkPrice: 1,
}
var firstShopItem = {
    amount: 0,
    price: 75,
    getEl: document.getElementById('shopItem1'),
    priceText: " ",
    max: 5,
    used: 0,
}
var secondShopItem = {
    amount: 0,
    price: 200,
    getEl: document.getElementById('shopItem2'),
    priceText: " ",
    max: 3,
    used: 0,
}
var thirdShopItem = {
    amount: 0,
    price: 30,
    getEl: document.getElementById('shopItem3'),
    priceText: " ",
    max: 10,
    used: 0,
}
var fourthShopItem = {
    amount: 0,
    price: 230,
    getEl: document.getElementById('shopItem4'),
    priceText: " ",
    max: 3,
    used: 0,
}
var firstShopSingle = {
    amount: 0,
    price: 100,
    getEl: document.getElementById('shopSingleU1'),
    priceText: " "
}
var overdriveType1 = {
    percent: 0,
    effect: 1,
    price: 100,
    consumed: 0
}
var firstPrestigeBuyable = {
    amount: 0,
    price: 10,
    basePrice: 10,
    updateText: document.getElementById('pBuyableU1'),
    power: 10
}
var secondPrestigeBuyable = {
    amount: 0,
    price: 20,
    basePrice: 20,
    updateText: document.getElementById('pBuyableU2'),
    power: 30
}
var firstPrestigeSingle = {
    amount: 0,
    price: 1,
    updateText: document.getElementById('pSingleU1'),
    priceText: ""
}
var secondPrestigeSingle = {
    amount: 0,
    price: 2,
    updateText: document.getElementById('pSingleU2'),
    priceText: ""
}
var thirdPrestigeSingle = {
    amount: 0,
    price: 2,
    updateText: document.getElementById('pSingleU3'),
    priceText: ""
}
var fourthPrestigeSingle = {
    amount: 0,
    price: 3,
    updateText: document.getElementById('pSingleU4'),
    priceText: ""
}
var fifthPrestigeSingle = {
    amount: 0,
    price: 1,
    updateText: document.getElementById('pSingleU5'),
    priceText: ""
}
var sixthPrestigeSingle = {
    amount: 0,
    price: 2,
    updateText: document.getElementById('pSingleU6'),
    priceText: ""
}
var seventhPrestigeSingle = {
    amount: 0,
    price: 3,
    updateText: document.getElementById('pSingleU7'),
    priceText: ""
}
var eighthPrestigeSingle = {
    amount: 0,
    price: 5,
    updateText: document.getElementById('pSingleU8'),
    priceText: ""
}
var ninthPrestigeSingle = {
    amount: 0,
    price: 1,
    updateText: document.getElementById('pSingleU9'),
    priceText: ""
}
var tenthPrestigeSingle = {
    amount: 0,
    price: 2,
    updateText: document.getElementById('pSingleU10'),
    priceText: ""
}
var eleventhPrestigeSingle = {
    amount: 0,
    price: 3,
    updateText: document.getElementById('pSingleU11'),
    priceText: ""
}
var twelfthPrestigeSingle = {
    amount: 0,
    price: 5,
    updateText: document.getElementById('pSingleU12'),
    priceText: ""
}
var thirteenthPrestigeSingle = {
    amount: 0,
    price: 10,
    updateText: document.getElementById('pSingleU13'),
    priceText: ""
}
var fourteenthPrestigeSingle = {
    amount: 0,
    price: 100,
    updateText: document.getElementById('pSingleU14'),
    priceText: ""
}
var fifteenthPrestigeSingle = {
    amount: 0,
    price: 1000,
    updateText: document.getElementById('pSingleU15'),
    priceText: ""
}
var sixteenthPrestigeSingle = {
    amount: 0,
    price: 10000,
    updateText: document.getElementById('pSingleU16'),
    priceText: ""
}
}
var firstShardBuyable = {
    price: 1000,
    amount: 0,
    basePrice: 1000,
    power: 3.2,
    updateText: document.getElementById('shBuyableU1'),
}
var secondShardBuyable = {
    price: 1000,
    amount: 0,
    basePrice: 1000,
    power: 4.2,
    updateText: document.getElementById('shBuyableU2'),
}
var thirdShardBuyable = {
    price: 5000,
    amount: 0,
    basePrice: 1000,
    power: 10,
    updateText: document.getElementById('shBuyableU3'),
}
var firstShardSingle = {
    price: 100000,
    amount: 0,
    updateText: document.getElementById('shSingleU1'),
    priceText: 'g'
}
var secondShardSingle = {
    price: 1e6,
    amount: 0,
    updateText: document.getElementById('shSingleU2'),
    priceText: 'g'
}
var thirdShardSingle = {
    price: 1e8,
    amount: 0,
    updateText: document.getElementById('shSingleU3'),
    priceText: 'g'
}
var fourthShardSingle = {
    price: 1e12,
    amount: 0,
    updateText: document.getElementById('shSingleU4'),
    priceText: 'g'
}
var fifthShardSingle = {
    price: 1e100,
    amount: 0,
    updateText: document.getElementById('shSingleU5'),
    priceText: 'g'
}
var sixthShardSingle = {
    price: 1e308,
    amount: 0,
    updateText: document.getElementById('shSingleU6'),
    priceText: 'g'
}
var shardUnlockablePerSecond = {
    bool: false,
    interval: '',
    percent: 0,
    consumedShards: 0,
    price: 1000,
    }
var shardUnlockableClick = {
    bool: false,
    interval: '',
    percent: 0,
    consumedShards: 0,
    price: 1000,
}
var shardUnlockableBuyables = {
    bool: false,
    interval: '',
    percent: 0,
    consumedShards: 0,
    price: 10000,
}
var shardUnlockableSingles = {
    bool: false,
    interval: '',
    percent: 0,
    consumedShards: 0,
    price: 100000,
}
var pinkCoin = {
    currency: 0,
    amount: 0,
    totalAmount: 0,
    price: 1,
    requirement: 5000,
    effect: 1,
    boost: 1,
}
var greenCoin = {
    currency: 0,
    amount: 0,
    totalAmount: 0,
    price: 1,
    requirement: 10,
    effect: 1,
    boost: 1,
}
var blueCoin = {
    currency: 0,
    amount: 0,
    totalAmount: 0,
    price: 1,
    requirement: 7500,
    effect: 1,
    boost: 1,
}
var greyCoin = {
    amount: 0,
    effect: 0,
    price: 1
}

function buyBuyableUpgrade(buyable, isAutoBuy) {
    buyable.amount != 0 ? buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount), challengeReward5)) : buyable.price = buyable.basePrice;
    if (!maxOrNoVar || isAutoBuy) {
        if (money >= buyable.price) {
            if ((!(challengeActivated[9] && amountsOfUpgrades >= 25)) && !challengeActivated[10]) {
                buyable.amount++; 
                money -= buyable.price; 
                buyable.baseEffect++;
                if (!challengeActivated[4]) buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount), challengeReward5))
                else buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, amountsOfUpgrades))
            }
        }
    }
    else {
        while (money >= buyable.price && !(challengeActivated[9] && amountsOfUpgrades >= 25) && !challengeActivated[10]) {
            buyable.amount++; 
            money -= buyable.price; 
            buyable.baseEffect++;
            if (!challengeActivated[4]) buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount), challengeReward5))
            else buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, amountsOfUpgrades))
            amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount
            const singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
            for (let i = 0; i < singleArray.length; i++) {
                if (singleArray[i].amount == 1)
                amountsOfUpgrades++
            }
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

function buyShopBuyable(item) {
    if (superCoins >= Math.round(item.price) && item.amount != item.max) {
        item.amount += item.bulkAmount
        superCoins -= Math.round(item.bulkPrice);
        spentSuperCoins += Math.round(item.bulkPrice);
        item.price = Math.round(item.baseprice*Math.pow(item.power, item.amount))
    }
}

function buyShopItem(item) {
    if (superCoins >= Math.round(item.price) && item.amount != item.max) {
        item.amount ++
        superCoins -= Math.round(item.price);
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
    resetShopBuyable(firstShopBuyable)
    resetShopBuyable(secondShopBuyable)
    resetShopBuyable(thirdShopBuyable)
    resetShopBuyable(fourthShopBuyable)
    resetShopBuyable(fifthShopBuyable)
    resetShopBuyable(sixthShopBuyable)
    resetShopBuyable(seventhShopBuyable)
    superCoins += spentSuperCoins
    spentSuperCoins = 0
}

function bulkBuyBuyable(buyable) {
    let bulkPrice = 0, moneyCheck = money, temp = 0
    for (let i = 0; i < 9999; i++) {
        let element = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount+i), challengeReward5))
        if (challengeActivated[4]) {
            element = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, amountsOfUpgrades+i), challengeReward5))
        }
        if (maxOrNoVar) {
            if (moneyCheck >= element) {
                buyable.price = element
                bulkPrice += buyable.price
                moneyCheck -= buyable.price
                temp++
            }
            else break
        }
        else {
            buyable.price = element
            bulkPrice = buyable.price
            if (money >= bulkPrice) temp = 1
            else temp = 0
            break
        }
    }
    buyable.bulkAmount = temp
    challengeActivated[4] ? buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, amountsOfUpgrades), challengeReward5)) : buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount), challengeReward5))
    if (bulkPrice == 0) {
        buyable.bulkPrice = buyable.price
        buyable.bulkAmount = 0
    }
    else {
        buyable.bulkPrice = bulkPrice
    }
}
function bulkBuyShopBuyable(item) {
    let x = shopBulkBuy, y = item.max-item.amount, z = 0; //x = 25, y = 100-86=14, z = 0 (real bulk)
    isNaN(x) ? x = 1 : x
    x < y ? z = x : z = y //25 < 14 ? z = 25 (true) : z = 14 (false), it's false so z = 14
    let bulkPrice = 0, superCoinsCheck = superCoins, temp = 0
    for (let i = 0; i < z; i++) {
        if (superCoinsCheck >= Math.round(item.baseprice*Math.pow(item.power, item.amount+i))) {
            item.price = Math.round(item.baseprice*Math.pow(item.power, item.amount+i))
            bulkPrice += item.price
            superCoinsCheck -= item.price
            temp++
        }
        else break
    }
    item.bulkAmount = temp
    item.price = Math.round(item.baseprice*Math.pow(item.power, item.amount))
    bulkPrice != 0 ? item.bulkPrice = bulkPrice : item.bulkPrice = item.price
}

function resetShopBuyable(buyable){
    buyable.amount = 0
    buyable.price = buyable.baseprice
}

function buyPrestigeBuyable (buyable) {
    buyable.amount != 0 ? buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)) : buyable.price = buyable.basePrice;
        if (crystals >= buyable.price) {
            buyable.amount++; 
            crystals -= buyable.price; 
            buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount))
        }
}
function buyPrestigeSingle(single) {
    if (crystals >= single.price && single.amount == 0) {
        single.amount++;
        crystals -= single.price;
        single.updateText.classList.add('purchased')
        single.priceText = ''
        amountOfPrestigeUpgrades++
    }
}

function buyShardBuyable(buyable) {
    buyable.amount != 0 ? buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)/thirdShardSingleEffect) : buyable.price = buyable.basePrice/thirdShardSingleEffect;
        if (shards >= buyable.price) {
            buyable.amount++; 
            shards -= buyable.price; 
            buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)/thirdShardSingleEffect)
        }
}

function buyShardSingle(single) {
    if (shards >= single.price && single.amount == 0) {
        single.amount++;
        shards -= single.price;
        single.updateText.classList.add('purchased')
        single.priceText = ''
    }
}
let shopBulkBuy = parseInt(shopBulkBuyInput.value)
var amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount 
var secondBuyableEffect = secondBuyable.baseEffect * Math.pow(Math.pow(Math.log(firstBuyable.amount+10), 2), fourthSingle.amount)
var firstBuyableEffect = firstBuyable.baseEffect * (1+(secondBuyableEffect/10))
var thirdBuyableEffect = Math.pow(2, thirdBuyable.baseEffect)
var fourthBuyableEffect = 1 - fourthBuyable.baseEffect * (Math.pow(Math.pow(Math.log(fourthBuyable.amount+10), 2), fifthSingle.amount))
var fifthBuyableEffect = 1+fifthBuyable.baseEffect*(Math.log10((gainPerSecond+10)/6))
var firstSingleEffect = 1-firstSingle.baseEffect+(firstSingle.baseEffect*(Math.log10(total+10)/1.4))
var secondSingleEffect = 1 - secondSingle.baseEffect+ (secondSingle.baseEffect*midasFormula)
var thirdSingleEffect = 1 - thirdSingle.baseEffect + (thirdSingle.baseEffect*2)
var fourthSingleEffect = 1 - fourthSingle.baseEffect +(fourthSingle.baseEffect*(Math.pow(Math.log10(firstBuyable.amount+10), 2)))
var fifthSingleEffect = 1 - fifthSingle.baseEffect + (fifthSingle.baseEffect*(Math.pow(Math.log10(fourthBuyable.amount+10), 2)))
var sixthSingleEffect = 1-sixthSingle.baseEffect+(sixthSingle.baseEffect*(Math.log10(gainPerClick+10)*2.33))
var seventhSingleEffect = 1 - seventhSingle.baseEffect+ (Math.pow((1 + 0.00083*gameTimer), achRow1.completion[6])*(1+ (Math.sqrt(amountsOfUpgrades))))
var eighthSingleEffect = eighthSingle.baseEffect + Math.pow(1 + (Math.pow((achCount-1) * 43, 0.5)), eighthSingle.amount)
var ninthSingleEffect = 1 - ninthSingle.baseEffect +(ninthSingle.baseEffect*(1 + (gameTimer/360000)))
var tenthSingleEffect = Math.pow(1.5, tenthSingle.baseEffect)
var midasPower = 1.125
var midasFormula = Math.log1p(Math.pow(Math.pow(clickCount, 1.5), midasPower))
var firstShopBuyableEffect = 0, secondShopBuyableEffect = 0, thirdShopBuyableEffect = 0, fourthShopBuyableEffect = 0, fifthShopBuyableEffect = 0, sixthShopBuyableEffect = 0, seventhShopBuyableEffect = 0
var firstPrestigeBuyableEffect, secondPrestigeBuyableEffect
var firstShardBuyableEffect = 1, secondShardBuyableEffect = 1, thirdShardBuyableEffect = [0, 0]
var firstShardSingleEffect = 1, secondShardSingleEffect = 1, thirdShardSingleEffect = 1, fourthShardSingleEffect = 1, fifthShardSingleEffect = 1, sixthShardSingleEffect = 1

function checkUpgradesText () {
    shopBulkBuy = parseInt(shopBulkBuyInput.value)
    amountsOfUpgrades = firstBuyable.amount + secondBuyable.amount + thirdBuyable.amount + fourthBuyable.amount + fifthBuyable.amount + firstBuyable.freeAmount
    const singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
            for (let i = 0; i < singleArray.length; i++) {
                if (singleArray[i].amount == 1)
                amountsOfUpgrades++
            }
    challengeCompleted[3] && !challengeActivate ? firstBuyable.freeAmount = Math.pow(1.43, achCount) : firstBuyable.freeAmount = 0
    firstBuyableEffect = (firstBuyable.baseEffect+firstBuyable.freeAmount) * (1+(secondBuyableEffect/10))
    secondBuyableEffect = secondBuyable.baseEffect * fourthSingleEffect
    thirdBuyableEffect = Math.pow(2, thirdBuyable.baseEffect)
    fifthBuyableEffect = 1+fifthBuyable.baseEffect/1000
    firstSingleEffect = 1-firstSingle.baseEffect+(Math.pow((firstSingle.baseEffect*(1+(Math.log10(1e15+10)/2.33))), ninthSingleEffect))
    secondSingleEffect = 1 - secondSingle.baseEffect + (secondSingle.baseEffect*midasFormula)
    thirdSingleEffect = 1 - thirdSingle.baseEffect + (thirdSingle.baseEffect*2)
    fourthSingleEffect = Math.pow(fourthSingle.baseEffect +(fourthSingle.baseEffect*(Math.pow((Math.log10(firstBuyable.amount+firstBuyable.freeAmount+10)/2), 1.8))), fourthSingle.amount)
    fifthSingleEffect = 1 - fifthSingle.baseEffect + (fifthSingle.baseEffect*(Math.pow(Math.log10(fourthBuyable.amount+10), 1.2)))
    fourthBuyableEffect = Math.pow(prestigeSinglesEffects[5], fourthBuyable.amount) * fifthSingleEffect
    sixthSingleEffect = 1-sixthSingle.baseEffect+(sixthSingle.baseEffect*(Math.log10(gainPerClick+10)/1.337))
    var sevEff
    seventhSingle.amount == 1 ? sevEff = Math.pow(1 + (0.2 * gameTimer/3600), achRow1.completion[6]) + Math.pow(amountsOfUpgrades+10, 0.9)/4.4 : sevEff = 1
    seventhSingleEffect = sevEff
    eighthSingleEffect = Math.pow((Math.pow((achCount-1) * 40, 0.3)), eighthSingle.amount)
    ninthSingleEffect = 1 - ninthSingle.baseEffect +(ninthSingle.baseEffect*(1 + (gameTimer/360000)))
    tenthSingleEffect = Math.pow(1.4, tenthSingle.baseEffect)
    midasFormula = Math.log1p(Math.pow(Math.pow(clickCount, 2), midasPower))
    if (prestigeSinglesEffects[6] == 0) {
    seventhSingleEffect = Math.min(sevEff, 100)
    }
    else seventhSingleEffect = softCap(seventhSingleEffect, 100, 0.5)

    ninthSingleEffect = Math.min(ninthSingleEffect, 1.25)

    achRow1.completion[5] ? secondBuyableEffect *= 1.1 : secondBuyableEffect = secondBuyableEffect
    achRow1.completion[8] ? midasPower = 1.175 : midasPower = 1.125

    firstShopBuyableEffect = firstShopBuyable.amount/50
    secondShopBuyableEffect = secondShopBuyable.amount/50
    thirdShopBuyableEffect = thirdShopBuyable.amount/66.66666
    fourthShopBuyableEffect = fourthShopBuyable.amount/100
    fifthShopBuyableEffect = fifthShopBuyable.amount/2.5
    sixthShopBuyableEffect = sixthShopBuyable.amount/25
    seventhShopBuyableEffect = seventhShopBuyable.amount/5

    bulkBuyShopBuyable(firstShopBuyable)
    bulkBuyShopBuyable(secondShopBuyable)
    bulkBuyShopBuyable(thirdShopBuyable)
    bulkBuyShopBuyable(fourthShopBuyable)
    bulkBuyShopBuyable(fifthShopBuyable)
    bulkBuyShopBuyable(sixthShopBuyable)
    bulkBuyShopBuyable(seventhShopBuyable)

    firstPrestigeBuyableEffect = Math.pow(2, firstPrestigeBuyable.amount)
    secondPrestigeBuyableEffect = Math.pow(3, secondPrestigeBuyable.amount)

    firstShardBuyableEffect = Math.pow(2, firstShardBuyable.amount)*secondShardSingleEffect
    secondShardBuyableEffect = Math.pow(3, secondShardBuyable.amount)*secondShardSingleEffect
    thirdShardBuyableEffect[0] = Math.pow(2, thirdShardBuyable.amount)
    thirdShardBuyableEffect[1] = Math.pow(1.75, thirdShardBuyable.amount)
    firstShardSingleEffect = Math.pow(1 + Math.log10(shards+10)/1.2, firstShardSingle.amount)
    secondShardSingleEffect = Math.pow(1 + Math.pow(brokenCrystals, 0.175), secondShardSingle.amount)
    thirdShardSingleEffect = Math.pow(1 + Math.pow(crystals, 0.3), thirdShardSingle.amount)
    fourthShardSingleEffect = Math.pow(1 + Math.log10(Math.log10(shards+10)+10)/5, fourthShardSingle.amount)
    fifthShardSingleEffect = 1, sixthShardSingleEffect = 1

    !challengeActivate && challengeCompleted[4] ? challengeReward5 = 0.9 : challengeReward5 = 1

    priceReset(firstShardBuyable)
    priceReset(secondShardBuyable)
    priceReset(thirdShardBuyable)

    bulkBuyBuyable(firstBuyable)
    bulkBuyBuyable(secondBuyable)
    bulkBuyBuyable(thirdBuyable)
    bulkBuyBuyable(fourthBuyable)
    bulkBuyBuyable(fifthBuyable)

    priceUpdate(firstBuyable) 
    priceUpdate(secondBuyable) 
    priceUpdate(thirdBuyable) 
    priceUpdate(fourthBuyable) 
    priceUpdate(fifthBuyable) 

    firstSingle.price = 1e5
    secondSingle.price = 3e6
    thirdSingle.price = 5e6
    fourthSingle.price = 2.5e7
    fifthSingle.price = 6.5e8
    sixthSingle.price = 5e9
    seventhSingle.price = 5e10
    eighthSingle.price = 7e11
    ninthSingle.price = 2e12
    tenthSingle.price = 1e13

    if (isTriplePowerEvent) {
        pinkCoin.effect = (pinkCoin.totalAmount/40)*pinkCoin.boost
        greenCoin.effect = (greenCoin.totalAmount/5)*greenCoin.boost
        blueCoin.effect = (blueCoin.totalAmount/50)*blueCoin.boost

        pinkCoin.requirement = 5000
        greenCoin.requirement = 10
        blueCoin.requirement = 7500

    if (greyCoin.effect >= 5) greyCoin.price = 999

        pinkCoin.requirement = Math.round(pinkCoin.requirement-pinkCoin.requirement/10*greyCoin.effect)
        greenCoin.requirement = Math.round(greenCoin.requirement-greenCoin.requirement/10*greyCoin.effect)
        blueCoin.requirement = Math.round(blueCoin.requirement-blueCoin.requirement/10*greyCoin.effect)

        greyCoin.amount = Math.min(pinkCoin.amount, greenCoin.amount, blueCoin.amount)
    }
    else  {
        pinkCoin.currency = 0
        greenCoin.currency = 0
        blueCoin.currency = 0
        pinkCoin.totalAmount = 0
        greenCoin.totalAmount = 0
        blueCoin.totalAmount = 0
        pinkCoin.amount = 0
        greenCoin.amount = 0
        blueCoin.amount = 0
        greyCoin.amount = 0
    }

    if (challengeActivated[4]) {
        const singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
        for (let i = 0; i < singleArray.length; i++){
            singleArray[i].price = singleArray[i].price * Math.pow(10, amountsOfUpgrades)
        }
    }

    if (challengeActivated[5]) {
        const singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
            for (let i = 0; i < singleArray.length; i++){
                singleArray[i].price = singleArray[i].price / Math.pow(Math.log10(10+prestigeClicks), Math.log10(10+prestigeClicks*prestigeClicks))
            }
    }
}

function priceUpdate(buyable) {
    if (!challengeActivated[4]) buyable.price = Math.round(Math.pow(buyable.basePrice*Math.pow(buyable.power, buyable.amount), challengeReward5))
    else buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, amountsOfUpgrades))
}

function priceReset(buyable) {
    buyable.price = Math.round(buyable.basePrice*Math.pow(buyable.power, buyable.amount)/thirdShardSingleEffect)
}

function checkPrestigeMilestone(id, count, index) {
    let element = document.getElementById(id)
    if (prestigeCount >= count) {
        element.classList.add('completed')
        prestigeMilestonesEffects[index] = true
    }
    else {
        element.classList.remove('completed')
        prestigeMilestonesEffects[index] = false
    }

}

var prestigeSinglesEffects = [10, 1, [1, 1], 2, 0, 1.05, 0, 0.045, 1, 1, [0.4, 0.5], 0, [0, 0]]
var prestigeMilestonesEffects = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
function prestigeSingleEffect() {
    const prestigeSingleBoolean = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    const prestigeSingleNames = [firstPrestigeSingle, secondPrestigeSingle, thirdPrestigeSingle, fourthPrestigeSingle,
    fifthPrestigeSingle, sixthPrestigeSingle, seventhPrestigeSingle, eighthPrestigeSingle,
    ninthPrestigeSingle, tenthPrestigeSingle, eleventhPrestigeSingle, twelfthPrestigeSingle,
    thirteenthPrestigeSingle, fourteenthPrestigeSingle, fifteenthPrestigeSingle, sixteenthPrestigeSingle]
    const milestoneGoals = [1,2,3,4,5,10,15,20,25,30,40,50,60,75,100,500,1000,5000,10000,100000]
    for (let i = 0; i < prestigeSingleNames.length; i++) {
        if (prestigeSingleNames[i].amount === 1) prestigeSingleBoolean[i] = true
    }
    prestigeSingleBoolean[0] ? prestigeSinglesEffects[0] = 1000 : prestigeSinglesEffects[0]
    prestigeSingleBoolean[1] ? prestigeSinglesEffects[1] = Math.pow(Math.log10(gameTimer+10), 0.01): prestigeSinglesEffects[1]
    prestigeSingleBoolean[2] ? prestigeSinglesEffects[2][0] = 1.5 : prestigeSinglesEffects[2][0]
    prestigeSingleBoolean[2] ? prestigeSinglesEffects[2][1] = 2 : prestigeSinglesEffects[2][1]
    prestigeSingleBoolean[3] ? prestigeSinglesEffects[3] = 2.5 : prestigeSinglesEffects[3]
    prestigeSingleBoolean[4] ? prestigeSinglesEffects[4] = 1 : prestigeSinglesEffects[4]
    prestigeSingleBoolean[5] ? prestigeSinglesEffects[5] = 1.075 : prestigeSinglesEffects[5]
    prestigeSingleBoolean[6] ? prestigeSinglesEffects[6] = 1 : prestigeSinglesEffects[6]
    prestigeSingleBoolean[7] ? prestigeSinglesEffects[7] = 0.05 : prestigeSinglesEffects[7]
    if (!achRow1.completion[16]){
        prestigeSingleBoolean[8] ? prestigeSinglesEffects[8] = Math.max(2*(1-(0.01/6)*prestigeTimer), 1) : prestigeSinglesEffects[8]
    }
    else prestigeSingleBoolean[8] ? prestigeSinglesEffects[8] = Math.max(10*(1-(0.01/6.6666666667)*prestigeTimer), 1) : prestigeSinglesEffects[8]
    prestigeSingleBoolean[9] ? prestigeSinglesEffects[9] = Math.log10(prestigeTimer+10) : prestigeSinglesEffects[9]
    prestigeSingleBoolean[10] ? prestigeSinglesEffects[10][0] = 0.45 : prestigeSinglesEffects[10][0]
    prestigeSingleBoolean[10] ? prestigeSinglesEffects[10][1] = 0.55 : prestigeSinglesEffects[10][1]
    prestigeSingleBoolean[11] ? prestigeSinglesEffects[11] = 10 : prestigeSinglesEffects[11]
    prestigeSingleBoolean[12] ? prestigeSinglesEffects[12][0] = 1 : prestigeSinglesEffects[12][0]
    prestigeSingleBoolean[13] ? prestigeSinglesEffects[12][0] = 2 : prestigeSinglesEffects[12][0]
    prestigeSingleBoolean[14] ? prestigeSinglesEffects[12][0] = 3 : prestigeSinglesEffects[12][0]
    prestigeSingleBoolean[15] ? prestigeSinglesEffects[12][0] = 4 : prestigeSinglesEffects[12][0]
    prestigeSingleBoolean[15] ? prestigeSinglesEffects[12][1] = 1 : prestigeSinglesEffects[12][1]
    
    baseUmult = prestigeSinglesEffects[3]
    baseUpow = prestigeSinglesEffects[7]

    for (let i = 1; i < milestoneGoals.length+1; i++) {
        checkPrestigeMilestone(`pMilestone${i}`, milestoneGoals[i-1], i-1)
    }
    if (prestigeMilestonesEffects[9]) {
        prestigeSpecialRow.style.display = 'flex'
    }
    prestigeMilestonesEffects[1] ? singleAutomationContainer.style.display = 'flex' : singleAutomationContainer.style.display = 'none'
    prestigeMilestonesEffects[2] ? buyableAutomationContainer.style.display = 'flex' : buyableAutomationContainer.style.display = 'none'
    prestigeMilestonesEffects[3] ? umultiplierAutomationContainer.style.display = 'flex' : umultiplierAutomationContainer.style.display = 'none'
    prestigeMilestonesEffects[4] ? upowerAutomationContainer.style.display = 'flex' : upowerAutomationContainer.style.display = 'none'
    prestigeMilestonesEffects[7] ? prestigeAutomationContainer.style.display = 'flex' : prestigeAutomationContainer.style.display = 'none'
}


function singleUpgradePurchased () {
    const singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (let i = 0; i < singleArray.length; i++){
        if (singleArray[i].amount == 1) {singleArray[i].updateText.classList.add('purchased')}
    }
    const prestigeSingleArray = [firstPrestigeSingle, secondPrestigeSingle, thirdPrestigeSingle, fourthPrestigeSingle, fifthPrestigeSingle, sixthPrestigeSingle, seventhPrestigeSingle, eighthPrestigeSingle, ninthPrestigeSingle, tenthPrestigeSingle, eleventhPrestigeSingle, twelfthPrestigeSingle, thirteenthPrestigeSingle, fourteenthPrestigeSingle, fifteenthPrestigeSingle, sixteenthPrestigeSingle]
    for (let i = 0; i < prestigeSingleArray.length; i++){
        if (prestigeSingleArray[i].amount == 1) {prestigeSingleArray[i].updateText.classList.add('purchased')}
        else {prestigeSingleArray[i].updateText.classList.remove('purchased')}
    }

    const shardSingleArray = [firstShardSingle, secondShardSingle, thirdShardSingle, fourthShardSingle, fifthShardSingle, sixthShardSingle]
    for (let i = 0; i < shardSingleArray.length; i++){
        if (shardSingleArray[i].amount == 1) {shardSingleArray[i].updateText.classList.add('purchased')}
    }
}


document.addEventListener("keydown", function(event) {
    if ((event.key == "M" || event.key == "m" || event.key == "ь" || event.key == "Ь") && clickCount >= 1000) {
    maxBuyAll();
    }
});




function maxBuyAll () {
    let singleArray2 = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    let buyableArray = [firstBuyable, secondBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (let i = 0; i < singleArray2.length; i++) {
        while (money >= singleArray2[i].price && singleArray2[i].amount != 1 && !challengeActivated[0] && !(challengeActivated[9] && amountsOfUpgrades >= 25) && !challengeActivated[10]) {
            buySingleUpgrade(singleArray2[i])
        }
    }
    let minimal = Math.min(firstBuyable.price, secondBuyable.price, thirdBuyable.price, fourthBuyable.price, fifthBuyable.price);
    while (money >= minimal && !challengeActivated[5] && !(challengeActivated[9] && amountsOfUpgrades >= 25) && !challengeActivated[10]) {
        for (let i = 0; i < buyableArray.length; i++) {
            buyBuyableUpgrade(buyableArray[i]);
            minimal = Math.min(firstBuyable.price, secondBuyable.price, thirdBuyable.price, fourthBuyable.price, fifthBuyable.price);
        }
    }
    didMaxBuy = true
}

function maxBuyAllPrestige() {
    let buyableArray = [firstPrestigeBuyable, secondPrestigeBuyable]
    let minimal = Math.min(firstPrestigeBuyable.price, secondPrestigeBuyable.price);
    while (crystals >= minimal) {
        for (let i = 0; i < buyableArray.length; i++) {
            buyPrestigeBuyable(buyableArray[i]);
            minimal = Math.min(firstPrestigeBuyable.price, secondPrestigeBuyable.price);
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

function autoBuySingle() {
    let singleArray2 = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (let i = 0; i<singleArray2.length; i++) {
        if (singleArray2[i].amount == 0 && !challengeActivated[0] && !(challengeActivated[9] && amountsOfUpgrades >= 25) && !challengeActivated[10]) {
            buySingleUpgrade(singleArray2[i])
            break;
        }
    }
}

function autoBuyBuyable () {
    if (!challengeActivated[5]) {
    for (let i = 0; i < buyableInterval.effect; i++) {
    buyBuyableUpgrade(firstBuyable, true)
    buyBuyableUpgrade(secondBuyable, true)
    buyBuyableUpgrade(thirdBuyable, true)
    buyBuyableUpgrade(fourthBuyable, true)
    buyBuyableUpgrade(fifthBuyable, true)
    }
}
}

function decreaseInterval(type, divider, string) {
    if (crystals >= type.price && type.time !== 50) {
        crystals -= type.price
        type.price *= 2;
        type.time /= divider;
        type.time = Math.max(type.time, 50);
        if (string == 'single') {
            if (autoSetIntervals[0]) {
                clearInterval(autoSetIntervals[0])
                autoSetIntervals[0] = setInterval(autoBuySingle, singleInterval.time); 
            }
        }
        if (string == 'buyable') {
            if (autoSetIntervals[1]) {
                clearInterval(autoSetIntervals[1])
                autoSetIntervals[1] = setInterval(autoBuyBuyable, buyableInterval.time);
            }
        }       
        if (string == 'umultiplier') {
            if (autoSetIntervals[2]) {
                clearInterval(autoSetIntervals[2])
                autoSetIntervals[2] = setInterval(doUmulti, umultiplierInterval.time); 
            }
        }        
        if (string == 'upower') {
            if (autoSetIntervals[3]) {
                clearInterval(autoSetIntervals[3])
                autoSetIntervals[3] = setInterval(doUpower, upowerInterval.time); 
            }
        }        
        if (string == 'prestige') {
            if (autoSetIntervals[4]) {
                clearInterval(autoSetIntervals[4])
                autoSetIntervals[4] = setInterval(doPrestigeReset, prestigeInterval.time);
            }
        }
    }
}
function increaseBulkBuy(type, effect, string) {
    if (crystals >= type.price && type.effect <= 512) {
        crystals -= type.price
        type.price *= 2;
        type.effect *= 2
        type.effect = Math.min(type.effect, 512);
    }
}

    singleCheckbox.addEventListener('change', function() {
            if (this.checked) { 
                autoSetIntervals[0] = setInterval(autoBuySingle, singleInterval.time); 
            } else { 
            clearInterval(autoSetIntervals[0])
            autoSetIntervals[0] = ''
            }
            return autoSetIntervals[0];
            });
    buyableCheckbox.addEventListener('change', function() {
            if (this.checked) {
                autoSetIntervals[1] = setInterval(autoBuyBuyable, buyableInterval.time);
            } else {
            clearInterval(autoSetIntervals[1])
            autoSetIntervals[1] = ''
            }
            return autoSetIntervals[1];
            });
    umultiplierCheckbox.addEventListener('change', function() {
            if (this.checked && !(umultiplierInterval.time == 50)) {
                autoSetIntervals[2] = setInterval(doUmulti, umultiplierInterval.time);
            } else if (this.checked && umultiplierInterval.time == 50) {
                uMultiReautomate()
            } else {
            clearInterval(autoSetIntervals[2]);
            autoSetIntervals[2] = ''
            }
            return autoSetIntervals[2];
            });
    upowerCheckbox.addEventListener('change', function() {
            if (this.checked && !(upowerInterval.time == 50)) {
                autoSetIntervals[3] = setInterval(doUpower, upowerInterval.time);
            } else if (this.checked && upowerInterval.time == 50) {
                uPowerReautomate()
            } else {
            clearInterval(autoSetIntervals[3]);
            autoSetIntervals[3] = ''
            }
            return autoSetIntervals[3];
            });
    prestigeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if ((!prestigeMilestonesEffects[13]) || prestigeInterval.time != 50) {
                    autoSetIntervals[4] = setInterval(doPrestigeReset, prestigeInterval.time);
                } else if (prestigeMilestonesEffects[13]) {
                    reautomate()
                }
            }
            else {
            clearInterval(autoSetIntervals[4]);
            autoSetIntervals[4] = ''
            }
            return autoSetIntervals[4];
            });

function changePrestigeMode() {
    if (whichPrestigeMode == 'time') {
        autoPrestigeMode.innerHTML = autoPrestigeCoins
        whichPrestigeMode = 'coins'
        autoPrestigeInput.value = prestigeConditionCoins
    }
    else {
        autoPrestigeMode.innerHTML = autoPrestigeTime
        whichPrestigeMode = 'time'
        autoPrestigeInput.value = prestigeConditionTime
    }
}

function changeInputValue() {
    if (whichPrestigeMode == 'time') autoPrestigeInput.value = prestigeConditionTime
    else autoPrestigeInput.value = prestigeConditionCoins
}

autoPrestigeInput.addEventListener("blur", ()=>{
        if (whichPrestigeMode == 'time' && autoPrestigeInput.value !='') prestigeConditionTime = autoPrestigeInput.value
        else if (whichPrestigeMode == 'coins' && autoPrestigeInput.value != '') prestigeConditionCoins = autoPrestigeInput.value
        reautomate()
    });

autoUmultiInput.addEventListener("blur", ()=>{
    autoUmultiInput.value = parseFloat(autoUmultiInput.value)
    uMultiReautomate()
});

autoUpowerInput.addEventListener("blur", ()=>{
    autoUpowerInput.value = parseFloat(autoUpowerInput.value)
    uPowerReautomate()
});

autoUpowerInput2.addEventListener("blur", ()=>{
    autoUpowerInput2.value = parseFloat(autoUpowerInput2.value)
    uPowerReautomate()
});


function reautomate() {
        if (autoSetIntervals[4] != ''){
            clearInterval(autoSetIntervals[4]);
            autoSetIntervals[4] = ''
        }
        if (prestigeCheckbox.checked) {
            autoSetIntervals[4] = setInterval(()=>{
                if (whichPrestigeMode == 'time') {
                    if (prestigeTimer >= prestigeConditionTime) {
                        doPrestigeReset()
                    }
                }
                else {
                    if (money >= prestigeConditionCoins) {
                        doPrestigeReset()
                    }
                }
            }, prestigeInterval.time)
        } else {
        clearInterval(autoSetIntervals[4]);
        autoSetIntervals[4] = ''
        }
        return autoSetIntervals[4];
}

function uMultiReautomate() {
    if (autoSetIntervals[2] != ''){
        clearInterval(autoSetIntervals[2]);
        autoSetIntervals[2] = ''
    }
    if (umultiplierCheckbox.checked) {
        autoSetIntervals[2] = setInterval(()=> {
            if (umultiplierTimer >= autoUmultiInput.value) {
                doUmulti();

            }
        }, 50)
    }
    else {
        clearInterval(autoSetIntervals[2]);
        autoSetIntervals[2] = ''
    }
    return autoSetIntervals[2]
}

function uPowerReautomate() {
    if (autoSetIntervals[3] != ''){
        clearInterval(autoSetIntervals[3]);
        autoSetIntervals[3] = ''
    }
    if (upowerCheckbox.checked) {
        autoSetIntervals[3] = setInterval(()=> {
            if ((upowerTimer >= autoUpowerInput.value) && umultipliercount >= autoUpowerInput2.value) {
                doUpower();
            }
        }, 50)
    }
    else {
        clearInterval(autoSetIntervals[3]);
        autoSetIntervals[3] = ''
    }
    return autoSetIntervals[3]
}

howMuchCrystalsInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
    submitTheBreak()
    }
});

function breakTheCrystal() {
    let valueTemp = parseFloat(howMuchCrystalsInput.value)
    let temp
    shardsTemp = 0
    if ((howMuchCrystalsInput.value).includes('%')){
        temp = crystals - (crystals * (valueTemp / 100))
        brokenCrystalsTemp = crystals - temp
        crystals = Math.floor(temp)
    }
    else {
        brokenCrystalsTemp = valueTemp
        crystals -= valueTemp
    }
    if (brokenCrystalsTemp < 1e6) {
        for (let i = 0; i < brokenCrystalsTemp; i++) {
            shardsTemp += randomNumber(shardChanceMinimum, shardChanceMaximum)
            if (shards == 0) {
                shardsTemp = 100
            }
        }
    }
    else shardsTemp = ((shardChanceMinimum+shardChanceMaximum)/2)*brokenCrystalsTemp
    shards += shardsTemp
    brokenCrystals += brokenCrystalsTemp
}

function submitTheBreak() {
    let valueTemp = parseFloat(howMuchCrystalsInput.value)
    if (((howMuchCrystalsInput.value).includes('%') && valueTemp <= 100 || (!(howMuchCrystalsInput.value).includes('%') && valueTemp <= crystals)) && !(howMuchCrystalsInput.value).includes('-')) {
        openWindow('submit', true)
        breakTheCrystal()
    }
    else {
        openWindow('falseSubmit', true)
    }
}
