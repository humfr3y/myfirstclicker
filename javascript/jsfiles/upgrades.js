const purchasedButtonSingleU1 = document.querySelector("#singleU1");
const purchasedButtonSingleU2 = document.querySelector("#singleU2");
const purchasedButtonSingleU3 = document.querySelector("#singleU3");
const purchasedButtonpBuyableU4 = document.querySelector("#pBuyableU4");
const purchasedButtonpAutoU1 = document.querySelector("#pAutoU1");
const purchasedButtonpAutoU2 = document.querySelector("#pAutoU2");
const purchasedButtonpAutoU3 = document.querySelector("#pAutoU3");
const purchasedButtonpAutoU4 = document.querySelector("#pAutoU4");
const purchasedButtonpSingleU1 = document.querySelector("#pSingleU1");
const purchasedButtonpSingleU2 = document.querySelector("#pSingleU2");
const purchasedButtonpSingleU3 = document.querySelector("#pSingleU3");
const purchasedButtonpSingleU4 = document.querySelector("#pSingleU4");
var cU1TL
var cU2TL
var sU1B
var sU3B
var pSU1B
var pSU3B
var pbfirstprice = 1
var pbsecondprice = 1
var pbthirdprice = 1

function commonUpgrade1() {
    if (first.amount>=1) {first.price=Math.round(first.basePrice*Math.pow(1.15, first.amount))} 
    else first.price=10;
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x)};
    if (money>=first.price) 
    {first.amount=first.amount+1; money=money - first.price; first.b=first.b+1;
    var firstBoost = first.b*second.boost
    firstprice = Math.round(first.basePrice*Math.pow(1.15, first.amount))
    if (first.price<=1e6) {
    if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
    else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}}
    else {
    if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
    else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}}
    if (firstBoost>1e6) {
        if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + firstBoost.toExponential(2).replace("+","") } 
        else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + firstBoost.toExponential(2).replace("+","")}}
    if (money<=1e6) {
    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    if (money>1e6){
    if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
    else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}
}
    return first.amount, first.b, first.price, firstprice;
};
function commonUpgrade2() {
    if (second.amount==0) {second.boost=1} 
    if (second.amount>=1) {second.boost=1+((second.b/10)*sixth.x); second.price=Math.round(second.basePrice*Math.pow(1.21, second.amount))} 
    else second.price=100;
    if (money>=second.price) 
    {second.amount++; second.b++; money=money-second.price;
    secondprice = Math.round(second.basePrice*Math.pow(1.21, second.amount));
    cU1TL = window.setInterval(commonUpgrade1TextLoad, 100)
    if (second.price<=1e6) {
    if (data==1) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
    else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"}};
    if (second.price>1e6) {
    if (data==1) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
    else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"}};
    if (money<=1e6) {
        if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
        else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    if (money>1e6){
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}
    return second.amount, second.b, second.boost, second.price, secondprice, cU1TL;
}};
function commonUpgrade3() {
    if (third.amount==0) {third.boost=1} 
    if (third.amount>=1) {third.price=Math.round(third.basePrice*Math.pow(1.275, third.amount))} 
    else third.price=1000;
    if (money>=third.price) 
    {third.amount=third.amount+1; money=money - third.price; third.boost*=1.05;
    thirdprice = Math.round(third.basePrice*Math.pow(1.275, third.amount))
    if (third.price<=1e6){
    if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toFixed() + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
    else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toFixed() + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}}
    if (third.price>1e6){
        if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
        else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}}
    if (third.boost>1e6){
        if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: х" + third.boost.toExponential(2).replace("+","")} 
        else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: х" + third.boost.toExponential(2).replace("+","")}}
    if (money<=1e6) {
        if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
        else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    else if (money>1e6){
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}}
    return third.amount, third.b, third.price, third.boost;
}

function singleUpgrade1() {
    if (money>=fourth.price && fourth.amount<1)
    {money=money - fourth.price; fourth.amount++;
    fourth.x = Math.pow(Math.log(total),pbthird.boost)
    sU1B = window.setInterval(singleUpgrade1Boost, 100)
    if (fourth.x<100) {
        if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(2)}
        else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
        }
        else if (fourth.x>=100) {
            if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(0)}
            else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(0)}
        }
        else if (fourth.x>=1e6) {
            if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toExponential(2).replace("+","")}
            else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toExponential(2).replace("+","")}
        }
        if (money<=1e6) {
            if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
            else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
        else if (money>1e6){
            if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
            else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}
    purchasedButtonSingleU1.classList.add('purchased');}
    return fourth.amount, fourth.price, fourth.x, sU1B
}

function singleUpgrade1Boost(){
    if (fourth.amount>= 1){
    fourth.x = Math.pow(Math.log(total),pbthird.boost)
    if (fourth.x<100) {
    if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(2)}
    else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
    }
    else if (fourth.x>=100 && fourth.x<1e6) {
        if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(0)}
        else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(0)}
        }
    else if (fourth.x>=1e6) {
        if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toExponential(2).replace("+","")}
        else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toExponential(2).replace("+","")}
        }
    }
}

function singleUpgrade2() {
    if (money>=fifth.price && (fifth.amount==0 || pssecond.amount==1))
    {money=money - fifth.price; fifth.amount++; fifth.price=fifth.price*100
    if (fifth.amount==1 && pssecond.amount==0) 
        {fifth.x=2;
        if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Удваивает α-монеты за нажатие."}
        else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Doubles your α-coins gain."}
        purchasedButtonSingleU2.classList.add('purchased')
        }
    if (fifth.amount>=2 || pssecond.amount==1) 
    {fifth.x*=2
        if (fifth.price<1e6){
        if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toFixed() + "<br> Бонус: x" + fifth.x}
        else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toFixed() + "<br> Currently: x" + fifth.x}
        purchasedButtonSingleU2.classList.remove('purchased')}
        else if (fifth.price>1e6) {
            if (fifth.x < 1e6) 
            {
                if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x}
                else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x}
                purchasedButtonSingleU2.classList.remove('purchased')
            }
            else if (fifth.x >= 1e6) 
            {
                if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x.toExponential(2).replace("+","")}
                else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x.toExponential(2).replace("+","")}
                purchasedButtonSingleU2.classList.remove('purchased')
            }
            }
    }
    if (money<1e6){
    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}
    }
    else if (money>=1e6){
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}
    ;}
    return fifth.amount, fifth.price, fifth.x
}

function singleUpgrade3() {
    if (money>=sixth.price && sixth.amount<1)
    {money=money - sixth.price; sixth.amount++;
    sixth.x = Math.pow(Math.log(first.amount+10), 2);
    sU3B = window.setInterval(singleUpgrade3Boost, 100)
    cU2TL = window.setInterval(commonUpgrade2TextLoad, 100)
    if (data==1) {singleU3.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
    else {singleU3.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    if (money<=1e6) {
        if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет";}
        else {coinsCount.innerHTML = money.toFixed(0) + " α-coins";}}
    else if (money>1e6){
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет";}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins";}}
    purchasedButtonSingleU3.classList.add('purchased');}
    return sixth.amount, sixth.price, sixth.x, sU3B, cU2TL
    
}

function singleUpgrade3Boost(){ 
    if (sixth.amount >=1) {
        sixth.x = Math.pow(Math.log(first.amount+10), 2);
        if (data==1) {singleU3.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
        else {singleU3.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
        return sixth.amount, sixth.price, sixth.x
    }
}

function commonUpgrade1TextLoad() {
    if (second.amount >= 1){
        var firstBoost = first.b*second.boost
        if (first.price<=1e6)
        if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toFixed(0) + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
        else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toFixed(0) + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}
        if (first.price>1e6) {
            if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + firstBoost.toFixed(0) } 
            else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + firstBoost.toFixed(0)}    
        }
        if (firstBoost>1e6) {
            if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + firstprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + firstBoost.toExponential(2).replace("+","") } 
            else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + firstprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + firstBoost.toExponential(2).replace("+","")}}
    
    }
    }

function commonUpgrade2TextLoad() {
    if (sixth.amount >=1) {
    var secondBoost = (second.amount*10)*sixth.x
    if (second.price<=1e6) {
        if (data==1) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toFixed(0) + " α-монет. <br> Бонус: +" + secondBoost.toFixed(0) + "%"} 
        else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toFixed(0) + " α-coins. <br> Currently: +" + secondBoost.toFixed(0) + "%"}};
        if (second.price>1e6) {
        if (data==1) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + secondprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: +" + secondBoost.toFixed(0) + "%"} 
        else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + secondprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: +" + secondBoost.toFixed(0) + "%"}};
        }
    }

function pBuyableUpgrade1() {
    if (pbfirst.amount>=1) {pbfirst.price=Math.round(pbfirst.basePrice*Math.pow(1.5, pbfirst.amount)/psfirst.boost)} 
    else pbfirst.price=2;
    if (diamonds>=pbfirst.price) 
    {pbfirst.amount=pbfirst.amount+1; diamonds=diamonds - pbfirst.price; pbfirst.boost=pbfirst.boost+0.04;
    pbfirstprice = Math.round(pbfirst.basePrice*Math.pow(1.5, pbfirst.amount)/psfirst.boost)
    if (pbfirstprice<1e6){
        if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
        else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
    }
    else if (pbfirstprice>=1e6){
        if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
        else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
    }
    diamondCountCheck.call()
    }
    return pbfirst.amount, pbfirst.price, pbfirstprice;
};

function pBuyableUpgrade2() {
    if (pbsecond.amount>=1) {pbsecond.price=Math.round(pbsecond.basePrice*Math.pow(1.25, pbsecond.amount)/psfirst.boost)} 
    else pbsecond.price=10;
    if (diamonds>=pbsecond.price) 
    {pbsecond.amount=pbsecond.amount+1; diamonds=diamonds - pbsecond.price; pbsecond.boost=pbsecond.boost*1.2;
    pbsecondprice = Math.round(pbsecond.basePrice*Math.pow(1.25, pbsecond.amount)/psfirst.boost)
    if (pbsecondprice<1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toFixed(0) + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toFixed(0) + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }
    else if (pbsecondprice>=1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }
        diamondCountCheck.call()
    }
    return pbsecond.amount, pbsecond.price, pbsecondprice;
};

function pBuyableUpgrade3() {
    if (pbthird.amount>=1) {pbthird.price=Math.round(pbthird.basePrice*Math.pow(1.4, pbthird.amount)/psfirst.boost)} 
    else pbthird.price=50;
    if (diamonds>=pbthird.price) 
    {pbthird.amount=pbthird.amount+1; diamonds=diamonds - pbthird.price; pbthird.boost=pbthird.boost+0.2;
    pbthirdprice = Math.round(pbthird.basePrice*Math.pow(1.4, pbthird.amount)/psfirst.boost)
    if (pbthirdprice<1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }
    else if (pbthirdprice>=1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }
        diamondCountCheck.call()
    }
    return pbthird.amount, pbthird.price, pbthirdprice;
};

function pBuyableUpgrade4() {
    if (diamonds>=pbfourth.price && pbfourth.amount<1) 
    {diamonds=diamonds - pbfourth.price; pbfourth.amount++
        if (data==1) {pBuyableU4.innerHTML = "<ut>Завод Роботов</ut> <br> Открывает улучшения Автоматизации."}
        else {pBuyableU4.innerHTML = "<ut>Robot Factory</ut> <br> Unlocks Automation upgrades."}
        diamondCountCheck.call()
        purchasedButtonpBuyableU4.classList.add('purchased')
        prestigeAutoUpgrades.style.display = "flex"}
        return pbfourth.amount, pbfourth.price
};

function pAutoUpgrade1() {
    if (diamonds>=pafirst.price && pafirst.amount<1) 
    {pafirst.amount=pafirst.amount+1; diamonds=diamonds - pafirst.price;
        if (data==1) {pAutoU1.innerHTML = "<ut>Авто-Покупщик 1.0</ut> <br> Автоматически покупает 4-6 улучшения."}
        else {pAutoU1.innerHTML = "<ut>Auto-Buyer 1.0</ut> <br> Automatically buys 4-6 upgrades."}
        purchasedButtonpAutoU1.classList.add('purchased')
        if (autoTab.style.display == "none") {autoTab.style.display = "block"}
        container1.style.display = "flex"
        diamondCountCheck.call()
    }
        return pafirst.amount, pafirst.price
};

function pAutoUpgrade2() {
    if (diamonds>=pasecond.price && pasecond.amount<1) 
    {pasecond.amount=pasecond.amount+1; diamonds=diamonds - pasecond.price;
        if (data==1) {pAutoU2.innerHTML = "<ut>Авто-Покупщик 2.0</ut> <br> Автоматически покупает 1-3 улучшения"}
        else {pAutoU2.innerHTML = "<ut>Auto-Buyer 2.0</ut> <br> Automatically buys 1-3 upgrades"}
        purchasedButtonpAutoU2.classList.add('purchased')
        if (autoTab.style.display == "none") {autoTab.style.display = "block"}
        container2.style.display = "flex"
        diamondCountCheck.call()}
        return pasecond.amount, pasecond.price
};

function pAutoUpgrade3() {
    if (diamonds>=pathird.price && pathird.amount<1) 
    {pathird.amount=pathird.amount+1; diamonds=diamonds - pathird.price;
        if (data==1) {pAutoU3.innerHTML = "<ut>Авто-Покупщик 3.0</ut> <br> Вы получаете 100% от монет за нажатия в секунду"}
        else {pAutoU3.innerHTML = "<ut>Auto-Buyer 3.0</ut> <br> You automatically earning 100% coin gain per second"}
        purchasedButtonpAutoU3.classList.add('purchased')
        if (autoTab.style.display == "none") {autoTab.style.display = "block"}
        container3.style.display = "flex"
        diamondCountCheck.call();}
        return pathird.amount, pathird.price
};

function diamondCountCheck() {
    if (diamonds < 1e6) {
        if (data == 1) { theGoal.innerHTML = `У вас <dm>${diamonds}</dm> алмазов, которые увеличивают монеты за нажатия на <dm>+${(diamonds * pbsecond.boost * 100).toFixed(0)}%</dm>`; }
        else { theGoal.innerHTML = `You have <dm>${diamonds}</dm> diamonds. They're increase coin gain by <dm>+${(diamonds * pbsecond.boost * 100).toFixed(0)}%</dm>`; }
    }
    if ((diamonds * pbsecond.boost * 100) >= 1e6) {
        if (data == 1) { theGoal.innerHTML = `У вас <dm>${diamonds}</dm> алмазов, которые увеличивают монеты за нажатия на <dm>+${(diamonds * pbsecond.boost * 100).toExponential(2).replace("+", "")}%</dm>`; }
        else { theGoal.innerHTML = `You have <dm>${diamonds}</dm> diamonds. They're increase coin gain by <dm>+${(diamonds * pbsecond.boost * 100).toExponential(2).replace("+", "")}%</dm>`; }
    }
    if (diamonds >= 1e6) {
        if (data == 1) { theGoal.innerHTML = `У вас <dm>${diamonds.toExponential(2).replace("+", "")}</dm> алмазов, которые увеличивают монеты за нажатия на <dm>+${(diamonds * pbsecond.boost * 100).toExponential(2).replace("+", "")}%</dm>`; }
        else { theGoal.innerHTML = `You have <dm>${diamonds.toExponential(2).replace("+", "")}</dm> diamonds. They're increase coin gain by <dm>+${(diamonds * pbsecond.boost * 100).toExponential(2).replace("+", "")}%</dm>`; }
    }
}

function pAutoUpgrade4() {
    if (diamonds>=pafourth.price && pafourth.amount<1 && pafirst.amount==1 && pasecond.amount==1 && pathird.amount==1) 
    {pafourth.amount=pafourth.amount+1; diamonds=diamonds - pafourth.price;
        if (data==1) {pAutoU4.innerHTML = "<ut>Супер Престиж</ut> <br>Вы открыли новые улучшения престижа"}
        else {pAutoU4.innerHTML = "<ut>Super Prestige</ut> <br>You unlock new prestige upgrades"}
        diamondCountCheck.call()
        purchasedButtonpAutoU4.classList.add('purchased')
        prestigeSingleUpgrades.style.display = "flex"}
        return pafourth.amount, pafourth.price
};

function pSingleUpgrade1() {
    if (diamonds>=psfirst.price && psfirst.amount<1) 
    {psfirst.amount=psfirst.amount+1; diamonds=diamonds - psfirst.price; psfirst.boost=(Math.log(Math.log(money))+1)/1.5
        pSU1B = window.setInterval(prestigeSingleUpgrade1Boost, 100)
        if (data==1) {pSingleU1.innerHTML = "<ut>Бриллиантовый Торговец</ut> <br>Делит цену улучшений Престижа в зависимости от текущего количества монет <br> Бонус: / " + psfirst.boost.toFixed(2)}
        else {pSingleU1.innerHTML = "<ut>Diamond Trader</ut> <br>Divides price of Prestige upgrades based on current coins <br> Currently: / " + psfirst.boost.toFixed(2)}
        diamondCountCheck.call()
        purchasedButtonpSingleU1.classList.add('purchased')}
        return psfirst.amount, psfirst.price, psfirst.boost
};

function prestigeSingleUpgrade1Boost(){
    psfirst.boost=(Math.log(Math.log(money))+1)*1.5
    if (data==1) {pSingleU1.innerHTML = "<ut>Бриллиантовый Торговец</ut> <br>Делит цену улучшений Престижа в зависимости от текущего количества монет <br> Бонус: / " + psfirst.boost.toFixed(2)}
    else {pSingleU1.innerHTML = "<ut>Diamond Trader</ut> <br>Divides price of Prestige upgrades based on current coins <br> Currently: / " + psfirst.boost.toFixed(2)}
    pbfirst.price = Math.round(pbfirst.basePrice*Math.pow(1.5, pbfirst.amount)/psfirst.boost)
    pbfirstprice = Math.round(pbfirst.basePrice*Math.pow(1.5, pbfirst.amount)/psfirst.boost)
    if (pbfirstprice<1e6){
        if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
        else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
    }
    else if (pbfirstprice>=1e6){
        if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
        else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
    }
    pbsecondprice = Math.round(pbsecond.basePrice*Math.pow(1.25, pbsecond.amount)/psfirst.boost)
    if (pbsecondprice<1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toFixed(0) + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toFixed(0) + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }
    else if (pbsecondprice>=1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }
    pbthird.price = Math.round(pbthird.basePrice*Math.pow(1.4, pbthird.amount)/psfirst.boost)
    pbthirdprice = Math.round(pbthird.basePrice*Math.pow(1.4, pbthird.amount)/psfirst.boost)
    if (pbthirdprice<1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }
    else if (pbthirdprice>=1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }
        }

function pSingleUpgrade2() {
    if (diamonds>=pssecond.price && pssecond.amount<1) 
    {pssecond.amount=pssecond.amount+1; diamonds=diamonds - pssecond.price;
        if (data==1) {pSingleU2.innerHTML = "<ut>Мультиплексор</ut> <br> Снимает ограничение с Бездонный Кошелёк"}
        else {pSingleU2.innerHTML = "<ut>Multiplexor</ut> <br> Removes cap from Bottomless Wallet"}
            if (fifth.x < 1e6) 
            {
                if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x}
                else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x}
                purchasedButtonSingleU2.classList.remove('purchased')
            }
            if (fifth.x >= 1e6) 
            {
                if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x.toExponential(2).replace("+","")}
                else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x.toExponential(2).replace("+","")}
                purchasedButtonSingleU2.classList.remove('purchased')
            }
            purchasedButtonSingleU2.classList.remove('purchased')
            diamondCountCheck.call()
        purchasedButtonpSingleU2.classList.add('purchased')
        purchasedButtonSingleU2.classList.remove('purchased')}
        return pssecond.amount, pssecond.price, pssecond.boost
};

function pSingleUpgrade3() {
    if (diamonds>=psthird.price && psthird.amount<1) 
    {psthird.amount=psthird.amount+1; diamonds=diamonds - psthird.price; psthird.boost = ((Math.log10(amounts+1))/1.3)+1
    pSU3B = window.setInterval(prestigeSingleUpgrade3Boost, 100)
        if (data==1) {pSingleU3.innerHTML = "<ut>Алмазное Хеширование</ut> <br> Увеличивает алмазы за сброс в зависимости от количества купленных основных улучшений <br> Бонус: " + psthird.boost.toFixed(2)}
        else {pSingleU3.innerHTML = "<ut>Diamond Hashing</ut> <br> Increases diamonds gain based on total amount of bought main upgrades <br> Currently: x" + psthird.boost.toFixed(2)}
            diamondCountCheck.call()
        purchasedButtonpSingleU3.classList.add('purchased')}
        return psthird.amount, psthird.price, psthird.boost
};

function prestigeSingleUpgrade3Boost() {
    amounts = first.amount + second.amount + third.amount + fourth.amount + fifth.amount + sixth.amount
    psthird.boost = ((Math.log10(amounts+1))*1.2)+1
    if (data==1) {pSingleU3.innerHTML = "<ut>Алмазное Хеширование</ut> <br> Умножает алмазы за сброс в зависимости от количества купленных основных улучшений <br> Бонус: x" + psthird.boost.toFixed(2)}
    else {pSingleU3.innerHTML = "<ut>Diamond Hashing</ut> <br> Multiplies diamonds gain based on total amount of bought main upgrades <br> Currently: x" + psthird.boost.toFixed(2)}
    }

function pSingleUpgrade4() {
        if (diamonds>=psfourth.price && psfourth.amount<1) 
        {psfourth.amount=psfourth.amount+1; diamonds=diamonds - psfourth.price;
            fortuneTab.style.display = "block"
            if (data==1) {pSingleU4.innerHTML = "<ut>Вызов Фортуны</ut> <br> Вы открыли Фортуну"}
            else {pSingleU4.innerHTML = "<ut>Fortune Challenge</ut> <br> You have unlocked Fortune"}
                diamondCountCheck.call()
            purchasedButtonpSingleU4.classList.add('purchased')}
            return psfourth.amount, psfourth.price, psfourth.boost
    };