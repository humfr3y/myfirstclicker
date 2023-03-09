class commonUpgrade {
    constructor(amount, price, b, boost, basePrice) { //bf - boost formula
        this.amount = amount;
        this.price = price;
        this.b = b;
        this.boost = boost;
        this.basePrice = basePrice
    }
}
class singleUpgrade {
    constructor(price, x, amount) {
        this.price = price;
        this.x = x;
        this.amount = amount;
    }
}
class prestigeBuyableUpgrade {
    constructor(amount, price, boost, basePrice) { //bf - boost formula
        this.amount = amount;
        this.price = price;
        this.boost = boost;
        this.basePrice = basePrice
    }
}
class prestigeAutoUpgrade {
    constructor(amount, price) { 
        this.amount = amount;
        this.price = price;
    }
}
class prestigeSingleUpgrade {
    constructor(price, boost, amount) {
        this.price = price;
        this.boost = boost;
        this.amount = amount;
    }
}
var first = new commonUpgrade(0, 10, 0, 0, 10) //amount, doubleprice, db, 0, boost formula
var second = new commonUpgrade(0, 100, 0, 1, 100) //mamount, multiprice, mb, mboost
var third = new commonUpgrade(0, 1000, 0, 1, 1000) //famount, fiveprice, fb, fboost
var fourth = new singleUpgrade(10000, 1, 0) //стоимость и буст
var fifth = new singleUpgrade(1200000, 1, 0)
var sixth = new singleUpgrade(5000000, 1, 0)
var pbfirst = new prestigeBuyableUpgrade(0, 2, 1, 2)
var pbsecond = new prestigeBuyableUpgrade(0, 10, 1, 10)
var pbthird = new prestigeBuyableUpgrade(0, 50, 1, 50)
var pbfourth = new prestigeBuyableUpgrade(0, 500, 1, 1000)
var pafirst = new prestigeAutoUpgrade(0, 1000)
var pasecond = new prestigeAutoUpgrade(0, 2500)
var pathird = new prestigeAutoUpgrade(0, 5000)
var pafourth = new prestigeAutoUpgrade(0, 15000)
var psfirst = new prestigeSingleUpgrade(50000, 1, 0)
var pssecond = new prestigeSingleUpgrade(1000000, 1, 0)
var psthird = new prestigeSingleUpgrade(10000000, 1, 0)
var psfourth = new prestigeSingleUpgrade(1000000000, 0, 0)