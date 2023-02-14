var money = 10;
var total = 10;
var gain = 1;
var autoSaving=true; 
var data=confirm("Do you want to change language for Russian? / Хотите ли вы изменить язык на русский?")
var endGoal = 1e9;
var completion = false;
var totalCoins = document.getElementById('totalCoins');
let link = document.getElementById('link');
var onecheck = false;
var firstprice = Math.round(first.basePrice*Math.pow(1.175, first.amount))
var secondprice = Math.round(second.basePrice*Math.pow(1.275, second.amount));
var thirdprice = Math.round(third.basePrice*Math.pow(1.375, third.amount))

if (data) {settingsTab.innerHTML = "Настройки"}
else {settingsTab.innerHTML = "Settings"}
if (data) {mainTab.innerHTML = "Кликер"}
else {mainTab.innerHTML = "Clicker"}
if (data) {prestigeTab.innerHTML = "???????"}
else {prestigeTab.innerHTML = "???????"}
if (data) {infoTab.innerHTML = "Информация"}
else {infoTab.innerHTML = "Information"}
if (data) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
if (data) {coinGain.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету."} 
else {coinGain.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."}

if (data) {savingGame.innerHTML = "Сохранить игру"} 
else {savingGame.innerHTML = "Save game"}
if (data) {loadingGame.innerHTML = "Загрузить игру"} 
else {loadingGame.innerHTML = "Load game"}
if (data) {autoSavingGame.innerHTML = "Автосохранение вкл."}
else {autoSavingGame.innerHTML = "Autosave on."}
if (data) {changelogOpen.innerHTML = "Журнал изменений"}
else {changelogOpen.innerHTML = "Changelog"}
if (data) {link.href = 'changelogru.md'}
else {link.href = 'changelog.md'}
if (data) {hardRes.innerHTML = "Сбросить игру"}
else {hardRes.innerHTML = "Reset the game"}

if (data) {playMore.innerHTML = "Играть дальше"}
else {playMore.innerHTML = "Play more"}

window.setInterval(disabledUpgrades, 100); 
statsScreen.style.display = "none"
prestigeButtons.style.display = "none"
settingButtons.style.display = "none"
endGoodGameScreen.style.display = "none"



function startTextOfUpgrades () {
if (data) {commonU1.innerHTML = "Открыть улучшение за 10 α-монет. Увеличивает α-монеты за нажатие."}
else {commonU1.innerHTML = "Unlock upgrade for 10 α-coins. Increases α-coins per one click.   "}
if (data) {commonU2.innerHTML = "Открыть улучшение за 100 α-монет. Увеличивает бонус от 1ого улучшения."}
else {commonU2.innerHTML = "Unlock upgrade for 100 α-coins. Increases bonus from first upgrade."}
if (data) {commonU3.innerHTML = "Открыть улучшение за 1000 α-монет. Умножает α-монеты за нажатие на х1.05."}
else {commonU3.innerHTML = "Unlock upgrade for 1000 α-coins. Multiplies α-coins per click by x1.05."}
if (data) {singleU1.innerHTML = "Открыть улучшение за 10000 α-монет. Увеличивает α-монеты за нажатие в зависимости от всего α-монет."}
else {singleU1.innerHTML = "Unlock upgrade for 10000 α-coins. Increases α-coins per click based on total α-coins."}
if (data) {singleU2.innerHTML = "Открыть улучшение за 1200000 α-монет. Удваивает ваши α-монеты за нажатия."}
else {singleU2.innerHTML = "Unlock upgrade for 1200000 α-coins. Doubles your α-coin gain per click."}
if (data) {singleU3.innerHTML = "Открыть улучшение за 5000000 α-монет. Увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого."}
else {singleU3.innerHTML = "Unlock upgrade for 5000000 α-coins. Increases second upgrade bonus based on amount of first upgrades."}
}
startTextOfUpgrades.call();

function getCoin() {
    if (third.boost == 0)
    {third.boost = 1}
    gain = 1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    money = money+gain;
    total = total+gain;
    if (data) {coinsCount.innerHTML = money.toFixed(0) + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получили за нажатие " + (gain).toFixed(0)+ " α-монет";}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins"; document.getElementById('coinsGain').innerHTML = "You've earned from a click " + (gain).toFixed(0) + " α-coins";}
    if (data) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
    else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
    if (money>endGoal && (completion == false)) {endGameScreen.call(); completion = true}
    if (onecheck==false) {
    if (money<endGoal && (completion == true)) {completion = false; onecheck = true}
    }
    return gain, money;
};


function settingsScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "flex";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    document.getElementById("settingsTab").style.backgroundColor = 'white';
    document.getElementById("settingsTab").style.color = 'black';
    document.getElementById("mainTab").style.backgroundColor = 'black';
    document.getElementById("mainTab").style.color = 'white';
    document.getElementById("prestigeTab").style.backgroundColor = 'black';
    document.getElementById("prestigeTab").style.color = 'white';
    document.getElementById("infoTab").style.backgroundColor = 'black';
    document.getElementById("infoTab").style.color = 'white';
    
}
function mainScreen() {
    mainButtons.style.display = "block";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    endGoodGameScreen.style.display = "none";
    document.getElementById("settingsTab").style.backgroundColor = 'black';
    document.getElementById("settingsTab").style.color = 'white';
    document.getElementById("mainTab").style.backgroundColor = 'white';
    document.getElementById("mainTab").style.color = 'black';
    document.getElementById("prestigeTab").style.backgroundColor = 'black';
    document.getElementById("prestigeTab").style.color = 'white';
    document.getElementById("infoTab").style.backgroundColor = 'black';
    document.getElementById("infoTab").style.color = 'white';
}
function prestigeScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "block";
    endGoodGameScreen.style.display = "none";
    document.getElementById("settingsTab").style.backgroundColor = 'black';
    document.getElementById("settingsTab").style.color = 'white';
    document.getElementById("mainTab").style.backgroundColor = 'black';
    document.getElementById("mainTab").style.color = 'white';
    document.getElementById("prestigeTab").style.backgroundColor = 'white';
    document.getElementById("prestigeTab").style.color = 'black';
    document.getElementById("infoTab").style.backgroundColor = 'black';
    document.getElementById("infoTab").style.color = 'white';
}
function infoScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "block";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    document.getElementById("settingsTab").style.backgroundColor = 'black';
    document.getElementById("settingsTab").style.color = 'white';
    document.getElementById("mainTab").style.backgroundColor = 'black';
    document.getElementById("mainTab").style.color = 'white';
    document.getElementById("prestigeTab").style.backgroundColor = 'black';
    document.getElementById("prestigeTab").style.color = 'white';
    document.getElementById("infoTab").style.backgroundColor = 'white';
    document.getElementById("infoTab").style.color = 'black';
}
function endGameScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    endGoodGameScreen.style.display = "block";
    document.getElementById("settingsTab").style.backgroundColor = 'black';
    document.getElementById("settingsTab").style.color = 'white';
    document.getElementById("mainTab").style.backgroundColor = 'black';
    document.getElementById("mainTab").style.color = 'white';
    document.getElementById("prestigeTab").style.backgroundColor = 'black';
    document.getElementById("prestigeTab").style.color = 'white';
    document.getElementById("infoTab").style.backgroundColor = 'black';
    document.getElementById("infoTab").style.color = 'white';
}


function disabledUpgrades(){
    if (money>=firstprice) {
        document.getElementById('commonU1').disabled = false;
    }
    else {
        document.getElementById('commonU1').disabled = true;
    }
    if (money>=secondprice) {
        document.getElementById('commonU2').disabled = false;
    }
    else {
        document.getElementById('commonU2').disabled = true;
    }
    if (money>=thirdprice) {
        document.getElementById('commonU3').disabled = false;
    }
    else {
        document.getElementById('commonU3').disabled = true;
    }
    if (money>=fourth.price) {
        document.getElementById('singleU1').disabled = false;
    }
    else {
        document.getElementById('singleU1').disabled = true;
    }
    if (money>=fifth.price) {
        document.getElementById('singleU2').disabled = false;
    }
    else {
        document.getElementById('singleU2').disabled = true;
    }
    if (money>=sixth.price) {
        document.getElementById('singleU3').disabled = false;
    }
    else {
        document.getElementById('singleU3').disabled = true;
    }
    return document.getElementById('commonU1').disabled, document.getElementById('commonU2').disabled, document.getElementById('commonU3').disabled, document.getElementById('singleU1').disabled, document.getElementById('singleU2').disabled, document.getElementById('singleU3').disabled
    }

if (data) {aboutGame.innerHTML = "Об игре: <br><br> Мой 1ый Кликер 0.5.1 <br> Главная цель: 1,000,000,000 α-монет. <br><br> Спасибо Орехус#7698 за перевод на русский. <br> Спасибо также всем кто хоть немного поиграл в игру."}
else {aboutGame.innerHTML = "About game: <br> <br> My1stClicker 0.5.1 <br> Main goal: 1,000,000,000 α-coins. <br><br> Thanks Орехус#7698 for russian translate. <br> Thanks everyone for playing."}

if (data) {theGoal.innerHTML = "Чтобы открыть это вам нужно 1 миллиард α-монет."}
else {theGoal.innerHTML = "You need 1 billion α-coins to unlock."}

if (data) {endScreen.innerHTML = "Поздравляем, вы прошли игру! Однако, только в этой версии. В следующих обновлениях будет всё больше новых вещей. Если будешь ещё играть нажимай Играть Дальше!"}
else {endScreen.innerHTML = "Congratulations, you have completed game! However, only in this version. In the future there will be many new things. If you wanna play more press Play More!"}

