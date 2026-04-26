const ACHS = {
    cols: 10,
    rows: 6, // Увеличили до 6, так как у тебя уже есть ачивки из серии 50+ (51, 52 и т.д.)
    
    names: [
        // Твои названия ачивок (массив оставил как есть, заполнишь потом)
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''
    ],

    has(id) { return player.achievements.includes(id); },

    unl(id) {
        if (!this.has(id)) {
            player.achievements.push(id);
            // Защита от undefined, если имя еще не вписано
            let achName = this.names[id - 11] || `Ачивка ${id}`; 
            notify(text.notification.achievement + achName, 'yellow', '350px');
            
            // Красим ачивку ОДИН раз при получении, а не каждый тик!
            let element = document.getElementsByClassName("ach")[id - 11];
            if (element) element.classList.add("green", "greenborder");
        }
    },

    checkRows() {
        for (let r = 1; r <= this.rows; r++) {
            if (player.achievement_rows.includes(r)) continue; // Если ряд уже собран - пропускаем

            let isRowComplete = true;
            for (let c = 1; c <= this.cols; c++) {
                if (!this.has(r * 10 + c)) {
                    isRowComplete = false;
                    break; // Если хотя бы одной нет - прерываем цикл, ряд не собран
                }
            }

            if (isRowComplete) {
                player.achievement_rows.push(r);
                // Красим ряд тоже ОДИН раз
                let element2 = document.getElementsByClassName("achRow")[r - 1];
                if (element2) element2.classList.add("green");
            }
        }
    },

    checkAchievements() {
        // Оставили здесь ТОЛЬКО проверку условий, никакой работы с HTML и CSS!
        for (let r = 1; r <= this.rows; r++) {
            for (let c = 1; c <= this.cols; c++) {
                let id = r * 10 + c;
                if (!this.has(id) && this.conditions[id] && this.conditions[id]()) {
                    this.unl(id);
                }
            }
        }
    },

    conditions: {
        11() { return GAIN.coin.second.effect() >= 1 },
        12() { return player.coin.currency >= 1000 },
        13() { return GAIN.coin.click.effect() >= GAIN.coin.second.effect() * 2.01 && GAIN.coin.second.effect() > 0 },
        14() { return player.umultipliers >= 1 },
        15() { return player.clicks.real >= 1000 },
        16() { return UPGS.coin.buyables[2].effect() >= 6.66 },
        17() { return player.time.game.total.timer >= 1000 },
        18() { return player.upowers >= 1 },
        19() { return UPGS.coin.buyables[3].effect() >= 1e6},
        20() { return player.coin.singleUpgrades.includes(25)},

        22() { return player.time.game.total.days >= 3 },
        23() { return player.prestige.broken_currency >= 100 },
        25() { return player.umultipliers >= 10 },
        26() { return UNL.shard.click.percent() == 100 && UNL.shard.second.percent() == 100 },
        27() { return player.time.real.fastestPrestige.timer <= 10 },
        28() { return player.prestige.singleUpgrades.length == 16 },
        29() { return UNL.overdrive.type1.percent() >= 25 },
        30() { return player.prestige.milestones.length >= 16 },

        32() { return player.supercrystal.total_currency >= 1 },
        33() { return player.minerals[1] && player.minerals[2] && player.minerals[3] },
        34() { return player.challenge.time[1].timer + player.challenge.time[2].timer + player.challenge.time[3].timer + player.challenge.time[4].timer + player.challenge.time[5].timer + player.challenge.time[6].timer + player.challenge.time[7].timer + player.challenge.time[8].timer + player.challenge.time[9].timer + player.challenge.time[10].timer + player.challenge.time[11].timer <= 60},
        35() { return player.coin.superUpgrades.length == 1 },
        36() { return player.challenge.time[12].timer <= 60}, 
        39() { return GAIN.coin.click.effect() >= 4.20e69},
        40() { return UNL.overdrive.type1.percent() == 100},

        41() { return player.prestige.break.singles.includes(25)},
        42() { return player.uadders >= 1 && player.ureducers >= 1 && player.umultipliers >= 1 && player.upowers >= 1},
        43() { return UNL.shard_achievements[10].current() >= 10},
        44() { return player.coin.superUpgrades.length == 15},
        45() { return player.supercoin.total_currency >= 10000},
        46() { return player.challenge.activated == 8 && player.time.real.prestige.timer >= 28800},
        48() { return player.shard.currency >= 1e100},
        49() { return player.prestige.resets >= 1e8},
        50() { return (player.uadders + player.ureducers + player.umultipliers + player.upowers) >= 100},

        51() { return player.fortune.tokens >= 1},
        52() { return player.coin.total_currency >= 1e100},
        53() { return player.balance.scales_of_balance >= 1},
        54() { return player.fortune.activatedBoosts[10].activated || player.fortune.activatedBoosts[11].activated || player.fortune.activatedBoosts[12].activated},
        55() { return UNL.overdrive.type2.percent() == 100},
        56() { return player.fortune.activatedBoosts.list.length == 12},
        57() { return player.prestige.challenge.completed.length >= 1},
        58() { return player.challenge.time[12].timer < 10},
        59() { return player.prestige.challenge.completed.length >= 8 },
        60() { return player.coin.currency >= 1.79e308}
    },

    // --- УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ЭФФЕКТОВ АЧИВОК ---
    getBoost(baseAchRew, baseRowRew, fortuneAchRew, fortuneRowRew) {
        let eff = 1;
        let achRew = player.fortune.upgrades.singles.includes(11) ? fortuneAchRew : baseAchRew;
        let rowRew = player.fortune.upgrades.singles.includes(11) ? fortuneRowRew : baseRowRew;
        
        eff += player.achievements.length * achRew + player.achievement_rows.length * rowRew;
        
        if (player.coin.singleUpgrades.includes(25)) eff = Math.pow(eff, UPGS.coin.singles[25].effect());
        if (player.prestige.break.singles.includes(22)) eff *= UPGS.prestige.break.singles[22].effect();
        if (player.shard.achievements[5]) eff *= UNL.shard_achievements[5].effect();
        if (player.prestige.challenge.activated == 8) eff = Math.pow(eff, 0.1);
        
        return eff;
    },

    effect: {
        coin() {
            return ACHS.getBoost(0.15, 3.3, 0.25, 5.5);
        },
        crystal() {
            if (!player.coin.superUpgrades.includes(35)) return 1;
            return ACHS.getBoost(0.09, 1.3, 0.15, 2);
        },
        shard() {
            if (!player.coin.superUpgrades.includes(35)) return 1;
            return ACHS.getBoost(0.225, 3.5, 0.4, 6);
        }
    }
};

function setAchievementsBg() {
  for (let i = 11; i <= 60; i++) {
    const el = document.getElementById(`ach${i}`);
    if (el) el.style.backgroundImage = `url("javascript/cssfiles/images/ach${i}.jpg")`;
  }
}
setAchievementsBg();

function renderSavedAchievements() {
    // 1. Красим уже полученные ачивки
    player.achievements.forEach(id => {
        let element = document.getElementsByClassName("ach")[id - 11];
        if (element) element.classList.add("green", "greenborder");
    });

    // 2. Красим уже собранные ряды
    player.achievement_rows.forEach(r => {
        let element2 = document.getElementsByClassName("achRow")[r - 1];
        if (element2) element2.classList.add("green");
    });
}

// Запускаем один раз при старте
renderSavedAchievements();