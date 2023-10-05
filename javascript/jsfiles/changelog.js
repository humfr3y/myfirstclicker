var verDesc = document.getElementById("versionDescription")
var chapDesc = document.getElementById("chapterDescription")
var helpDesc = document.getElementById("helpDescription")
var loreNotify
function showChangelog (desc){
    verDesc.innerHTML = desc;
}
function showStory (chapter) {
    chapDesc.innerHTML = chapter;
}
function showHelpPage (help, helpName) {
    helpDesc.innerHTML = help;
    helpPageTitle.innerHTML = helpName
}
var startDesc, desc00, desc01, desc02, desc03, desc04, desc05, desc051, desc06, desc07, desc071, desc08, desc0801, desc09, desc091, desc092, desc010;
var startChapDesc, chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8;
var startHelpDesc, help1, help2, help3, help4, help5, help6, help7, help8, help9, help10;
var helpName1, helpName2, helpName3, helpName4, helpName5, helpName6, helpName7, helpName8, helpName9, helpName10;
var empty = ''

var loreBoolean = [false, false, false, false, false, false, false, false]

function checkLore(loreBool, i, condition) {
    if (condition >= 1 && loreBool[i] == false) {
        loreBool[i] = true;
        var loreNotifyColor = "mediumpurple";
        var loreNotifyWidth = "500px";
        var element = document.getElementsByClassName("loreChapter")[i]
        element.classList.add("unlockedChapter")
        setTimeout(() => {
            notify(loreNotify, loreNotifyColor, loreNotifyWidth)
        }, 1000);
    }
}
setInterval(() => {
    checkLore(loreBoolean, 0, money-10);
    checkLore(loreBoolean, 1, firstSingle.amount);
    checkLore(loreBoolean, 2, umultipliercount);
    checkLore(loreBoolean, 3, upowercount);
    checkLore(loreBoolean, 4, totalCrystals);
    checkLore(loreBoolean, 5, totalCrystals-crystals-brokenCrystals); // 1-1-0 = 0 (1 c), 1-0-1 = 0 (1 bc), 1-0-0 = 1 (1 u), 2-2-0 = 0 (2 c), 2-1-1 = 0 (1 c & 1 bc), 2-0-0 = 2 (2 u)
    checkLore(loreBoolean, 6, brokenCrystals);
    checkLore(loreBoolean, 7, prestigeCount-2);
}, 100)

function checkLoreShorter(loreBool, i) {
    if (loreBool[i] == true) {
        var element = document.getElementsByClassName("loreChapter")[i]
        element.classList.add("unlockedChapter")
    }
}
