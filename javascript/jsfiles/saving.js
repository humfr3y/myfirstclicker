window.setInterval(savezone2, 10000); //таймер

function upges() {
    if (first.amount >=1){
        var firstbf = first.b*second.boost
    if (data) {fupg.innerHTML = "Улучшение даёт +" + firstbf.toFixed(1) + " монет за нажатие. Чтобы улучшить его вам нужно " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.85)).toFixed(0) + " монет."} 
        else {fupg.innerHTML = "Upgrade gives +" + firstbf.toFixed(1) + " coins per click. You need for next upgrade " + Math.round(10+((first.amount+1)*10*Math.log(first.amount+1)/1.85)).toFixed(0) + " coins."}}
    if (second.amount >=1){
        if (data) {supg.innerHTML = "Улучшение увеличивает бонус первого улучшения на +" + (second.amount*10) + "%. Чтобы увеличить бонус на 10% вам нужно " + Math.round(100+((second.amount+1)*100*Math.log(second.amount+1)/2.25)).toFixed(0) + " монет."} 
        else {supg.innerHTML = "Upgrade increases first upgrade bonus by +" + (second.mamount*10) + "%. You need for next upgrade " + Math.round(100+((second.amount+1)*100*Math.log(second.amount+1)/2.25)).toFixed(0) + " coins."};
    }
    if (third.amount >=1){
        if (data) {thupg.innerHTML = "Улучшение увеличивает монеты за клик на +" + ((third.b/20)*100).toFixed(0) + "%. Чтобы улучшить его вам нужно " + Math.round(1000+((third.amount+1)*1000*Math.log(third.amount+1)/2.9)).toFixed() + " монет."} 
        else {thupg.innerHTML = "Upgrade increases coin gain by +" + ((fb/20)*100).toFixed(0) + "%. You need for next upgrade " + Math.round(1000+((third.amount+1)*1000*Math.log(third.amount+1)/2.9)).toFixed(0) + " coins."}
    }
    if (fourth.amount >=1){
        fourth.x = Math.log(total)
        window.setInterval(fupgboost, 100)
        if (data) {foupg.innerHTML = "Улучшение увеличивает монеты за клик в зависимости от всего монет. Текущий бонус: x" + fourth.x.toFixed(2)}
        else {foupg.innerHTML = "Upgrade increases coin gain based on total coins. Currently: x" + fourth.x.toFixed(2)}
    }
    if (fifth.amount >=1){
        fifth.x = 2
        if (data) {fiupg.innerHTML = "Улучшение удваивает монеты за клик"}
        else {fiupg.innerHTML = "Upgrade doubles your coin gain."}
    }
    if (sixth.amount >=1){
        sixth.x = Math.log(first.amount)
        window.setInterval(siupgboost, 100)
        if (data) {siupg.innerHTML = "Улучшение увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого. Текущий бонус: x" + sixth.x.toFixed(2)}
        else {siupg.innerHTML = "Upgrade increases bonus of second upgrade based on amount of first upgrade. Currently: x" + sixth.x.toFixed(2)}
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
        if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Нажмите на монету.";}
        else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. Click on the coin.";}
        if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
        else{summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
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
            third.boost = 0
            fourth.amount = 0
            fifth.amount = 0
            sixth.amount = 0
            fourth.x = 1
            fifth.x = 1
            sixth.x = 1
            fourth.price = 10000
            fifth.price = 1200000
            sixth.price = 15000000
            savezone.call();
            upgs.call();
            if (data) {ele.innerHTML = innerHTML = money.toFixed(0) + " монет. Нажмите на монету."} 
            else {ele.innerHTML = innerHTML = money.toFixed(0) + " coins. Click on the coin."}
            if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
            else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
    }
}