 setInterval(autoSaveThis, 10000); //таймер

var firstprice = Math.round(first.basePrice*Math.pow(1.15, first.amount))
var secondprice = Math.round(second.basePrice*Math.pow(1.21, second.amount));
var thirdprice = Math.round(third.basePrice*Math.pow(1.275, third.amount))


function loadUpgrades() {
    if (first.amount >=1){
        var firstBoost = first.b*second.boost
        if (data==1) {commonU1.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + Math.round(first.basePrice*Math.pow(1.15, first.amount)).toFixed(0) + " α-монет. <br> Бонус: +" + firstBoost.toFixed() } 
        else {commonU1.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + Math.round(first.basePrice*Math.pow(1.15, first.amount)).toFixed(0) + " α-coins. <br> Currently: +" + firstBoost.toFixed()}}
        
    if (second.amount >=1){
        cU1TL =  setInterval(commonUpgrade1TextLoad, 100)
        if (data==1) {commonU2.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + Math.round(second.basePrice*Math.pow(1.21, second.amount)).toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
        else {commonU2.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + Math.round(second.basePrice*Math.pow(1.22, second.amount)).toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
    }
    if (third.amount >=1){
        if (third.price<=1e6){
            if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toFixed() + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
            else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toFixed() + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}}
            if (third.price>1e6){
                if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
                else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}}
            if (third.boost>1e6){
                if (data==1) {commonU3.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " + thirdprice.toExponential(2).replace("+","") + " α-монет. <br> Бонус: х" + third.boost.toExponential(2).replace("+","")} 
                else {commonU3.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + thirdprice.toExponential(2).replace("+","") + " α-coins. <br> Currently: х" + third.boost.toExponential(2).replace("+","")}}
            }
    if (fourth.amount >=1){
        fourth.x = Math.pow(Math.log(total),pbthird.boost)
        sU1B =  setInterval(singleUpgrade1Boost, 100)
        purchasedButtonSingleU1.classList.add('purchased');
        if (fourth.x<100) {
            if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(2)}
            else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
        }
        if (fourth.x>=100) {
            if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toFixed(0)}
            else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(0)}
        }
        if (fourth.x>=1e6) {
            if (data==1) {singleU1.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Бонус: x" + fourth.x.toExponential(2).replace("+","")}
            else {singleU1.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toExponential(2).replace("+","")}
    }}
    if (fifth.amount >=1){
        if (fifth.amount==1 && pssecond.amount==0) 
        {fifth.x=2;
        if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Удваивает α-монеты за нажатие."}
        else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Doubles your α-coins gain."}
        purchasedButtonSingleU2.classList.add('purchased')
        }
    if (fifth.amount>=2 || pssecond.amount==1) 
    {
    if (fifth.price<1e6){
        if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toFixed() + "<br> Бонус: x" + fifth.x}
        else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toFixed() + "<br> Currently: x" + fifth.x}
        purchasedButtonSingleU2.classList.remove('purchased')
    }
    if (fifth.price>1e6) {
            if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x}
            else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x}
            purchasedButtonSingleU2.classList.remove('purchased')
        if (fifth.x > 1e6) 
        {
            if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x.toExponential(2).replace("+","")}
            else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x.toExponential(2).replace("+","")}
            purchasedButtonSingleU2.classList.remove('purchased')
        }
        }
    }
}
    if (sixth.amount >=1){
        sixth.x = Math.log(first.amount)
        purchasedButtonSingleU3.classList.add('purchased')
        sU3B =  setInterval(singleUpgrade3Boost, 100)
        cU2TL =  setInterval(commonUpgrade2TextLoad, 100)
        if (data==1) {singleU3.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
        else {singleU3.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    }
    if (pbfirst.amount >=1){
        pbfirstprice = Math.round(pbfirst.basePrice*Math.pow(1.5, pbfirst.amount)/psfirst.boost)
        if (pbfirstprice<1e6){
            if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
            else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
        }
        else if (pbfirstprice>=1e6){
            if (data==1) {pBuyableU1.innerHTML = "<ut>Суперпроцессор</ut> <br> Усиливает монеты за нажатие. <br> Стоимость: " + pbfirstprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbfirst.boost.toFixed(3) } 
            else {pBuyableU1.innerHTML = "<ut>Superprocessor</ut> <br> Increases power of coins gain per click. <br> Cost: " + pbfirstprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbfirst.boost.toFixed(3)}
        }}
    if (pbsecond.amount >=1){
        pbsecondprice = Math.round(pbsecond.basePrice*Math.pow(1.25, pbsecond.amount)/psfirst.boost)
        if (pbsecondprice<1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toFixed(0) + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toFixed(0) + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }
        else if (pbfirstprice>=1e6){
        if (data==1) {pBuyableU2.innerHTML = "<ut>Алмазный Шифратор</ut> <br> Умножает бонус алмазов. <br> Стоимость: " + pbsecondprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: x" + pbsecond.boost.toFixed(2) } 
        else {pBuyableU2.innerHTML = "<ut>Diamond Encoder</ut> <br> Multiplies diamonds bonus. <br> Cost: " + pbsecondprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: x" + pbsecond.boost.toFixed(2)}
        }}
    if (pbthird.amount >=1) {
        pbthirdprice = Math.round(pbthird.basePrice*Math.pow(1.4, pbthird.amount)/psfirst.boost)
    if (pbthirdprice<1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toFixed(0) + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toFixed(0) + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }
    else if (pbthirdprice>=1e6){
        if (data==1) {pBuyableU3.innerHTML = "<ut>Престижная Слава</ut> <br> Усиливает бонус Богатой Славы. <br> Стоимость: " + pbthirdprice.toExponential(2).replace("+","") + " алмазов. <br> Бонус: ^" + pbthird.boost.toFixed(2) } 
        else {pBuyableU3.innerHTML = "<ut>Prestige Fame</ut> <br> Increases power of Rich Fame. <br> Cost: " + pbthirdprice.toExponential(2).replace("+","") + " diamonds. <br> Currently: ^" + pbthird.boost.toFixed(2)}
        }}
    if (pbfourth.amount >=1) {
        if (data==1) {pBuyableU4.innerHTML = "<ut>Завод Роботов</ut> <br> Открывает улучшения Автоматизации."}
        else {pBuyableU4.innerHTML = "<ut>Robot Factory</ut> <br> Unlocks Automation upgrades."}
        purchasedButtonpBuyableU4.classList.add('purchased')
        prestigeAutoUpgrades.style.display = "flex"
    }
    if (pafirst.amount >=1) {
        if (data==1) {pAutoU1.innerHTML = "<ut>Авто-Покупщик 1.0</ut> <br> Автоматически покупает 4-6 улучшения."}
        else {pAutoU1.innerHTML = "<ut>Auto-Buyer 1.0</ut> <br> Automatically buys 4-6 upgrades."}
        purchasedButtonpAutoU1.classList.add('purchased')
        container1.style.display = "flex"
    }
    if (pasecond.amount >=1) {
        if (data==1) {pAutoU2.innerHTML = "<ut>Авто-Покупщик 2.0</ut> <br> Автоматически покупает 1-3 улучшения"}
        else {pAutoU2.innerHTML = "<ut>Auto-Buyer 2.0</ut> <br> Automatically buys 1-3 upgrades"}
        purchasedButtonpAutoU2.classList.add('purchased')
        container2.style.display = "flex"
    }
    if (pathird.amount >=1) {
        if (data==1) {pAutoU3.innerHTML = "<ut>Авто-Покупщик 3.0</ut> <br> Вы получаете 100% от монет за нажатия в секунду"}
        else {pAutoU3.innerHTML = "<ut>Auto-Buyer 3.0</ut> <br> You automatically earning 100% coin gain per second"}
        purchasedButtonpAutoU3.classList.add('purchased')
        container3.style.display = "flex"
    }
    if (pafourth.amount >=1) {
        if (data==1) {pAutoU4.innerHTML = "<ut>Супер Престиж</ut> <br>Вы открыли новые улучшения престижа"}
        else {pAutoU4.innerHTML = "<ut>Super Prestige</ut> <br>You unlock new prestige upgrades"}
        prestigeSingleUpgrades.style.display = "flex"
        purchasedButtonpAutoU4.classList.add('purchased')
    }
    if (psfirst.amount >=1) {
        if (data==1) {pSingleU1.innerHTML = "<ut>Бриллиантовый Торговец</ut> <br>Делит цену улучшений Престижа в зависимости от текущего количества монет <br> Бонус: / " + psfirst.boost.toFixed(2)}
        else {pSingleU1.innerHTML = "<ut>Diamond Trader</ut> <br>Divides price of Prestige upgrades based on current coins <br> Currently: / " + psfirst.boost.toFixed(2)}
        purchasedButtonpSingleU1.classList.add('purchased')
    }
    if (pssecond.amount >=1) {
        if (data==1) {pSingleU2.innerHTML = "<ut>Мультиплексор</ut> <br> Снимает ограничение с Бездонный Кошелёк"}
            else {pSingleU2.innerHTML = "<ut>Multiplexor</ut> <br> Removes cap from Bottomless Wallet"}
        if (data==1) {singleU2.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Умножает α-монеты за нажатие в два раза при покупке <br> Стоимость: " + fifth.price.toExponential(2).replace("+","") + "<br> Бонус: x" + fifth.x}
            else {singleU2.innerHTML = "<ut>Bottomless Wallet</ut> <br> Multiplies your α-coin gain by x2 per buying. <br> Cost: " + fifth.price.toExponential(2).replace("+","") + "<br> Currently: x" + fifth.x}
        purchasedButtonSingleU2.classList.remove('purchased')
        diamondCountCheck.call()
        purchasedButtonpSingleU2.classList.add('purchased')
        purchasedButtonSingleU2.classList.remove('purchased')}
    if (psthird.amount >=1) {
        if (data==1) {pSingleU3.innerHTML = "<ut>Алмазное Хеширование</ut> <br> Увеличивает алмазы за сброс в зависимости от количества купленных основных улучшений <br> Бонус: " + psthird.boost.toFixed(2)}
        else {pSingleU3.innerHTML = "<ut>Diamond Hashing</ut> <br> Increases diamonds gain based on total amount of bought main upgrades <br> Currently: x" + psthird.boost.toFixed(2)}
        purchasedButtonpSingleU3.classList.add('purchased')
    }
    if (psfourth.amount >=1) {
        fortuneTab.style.display = "block"
        if (data==1) {pSingleU4.innerHTML = "<ut>Вызов Фортуны</ut> <br> Вы открыли Фортуну"}
        else {pSingleU4.innerHTML = "<ut>Fortune Challenge</ut> <br> You have unlocked Fortune"}
        purchasedButtonpSingleU4.classList.add('purchased')
    }
    if (pafirst.amount==1 || pasecond.amount==1 || pathird.amount == 1) {
        if (autoTab.style.display == "none") {autoTab.style.display = "block"}
    }
    if (money>1e9 || diamonds>=1) {unlockedPrestige = 1}
    else {unlockedPrestige = 0}
    if (unlockedPrestige == 1) {unlockPrestige.call()}
}

function autoSaveGame(){
    if (autoSaving==0) 
    {
        autoSaving=1;
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение вкл."}
        else {autoSavingGame.innerHTML = "Autosave on."}
    } 
    else {
        autoSaving=0;
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение выкл."}
        else {autoSavingGame.innerHTML = "Autosave off."}
    }
}
function saveGame () { 
    let datasave = {
            data: data,
            money: money,
            completion: completion,
            autoSaving: autoSaving,
            unlockedPrestige: unlockedPrestige,
            total: total,
            totalDiamond: totalDiamond,
            totalPrestiges: totalPrestiges,
            amounts: amounts,
            first_price: first.price,
            firstprice: firstprice,
            first_amount: first.amount,
            first_b: first.b,
            second_price: second.price,
            secondprice: secondprice,
            second_amount: second.amount,
            second_b: second.b,
            second_boost: second.boost,
            third_price: third.price,
            thirdprice: thirdprice,
            third_amount: third.amount,
            third_boost: third.boost,
            fourth_price: fourth.price,
            fourth_amount: fourth.amount,
            fourth_x: fourth.x,
            fifth_price: fifth.price,
            fifth_amount: fifth.amount,
            fifth_x: fifth.x,
            sixth_price: sixth.price,
            sixth_amount: sixth.amount,
            sixth_x: sixth.x,
            diamonds: diamonds,
            diamondsBoost: diamondsBoost,
            pbfirstprice: pbfirstprice,
            pbfirst_Baseprice: pbfirst.Baseprice,
            pbfirst_price: pbfirst.price,
            pbfirst_amount: pbfirst.amount,
            pbfirst_boost: pbfirst.boost,
            pbsecondprice: pbsecondprice,
            pbsecond_Baseprice: pbsecond.Baseprice,
            pbsecond_price: pbsecond.price,
            pbsecond_amount: pbsecond.amount,
            pbsecond_boost: pbsecond.boost,
            pbthirdprice: pbthirdprice,
            pbthird_Baseprice: pbthird.Baseprice,
            pbthird_price: pbthird.price,
            pbthird_amount: pbthird.amount,
            pbthird_boost: pbthird.boost,
            pbfourth_price: pbfourth.price,
            pbfourth_amount: pbfourth.amount,
            pafirst_price: pafirst.price,
            pafirst_amount: pafirst.amount,
            pasecond_price: pasecond.price,
            pasecond_amount: pasecond.amount,
            pathird_price: pathird.price,
            pathird_amount: pathird.amount,
            pafourth_price: pafourth.price,
            pafourth_amount: pafourth.amount,
            psfirst_price: psfirst.price,
            psfirst_amount: psfirst.amount,
            psfirst_boost: psfirst.boost,
            pssecond_price: pssecond.price,
            pssecond_amount: pssecond.amount,
            pssecond_boost: pssecond.boost,
            psthird_price: psthird.price,
            psthird_amount: psthird.amount,
            psthird_boost: psthird.boost,
            psfourth_price: psfourth.price,
            psfourth_amount: psfourth.amount,
            psfourth_boost: psfourth.boost,
            check46_checked: check46.checked,
            check13_checked: check13.checked,
            checkCoin_checked: checkCoin.checked

    }; //образуем переменную с кучей других переменных
    
    let stringifiedData = JSON.stringify(datasave); //превратим в строчку
    
    // сохранить в LocalStorage по ключу коунтдата
    localStorage.setItem('datasaving', stringifiedData);
}
function loadGame () {
        let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
        let parsedData = JSON.parse(storedData);

        
        money = parseFloat(parsedData.money);
        data = parseFloat(parsedData.data);
        autoSaving = parseFloat(parsedData.autoSaving)
        completion = parseFloat(parsedData.completion)
        total = parseFloat(parsedData.total);
        totalDiamond = parseFloat(parsedData.totalDiamond);
        totalPrestiges = parseFloat(parsedData.totalPrestiges);
        amounts = parseFloat(parsedData.amounts);
        unlockedPrestige = parseFloat(parsedData.unlockedPrestige)
        diamonds = parseFloat(parsedData.diamonds);
        diamondsBoost = parseFloat(parsedData.diamondsBoost);
        first.price = parseFloat(parsedData.first_price);
        firstprice = parseFloat(parsedData.firstprice);
        first.amount = parseFloat(parsedData.first_amount);
        first.b = parseFloat(parsedData.first_b);
        second.price = parseFloat(parsedData.second_price);
        secondprice = parseFloat(parsedData.secondprice);
        second.amount = parseFloat(parsedData.second_amount);
        second.b = parseFloat(parsedData.second_b);
        second.boost = parseFloat(parsedData.second_boost);
        third.price = parseFloat(parsedData.third_price);
        thirdprice = parseFloat(parsedData.thirdprice);
        third.amount = parseFloat(parsedData.third_amount);
        third.boost = parseFloat(parsedData.third_boost);
        fourth.price = parseFloat(parsedData.fourth_price);
        fourth.amount = parseFloat(parsedData.fourth_amount);
        fourth.x = parseFloat(parsedData.fourth_x);
        fifth.price = parseFloat(parsedData.fifth_price);
        fifth.amount = parseFloat(parsedData.fifth_amount);
        fifth.x = parseFloat(parsedData.fifth_x);
        sixth.price = parseFloat(parsedData.sixth_price);
        sixth.amount = parseFloat(parsedData.sixth_amount);
        sixth.x = parseFloat(parsedData.sixth_x);
        pbfirst.price = parseFloat(parsedData.pbfirst_price);
        pbfirstprice = parseFloat(parsedData.pbfirstprice);
        pbfirst.Baseprice = parseFloat(parsedData.pbfirst_Baseprice);
        pbfirst.amount = parseFloat(parsedData.pbfirst_amount);
        pbfirst.boost = parseFloat(parsedData.pbfirst_boost);
        pbsecond.price = parseFloat(parsedData.pbsecond_price);
        pbsecondprice = parseFloat(parsedData.pbsecondprice);
        pbsecond.Baseprice = parseFloat(parsedData.pbsecond_Baseprice);
        pbsecond.amount = parseFloat(parsedData.pbsecond_amount);
        pbsecond.boost = parseFloat(parsedData.pbsecond_boost);
        pbthird.price = parseFloat(parsedData.pbthird_price);
        pbthirdprice = parseFloat(parsedData.pbthirdprice);
        pbthird.Baseprice = parseFloat(parsedData.pbthird_Baseprice);
        pbthird.amount = parseFloat(parsedData.pbthird_amount);
        pbthird.boost = parseFloat(parsedData.pbthird_boost);
        pbfourth.price = parseFloat(parsedData.pbfourth_price);
        pbfourth.amount = parseFloat(parsedData.pbfourth_amount);
        pafirst.price = parseFloat(parsedData.pafirst_price);
        pafirst.amount = parseFloat(parsedData.pafirst_amount);
        pasecond.price = parseFloat(parsedData.pasecond_price);
        pasecond.amount = parseFloat(parsedData.pasecond_amount);
        pathird.price = parseFloat(parsedData.pathird_price);
        pathird.amount = parseFloat(parsedData.pathird_amount);
        pafourth.price = parseFloat(parsedData.pafourth_price);
        pafourth.amount = parseFloat(parsedData.pafourth_amount);
        psfirst.price = parseFloat(parsedData.psfirst_price);
        psfirst.amount = parseFloat(parsedData.psfirst_amount);
        psfirst.boost = parseFloat(parsedData.psfirst_boost);
        pssecond.price = parseFloat(parsedData.pssecond_price);
        pssecond.amount = parseFloat(parsedData.pssecond_amount);
        pssecond.boost = parseFloat(parsedData.pssecond_boost);
        psthird.price = parseFloat(parsedData.psthird_price);
        psthird.amount = parseFloat(parsedData.psthird_amount);
        psthird.boost = parseFloat(parsedData.psthird_boost);
        psfourth.price = parseFloat(parsedData.psfourth_price);
        psfourth.amount = parseFloat(parsedData.psfourth_amount);
        psfourth.boost = parseFloat(parsedData.psfourth_boost);
        check13.checked = parsedData.check13_checked;
        check46.checked = parsedData.check46_checked;
        checkCoin.checked = parsedData.checkCoin_checked;

        if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету.";  document.getElementById('coinsGain').innerHTML = ""} 
            else {coinsCount.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."; document.getElementById('coinsGain').innerHTML = "";}
        if (money>1e6)
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет"; document.getElementById('coinsGain').innerHTML = ""}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins"; document.getElementById('coinsGain').innerHTML = "";}
        loadStats.call()
        changedLanguage.call()
        stopIntervals.call()
        startTextOfUpgrades.call()
        startTextOfPrestigeUpgrades.call()
        loadUpgrades.call()
        checkThisBox.call()
        if (autoSaving==1) {
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение вкл."}
        else {autoSavingGame.innerHTML = "Autosave on."}
        } 
        else {
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение выкл."}
            else {autoSavingGame.innerHTML = "Autosave off."}
        }
        if (first.amount>=1)
        cU1TL =  setInterval(commonUpgrade1TextLoad, 100)
        if (fourth.amount>=1)
        sU1B =  setInterval(singleUpgrade1Boost, 100)
        if (sixth.amount>=1)
        sU3B =  setInterval(singleUpgrade3Boost, 100)
        if (second.amount>=1)
        cU2TL =  setInterval(commonUpgrade2TextLoad, 100)
        if (psfirst.amount>=1)
        pSU1B =  setInterval(prestigeSingleUpgrade1Boost, 100)
        if (psthird.amount>=1)
        pSU3B =  setInterval(prestigeSingleUpgrade3Boost, 100)
    }

function changelog(){}

function autoSaveThis () {
            if (autoSaving==1)
            {saveGame.call()}
    }

function doHardReset () {
    if (data==1) var hr = confirm("Вы точно хотите стереть весь прогресс? Это так же коснётся ваших сохранений.")
    else var hr = confirm ("Do you want erase the whole progress? This is also affects on your save.")
    if (hr){
            money = 10
            first.price = 10
            second.price = 100
            third.price = 1000
            first.amount = 0
            second.amount = 0
            third.amount = 0
            first.b  = 0
            second.b  = 0
            third.b  = 0
            total = 10
            second.boost = 1
            third.boost = 1
            fourth.amount = 0
            fifth.amount = 0
            sixth.amount = 0
            fourth.x = 1
            fifth.x = 1
            sixth.x = 1
            fourth.price = 10000
            fifth.price = 1200000
            sixth.price = 5000000
            firstprice = 10
            secondprice = 100
            thirdprice = 1000
            diamonds = 0
            diamondsGain = 0
            diamondsBoost = 0
            pbfirst.amount = 0
            pbfirst.basePrice = 2
            pbfirst.price = 2
            pbfirstprice = 2
            pbfirst.boost = 1
            pbsecond.amount = 0
            pbsecond.basePrice = 10
            pbsecond.price = 10
            pbsecondprice = 10
            pbsecond.boost = 1
            pbthird.amount = 0
            pbthird.basePrice = 50
            pbthird.price = 50
            pbthirdprice = 50
            pbthird.boost = 1
            pbfourth.amount = 0
            pbfourth.price = 500
            pafirst.amount = 0
            pafirst.price = 1000
            pasecond.amount = 0
            pasecond.price = 2000
            pathird.amount = 0
            pathird.price = 3500
            pafourth.amount = 0
            pafourth.price = 5000
            psfirst.amount = 0
            psfirst.price = 10000
            psfirst.boost = 1
            pssecond.amount = 0
            pssecond.price = 1000000
            pssecond.boost = 1
            psthird.amount = 0
            psthird.price = 1e7
            psthird.boost = 1
            psfourth.amount = 0
            psfourth.price = 1e9
            psfourth.boost = 1
            completion = 0;
            unlockedPrestige = 0;
            autoSaving = 1;
            totalDiamond = 0
            totalPrestiges = 0
            amounts = 1
            saveGame.call();
            loadUpgrades.call();
            stopIntervals.call();
            stopIntervals.call();
            stopIntervals.call();
            stopIntervals.call();
            loadStats.call()
            prestigeAutoUpgrades.style.display = "none"
            prestigeSingleUpgrades.style.display = "none"
            prestigeTab.style.display = "none"
            autoTab.style.display = "none"
            fortuneTab.style.display = "none"
            container1.style.display = "none"
            container2.style.display = "none"
            container3.style.display = "none"
            startTextOfUpgrades.call();
            check46.checked = false
            check13.checked = false
            checkCoin.checked = false
            
            purchasedButtonSingleU1.classList.remove('purchased');
            purchasedButtonSingleU2.classList.remove('purchased');
            purchasedButtonSingleU3.classList.remove('purchased');
            purchasedButtonpBuyableU4.classList.remove('purchased')
            purchasedButtonpAutoU1.classList.remove('purchased')
            purchasedButtonpAutoU2.classList.remove('purchased')
            purchasedButtonpAutoU3.classList.remove('purchased')
            purchasedButtonpAutoU4.classList.remove('purchased')
            purchasedButtonpSingleU1.classList.remove('purchased');
            purchasedButtonpSingleU2.classList.remove('purchased');
            purchasedButtonpSingleU3.classList.remove('purchased');
            purchasedButtonpSingleU4.classList.remove('purchased');
            if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету.";  document.getElementById('coinsGain').innerHTML = ""} 
            else {coinsCount.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."; document.getElementById('coinsGain').innerHTML = "";}
            if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
            else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
            startTextOfPrestigeUpgrades.call()
    }
}
function prestigeReset (){
            money = 10
            first.price = 10
            second.price = 100
            third.price = 1000
            first.amount = 0
            second.amount = 0
            third.amount = 0
            first.b  = 0
            second.b  = 0
            third.b  = 0
            second.boost = 1
            third.boost = 1
            fourth.amount = 0
            fifth.amount = 0
            sixth.amount = 0
            fourth.x = 1
            fifth.x = 1
            sixth.x = 1
            fourth.price = 10000
            fifth.price = 1200000
            sixth.price = 5000000
            firstprice = 10
            secondprice = 100
            thirdprice = 1000
            stopPRInterval.call()
            stopPRInterval.call()
            startTextOfUpgrades.call();
            purchasedButtonSingleU1.classList.remove('purchased');
            purchasedButtonSingleU2.classList.remove('purchased');
            purchasedButtonSingleU3.classList.remove('purchased');
            if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету.";  document.getElementById('coinsGain').innerHTML = ""} 
            else {coinsCount.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."; document.getElementById('coinsGain').innerHTML = "";}
            if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
            else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
            loadStats.call()

            
}

function exportSave() {

    let datasave = {
        data: data,
            money: money,
            completion: completion,
            autoSaving: autoSaving,
            unlockedPrestige: unlockedPrestige,
            total: total,
            totalDiamond: totalDiamond,
            totalPrestiges: totalPrestiges,
            amounts: amounts,
            first_price: first.price,
            firstprice: firstprice,
            first_amount: first.amount,
            first_b: first.b,
            second_price: second.price,
            secondprice: secondprice,
            second_amount: second.amount,
            second_b: second.b,
            second_boost: second.boost,
            third_price: third.price,
            thirdprice: thirdprice,
            third_amount: third.amount,
            third_boost: third.boost,
            fourth_price: fourth.price,
            fourth_amount: fourth.amount,
            fourth_x: fourth.x,
            fifth_price: fifth.price,
            fifth_amount: fifth.amount,
            fifth_x: fifth.x,
            sixth_price: sixth.price,
            sixth_amount: sixth.amount,
            sixth_x: sixth.x,
            diamonds: diamonds,
            diamondsBoost: diamondsBoost,
            pbfirstprice: pbfirstprice,
            pbfirst_Baseprice: pbfirst.Baseprice,
            pbfirst_price: pbfirst.price,
            pbfirst_amount: pbfirst.amount,
            pbfirst_boost: pbfirst.boost,
            pbsecondprice: pbsecondprice,
            pbsecond_Baseprice: pbsecond.Baseprice,
            pbsecond_price: pbsecond.price,
            pbsecond_amount: pbsecond.amount,
            pbsecond_boost: pbsecond.boost,
            pbthirdprice: pbthirdprice,
            pbthird_Baseprice: pbthird.Baseprice,
            pbthird_price: pbthird.price,
            pbthird_amount: pbthird.amount,
            pbthird_boost: pbthird.boost,
            pbfourth_price: pbfourth.price,
            pbfourth_amount: pbfourth.amount,
            pafirst_price: pafirst.price,
            pafirst_amount: pafirst.amount,
            pasecond_price: pasecond.price,
            pasecond_amount: pasecond.amount,
            pathird_price: pathird.price,
            pathird_amount: pathird.amount,
            pafourth_price: pafourth.price,
            pafourth_amount: pafourth.amount,
            psfirst_price: psfirst.price,
            psfirst_amount: psfirst.amount,
            psfirst_boost: psfirst.boost,
            pssecond_price: pssecond.price,
            pssecond_amount: pssecond.amount,
            pssecond_boost: pssecond.boost,
            psthird_price: psthird.price,
            psthird_amount: psthird.amount,
            psthird_boost: psthird.boost,
            psfourth_price: psfourth.price,
            psfourth_amount: psfourth.amount,
            psfourth_boost: psfourth.boost,
            check46_checked: check46.checked,
            check13_checked: check13.checked,
            checkCoin_checked: checkCoin.checked
    }; //образуем переменную с кучей других переменных

    let exportedData = JSON.stringify(datasave); //превратим в строчку
    
    let base64 = btoa(exportedData); // кодируем строку в base64
    console.log(base64)
    navigator.clipboard.writeText(base64)

}

function importSave() {
    const base64 = prompt("Insert save in base64 format");
    if (!base64) {
        alert("Canceled")
        return;
    }
    try {
    const importedData = atob(base64);
    localStorage.setItem('datasaving', importedData);
    const datasave = JSON.parse(importedData);
    console.log(datasave);
    let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
    let parsedData = JSON.parse(storedData);

    money = parseFloat(parsedData.money);
    data = parseFloat(parsedData.data);
    autoSaving = parseFloat(parsedData.autoSaving)
    completion = parseFloat(parsedData.completion)
    total = parseFloat(parsedData.total);
    totalDiamond = parseFloat(parsedData.totalDiamond);
    totalPrestiges = parseFloat(parsedData.totalPrestiges);
    amounts = parseFloat(parsedData.amounts);
    unlockedPrestige = parseFloat(parsedData.unlockedPrestige)
    diamonds = parseFloat(parsedData.diamonds);
    diamondsBoost = parseFloat(parsedData.diamondsBoost);
    first.price = parseFloat(parsedData.first_price);
    firstprice = parseFloat(parsedData.firstprice);
    first.amount = parseFloat(parsedData.first_amount);
    first.b = parseFloat(parsedData.first_b);
    second.price = parseFloat(parsedData.second_price);
    secondprice = parseFloat(parsedData.secondprice);
    second.amount = parseFloat(parsedData.second_amount);
    second.b = parseFloat(parsedData.second_b);
    second.boost = parseFloat(parsedData.second_boost);
    third.price = parseFloat(parsedData.third_price);
    thirdprice = parseFloat(parsedData.thirdprice);
    third.amount = parseFloat(parsedData.third_amount);
    third.boost = parseFloat(parsedData.third_boost);
    fourth.price = parseFloat(parsedData.fourth_price);
    fourth.amount = parseFloat(parsedData.fourth_amount);
    fourth.x = parseFloat(parsedData.fourth_x);
    fifth.price = parseFloat(parsedData.fifth_price);
    fifth.amount = parseFloat(parsedData.fifth_amount);
    fifth.x = parseFloat(parsedData.fifth_x);
    sixth.price = parseFloat(parsedData.sixth_price);
    sixth.amount = parseFloat(parsedData.sixth_amount);
    sixth.x = parseFloat(parsedData.sixth_x);
    pbfirst.price = parseFloat(parsedData.pbfirst_price);
    pbfirstprice = parseFloat(parsedData.pbfirstprice);
    pbfirst.Baseprice = parseFloat(parsedData.pbfirst_Baseprice);
    pbfirst.amount = parseFloat(parsedData.pbfirst_amount);
    pbfirst.boost = parseFloat(parsedData.pbfirst_boost);
    pbsecond.price = parseFloat(parsedData.pbsecond_price);
    pbsecondprice = parseFloat(parsedData.pbsecondprice);
    pbsecond.Baseprice = parseFloat(parsedData.pbsecond_Baseprice);
    pbsecond.amount = parseFloat(parsedData.pbsecond_amount);
    pbsecond.boost = parseFloat(parsedData.pbsecond_boost);
    pbthird.price = parseFloat(parsedData.pbthird_price);
    pbthirdprice = parseFloat(parsedData.pbthirdprice);
    pbthird.Baseprice = parseFloat(parsedData.pbthird_Baseprice);
    pbthird.amount = parseFloat(parsedData.pbthird_amount);
    pbthird.boost = parseFloat(parsedData.pbthird_boost);
    pbfourth.price = parseFloat(parsedData.pbfourth_price);
    pbfourth.amount = parseFloat(parsedData.pbfourth_amount);
    pafirst.price = parseFloat(parsedData.pafirst_price);
    pafirst.amount = parseFloat(parsedData.pafirst_amount);
    pasecond.price = parseFloat(parsedData.pasecond_price);
    pasecond.amount = parseFloat(parsedData.pasecond_amount);
    pathird.price = parseFloat(parsedData.pathird_price);
    pathird.amount = parseFloat(parsedData.pathird_amount);
    pafourth.price = parseFloat(parsedData.pafourth_price);
    pafourth.amount = parseFloat(parsedData.pafourth_amount);
    psfirst.price = parseFloat(parsedData.psfirst_price);
    psfirst.amount = parseFloat(parsedData.psfirst_amount);
    psfirst.boost = parseFloat(parsedData.psfirst_boost);
    pssecond.price = parseFloat(parsedData.pssecond_price);
    pssecond.amount = parseFloat(parsedData.pssecond_amount);
    pssecond.boost = parseFloat(parsedData.pssecond_boost);
    psthird.price = parseFloat(parsedData.psthird_price);
    psthird.amount = parseFloat(parsedData.psthird_amount);
    psthird.boost = parseFloat(parsedData.psthird_boost);
    psfourth.price = parseFloat(parsedData.psfourth_price);
    psfourth.amount = parseFloat(parsedData.psfourth_amount);
    psfourth.boost = parseFloat(parsedData.psfourth_boost);
    check13.checked = parsedData.check13_checked;
    check46.checked = parsedData.check46_checked;
    checkCoin.checked = parsedData.checkCoin_checked;


    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету.";  document.getElementById('coinsGain').innerHTML = ""} 
            else {coinsCount.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."; document.getElementById('coinsGain').innerHTML = "";}
        if (money>1e6)
        if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет"; document.getElementById('coinsGain').innerHTML = ""}
        else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins"; document.getElementById('coinsGain').innerHTML = "";}
        loadStats.call()
        changedLanguage.call()
        stopIntervals.call()
        startTextOfUpgrades.call()
        startTextOfPrestigeUpgrades.call()
        loadUpgrades.call()
        checkThisBox.call()
        if (autoSaving==1) {
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение вкл."}
        else {autoSavingGame.innerHTML = "Autosave on."}
        } 
        else {
        if (data==1) {autoSavingGame.innerHTML = "Автосохранение выкл."}
            else {autoSavingGame.innerHTML = "Autosave off."}
        }
        if (first.amount>=1)
        cU1TL =  setInterval(commonUpgrade1TextLoad, 100)
        if (fourth.amount>=1)
        sU1B =  setInterval(singleUpgrade1Boost, 100)
        if (sixth.amount>=1)
        sU3B =  setInterval(singleUpgrade3Boost, 100)
        if (second.amount>=1)
        cU2TL =  setInterval(commonUpgrade2TextLoad, 100)
        if (psfirst.amount>=1)
        pSU1B =  setInterval(prestigeSingleUpgrade1Boost, 100)
        if (psthird.amount>=1)
        pSU3B =  setInterval(prestigeSingleUpgrade3Boost, 100)
    }
    catch {alert('Wrong input')}
}

function stopIntervals () {
    clearInterval(cU1TL)
    clearInterval(sU1B)
    clearInterval(sU3B)
    clearInterval(cU2TL)
    clearInterval(cU1TL)
    clearInterval(sU1B)
    clearInterval(sU3B)
    clearInterval(cU2TL)
    clearInterval(cU1TL)
    clearInterval(sU1B)
    clearInterval(sU3B)
    clearInterval(cU2TL)
    clearInterval(pSU1B)
    clearInterval(pSU1B)
    clearInterval(pSU1B)
    clearInterval(pSU3B)
    clearInterval(pSU3B)
    clearInterval(pSU3B)
    clearInterval(autoBuy13Interval)
    clearInterval(autoBuy46Interval)
    clearInterval(autoCoinInterval)
    clearInterval(autoBuy13Interval)
    clearInterval(autoBuy46Interval)
    clearInterval(autoCoinInterval)
    clearInterval(autoBuy13Interval)
    clearInterval(autoBuy46Interval)
    clearInterval(autoCoinInterval)
}

function stopPRInterval () {
    clearInterval(cU1TL)
    clearInterval(sU1B)
    clearInterval(sU3B)
    clearInterval(cU2TL)
}

function checkThisBox () {
            if (check46.checked) { // флажок отмечен
              autoBuy46Interval = setInterval(autoBuy46, 100); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoBuy46Interval); // останавливаем запуск функции autoBuy46()
            }
            if (check13.checked) { // флажок отмечен
              autoBuy13Interval = setInterval(autoBuy13, 33); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoBuy13Interval); // останавливаем запуск функции autoBuy46()
            }
            if (checkCoin.checked) { // флажок отмечен
              autoCoinInterval = setInterval(autoCoin, 33); // запускаем функцию autoBuy46() каждую секунду
            } else { // флажок снят
              clearInterval(autoCoinInterval); // останавливаем запуск функции autoBuy46()
            }
            return autoCoinInterval, autoBuy46Interval, autoBuy13Interval;
          }