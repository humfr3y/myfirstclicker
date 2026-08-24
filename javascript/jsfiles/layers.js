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
    if (type == "none") {
        cost -= GAIN.ureducer.effect();
        cost -= UPGS.shop.buyables[12].effect()
    }
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
            
            if (!MILESTONES.has(11) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                player.umultipliers++;
                if (player.event.digitalization.activated) {
                    if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
                }
            } else {
                while (player.coin.upgrades[1] >= this.cost()) {
                    player.umultipliers++;
                    if (player.event.digitalization.activated) {
                        if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
                    }
                }
            }
            
            if (!MILESTONES.has(18) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
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
            let finalCost = player.reflash.algo.includes(73) ? Math.pow(applyUtilsCostModifiers(cost), UPGS.reflash.algo.tree[23].effect()) : applyUtilsCostModifiers(cost)
            return finalCost
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
            
            if (!MILESTONES.has(12) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                player.upowers++;
                if (player.event.digitalization.activated) {
                    if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
                }
            } else {
                while (player.coin.upgrades[1] >= this.cost()) {
                    player.upowers++;
                    if (player.event.digitalization.activated) {
                        if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
                    }
                }
            }
            
            if (!MILESTONES.has(19) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                LAYERS.doReset();
                restoreSavedUtils(1);
            }
            
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
            let finalCost = player.reflash.algo.includes(73) ? Math.pow(applyUtilsCostModifiers(cost), UPGS.reflash.algo.tree[23].effect()) : applyUtilsCostModifiers(cost)
            return finalCost
        },
        disable(x = this.cost(), y = document.getElementById('upowerBoost'), z = player.umultipliers) {
            y.disabled = !(player.coin.upgrades[1] >= x && z >= 4 && player.prestige.challenge.activated !== 3);
        }
    },
    
    uadder: {
        doReset() {
            if (player.coin.upgrades[2] < this.cost()) return 1;
            player.uadders++;
            if (player.event.digitalization.activated) {
                if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
            }
            if (!MILESTONES.has(20) || player.challenge.activated !== 0 || player.prestige.challenge.activated !== 0) {
                LAYERS.doReset();
                restoreSavedUtils(2); 
            }
            resetAutomationTimer('uadder');
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.uadders;
            let cost = scaler >= 10 ? Math.pow((250 + (80 * scaler)), 1 + (scaler - 9) / 60) : 250 + (80 * scaler);
            let finalCost = player.reflash.algo.includes(73) ? Math.pow(applyUtilsCostModifiers(cost), UPGS.reflash.algo.tree[23].effect()) : applyUtilsCostModifiers(cost)
            return finalCost
        },
        disable(x = this.cost(), y = document.getElementById('uadderBoost'), z = player.upowers) {
            y.disabled = !(player.coin.upgrades[2] >= x && z >= 6 && player.prestige.challenge.activated !== 3);
        }
    },
    
    ureducer: {
        doReset() {
            if (player.coin.upgrades[2] < this.cost()) return 1;
            player.ureducers++;
            if (player.event.digitalization.activated) {
                if (!player.event.digitalization.quests.weekly.completed.includes(3)) player.event.digitalization.quests.weekly.progress[2]++
            }
            LAYERS.doReset();
            restoreSavedUtils(3); // Сбрасывает multi, powers и adders
        },
        cost() {
            let scaler = player.prestige.challenge.activated === 6 ? MISC.amount_of_upgrades.utils() : player.ureducers;
            let cost = scaler >= 10 ? Math.pow((650 + (250 * scaler)), 1 + (scaler - 9) / 60) : 650 + (250 * scaler);
            let finalCost = player.reflash.algo.includes(73) ? Math.pow(applyUtilsCostModifiers(cost, "ureducer"), UPGS.reflash.algo.tree[23].effect()) : applyUtilsCostModifiers(cost, "ureducer")
            return finalCost
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

            let cr_gain = GAIN.crystal.reset()*1;
            player.prestige.currency += cr_gain;
            player.prestige.total_currency += cr_gain;
            player.prestige.this_reflash_currency += cr_gain;
            player.prestige.resets += GAIN.prestige.reset();
            player.prestige.true_resets++
            if (player.virus.activated && player.virus.type == 2) player.virus.current++
            if (player.virus.activated && player.virus.type == 7 && player.challenge.activated != 0) player.virus.current++
            if (player.event.digitalization.activated) {
                if (!player.event.digitalization.quests.weekly.completed.includes(4)) player.event.digitalization.quests.weekly.progress[3]++
                if (!player.event.digitalization.quests.daily.completed.includes(3)) player.event.digitalization.quests.daily.progress[2]++
            }

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
                player.shard.currency += (player.challenge.activated === 0 && player.challenge.completed.includes(2)) ? 1000000 * player.prestige.currency : 10;
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
                if (player.challenge.activated != 0) {
                    if (!ACHS.has(67)) ACHS.unl(67)
                }
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

            player.shop.items.used[3] = 0;

            if (player.automation.mechanism.checked[12]) {
                if (player.automation.mechanism_conditions[12].cppxp_diff <= 1) {
                    AUTO.mechanisms[12].switch()
                    MISC.balance.respec()
                }
                else player.automation.mechanism_conditions[12].cppxp_diff -= 1
            }

            if (player.automation.mechanism.checked[14]) {
                if (player.automation.mechanism_conditions[14].cppxp_diff <= 1) {
                    AUTO.mechanisms[14].switch()
                    respecMinerals()
                }
                else player.automation.mechanism_conditions[14].cppxp_diff -= 1
            }

            if (player.automation.mechanism.checked[15]) {
                if (player.automation.mechanism_conditions[15].cppxp_diff <= 1) {
                    AUTO.mechanisms[15].switch()
                    if (player.automation.mechanism_conditions[15].respec_after_changing_preset) UPGS.shop.respec_items()
                }
                else player.automation.mechanism_conditions[15].cppxp_diff -= 1
            }

            LAYERS.doReset();
        },
        cost() { return player.prestige.challenge.activated !== 0 ? PRES_CHALL.goals[player.prestige.challenge.activated] : 1e15; }
    },

    reflash: {
        doReset() {
            if (player.coin.currency < 1.7e308 || !player.prestige.challenge.completed.includes(8)) return 0;

            if (!ACHS.has(61)) ACHS.unl(61);

            if (!ACHS.has(69) && player.achievement_conditions[69]) ACHS.unl(69)
            if (!ACHS.has(70) && player.achievement_conditions[70]) ACHS.unl(70)

            rollNextAcceleratorSeed();

            // Исправлено начисление валюты перепрошивания
            let refl_gain = GAIN.reflash.reset();
            player.reflash.currency += refl_gain;
            player.reflash.total_currency += refl_gain;
            player.reflash.resets += 1;
            
            PROGRESS.add(11);

            for (let i = player.reflash.table_resets - 1; i > 0; i--) {
                const k = i, j = i - 1;
                player.reflash.resetTable[k].resets = player.reflash.resetTable[j].resets;
                player.reflash.resetTable[k].currency = player.reflash.resetTable[j].currency;
                Object.assign(player.reflash.resetTable[k].time.game, player.reflash.resetTable[j].time.game);
                Object.assign(player.reflash.resetTable[k].time.real, player.reflash.resetTable[j].time.real);
            }
            
            player.reflash.resetTable[0].resets = 1;
            player.reflash.resetTable[0].currency = refl_gain;
            updateTimeObject(player.reflash.resetTable[0].time.game, player.time.game.reflash.timer);
            updateTimeObject(player.reflash.resetTable[0].time.real, player.time.real.reflash.timer);
    
            if (player.reflash.table_resets < 10) player.reflash.table_resets++;

            if (player.time.real.reflash.timer < player.time.real.fastestReflash.timer) {
                updateTimeObject(player.time.real.fastestReflash, player.time.real.reflash.timer);
            }

            if (player.time.game.reflash.timer < player.time.game.fastestReflash.timer) {
                updateTimeObject(player.time.game.fastestReflash, player.time.game.reflash.timer);
            }

            LAYERS.doReflashReset();

            player.time.game.reflash.timer = 0;
            player.time.real.reflash.timer = 0;
            hidePopup() 

            if (player.reflash.respecTree) {
                UPGS.reflash.algo.respec()
                document.getElementById('respecTree').classList.remove('active')
                player.reflash.respecTree = false
            }

            for (let i = 0; i < player.reflash.algo.length; i++) {
                const element = player.reflash.algo[i];
                UPGS.reflash.algo.update_if_bought(element)
            }
// //[player.reflash.algo.includes(11), UPGS.reflash.algo[0].effect()],
//             if (player.reflash.algo.includes(21)) {
//                 player.supercrystal.currency += UPGS.reflash.algo.tree[1].effect()
//                 player.supercrystal.total_currency += UPGS.reflash.algo.tree[1].effect()
//             }
//             if (player.reflash.algo.includes(31)) {
//                 player.prestige.singleUpgrades = [41, 42, 43, 44]
//             }
//             if (player.reflash.algo.includes(43)) {
//                 player.fortune.tokens += 2
//                 player.fortune.total_tokens += 2
//             }
            
        },
    },
    
    doForcedReset() {
        if (player.challenge.activated != 0 || !ACHS.has(55) || player.prestige.challenge.activated != 0) player.overdrive.consumed.type1 = 0;
        restoreSavedUtils(4); // И тут уровень 4
        player.coin.currency = 10;
        player.clicks.prestige = 0;
        for (let i = 3; i <= 3; i++) player.shop.items.used[i] = 0;
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
            if (MILESTONES.has(14)) player.coin.currency = 1e9;
        }
        
        let keepCoins = player.prestige.singleUpgrades.includes(21) && player.challenge.activated === 0 && player.prestige.challenge.activated === 0;
        for (let i = 1; i <= 5; i++) {
            player.coin.upgrades[i] = keepCoins ? 1 : 0;
        }
        
        if (!(player.challenge.activated === 0 && MILESTONES.has(9)) || player.prestige.challenge.activated !== 0) {
            player.coin.singleUpgrades = [];
        }
    },

    doReflashReset() {
        player.umultipliers = 0;
        player.upowers = 0;
        player.uadders = 0;
        player.ureducers = 0;

        player.clicks.prestige = 0;

        player.coin.currency = 10;
        player.coin.this_reflash_currency = 10;
        for (let i = 1; i <= 5; i++) player.coin.upgrades[i] = 0;
        player.coin.singleUpgrades = [];
        player.coin.superUpgrades = [];

        player.supercoin.currency *= UPGS.reflash.algo.tree[8].effect();
        player.supercoin.this_reflash_currency *= UPGS.reflash.algo.tree[8].effect();
        player.supercoin.spent_currency = 0;
        for (let i = 1; i <= 11; i++) player.shop.upgrades[i] = 0;
        for (let i = 1; i <= 10; i++) player.shop.permanentUpgrades[i] = 0;

        for (let i = 1; i <= 6; i++) {
            player.shop.items.amount[i] = 0;
            player.shop.items.used[i] = 0;
            player.shop.items.timer[i] = 0;
        }

        player.prestige.currency = 0;
        player.prestige.this_reflash_currency = 0;
        player.prestige.broken_currency = 0;
        player.prestige.table_resets = 0
        player.prestige.prestigeTable = getPrestigeTable()
        player.prestige.resets = 0;
        player.prestige.table_resets = 0
        player.prestige.prestigeTable = getPrestigeTable()
        player.prestige.upgrades[1] = 0;
        player.prestige.singleUpgrades = [];
        player.prestige.milestones = [];
        for (let i = 1; i <= 5; i++) player.prestige.break.buyables[i] = 0;
        player.prestige.break.singles = [];
        

        player.shard.currency = 0;
        for (let i = 1; i <= 3; i++) player.shard.upgrades[i] = 0;
        player.shard.singleUpgrades = [];
        player.shard.unlockables = [];
        player.shard.consumed = { click: 0, second: 0, buyables: 0, singles: 0 };
        for (let i = 1; i <= 10; i++) player.shard.achievements[i] = 0;
        player.shard_achievements = []; 

        player.supercrystal.currency = 0;
        player.supercrystal.total_currency = 0;
        player.supercrystal.spent_currency_on_fortune_upgrades = 0;
        player.supercrystal.consumedShards = 0;
        player.supercrystal.upgrades = [];

        player.rune.currency = 0;
        player.rune.total_currency = 0;
        for (let i = 1; i <= 4; i++) player.minerals[i] = 0;

        player.fortune.tokens = 0;
        player.fortune.total_tokens = 0;
        player.fortune.spent_tokens = 0;
        player.fortune.daily_resets = 15
        player.fortune.converted = { coins: 0, crystals: 0 };
        for (let i = 1; i <= 3; i++) player.fortune.upgrades.buyables[i] = 0;
        player.fortune.upgrades.singles = [];
        for (let i = 1; i <= 12; i++) player.fortune.activatedBoosts[i] = { activated: false, effect: 0, time: 0 };
        player.fortune.activatedBoosts.list = [];

        player.balance.neutral = 0;
        player.balance.scales_of_balance = 0;
        player.balance.coins = { plus: 0, minus: 0 };
        player.balance.total_coins = { plus: 0, minus: 0 };
        for (let i = 1; i <= 3; i++) player.balance.upgrades.buyables[i] = 0;
        player.balance.upgrades.singles = [];

        player.challenge.completed = [];
        player.challenge.activated = 0;
        for (let i = 1; i <= 12; i++) {
            player.challenge.time[i] = getMaxTime();
            if (i === 12) player.challenge.time[i].times_completed = 0;
        }

        player.prestige.challenge.completed = [];
        player.prestige.challenge.activated = 0;
        for (let i = 1; i <= 8; i++) {
            player.prestige.challenge.time[i] = getMaxTime();
        }
        player.overdrive.consumed = { type1: 0, type2: 0 };
        const autoTypes = ACHS.has(75) ? [] : ACHS.has(66) ? ['uadder', 'ureducer'] : ['single', 'buyable', 'umultiplier', 'upower', 'prestige', 'uadder', 'ureducer'];
        autoTypes.forEach(type => {
            player.automation.checkbox[type] = false;
            player.automation.upgrades[type] = 0;
            if (AUTO[type] && AUTO[type].stop) AUTO[type].stop(); 
        });
        player.time.game.reflash = getZeroTime();
        player.time.game.prestige = getZeroTime();
        player.time.real.reflash = getZeroTime();
        player.time.game.fastestPrestige = getMaxTime();
        player.time.real.fastestPrestige = getMaxTime();

        player.time.umultiplier = 0;
        player.time.upower = 0;
        player.time.uadder = 0;
        player.time.ureducer = 0;

        const autoKeys = ACHS.has(75) ? [] : ACHS.has(66) ? ['uadder', 'ureducer'] : ['single', 'buyable', 'umultiplier', 'upower', 'prestige', 'uadder', 'ureducer'];
        autoKeys.forEach(type => {
            if (player.automation.checkbox[type]) {
                const checkboxEl = document.getElementById(checkboxId);
                if (checkboxEl) checkboxEl.checked = false;
            }
        });

        LAYERS.doReset(); 
        MILESTONES.checkMilestones()
        checkCompletedChallenges()
    }
};

const MILESTONES = {
    reqs: [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 1000, 10000, 1e6, 1e9, 1e15],
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

