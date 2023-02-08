window.setInterval(savezone2, 10000); //таймер

var firstprice = Math.round(first.basecost*Math.pow(1.175, first.amount))
var secondprice = Math.round(second.basecost*Math.pow(1.275, second.amount));
var thirdprice = Math.round(third.basecost*Math.pow(1.375, third.amount))


function upges() {
    if (first.amount >=1){
        var firstbf = first.b*second.boost
        if (data) {fupg.innerHTML = "<ut>Небольшая Инвестиция</ut> <br> Увеличивает монеты за нажатие. <br> Стоимость: " + Math.round(first.basecost*Math.pow(1.175, first.amount)).toFixed(0) + " α-монет. <br> Бонус: +" + firstbf.toFixed(1) } 
        else {fupg.innerHTML = "<ut>Small Investment</ut> <br> Increases coins gain per click. <br> Cost: " + Math.round(first.basecost*Math.pow(1.175, first.amount)).toFixed(0) + " α-coins. <br> Currently: +" + firstbf.toFixed(1)}}
        
    if (second.amount >=1){
        if (data) {supg.innerHTML = "<ut>Продуктивность</ut> <br> Увеличивает бонус Небольшая Инвестиция. <br> Стоимость: " + Math.round(second.basecost*Math.pow(1.275, second.amount)).toFixed(0) + " α-монет. <br> Бонус: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"} 
        else {supg.innerHTML = "<ut>Productivity</ut> <br> Increases Small Investment bonus. <br> Cost: " + Math.round(second.basecost*Math.pow(1.275, second.amount)).toFixed(0) + " α-coins. <br> Currently: +" + ((second.amount*10)*sixth.x).toFixed(0) + "%"};
    }
    if (third.amount >=1){
        if (data) {thupg.innerHTML = "<ut>Золотой Мешок</ut> <br> Умножает α-монеты за клик на 1.05. <br> Стоимость: " +Math.round(third.basecost*Math.pow(1.375, third.amount)).toFixed() + " α-монет. <br> Бонус: х" + third.boost.toFixed(2)} 
        else {thupg.innerHTML = "<ut>Golden Pouch</ut> <br> Multiplies α-coins gain by 1.05. <br> Cost: " + Math.round(third.basecost*Math.pow(1.375, third.amount)).toFixed() + " α-coins. <br> Currently: х" + third.boost.toFixed(2)}
    }
    if (fourth.amount >=1){
        fourth.x = Math.log(total)
        window.setInterval(fupgboost, 100)
        foupg.style.backgroundColor = '#1724b1'; foupg.style.color = '#000000'
        if (data) {foupg.innerHTML = "<ut>Богатая Слава</ut> <br> Увеличивает α-монеты за нажатие в зависимости от количества всего α-монет. <br> Текущий бонус: x" + fourth.x.toFixed(2)}
        else {foupg.innerHTML = "<ut>Rich Fame</ut> <br> Increases α-coins gain based on total α-coins. <br> Currently: x" + fourth.x.toFixed(2)}
    }
    if (fifth.amount >=1){
        fifth.x = 2
        fiupg.style.backgroundColor = '#111b8a'; fiupg.style.color = '#000000'
        if (data) {fiupg.innerHTML = "<ut>Бездонный Кошелёк</ut> <br> Удваивает α-монеты за нажатие."}
        else {fiupg.innerHTML = "<ut>Bottomless Wallet</ut> <br> Doubles your α-coins gain."}
    }
    if (sixth.amount >=1){
        sixth.x = Math.log(first.amount)
        window.setInterval(siupgboost, 100)
        siupg.style.backgroundColor = '#0c1575'; siupg.style.color = '#000000'
        if (data) {siupg.innerHTML = "<ut>Сверхпродуктивность</ut> <br> Увеличивает бонус Продуктивность в зависимости от кол-ва покупок Небольшая Инвестиция. <br> Бонус: x" + sixth.x.toFixed(2)}
        else {siupg.innerHTML = "<ut>Super Productivity</ut> <br> Increases bonus of Productivity based on amount of Small Investment. Currently: x" + sixth.x.toFixed(2)}
    }
}

function saveorno(ele5){
    if (!autosaving) 
    {
        autosaving=true;
        if (data) {ele5.innerHTML = "Автосохранение вкл."}
        else {ele5.innerHTML = "Autosave on."}
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
        
            localStorage["money_mfs_count"] = money;
            localStorage["double_mfs_count"] = first.price;
            localStorage["multi_mfs_count"] = second.price;
            localStorage["five_mfs_count"] = third.price;
            localStorage["1st_mfs_count"] = first.amount;
            localStorage["2nd_mfs_count"] = second.amount;
            localStorage["3rd_mfs_count"] = third.amount;
            localStorage["db_mfs_count"] = first.b;
            localStorage["mb_mfs_count"] = second.b ;
            localStorage["fb_mfs_count"] = third.b ;
            localStorage["total_mfs_count"] = total;
            localStorage["mboost_mfs_count"] = second.boost;
            localStorage["fboost_mfs_count"] = third.boost;
            localStorage["fouramount_mfs_count"] = fourth.amount;
            localStorage["fiveamount_mfs_count"] = fifth.amount;
            localStorage["sixamount_mfs_count"] = sixth.amount;
            localStorage["fourprice_mfs_count"] = fourth.price;
            localStorage["fiveprice_mfs_count"] = fifth.price;
            localStorage["sixprice_mfs_count"] = sixth.price;
            localStorage["fourx_mfs_count"] = fourth.x;
            localStorage["fivex_mfs_count"] = fifth.x;
            localStorage["sixx_mfs_count"] = sixth.x;
            localStorage["complete_mfs_count"] = completion;
            localStorage["firstprice_mfs_count"] = firstprice;
            localStorage["secondprice_mfs_count"] = secondprice;
            localStorage["thirdprice_mfs_count"] = thirdprice;
    }
}
function loadzone () {
    if (localStorage)   {
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
        var savedfoamount = localStorage["fouramount_mfs_count"] 
        var savedfiamount = localStorage["fiveamount_mfs_count"] 
        var savedsiamount = localStorage["sixamount_mfs_count"] 
        var savedfoprice = localStorage["fourprice_mfs_count"] 
        var savedfiprice = localStorage["fiveprice_mfs_count"]
        var savedsiprice = localStorage["sixprice_mfs_count"] 
        var savedfox = localStorage["fourx_mfs_count"] 
        var savedfix = localStorage["fivex_mfs_count"] 
        var savedsix = localStorage["sixx_mfs_count"] 
        var ibeatit = localStorage["complete_mfs_count"] 
        var fstprice = localStorage["firstprice_mfs_count"]
        var sndprice = localStorage["secondprice_mfs_count"]
        var thiprice = localStorage["thirdprice_mfs_count"]
    }
        if (savedmoney != null) money=Number(savedmoney);
        if (saveddouble != null) first.price=Number(saveddouble);
        if (savedmulti != null) second.price=Number(savedmulti);
        if (savedfive != null) third.price=Number(savedfive);
        if (saved1st != null) first.amount=Number(saved1st);
        if (saved2nd != null) second.amount=Number(saved2nd);
        if (saved3rd != null) third.amount=Number(saved3rd);
        if (saveddb != null) first.b  =Number(saveddb);
        if (savedmb != null) second.b  =Number(savedmb);
        if (savedfb != null) third.b  =Number(savedfb);
        if (savedtotal != null) total=Number(savedtotal);
        if (savedmboost != null) second.boost=Number(savedmboost);
        if (savedfboost != null) third.boost=Number(savedfboost);
        if (savedfoprice != null) fourth.price=Number(savedfoprice);
        if (savedfiprice != null) fifth.price=Number(savedfiprice);
        if (savedsiprice != null) sixth.price=Number(savedsiprice);
        if (savedfoamount != null) fourth.amount=Number(savedfoamount);
        if (savedfiamount != null) fifth.amount=Number(savedfiamount);
        if (savedsiamount != null) sixth.amount=Number(savedsiamount);
        if (savedfox != null) fourth.x=Number(savedfox);
        if (savedfix != null) fifth.x=Number(savedfix);
        if (savedsix != null) sixth.x=Number(savedsix);
        if (ibeatit != null) completion=Boolean(ibeatit);
        if (fstprice != null) firstprice=Number(fstprice);
        if (sndprice != null) secondprice=Number(sndprice);
        if (thiprice != null) thirdprice=Number(thiprice);
        if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету.";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin.";}
        if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
        else{summa.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
        upges.call()
    }

function changelog(){
    
}

function savezone2 () {
    if (localStorage)
        {
            if (autosaving)
            {
                localStorage["money_mfs_count"] = money;
                localStorage["double_mfs_count"] = first.price;
                localStorage["multi_mfs_count"] = second.price;
                localStorage["five_mfs_count"] = third.price;
                localStorage["1st_mfs_count"] = first.amount;
                localStorage["2nd_mfs_count"] = second.amount;
                localStorage["3rd_mfs_count"] = third.amount;
                localStorage["db_mfs_count"] = first.b;
                localStorage["mb_mfs_count"] = second.b ;
                localStorage["fb_mfs_count"] = third.b ;
                localStorage["total_mfs_count"] = total;
                localStorage["mboost_mfs_count"] = second.boost;
                localStorage["fboost_mfs_count"] = third.boost;
                localStorage["fouramount_mfs_count"] = fourth.amount;
                localStorage["fiveamount_mfs_count"] = fifth.amount;
                localStorage["sixamount_mfs_count"] = sixth.amount;
                localStorage["fourprice_mfs_count"] = fourth.price;
                localStorage["fiveprice_mfs_count"] = fifth.price;
                localStorage["sixprice_mfs_count"] = sixth.price;
                localStorage["fourx_mfs_count"] = fourth.x;
                localStorage["fivex_mfs_count"] = fifth.x;
                localStorage["sixx_mfs_count"] = sixth.x;
                localStorage["complete_mfs_count"] = completion;
                localStorage["firstprice_mfs_count"] = firstprice;
                localStorage["secondprice_mfs_count"] = secondprice;
                localStorage["thirdprice_mfs_count"] = thirdprice;
            }
        }
    }

function hardreset () {
    if (data) var hr = confirm("Вы точно хотите стереть весь прогресс? Это так же коснётся ваших сохранений.")
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
            completion = false;
            savezone.call();
            upgs.call();
            window.location.reload(true);
            if (data) {ele.innerHTML = innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету."} 
            else {ele.innerHTML = innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."}
            if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
            else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
            window.clearInterval(window.setInterval(doubletext))
            window.clearInterval(window.setInterval(fupgboost))
            window.clearInterval(window.setInterval(siupgboost))
            window.clearInterval(window.setInterval(multitext))
    }
}