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
var startDesc, desc00, desc01, desc02, desc03, desc04, desc05, desc051, desc06, desc07, desc071, desc08, desc0801, desc09, desc091;
var startChapDesc, chapter1, chapter2, chapter3, chapter4;
var startHelpDesc, help1, help2, help3, help4, help5, help6, help7;
var helpName1, helpName2, helpName3, helpName4, helpName5, helpName6, helpName7
var empty = ''

var loreBoolean = [false, false, false, false]

function checkLore(loreBool, i, condition) {
    if (condition >= 1 && loreBool[i] == false) {
        loreBool[i] = true;
        var loreNotifyColor = "mediumpurple";
        var loreNotifyWidth = "500px";
        notify(loreNotify, loreNotifyColor, loreNotifyWidth)
        var element = document.getElementsByClassName("loreChapter")[i]
        element.classList.add("unlockedChapter")
    }
}
setInterval(() => {
    checkLore(loreBoolean, 0, money-10);
    checkLore(loreBoolean, 1, firstSingle.amount);
    checkLore(loreBoolean, 2, umultipliercount);
    checkLore(loreBoolean, 3, upowercount);
}, 100)

function checkLoreShorter(loreBool, i) {
    if (loreBool[i] == true) {
        var element = document.getElementsByClassName("loreChapter")[i]
        element.classList.add("unlockedChapter")
     }
}
