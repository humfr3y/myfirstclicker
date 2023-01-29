function doubleboost(ele2) {
    if (first.amount>=1) {first.price=Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.65))} else firstprice=10;
    if (second.amount>=1) {second.boost=1+(second.b/10)};
    if (money>=first.price) 
    {first.amount=first.amount+1; money=money - first.price; first.b=first.b+1;
    var firstbf = first.b*second.boost
    if (data) {ele2.innerHTML = "Улучшение даёт +" + firstbf.toFixed(1) + " монет за нажатие. Чтобы улучшить его вам нужно " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.65)).toFixed(0) + " монет."} 
    else {ele2.innerHTML = "Upgrade gives +" + firstbf.toFixed(1) + " coins per click. You need for next upgrade " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.65)).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили первое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought first upgrade.";}}
    return first.amount, first.b, first.price;
};
function multiboost(ele3) {
    if (second.amount==0) {second.boost=1} 
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x)};
    if (second.amount>=1) {second.price=Math.round(100+((second.amount+1)*100*Math.log(second.amount+1)/2))} else {second.price=100};
    if (money>second.price) 
    {second.amount++; second.b++; money=money-second.price;
    
    if (data) {ele3.innerHTML = "Улучшение увеличивает бонус первого улучшения на +" + ((second.amount*10)*sixth.x).toFixed(0) + "%. Чтобы увеличить бонус на 10% вам нужно " + Math.round(100+((second.amount+1)*100*Math.log(second.amount+1)/2)).toFixed(0) + " монет."} 
        else {ele3.innerHTML = "Upgrade increases first upgrade bonus by +" + ((second.amount*10)*sixth.x).toFixed(0) + "%. You need for next upgrade " + Math.round(100+((second.amount+1)*100*Math.log(second.amount+1)/2)).toFixed(0) + " coins."};
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили второе улучшение.";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought second upgrade.";}};
    return second.amount, second.b, second.boost, second.price;
};
function fiveboost(ele4) {
    if (third.amount==0) {third.boost=0} 
    if (third.amount>=1) {third.boost=(third.b/20)};
    if (third.amount>=1) {third.price=Math.round(1000+((third.amount+1)*1000*Math.log(third.amount+1)/2.5))} else third.price=1000;
    if (money>=third.price) 
    {third.amount=third.amount+1; money=money - third.price; third.b=third.b+1;
    if (data) {ele4.innerHTML = "Улучшение увеличивает монеты за клик на +" + ((third.b/20)*100).toFixed(0) + "%. Чтобы улучшить его вам нужно " + Math.round(1000+((third.amount+1)*1000*Math.log(third.amount+1)/2.5)).toFixed() + " монет."} 
    else {ele4.innerHTML = "Upgrade increases coin gain by +" + ((third.b/20)*100).toFixed(0) + "%. You need for next upgrade " + Math.round(1000+((third.amount+1)*1000*Math.log(third.amount+1)/2.5)).toFixed(0) + " coins."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили третье улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought third upgrade.";}}
    if (third.amount>=1) {third.boost=(third.b/20)};
    return third.amount, third.b, third.price, third.boost;
}

function fourthupgrade(ele5) {
    if (money>=fourth.price && fourth.amount<1)
    {money=money - fourth.price; fourth.amount++;
    fourth.x = Math.log(total)
    window.setInterval(fupgboost, 100)
    if (data) {ele5.innerHTML = "Улучшение увеличивает монеты за клик в зависимости от всего монет. Текущий бонус: x" + fourth.x.toFixed(2)}
    else {ele5.innerHTML = "Upgrade increases coin gain based on total coins. Currently: x" + fourth.x.toFixed(2)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили четвёртое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought fourth upgrade.";}}
    return fourth.amount, fourth.price, fourth.x
    
}

function fupgboost(){
    fourth.x = Math.log(total)/2
    if (data) {foupg.innerHTML = "Улучшение увеличивает монеты за клик в зависимости от всего монет. Текущий бонус: x" + fourth.x.toFixed(2)}
    else {foupg.innerHTML = "Upgrade increases coin gain based on total coins. Currently: x" + fourth.x.toFixed(2)}
}

function fifthupgrade(ele6) {
    if (money>=fifth.price && fifth.amount<1)
    {money=money - fifth.price; fifth.amount++;
    fifth.x = 2
    if (data) {ele6.innerHTML = "Улучшение удваивает монеты за клик"}
    else {ele6.innerHTML = "Upgrade doubles your coin gain."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили пятое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought fifth upgrade.";}}
    return fifth.amount, fifth.price, fifth.x
    
}

function sixthupgrade(ele7) {
    if (money>=sixth.price && sixth.amount<1)
    {money=money - sixth.price; sixth.amount++;
    sixth.x = Math.log(first.amount)
    window.setInterval(siupgboost, 100)
    if (data) {ele7.innerHTML = "Улучшение увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого. Текущий бонус: x" + sixth.x.toFixed(2)}
    else {ele7.innerHTML = "Upgrade increases bonus of second upgrade based on amount of first upgrade. Currently: x" + sixth.x.toFixed(2)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы купили шестое улучшение.";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You have bought sixth upgrade.";}}
    return sixth.amount, sixth.price, sixth.x
    
}

function siupgboost(){
    sixth.x = Math.log(first.amount)
    if (data) {siupg.innerHTML = "Улучшение увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого. Текущий бонус: x" + sixth.x.toFixed(2)}
    else {siupg.innerHTML = "Upgrade increases bonus of second upgrade based on amount of first upgrade. Currently: x" + sixth.x.toFixed(2)}
    return sixth.amount, sixth.price, sixth.x
}









//function doubletext(ele2) {
//    var firstbf = first.b*second.boost
//    if (data) {ele2.innerHTML = "Улучшение даёт +" + firstbf.toFixed(1) + " монет за нажатие. Чтобы улучшить его вам нужно " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.85)).toFixed(0) + " монет."} 
//    else {ele2.innerHTML = "Upgrade gives +" + firstbf.toFixed(1) + " coins per click. You need for next upgrade " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.85)).toFixed(0) + " coins."}
//}