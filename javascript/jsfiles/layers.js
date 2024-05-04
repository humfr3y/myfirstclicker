const LAYERS = {
    umultiplier: {
        doReset() {
            if (player.coin.upgrades[1] < this.cost()) return 1
                if (!MILESTONES.has(12) || player.challenge.activated != 0) {
                    player.umultipliers++
                }
                else {
                    while (player.coin.upgrades[1] >= this.cost()) {
                        player.umultipliers++
                    }
                }
                if (!MILESTONES.has(19) || !player.challenge.activated == 0) {
                    LAYERS.doReset()
                }
                MISC.automation.umultiplier.charged = false
                AUTO.umultiplier.time = MISC.automation.umultiplier.activateTime()
                player.time.umultiplier = 0
        },
        cost() {
            let cost = 1
            if (player.challenge.activated == 0 && player.challenge.completed.includes(12))
            player.umultipliers >= 20 ? cost = (100 + (40 * player.umultipliers)) * (1+((player.umultipliers-19)/50)) : cost = 100 + (40 * player.umultipliers)
            else player.umultipliers >= 20 ? cost = (100 + (50 * player.umultipliers)) * (1+((player.umultipliers-19)/50)) : cost = 100 + (50 * player.umultipliers)
            if (player.challenge.activated == 12) cost = 9 + Math.pow((5 * player.umultipliers), player.umultipliers/11)
            return cost
        },
        doForcedReset() {
            if (player.umultipliers == 0) return 1
            player.umultipliers--
            LAYERS.doReset()
            if (MISC.automation.umultiplier.charged) {
                MISC.automation.umultiplier.charged = false
                AUTO.umultiplier.time = MISC.automation.umultiplier.activateTime()
            }
            player.time.umultiplier = 0
        },
        disable(x = this.cost(), y = document.getElementById('umultiplierBoost')) {
                player.coin.upgrades[1] >= x ? y.disabled = false : y.disabled = true
        }
    },
    upower: {
        doReset() {
            if (player.coin.upgrades[1] < this.cost() || player.umultipliers < 4) return 1
            if (!MILESTONES.has(13) || player.challenge.activated != 0) {
                player.upowers++
            }
            else {
                while (player.coin.upgrades[1] >= this.cost()) {
                    player.upowers++
                }
            }
            if (!MILESTONES.has(20) || !player.challenge.activated == 0) {
                LAYERS.doReset()
            }
            player.umultipliers = 0
            if (player.prestige.singleUpgrades.includes(41) && player.challenge.activated == 0) player.umultipliers = 1
            if (player.prestige.singleUpgrades.includes(42) && player.challenge.activated == 0) player.umultipliers = 2
            if (player.prestige.singleUpgrades.includes(43) && player.challenge.activated == 0) player.umultipliers = 3
            if (player.prestige.singleUpgrades.includes(44) && player.challenge.activated == 0) player.umultipliers = 4
            if (MISC.automation.upower.charged) {
                MISC.automation.upower.charged = false
                AUTO.upower.time = MISC.automation.upower.activateTime()
            }
            player.time.upower = 0
        },
        cost() {
            let cost = 1
            if (player.challenge.activated == 0 && player.challenge.completed.includes(12))
            player.upowers >= 10 ? cost = (250 + (80 * player.upowers)) * (1+((player.upowers-9)/7.5)) : cost = 250 + (80 * player.upowers)
            else player.upowers >= 10 ? cost = (250 + (100 * player.upowers)) * (1+((player.upowers-9)/7.5)) : cost = 250 + (100 * player.upowers)
            if (ACHS.has(24)) cost -= 10*(player.upowers)
            if (player.challenge.activated == 12) cost = 24 + Math.pow((10 * player.upowers), player.upowers/20)
            return cost
        },
        disable(x = this.cost(), y = document.getElementById('upowerBoost'), z = player.umultipliers) {
            player.coin.upgrades[1] >= x && z >= 4 ? y.disabled = false : y.disabled = true
        }
    },
    prestige: {
        doReset() {
            if (player.coin.currency < 1e15) return 1
            if (!ACHS.has(21)) ACHS.unl(21)
            let temp = 0
            if (player.prestige.singleUpgrades.includes(44)) temp = 1
            if (player.upowers == temp) {
                if (!ACHS.has(24)) ACHS.unl(24)
            }

            player.prestige.currency += GAIN.crystal.reset()
            player.prestige.total_currency += GAIN.crystal.reset()
            player.prestige.resets += GAIN.prestige.reset()

            PROGRESS.add(1)
    
            for (let i = 1; i < player.prestige.table_resets; i++){
                const k = player.prestige.table_resets-i, j = k-1
                player.prestige.prestigeTable[k].prestiges = player.prestige.prestigeTable[j].prestiges
                player.prestige.prestigeTable[k].crystals = player.prestige.prestigeTable[j].crystals
                player.prestige.prestigeTable[k].time.game.timer = player.prestige.prestigeTable[j].time.game.timer
                player.prestige.prestigeTable[k].time.game.seconds = player.prestige.prestigeTable[j].time.game.seconds
                player.prestige.prestigeTable[k].time.game.minutes = player.prestige.prestigeTable[j].time.game.minutes
                player.prestige.prestigeTable[k].time.game.hours = player.prestige.prestigeTable[j].time.game.hours
                player.prestige.prestigeTable[k].time.game.days = player.prestige.prestigeTable[j].time.game.days

                player.prestige.prestigeTable[k].time.real.timer = player.prestige.prestigeTable[j].time.real.timer
                player.prestige.prestigeTable[k].time.real.seconds = player.prestige.prestigeTable[j].time.real.seconds
                player.prestige.prestigeTable[k].time.real.minutes = player.prestige.prestigeTable[j].time.real.minutes
                player.prestige.prestigeTable[k].time.real.hours = player.prestige.prestigeTable[j].time.real.hours
                player.prestige.prestigeTable[k].time.game.days = player.prestige.prestigeTable[j].time.game.days
            }
            player.prestige.prestigeTable[0].prestiges = GAIN.prestige.reset()
            player.prestige.prestigeTable[0].crystals = GAIN.crystal.reset()
            player.prestige.prestigeTable[0].time.game.timer = player.time.game.prestige.timer
            player.prestige.prestigeTable[0].time.game.seconds = player.prestige.prestigeTable[0].time.game.timer % 60 //39
            player.prestige.prestigeTable[0].time.game.minutes = (player.prestige.prestigeTable[0].time.game.timer / 60) % 60
            player.prestige.prestigeTable[0].time.game.hours = (player.prestige.prestigeTable[0].time.game.timer / 3600) % 24
            player.prestige.prestigeTable[0].time.game.days = player.prestige.prestigeTable[0].time.game.timer / 86400

            player.prestige.prestigeTable[0].time.real.timer = player.time.real.prestige.timer
            player.prestige.prestigeTable[0].time.real.seconds = player.prestige.prestigeTable[0].time.real.timer % 60 //39
            player.prestige.prestigeTable[0].time.real.minutes = (player.prestige.prestigeTable[0].time.real.timer / 60) % 60
            player.prestige.prestigeTable[0].time.real.hours = (player.prestige.prestigeTable[0].time.real.timer / 3600) % 24
            player.prestige.prestigeTable[0].time.game.days = player.prestige.prestigeTable[0].time.game.timer / 86400
    
            player.prestige.table_resets < 10 ? player.prestige.table_resets++ : player.prestige.table_resets

            player.umultipliers = 0, player.upowers = 0
            if (player.challenge.activated == 0) {
                if (player.prestige.singleUpgrades.includes(41)) player.umultipliers = 1
                if (player.prestige.singleUpgrades.includes(42)) player.umultipliers = 2
                if (player.prestige.singleUpgrades.includes(43)) player.umultipliers = 3
                if (player.prestige.singleUpgrades.includes(44)) {player.umultipliers = 4; player.upowers = 1}
            }
            
            if (ACHS.has(40)) {
                player.overdrive.consumed.type1 = Math.sqrt(player.overdrive.consumed.type1)
            }
            else {
                player.overdrive.consumed.type1 = 0
            }
            if (player.time.real.prestige.timer < player.time.real.fastestPrestige.timer) {
                player.time.real.fastestPrestige.timer = player.time.real.prestige.timer
                player.time.real.fastestPrestige.timer = Math.max(player.time.real.fastestPrestige.timer, 0.05)
                player.time.real.fastestPrestige.seconds = player.time.real.fastestPrestige.timer % 60 //39
                player.time.real.fastestPrestige.minutes = (player.time.real.fastestPrestige.timer / 60) % 60
                player.time.real.fastestPrestige.hours = (player.time.real.fastestPrestige.timer / 3600) % 24
                player.time.real.fastestPrestige.days = player.time.real.fastestPrestige.timer / 86400
            }

            if (player.time.game.prestige.timer < player.time.game.fastestPrestige.timer) {
                player.time.game.fastestPrestige.timer = player.time.game.prestige.timer
                player.time.game.fastestPrestige.timer = Math.max(player.time.game.fastestPrestige.timer, 0.05)
                player.time.game.fastestPrestige.seconds = player.time.game.fastestPrestige.timer % 60 //39
                player.time.game.fastestPrestige.minutes = (player.time.game.fastestPrestige.timer / 60) % 60
                player.time.game.fastestPrestige.hours = (player.time.game.fastestPrestige.timer / 3600) % 24
                player.time.game.fastestPrestige.days = player.time.game.fastestPrestige.timer / 86400
            }

            if (player.prestige.singleUpgrades.includes(34) ) 
                if (player.challenge.activated == 0 && player.challenge.completed.includes(2)) 
                    player.shard.currency += 10 * 1000000*player.prestige.currency
                else player.shard.currency += 10

                if (!player.challenge.activated == 0) { //challenge completion
                    if (!player.challenge.completed.includes(player.challenge.activated)){
                        player.challenge.completed.push(player.challenge.activated)
                    } 
                    if (player.challenge.time[player.challenge.activated].timer >= player.time.real.prestige.timer) {
                        player.challenge.time[player.challenge.activated].timer = player.time.real.prestige.timer
    
                        player.challenge.time[player.challenge.activated].seconds = player.challenge.time[player.challenge.activated].timer % 60 //39
                        player.challenge.time[player.challenge.activated].minutes = (player.challenge.time[player.challenge.activated].timer / 60) % 60
                        player.challenge.time[player.challenge.activated].hours = (player.challenge.time[player.challenge.activated].timer / 3600) % 24
                        player.challenge.time[player.challenge.activated].days = player.challenge.time[player.challenge.activated].timer / 86400
                    }
                    if (player.challenge.activated == 9 && MISC.amount_of_upgrades.coin() == 0) if (!ACHS.has(38)) ACHS.unl(38)
                    startChallenge(13)
                }
    
            if (!restartChallenge.checked) player.challenge.activated = 0

            if (MISC.automation.prestige.charged) {
                MISC.automation.prestige.charged = false
                AUTO.prestige.time = MISC.automation.prestige.activateTime()
            }

            
            player.time.game.prestige.timer = 0
            player.time.real.prestige.timer = 0

            for (let i = 1; i <= 4; i++){
                player.shop.items.used[i] = 0
            }

            LAYERS.doReset()
        },
        cost() { return 1e15 }
    },
    doForcedReset() {
        player.overdrive.consumed.type1 = 0
        player.umultipliers = 0
        player.upowers = 0
        player.coin.currency = 10
    
        player.clicks.prestige = 0
    
        for (let i = 1; i <= 4; i++){
            player.shop.items.used[i] = 0
        }
    },
    reset_time() {
        player.time.game.prestige.timer = 0
        player.time.real.prestige.timer = 0// do after Date.now()
    },
    doReset() {
        player.coin.currency = 10
        if (player.challenge.activated == 0) {
            if (player.prestige.singleUpgrades.includes(11)) player.coin.currency = 1000
            if (MILESTONES.has(7)) player.coin.currency = 1e6
            if (MILESTONES.has(17)) player.coin.currency = 1e9
        }
        for (let i = 1; i <= 5; i++){
            player.prestige.singleUpgrades.includes(21) && player.challenge.activated == 0 ? player.coin.upgrades[i] = 1 : player.coin.upgrades[i] = 0
        }
        if (!(player.challenge.activated == 0 && MILESTONES.has(9))) player.coin.singleUpgrades = []
    }
}

const MILESTONES = {
    unl(id) {
        if (!player.prestige.milestones.includes(id)) {
            player.prestige.milestones.push(id)
        }
    },
    has(id) { return player.prestige.milestones.includes(id) },
    milestones: 20,
    checkMilestones() {
        for (let m = 1; m < this.milestones; m++) {
            if (this.conditions[m] !== undefined ? this.conditions[m]() : false) this.unl(m)
            let element = document.getElementById(`pMilestone${m}`)
            if (this.has(m)) element.classList.add('completed')
            else element.classList.remove('completed')
        }
    },
    conditions: {
        1() { return player.prestige.resets >= 1},
        2() { return player.prestige.resets >= 2},
        3() { return player.prestige.resets >= 3},
        4() { return player.prestige.resets >= 4},
        5() { return player.prestige.resets >= 5},
        6() { return player.prestige.resets >= 10},
        7() { return player.prestige.resets >= 15},
        8() { return player.prestige.resets >= 20},
        9() { return player.prestige.resets >= 25},
        10() { return player.prestige.resets >= 30},
        11() { return player.prestige.resets >= 40},
        12() { return player.prestige.resets >= 50},
        13() { return player.prestige.resets >= 60},
        14() { return player.prestige.resets >= 75},
        15() { return player.prestige.resets >= 100},
        16() { return player.prestige.resets >= 1000},
        17() { return player.prestige.resets >= 1e6},
        18() { return player.prestige.resets >= 1e7},
        19() { return player.prestige.resets >= 1e10},
        20() { return player.prestige.resets >= 1e25},
    }
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "P" || event.key == "p" || event.key == "з" || event.key == "З") && player.prestige.total_currency >= 1) {
    LAYERS.prestige.doReset();
    }
});
