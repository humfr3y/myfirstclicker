var achievementBonus = 1
var achBonus = document.getElementById('achBonus')
var achCount = 1
var achRowCount = 1
var achRow1 = {
    condition: [1, 1000, 2.01, 1, 1000, 666, 1000, 1, 1e6, 1],
    reward: [0, 0, 0, 0, 1.01, 11, 1.05, 0, 1.33, 0],
    completion: [false, false, false, false, false, false, false, false, false, false],
    name: ['"Без ходуль"', '"Первая тысяча"', '"Я вызываю полицию! Нет, я!"', '"Есть пробитие!"', '"Мастер-кликер"', '"Адская продуктивность"', '"Пора спать!"', '"Снова стена и снова пробитие!"', '"Миллионный множитель"', '"Финишная прямая?"'],
    fullRow: 0
}
var achNotify
setInterval(achievementChecker, 50)
var achNotifyColor = "yellow", achNotifyWidth = '350px'
function achievementChecker() {
    if (firstBuyable.amount >= achRow1.condition[0] && !achRow1.completion[0])
    {
        achNotification(0);
    }
    if (money >= achRow1.condition[1] && !achRow1.completion[1])
    {
        achNotification(1);
    }
    if ((gainPerClick >= gainPerSecond * 20 * achRow1.condition[2]) && !achRow1.completion[2])
    {
        achNotification(2);
        // console.log(gainPerClick)
        // console.log(gainPerSecond)
        // console.log(achRow1.condition[2])
        // console.log(gainPerSecond * achRow1.condition[2])
    }
    if (umultipliercount >= achRow1.condition[3] && !achRow1.completion[3])
    {
        achNotification(3);
    }
    if (clickCount >= achRow1.condition[4] && !achRow1.completion[4])
    {
        achNotification(4);
    }
    if (secondBuyableEffect >= achRow1.condition[5] && !achRow1.completion[5])
    {
        achNotification(5);
    }
    if (gameTimer >= achRow1.condition[6] && !achRow1.completion[6])
    {
        achNotification(6);
    }
    if (upowercount >= achRow1.condition[7] && !achRow1.completion[7])
    {
        achNotification(7);
    }
    if ((Math.pow(2, thirdBuyable.baseEffect)) >= achRow1.condition[8] && !achRow1.completion[8])
    {
        achNotification(8);
    }
    if (tenthSingle.amount >= achRow1.condition[9] && !achRow1.completion[9])
    {
        achNotification(9);
    }
    achievementBonus = achCount * 1.175 + achRowCount * 15.245
    tenthSingle.amount == 1 ? achievementBonus = Math.pow(achCount * 1.175 + achRowCount * 15.245, 1.5) : achievementBonus = achievementBonus
    achRow1.completion[4] == true ? maxbuy.style.display = 'block' : maxbuy.style.display = 'none' 
    if (achRow1.fullRow == 10)
    {
        achRowCount = 1
    } 
    else achRowCount = 0
}
function achNotification(i) {
    achNotify += achRow1.name[i];
    achRow1.completion[i] = true;
    notify(achNotify, achNotifyColor, achNotifyWidth);
    achNotify = "Вы получили достижение "
    var element = document.getElementsByClassName("ach")[i];
    element.classList.add("green");
    element.classList.add("greenborder");
    achRow1.fullRow++
    achCount++
    if (achRow1.fullRow == 10) {
        var element2 = document.getElementById("firstAchievementRow");
        element2.classList.add("green");
        achRowCount++
    }
    else achRowCount = 0
}

function achCompletionsChecker() {
    achievementBonus = 1
    achCount = 1
    achRow1.fullRow = 0
    for (var i = 0; i < achRow1.completion.length; i++){
        if (achRow1.completion[i] == true) {
            var element = document.getElementsByClassName("ach")[i];
            element.classList.add("green");
            element.classList.add("greenborder");
            achRow1.fullRow++
            achCount++
            achievementBonus += 1.175
        }
    }
}
