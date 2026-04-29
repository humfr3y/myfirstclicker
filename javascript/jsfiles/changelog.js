function showChangelog(desc){
    ELS.verDesc.innerHTML = desc;
}
function showStory(chapter) {
    ELS.chapDesc.innerHTML = chapter;
}
function showHelpPage(help, helpName) {
    ELS.helpDesc.innerHTML = help;
    helpPageTitle.innerHTML = helpName;
}

const LORE = {
    has(id) { return player.settings.loreBoolean.includes(id); },

    unl(id) {
        if (!this.has(id)) {
            player.settings.loreBoolean.push(id);
            notify(text.notification.lore, 'mediumpurple', '500px'); 
            
            // Красим кнопку ТОЛЬКО один раз при получении
            let element = document.getElementsByClassName("loreChapter")[id - 1];
            if (element) element.classList.add("unlockedChapter");
        }
    },

    checkLore() {
        // Кэшируем количество глав, чтобы не дергать Object.keys каждый тик
        const totalChapters = Object.keys(this.conditions).length;
        
        for (let c = 1; c <= totalChapters; c++) {
            // Проверяем условие, только если глава еще не открыта
            if (!this.has(c) && this.conditions[c] && this.conditions[c]()) {
                this.unl(c);
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
        12() { return player.shop.unlockables.includes(3)},
        13() { return player.prestige.break.singles.includes(25) },
        14() { return player.uadders > 0 },
        15() { return player.ureducers > 0 },
        16() { return player.fortune.total_tokens >= 1 },
        17() { return player.balance.total_coins.plus >= 1 || player.balance.total_coins.minus >= 1},
        18() { return player.progressBarGoals.includes(8)}
    }
}

// --- ОТРИСОВКА СОХРАНЕННЫХ ГЛАВ ПРИ ЗАГРУЗКЕ ---
function renderSavedLore() {
    player.settings.loreBoolean.forEach(id => {
        let element = document.getElementsByClassName("loreChapter")[id - 1];
        if (element) element.classList.add("unlockedChapter");
    });
}

// Не забудь вызвать renderSavedLore() в функции загрузки сохранений (там же, где и renderSavedAchievements)
