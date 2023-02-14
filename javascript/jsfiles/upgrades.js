function commonUpgrade1() {
    if (first.amount>=1) {first.price=Math.round(first.basePrice*Math.pow(1.175, first.amount))} 
    else first.price=10;
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x)};
    if (money>=first.price) 
    {first.amount=first.amount+1; money=money - first.price; first.b=first.b+1;
    var firstBoost = first.b*second.boost
    firstprice = Math.round(first.basePrice*Math.pow(1.175, first.amount))
    if (data) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
    else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return first.amount, first.b, first.price, firstprice;
};
function commonUpgrade2() {
    if (second.amount==0) {second.boost=1} 
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x); second.price=Math.round(second.basePrice*Math.pow(1.275, second.amount))} 
    else second.price=100;
    if (money>=second.price) 
    {second.amount++; second.b++; money=money-second.price;
    secondprice = Math.round(second.basePrice*Math.pow(1.275, second.amount));
    window.setInterval(commonUpgrade1TextLoad, 1)
    if (data) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
    else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return second.amount, second.b, second.boost, second.price, secondprice;
};
function commonUpgrade3() {
    if (third.amount==0) {third.boost=1} 
    if (third.amount>=1) {third.price=Math.round(third.basePrice*Math.pow(1.375, third.amount))} 
    else third.price=1000;
    if (money>=third.price) 
    {third.amount=third.amount+1; money=money - third.price; third.boost*=1.05;
    thirdprice = Math.round(third.basePrice*Math.pow(1.375, third.amount))
    if (data) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toFixed() + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
    else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toFixed() + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return third.amount, third.b, third.price, third.boost;
}

function singleUpgrade1() {
    if (money>=fourth.price && fourth.amount<1)
    {money=money - fourth.price; fourth.amount++;
    fourth.x = Math.log(total)
    window.setInterval(singleUpgrade1Boost, 100)
    singleU1.style.backgroundColor = '#1724b1'; singleU1.style.color = '#000000'
    if (data) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Текущий бонус: x" + fourth.x.toFixed(2)}
    else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return fourth.amount, fourth.price, fourth.x
}

function singleUpgrade1Boost(){
    fourth.x = Math.log(total)
    if (data) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(2)}
    else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
}

function singleUpgrade2() {
    if (money>=fifth.price && fifth.amount<1)
    {money=money - fifth.price; fifth.amount++;
    fifth.x = 2
    singleU2.style.backgroundColor = '#111b8a'; singleU2.style.color = '#000000'
    if (data) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Удваивает α-монеты за нажатие."}
    else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Doubles your α-coins gain."}
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return fifth.amount, fifth.price, fifth.x
}

function singleUpgrade3() {
    if (money>=sixth.price && sixth.amount<1)
    {money=money - sixth.price; sixth.amount++;
    sixth.x = Math.log(first.amount)
    window.setInterval(singleUpgrade3Boost, 100)
    window.setInterval(commonUpgrade2TextLoad, 100)
    singleU3.style.backgroundColor = '#0c1575'; singleU3.style.color = '#000000'
    if (data) {singleU3.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
    else {singleU3.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    return sixth.amount, sixth.price, sixth.x
    
}

function singleUpgrade3Boost(){
    sixth.x = Math.pow(Math.log(first.amount), 2);
    if (data) {singleU3.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
    else {singleU3.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    return sixth.amount, sixth.price, sixth.x
}

function commonUpgrade1TextLoad() {
    var firstBoost = first.b*second.boost
    if (data) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
    else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}
}

function commonUpgrade2TextLoad() {
    if (data) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
        else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
}
