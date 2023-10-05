var achievementBonus = 1
var achBonus = document.getElementById('achBonus')
var achCount = 1
var achRowCount = 0
var achFullRow1 = 0, achFullRow2 = 0
var achRow1 = {
    condition: [
        1, 1000, 2.01, 1, 1000, 666, 1000, 1, 1e6, 1,
        1, 3, 100, true, 10, 100, 10, 16, 25, true
    ],
    completion: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
    ],
    name: [
        '"Без ходуль"', '"Первая тысяча"', '"Я вызываю полицию! Нет, я!"', '"Есть пробитие!"', '"Мастер-кликер"', '"Адская продуктивность"', '"Пора спать!"', '"Снова стена и снова пробитие!"', '"Миллионный множитель"', '"Финишная прямая?"',
        '1placeholder1', '2placeholder2', '3placeholder3', '4placeholder4', '5placeholder5', '6placeholder6', '7placeholder7', '8placeholder8', '9placeholder9', '10placeholder10'
    ]
}
let achRowCompleted = [false, false]



var achNotify
setInterval(achievementChecker, 100)
var achNotifyColor = "yellow", achNotifyWidth = '350px'
function achievementChecker() {
    if (firstBuyable.amount >= achRow1.condition[0] && !achRow1.completion[0])
    {
        achNotification(0);
        achFullRow1++
    }
    if (money >= achRow1.condition[1] && !achRow1.completion[1])
    {
        achNotification(1);
        achFullRow1++
    }
    if ((gainPerClick >= gainPerSecond * 20 * 2.01) && !achRow1.completion[2] && gainPerSecond != 0)
    {
        achNotification(2);
        achFullRow1++
    }
    if (umultipliercount >= achRow1.condition[3] && !achRow1.completion[3])
    {
        achNotification(3);
        achFullRow1++
    }
    if (clickCount >= achRow1.condition[4] && !achRow1.completion[4])
    {
        achNotification(4);
        achFullRow1++
    }
    if (secondBuyableEffect >= achRow1.condition[5] && !achRow1.completion[5])
    {
        achNotification(5);
        achFullRow1++
    }
    if (gameTimer >= achRow1.condition[6] && !achRow1.completion[6])
    {
        achNotification(6);
        achFullRow1++
    }
    if (upowercount >= achRow1.condition[7] && !achRow1.completion[7])
    {
        achNotification(7);
        achFullRow1++
    }
    if ((Math.pow(2, thirdBuyable.baseEffect)) >= achRow1.condition[8] && !achRow1.completion[8])
    {
        achNotification(8);
        achFullRow1++
    }
    if (tenthSingle.amount >= achRow1.condition[9] && !achRow1.completion[9])
    {
        achNotification(9);
        achFullRow1++
    }

    if (prestigeCount >= achRow1.condition[10] && !achRow1.completion[10])
    {
        achNotification(10);
        achFullRow2++
    }
    if (gameDays >= achRow1.condition[11] && !achRow1.completion[11])
    {
        achNotification(11);
        achFullRow2++
    }
    if (brokenCrystals >= achRow1.condition[12] && !achRow1.completion[12])
    {
        achNotification(12);
        achFullRow2++
    }
    if (noResets === achRow1.condition[13] && !achRow1.completion[13])
    {
        achNotification(13);
        achFullRow2++
    }
    if (umultipliercount >= achRow1.condition[14] && !achRow1.completion[14])
    {
        achNotification(14);
        achFullRow2++
    }
    if (shardUnlockablePerSecond.percent == achRow1.condition[15] && shardUnlockableClick.percent == achRow1.condition[15] && !achRow1.completion[15])
    {
        achNotification(15);
        achFullRow2++
    }
    if (fastestPrestigeTimer <= achRow1.condition[16] && !achRow1.completion[16])
    {
        achNotification(16);
        achFullRow2++
    }
    if (amountOfPrestigeUpgrades >= achRow1.condition[17] && !achRow1.completion[17])
    {
        achNotification(17);
        achFullRow2++
    }
    if (overdriveType1.percent >= achRow1.condition[18] && !achRow1.completion[18])
    {
        achNotification(18);
        achFullRow2++
    }
    if (prestigeMilestonesEffects[15] >= achRow1.condition[19] && !achRow1.completion[19])
    {
        achNotification(19);
        achFullRow2++
    }

    achCount != 0 ? achievementBonus = 1+(achCount * 0.8 + achRowCount * 8.125) : achievementBonus = 1
    tenthSingle.amount == 1 ? achievementBonus = Math.pow((1+(achCount * 0.8 + achRowCount * 8.125)), 1.5) : achievementBonus = achievementBonus
    achRow1.completion[4] == true ? maxbuy.style.display = 'block' : maxbuy.style.display = 'none' 
    achRow1.completion[4] == true ? maxOrNoUpgrades.style.display = 'block' : maxOrNoUpgrades.style.display = 'none'; 
    if (achFullRow1 == 10 && !achRowCompleted[0])
    {
        var element2 = document.getElementById("firstAchievementRow");
        element2.classList.add("green");
        achRowCount++
        achRowCompleted[0] = true
    }
    if (achFullRow2 == 10 && !achRowCompleted[1])
    {
        var element2 = document.getElementById("secondAchievementRow");
        element2.classList.add("green");
        achRowCount++
        achRowCompleted[1] = true
    }
}
function achNotification(i) {
    achNotify += achRow1.name[i];
    achRow1.completion[i] = true;
    notify(achNotify, achNotifyColor, achNotifyWidth);
    achNotify = "Вы получили достижение "
    var element = document.getElementsByClassName("ach")[i];
    element.classList.add("green");
    element.classList.add("greenborder");
    achCount++

}

function achCompletionsChecker() {
    achievementBonus = 1
    achCount = 0
    achFullRow1 = 0
    achFullRow2 = 0
    for (var i = 0; i < achRow1.completion.length; i++){
        var element = document.getElementsByClassName("ach")[i];
        if (achRow1.completion[i] == true) {
            element.classList.add("green");
            element.classList.add("greenborder");
            achCount++
            achievementBonus += 0.8
        }
        else {
            element.classList.remove("green");
            element.classList.remove("greenborder");
        }
    }
    for (let i = 0; i < 10; i++) {
        achRow1.completion[i] ? achFullRow1++ : achFullRow1
    }
    for (let i = 10; i < 20; i++) {
        achRow1.completion[i] ? achFullRow2++ : achFullRow2
    }
}
