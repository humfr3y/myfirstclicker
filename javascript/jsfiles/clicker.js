var money = 10;
var total = 10;
var gain = 1;
var autosaving=false; 
var data=confirm("Do you want to change language for Russian? / Хотите ли вы изменить язык на русский?")

var warning = document.getElementById('warning');
var summa = document.getElementById('summa');
var notification = document.getElementById('notification');
let link = document.getElementById('link');


if (data) {warning.innerHTML = "Обновление страницы сбрасывает игру! СОХРАНЯЙТЕ ИГРУ!"}
else {warning.innerHTML = "Reloading page resets the game! SAVING THE GAME!"};
if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
if (data) {ele.innerHTML = innerHTML = money.toFixed(0) + " монет. Нажмите на монету."} 
else {ele.innerHTML = innerHTML = money.toFixed(0) + " coins. Click on the coin."}
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

window.setInterval(disableit, 100); 





function upgs () {
if (data) {fupg.innerHTML = "Открыть улучшение за 10 монет. Увеличивает монеты за нажатие."}
else {fupg.innerHTML = "Unlock upgrade for 10 coins. Increases coins per one click.   "}
if (data) {supg.innerHTML = "Открыть улучшение за 100 монет. Увеличивает бонус от 1ого улучшения."}
else {supg.innerHTML = "Unlock upgrade for 100 coins. Increases bonus from first upgrade."}
if (data) {thupg.innerHTML = "Открыть улучшение за 1000 монет. Увеличивает монеты за нажатие на несколько процентов."}
else {thupg.innerHTML = "Unlock upgrade for 1000 coins. Increases coins per click by percents."}
if (data) {foupg.innerHTML = "Открыть улучшение за 10000 монет. Увеличивает монеты за нажатие в зависимости от всего монет."}
else {foupg.innerHTML = "Unlock upgrade for 10000 coins. Increases coins per click based on total coins."}
if (data) {fiupg.innerHTML = "Открыть улучшение за 1200000 монет. Удваивает ваши монеты за нажатия."}
else {fiupg.innerHTML = "Unlock upgrade for 1200000 coins. Doubles your coin gain per click."}
if (data) {siupg.innerHTML = "Открыть улучшение за 15000000 монет. Увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого."}
else {siupg.innerHTML = "Unlock upgrade for 15000000 coins. Increases second upgrade bonus based on amount of first upgrades."}
}
upgs.call();

function monetka() {
    money = money+1*((1+third.boost)+(first.b*second.boost)*fourth.x*fifth.x);
    total = total+1*((1+third.boost)+(first.b*second.boost)*fourth.x*fifth.x);
    gain = 1*((1+third.boost)+(first.b*second.boost)*fourth.x*fifth.x);
    if (data) {document.getElementById('ele').innerHTML = money.toFixed(0) + " монет. Вы получили за нажатие " + (gain).toFixed(0)+ " монет";}
    else {document.getElementById('ele').innerHTML = money.toFixed(0) + " coins. You've earned from a click " + (gain).toFixed(0) + " coins";}
    if (data) {summa.innerHTML = "Всего вы собрали " + total.toFixed(0) + " монет."} 
    else {summa.innerHTML = "Total you collected " + total.toFixed(0) + " coins."}
    return gain, money;
};
















function disableit(){
    if (money>=first.price) {
        document.getElementById('fupg').disabled = false;
    }
    else {
        document.getElementById('fupg').disabled = true;
    }
    if (money>=second.price) {
        document.getElementById('supg').disabled = false;
    }
    else {
        document.getElementById('supg').disabled = true;
    }
    if (money>=third.price) {
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