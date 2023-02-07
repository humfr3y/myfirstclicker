var money = 10;
var total = 10;
var gain = 1;
var autosaving=false; 
var data=confirm("Do you want to change language for Russian? / Хотите ли вы изменить язык на русский?")
var endgoal = 1000000000;
var completion = false;
var warning = document.getElementById('warning');
var summa = document.getElementById('summa');
var notification = document.getElementById('notification');
let link = document.getElementById('link');
let btg = document.getElementById("buttongroup");
let sscr = document.getElementById("settscr");
let mscr = document.getElementById("mainscr");
let uscr = document.getElementById("unkscr");
let iscr = document.getElementById("infoscr");
let escr = document.getElementById("endscr");
var onecheck = false;
var firstprice = Math.round(first.basecost*Math.pow(1.175, first.amount))
var secondprice = Math.round(second.basecost*Math.pow(1.275, second.amount));
var thirdprice = Math.round(third.basecost*Math.pow(1.375, third.amount))

if (data) {setting.innerHTML = "Настройки"}
else {setting.innerHTML = "Settings"}
if (data) {clicking.innerHTML = "Кликер"}
else {clicking.innerHTML = "Clicker"}
if (data) {unknownthing.innerHTML = "???????"}
else {unknownthing.innerHTML = "???????"}
if (data) {info.innerHTML = "Информация"}
else {info.innerHTML = "Information"}
if (data) {warning.innerHTML = "Обновление страницы сбрасывает игру! СОХРАНЯЙТЕ ИГРУ!"}
else {warning.innerHTML = "Reloading page resets the game! SAVE THE GAME!"};
if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
if (data) {ele.innerHTML = innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету."} 
else {ele.innerHTML = innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."}

if (data) {saveme.innerHTML = innerHTML = "Сохранить игру"} 
else {saveme.innerHTML = innerHTML = "Save game"}
if (data) {loadme.innerHTML = innerHTML = "Загрузить игру"} 
else {loadme.innerHTML = innerHTML = "Load game"}
if (data) {autosaveme.innerHTML = "Автосохранение выкл."}
else {autosaveme.innerHTML = "Autosave off."}
if (data) {changelog1.innerHTML = "Журнал изменений"}
else {changelog1.innerHTML = "Changelog"}
if (data) {link.href = 'changelogru.md'}
else {link.href = 'changelog.md'}
if (data) {hard.innerHTML = "Сбросить игру"}
else {hard.innerHTML = "Reset the game"}

if (data) {playmore.innerHTML = "Играть дальше"}
else {playmore.innerHTML = "Play more"}

window.setInterval(disableit, 100); 
iscr.style.display = "none"
uscr.style.display = "none"
sscr.style.display = "none"
escr.style.display = "none"



function upgs () {
if (data) {fupg.innerHTML = "Открыть улучшение за 10 α-монет. Увеличивает α-монеты за нажатие."}
else {fupg.innerHTML = "Unlock upgrade for 10 α-coins. Increases α-coins per one click.   "}
if (data) {supg.innerHTML = "Открыть улучшение за 100 α-монет. Увеличивает бонус от 1ого улучшения."}
else {supg.innerHTML = "Unlock upgrade for 100 α-coins. Increases bonus from first upgrade."}
if (data) {thupg.innerHTML = "Открыть улучшение за 1000 α-монет. Умножает α-монеты за нажатие на х1.05."}
else {thupg.innerHTML = "Unlock upgrade for 1000 α-coins. Multiplies α-coins per click by x1.05."}
if (data) {foupg.innerHTML = "Открыть улучшение за 10000 α-монет. Увеличивает α-монеты за нажатие в зависимости от всего α-монет."}
else {foupg.innerHTML = "Unlock upgrade for 10000 α-coins. Increases α-coins per click based on total α-coins."}
if (data) {fiupg.innerHTML = "Открыть улучшение за 1200000 α-монет. Удваивает ваши α-монеты за нажатия."}
else {fiupg.innerHTML = "Unlock upgrade for 1200000 α-coins. Doubles your α-coin gain per click."}
if (data) {siupg.innerHTML = "Открыть улучшение за 5000000 α-монет. Увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого."}
else {siupg.innerHTML = "Unlock upgrade for 5000000 α-coins. Increases second upgrade bonus based on amount of first upgrades."}
}
upgs.call();

function monetka() {
    if (third.boost == 0)
    {third.boost = 1}
    money = money+1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    total = total+1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    gain = 1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-монет"; document.getElementById('coinsget').innerHTML = "Вы получили за нажатие " + (gain).toFixed(0)+ " α-монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " α-coins"; document.getElementById('coinsget').innerHTML = "You've earned from a click " + (gain).toFixed(0) + " α-coins";}
    if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
    else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
    if (money>endgoal && (completion == false)) {endscreentab.call(); completion = true}
    if (onecheck==false) {
    if (money<endgoal && (completion == true)) {completion = false; onecheck = true}
    }
    return gain, money;
};


function settingtab() {
    mscr.style.display = "none";
    iscr.style.display = "none";
    sscr.style.display = "block";
    uscr.style.display = "none";
    escr.style.display = "none";
    document.getElementById("setting").style.backgroundColor = 'white';
    document.getElementById("setting").style.color = 'black';
    document.getElementById("clicking").style.backgroundColor = 'black';
    document.getElementById("clicking").style.color = 'white';
    document.getElementById("unknownthing").style.backgroundColor = 'black';
    document.getElementById("unknownthing").style.color = 'white';
    document.getElementById("info").style.backgroundColor = 'black';
    document.getElementById("info").style.color = 'white';
    
}
function maintab() {
    mscr.style.display = "block";
    iscr.style.display = "none";
    sscr.style.display = "none";
    uscr.style.display = "none";
    btg.style.display = "block";
    escr.style.display = "none";
    document.getElementById("setting").style.backgroundColor = 'black';
    document.getElementById("setting").style.color = 'white';
    document.getElementById("clicking").style.backgroundColor = 'white';
    document.getElementById("clicking").style.color = 'black';
    document.getElementById("unknownthing").style.backgroundColor = 'black';
    document.getElementById("unknownthing").style.color = 'white';
    document.getElementById("info").style.backgroundColor = 'black';
    document.getElementById("info").style.color = 'white';
}
function unknowntab() {
    mscr.style.display = "none";
    iscr.style.display = "none";
    sscr.style.display = "none";
    uscr.style.display = "block";
    escr.style.display = "none";
    document.getElementById("setting").style.backgroundColor = 'black';
    document.getElementById("setting").style.color = 'white';
    document.getElementById("clicking").style.backgroundColor = 'black';
    document.getElementById("clicking").style.color = 'white';
    document.getElementById("unknownthing").style.backgroundColor = 'white';
    document.getElementById("unknownthing").style.color = 'black';
    document.getElementById("info").style.backgroundColor = 'black';
    document.getElementById("info").style.color = 'white';
}
function info1() {
    mscr.style.display = "none";
    iscr.style.display = "block";
    sscr.style.display = "none";
    uscr.style.display = "none";
    escr.style.display = "none";
    document.getElementById("setting").style.backgroundColor = 'black';
    document.getElementById("setting").style.color = 'white';
    document.getElementById("clicking").style.backgroundColor = 'black';
    document.getElementById("clicking").style.color = 'white';
    document.getElementById("unknownthing").style.backgroundColor = 'black';
    document.getElementById("unknownthing").style.color = 'white';
    document.getElementById("info").style.backgroundColor = 'white';
    document.getElementById("info").style.color = 'black';
}
function endscreentab() {
    mscr.style.display = "none";
    iscr.style.display = "none";
    sscr.style.display = "none";
    uscr.style.display = "none";
    btg.style.display = "none";
    escr.style.display = "block";
    document.getElementById("setting").style.backgroundColor = 'black';
    document.getElementById("setting").style.color = 'white';
    document.getElementById("clicking").style.backgroundColor = 'black';
    document.getElementById("clicking").style.color = 'white';
    document.getElementById("unknownthing").style.backgroundColor = 'black';
    document.getElementById("unknownthing").style.color = 'white';
    document.getElementById("info").style.backgroundColor = 'black';
    document.getElementById("info").style.color = 'white';
}


function disableit(){
    if (money>=firstprice) {
        document.getElementById('fupg').disabled = false;
    }
    else {
        document.getElementById('fupg').disabled = true;
    }
    if (money>=secondprice) {
        document.getElementById('supg').disabled = false;
    }
    else {
        document.getElementById('supg').disabled = true;
    }
    if (money>=thirdprice) {
        document.getElementById('thupg').disabled = false;
    }
    else {
        document.getElementById('thupg').disabled = true;
    }
    if (money>=fourth.price) {
        document.getElementById('foupg').disabled = false;
    }
    else {
        document.getElementById('foupg').disabled = true;
    }
    if (money>=fifth.price) {
        document.getElementById('fiupg').disabled = false;
    }
    else {
        document.getElementById('fiupg').disabled = true;
    }
    if (money>=sixth.price) {
        document.getElementById('siupg').disabled = false;
    }
    else {
        document.getElementById('siupg').disabled = true;
    }
    return document.getElementById('fupg').disabled, document.getElementById('supg').disabled, document.getElementById('thupg').disabled, document.getElementById('foupg').disabled, document.getElementById('fiupg').disabled, document.getElementById('siupg').disabled
    }

if (data) {about.innerHTML = "Об игре: <br><br> Мой 1ый Кликер 0.5 <br> Главная цель: 1,000,000,000 α-монет. <br><br> Спасибо Орехус#7698 за перевод на русский. <br> Спасибо также всем кто хоть немного поиграл в игру."}
else {about.innerHTML = "About game: <br> <br> My1stClicker 0.5 <br> Main goal: 1,000,000,000 α-coins. <br><br> Thanks Орехус#7698 for russian translate. <br> Thanks everyone for playing."}

if (data) {thegoal.innerHTML = "Чтобы открыть это вам нужно 1 миллиард α-монет."}
else {thegoal.innerHTML = "You need 1 billion α-coins to unlock."}

if (data) {endscreen.innerHTML = "Поздравляем, вы прошли игру! Однако, только в этой версии. В следующих обновлениях будет всё больше новых вещей. Если будешь ещё играть нажимай Играть Дальше!"}
else {endscreen.innerHTML = "Congratulations, you have completed game! However, only in this version. In the future there will be many new things. If you wanna play more press Play More!"}

