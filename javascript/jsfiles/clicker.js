var money = 10;
var total = 10;
var gain = 1;
var autoSaving = 0; 
var endGoal = 1e100;
var completion
var unlockedPrestige = 0;
var totalCoins = document.getElementById('totalCoins');
var totalDiamond = 0
var totalPrestiges = 0
let link = document.getElementById('link');
var onecheck = 0;
var firstprice = Math.round(first.basePrice*Math.pow(1.2, first.amount))
var secondprice = Math.round(second.basePrice*Math.pow(1.3, second.amount));
var thirdprice = Math.round(third.basePrice*Math.pow(1.4, third.amount))
var data = 0;
var container1 = document.getElementById('auto-buy1-container')
var container2 = document.getElementById('auto-buy2-container')
var container3 = document.getElementById('auto-buy3-container')
var amounts = 1
function loadStats() {
    if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
    else {totalCoins.innerHTML = "Totally you collected " + total.toFixed(0) + " α-coins."}
    if (total>1e6)
        if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toExponential(2).replace("+","") + " α-монет."} 
        else {totalCoins.innerHTML = "Totally you collected " + total.toExponential(2).replace("+","") + " α-coins."}
        if (totalDiamond>=1) {
            if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toFixed(0) + " алмазов."} 
            else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toFixed(0) + " diamonds."}
            if (totalDiamond>1e6){
                if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toExponential(2).replace("+","") + " алмазов."} 
                else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toExponential(2).replace("+","") + " diamonds."}
            }
            if (data==1) {totalResets.innerHTML = "Всего вы сделали " + totalPrestiges.toFixed(0) + " престиж сбросов."} 
            else {totalResets.innerHTML = "Totally you did " + totalPrestiges.toFixed(0) + " prestige resets."}
        }
        else {totalDiamonds.innerHTML = ""; totalResets.innerHTML = ""}
        }

function changedLanguage () {
if (data==1) {settingsTab.innerHTML = "Настройки"}
else {settingsTab.innerHTML = "Settings"}
if (data==1) {mainTab.innerHTML = "Кликер"}
else {mainTab.innerHTML = "Clicker"}
if (data==1) {prestigeTab.innerHTML = "Престиж"}
else {prestigeTab.innerHTML = "Prestige"}
if (data==1) {infoTab.innerHTML = "Информация"}
else {infoTab.innerHTML = "Information"}
if (data==1) {autoTab.innerHTML = "Автоматизация"}
else {autoTab.innerHTML = "Automation"}
if (data==1) {fortuneTab.innerHTML = "Фортуна"}
else {fortuneTab.innerHTML = "Fortune"}

loadStats.call()
if (data==1) {coinGain.innerHTML = money.toFixed(0) + " α-монет. Нажмите на α-монету."} 
else {coinGain.innerHTML = money.toFixed(0) + " α-coins. Click on the α-coin."}

if (data==1) {savingGame.innerHTML = "Сохранить игру"} 
else {savingGame.innerHTML = "Save game"}
if (data==1) {loadingGame.innerHTML = "Загрузить игру"} 
else {loadingGame.innerHTML = "Load game"}
if (data==1) {autoSavingGame.innerHTML = "Автосохранение вкл."}
else {autoSavingGame.innerHTML = "Autosave on."}
if (data==1) {changingLanguage.innerHTML = "Сменить язык на английский"}
else {changingLanguage.innerHTML = "Switch language to russian"}
if (data==1) {impSave.innerHTML = "Импорт"}
else {impSave.innerHTML = "Import"}
if (data==1) {expSave.innerHTML = "Экспорт"}
else {expSave.innerHTML = "Export"}
if (data==1) {changelogOpen.innerHTML = "Журнал изменений"}
else {changelogOpen.innerHTML = "Changelog"}
if (data==1) {link.href = 'changelogru.md'}
else {link.href = 'changelog.md'}
if (data==1) {hardRes.innerHTML = "Сбросить игру"}
else {hardRes.innerHTML = "Reset the game"}

if (data==1) {playMore.innerHTML = "Играть дальше"}
else {playMore.innerHTML = "Play more"}

if (data==1) {doPrestige.innerHTML = "Стать престижным"}
else {doPrestige.innerHTML = "Become prestige"}

if (data==1) {settingsTitle.innerHTML = "Настройки"}
else {settingsTitle.innerHTML = "Settings"}
if (data==1) {statsTitle.innerHTML = "Статистика"}
else {statsTitle.innerHTML = "Statistics"}

if (data==1) {autoBuy1to3.innerHTML = "Автопокупка 1-3 улучшений"}
else {autoBuy1to3.innerHTML = "1-3 upgrades autobuyer"}
if (data==1) {autoBuy4to6.innerHTML = "Автопокупка 4-6 улучшений"}
else {autoBuy4to6.innerHTML = "4-6 upgrades autobuyer"}
if (data==1) {autoMoney.innerHTML = "Автополучение монет"}
else {autoMoney.innerHTML = "Money autogain"}

if (data==1) {fortuneNotImplemented.innerHTML = "Не реализовано!"}
else {fortuneNotImplemented.innerHTML = "Not implemented!"}

if (data==1) {aboutGame.innerHTML = "Об игре: <br><br> Цифровой Бог 0.6 <br> Главная цель: 1e100 α-монет. <br><br> Спасибо Орехус#7698 за перевод на русский. <br> Спасибо также всем кто хоть немного поиграл в игру."}
else {aboutGame.innerHTML = "About game: <br> <br> Digital God 0.6 <br> Main goal: 1e100 α-coins. <br><br> Thanks Орехус#7698 for russian translate. <br> Thanks everyone for playing."}

if (data==1) {endScreen.innerHTML = "Поздравляем, вы прошли игру! Однако, только в этой версии. В следующих обновлениях будет всё больше новых вещей. Если будешь ещё играть нажимай \"Играть Дальше!\""}
else {endScreen.innerHTML = "Congratulations, you have completed game! However, only in this version. In the future there will be many new things. If you wanna play more press \"Play More!\""}
}
changedLanguage.call()
 setInterval(disabledUpgrades, 10); 

statsScreen.style.display = "none"
prestigeButtons.style.display = "none"
settingButtons.style.display = "none"
automationScreen.style.display = "none"
endGoodGameScreen.style.display = "none"
prestigeTab.style.display = "none"
autoTab.style.display = "none"
fortuneTab.style.display = "none"
fortuneButtons.style.display = "none"
prestigeAutoUpgrades.style.display = "none"
prestigeSingleUpgrades.style.display = "none"
container1.style.display = "none"
container2.style.display = "none"
container3.style.display = "none"

function startTextOfUpgrades () {
if (data==1) {commonU1.innerHTML = "Открыть улучшение за 10 α-монет. <br> Увеличивает α-монеты за нажатие."}
else {commonU1.innerHTML = "Unlock upgrade for 10 α-coins. <br>Increases α-coins per one click.   "}
if (data==1) {commonU2.innerHTML = "Открыть улучшение за 100 α-монет. <br>Увеличивает бонус от 1ого улучшения."}
else {commonU2.innerHTML = "Unlock upgrade for 100 α-coins. <br>Increases bonus from first upgrade."}
if (data==1) {commonU3.innerHTML = "Открыть улучшение за 1000 α-монет. <br>Умножает α-монеты за нажатие на х1.05."}
else {commonU3.innerHTML = "Unlock upgrade for 1000 α-coins. <br>Multiplies α-coins per click by x1.05."}
if (data==1) {singleU1.innerHTML = "Открыть улучшение за 10000 α-монет. <br>Увеличивает α-монеты за нажатие в зависимости от всего α-монет."}
else {singleU1.innerHTML = "Unlock upgrade for 10000 α-coins. <br>Increases α-coins per click based on total α-coins."}
if (data==1) {singleU2.innerHTML = "Открыть улучшение за 1.2e6 α-монет. <br>Удваивает ваши α-монеты за нажатия."}
else {singleU2.innerHTML = "Unlock upgrade for 1.2e6 α-coins. <br>Doubles your α-coin gain per click."}
if (data==1) {singleU3.innerHTML = "Открыть улучшение за 5e6 α-монет. <br>Увеличивает бонус второго улучшения в зависимости от кол-ва покупок первого."}
else {singleU3.innerHTML = "Unlock upgrade for 5e6 α-coins. <br>Increases second upgrade bonus based on amount of first upgrades."}
}
startTextOfUpgrades.call();
function startTextOfPrestigeUpgrades() {
    if (data==1) {pBuyableU1.innerHTML = "Открыть улучшение за 2 алмаза. <br>Увеличивает степень α-монет за нажатие."}
    else if (data==0) {pBuyableU1.innerHTML = "Unlock upgrade for 2 diamonds. <br>Increases power of α-coins per click."}
    if (data==1) {pBuyableU2.innerHTML = "Открыть улучшение за 10 алмазов. <br>Увеличивает бонус алмазов"}
    else if (data==0) {pBuyableU2.innerHTML = "Unlock upgrade for 10 diamonds. <br>Increases diamonds bonus"}
    if (data==1) {pBuyableU3.innerHTML = "Открыть улучшение за 50 алмазов. <br>Улучшает формулу Богатой Славы"}
    else if (data==0) {pBuyableU3.innerHTML = "Unlock upgrade for 50 diamonds. <br> Making better formula of Rich Fame effect."}
    if (data==1) {pBuyableU4.innerHTML = "Открыть улучшение за 500 алмазов. <br>Открывает улучшения автоматизации."}
    else if (data==0) {pBuyableU4.innerHTML = "Unlock upgrade for 500 diamonds. <br>Unlocks automation upgrades."}
    if (data==1) {pAutoU1.innerHTML = "Открыть улучшение за 1000 алмазов. <br>Открывет Автоматизацию покупки 4-6 улучшений."}
    else if (data==0) {pAutoU1.innerHTML = "Unlock upgrade for 1000 diamonds. <br>Unlocks 4-6 upgrades autobuyer."}
    if (data==1) {pAutoU2.innerHTML = "Открыть улучшение за 2500 алмазов. <br>Открывет Автоматизацию покупки 1-3 улучшений."}
    else if (data==0) {pAutoU2.innerHTML = "Unlock upgrade for 2500 diamonds. <br>Unlocks 1-3 upgrades autobuyer."}
    if (data==1) {pAutoU3.innerHTML = "Открыть улучшение за 5000 алмазов. <br>Открывет Автоматизацию получения монет."}
    else if (data==0) {pAutoU3.innerHTML = "Unlock upgrade for 5000 diamonds. <br>Unlocks autogain of coins."}
    if (data==1) {pAutoU4.innerHTML = "Открыть улучшение за 15000 алмазов. <br>Открывает новые улучшения престижа. <br> Нужны три предыдущих улучшения."}
    else if (data==0) {pAutoU4.innerHTML = "Unlock upgrade for 15000 diamonds. <br>Unlocks new prestige upgrades.<br> Requires three previous upgrades."}
    if (data==1) {pSingleU1.innerHTML = "Открыть улучшение за 50000 алмазов. <br> Уменьшает цену престижных улучшений."}
    else if (data==0) {pSingleU1.innerHTML = "Unlock upgrade for 50000 diamonds. <br>Reduces price of prestige upgrades."}
    if (data==1) {pSingleU2.innerHTML = "Открыть улучшение за 1e6 алмазов. <br>Снять ограничение с Бездонный Кошелёк"}
    else if (data==0) {pSingleU2.innerHTML = "Unlock upgrade for 1e6 diamonds. <br>Remove cap from Bottomless Wallet"}
    if (data==1) {pSingleU3.innerHTML = "Открыть улучшение за 1e7 алмазов. <br> Умножает алмазы в зависимости от количества купленных основных улучшений"}
    else if (data==0) {pSingleU3.innerHTML = "Unlock upgrade for 1e7 diamonds. <br> Multiplies diamonds gain based on total amount of bought main upgrades"}
    if (data==1) {pSingleU4.innerHTML = "Открыть улучшение за 1e9 алмазов. <br>Открыть Фортуну"}
    else if (data==0) {pSingleU4.innerHTML = "Unlock upgrade for 1e9 diamonds. <br>Unlock Fortune"}
}
if (unlockedPrestige==false) startTextOfPrestigeUpgrades.call()

function getCoin() {
    if (!checkCoin.checked){
    if (third.boost == 0)
    {third.boost = 1}
    gain = 1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    gain = Math.pow(gain, pbfirst.boost)
    if (diamonds >= 1) {gain*=(diamonds*pbsecond.boost+1)}
    if (gain >= 1e19) {
        var softGain1 = gain/1e19
        gain = 1e19*Math.pow(softGain1, 0.6)
    }
    if (gain >= 1e35) {
        var softGain2 = gain/1e35
        gain = 1e35*Math.pow(softGain2, 0.8)
    }
    if (gain >= 1e110) {
        var softGain3 = gain/1e110
        gain = 1e110*Math.pow(softGain3, 0.75)
    }
    money = money+gain;
    total = total+gain;
    if (money<=1e6)
    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получили за нажатие " + (gain).toFixed(0)+ " α-монет"}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins"; document.getElementById('coinsGain').innerHTML = "You've earned from a click " + (gain).toFixed(0) + " α-coins";}
    if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
    else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
    if (money>1e6)
    if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получили за нажатие " + gain.toExponential(2).replace("+","")+ " α-монет"}
    else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins"; document.getElementById('coinsGain').innerHTML = "You've earned from a click " + gain.toExponential(2).replace("+","") + " α-coins";}
    if (total>1e6)
    if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toExponential(2).replace("+","") + " α-монет."} 
    else {totalCoins.innerHTML = "Total you collected " + total.toExponential(2).replace("+","") + " α-coins."}
    //money.toExponential(2).replace("+","")
    if (money>1e9) {unlockedPrestige = 1}
    if (unlockedPrestige == 1) {unlockPrestige.call()}
    if (money>endGoal && completion == 0) {endGameScreen.call(); completion = 1}
}
    return gain, money;
}
if (unlockedPrestige == 1) {prestigeTab.style.display = "block"}

function unlockPrestige() {
    prestigeTab.style.display = "block"
    const diamond1 = diamonds
    const diamond2 = diamonds.toExponential(2).replace("+","")
    var whichDiamond
    if (diamonds<1e6) whichDiamond = diamond1
    if (diamonds>=1e6) whichDiamond = diamond2
    if ((diamonds*pbsecond.boost*100)<1e6){
    if (data==1) {prestigeTab.innerHTML = "Престиж";
    theGoal.innerHTML = `У вас <dm>${whichDiamond}</dm> алмазов, которые увеличивают монеты за нажатия на <dm>+${(diamonds*pbsecond.boost*100).toFixed(0)}%</dm>`}
    else {prestigeTab.innerHTML = "Prestige";
    theGoal.innerHTML = `You have <dm>${whichDiamond}</dm> diamonds. They're increase coin gain by <dm>+${(diamonds*pbsecond.boost*100).toFixed(0)}%</dm>`}
    }
    if ((diamonds*pbsecond.boost*100)>=1e6){
        if (data==1) {prestigeTab.innerHTML = "Престиж";
        theGoal.innerHTML = `У вас <dm>${whichDiamond}</dm> алмазов, которые увеличивают монеты за нажатия на <dm>+${(diamonds*pbsecond.boost*100).toExponential(2).replace("+","")}%</dm>`}
        else {prestigeTab.innerHTML = "Prestige";
        theGoal.innerHTML = `You have <dm>${whichDiamond}</dm> diamonds. They're increase coin gain by <dm>+${(diamonds*pbsecond.boost*100).toExponential(2).replace("+","")}%</dm>`}
        }
}

function settingsScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "block";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"

}
function mainScreen() {
    mainButtons.style.display = "block";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
}
function prestigeScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "block";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
}
function infoScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "block";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "none"
}
function autoScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "flex"
    fortuneButtons.style.display = "none"
}

function fortuneScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    endGoodGameScreen.style.display = "none";
    automationScreen.style.display = "none"
    fortuneButtons.style.display = "block"
}

function endGameScreen() {
    mainButtons.style.display = "none";
    statsScreen.style.display = "none";
    settingButtons.style.display = "none";
    prestigeButtons.style.display = "none";
    topButtons.style.display = "flex";
    automationScreen.style.display = "none"
    endGoodGameScreen.style.display = "block";
    fortuneButtons.style.display = "none"
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
    if (money>=fourth.price || fourth.amount == 1) {
        document.getElementById('singleU1').disabled = false;
    }
    else {
        document.getElementById('singleU1').disabled = true;
    }
    if (money>=fifth.price || fifth.amount == 1) {
        document.getElementById('singleU2').disabled = false;
    }
    else {
        document.getElementById('singleU2').disabled = true;
    }
    if (money>=sixth.price || sixth.amount == 1) {
        document.getElementById('singleU3').disabled = false;
    }
    else {
        document.getElementById('singleU3').disabled = true;
    }
    if (diamonds>=pbfirstprice) {
        document.getElementById('pBuyableU1').disabled = false;
    }
    else {
        document.getElementById('pBuyableU1').disabled = true;
    }
    if (diamonds>=pbsecondprice) {
        document.getElementById('pBuyableU2').disabled = false;
    }
    else {
        document.getElementById('pBuyableU2').disabled = true;
    }
    if (diamonds>=pbthirdprice) {
        document.getElementById('pBuyableU3').disabled = false;
    }
    else {
        document.getElementById('pBuyableU3').disabled = true;
    }
    if (diamonds>=pbfourth.price || pbfourth.amount == 1) {
        document.getElementById('pBuyableU4').disabled = false;
    }
    else {
        document.getElementById('pBuyableU4').disabled = true;
    }
    if (diamonds>=pafirst.price || pafirst.amount == 1) {
        document.getElementById('pAutoU1').disabled = false;
    }
    else {
        document.getElementById('pAutoU1').disabled = true;
    }
    if (diamonds>=pasecond.price || pasecond.amount == 1) {
        document.getElementById('pAutoU2').disabled = false;
    }
    else {
        document.getElementById('pAutoU2').disabled = true;
    }
    if (diamonds>=pathird.price || pathird.amount == 1) {
        document.getElementById('pAutoU3').disabled = false;
    }
    else {
        document.getElementById('pAutoU3').disabled = true;
    }
    if (diamonds>=pafourth.price || pafourth.amount == 1) {
        document.getElementById('pAutoU4').disabled = false;
    }
    else {
        document.getElementById('pAutoU4').disabled = true;
    }
    if (diamonds>=psfirst.price || psfirst.amount == 1) {
        document.getElementById('pSingleU1').disabled = false;
    }
    else {
        document.getElementById('pSingleU1').disabled = true;
    }
    if (diamonds>=pssecond.price || pssecond.amount == 1) {
        document.getElementById('pSingleU2').disabled = false;
    }
    else {
        document.getElementById('pSingleU2').disabled = true;
    }
    if (diamonds>=psthird.price || psthird.amount == 1) {
        document.getElementById('pSingleU3').disabled = false;
    }
    else {
        document.getElementById('pSingleU3').disabled = true;
    }
    if (diamonds>=psfourth.price || psfourth.amount == 1) {
        document.getElementById('pSingleU4').disabled = false;
    }
    else {
        document.getElementById('pSingleU4').disabled = true;
    }
    return document.getElementById('commonU1').disabled, document.getElementById('commonU2').disabled, document.getElementById('commonU3').disabled, document.getElementById('singleU1').disabled, document.getElementById('singleU2').disabled, document.getElementById('singleU3').disabled,  document.getElementById('pBuyableU1').disabled, document.getElementById('pBuyableU2').disabled, document.getElementById('pBuyableU3').disabled, document.getElementById('pBuyableU4').disabled, document.getElementById('pAutoU1').disabled,document.getElementById('pAutoU2').disabled, document.getElementById('pAutoU3').disabled, document.getElementById('pAutoU4').disabled, document.getElementById('pSingleU1'), document.getElementById('pSingleU2'), document.getElementById('pSingleU3'), document.getElementById('pSingleU4')
    }

function changeLanguage() {
    if (data==0) {data=1}
    else {data=0}
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
    if (money<=1e9)
    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получили за нажатие " + (gain).toFixed(0)+ " α-монет"}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins"; document.getElementById('coinsGain').innerHTML = "You've earned from a click " + (gain).toFixed(0) + " α-coins";}
    if (money>1e9)
    if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получили за нажатие " + gain.toExponential(2).replace("+","")+ " α-монет"}
    else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins"; document.getElementById('coinsGain').innerHTML = "You've earned from a click " + gain.toExponential(2).replace("+","") + " α-coins";}
}