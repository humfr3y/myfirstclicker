var money = 10;
var doubleprice=10; 
var multiprice=100; 
var boostprice=0;
var db=0;
var mb=0; 
var bb=0; 
var amount=0;
var mamount=0;
var z=0;
var mboost=1;
document.write("My 1st Clicker");

function monetka() {
    console.clear();
    money = money+1+(db*mboost);
    console.log("Долларов: " + money.toFixed(2) + ". + " + ((db*mboost)+1).toFixed(2) + " долларов в копилку!");
};
function doubleboost() {
    if (amount>=1) {doubleprice=(amount+1)*10} else doubleprice=10;
    if (money>=doubleprice) {amount=amount+1; money=money - doubleprice; db=db+1; console.log("Спасибо за покупку! Теперь вам дают " + (db+1) + " за клик! Следующая покупка обойдётся вам в " + (doubleprice+10) + " долларов!")} else console.log("Недостаточно долларов! Нужно " + (doubleprice) + "!")
    return doubleprice;
};
function multiboost() {
    mboost=1.1+(mb/10);
    if (mamount>=1) {multiprice=(mamount+1)*100} else multiprice=100;
    if (money>=multiprice) {mb=mb+1 ;mamount=mamount+1; money=money-multiprice; console.log("Спасибо за покупку! Теперь ваше первое улучшение умножено на x" + mboost.toFixed(1) + "! Следующая покупка стоит " + (multiprice+100) + " долларов!")} else console.log("Недостаточно долларов! Нужно " + (multiprice) + "!")
}
