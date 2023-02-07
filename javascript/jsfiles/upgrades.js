function doubleboost(ele2) {
    if (first.amount>=1) {first.price=Math.round(first.basecost*Math.pow(1.175, first.amount))} 
    else first.price=10;
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x)};
    if (money>=first.price) 
    {first.amount=first.amount+1; money=money - first.price; first.b=first.b+1;
    var firstbf = first.b*second.boost
    firstprice = Math.round(first.basecost*Math.pow(1.175, first.amount))
    if (data) {ele2.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstbf.toFixed(1) } 
    else {ele2.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstbf.toFixed(1)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return first.amount, first.b, first.price, firstprice;
};
function multiboost(ele3) {
    if (second.amount==0) {second.boost=1} 
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x); second.price=Math.round(second.basecost*Math.pow(1.275, second.amount))} 
    else second.price=100;
    if (money>=second.price) 
    {second.amount++; second.b++; money=money-second.price;
    secondprice = Math.round(second.basecost*Math.pow(1.275, second.amount));
    window.setInterval(doubletext, 100)
    if (data) {ele3.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
    else {ele3.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return second.amount, second.b, second.boost, second.price, secondprice;
};
function fiveboost(ele4) {
    if (third.amount==0) {third.boost=1} 
    if (third.amount>=1) {third.price=Math.round(third.basecost*Math.pow(1.375, third.amount))} 
    else third.price=1000;
    if (money>=third.price) 
    {third.amount=third.amount+1; money=money - third.price; third.boost*=1.05;
    thirdprice = Math.round(third.basecost*Math.pow(1.375, third.amount))
    if (data) {ele4.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toFixed() + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
    else {ele4.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toFixed() + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return third.amount, third.b, third.price, third.boost;
}

function fourthupgrade(ele5) {
    if (money>=fourth.price && fourth.amount<1)
    {money=money - fourth.price; fourth.amount++;
    fourth.x = Math.log(total)
    window.setInterval(fupgboost, 100)
    foupg.style.backgroundColor = '#1724b1'; foupg.style.color = '#000000'
    if (data) {ele5.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Текущий бонус: x" + fourth.x.toFixed(2)}
    else {ele5.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return fourth.amount, fourth.price, fourth.x
}

function fupgboost(){
    fourth.x = Math.log(total)
    if (data) {foupg.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(2)}
    else {foupg.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
}

function fifthupgrade(ele6) {
    if (money>=fifth.price && fifth.amount<1)
    {money=money - fifth.price; fifth.amount++;
    fifth.x = 2
    fiupg.style.backgroundColor = '#111b8a'; fiupg.style.color = '#000000'
    if (data) {ele6.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Удваивает α-монеты за нажатие."}
    else {ele6.innerHTML = "<ut>Bottomless Wallet</ut> <br> Doubles your α-coins gain."}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return fifth.amount, fifth.price, fifth.x
}

function sixthupgrade(ele7) {
    if (money>=sixth.price && sixth.amount<1)
    {money=money - sixth.price; sixth.amount++;
    sixth.x = Math.log(first.amount)
    window.setInterval(siupgboost, 100)
    window.setInterval(multitext, 100)
    siupg.style.backgroundColor = '#0c1575'; siupg.style.color = '#000000'
    if (data) {ele7.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
    else {ele7.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins";}}
    return sixth.amount, sixth.price, sixth.x
    
}

function siupgboost(){
    sixth.x = Math.pow(Math.log(first.amount), 2);
    if (data) {siupg.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
    else {siupg.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    return sixth.amount, sixth.price, sixth.x
}

function doubletext() {
    var firstbf = first.b*second.boost
    if (data) {fupg.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstbf.toFixed(1) } 
    else {fupg.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstbf.toFixed(1)}
}

function multitext() {
    if (data) {supg.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
        else {supg.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
}
