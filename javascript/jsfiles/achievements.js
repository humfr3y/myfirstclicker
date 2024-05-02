const ACHS = {
    unl(id) {
        if (!player.achievements.includes(id)) {
            player.achievements.push(id)
            notify(text.notification.achievement + this.names[id-11], 'yellow', '350px') //razobratsa
        }
    },
    has(id) { return player.achievements.includes(id) },
    cols: 10,
    rows: 3,
    checkRows() {
        for (let r = 1; r <= this.rows; r++) {
            const array = []
            for (let c = 1; c <= this.cols; c++)
                if (this.has(r*10+c)) array.push(r*10+c)
            if (array.length == 10 && !player.achievement_rows.includes(r)) player.achievement_rows.push(r)
            }
    },
    checkAchievements() {
        for (let r = 1; r <= this.rows; r++) {
            for (let c = 1; c <= this.cols; c++) {
                if (this.conditions[r*10+c] !== undefined ? this.conditions[r*10+c]() : false) this.unl(r*10+c)
                if (this.has(r*10+c)) {
                    let element = document.getElementsByClassName("ach")[r*10+c-11];
                    element.classList.add("green");
                    element.classList.add("greenborder");
                }
            }
            if (player.achievement_rows.includes(r)) { 
                let element2 = document.getElementsByClassName("achRow")[r-1];
                element2.classList.add("green"); 
            }
        }
    },
    names: [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
    ],
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

        // 21() { return }, //delete because it's make prestige
        22() { return player.time.game.total.days >= 3 },
        23() { return player.prestige.broken_currency >= 100 },
        // 24() { return }, //delete because it's make prestige without resets
        25() { return player.umultipliers >= 10 },
        26() { return UNL.shard.click.percent() == 100 && UNL.shard.second.percent() == 100 },
        27() { return player.time.real.fastestPrestige.timer <= 10 },
        28() { return player.prestige.singleUpgrades.length == 16 },
        29() { return UNL.overdrive.type1.percent() >= 25 },
        30() { return player.prestige.milestones.length >= 16 },

        // 31() { return }, //delete because it's challenge enter
        32() { return player.supercrystal.total_currency >= 1 },
        33() { return player.minerals[1] && player.minerals[2] && player.minerals[3] },
        34() { return player.challenge.time[1].timer + player.challenge.time[2].timer + player.challenge.time[3].timer + player.challenge.time[4].timer + player.challenge.time[5].timer + player.challenge.time[6].timer + player.challenge.time[7].timer + player.challenge.time[8].timer + player.challenge.time[9].timer + player.challenge.time[10].timer + player.challenge.time[11].timer <= 60},
        35() { return player.coin.superUpgrades.length == 1 },
        36() { return player.challenge.time[12].timer <= 60}, 
        // 37() { return }, //happens when critical and supercoin click at once
        // 38() { return }, //happens when c9 beat without upgrades
        39() { return GAIN.coin.click.effect() >= 4.20e69},
        40() { return UNL.overdrive.type1.percent() == 100},
    },
    effect: {
        coin() {
            let eff = 1
            eff += player.achievements.length * 0.15 + player.achievement_rows.length * 3.3
            if (player.coin.singleUpgrades.includes(25)) eff = Math.pow(eff, UPGS.coin.singles[25].effect())
            return eff
        },
        crystal() {
            if (!player.coin.superUpgrades.includes(35)) return 1
            let eff = 1
            eff += player.achievements.length * 0.09 + player.achievement_rows.length * 1.3
            if (player.coin.singleUpgrades.includes(25)) eff = Math.pow(eff, UPGS.coin.singles[25].effect())
            return eff
        },
        shard() {
            if (!player.coin.superUpgrades.includes(35)) return 1
            let eff = 1
            eff += player.achievements.length * 0.225 + player.achievement_rows.length * 3.5
            if (player.coin.singleUpgrades.includes(25)) eff = Math.pow(eff, UPGS.coin.singles[25].effect())
            return eff
            
        }
    }
}
//И после этого создай два новых кода revolution (даст 10 минут тайм варп) и supercoin (даст 128 супермонет) 