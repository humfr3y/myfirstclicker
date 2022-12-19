var money = 10;
var total = 10;
var doubleprice=10; 
var multiprice=100; 
var db=0;
var mb=0; 
var amount=0;
var mamount=0;
var mboost=1;
document.write("My 1st Clicker 0.1 by Humfrey");
var data=confirm("Do you want to change language for Russian? / Хотите ли вы изменить язык на русский?")
var rus = false;
    if (data) {rus=true}
    else {rus=false}

function monetka() {
    money = money+1+(db*mboost);
    total = total+1+(db*mboost);
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы получили за нажатие " + ((db*mboost)+1).toFixed(2)+ " монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You've earned for a click " + ((db*mboost)+1).toFixed(2) + " coins";}
    if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
    else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
};
function doubleboost(ele2) {
    if (amount>=1) {doubleprice=((amount+1)*9.8)} else doubleprice=10;
    if (money>=doubleprice) 
    {amount=amount+1; money=money - doubleprice; db=db+1
    if (data) {ele2.innerHTML = "Улучшение даёт +" + db + " монет за нажатие. Чтобы улучшить его вам нужно " + (doubleprice+10).toFixed(0) + " монет."} 
    else {ele2.innerHTML = "Upgrade gives +" + db + " coins per click. You need for next upgrade " + (doubleprice+10).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили первое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought first upgrade.";}}
    return amount, db;
};
function multiboost(ele3) {
    if (mamount==0) {mboost=1} 

    if (money>multiprice) 
    {mamount++; mb++; money=money-multiprice;
    if (data) {ele3.innerHTML = "Улучшение увеличивает бонус первого улучшения на +" + (mamount*10) + "%. Чтобы улучшить его вам нужно " + (multiprice+100).toFixed(0) + " монет."} 
    else {ele3.innerHTML = "Upgrade increases first upgrade bonus by +" + (mamount*10) + "%. You need for next upgrade " + (multiprice+100).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили второе улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought second upgrade.";}};
    if (mamount>=1) {mboost=1+(mb/10)};
    if (mamount>=1) {multiprice=(mamount+1)*94.9} else {multiprice=100};
    return mamount, mb, mboost;
}
function savezone (e) {
if (localStorage)
    {
        if (confirm("Хотите ли сохранить игру? / Do you want save the game?"))
        {
            localStorage["money_mfs_count"] = money;
            localStorage["1st_mfs_count"] = amount;
            localStorage["2nd_mfs_count"] = mamount;
            localStorage["db_mfs_count"] = db;
            localStorage["mb_mfs_count"] = mb;
            localStorage["total_mfs_count"] = total;
            localStorage["mboost_mfs_count"] = mboost;
        }
    }
}
function loadzone () {
    if (localStorage)   {
        if (confirm("Хотите ли вы загрузить игру? / Do you want load the game?"))
        {
        var savedmoney = localStorage["money_mfs_count"];
        var saved1st = localStorage["1st_mfs_count"];
        var saved2nd = localStorage["2nd_mfs_count"];
        var saveddb = localStorage["db_mfs_count"];
        var savedmb = localStorage["mb_mfs_count"];
        var savedtotal = localStorage["total_mfs_count"];
        var savedmboost = localStorage["mboost_mfs_count"];
        if (savedmoney != null) money=Number(savedmoney);
        if (saved1st != null) amount=Number(saved1st);
        if (saved2nd != null) mamount=Number(saved2nd);
        if (saveddb != null) db=Number(saveddb);
        if (savedmb != null) mb=Number(savedmb);
        if (savedtotal != null) total=Number(savedtotal);
        if (savedmboost != null) mboost=Number(savedmboost);
        if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы получаете за нажатие " + ((db*mboost)+1).toFixed(2)+ " монет";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You've earning for a click " + ((db*mboost)+1).toFixed(2) + " coins";};
        }
    }
}
function changelog(){
    
}