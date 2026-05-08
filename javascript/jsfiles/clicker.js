const PENALTIES = {
    apply1: (eff) => eff.pow(0.8).mul(new Decimal(1 + MISC.amount_of_upgrades.coin()).pow(new Decimal("1.005").pow(player.clicks.prestige*2))),
    apply7: (eff) => MISC.amount_of_upgrades.coin() < 50 ? eff.pow(1 - MISC.amount_of_upgrades.coin() / 50) : new Decimal(0),
    apply8: (eff) => eff.div(CHALL.virusCoins_gen()),
    apply12: (eff) => eff.pow(0.1).mul(GAIN.umultiplier.effect()).pow(GAIN.upower.effect())
};

// Универсальный враппер для софткапа Decimal, чтобы не писать его 3 раза
const applyDecimalSoftcap = (obj) => {
    const { softcap_start, softcap_power } = obj.softcap();
    return softCapDecimal(obj.no_softcap_effect(), softcap_start, softcap_power);
};

// --- ГЛАВНЫЙ КАЛЬКУЛЯТОР ДОХОДОВ ---

const GAIN = {
    coin: {
        click: {
            no_softcap_effect() {
                let effect = new Decimal("1");
                
                // 1. Базовые множители
                const mults = [
                    [player.coin.upgrades[3], UPGS.coin.buyables[3].effect()],
                    [player.shop.upgrades[1], UPGS.shop.buyables[1].effect()],
                    [player.coin.singleUpgrades.includes(12), UPGS.coin.singles[12].effect()],
                    [player.coin.singleUpgrades.includes(23), UPGS.coin.singles[23].effect()],
                    [true, GAIN.coin.gain.effect()] // Всегда применяется
                ];
                mults.forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                let cAct = player.challenge.activated;
                let pcAct = player.prestige.challenge.activated;

                // 2. Бонусы от пройденных испытаний
                if (player.challenge.completed.includes(1)) effect = effect.mul(CHALL[1].effect());
                if (player.challenge.completed.includes(6)) effect = effect.pow(CHALL[6].effect());

                

                // 3. Штрафы обычных испытаний
                // if (cAct === 3) effect = effect.div(100000);
                if (cAct === 4) effect = effect.sqrt();
                if (cAct === 1 && pcAct !== 1 && pcAct !== 7) effect = PENALTIES.apply1(effect);
                if (cAct === 7 && pcAct !== 2 && pcAct !== 7) effect = PENALTIES.apply7(effect);
                if (cAct === 8 && pcAct !== 2 && pcAct !== 7) effect = PENALTIES.apply8(effect);
                if (cAct === 12 && pcAct !== 2 && pcAct !== 7) effect = PENALTIES.apply12(effect);

                // 4. Пакетные штрафы престиж-испытаний
                if (pcAct === 1 || pcAct === 7) {
                    effect = effect.div(100000).sqrt();
                    effect = PENALTIES.apply1(effect);
                }
                if (pcAct === 2 || pcAct === 7) {
                    effect = PENALTIES.apply7(effect);
                    if (effect.gt(0)) {
                        effect = PENALTIES.apply8(effect);
                        effect = PENALTIES.apply12(effect);
                    }
                }

                // 5. Глобальные срезы
                if (pcAct !== 0 && pcAct !== 8) effect = effect.pow(0.5);
                if (pcAct == 8) effect = effect.pow(0.7);
                if (cAct !== 0) effect = effect.pow(0.75);
                if (cAct === 10) effect = effect.pow(0.67);

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);
                // Оставляем объект Decimal, просто ограничиваем его через встроенный min
                return Decimal.min(val, new Decimal("1.79e308")); 
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4;
                
                if (player.challenge.activated === 9 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                    softcap_start = 1e6;
                    softcap_power = Math.pow(softcap_power, 2);
                } 
                if (player.challenge.activated === 2 || player.prestige.challenge.activated === 1 || player.prestige.challenge.activated === 7) {
                    softcap_start = 10;
                } 
                if (player.challenge.completed.includes(9)) softcap_start *= CHALL[9].effect();
                softcap_start *= UPGS.minerals[2].effect2();
                return { softcap_start, softcap_power };
            }
        },
        
        second: {
            no_softcap_effect() {
                let effect = new Decimal(UPGS.coin.buyables[1].effect());
                
                const mults = [
                    [player.coin.upgrades[4], UPGS.coin.buyables[4].effect()],
                    [player.shop.upgrades[2], UPGS.shop.buyables[2].effect()],
                    [player.coin.singleUpgrades.includes(11), UPGS.coin.singles[11].effect()],
                    [player.coin.singleUpgrades.includes(21), UPGS.coin.singles[21].effect()],
                    [ACHS.has(15) && player.prestige.challenge.activated != 8, (1 + 0.0001 * player.clicks.simulated)],
                    [true, GAIN.coin.gain.effect()]
                ];
                mults.forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                let cAct = player.challenge.activated;
                let pcAct = player.prestige.challenge.activated;

                // Быстрый выход: если генерация отключена, не считаем дальше
                if ([3, 8].includes(cAct) || [2, 7].includes(pcAct)) return new Decimal(0);

                if (player.challenge.completed.includes(3)) effect = effect.mul(CHALL[3].effect());
                if (player.challenge.completed.includes(8)) effect = effect.mul(CHALL[8].effect());

                if (cAct === 4) effect = effect.sqrt();
                if (cAct === 7) effect = PENALTIES.apply7(effect);
                if (cAct === 12) effect = PENALTIES.apply12(effect);

                if (pcAct === 1 || pcAct === 7) effect = effect.sqrt();

                if (pcAct !== 0 && pcAct !== 8) effect = effect.pow(0.5);
                if (pcAct == 8) effect = effect.pow(0.7)
                if (cAct !== 0) effect = effect.pow(0.67);
                if (cAct === 10) effect = effect.pow(0.67);

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);
                // Оставляем объект Decimal, просто ограничиваем его через встроенный min
                return Decimal.min(val, new Decimal("1.79e308")); 
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5;
                
                if (player.challenge.activated === 9 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                    softcap_start = 1e6;
                    softcap_power = Math.pow(softcap_power, 2);
                } 
                if (player.challenge.activated === 2 || player.prestige.challenge.activated === 1 || player.prestige.challenge.activated === 7) {
                    softcap_start = 10;
                } 
                if (player.challenge.completed.includes(9)) softcap_start *= CHALL[9].effect();
                softcap_start *= UPGS.minerals[2].effect2();
                
                return { softcap_start, softcap_power };
            }
        },
        
        gain: {
            no_softcap_effect() {
                let effect = new Decimal("1");
                if (player.coin.upgrades[5]) effect = effect.add(UPGS.coin.buyables[5].effect());
                
                const mults = [
                    [player.shop.upgrades[3], UPGS.shop.buyables[3].effect()],
                    [player.coin.singleUpgrades.includes(13), UPGS.coin.singles[13].effect()],
                    [player.coin.singleUpgrades.includes(22), UPGS.coin.singles[22].effect()],
                    [true, ACHS.effect.coin()],
                    [ACHS.has(28) && player.prestige.challenge.activated != 8, 4],
                    [true, GAIN.umultiplier.effect()],
                    [true, UNL.overdrive.type1.effect()],
                    [true, UPGS.minerals[2].effect1()],
                    [UPGS.prestige.singles[31].unl(), UPGS.prestige.singles[31].effect()],
                    [UPGS.prestige.singles[32].unl(), UPGS.prestige.singles[32].effect()],
                    [true, GAIN.shard.effect.effect()],
                    [player.shard.achievements[1], UNL.shard_achievements[1].effect()],
                    [player.fortune.activatedBoosts[1].activated, UPGS.fortune.boosts[1].effect()],
                    [player.balance.coins.plus, MISC.balance.plusCoins.buff().coinBuff],
                    [PRES_CHALLENGE[7].completed(), PRES_CHALLENGE[7].effect()]
                ];
                mults.forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                if (player.balance.coins.minus) effect = effect.div(MISC.balance.minusCoins.nerf().coinNerf);

                let upowerEff = GAIN.upower.effect();
                if (upowerEff) effect = effect.pow(upowerEff);
                if (UPGS.prestige.singles[12].unl()) effect = effect.pow(UPGS.prestige.singles[12].effect());

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);
                return val
            },
            softcap() {
                let softcap_start = 1e20;
                if (player.balance.upgrades.singles.includes(11)) softcap_start *= MISC.balance.plusCoins.buff().coinGainSoftcapPusher;
                if (player.balance.upgrades.singles.includes(12)) softcap_start *= MISC.balance.minusCoins.nerf().coinGainSoftcapPuller;
                return { softcap_start: Math.max(softcap_start, 1), softcap_power: 1 };
            }
        },
        offline(x = GAIN.coin.second.effect(), y = MISC.offline()) {
            return x * y;
        }
    },
    
    shard: {
        click() {
            let effect = 1;
            const mults = [
                [player.shard.upgrades[1], UPGS.shard.buyables[1].effect()],
                [player.shop.upgrades[5], UPGS.shop.buyables[5].effect()],
                [UPGS.supercrystal[33].unl(), UPGS.supercrystal[33].effect()],
                [player.fortune.activatedBoosts[3].activated, UPGS.fortune.boosts[3].effect()],
                [player.prestige.break.buyables[3], UPGS.prestige.break.buyables[3].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) effect = effect * val; });
            return Math.min(effect, 1.79e308);
        },
        second() {
            if (!UNL.shard.second.unl()) return 0;
            let effect = 1;
            const mults = [
                [player.shard.upgrades[2], UPGS.shard.buyables[2].effect()],
                [player.shop.upgrades[5], UPGS.shop.buyables[5].effect()],
                [player.minerals[3], UPGS.minerals[3].effect2()],
                [ACHS.has(39), 1.337],
                [true, ACHS.effect.shard()],
                [player.shard.achievements[4], UNL.shard_achievements[4].effect()],
                [player.fortune.activatedBoosts[3].activated, UPGS.fortune.boosts[3].effect()],
                [player.prestige.break.buyables[3], UPGS.prestige.break.buyables[3].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) effect = effect * val; });
            return Math.min(effect, 1.79e308);
        },
        offline(x = GAIN.shard.second(), y = MISC.offline()) {
            return UNL.shard.second.unl() ? x * y : 0;
        },
        effect: {
            no_softcap_effect() {
                let effect = new Decimal("1").add(player.shard.currency / 100);
                
                if (ACHS.has(30)) effect = effect.mul(1 + Math.pow(player.prestige.resets, 0.3));
                if (PRES_CHALLENGE[3].completed()) effect = effect.mul(PRES_CHALLENGE[3].effect())
                if (player.shard.singleUpgrades.includes(21)) effect = effect.mul(UPGS.shard.singles[21].effect());

                let cAct = player.challenge.activated;
                let pcAct = player.prestige.challenge.activated;

                    if ([5, 6, 7, 11].includes(cAct)) effect = effect.sqrt(); // Исправил старый баг с effect.sqrt(effect)
                    if (cAct === 3 || cAct === 8) effect = effect.pow(0.25);
                    // if (cAct === 12) effect = effect.pow(0.2);
                
                if (pcAct !== 0) effect = effect.pow(0.25);
                
                if (pcAct === 1 || pcAct === 7) {
                    effect = new Decimal("0.01").sqrt().sqrt();
                }
                if (pcAct === 2 || pcAct === 7) {
                    effect = effect.sqrt().pow(0.25).pow(0.02);
                }
                if (pcAct === 8) effect = new Decimal("1");

                return effect;
            },
            effect() {
                const ch_reward = (player.challenge.completed.includes(7) && player.challenge.activated === 0) ? CHALL[7].effect() : 1;
                return player.prestige.challenge.activated === 8 ? new Decimal("1") : applyDecimalSoftcap(this) * ch_reward;
            },
            softcap() {
                return {
                    softcap_start: player.supercrystal.upgrades.includes(23) ? 1e15 : 1e12,
                    softcap_power: UPGS.shop.permanent[6].effect()
                };
            }
        },
        min() { return UPGS.shard.buyables[3].effect().min; },
        max() { return 100 * UPGS.shard.buyables[3].effect().max; },
        break_crystal(x = howMuchCrystalsInput.value) {
            let gain = 0, temp = 0;
            let parsed_x = x.includes('e') ? convert(x) : parseInt(parseFloat(x));
            let broken_crystals = parsed_x;
            
            if (x.includes('%')) {
                temp = Math.floor(player.prestige.currency - (player.prestige.currency * (parsed_x / 100)));
                broken_crystals = player.prestige.currency - temp;
                player.prestige.currency = Math.floor(temp);
            } else {
                player.prestige.currency -= parsed_x;
            }

            if (broken_crystals < 1e6) {
                for (let i = 0; i < broken_crystals; i++) {
                    gain += randomNumber(this.min(), this.max());
                    if (player.shard.currency === 0) gain += 100;
                }
            } else {
                gain = ((this.min() + this.max()) / 2) * broken_crystals;
            }
            
            if (UPGS.supercrystal[33].unl()) gain *= UPGS.supercrystal[33].effect();
            if (player.fortune.activatedBoosts[3].activated) gain *= UPGS.fortune.boosts[3].effect();
            if (player.prestige.break.buyables[3]) gain *= UPGS.prestige.break.buyables[3].effect()
            
            return { gain: Math.min(gain, 1.7e308), broken_crystals };
        }
    },
    crystal: {
        offline(x = GAIN.crystal.offline_calc(), y = MISC.offline()) {
            let gain = x * y;
            return gain
        },
        no_softcap_reset() {
            let gain = 1;
            const mults = [
                [player.prestige.break.singles.includes(25), Math.pow(1.2 + UPGS.prestige.break.buyables[1].effect(), Math.log10((player.coin.currency + 10) / 1e15))],
                [player.prestige.upgrades[1], UPGS.prestige.buyables[1].effect()],
                [ACHS.has(28), 4],
                [player.shard.singleUpgrades.includes(11), UPGS.shard.singles[11].effect()],
                [player.shop.permanentUpgrades[1], UPGS.shop.permanent[1].effect()],
                [UNL.overdrive.type2.unl(), UNL.overdrive.type2.effect()],
                [player.minerals[3], UPGS.minerals[3].effect1()],
                [player.challenge.completed.includes(10) && player.challenge.activated === 0, CHALL[10].effect()],
                [player.supercrystal.upgrades.includes(12), 3],
                [player.coin.superUpgrades.includes(35), ACHS.effect.crystal()],
                [player.prestige.break.singles.includes(11), UPGS.prestige.break.singles[11].effect()],
                [player.shard.achievements[3], UNL.shard_achievements[3].effect()],
                [player.fortune.activatedBoosts[2].activated, UPGS.fortune.boosts[2].effect()],
                [player.balance.coins.minus, MISC.balance.minusCoins.buff().crystalGainBuff],
                [player.prestige.challenge.completed.includes(1), PRES_CHALLENGE[1].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });

            if (player.balance.coins.plus) gain /= MISC.balance.plusCoins.nerf().crystalGainNerf;
            return gain;
        },
        reset() {
            const { softcap_start, softcap_power } = this.softcap();
            return softCap(this.no_softcap_reset(), softcap_start, softcap_power);
        },
        offline_calc() {
            return player.prestige.singleUpgrades.includes(34) ? UPGS.prestige.singles[34].effect()/60 : 0
        },
        softcap() {
            let addition = player.balance.upgrades.singles.includes(12) ? MISC.balance.minusCoins.buff().crystalSoftcapSofter : 0;
            let substract = player.balance.upgrades.singles.includes(11) ? MISC.balance.plusCoins.nerf().crystalSoftcapHarsher : 0;
            let pusher = player.balance.upgrades.singles.includes(32) ? MISC.balance.minusCoins.buff().crystalSoftcapPusher : 1;
            
            const softcap_start = Math.max(1e50 * pusher, 1);
            
            let softcap_power = 1;
            if (this.no_softcap_reset() >= 1e50) {
                let calcPower = (1 - ((Math.log10(this.no_softcap_reset()) - 50 - Math.log(pusher)) / 125)) - substract + addition;
                let minPower = 0.4 - substract + addition;
                softcap_power = Math.max(calcPower, minPower);
            }
            
            return { softcap_start, softcap_power };
        }
    },

    prestige: {
        offline(y = MISC.offline()) {
            if (!MILESTONES.has(16)) return 0;
            let gain = y / 60;
            let formula = 60 / player.time.real.fastestPrestige.timer;
            if (formula) gain *= formula * 2.11;
            
            const mults = [
                [ACHS.has(35), 1 + MISC.amount_of_upgrades.super() / 100],
                [player.prestige.break.singles.includes(13), UPGS.prestige.break.singles[13].effect()],
                [player.shop.upgrades[6], UPGS.shop.buyables[6].effect()],
                [player.shard.achievements[7], UNL.shard_achievements[7].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });
            return gain;
        },
        reset() {
            let gain = MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency + 10) - 14) : 1;
            const mults = [
                [ACHS.has(35), 1 + MISC.amount_of_upgrades.super() / 100],
                [player.prestige.break.singles.includes(13), UPGS.prestige.break.singles[13].effect()],
                [player.shop.upgrades[6], UPGS.shop.buyables[6].effect()],
                [player.shard.achievements[7], UNL.shard_achievements[7].effect()],
                [player.fortune.upgrades.singles.includes(22), 2]
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });
            return Math.floor(gain);
        }
    },

    supercoin: {
        offline(x = GAIN.supercoin.gain_per_second(), y = MISC.offline()) {
            return x * y
        },
        chance() {
            let chance = 1;
            const mults = [
                [player.shop.upgrades[4], UPGS.shop.buyables[4].effect()],
                [player.coin.superUpgrades.includes(23), UPGS.coin.singles[13].effect_super()],
                [player.prestige.singleUpgrades.includes(13), UPGS.prestige.singles[13].effect()],
                [player.supercrystal.upgrades.includes(11), Math.pow(1.5, UPGS.supercrystal[11].unl())],
                [player.minerals[1], UPGS.minerals[1].effect3()],
                [player.prestige.break.singles.includes(12), UPGS.prestige.break.singles[12].effect()],
                [player.shard.achievements[2], UNL.shard_achievements[2].effect()],
                [player.fortune.activatedBoosts[4].activated, UPGS.fortune.boosts[4].effect()],
                [player.balance.upgrades.singles.includes(31), MISC.balance.plusCoins.buff().chanceBuffer]
            ];
            mults.forEach(([cond, val]) => { if (cond) chance *= val; });
            
            if (ACHS.has(37)) chance += 1;
            return chance;
        },
        get() {
            return randomNumber(0, (100 / this.chance()) - 1) === 0;
        },
        gain() {
            return ACHS.has(44) ? 2 : 1;
        },
        daily: {
            min() {
                let effect = 25;
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect();
                if (ACHS.has(52)) effect *= 2;
                return effect;
            },
            max() {
                let effect = 100;
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect();
                if (ACHS.has(52)) effect *= 2;
                return effect;
            },
            reward() {
                return randomNumber(this.min(), this.max());
            }
        },
        gain_per_second() {
            if (!player.shop.unlockables.includes(6)) return 0
            return (1 + this.chance() / 10) * (Math.log10(GAIN.coin.second.effect() * 1 + 1)/1000)
        }
    },

    critical: {
        baseMult: 2,
        baseChance: 1,
        multiplier() {
            let effect = GAIN.critical.baseMult;
            const mults = [
                [player.supercrystal.upgrades.includes(22), 5],
                [player.shop.permanentUpgrades[4], UPGS.shop.permanent[4].effect()],
                [player.minerals[1], UPGS.minerals[1].effect2()], // Исправлено player.minerals на player.minerals[1]
                [player.coin.superUpgrades.includes(13), UPGS.coin.buyables[3].effect_super()],
                [player.shard.achievements[9], UNL.shard_achievements[9].effect()],
                [player.fortune.activatedBoosts[6].activated, UPGS.fortune.boosts[6].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) effect *= val; });
            
            if (player.prestige.challenge.activated === 8) effect = 1
            return effect;
        },
        chance: {
            additive() {
                let effect = GAIN.critical.baseChance;
                if (player.supercrystal.upgrades.includes(21)) effect += 2;
                if (player.shop.permanentUpgrades[3]) effect += UPGS.shop.permanent[3].effect();
                return effect;
            },
            multiplicative() {
                let effect = this.additive();
                const mults = [
                    [player.minerals[1], UPGS.minerals[1].effect1()], // Аналогичный фикс
                    [player.shard.achievements[8], UNL.shard_achievements[8].effect()],
                    [player.fortune.activatedBoosts[5].activated, UPGS.fortune.boosts[5].effect()],
                    [player.balance.upgrades.singles.includes(31), MISC.balance.plusCoins.buff().chanceBuffer]
                ];
                mults.forEach(([cond, val]) => { if (cond) effect *= val; });
                return effect;
            }
        },
        get() {
            return randomNumber(0, (100 / this.chance.multiplicative()) - 1) === 0;
        },
        gain(x) {
            return x * this.multiplier();
        }
    },

    simulation: {
        multiplier() {
            let effect = 1;
            if (player.supercrystal.upgrades.includes(13)) effect *= 2;
            if (player.fortune.activatedBoosts[10].activated) effect *= UPGS.fortune.boosts[10].effect();
            return effect;
        }
    },

    umultiplier: {
        base() {
            let base = 2;
            if (player.prestige.singleUpgrades.includes(14)) base = 2.5;
            if (ACHS.has(42)) base += 0.05;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect();
            if (player.prestige.challenge.completed.includes(2)) base *= PRES_CHALLENGE[2].effect();
            return player.prestige.challenge.activated === 8 ? 2 : base;
        },
        effect(x = player.umultipliers) {
            let effect = Math.pow(this.base(), x + MISC.free_upgrade.umultiplier());
            if (player.challenge.activated === 3) effect = Math.sqrt(effect);
            // if (player.prestige.challenge.activated === 8) effect = Math.pow(effect, 0.1);
            return effect;
        }
    },

    upower: {
        base() {
            let base = 0.01;
            if (player.prestige.singleUpgrades.includes(24)) base = 0.015;
            if (player.prestige.break.buyables[5]) base += UPGS.prestige.break.buyables[5].effect();
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect();
            return player.prestige.challenge.activated === 8 ? 0.01 : base;
        },
        effect(x = player.upowers) {
            let effect = 1 + (this.base() * (x + MISC.free_upgrade.upower()));
            // if (player.prestige.challenge.activated === 8) effect = Math.pow(effect, 0.1);
            return effect;
        }
    },

    uadder: {
        base() {
            let base = 1;
            if (ACHS.has(50)) base *= 1.1;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect();
            return base;
        },
        base2(x = player.prestige.break.singles.includes(15)) {
            if (!x) return 0;
            let base = 0.1;
            if (ACHS.has(50)) base *= 1.1;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect();
            return base;
        },
        effect(x = player.uadders) {
            let effect = this.base() * x;
            if (player.prestige.challenge.activated === 8) effect = Math.pow(effect, 0.1);
            return effect;
        },
        effect2(x = player.uadders) {
            let effect = this.base2() * x;
            if (player.prestige.challenge.activated === 8) effect = Math.pow(effect, 0.1);
            return effect;
        }
    },

    ureducer: {
        base() {
            let base = 500;
            if (player.prestige.break.singles.includes(14)) base += UPGS.prestige.break.singles[14].effect();
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect();
            return base;
        },
        effect(x = player.ureducers) {
            let effect = this.base() * x;
            if (player.prestige.challenge.activated === 4 || player.prestige.challenge.activated === 8) {
                effect = Math.pow(effect, 0.1);
            }
            return effect;
        }
    },

    // --- УНИВЕРСАЛЬНЫЙ ОБРАБОТЧИК ОФФЛАЙН/ВАРП ДОХОДА ---
    
    _applyOffline(timeVal, isWarp = false) {
        // Кэшируем вычисления (ternary выбирает нужный метод в зависимости от того, варп это или обычный оффлайн)
        const coinGain = isWarp ? this.coin.offline(undefined, timeVal) : this.coin.offline();
        const shardGain = isWarp ? this.shard.offline(undefined, timeVal) : this.shard.offline();
        const crystalGain = isWarp ? this.crystal.offline(undefined, timeVal) : this.crystal.offline();
        const prestigeGain = Math.floor(isWarp ? this.prestige.offline(timeVal) : this.prestige.offline());
        const superCoinGain = isWarp ? 0 : this.supercoin.offline();
        const balanceNeutral = isWarp ? this.balance.offline(undefined, timeVal) : this.balance.offline();
        const balanceScales = isWarp ? this.balance.sob_offline(undefined, timeVal) : this.balance.scales_of_balance();
        // Начисляем валюты
        player.coin.currency += coinGain;
        player.coin.total_currency += coinGain;
        
        // Лимит для оффлайна
        if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
        if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
        player.shard.currency += shardGain;
        if (player.shard.currency > 1.79e308) player.shard.currency = 1.79e308;
        player.prestige.currency += crystalGain;
        player.prestige.total_currency += crystalGain;
        player.prestige.resets += prestigeGain;
        player.supercoin.currency += superCoinGain;
        player.supercoin.total_currency += superCoinGain;
        player.balance.neutral += balanceNeutral;
        player.balance.scales_of_balance += balanceScales;
        
        // Начисляем игровое время
        player.time.game.total.timer += timeVal;
        player.time.game.prestige.timer += timeVal;
        player.time.umultiplier += timeVal;
        player.time.upower += timeVal;

        // Реальное время начисляется только при обычном оффлайне (варп не старит нас в реале)
        if (!isWarp) {
            let realTimeGain = UPGS.supercrystal[31].unl() ? timeVal / 5 : timeVal;
            player.time.real.total.timer += realTimeGain;
            player.time.real.prestige.timer += realTimeGain;
        }
    },

    offline_gain(y = MISC.offline()) { this._applyOffline(y, false); },
    offline_gain_time_warp(x) { this._applyOffline(x, true); },

    balance: {
        generation() {
            const scalesBase = Math.pow(MISC.balance.scales_of_balance(), 3);
            if (!player.balance.upgrades.singles.includes(23)) return scalesBase * UPGS.balance.buyables[3].effect();
            
            return (Math.pow(player.balance.scales_of_balance, 3) + scalesBase) * UPGS.balance.buyables[3].effect();
        },
        offline(x = GAIN.balance.generation(), y = MISC.offline()) {
            return UNL.display[76].req() ? x * y : 0;
        },
        scales_of_balance() {
            if (!player.balance.upgrades.singles.includes(23)) return 0;
            return MISC.balance.scales_of_balance() / 20000;
        },
        sob_offline(x = GAIN.balance.scales_of_balance(), y = MISC.offline()) {
            return player.balance.upgrades.singles.includes(23) ? x * y : 0;
        }
    },
    
    clicksPerSecond: 0
};

const UNL = {
    overdrive: {
        type1: {
            unl() { return true },
            cost() { return 1000 + Math.pow(10, this.percent()) / 20 * 2; },
            percent() { return Math.min(Math.log10(player.overdrive.consumed.type1 + 1), 100); },
            effect() {
                if (this.percent() === 0) return 1;
                let eff = 1 + (Math.pow(2, this.percent() / 2.75) / 2);
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect();
                return eff;
            },
            activate: false, blink: '', interval: ''
        },
        type2: {
            unl() { return player.shop.unlockables.includes(1); },
            cost() { return 1000 + Math.pow(10, this.percent() + 8); },
            percent() { return Math.min(Math.log10((player.overdrive.consumed.type2 / 1e8) + 1), 100); },
            effect() {
                if (this.percent() === 0) return 1;
                let eff = 1 + (Math.pow(1.75, this.percent() / 2));
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect();
                return eff;
            },
            activate: false, blink: '', interval: ''
        }
    },
    shard: {
        click: { cost: 1000, interval: '', unl() { return player.shard.unlockables.includes(2); }, percent() { return Math.min(player.shard.consumed.click / 10, 100); } },
        second: { cost: 1000, interval: '', unl() { return player.shard.unlockables.includes(1); }, percent() { return Math.min(player.shard.consumed.second / 10, 100); } },
        buyables: { cost: 10000, interval: '', unl() { return player.shard.unlockables.includes(3); }, percent() { return Math.min(player.shard.consumed.buyables / 100, 100); } },
        singles: { cost: 100000, interval: '', unl() { return player.shard.unlockables.includes(4); }, percent() { return Math.min(player.shard.consumed.singles / 1000, 100); } },
    },
    supercrystal: {
        pour() { return Math.max(Math.min(findRatio(player.supercrystal.consumedShards, this.cost()), 100), 0); },
        cost() {
            let cost = 1e15 * Math.pow(1000 - UPGS.shop.permanent[7].effect(), player.supercrystal.total_currency);
            cost /= UPGS.minerals[3].effect3();
            if (PRES_CHALLENGE[6].completed()) cost /= PRES_CHALLENGE[6].effect();
            return cost;
        },
        interval: ''
    },
    rune: {
        cost() { return 1e8 * Math.pow(10, player.rune.total_currency); },
        max_cost() {
            let cost = 1e8 * Math.pow(10, player.rune.total_currency);
            let currency = player.prestige.currency;
            let iter = 0;
            for (let i = 0; i < 999; i++) {
                if (currency >= cost) {
                    cost = 1e8 * Math.pow(10, i + player.rune.total_currency);
                    currency -= cost;
                    iter = i;
                } else break;
            }
            return { cost, iter };
        }
    },
    shard_achievements: {
        unl(x) {
            if (this[x].current() >= this[x].goal() && player.shop.unlockables.includes(3)) {
                player.shard.achievements[x]++;
            }
        },
        _barsCache: null,
        check() {
            if (!this._barsCache) this._barsCache = document.getElementsByClassName('shardAchBar');
            for (let i = 1; i <= 10; i++) {
                this.unl(i);
                if (this._barsCache[i - 1]) this._barsCache[i - 1].style.clipPath = `inset(0 ${100 - this[i].ratio()}% 0 0)`;
            }
        },
        _effBase(reqLvl, val, isAdditive) {
            if (!(player.shop.unlockables.includes(3) && player.shard_achievements.includes(reqLvl))) return 1;
            const fBoost = player.fortune.activatedBoosts[9].activated ? UPGS.fortune.boosts[9].effect() : 1;
            const ach10 = UNL.shard_achievements[10].effect();
            return isAdditive ? (1 + val * ach10 * fBoost) : (val * ach10 * fBoost);
        },
        1: { id: 1, current() { return player.coin.total_currency; }, goal(x = player.shard.achievements[1]) { return 1e50 * Math.pow(1e20, x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[1]) { let e = UNL.shard_achievements._effBase(1, Math.pow(7, x), false); return player.prestige.challenge.activated === 8 ? 1: e; } },
        2: { id: 2, current() { return player.supercoin.total_currency; }, goal(x = player.shard.achievements[2]) { return 1000 * Math.pow(2, x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[2]) { return UNL.shard_achievements._effBase(1, x / 50, true); } },
        3: { id: 3, current() { return player.prestige.total_currency; }, goal(x = player.shard.achievements[3]) { return 1e10 * Math.pow(1e10, x); }, ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, effect(x = player.shard.achievements[3]) { return UNL.shard_achievements._effBase(2, Math.pow(2.33, x), false); } },
        4: { id: 4, current() { return player.shard.currency; }, goal(x = player.shard.achievements[4]) { return 1e25 * Math.pow(1e25, x); }, ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, effect(x = player.shard.achievements[4]) { return UNL.shard_achievements._effBase(2, Math.pow(7, x), false); } },
        5: { id: 5, current() { return player.achievements.length; }, goal(x = player.shard.achievements[5]) { return 10 + (10 * x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[5]) { return UNL.shard_achievements._effBase(3, Math.pow(1.85, x), false); } },
        6: { id: 6, current() { return player.time.game.total.days; }, goal(x = player.shard.achievements[6]) { return Math.pow(2, x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[6]) { return UNL.shard_achievements._effBase(3, 0.002 * x, true); } },
        7: { id: 7, current() { return player.prestige.resets; }, goal(x = player.shard.achievements[7]) { return 1e6 * Math.pow(10, x); }, ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, effect(x = player.shard.achievements[7]) { return UNL.shard_achievements._effBase(4, Math.pow(2.05, x), false); } },
        8: { id: 8, current() { return player.clicks.simulated; }, goal(x = player.shard.achievements[8]) { return 1000 * Math.pow(2, x); }, ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, effect(x = player.shard.achievements[8]) { return UNL.shard_achievements._effBase(4, 0.04 * x, true); } },
        9: { id: 9, current() { return player.clicks.critical; }, goal(x = player.shard.achievements[9]) { return 100 * Math.pow(2, x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[9]) { return UNL.shard_achievements._effBase(5, Math.pow(1.2, x), false); } },
        10: { id: 10, current() { let sum = 0; for (let i = 1; i <= 10; i++) sum += player.shard.achievements[i]; return sum; }, goal(x = player.shard.achievements[10]) { return 10 + (10 * x); }, ratio() { return findRatio(this.current(), this.goal()); }, effect(x = player.shard.achievements[10]) { return (player.shop.unlockables.includes(3) && player.shard_achievements.includes(5)) ? Math.pow(1.1, x) : 1; } }
    },
    display: {
        unl(x, y = 'none') {
            let el = this[x].element;
            if (typeof el === 'function') el = el();
            if (!el) return;
            
            // ОПТИМИЗАЦИЯ ДОМ: Изменяем стиль только если он действительно другой
            const targetDisplay = this[x].req() ? this[x].type : y;
            if (el.style.display !== targetDisplay) el.style.display = targetDisplay;
        },
        check() {
            // Проходим по всем 83 элементам без вычисления длины ключей каждый раз
            for (let i = 1; i <= 90; i++) {
                if (this[i]) {
                    if (this[i].element().classList.contains('automationUpgrade')) this.unl(i, this[i].type !== 'none' ? 'none' : 'block') 
                    else this.unl(i, this[i].type !== 'none' ? 'none' : 'flex');
                }
            }
        },
        // Спрессованный до абсолюта словарь UI-элементов
        1: { type: 'block', element: () => document.getElementById('maxbuy'), req: () => ACHS.has(15) },
        2: { type: 'block', element: () => document.getElementById('maxOrNoUpgrades'), req: () => ACHS.has(15) },
        3: { type: 'block', element: () => document.getElementById('doPrestige'), req: () => ACHS.has(20) },
        4: { type: 'block', element: () => document.getElementById('crystalCount'), req: () => ACHS.has(21) },
        5: { type: 'block', element: () => document.getElementById('prestigeSelect'), req: () => ACHS.has(21) },
        6: { type: 'block', element: () => document.getElementById('prestigeSection'), req: () => ACHS.has(21) },
        7: { type: 'flex', element: () => document.getElementById('prestigeSpecialRow'), req: () => MILESTONES.has(10) },
        8: { type: 'flex', element: () => document.getElementById('singleAutomationContainer'), req: () => MILESTONES.has(2) },
        9: { type: 'flex', element: () => document.getElementById('buyableAutomationContainer'), req: () => MILESTONES.has(3) },
        10: { type: 'flex', element: () => document.getElementById('umultiplierAutomationContainer'), req: () => MILESTONES.has(4) },
        11: { type: 'flex', element: () => document.getElementById('upowerAutomationContainer'), req: () => MILESTONES.has(5) },
        12: { type: 'flex', element: () => document.getElementById('prestigeAutomationContainer'), req: () => MILESTONES.has(8) },
        13: { type: 'block', element: () => document.getElementById('superCrystalsSelect'), req: () => player.progressBarGoals.includes(3) },
        14: { type: 'block', element: () => document.getElementById('mineralsSelect'), req: () => player.progressBarGoals.includes(4) },
        15: { type: 'block', element: () => document.getElementById('challengeSelect'), req: () => player.progressBarGoals.includes(2) },
        16: { type: 'flex', element: () => document.getElementById('post11challenge'), req: () => player.challenge.completed.includes(11) },
        17: { type: 'flex', element: () => document.getElementById('post11challenge2'), req: () => player.challenge.completed.includes(11) },
        18: { type: 'flex', element: () => document.getElementById('post11challenge3'), req: () => player.challenge.completed.includes(11) },
        19: { type: 'flex', element: () => document.getElementById('postAch32'), req: () => ACHS.has(32) },
        20: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[0], req: () => ACHS.has(33) },
        21: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[1], req: () => ACHS.has(33) },
        22: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[2], req: () => ACHS.has(33) },
        23: { type: 'block', element: () => document.getElementById('prestigeHelpDiv'), req: () => ACHS.has(21) },
        24: { type: 'block', element: () => document.getElementById('modernizeButton'), req: () => UPGS.shop.unlockables[2].unl() },
        25: { type: 'block', element: () => document.getElementById('harshUmulti'), req: () => [5, 7].includes(player.challenge.activated) || player.prestige.challenge.activated === 1 },
        26: { type: 'flex', element: () => document.getElementById('postE13SoftcapClick'), req: () => GAIN.coin.click.effect() >= 1e13 },
        27: { type: 'flex', element: () => document.getElementById('postE13SoftcapSecond'), req: () => GAIN.coin.second.effect() >= 1e13 },
        28: { type: 'flex', element: () => document.getElementById('postE15SoftcapGain'), req: () => GAIN.coin.gain.effect() >= 1e15 },
        29: { type: 'flex', element: () => document.getElementById('postE7SoftcapShard'), req: () => GAIN.shard.effect.effect() >= 1e7 },
        30: { type: 'flex', element: () => document.getElementById('shardsPerSecondText'), req: () => UNL.shard.second.unl() },
        31: { type: 'none', element: () => document.getElementById('shardUnlockableBase1'), req: () => UNL.shard.second.unl() },
        32: { type: 'flex', element: () => document.getElementById('shardsClick'), req: () => UNL.shard.click.unl() },
        33: { type: 'none', element: () => document.getElementById('shardUnlockableBase2'), req: () => UNL.shard.click.unl() },
        34: { type: 'flex', element: () => document.getElementById('shardBuyables'), req: () => UNL.shard.buyables.unl() },
        35: { type: 'none', element: () => document.getElementById('shardUnlockableBase3'), req: () => UNL.shard.buyables.unl() },
        36: { type: 'flex', element: () => document.getElementById('shardSingles'), req: () => UNL.shard.singles.unl() },
        37: { type: 'none', element: () => document.getElementById('shardUnlockableBase4'), req: () => UNL.shard.singles.unl() },
        38: { type: 'none', element: () => ELS.automationUpgradesArray[0], req: () => MISC.automation.single.time() === 50 },
        39: { type: 'none', element: () => ELS.automationUpgradesArray[1], req: () => MISC.automation.buyable.time() === 50 },
        40: { type: 'none', element: () => ELS.automationUpgradesArray[2], req: () => MISC.automation.umultiplier.time() === 50 },
        41: { type: 'none', element: () => ELS.automationUpgradesArray[3], req: () => MISC.automation.upower.time() === 50 },
        42: { type: 'none', element: () => ELS.automationUpgradesArray[4], req: () => MISC.automation.prestige.time() === 50 },
        43: { type: 'flex', element: () => document.getElementById('prestigeModeDiv'), req: () => MISC.automation.prestige.time() === 50 && MILESTONES.has(13) },
        44: { type: 'flex', element: () => document.getElementById('increaseBulkBuyButton'), req: () => MISC.automation.buyable.time() === 50 && MILESTONES.has(6) && MISC.automation.buyable.bulk() !== 512 },
        45: { type: 'flex', element: () => document.getElementById('umultiIntervalDiv'), req: () => MISC.automation.umultiplier.time() === 50 },
        46: { type: 'flex', element: () => document.getElementById('upowerIntervalDiv'), req: () => MISC.automation.upower.time() === 50 },
        47: { type: 'inline-block', element: () => document.getElementById('exitChallenge'), req: () => player.challenge.activated !== 0 },
        48: { type: 'block', element: () => document.getElementById('overdriveSelect'), req: () => true },
        49: { type: 'block', element: () => document.getElementById('overdriveType1'), req: () => true },
        50: { type: 'block', element: () => document.getElementById('overdriveType2'), req: () => UPGS.shop.unlockables[1].unl() },
        51: { type: 'block', element: () => document.getElementById('challengeHelpDiv'), req: () => player.progressBarGoals.includes(2) },
        52: { type: 'block', element: () => document.getElementById('breakPrestigeSelect'), req: () => player.progressBarGoals.includes(5) },
        53: { type: 'block', element: () => document.getElementById('uadderBoost'), req: () => player.prestige.break.singles.includes(25) },
        54: { type: 'block', element: () => document.getElementById('ureducerBoost'), req: () => player.prestige.break.singles.includes(25) },
        55: { type: 'none', element: () => ELS.automationUpgradesArray[5], req: () => MISC.automation.uadder.time() === 50 },
        56: { type: 'flex', element: () => document.getElementById('uadderIntervalDiv'), req: () => MISC.automation.uadder.time() === 50 },
        57: { type: 'flex', element: () => document.getElementById('shardAchBarDiv1'), req: () => player.shard_achievements.includes(1) },
        58: { type: 'flex', element: () => document.getElementById('shardAchBarDiv2'), req: () => player.shard_achievements.includes(2) },
        59: { type: 'flex', element: () => document.getElementById('shardAchBarDiv3'), req: () => player.shard_achievements.includes(3) },
        60: { type: 'flex', element: () => document.getElementById('shardAchBarDiv4'), req: () => player.shard_achievements.includes(4) },
        61: { type: 'flex', element: () => document.getElementById('shardAchBarDiv5'), req: () => player.shard_achievements.includes(5) },
        62: { type: 'none', element: () => document.getElementById('shardAchUnlockable1'), req: () => player.shard_achievements.includes(1) },
        63: { type: 'none', element: () => document.getElementById('shardAchUnlockable2'), req: () => player.shard_achievements.includes(2) },
        64: { type: 'none', element: () => document.getElementById('shardAchUnlockable3'), req: () => player.shard_achievements.includes(3) },
        65: { type: 'none', element: () => document.getElementById('shardAchUnlockable4'), req: () => player.shard_achievements.includes(4) },
        66: { type: 'none', element: () => document.getElementById('shardAchUnlockable5'), req: () => player.shard_achievements.includes(5) },
        67: { type: 'block', element: () => document.getElementById('shardAchievementsSelect'), req: () => player.shop.unlockables.includes(3) },
        68: { type: 'block', element: () => document.getElementById('challengesTimeSelect'), req: () => player.progressBarGoals.includes(2) },
        69: { type: 'block', element: () => document.getElementById('recentPrestigesSelect'), req: () => player.progressBarGoals.includes(1) },
        70: { type: 'flex', element: () => document.getElementById('postMinerals'), req: () => player.progressBarGoals.includes(4) },
        71: { type: 'flex', element: () => document.getElementById('postMinerals2'), req: () => player.progressBarGoals.includes(4) },
        72: { type: 'flex', element: () => document.getElementById('postBreakprestige'), req: () => player.progressBarGoals.includes(5) },
        73: { type: 'flex', element: () => document.getElementById('postBreakprestige2'), req: () => player.progressBarGoals.includes(5) },
        74: { type: 'flex', element: () => document.getElementById('uadderAutomationContainer'), req: () => player.progressBarGoals.includes(5) },
        75: { type: 'block', element: () => document.getElementById('fortuneSelect'), req: () => player.progressBarGoals.includes(6) },
        76: { type: 'block', element: () => document.getElementById('balanceSelect'), req: () => player.fortune.upgrades.singles.includes(31) },
        77: { type: 'flex', element: () => document.getElementById('A-rarity-block'), req: () => player.fortune.upgrades.singles.includes(12) },
        78: { type: 'flex', element: () => document.getElementById('S-rarity-block'), req: () => player.fortune.upgrades.singles.includes(21) },
        79: { type: 'flex', element: () => document.getElementById('EX-rarity-block'), req: () => player.fortune.upgrades.singles.includes(32) },
        80: { type: 'flex', element: () => document.getElementById('aquamarineMineral'), req: () => player.shop.unlockables.includes(5) },
        // 81: { type: 'flex', element: () => document.getElementById('crystalgainsc'), req: () => player.prestige.total_currency >= 1e50 },
        // 82: { type: 'flex', element: () => document.getElementById('shardeffectsc'), req: () => player.shard.currency >= 1e10 },
        81: { type: 'inline-block', element: () => document.getElementById('exitPChallenge'), req: () => player.prestige.challenge.activated !== 0 },
        82: { type: 'flex', element: () => document.getElementById('breakPUs'), req: () => player.prestige.break.singles.includes(25)},
        83: { type: 'flex', element: () => document.getElementById('doReflash'), req: () => player.prestige.challenge.completed.length >= 4},
        84: { type: 'block', element: () => document.getElementById('challengePrestigeSelect'), req: () => player.progressBarGoals.includes(8)},
        85: { type: 'flex', element: () => document.getElementById('prestigeChallengePair2'), req: () => player.prestige.challenge.completed.length >= 1 },
        86: { type: 'flex', element: () => document.getElementById('prestigeChallengePair3'), req: () => player.prestige.challenge.completed.length >= 2 },
        87: { type: 'flex', element: () => document.getElementById('prestigeChallengePair4'), req: () => player.prestige.challenge.completed.length >= 3 },
        88: { type: 'block', element: () => document.getElementById('helpTab22'), req: () => player.progressBarGoals.includes(8) },
        89: { type: 'block', element: () => document.getElementById('aquaticPick'), req: () => ACHS.has(51) },
        90: { type: 'block', element: () => document.getElementById('supercoinsGain'), req: () => player.shop.unlockables.includes(6) },
    }
};

// --- ИСПЫТАНИЯ (CHALLENGES) ---

// Хелперы для сокращения кода испытаний
const fb8 = () => player.fortune.activatedBoosts[8].activated ? UPGS.fortune.boosts[8].effect() : 1;
const isChallComp = (id) => player.challenge.completed.includes(id);
const isPChallComp = (id) => player.prestige.challenge.completed.includes(id);

const CHALL = {
    1: { id: 1, completed: () => isChallComp(1), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(player.challenge.completed.length+1, 3.5) * fb8() },
    2: { id: 2, completed: () => isChallComp(2), effect: () => player.prestige.challenge.activated == 8 ? 1 : 1000 * fb8() },
    3: { id: 3, completed: () => isChallComp(3), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + Math.log(player.prestige.resets + 1)) * fb8() },
    4: { id: 4, completed: () => isChallComp(4), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(1.35, player.achievements.length) * fb8() },
    5: { id: 5, completed: () => isChallComp(5), effect: () => player.prestige.challenge.activated == 8 ? 1 : CHALL[5].completed() ? 0.9 : 1 },
    6: { id: 6, completed: () => isChallComp(6), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + 0.1 * fb8()) },
    7: { id: 7, completed: () => isChallComp(7), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.log2(player.shard.currency + 1) * fb8() },
    8: { id: 8, completed: () => isChallComp(8), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + player.time.real.prestige.timer/2) * fb8() },
    9: { id: 9, completed: () => isChallComp(9), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(player.supercoin.total_currency, 1.5) * fb8() },
    10: { id: 10, completed: () => isChallComp(10), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + Math.pow(MISC.amount_of_upgrades.coin() + 1, 0.75)) * fb8() },
    11: { id: 11, completed: () => isChallComp(11) }, // new items in shop
    12: { id: 12, completed: () => isChallComp(12) }, // decrease umulti and upower scaling
    
    virusCoins_gen() {
        let virusCoins = Math.pow(1.1, player.time.real.prestige.timer);
        return Math.min(virusCoins, 1e100);
    }
};

const PRES_CHALLENGE = {
    1: { id: 1, completed: () => isPChallComp(1), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1e6*1.1 : 1e6 },
    2: { id: 2, completed: () => isPChallComp(2), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1 + 1.1 * (Math.log10(player.umultipliers + 1) / 10) : 1 + (Math.log10(player.umultipliers + 1) / 10) },
    3: { id: 3, completed: () => isPChallComp(3), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1.1*Math.pow(4, player.prestige.challenge.completed.length) : Math.pow(4, player.prestige.challenge.completed.length) },
    4: { id: 4, completed: () => isPChallComp(4), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1.1*13 * player.supercrystal.total_currency : 13 * player.supercrystal.total_currency },
    5: { id: 5, completed: () => isPChallComp(5), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1+(1.1*(Math.pow(player.balance.scales_of_balance, 0.005)-1)) : Math.pow(player.balance.scales_of_balance, 0.005) },
    6: { id: 6, completed: () => isPChallComp(6), effect: () => player.prestige.challenge.activated == 8 ? 1 : ACHS.has(59) ? 1.1*1e12 : 1e12 },
    7: { id: 7, completed: () => isPChallComp(7), effect: () => player.prestige.challenge.activated == 8 ? 1 : (ACHS.has(59) ? 1.1*(player.challenge.time[12].times_completed + 1) : player.challenge.time[12].times_completed + 1) }
};

// --- РАЗНОЕ И УТИЛИТЫ (MISC) ---

const MISC = {
    daily_reward() {
        if (!player.got_daily_reward) {
            let gain = player.offline_gain.daily;
            player.supercoin.currency += gain;
            player.supercoin.total_currency += gain;
            player.got_daily_reward = true;
            dailyDesc.innerHTML = text.daily.true;
            toggleBadges(['badge-settings', 'badge-misc', 'badge-daily'], false);
        } else {
            dailyDesc.innerHTML = text.daily.false;
        }
        openWindow('daily', true);
    },
    what_day_is_it_today() {
        const d = new Date();
        return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
    },
    amount_of_upgrades: {
        coin: () => player.coin.upgrades[1] + player.coin.upgrades[2] + player.coin.upgrades[3] + player.coin.upgrades[4] + player.coin.upgrades[5] + player.coin.singleUpgrades.length,
        prestige: () => player.prestige.upgrades[1] + player.prestige.upgrades[2] + player.prestige.singleUpgrades.length,
        super: () => player.coin.superUpgrades.length,
        utils: () => player.uadders + player.ureducers + player.umultipliers + player.upowers
    },
    set_intervals: { auto_save: '', update_game: '' },
    
    // Спрессованная автоматизация (унифицированная структура)
    automation: {
        single: { divider: 1.6666667, cost: (x = player.automation.upgrades.single) => Math.pow(2, x), time(x = player.automation.upgrades.single) { return Math.max(2000 / Math.pow(this.divider, x), 50); }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } },
        buyable: { divider: 1.6666667, cost: (x = player.automation.upgrades.buyable) => Math.pow(2, x), time(x = player.automation.upgrades.buyable) { return Math.max(1000 / Math.pow(this.divider, x), 50); }, bulk(x = player.automation.upgrades.buyable) { return this.time() === 50 ? Math.min(Math.pow(2, x - 6), 512) : 1; }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } },
        umultiplier: { divider: 1.6666667, cost: (x = player.automation.upgrades.umultiplier) => Math.pow(2, x), time(x = player.automation.upgrades.umultiplier) { return Math.max(15000 / Math.pow(this.divider, x), 50); }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } },
        upower: { divider: 1.6666667, cost: (x = player.automation.upgrades.upower) => Math.pow(2, x), time(x = player.automation.upgrades.upower) { return Math.max(30000 / Math.pow(this.divider, x), 50); }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } },
        prestige: { divider: 1.6666667, cost: (x = player.automation.upgrades.prestige) => Math.pow(2, x), time(x = player.automation.upgrades.prestige) { return Math.max(60000 / Math.pow(this.divider, x), 50); }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } },
        uadder: { divider: 1.5, cost: (x = player.automation.upgrades.uadder) => 1e15 * Math.pow(100, x), time(x = player.automation.upgrades.uadder) { return Math.max(30000 / Math.pow(this.divider, x), 50); }, charged: false, interval: '', activateTime() { return Date.now() + this.time(); } }
    },
    
    offline(x = player.time.savedTime, y = Date.now()) {
        if (!player.settings.offline) return 0;
        let max = ACHS.has(22) ? 28800 : 21600
        let time = Math.max(Math.min((y - x) / 1000, max), 0);
        return UPGS.supercrystal[31].unl() ? time * 2 : time;
    },
    free_upgrade: {
        1() { 
            let effect = player.challenge.completed.includes(4) ? CHALL[4].effect() : 0;
            if (player.coin.superUpgrades.includes(11)) effect += UPGS.coin.buyables[1].effect_super();
            if (player.minerals[2]) effect += UPGS.minerals[2].effect3();
            if (GAIN.uadder.effect()) effect += GAIN.uadder.effect();
            return player.prestige.challenge.activated == 8 ? 0 : player.minerals[4] ? effect * UPGS.minerals[4].effect2() : effect;
        },
        2() {
            let effect = PRES_CHALLENGE[4].completed() ? PRES_CHALLENGE[4].effect() : 0;
            return player.prestige.challenge.activated == 8 ? 0 : player.minerals[4] ? effect * UPGS.minerals[4].effect2() : effect;
        },
        4() { 
            let effect = player.coin.superUpgrades.includes(25) ? UPGS.coin.singles[15].effect_super() : 0;
            effect = player.minerals[4] ? effect * UPGS.minerals[4].effect2() : effect;
            return player.prestige.challenge.activated == 8 ? 0 : effect + player.shop.items.used[6] * 20;
        },
        umultiplier: () => {
            let effect = player.uadders ? GAIN.uadder.effect() : 0
            return player.prestige.challenge.activated == 8 ? 0 : effect + player.shop.items.used[1]
        },
        upower: () => {
            let effect = (player.uadders && player.prestige.break.singles.includes(15)) ? GAIN.uadder.effect2() : 0
            return player.prestige.challenge.activated == 8 ? 0 : effect + player.shop.items.used[2]
        },
    },
    auto_save_timer: 0,
    
    // ЕДИНЫЙ цикл подсчета средних значений (прощайте 6 дубликатов!)
    average: {
        _getStat(valFunc) {
            let sum = 0;
            let resets = player.prestige.table_resets || 1; // Защита от деления на ноль
            for (let i = 0; i < resets; i++) sum += valFunc(player.prestige.prestigeTable[i]);
            return sum / resets;
        },
        prestiges() { return this._getStat(t => t.prestiges); },
        crystals() { return this._getStat(t => t.crystals); },
        game_time() { return this._getStat(t => t.time.game.timer); },
        real_time() { return this._getStat(t => t.time.real.timer); },
        prestiges_per_min() { return this._getStat(t => (t.prestiges * 60) / Math.max(t.time.real.timer, 0.1)); },
        crystals_per_min() { return this._getStat(t => (t.crystals * 60) / Math.max(t.time.real.timer, 0.1)); }
    },
    
    fortune: {
        convert(x) {
            if (x === 'coin' && player.coin.currency >= this.cost.coin()) {
                player.coin.currency -= this.cost.coin();
                player.fortune.converted.coins++;
            } else if (x === 'crystal' && player.prestige.currency >= this.cost.crystal()) {
                player.prestige.currency -= this.cost.crystal();
                player.fortune.converted.crystals++;
            } else {
                return 0;
            }
            player.fortune.tokens++;
            player.fortune.total_tokens++;
        },
        cost: {
            coin: (x = player.fortune.converted.coins) => 1e100 * Math.pow(1e20, x), 
            crystal: (x = player.fortune.converted.crystals) => 1e50 * Math.pow(1e10, x), 
        },
        fortuneBoost12() {
            let mult = UPGS.fortune.boosts[12].effect();
            
            for (let i = 1; i <= 9; i++) {
                if (player.fortune.activatedBoosts[i].activated) {
                    // Отделяем бонус от базы (вычитаем 1), умножаем его на mult и возвращаем базу обратно
                    player.fortune.activatedBoosts[i].effect = (player.fortune.activatedBoosts[i].effect - 1) * mult + 1;
                }
            }
            
            // 11-й буст тоже умножается по правильной формуле
            if (player.fortune.activatedBoosts[11].activated) {
                player.fortune.activatedBoosts[11].effect = (player.fortune.activatedBoosts[11].effect - 1) * mult + 1;
            }
        }
    },
    
    balance: {
        exchange(x) {
            if (player.fortune.tokens <= 0) return 0;
            if (x === 'plus' && player.balance.coins.plus < 10) { player.balance.total_coins.plus++; player.balance.coins.plus++; player.fortune.tokens--;}
            if (x === 'minus' && player.balance.coins.minus < 10) { player.balance.total_coins.minus++; player.balance.coins.minus++; player.fortune.tokens--;}
        },
        respec() {
            player.fortune.tokens += player.balance.total_coins.minus + player.balance.total_coins.plus;
            player.balance.coins.minus = 0; player.balance.total_coins.minus = 0;
            player.balance.coins.plus = 0; player.balance.total_coins.plus = 0;
            LAYERS.doForcedReset();
        },
        maxLineHeight: 168,
        ratio(a = player.balance.coins.plus, b = player.balance.coins.minus) {
            const leftPercent = getLeftValue(a, b);
            const rightPercent = getRightValue(a, b);
            document.getElementById('plusCoinBlockLine').style.height = `${(leftPercent / 100) * this.maxLineHeight}px`;
            document.getElementById('minusCoinBlockLine').style.height = `${(rightPercent / 100) * this.maxLineHeight}px`;
            return { leftPercent, rightPercent };
        },
        scales_of_balance: (a = player.balance.coins.plus, b = player.balance.coins.minus) => Math.min(a, b),
        
        plusCoins: {
            buff(a = player.balance.coins.plus) {
                let coinBuff = a ? Math.pow(1000, a) * UPGS.balance.buyables[1].effect() : 1;
                let coinGainSoftcapPusher = player.balance.upgrades.singles.includes(11) && a ? Math.pow(80, a) * UPGS.balance.buyables[1].effect() : 0;
                let upgradePriceDivisor = player.balance.upgrades.singles.includes(21) && a ? Math.pow(10, a) * UPGS.balance.buyables[1].effect() : 1;
                let chanceBuffer = player.balance.upgrades.singles.includes(31) && a ? a / 200 * UPGS.balance.buyables[1].effect() : 0;
                
                if (player.prestige.challenge.activated === 8) {
                    coinBuff = 1; coinGainSoftcapPusher = 0; 
                    upgradePriceDivisor = 1; chanceBuffer = 0;
                }
                return { coinBuff, coinGainSoftcapPusher, upgradePriceDivisor, chanceBuffer: chanceBuffer + 1 };
            },
            nerf(a = player.balance.coins.plus) {
                let crystalGainNerf = a ? Math.pow(20, a) / UPGS.balance.buyables[2].effect() : 1;
                let crystalSoftcapHarsher = player.balance.upgrades.singles.includes(11) ? subtractPercentage(a / 350, UPGS.balance.buyables[2].effect()) : 0;
                let utilsCostIncreaser = player.balance.upgrades.singles.includes(21) ? subtractPercentage(a / 30, UPGS.balance.buyables[2].effect()) : 1;
                
                if (player.prestige.challenge.activated === 8) {
                    crystalGainNerf = 1; crystalSoftcapHarsher = 0; 
                    utilsCostIncreaser = 0;
                }
                return { crystalGainNerf, crystalSoftcapHarsher, utilsCostIncreaser: utilsCostIncreaser + 1 };
            }
        },
        minusCoins: {
            buff(b = player.balance.coins.minus) {
                let crystalGainBuff = b ? Math.pow(20, b) * UPGS.balance.buyables[1].effect() : 1;
                let crystalSoftcapSofter = player.balance.upgrades.singles.includes(12) && b ? b / 350 * UPGS.balance.buyables[1].effect() : 0;
                let utilsCostReducer = player.balance.upgrades.singles.includes(22) && b ? b / 30 * UPGS.balance.buyables[1].effect() : 0;
                let crystalSoftcapPusher = player.balance.upgrades.singles.includes(32) && b ? 33 * Math.pow(3, b) * UPGS.balance.buyables[1].effect() : 1;
                
                if (player.prestige.challenge.activated === 8) {
                    crystalGainBuff = 1; crystalSoftcapSofter = 0; 
                    utilsCostReducer = 0; crystalSoftcapPusher = 0;
                }
                return { crystalGainBuff, crystalSoftcapSofter, utilsCostReducer: utilsCostReducer + 1, crystalSoftcapPusher };
            },
            nerf(b = player.balance.coins.minus) {
                let coinNerf = b ? Math.pow(1000, b) / UPGS.balance.buyables[2].effect() : 1;
                let coinGainSoftcapPuller = player.balance.upgrades.singles.includes(12) && b ? subtractPercentage(Math.pow(80, b), UPGS.balance.buyables[2].effect()) : 0;
                let upgradePriceMultiplier = player.balance.upgrades.singles.includes(22) && b ? subtractPercentage(Math.pow(10, b), UPGS.balance.buyables[2].effect()) : 1;
                
                if (player.prestige.challenge.activated === 8) {
                    coinNerf = 1; coinGainSoftcapPuller = 0; 
                    upgradePriceMultiplier = 1;
                }
                return { coinNerf, coinGainSoftcapPuller, upgradePriceMultiplier };
            }
        }
    }
};

// --- СИСТЕМА ПРОГРЕССА (PROGRESS) ---

const PROGRESS = {
    unl(x) { 
        // Если есть кастомная функция current(), используем её, иначе берём стандартный путь
        let current = this[x].current ? this[x].current() : player[this[x].layer][this[x].type];
        return current >= this[x].req(); 
    },
    add(x) { if (!player.progressBarGoals.includes(x) && this.unl(x)) player.progressBarGoals.push(x); },
    
    // Оставляем пустыми, они заполнятся из languages.js
    name: ['', '', '', '', '', '', '', '', '', '',''],
    currency: ['', '', '', '', '', '', '', '', '', '',''],
    
    check_progress() {
        for (let i = 1; i <= this.name.length; i++) this.add(i); 
    },
    
    update(x = (Math.max(...player.progressBarGoals)) + 1) {
        this.check_progress();
        // Защита от выхода за пределы
        if (x > this.name.length) return; 
        
        let current = this[x].current ? this[x].current() : player[this[x].layer][this[x].type];
        let required = this[x].req();
        
        let width = 0;
        let ratio = 0;
        
        // Линейный режим для маленьких цифр (как 4 испытания) и логарифмический для огромных
        if (this[x].linear) {
            width = (current / required) * 100;
            ratio = width;
        } else {
            if (current > 0) { // Защита от Math.log(0) = -Infinity
                width = (Math.log(current) / Math.log(required)) * 100;
                ratio = findRatio(current, required);
            }
        }
        
        // Жестко ограничиваем от 0 до 100%
        width = Math.min(Math.max(width, 0), 100);
        ratio = Math.min(Math.max(ratio, 0), 100);
        
        progressbar.style.width = width + "%";
        percent.innerHTML = `${this.name[x-1]}: ${formatNumber(current)}/${formatNumber(required)} ${this.currency[x-1]} (${ratio.toFixed(2)}%)`;
    },
    
    1: { layer: "coin", type: "currency", req: () => 1e15 }, // prestige
    2: { layer: "coin", type: "currency", req: () => 1e25 }, // challenges
    3: { layer: "coin", type: "currency", req: () => 1e35 }, // supercrystals
    4: { layer: "prestige", type: "resets", req: () => 1e6 }, // minerals
    5: { layer: "prestige", type: "currency", req: () => 1e15 }, // superprestige
    6: { layer: "supercrystal", type: "total_currency", req: () => 25 }, // fortune
    7: { layer: "supercrystal", type: "total_currency", req: () => 40 }, // balance
    8: { layer: "prestige", type: "currency", req: () => 1e100 }, // ???
    // Вот наш новый 9-й пункт с кастомной функцией:
    9: { current: () => player.prestige.challenge.completed.length, req: () => 4, linear: true },
    10: { layer: "coin", type: "currency", req: () => 1.79e308 }, // Infinity
    11: { layer: "reflash", type: "resets", req: () => 1 }
};
let new_date = 0, time = 0

function loop() {
    new_date = Date.now();
    player.time.currentTime = new_date;
    time = Math.max((new_date - player.time.savedTime) / 1000, 0);


    if (player.settings.auto_save) {
        MISC.auto_save_timer += time;
        if (MISC.auto_save_timer >= player.settings.autosave_interval / 1000) autoSaveThis();
    } else {
        MISC.auto_save_timer = 0;
    }
    if (isNaN(player.coin.currency)) player.coin.currency = 1.79e308
    else player.coin.currency += (player.challenge.activated !== 0 && player.coin.currency >= 1e15) ? 0 : GAIN.coin.second.effect() * time;
    if (isNaN(player.coin.total_currency)) player.coin.total_currency = 1.79e308
    else player.coin.total_currency += GAIN.coin.second.effect() * time;
    // Хардкап: не пускаем монеты за предел
    if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
    if (player.shard.currency > 1.79e308) player.shard.currency = 1.79e308;
    if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
    
    player.shard.currency += GAIN.shard.second() * time;
    player.balance.neutral += GAIN.balance.generation() * time;
    player.balance.scales_of_balance += GAIN.balance.scales_of_balance() * time;

    player.supercoin.currency += GAIN.supercoin.gain_per_second() * time;
    player.supercoin.total_currency += GAIN.supercoin.gain_per_second() * time;

    player.time.game.total.timer += time;
    player.time.game.prestige.timer += time;
    convert_time('game', 'total');
    convert_time('game', 'prestige');
    
    player.time.real.total.timer += time;
    player.time.real.prestige.timer += time;
    convert_time('real', 'total');
    convert_time('real', 'prestige');
    
    player.time.umultiplier += time;
    player.time.upower += time;
    player.time.uadder += time;
    player.time.ureducer += time;
    
    player.time.real.daily.timer = Math.max((player.time.next_daily - player.time.currentTime) / 1000, 0);
    convert_time('real', 'daily');

    for (let i = 1; i <= 12; i++) {
        if (player.fortune.activatedBoosts[i].time > 0) player.fortune.activatedBoosts[i].time -= time;
        else if (player.fortune.activatedBoosts[i].time < 0) player.fortune.activatedBoosts[i].time = 0;
    }

    update_overdrive();
    PROGRESS.update();
    ACHS.checkAchievements();
    ACHS.checkRows();

    LAYERS.umultiplier.disable();
    LAYERS.upower.disable();
    LAYERS.uadder.disable();
    LAYERS.ureducer.disable();

    MILESTONES.checkMilestones();

    UPGS.coin.buyables.checkDisable();
    UPGS.coin.singles.checkDisable();
    UPGS.prestige.buyables.checkDisable();
    UPGS.prestige.singles.checkDisable();
    UPGS.prestige.break.buyables.checkDisable();
    UPGS.prestige.break.singles.checkDisable();
    UPGS.shard.buyables.checkDisable();
    UPGS.shard.singles.checkDisable();
    UPGS.shop.buyables.checkDisable();
    UPGS.shop.permanent.checkDisable();
    UPGS.shop.unlockables.checkDisable();
    UPGS.shop.items.checkDisable();
    UPGS.supercrystal.checkDisable();
    UPGS.minerals.checkDisable();
    UPGS.fortune.upgrades.buyables.checkDisable();
    UPGS.fortune.upgrades.singles.checkDisable();
    UPGS.fortune.boosts.checkDisable();
    UPGS.balance.buyables.checkDisable();
    UPGS.balance.singles.checkDisable();

    UPGS.coin.buyables.checkPurchased();
    UPGS.coin.singles.checkPurchased();
    UPGS.prestige.singles.checkPurchased();
    UPGS.shard.singles.checkPurchased();
    UPGS.supercrystal.checkPurchased();
    UPGS.prestige.break.singles.checkPurchased();
    UPGS.fortune.upgrades.singles.checkPurchased();
    UPGS.balance.singles.checkPurchased();

    MISC.balance.ratio();
    UNL.shard_achievements.check();
    LORE.checkLore();
    resetDailyReward();
    checkCompletedChallenges();
    checkSuperUpgradesForTooltips();

    statsPerClickUpdate();
    statsPerSecondUpdate();
    statsGainUpdate();
    statsSuperCoinChanceUpdate();
    statsCrystalsUpdate();
    statsPrestigeUpdate();
    statsShardsPerClickUpdate();
    statsShardsPerSecondUpdate();
    statsShardsEffectUpdate();
    statsCritChanceUpdate();
    statsCritMultiUpdate();
    statsClickSimulationUpdate();

    player.time.game.average.timer = MISC.average.game_time();
    convert_time('game', 'average');
    player.time.real.average.timer = MISC.average.real_time();
    convert_time('real', 'average');

    player.time.savedTime = Date.now();
    UNL.display.check();
}

mySlider.oninput = function() { player.settings.autosave_interval = this.value; };

function convert_time(type, layer) {
    let t = player.time[type][layer].timer;
    player.time[type][layer].seconds = t % 60;
    player.time[type][layer].minutes = (t / 60) % 60;
    player.time[type][layer].hours = (t / 3600) % 24;
    player.time[type][layer].days = t / 86400;
}

// --- ВИЗУАЛ: ПОЛОСКИ ПРОГРЕССА И ОВЕРДРАЙВ ---

function update_overdrive() {
    const overdriveTypeEl = document.querySelector('.overdriveType');
    const overdriveWidth = overdriveTypeEl ? overdriveTypeEl.getBoundingClientRect().width : 800;
    const widthMultiplier = overdriveWidth / 100;
    
    let w1 = (UNL.overdrive.type1.percent() * widthMultiplier) + "px";
    overdriveType1ProgressBarActive.style.width = w1;
    overdriveType1ProgressBar.style.width = w1;
    
    let w2 = (UNL.overdrive.type2.percent() * widthMultiplier) + "px";
    overdriveType2ProgressBarActive.style.width = w2;
    overdriveType2ProgressBar.style.width = w2;

    shardUnlock1.style.width = UNL.shard.second.percent() + "%";
    shardUnlock2.style.width = UNL.shard.click.percent() + "%";
    shardUnlock3.style.width = UNL.shard.buyables.percent() + "%";
    shardUnlock4.style.width = UNL.shard.singles.percent() + "%";

    superCrystalBar.style.clipPath = `inset(${100 - UNL.supercrystal.pour() / 1.05}% 0 0 0)`;
}

function setupOverdriveButton(baseId, typeObj, activeBarId, consumeCurrency, costFunc) {
    const baseEl = document.getElementById(baseId);
    const activeBarEl = document.getElementById(activeBarId);
    if (!baseEl || !activeBarEl) return;

    baseEl.addEventListener("click", () => {
        typeObj.activate = !typeObj.activate;
        if (typeObj.activate) {
            typeObj.blink = setInterval(() => {
                activeBarEl.style.opacity = activeBarEl.style.opacity == 1 ? 0 : 1;
            }, 500);
            typeObj.interval = setInterval(() => {
                if (player[consumeCurrency].currency >= typeObj.cost() && typeObj.percent() !== 100) {
                    let sub = player[consumeCurrency].currency / 100;
                    player.overdrive.consumed[consumeCurrency === 'coin' ? 'type1' : 'type2'] += sub;
                    player[consumeCurrency].currency -= sub;
                }
            }, 50);
        } else {
            clearInterval(typeObj.interval);
            clearInterval(typeObj.blink);
            activeBarEl.style.opacity = 0;
        }
    });
}
setupOverdriveButton('overdriveType1ProgressBarBase', UNL.overdrive.type1, 'overdriveType1ProgressBarActive', 'coin');
setupOverdriveButton('overdriveType2ProgressBarBase', UNL.overdrive.type2, 'overdriveType2ProgressBarActive', 'prestige');

function fillTheProgressBar(type, number) {
    let sub = UNL.shard[type].cost / 500;
    UNL.shard[type].interval = setInterval(() => {
        if (player.shard.currency >= sub) {
            let amount = sub * (1 + UNL.shard[type].percent() / 20);
            player.shard.currency -= amount;
            player.shard.consumed[type] += amount;
            if (UNL.shard[type].percent() === 100) {
                player.shard.currency += player.shard.consumed[type] - UNL.shard[type].cost;
                if (!player.shard.unlockables.includes(number)) player.shard.unlockables.push(number);
            }
        }
    }, 50);
}

function fillTheProgressBar2() {
    let sub = Math.min(player.supercrystal.consumedShards * Math.pow(1.337, player.supercrystal.total_currency), player.supercrystal.consumedShards, (UNL.supercrystal.cost() - player.supercrystal.consumedShards));
    UNL.supercrystal.interval = setInterval(() => {
        if (player.shard.currency >= sub) {
            sub = Math.min(100 + player.supercrystal.consumedShards * Math.pow(1.337, player.supercrystal.total_currency), player.shard.currency, (UNL.supercrystal.cost() - player.supercrystal.consumedShards));
            player.shard.currency -= sub;
            player.supercrystal.consumedShards += sub;
            if (UNL.supercrystal.pour() >= 100) {
                player.shard.currency += player.supercrystal.consumedShards - UNL.supercrystal.cost();
                player.supercrystal.consumedShards = 0;
                player.supercrystal.currency++;
                player.supercrystal.total_currency++;
                sub = 1 + player.supercrystal.consumedShards;
                superCrystalPour.innerHTML = UNL.supercrystal.pour() + '%';
            }
        }
    }, 50);
}

// Универсальный биндинг кнопок удержания (прощайте 30 строк копипасты!)
function bindHoldButton(elId, startFn, stopFn) {
    const el = document.getElementById(elId);
    if (!el) return;
    ['mousedown', 'touchstart'].forEach(evt => el.addEventListener(evt, startFn, {passive: true}));
    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => el.addEventListener(evt, stopFn, {passive: true}));
}

bindHoldButton('shardUnlockableBase1', () => fillTheProgressBar('second', 1), () => clearInterval(UNL.shard.second.interval));
bindHoldButton('shardUnlockableBase2', () => fillTheProgressBar('click', 2), () => clearInterval(UNL.shard.click.interval));
bindHoldButton('shardUnlockableBase3', () => fillTheProgressBar('buyables', 3), () => clearInterval(UNL.shard.buyables.interval));
bindHoldButton('shardUnlockableBase4', () => fillTheProgressBar('singles', 4), () => clearInterval(UNL.shard.singles.interval));
bindHoldButton('superCrystalBarBase', () => fillTheProgressBar2(), () => clearInterval(UNL.supercrystal.interval));


function softCap(resource, conditionCount, softCapPower) {
    return resource >= conditionCount ? conditionCount * Math.pow(resource / conditionCount, softCapPower) : resource;
}
function softCapDecimal(resource, conditionCount, softCapPower) {
    if (resource.gte(conditionCount)) {
        return new Decimal(conditionCount).mul(resource.div(conditionCount).pow(softCapPower));
    }
    return resource;
}
function limits(variable, min, max) { return variable >= min && variable <= max; }

setInterval(() => { GAIN.clicksPerSecond = 0; }, 1000);

// --- ГЕНЕРАТОР ВСПЛЫВАЮЩИХ ТЕКСТОВ ---
function spawnFloatingText(e, text, isCrit, cssClass) {
    if (player.settings.font === 'option11') { return 0 }
    // Берем событие из переданного параметра ИЛИ из глобального окна (как было в старом коде)
    const evt = e || window.event;
    
    // Защита от крашей: если кликаем мышкой - берем координаты курсора. 
    // Если зажали Enter (координат нет) - спавним по центру экрана
    const x = (evt && evt.clientX !== undefined) ? evt.clientX : window.innerWidth / 2;
    const y = (evt && evt.clientY !== undefined) ? evt.clientY : window.innerHeight / 2;

    const el = document.createElement('div');
    el.style.left = (x - 50 - randomNumber(-30, 30)) + "px";
    el.style.top = (y - 20 - randomNumber(-30, 30)) + "px";
    el.classList.add(isCrit ? 'criticalClick' : cssClass);
    el.innerHTML = text;
    document.body.appendChild(el);
    setTimeout(() => {
        el.classList.add('show');
        setTimeout(() => {
            el.classList.replace('show', 'hide');
            setTimeout(() => el.remove(), 300);
        }, 0);
    }, 0);
}

// --- КЛИКИ И ДОБЫЧА ---
function getCoin(e) {
    if (GAIN.clicksPerSecond >= 10) return;
    
    player.clicks.real++; player.clicks.prestige++; GAIN.clicksPerSecond++;
    
    if (!coinGain.dataset.enterHandler) {
        coinGain.dataset.enterHandler = '1';
        coinGain.addEventListener("keydown", (evt) => { if (evt.key === "Enter") evt.preventDefault(); });
    }
    
    for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
        player.clicks.simulated++;
        let gain = GAIN.coin.click.effect();
        let getCrit = false, getSuper = false;
        
        if (GAIN.critical.get()) {
            gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++;
            player.supercoin.currency += UPGS.shop.permanent[5].effect();
            player.supercoin.total_currency += UPGS.shop.permanent[5].effect();
        }
        if (GAIN.supercoin.get()) getSuper = true;
        if (getCrit && getSuper && !ACHS.has(37)) ACHS.unl(37);
        
        player.coin.currency += gain * 1;
        player.coin.total_currency += gain * 1;
        if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
        if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
        
        // Спавним текст
        spawnFloatingText(e, "+" + formatNumber(gain), getCrit, 'myMessage');

        if (getSuper) {
            let scGain = GAIN.supercoin.gain();
            player.supercoin.currency += scGain;
            player.supercoin.total_currency += scGain;
            spawnFloatingText(e, "+" + scGain, false, 'superCoinText');
        }
    }
}

function getShardPerClick(e) {
    if (GAIN.clicksPerSecond >= 10 || UNL.shard.click.percent() !== 100) return;
    
    player.clicks.real++; GAIN.clicksPerSecond++;
    
    if (!shardsClick.dataset.enterHandler) {
        shardsClick.dataset.enterHandler = '1';
        shardsClick.addEventListener("keydown", (evt) => { if (evt.key === "Enter") evt.preventDefault(); });
    }
    
    for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
        player.clicks.simulated++;
        let gain = GAIN.shard.click();
        let getCrit = false;
        
        if (GAIN.critical.get() && UPGS.supercrystal[32].unl()) {
            gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++;
        }

        if (player.shard.currency > 1.79e308) player.shard.currency = 1.79e308;
        
        player.shard.currency += gain;
        spawnFloatingText(e, "+" + formatNumber(gain), getCrit, 'shardCountPerClick');
    }
}

// --- УПРАВЛЕНИЕ UI (ВКЛАДКИ И ОКНА) ---

function selectTab(argument, isFlex) {
    ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab', 'challengeTab'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    argument.style.display = isFlex ? "flex" : "block";
    document.getElementsByClassName('mainSettings')[0].style.display = (argument === mainTab) ? "flex" : "none";
}

function selectSubTab(argument, isFlex, mainTabType) {
    const tabsMap = {
        settings: ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab'],
        clicker: ['coinsTab', 'overdriveTab'],
        info: ['aboutGameTab', 'statisticsTab', 'multipliersTab', 'challengesTimeTab', 'recentPrestigesTab', 'softcapsTab'],
        prestige: ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab', 'superCrystalsTab', 'mineralsTab', 'breakPrestigeTab', 'fortuneTab', 'balanceTab'],
        achievements: ['achScreenDescription', 'shardAchsTab'],
        challenge: ['challengeCoinTab', 'challengePrestigeTab']
    };
    (tabsMap[mainTabType] || []).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    argument.style.display = isFlex ? "flex" : "block";
    
    document.getElementsByClassName('mainSettings')[2].style.display = (argument === shardsTab) ? "flex" : "none";
    document.getElementsByClassName('mainSettings')[1].style.display = (argument === breakPrestigeTab) ? "flex" : "none";
}

function showStats(multId) {
    const panels = ['gainPerClick', 'gainPerSecond', 'wholeGain', 'superCoinsChance', 'crystalsMultiplier', 'shardsPerClick', 'shardsPerSecond', 'shardsEffect', 'critChance', 'critMulti', 'clickSimulation', 'prestigeMultiplier'];
    panels.forEach((p, idx) => {
        const statEl = document.getElementById(p + 'Stats');
        const graphEl = document.getElementById(p + 'Graphic');
        if (statEl) statEl.style.display = (idx === multId) ? 'block' : 'none';
        if (graphEl) graphEl.style.display = (idx === multId) ? 'block' : 'none';
    });
    if (multBreakdownTitle && text.multiBreakdown[multId]) multBreakdownTitle.innerHTML = text.multiBreakdown[multId];
}

function notify(notiString, notiColor, notiWidth = '350px') {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = notiString;
    notification.style.backgroundColor = notiColor;
    notification.style.width = notiWidth;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 1800);
        }, 1700);
    }, 100);
}

function changelog() { changelogWindow.style.display = "block"; myPopupBackdrop1.style.display = "flex"; }
function gameLoreOpen() { gameLoreWindow.style.display = "block"; myPopupBackdrop1.style.display = "flex"; toggleBadges(['badge-settings-2', 'badge-misc-2', 'badge-lore'], false)}
function howToPlayOpen() { gameHelpWindow.style.display = "flex"; myPopupBackdrop1.style.display = "flex"; toggleBadges(['badge-settings-1', 'badge-misc-1', 'badge-h2p'], false)}

function openWindow(arg, isFlex) {
    ['confirmationButtons', 'whichCode', 'dailyDesc', 'breakCrystal', 'brokeCrystals', 'falseBrokeCrystals', 'welcomeToDigitalGod', 'chooseSaveDiv'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    windowGame.style.display = isFlex ? "flex" : "block";
    windowTitleDiv.style.display = 'none'; windowTitle2.innerHTML = '';
    
    if (arg === 'hardReset' || arg === 'gotNaNed') {
        confirmationButtons.style.display = "flex"; windowTitleDiv.style.display = 'block';
        yesHR.style.display = "none"; yesRP.style.display = "none";
        if (arg === 'hardReset') { windowTitle2.innerHTML = text.window.hard; windowTitle2.style.fontSize = 'calc(24px * var(--font-scale))'; yesHR.style.display = "block"; }
        else { windowTitle2.innerHTML = text.window.NaN; windowTitle2.style.fontSize = 'calc(14px * var(--font-scale))'; yesRP.style.display = "block"; }
    } else {
        const map = { 'code': whichCode, 'daily': dailyDesc, 'break': breakCrystal, 'submit': brokeCrystals, 'falseSubmit': falseBrokeCrystals, 'welcome': welcomeToDigitalGod, 'chooseSave': chooseSaveDiv };
        if (map[arg]) map[arg].style.display = arg === 'break' ? 'flex' : 'block';
    }
    switch (arg) {
        case 'chooseSave':
            windowGame.style.height = '400px'
            changeSaveSlotsText()
            break;
        case 'hardReset':
            windowGame.style.height = '200px'
            break;
        case 'break':
        case 'brokeCrystals':    
        case 'falseBrokeCrystals':
        windowGame.style.height = '250px'
            break;
        default:
            break;
    }
    myPopupBackdrop1.style.display = "flex";
}

function hidePopup() {
    [changelogWindow, gameLoreWindow, gameHelpWindow, windowGame, myPopupBackdrop1, myPopupBackdrop2, offlineGainWindow].forEach(el => {
        if (el) el.style.display = "none";
    });
    showChangelog(text.changelog.start); showStory(text.chapter.start); showHelpPage(text.help.start, text.empty);
}
myPopupBackdrop1.addEventListener("click", hidePopup);

// --- ЗВУК И ШРИФТЫ ---

function playSong1() {
    THEMEOFTHEGREAT.play();
    THEMEOFTHEGREAT.addEventListener("ended", playSong1, {once: true});
}

const FONTS = {
    option1: { name: 'Poly', scale: 1 }, option2: { name: 'serif', scale: 1 }, option3: { name: 'Impact', scale: 0.95 },
    option4: { name: 'Courier', scale: 0.9 }, option5: { name: 'Verdana', scale: 0.85 }, option6: { name: 'system-ui', scale: 0.9 },
    option7: { name: 'PAPYRUS THE GREAT', scale: 0.85 }, option8: { name: 'Comic Sans', scale: 0.85 }, option9: { name: 'monotyper', scale: 0.9 },
    option10: { name: 'swkeys', scale: 0.8 }, option11: { name: 'serif', scale: 1 }, option12: { name: 'minecraft', scale: 0.92 },
    option13: { name: 'SaiyanSans', scale: 1.1 }
};

function applyFont(val, isInit = false) {
    const config = FONTS[val] || FONTS.option1;
    document.documentElement.style.setProperty('--font-scale', config.scale);
    
    if (val === 'option7') {
        if (!player.settings.mutedAudio) isInit ? setTimeout(playSong1, 3000) : playSong1();
        else { THEMEOFTHEGREAT.currentTime = 0; THEMEOFTHEGREAT.pause(); }
    } else {
        THEMEOFTHEGREAT.currentTime = 0; THEMEOFTHEGREAT.pause();
    }

    if (val === 'option11') {
        document.body.classList.add('text-hidden-mode');
    }
    else document.body.classList.remove('text-hidden-mode');
    
    document.body.style.fontFamily = config.name;
    document.querySelectorAll("select, label, button, div").forEach(el => el.style.fontFamily = config.name);
    player.settings.font = val;
}
function changeFonts(option) { applyFont(option.value, false); }
function changeFonts2(optionVal) { applyFont(optionVal, true); }
function changeNotations(option) { player.settings.notation = option.value; }

function muteTheAudio() {
    player.settings.mutedAudio = !player.settings.mutedAudio;
    player.settings.isMuted = player.settings.mutedAudio ? 'yes' : 'no';
    if (player.settings.font === 'option7' && !player.settings.mutedAudio) setTimeout(playSong1, 1000);
    else { THEMEOFTHEGREAT.currentTime = 0; THEMEOFTHEGREAT.pause(); }
}

// --- СОЦИАЛЬНЫЕ СЕТИ И ССЫЛКИ ---

function nextShopPage(direction) {
    const isRight = direction === 'right';
    firstShopRow.style.display = isRight ? 'none' : 'flex';
    secondShopRow.style.display = isRight ? 'none' : 'flex';
    rightShopArrowDiv.style.display = isRight ? 'none' : 'flex';
    firstItemRow.style.display = isRight ? 'flex' : 'none';
    secondItemRow.style.display = isRight ? 'flex' : 'none';
    leftShopArrowDiv.style.display = isRight ? 'flex' : 'none';
    shoppingDiv.style.borderRadius = isRight ? '0px 0px 5px 0px' : '0px 0px 0px 5px';
}

[
    { btn: galaxyClickButton, url: 'https://galaxy.click/play/131' },
    { btn: gmailButton, url: 'mailto:madkotodax@gmail.com' },
    { btn: discordButton, url: 'https://discord.gg/WdbaQC4nuM' }
].forEach(social => {
    if (social.btn) social.btn.addEventListener('click', () => window.open(social.url, '_blank'));
});

// --- СКРОЛЛ ДЛЯ МОБИЛОК И ТУЛТИПЫ ---

const versionDiv = document.getElementById('versionDiv');
if (versionDiv) {
    let startY, startScrollTop;
    versionDiv.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; startScrollTop = versionDiv.scrollTop; }, {passive: true});
    versionDiv.addEventListener('touchmove', (e) => { versionDiv.scrollTop = startScrollTop - (e.touches[0].clientY - startY); e.preventDefault(); });
}

// Универсальный биндинг всплывающих подсказок Popper.js
const tooltipElements = document.querySelectorAll('.ach, .shopButton, .mineralButton, .coinUpgradeButton');
tooltipElements.forEach(el => {
    const tooltip = document.getElementById('tooltip-' + el.id);
    if (!tooltip) return;
    const popperInstance = Popper.createPopper(el, tooltip, { modifiers: [{ name: 'offset', options: { offset: [0, 8] } }], placement: 'top' });
    
    ['mouseenter', 'focus'].forEach(evt => el.addEventListener(evt, () => { tooltip.setAttribute('data-show', ''); popperInstance.update(); }));
    ['mouseleave', 'blur'].forEach(evt => el.addEventListener(evt, () => tooltip.removeAttribute('data-show')));
});
