var money = 10;
var total = 10;
var gain = 1
var doubleprice=10; 
var multiprice=100; 
var db=0;
var mb=0;
var fb=0 
var amount=0;
var mamount=0;
var famount=0;
var mboost=1;
var fboost=0;
var autosaving=false
document.write("My 1st Clicker 0.3 by Humfrey"); //will be removed
var data=confirm("Do you want to change language for Russian? / Хотите ли вы изменить язык на русский?")
var rus = false;                //язык
    if (data) {rus=true}
    else {rus=false}

window.setInterval(savezone2, 10000); //таймер

function monetka() {
    money = money+1*(1+fboost)+(db*mboost);
    total = total+1*(1+fboost)+(db*mboost);
    gain = 1*(1+fboost)+(db*mboost)
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы получили за нажатие " + (gain).toFixed(0)+ " монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You've earned for a click " + (gain).toFixed(0) + " coins";}
    if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
    else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
    return gain;
};
function doubleboost(ele2) {
    if (amount>=1) {doubleprice=Math.round(10+((amount+1)*10*Math.log(amount+1)/1.85))} else doubleprice=10;
    if (mamount>=1) {mboost=1+(mb/10)};
    if (money>=doubleprice) 
    {amount=amount+1; money=money - doubleprice; db=db+1
    if (data) {ele2.innerHTML = "Улучшение даёт +" + (db*mboost).toFixed(1) + " монет за нажатие. Чтобы улучшить его вам нужно " + (Math.round(10+((amount+1)*10*Math.log(amount+1)/1.85))).toFixed(0) + " монет."} 
    else {ele2.innerHTML = "Upgrade gives +" + db*mboost + " coins per click. You need for next upgrade " + (Math.round(10+((amount+1)*10*Math.log(amount+1)/1.85))).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили первое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought first upgrade.";}}
    return amount, db, doubleprice;
};
function multiboost(ele3) {
    if (mamount==0) {mboost=1} 
    if (mamount>=1) {mboost=1+(mb/10)};
    if (mamount>=1) {multiprice=Math.round(100+((mamount+1)*100*Math.log(mamount+1)/2.25))} else {multiprice=100};
    if (money>multiprice) 
    {mamount++; mb++; money=money-multiprice;
    
    if (data) {ele3.innerHTML = "Улучшение увеличивает бонус первого улучшения на +" + (mamount*10) + "%. Чтобы увеличить бонус на 10% вам нужно " + (Math.round(100+((mamount+1)*100*Math.log(mamount+1)/2.25))).toFixed(0) + " монет."} 
        else {ele3.innerHTML = "Upgrade increases first upgrade bonus by +" + (mamount*10) + "%. You need for next upgrade " + (Math.round(100+((mamount+1)*100*Math.log(mamount+1)/2.25))).toFixed(0) + " coins."};
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили второе улучшение.";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought second upgrade.";}};
    return mamount, mb, mboost, multiprice;
};
function fiveboost(ele4) {
    if (famount==0) {fboost=0} 
    if (famount>=1) {fboost=(fb/20)};
    if (famount>=1) {fiveprice=Math.round(1000+((famount+1)*1000*Math.log(famount+1)/2.9))} else fiveprice=1000;
    if (money>=fiveprice) 
    {famount=famount+1; money=money - fiveprice; fb=fb+1;
    if (data) {ele4.innerHTML = "Улучшение увеличивает монеты за клик на +" + ((fb/20)*100).toFixed(0) + "%. Чтобы улучшить его вам нужно " + Math.round(1000+((famount+1)*1000*Math.log(famount+1)/2.9)).toFixed() + " монет."} 
    else {ele4.innerHTML = "Upgrade increases coin gain by +" + ((fb/20)*100).toFixed(0) + "%. You need for next upgrade " + Math.round(1000+((famount+1)*1000*Math.log(famount+1)/2.9)).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили третье улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought third upgrade.";}}
    if (famount>=1) {fboost=(fb/20)};
    return famount, fb, fiveprice, fboost;
};
function saveorno(ele5){
    if (!autosaving) 
    {
        autosaving=true;
        if (data) {ele5.innerHTML = "Автосохранение вкл. Оно происходит каждые 10с."}
        else {ele5.innerHTML = "Autosave on. Game autosaves every 10s."}
    } 
    else {
        autosaving=false;
        if (data) {ele5.innerHTML = "Автосохранение выкл."}
        else {ele5.innerHTML = "Autosave off."}
    }
}































































function savezone () {
if (localStorage)
    {
        if (confirm("Хотите ли сохранить игру? / Do you want save the game?"))
        {
            localStorage["money_mfs_count"] = money;
            localStorage["double_mfs_count"] = doubleprice;
            localStorage["multi_mfs_count"] = multiprice;
            localStorage["five_mfs_count"] = fiveprice;
            localStorage["1st_mfs_count"] = amount;
            localStorage["2nd_mfs_count"] = mamount;
            localStorage["3rd_mfs_count"] = famount;
            localStorage["db_mfs_count"] = db;
            localStorage["mb_mfs_count"] = mb;
            localStorage["fb_mfs_count"] = fb;
            localStorage["total_mfs_count"] = total;
            localStorage["mboost_mfs_count"] = mboost;
            localStorage["fboost_mfs_count"] = fboost;
        }
    }
}
function loadzone () {
    if (localStorage)   {
        if (confirm("Хотите ли вы загрузить игру? / Do you want load the game?"))
        {
        var savedmoney = localStorage["money_mfs_count"];
        var saveddouble = localStorage["double_mfs_count"];
        var savedmulti = localStorage["multi_mfs_count"];
        var savedfive = localStorage["five_mfs_count"];
        var saved1st = localStorage["1st_mfs_count"];
        var saved2nd = localStorage["2nd_mfs_count"];
        var saved3rd = localStorage["3rd_mfs_count"];
        var saveddb = localStorage["db_mfs_count"];
        var savedmb = localStorage["mb_mfs_count"];
        var savedfb = localStorage["fb_mfs_count"];
        var savedtotal = localStorage["total_mfs_count"];
        var savedmboost = localStorage["mboost_mfs_count"];
        var savedfboost = localStorage["fboost_mfs_count"];
        if (savedmoney != null) money=Number(savedmoney);
        if (saveddouble != null) money=Number(saveddouble);
        if (savedmulti != null) money=Number(savedmulti);
        if (savedfive != null) money=Number(savedfive);
        if (saved1st != null) amount=Number(saved1st);
        if (saved2nd != null) mamount=Number(saved2nd);
        if (saved3rd != null) mamount=Number(saved3rd);
        if (saveddb != null) db=Number(saveddb);
        if (savedmb != null) mb=Number(savedmb);
        if (savedfb != null) mb=Number(savedfb);
        if (savedtotal != null) total=Number(savedtotal);
        if (savedmboost != null) mboost=Number(savedmboost);
        if (savedfboost != null) mboost=Number(savedfboost);
        if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы получили за нажатие " + (gain).toFixed(0)+ " монет";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You've earned for a click " + (gain).toFixed(0) + " coins";}
        autosaving = false;
        }
    }
}
function changelog(){
    
}

function savezone2 () {
    if (localStorage)
        {
            if (autosaving)
            {
            localStorage["money_mfs_count"] = money;
            localStorage["double_mfs_count"] = doubleprice;
            localStorage["multi_mfs_count"] = multiprice;
            localStorage["five_mfs_count"] = fiveprice;
            localStorage["1st_mfs_count"] = amount;
            localStorage["2nd_mfs_count"] = mamount;
            localStorage["3rd_mfs_count"] = famount;
            localStorage["db_mfs_count"] = db;
            localStorage["mb_mfs_count"] = mb;
            localStorage["fb_mfs_count"] = fb;
            localStorage["total_mfs_count"] = total;
            localStorage["mboost_mfs_count"] = mboost;
            localStorage["fboost_mfs_count"] = fboost;
            }
        }
    }