function showChangelog(desc){
    ELS.verDesc.innerHTML = desc;
}
function showStory(chapter) {
    ELS.chapDesc.innerHTML = chapter;
}
function showHelpPage(help, helpName) {
    ELS.helpDesc.innerHTML = help;
    helpPageTitle.innerHTML = helpName
}

const LORE = {
    unl(id) {
        if (!player.settings.loreBoolean.includes(id)) {
            player.settings.loreBoolean.push(id)
            notify(text.notification.lore, 'mediumpurple', '500px') 
        }
    },
    has(id) { return player.settings.loreBoolean.includes(id) },
    checkLore(){
        for (let c = 1; c <= Object.keys(this.conditions).length; c++) {
            if (this.conditions[c] !== undefined ? this.conditions[c]() : false) this.unl(c)
            if (this.has(c)) {
                element = document.getElementsByClassName("loreChapter")[c-1]
                element.classList.add("unlockedChapter")
            }
        }
    },
    conditions: {
        1() { return player.coin.currency > 10 },
        2() { return player.coin.singleUpgrades.length > 0 },
        3() { return player.umultipliers > 0 },
        4() { return player.upowers > 0 },
        5() { return player.prestige.total_currency > 0 },
        6() { return player.prestige.singleUpgrades.length > 0 },
        7() { return player.prestige.broken_currency > 0 },
        8() { return player.prestige.resets > 2 },
        9() { return player.coin.currency > 1e25 },
        10() { return player.supercrystal.currency > 0},
        11() { return player.minerals[1] > 0 || player.minerals[2] > 0 || player.minerals[3] > 0},
        12() { return player.shop.unlockables.includes(4)},
        13() { return player.prestige.super.singles.includes(25) },
        14() { return player.uadders > 0 },
        15() { return player.ureducers > 0 },
    }
}
