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
var first = new commonUpgrade(0, 10, 0, 0, 10) //amount, doubleprice, db, 0, boost formula
var second = new commonUpgrade(0, 100, 0, 1, 100) //mamount, multiprice, mb, mboost
var third = new commonUpgrade(0, 1000, 0, 1, 1000) //famount, fiveprice, fb, fboost
var fourth = new singleUpgrade(10000, 1, 0) //стоимость и буст
var fifth = new singleUpgrade(1200000, 1, 0)
var sixth = new singleUpgrade(5000000, 1, 0)