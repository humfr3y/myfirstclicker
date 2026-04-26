// --- Вспомогательные функции для LAYERS ---

function updateTimeObject(obj, timerValue) {
    obj.timer = Math.max(timerValue, 0.05);
    obj.seconds = obj.timer % 60;
    obj.minutes = (obj.timer / 60) % 60;
    obj.hours = (obj.timer / 3600) % 24;
    obj.days = obj.timer / 86400;
}

// УМНОЕ восстановление: level 1 = сброс U-Multi, 2 = U-Power, 3 = U-Adder, 4 = Всё
function restoreSavedUtils(level) {
    if (level >= 1) player.umultipliers = 0;
    if (level >= 2) player.upowers = 0;
    if (level >= 3) player.uadders = 0;
    if (level >= 4) player.ureducers = 0;
    
    if (player.challenge.activated === 0 && player.prestige.challenge.activated === 0) {
        if (player.prestige.singleUpgrades.includes(41)) player.umultipliers = Math.max(player.umultipliers, 1);
        if (player.prestige.singleUpgrades.includes(42)) player.umultipliers = Math.max(player.umultipliers, 2);
        if (player.prestige.singleUpgrades.includes(43)) player.umultipliers = Math.max(player.umultipliers, 3);
        if (player.prestige.singleUpgrades.includes(44)) { 
            player.umultipliers = Math.max(player.umultipliers, 4); 
            player.upowers = Math.max(player.upowers, 1); 
        }
    }
}

function applyUtilsCostModifiers(cost, type="none") {
    if (player.balance.upgrades.singles.includes(22)) cost /= MISC.balance.minusCoins.buff().utilsCostReducer;
    if (player.balance.upgrades.singles.includes(21)) cost *= MISC.balance.plusCoins.nerf().utilsCostIncreaser;
    if (player.prestige.challenge.activated === 4) cost = Math.pow(cost, 1.25);
    if (player.minerals[4]) cost -= UPGS.minerals[4].effect3();
    if (type == "none") cost -= GAIN.ureducer.effect();
    cost = Math.max(cost, 0);
    return cost;
}

function resetAutomationTimer(type) {
    if (MISC.automation[type].charged) {
        MISC.automation[type].charged = false;
        AUTO[type].time = MISC.automation[type].activateTime();
    }
    player.time[type] = 0;
}

// --- Основной объект LAYERS ---

const LAYERS = {
    umultiplier: {
        doReset() {
            if (player.coin.upgrades[1] < this.cost()) return 1;
            
            if (!MILESTONES.has(12) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                player.umultipliers++;
            } else {
                while (player.coin.upgrades[1] >= this.cost()) player.umultipliers++;
            }
            
            if (!MILESTONES.has(19) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                LAYERS.doReset();
            }
            resetAutomationTimer('umultiplier');
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.umultipliers;
            let eff24 = UPGS.prestige.break.singles[24].unl() ? UPGS.prestige.break.singles[24].effect() : 0;
            let mult = (player.challenge.activated === 0 && player.challenge.completed.includes(12)) ? 40 : 50;
            
            let cost = scaler >= 20 + eff24 
                ? Math.pow((100 + (mult * scaler)), 1 + (scaler - 19 - eff24) / 80) 
                : 100 + (mult * scaler);
                
            if (player.challenge.activated === 12 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                cost = 9 + Math.pow((5 * scaler), scaler / 13.5);
            }
            return applyUtilsCostModifiers(cost);
        },
        doForcedReset() {
            if (player.umultipliers === 0) return 1;
            player.umultipliers--;
            LAYERS.doReset();
            resetAutomationTimer('umultiplier');
        },
        disable(x = this.cost(), y = document.getElementById('umultiplierBoost')) {
            y.disabled = !(player.coin.upgrades[1] >= x && player.prestige.challenge.activated !== 3);
        }
    },
    
    upower: {
        doReset() {
            if (player.coin.upgrades[1] < this.cost() || player.umultipliers < 4) return 1;
            
            if (!MILESTONES.has(13) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                player.upowers++;
            } else {
                while (player.coin.upgrades[1] >= this.cost()) player.upowers++;
            }
            
            if (!MILESTONES.has(20) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                LAYERS.doReset();
            }
            
            restoreSavedUtils(1); // Сбрасывает ТОЛЬКО umultipliers
            resetAutomationTimer('upower');
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.upowers;
            let mult = (player.challenge.activated === 0 && player.challenge.completed.includes(12)) ? 130 : 150;
            
            let cost = scaler >= 10 ? Math.pow((250 + (mult * scaler)), 1 + (scaler - 9) / 50) : 250 + (mult * scaler);
            
            if (ACHS.has(24)) cost -= 10 * player.upowers;
            if (player.challenge.activated === 12 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                cost = 24 + Math.pow((10 * scaler), scaler / 23);
            }
            return applyUtilsCostModifiers(cost);
        },
        disable(x = this.cost(), y = document.getElementById('upowerBoost'), z = player.umultipliers) {
            y.disabled = !(player.coin.upgrades[1] >= x && z >= 4 && player.prestige.challenge.activated !== 3);
        }
    },
    
    uadder: {
        doReset() {
            if (player.coin.upgrades[2] < this.cost()) return 1;
            player.uadders++;
            LAYERS.doReset();
            restoreSavedUtils(2); // Сбрасывает multi и powers
            resetAutomationTimer('uadder');
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.uadders;
            let cost = scaler >= 10 ? Math.pow((250 + (80 * scaler)), 1 + (scaler - 9) / 60) : 250 + (80 * scaler);
            return applyUtilsCostModifiers(cost);
        },
        disable(x = this.cost(), y = document.getElementById('uadderBoost'), z = player.upowers) {
            y.disabled = !(player.coin.upgrades[2] >= x && z >= 6 && player.prestige.challenge.activated !== 3);
        }
    },
    
    ureducer: {
        doReset() {
            if (player.coin.upgrades[2] < this.cost()) return 1;
            player.ureducers++;
            LAYERS.doReset();
            restoreSavedUtils(3); // Сбрасывает multi, powers и adders
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.ureducers;
            let cost = scaler >= 10 ? Math.pow((650 + (250 * scaler)), 1 + (scaler - 9) / 60) : 650 + (250 * scaler);
            return applyUtilsCostModifiers(cost, "ureducer");
        },
        disable(x = this.cost(), y = document.getElementById('ureducerBoost'), z = player.uadders) {
            y.disabled = !(player.coin.upgrades[2] >= x && z >= 4 && player.prestige.challenge.activated !== 3);
        }
    },
    
    prestige: {
        doReset() {
            if (player.coin.currency < 1e15) return 1;
            if (player.prestige.challenge.activated !== 0 && player.coin.currency < PRES_CHALL.goals[player.prestige.challenge.activated]) return 1;
            
            if (!ACHS.has(21)) ACHS.unl(21);
            if (player.upowers === (player.prestige.singleUpgrades.includes(44) ? 1 : 0)) if (!ACHS.has(24)) ACHS.unl(24);
            
            if (player.challenge.activated === 4 && player.coin.singleUpgrades.length === 0 && 
                player.coin.upgrades[2] === 0 && player.coin.upgrades[3] === 0 && 
                player.coin.upgrades[4] === 0 && player.coin.upgrades[5] === 0 && 
                player.clicks.prestige === 0 && player.coin.upgrades[1] === 1) {
                if (!ACHS.has(47)) ACHS.unl(47);
            }

            let cr_gain = GAIN.crystal.reset();
            player.prestige.currency += cr_gain;
            player.prestige.total_currency += cr_gain;
            player.prestige.resets += GAIN.prestige.reset();
            PROGRESS.add(1);
    
            for (let i = player.prestige.table_resets - 1; i > 0; i--) {
                const k = i, j = i - 1;
                player.prestige.prestigeTable[k].prestiges = player.prestige.prestigeTable[j].prestiges;
                player.prestige.prestigeTable[k].crystals = player.prestige.prestigeTable[j].crystals;
                Object.assign(player.prestige.prestigeTable[k].time.game, player.prestige.prestigeTable[j].time.game);
                Object.assign(player.prestige.prestigeTable[k].time.real, player.prestige.prestigeTable[j].time.real);
            }
            
            player.prestige.prestigeTable[0].prestiges = GAIN.prestige.reset();
            player.prestige.prestigeTable[0].crystals = cr_gain;
            updateTimeObject(player.prestige.prestigeTable[0].time.game, player.time.game.prestige.timer);
            updateTimeObject(player.prestige.prestigeTable[0].time.real, player.time.real.prestige.timer);
    
            if (player.prestige.table_resets < 10) player.prestige.table_resets++;

            restoreSavedUtils(4); // Уровень 4: Сбрасывает вообще всё!
            
            if (!ACHS.has(55)) {
                player.overdrive.consumed.type1 = ACHS.has(40) ? Math.sqrt(player.overdrive.consumed.type1) : 0;
            }
            
            if (player.time.real.prestige.timer < player.time.real.fastestPrestige.timer) {
                updateTimeObject(player.time.real.fastestPrestige, player.time.real.prestige.timer);
            }
            if (player.time.game.prestige.timer < player.time.game.fastestPrestige.timer) {
                updateTimeObject(player.time.game.fastestPrestige, player.time.game.prestige.timer);
            }

            if (player.prestige.singleUpgrades.includes(34)) {
                player.shard.currency += (player.challenge.activated === 0 && player.challenge.completed.includes(2)) ? 10 * 1000 * player.prestige.currency : 10;
            }

            if (player.challenge.activated !== 0) {
                let act = player.challenge.activated;
                if (!player.challenge.completed.includes(act)) player.challenge.completed.push(act);
                
                if (player.challenge.time[act].timer >= player.time.real.prestige.timer) {
                    updateTimeObject(player.challenge.time[act], player.time.real.prestige.timer);
                }
                
                if (act === 9 && MISC.amount_of_upgrades.coin() === 0 && !ACHS.has(38)) ACHS.unl(38);
                if (act === 12 && PRES_CHALLENGE[7].completed()) player.challenge.time[12].times_completed++;
                startChallenge(13, true);
            }

            if (player.prestige.challenge.activated !== 0) {
                let pact = player.prestige.challenge.activated;
                if (!player.prestige.challenge.completed.includes(pact)) player.prestige.challenge.completed.push(pact);
                
                if (player.prestige.challenge.time[pact].timer >= player.time.real.prestige.timer) {
                    updateTimeObject(player.prestige.challenge.time[pact], player.time.real.prestige.timer);
                }
                
                if (!ACHS.has(57)) ACHS.unl(57);
                startPChallenge(9, true);
            }
    
            if (!restartChallenge.checked) player.challenge.activated = 0;
            if (!restartPChallenge.checked) player.prestige.challenge.activated = 0;

            if (MISC.automation.prestige.charged) {
                MISC.automation.prestige.charged = false;
                AUTO.prestige.time = MISC.automation.prestige.activateTime();
            }

            player.time.game.prestige.timer = 0;
            player.time.real.prestige.timer = 0;

            for (let i = 1; i <= 6; i++) player.shop.items.used[i] = 0;

            LAYERS.doReset();
        },
        cost() { return player.prestige.challenge.activated !== 0 ? PRES_CHALL.goals[player.prestige.challenge.activated] : 1e15; }
    },
    
    doForcedReset() {
        player.overdrive.consumed.type1 = 0;
        restoreSavedUtils(4); // И тут уровень 4
        player.coin.currency = 10;
        player.clicks.prestige = 0;
        for (let i = 1; i <= 6; i++) player.shop.items.used[i] = 0;
        LAYERS.doReset();
    },
    
    reset_time() {
        player.time.game.prestige.timer = 0;
        player.time.real.prestige.timer = 0;
    },
    
    doReset() {
        player.coin.currency = 10;
        if (player.challenge.activated === 0 && player.prestige.challenge.activated === 0) {
            if (player.prestige.singleUpgrades.includes(11)) player.coin.currency = 1000;
            if (MILESTONES.has(7)) player.coin.currency = 1e6;
            if (MILESTONES.has(18)) player.coin.currency = 1e9;
        }
        
        let keepCoins = player.prestige.singleUpgrades.includes(21) && player.challenge.activated === 0 && player.prestige.challenge.activated === 0;
        for (let i = 1; i <= 5; i++) {
            player.coin.upgrades[i] = keepCoins ? 1 : 0;
        }
        
        if (!(player.challenge.activated === 0 && MILESTONES.has(9)) || player.prestige.challenge.activated !== 0) {
            player.coin.singleUpgrades = [];
        }
    }
};

const MILESTONES = {
    reqs: [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 1000, 1e6, 1e7, 1e8, 1e10],
    milestones: 20,
    
    has(id) { return player.prestige.milestones.includes(id); },
    unl(id) { if (!this.has(id)) player.prestige.milestones.push(id); },
    
    checkMilestones() {
        for (let m = 1; m <= this.milestones; m++) {
            if (player.prestige.resets >= this.reqs[m]) this.unl(m);
            
            let element = document.getElementById(`pMilestone${m}`);
            if (element) {
                element.classList.toggle('completed', this.has(m));
            }
        }
    }
};

document.addEventListener("keydown", function(event) {
    if ((event.key === "P" || event.key === "p" || event.key === "з" || event.key === "З") && player.prestige.total_currency >= 1) {
        LAYERS.prestige.doReset();
    }
});