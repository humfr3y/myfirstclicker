const achs = {
    ar1: {ac1: false, ac2: false, ac3: false, ac4: false, ac5: false, ac6: false, ac7: false, ac8: false},
    ar2: {ac1: false, ac2: false, ac3: false, ac4: false, ac5: false, ac6: false, ac7: false, ac8: false},
}
setInterval(achievementChecker, 50)
var achNotifyColor = "yellow", achNotifyWidth = '350px'
function achievementChecker() {
    if (first.amount >= 1 && achs.ar1.ac1 == false)
    {
        var a11notify
        if (data == 1) a11notify = 'Вы выполнили достижение "Самое начало"!'
        else a11notify = 'You got an achievement "Beginning"!'
        notify(a11notify, achNotifyColor, achNotifyWidth);
        achs.ar1.ac1 = true
    }
    if (second.amount >= 1 && achs.ar1.ac2 == false)
    {
        var a12notify
        if (data == 1) a12notify = 'Вы выполнили достижение "Лишняя мотивация"!'
        else a12notify = 'You got an achievement "Extra motivation"!'
        notify(a12notify, achNotifyColor, achNotifyWidth);
        achs.ar1.ac2 = true
    }
}
