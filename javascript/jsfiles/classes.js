class commonupgrade {
    constructor(amount, price, b, boost) { //bf - boost formula
        this.amount = amount;
        this.price = price;
        this.b = b;
        this.boost = boost;
    }
}
class singleupgrade {
    constructor(price, x, amount) {
        this.price = price;
        this.x = x;
        this.amount = amount;
    }
}
var first = new commonupgrade(0, 10, 0, 0) //amount, doubleprice, db, 0, boost formula
var second = new commonupgrade(0, 100, 0, 1) //mamount, multiprice, mb, mboost
var third = new commonupgrade(0, 1000, 0, 0) //famount, fiveprice, fb, nboost
var fourth = new singleupgrade(10000, 1, 0) //стоимость и буст
var fifth = new singleupgrade(1200000, 1, 0)
var sixth = new singleupgrade(15000000, 1, 0)