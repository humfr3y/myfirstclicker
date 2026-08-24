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
                    [player.shop.upgrades[8], UPGS.shop.buyables[8].effect()],
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
                if (pcAct == 8) effect = effect.pow(0.55);
                if (cAct !== 0) effect = effect.pow(0.75);
                if (cAct === 10) effect = effect.pow(0.67);

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);

                val = val.mul(this.post_softcap_effect())
                // Оставляем объект Decimal, просто ограничиваем его через встроенный min
                
                return Decimal.min(val, new Decimal("1.79e308")); 
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4;
                if (player.reflash.algo.includes(72)) softcap_power = 0.5
                
                if (player.challenge.activated === 9 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                    softcap_start = 1e6;
                    softcap_power = Math.pow(softcap_power, 2);
                } 
                if (player.challenge.activated === 2 || player.prestige.challenge.activated === 1 || player.prestige.challenge.activated === 7) {
                    softcap_start = 10;
                } 
                if (player.challenge.completed.includes(9)) softcap_start *= CHALL[9].effect();
                softcap_start *= UPGS.minerals[2].effect2();
                if (player.balance.upgrades.singles.includes(11)) softcap_start *= MISC.balance.plusCoins.buff().coinGainSoftcapPusher;
                if (player.balance.upgrades.singles.includes(12)) softcap_start /= MISC.balance.minusCoins.nerf().coinGainSoftcapPuller;

                
                return { softcap_start, softcap_power };
            },
            post_softcap_effect() {
                let val = new Decimal("1")
                val = val.mul(UPGS.reflash.algo.tree[0].effect());
                
                val = val.mul(TREASURES.event.digitalization[1].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[1].temporary.effect());
                val = val.mul(TREASURES.event.digitalization[2].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[5].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[5].temporary.effect());

                if (player.virus.effect.time > 0 && player.virus.effect.type == 1) {
                    if (player.virus.effect.status == 'buff') {
                        val = val.mul(player.virus.effect.multiplier)
                    }
                    else val = val.div(player.virus.effect.multiplier)
                }

                if (player.challenge.activated != 0 || player.prestige.challenge.activated != 0) val *= UPGS.shop.permanent[12].effect()
                return val
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
                    [player.shop.upgrades[9], UPGS.shop.buyables[9].effect()],
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
                if (pcAct == 8) effect = effect.pow(0.55)
                if (cAct !== 0) effect = effect.pow(0.67);
                if (cAct === 10) effect = effect.pow(0.67);

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);

                val = val.mul(this.post_softcap_effect())
                // Оставляем объект Decimal, просто ограничиваем его через встроенный min

                val = val.mul(this.post_softcap_effect())
                
                return Decimal.min(val, new Decimal("1.79e308")); 
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5;
                if (player.reflash.algo.includes(72)) softcap_power = 0.6
                
                if (player.challenge.activated === 9 || player.prestige.challenge.activated === 2 || player.prestige.challenge.activated === 7) {
                    softcap_start = 1e6;
                    softcap_power = Math.pow(softcap_power, 2);
                } 
                if (player.challenge.activated === 2 || player.prestige.challenge.activated === 1 || player.prestige.challenge.activated === 7) {
                    softcap_start = 10;
                } 
                if (player.challenge.completed.includes(9)) softcap_start *= CHALL[9].effect();
                softcap_start *= UPGS.minerals[2].effect2();
                if (player.balance.upgrades.singles.includes(11)) softcap_start *= MISC.balance.plusCoins.buff().coinGainSoftcapPusher;
                if (player.balance.upgrades.singles.includes(12)) softcap_start /= MISC.balance.minusCoins.nerf().coinGainSoftcapPuller;

                
                
                return { softcap_start, softcap_power };
            },
            post_softcap_effect() {
                let val = new Decimal("1")
                val = val.mul(UPGS.reflash.algo.tree[0].effect());
                
                val = val.mul(TREASURES.event.digitalization[1].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[1].temporary.effect());
                val = val.mul(TREASURES.event.digitalization[2].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[5].permanent.effect());
                val = val.mul(TREASURES.event.digitalization[5].temporary.effect());

                if (player.virus.effect.time > 0 && player.virus.effect.type == 1) {
                    if (player.virus.effect.status == 'buff') {
                        val = val.mul(player.virus.effect.multiplier)
                    }
                    else val = val.div(player.virus.effect.multiplier)
                }

                if (player.challenge.activated != 0 || player.prestige.challenge.activated != 0) val *= UPGS.shop.permanent[12].effect()
                return val
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
                    [player.shop.upgrades[10], UPGS.shop.buyables[10].effect()],
                    [PRES_CHALLENGE[7].completed(), PRES_CHALLENGE[7].effect()]
                ];
                mults.forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                if (player.balance.coins.minus) effect = effect.div(MISC.balance.minusCoins.nerf().coinNerf);

                let upowerEff = GAIN.upower.effect();
                if (upowerEff) effect = effect.pow(upowerEff);
                if (UPGS.prestige.singles[12].unl()) effect = effect.pow(UPGS.prestige.singles[12].effect());
                if (player.shop.items.used[4]) effect = effect.pow(1.1);

                if (UPGS.reflash.singles[11].unl()) effect = effect.mul(UPGS.reflash.singles[11].effect());

                if (player.reflash.algo.includes(71)) effect = effect.mul(1e15);

                return effect;
            },
            effect() { 
                let val = applyDecimalSoftcap(this);
                return val
            },
            softcap() {
                let softcap_start = 1e20;
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
                [player.prestige.break.buyables[3], UPGS.prestige.break.buyables[3].effect()],
                [UPGS.shard.singles[23].unl(), UPGS.shard.singles[23].effect()],
                [player.reflash.algo.includes(42), UPGS.reflash.algo.tree[10].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) effect = effect * val; });
            effect *= TREASURES.event.digitalization[5].permanent.effect()
            effect *= TREASURES.event.digitalization[5].temporary.effect()
            if (player.virus.effect.time > 0 && player.virus.effect.type == 3) {
                if (player.virus.effect.status == 'buff') {
                    effect *= player.virus.effect.multiplier
                }
                else effect /= player.virus.effect.multiplier
            }
            if (player.reflash.algo.includes(91)) effect *= 1e12;
            return Math.min(effect, 1e308);
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
                [player.prestige.break.buyables[3], UPGS.prestige.break.buyables[3].effect()],
                [UPGS.shard.singles[23].unl(), UPGS.shard.singles[23].effect()],
                [player.reflash.algo.includes(42), UPGS.reflash.algo.tree[10].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) effect = effect * val; });
            effect *= TREASURES.event.digitalization[5].permanent.effect()
            effect *= TREASURES.event.digitalization[5].temporary.effect()
            if (player.virus.effect.time > 0 && player.virus.effect.type == 3) {
                if (player.virus.effect.status == 'buff') {
                    effect *= player.virus.effect.multiplier
                }
                else effect /= player.virus.effect.multiplier
            }
            if (player.reflash.algo.includes(91)) effect *= 1e12;
            return Math.min(effect, 1e308);
        },
        offline(x = GAIN.shard.second(), y = MISC.offline()) {
            return UNL.shard.second.unl() ? x * y : 0;
        },
        effect: {
            no_softcap_effect() {
                let effect = new Decimal("1").add(player.shard.currency / 100);

                if (player.shard.currency === 0) return new Decimal("1");
                
                if (ACHS.has(30)) effect = effect.mul(Math.pow(player.prestige.resets + 1, 0.3));
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
                let effect = player.prestige.challenge.activated === 8 ? new Decimal("1") : applyDecimalSoftcap(this) * ch_reward;
                return effect
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
            if (player.reflash.algo.includes(42)) gain *= UPGS.reflash.algo.tree[10].effect()
            if (UPGS.shard.singles[23].unl()) gain *= UPGS.shard.singles[23].effect()
            if (player.virus.effect.time > 0 && player.virus.effect.type == 3) {
            if (player.virus.effect.status == 'buff') {
                gain *= player.virus.effect.multiplier
            }
            else gain /= player.virus.effect.multiplier
            }
            gain *= TREASURES.event.digitalization[5].permanent.effect()
            gain *= TREASURES.event.digitalization[5].temporary.effect()
            gain *= UPGS.shop.permanent[11].effect()
            if (player.reflash.algo.includes(91)) gain *= 1e12;
            
            return { gain: Math.min(gain, 1.7e308), broken_crystals };
        }
    },
    crystal: {
        base() {
            if (!player.prestige.break.singles.includes(25)) return 1
            let coin_formula = player.reflash.algo.includes(82) ? 
            Math.pow(1.2, Math.log10((Math.max(GAIN.coin.click.effect(), GAIN.coin.second.effect()) + 10) / 10) * UPGS.reflash.algo.tree[21].effect() + UPGS.prestige.break.buyables[1].effect()) : 
            Math.pow(1.2, Math.log10((Math.max(GAIN.coin.click.effect(), GAIN.coin.second.effect()) + 10) / 1e15) + UPGS.prestige.break.buyables[1].effect())
            return coin_formula 
        },
        offline(x = GAIN.crystal.offline_calc(), y = MISC.offline()) {
            let gain = x * y;
            return gain
        },
        no_softcap_reset() {
            let gain = new Decimal("1");
            const mults = [
                [player.prestige.break.singles.includes(25), this.base()],
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
                [player.reflash.algo.includes(22), UPGS.reflash.algo.tree[2].effect()],
                [player.prestige.challenge.completed.includes(1), PRES_CHALLENGE[1].effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) gain = gain.mul(val); });

            if (player.balance.coins.plus) gain = gain.div(MISC.balance.plusCoins.nerf().crystalGainNerf)

            if (player.reflash.algo.includes(81)) gain = gain.mul(1e9)

            if (player.shop.items.used[5]) gain = gain.pow(1.05);
            
            return gain;
        },
        reset() {
            const { softcap_start, softcap_power } = this.softcap();
            let gain = new Decimal("1")
            gain = softCapDecimal(this.no_softcap_reset(), softcap_start, softcap_power);
            gain = gain.mul(this.post_softcap_effect())
            return gain;
        },
        offline_calc() {
            return player.prestige.singleUpgrades.includes(34) ? UPGS.prestige.singles[34].effect()/60 : 0
        },
        softcap() {
            let addition = player.balance.upgrades.singles.includes(12) ? MISC.balance.minusCoins.buff().crystalSoftcapSofter : 0;
            let substract = player.balance.upgrades.singles.includes(11) ? MISC.balance.plusCoins.nerf().crystalSoftcapHarsher : 0;
            let pusher = player.balance.upgrades.singles.includes(32) ? MISC.balance.minusCoins.buff().crystalSoftcapPusher : 1;
            
            const softcap_start = Math.max(1e70 * pusher, 1);
            // const softcap_start = 1e308
            let softcap_power = 1;
            let logged_gain = this.no_softcap_reset().log10() //mogged gain
            
            if (this.no_softcap_reset().gte(1e75)) {
                let calcPower = (1 - ((logged_gain - 75 - Math.log10(pusher)) / 80)) - substract + addition;
                let minPower = 0.45 - substract + addition;
                softcap_power = Math.max(calcPower, minPower);
            }
            
            return { softcap_start, softcap_power };
        },
        post_softcap_effect() {
            let val = 1
            if (UPGS.reflash.singles[12].unl()) val *= UPGS.reflash.singles[12].effect();
                val *= TREASURES.event.digitalization[4].permanent.effect();
                val *= TREASURES.event.digitalization[4].temporary.effect();
                val *= TREASURES.event.digitalization[5].permanent.effect();
                val *= TREASURES.event.digitalization[5].temporary.effect();
                if (player.virus.effect.time > 0 && player.virus.effect.type == 2) {
                    if (player.virus.effect.status == 'buff') val *= player.virus.effect.multiplier;
                    else val /= player.virus.effect.multiplier;
                }
            return val
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
                [player.shard.achievements[7], UNL.shard_achievements[7].effect()],
                [player.fortune.upgrades.singles.includes(22), 2],
                [player.reflash.algo.includes(32), UPGS.reflash.algo.tree[6].effect()],
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
                [player.fortune.upgrades.singles.includes(22), 2],
                [player.reflash.algo.includes(32), UPGS.reflash.algo.tree[6].effect()],
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });
            return Math.floor(gain);
        }
    },

    supercoin: {
        offline(x = GAIN.supercoin.gain_per_second(), y = MISC.offline()) {
            return x / 10 * y
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
                [player.shop.upgrades[11], UPGS.shop.buyables[11].effect()],
                [player.balance.upgrades.singles.includes(31), MISC.balance.plusCoins.buff().chanceBuffer],
                [ACHS.has(73), 1.1]
            ];
            mults.forEach(([cond, val]) => { if (cond) chance *= val; });
            if (player.virus.effect.time > 0 && player.virus.effect.type == 4) {
                if (player.virus.effect.status == 'buff') {
                    chance *= player.virus.effect.multiplier
                }
                else chance /= player.virus.effect.multiplier
            }
            chance *= TREASURES.event.digitalization[3].permanent.effect()
            chance *= TREASURES.event.digitalization[2].temporary.effect()
            if (ACHS.has(37)) chance += 1;
            chance += TREASURES.event.digitalization[3].temporary.effect()
            return chance;
        },
        get() {
            return randomNumber(0, (100 / this.chance()) - 1) === 0;
        },
        gain() {
            let gain = 1;
            const mults = [
                [ACHS.has(44), 2],
                [player.reflash.algo.includes(44), UPGS.reflash.algo.tree[12].effect()],
                [UPGS.shop.special[7].unl(), UNL.overdrive.type3.effect()]
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });
            return gain;
        },
        daily: {
            min() {
                let effect = 25;
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect();
                if (player.shop.permanentUpgrades[9]) effect *= UPGS.shop.permanent[9].effect();
                if (ACHS.has(52)) effect *= 2;
                return effect;
            },
            max() {
                let effect = 100;
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect();
                if (player.shop.permanentUpgrades[9]) effect *= UPGS.shop.permanent[9].effect();
                if (ACHS.has(52)) effect *= 2;
                return effect;
            },
            reward() {
                return randomNumber(this.min(), this.max());
            }
        },
        export: {
            base: 50,
            reward() {
                let effect = this.base;
                if (player.shop.permanentUpgrades[9]) effect *= UPGS.shop.permanent[9].effect();
                return effect
            }
        },
        gain_per_second() {
            if (!player.shop.special.includes(6)) return 0
            return (Math.pow(Math.log10(GAIN.coin.second.effect() * 1 + 1) / 10 * (this.chance()), 0.33)) / 10 * this.gain()
        }
    },
//(((1 + this.chance() / 70) * ())) * this.gain()
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
        player.coin.this_reflash_currency += coinGain
        
        // Лимит для оффлайна
        if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
        if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
        player.shard.currency += shardGain;
        if (player.shard.currency > 1.79e308) player.shard.currency = 1.79e308;
        player.prestige.currency += crystalGain;
        player.prestige.total_currency += crystalGain;
        player.prestige.this_reflash_currency += crystalGain;
        player.prestige.resets += prestigeGain;
        player.supercoin.currency += superCoinGain;
        player.supercoin.total_currency += superCoinGain;
        player.supercoin.this_reflash_currency += superCoinGain;
        player.balance.neutral += balanceNeutral;
        player.balance.scales_of_balance += balanceScales;
        
        // Начисляем игровое время
        player.time.game.total.timer += timeVal;
        player.time.game.prestige.timer += timeVal;
        player.time.umultiplier += timeVal;
        player.time.upower += timeVal;
        player.time.game.reflash.timer += timeVal

        // Реальное время начисляется только при обычном оффлайне (варп не старит нас в реале)
        if (!isWarp) {
            let realTimeGain = UPGS.supercrystal[31].unl() ? timeVal / 5 : timeVal;
            player.time.real.total.timer += realTimeGain;
            player.time.real.prestige.timer += realTimeGain;
            player.time.real.reflash.timer += realTimeGain;
        }
    },

    offline_gain(y = MISC.offline()) { this._applyOffline(y, false); },
    offline_gain_time_warp(x) { this._applyOffline(x, true); },

    balance: {
        generation() {
            const scalesBase = Math.pow(MISC.balance.scales_of_balance() + player.balance.scales_of_balance, 3);
            let effect = scalesBase * UPGS.balance.buyables[3].effect()
            if (player.virus.effect.time > 0 && player.virus.effect.type == 6) {
                if (player.virus.effect.status == 'buff') {
                    effect *= player.virus.effect.multiplier
                }
                else effect /= player.virus.effect.multiplier
            }
            effect *= UPGS.shop.buyables[14].effect()
            effect *= UPGS.reflash.algo.tree[7].effect()
            return effect;
        },
        offline(x = GAIN.balance.generation(), y = MISC.offline()) {
            return x * y;
        },
        scales_of_balance() {
            if (!player.balance.upgrades.singles.includes(23)) return 0;
            let gain = MISC.balance.scales_of_balance() / 15000
            if (ACHS.has(70)) gain *= 1.1
            return gain
        },
        sob_offline(x = GAIN.balance.scales_of_balance(), y = MISC.offline()) {
            return player.balance.upgrades.singles.includes(23) ? x * y : 0;
        }
    },
    reflash: {
        base () {
            let base = 1
            let formula = 1 + Math.floor(Math.log10(player.prestige.currency) / 100)
            return player.reflash.algo.includes(101) ? formula : base 
        },
        reset() {
            let gain = this.base();
            const mults = [
                [player.reflash.upgrades[1], UPGS.reflash.buyables[1].effect()],
            ];
            mults.forEach(([cond, val]) => { if (cond) gain *= val; });
            return Math.min(Math.floor(gain), UPGS.reflash.computer[4].effect());
        },
        next_bit() {
            return Math.pow(1e100, this.base())
        }
    },
    
    clicksPerSecond: 0
};

const UNL = {
    overdrive: {
        type1: {
            unl() { return true },
            max() {
                let max = 100;
                if (player.shop.special.includes(7)) max = 500;
                return max;
            },
            cost() { 
                let p = this.percent();
                let scale = this.max() == 500 && p > 100 ? p - 100 : 0;
                let base = Math.pow(10, p + scale);
                return 1000 + base / 10; 
            },
            rawPercent() { 
                return Math.log10(player.overdrive.consumed.type1 + 1); 
            },
            percent() {
                let raw = this.rawPercent();
                if (this.max() == 500 && raw > 100) {
                    return 100 + (raw - 100) / 2;
                }
                return Math.min(raw, this.max());
            },
            effect() {
                let p = this.percent();
                if (p === 0) return 1;
                let eff = 1 + (Math.pow(2, p / 2.75) / 2);
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect();
                return eff;
            },
            activate: false, blink: '', interval: ''
        },
        type2: {
            unl() { return player.shop.special.includes(1); },
            max() {
                let max = 100
                return max
            },
            cost() { return 1000 + Math.pow(10, this.percent() + 8); },
            percent() { return Math.min(Math.log10((player.overdrive.consumed.type2 / 1e8) + 1), this.max()); },
            effect() {
                if (this.percent() === 0) return 1;
                let eff = (Math.pow(1.75, this.percent() / 2));
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect();
                return eff;
            },
            activate: false, blink: '', interval: ''
        },
        type3: {
            unl() { return player.shop.special.includes(8); },
            max() {
                let max = 100
                return max
            },
            cost() { return 100 + Math.pow(10, this.percent() / 10) * 10 },
            percent() { return Math.min(Math.log10(player.overdrive.consumed.type3+1)*10, this.max()); },
            effect() {
                if (this.percent() === 0) return 1;
                let eff = 1 + Math.pow(Math.pow(1.0425, this.percent()), 2) / 50
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
            let total_currency = player.reflash.algo.includes(21) ? player.supercrystal.total_currency - 3 : player.supercrystal.total_currency;
            let cost = 1e15 * Math.pow(1000 - UPGS.shop.permanent[7].effect(), total_currency);
            if (cost == Infinity) return 1.7e308
            cost /= UPGS.minerals[3].effect3();
            if (PRES_CHALLENGE[6].completed()) cost /= PRES_CHALLENGE[6].effect();
            return Math.min(cost, 1.7e308);
        },
        interval: ''
    },
    rune: {
        cost() { return 1e8 * Math.pow(10, player.reflash.algo.includes(31) ? player.rune.total_currency - 3 : player.rune.total_currency); },
        max_cost() {
            let currency = player.prestige.currency;
            let totalCost = 0;
            let iter = 0;
            
            for (let i = 0; i < 999; i++) {
                let currentPrice = 1e8 * Math.pow(10, i + (player.reflash.algo.includes(31) ? player.rune.total_currency - 3 : player.rune.total_currency));
                
                if (currency >= currentPrice) {
                    currency -= currentPrice;
                    totalCost += currentPrice;
                    iter++; 
                } else {
                    break; 
                }
            }
            if (iter === 0) {
                totalCost = 1e8 * Math.pow(10, player.reflash.algo.includes(31) ? player.rune.total_currency - 3 : player.rune.total_currency);
            }
            
            return { cost: totalCost, iter };
        }
    },
    shard_achievements: {
        unl(x) {
            if (this[x].current() >= this[x].goal() && player.shop.special.includes(3)) {
                let max = player.reflash.algo.includes(93) ? 999 : 9
                player.shard.achievements[x] <= max ? player.shard.achievements[x]++ : null;
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
            if (!(player.shop.special.includes(3) && player.shard_achievements.includes(reqLvl))) return 1;
            const fBoost = player.fortune.activatedBoosts[9].activated ? UPGS.fortune.boosts[9].effect() : 1;
            const ach10 = UNL.shard_achievements[10].effect();
            let effect = 0
            if (player.virus.effect.time > 0 && player.virus.effect.type == 5) {
                if ((player.virus.effect.status == 'buff')) {
                    effect = val * ach10 * fBoost * player.virus.effect.multiplier
                }
                else {
                    effect = val * ach10 * fBoost / player.virus.effect.multiplier
                }
            }
            else effect = val * ach10 * fBoost
            effect *= player.reflash.algo.includes(92) ? UPGS.reflash.algo.tree[22].effect() : 1
            return isAdditive ? 1 + effect : effect
        },
        1: { id: 1, 
            current() { return player.coin.this_reflash_currency; }, 
            goal(x = player.shard.achievements[1]) { 
                let goal = new Decimal("1e50"), base = new Decimal("1e20")
                return goal.mul(base.pow(x)).pow(UPGS.reflash.algo.tree[25].effect())
            }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[1]) { 
                let e = UNL.shard_achievements._effBase(1, Math.pow(8, x), false); 
                return player.prestige.challenge.activated === 8 ? 1 : Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 ); 
            } 
        },
        2: { id: 2, 
            current() { return player.supercoin.this_reflash_currency; }, 
            goal(x = player.shard.achievements[2]) { return Math.pow(1000 * Math.pow(2, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[2]) {
                let e = UNL.shard_achievements._effBase(1, x / 50, true); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        3: { id: 3, 
            current() { return player.prestige.this_reflash_currency; }, 
            goal(x = player.shard.achievements[3]) { return Math.pow(1e10 * Math.pow(1e10, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, 
            effect(x = player.shard.achievements[3]) { 
                let e = UNL.shard_achievements._effBase(2, Math.pow(4.33, x), false);
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        4: { id: 4, 
            current() { return player.shard.currency; }, 
            goal(x = player.shard.achievements[4]) { return Math.pow(1e25 * Math.pow(1e25, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, 
            effect(x = player.shard.achievements[4]) { 
                let e = UNL.shard_achievements._effBase(2, Math.pow(10, x), false); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        5: { id: 5, 
            current() { return player.achievements.length; }, 
            goal(x = player.shard.achievements[5]) { return Math.pow(10 + (10 * x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[5]) { 
                let e = UNL.shard_achievements._effBase(3, Math.pow(1.95, x), false); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        6: { id: 6, 
            current() { return player.time.real.total.days; }, 
            goal(x = player.shard.achievements[6]) { return Math.pow(Math.pow(2, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[6]) { 
                let e = UNL.shard_achievements._effBase(3, 0.002 * x, true); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        7: { id: 7, current() { return player.prestige.resets; }, 
            goal(x = player.shard.achievements[7]) { return Math.pow(1e6 * Math.pow(10, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, 
            effect(x = player.shard.achievements[7]) { 
                let e = UNL.shard_achievements._effBase(4, Math.pow(2.1, x), false); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        8: { id: 8, 
            current() { return player.clicks.simulated; }, 
            goal(x = player.shard.achievements[8]) { return Math.pow(1000 * Math.pow(2, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current() + 0.00001, this.goal()); }, 
            effect(x = player.shard.achievements[8]) { 
                let e = UNL.shard_achievements._effBase(4, 0.04 * x, true); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        9: { id: 9, 
            current() { return player.clicks.critical; }, 
            goal(x = player.shard.achievements[9]) { return Math.pow(100 * Math.pow(2, x), UPGS.reflash.algo.tree[25].effect()); }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[9]) { 
                let e = UNL.shard_achievements._effBase(5, Math.pow(1.25, x), false); 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        },
        10: { id: 10, 
            current() { let sum = 0; for (let i = 1; i <= 10; i++) sum += player.shard.achievements[i]; return sum; }, 
            goal(x = player.shard.achievements[10]) { return 10 + (10 * x); }, 
            ratio() { return findRatio(this.current(), this.goal()); }, 
            effect(x = player.shard.achievements[10]) { 
                let e = (player.shop.special.includes(3) && player.shard_achievements.includes(5)) ? Math.pow(1.1, x) : 1; 
                return Math.pow(e, player.reflash.algo.includes(92) ? 1.25 : 1 )
            } 
        }
    },
    display: {
        unl(x, y = 'none', isArray = false) {
            let el = this[x].element;
            if (typeof el === 'function') el = el();
            if (!el) return;   

            const targetDisplay = this[x].req() ? this[x].type : y;
            if (el instanceof HTMLCollection) {
                Array.from(this[x].element()).forEach(element => {
                    if (element.style.display !== targetDisplay) element.style.display = targetDisplay;
                })
                return
            }
            if (el.style.display !== targetDisplay) el.style.display = targetDisplay;
        },
        check() {
            for (let i = 1; i <= 113; i++) {
                if (this[i]) {
                    let el = this[i].element();
                    if (el instanceof HTMLCollection) {
                        this.unl(i, this[i].type !== 'none' ? 'none' : 'flex', true) 
                    }
                    else if (this[i].element().classList.contains('automationUpgrade') || this[i].element().classList.contains('automationUpgrade2')) {
                        this.unl(i, this[i].type !== 'none' ? 'none' : 'block') 
                    }   
                    else this.unl(i, this[i].type !== 'none' ? 'none' : 'flex');
                }
            }
        },
        1: { type: 'block', element: () => document.getElementById('maxbuy'), req: () => ACHS.has(15) },
        2: { type: 'block', element: () => document.getElementById('maxOrNoUpgrades'), req: () => ACHS.has(15) },
        3: { type: 'block', element: () => document.getElementById('doPrestige'), req: () => ACHS.has(20) },
        4: { type: 'block', element: () => document.getElementById('crystalCount'), req: () => ACHS.has(21) },
        5: { type: 'block', element: () => document.getElementById('prestigeSelect'), req: () => ACHS.has(21) },
        6: { type: 'block', element: () => document.getElementById('prestigeSection'), req: () => ACHS.has(21) },
        7: { type: 'block', element: () => document.getElementById('maxBuyPrestige'), req: () => MILESTONES.has(10) && player.reflash.resets == 0 },
        8: { type: 'flex', element: () => document.getElementById('singleAutomationContainer'), req: () => MILESTONES.has(2) },
        9: { type: 'flex', element: () => document.getElementById('buyableAutomationContainer'), req: () => MILESTONES.has(3) },
        10: { type: 'flex', element: () => document.getElementById('umultiplierAutomationContainer'), req: () => MILESTONES.has(4) },
        11: { type: 'flex', element: () => document.getElementById('upowerAutomationContainer'), req: () => MILESTONES.has(5) },
        12: { type: 'flex', element: () => document.getElementById('prestigeAutomationContainer'), req: () => MILESTONES.has(8) },
        13: { type: 'block', element: () => document.getElementById('superCrystalsSelect'), req: () => player.progressBarGoals.includes(3) },
        14: { type: 'block', element: () => document.getElementById('mineralsSelect'), req: () => MILESTONES.has(17) },
        15: { type: 'block', element: () => document.getElementById('challengeSelect'), req: () => player.progressBarGoals.includes(2) },
        // 16: { type: 'flex', element: () => document.getElementById('post11challenge'), req: () => player.challenge.completed.includes(11) || player.reflash.resets >= 1 },
        // 17: { type: 'flex', element: () => document.getElementById('post11challenge2'), req: () => player.challenge.completed.includes(11) || player.reflash.resets >= 1 },
        // 18: { type: 'flex', element: () => document.getElementById('post11challenge3'), req: () => player.challenge.completed.includes(11) || player.reflash.resets >= 1 },
        // 19: { type: 'flex', element: () => document.getElementById('postAch32'), req: () => ACHS.has(32) },
        // 20: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[0], req: () => ACHS.has(33) },
        // 21: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[1], req: () => ACHS.has(33) },
        // 22: { type: 'flex', element: () => document.getElementsByClassName('postAch33')[2], req: () => ACHS.has(33) },
        16: { type: 'block', element: () => document.getElementById('prestigeHelpDiv'), req: () => ACHS.has(21) },
        17: { type: 'block', element: () => document.getElementById('modernizeButton'), req: () => UPGS.shop.special[2].unl() },
        18: { type: 'block', element: () => document.getElementById('harshUmulti'), req: () => [5, 7].includes(player.challenge.activated) || player.prestige.challenge.activated === 1 },
        19: { type: 'flex', element: () => document.getElementById('postE13SoftcapClick'), req: () => GAIN.coin.click.effect() >= 1e13 },
        20: { type: 'flex', element: () => document.getElementById('postE13SoftcapSecond'), req: () => GAIN.coin.second.effect() >= 1e13 },
        21: { type: 'flex', element: () => document.getElementById('postE13SoftcapSecond'), req: () => GAIN.coin.second.effect() >= 1e13 },
        22: { type: 'flex', element: () => document.getElementById('postE7SoftcapShard'), req: () => GAIN.shard.effect.effect() >= 1e7 },
        23: { type: 'flex', element: () => document.getElementById('shardsPerSecondText'), req: () => UNL.shard.second.unl() },
        24: { type: 'none', element: () => document.getElementById('shardUnlockableBase1'), req: () => UNL.shard.second.unl() },
        25: { type: 'flex', element: () => document.getElementById('shardsClick'), req: () => UNL.shard.click.unl() },
        26: { type: 'none', element: () => document.getElementById('shardUnlockableBase2'), req: () => UNL.shard.click.unl() },
        27: { type: 'flex', element: () => document.getElementById('shardBuyables'), req: () => UNL.shard.buyables.unl() },
        28: { type: 'none', element: () => document.getElementById('shardUnlockableBase3'), req: () => UNL.shard.buyables.unl() },
        29: { type: 'flex', element: () => document.getElementById('shardSingles'), req: () => UNL.shard.singles.unl() },
        30: { type: 'none', element: () => document.getElementById('shardUnlockableBase4'), req: () => UNL.shard.singles.unl() },
        31: { type: 'none', element: () => ELS.automationUpgradesArray[0], req: () => MISC.automation.single.time() <= 50 },
        32: { type: 'none', element: () => ELS.automationUpgradesArray[1], req: () => MISC.automation.buyable.time() <= 50 },
        33: { type: 'none', element: () => ELS.automationUpgradesArray[2], req: () => MISC.automation.umultiplier.time() <= 50 },
        34: { type: 'none', element: () => ELS.automationUpgradesArray[3], req: () => MISC.automation.upower.time() <= 50 },
        35: { type: 'none', element: () => ELS.automationUpgradesArray[4], req: () => MISC.automation.prestige.time() <= 50 },
        36: { type: 'flex', element: () => document.getElementById('prestigeModeDiv'), req: () => MISC.automation.prestige.time() <= 50 && MILESTONES.has(13) },
        37: { type: 'block', element: () => document.getElementById('increaseBulkBuyButton'), req: () => MISC.automation.buyable.time() <= 50 && MILESTONES.has(6) && MISC.automation.buyable.bulk() !== 512 },
        38: { type: 'flex', element: () => document.getElementById('umultiIntervalDiv'), req: () => MISC.automation.umultiplier.time() <= 50 },
        39: { type: 'flex', element: () => document.getElementById('upowerIntervalDiv'), req: () => MISC.automation.upower.time() <= 50 },
        40: { type: 'inline-block', element: () => document.getElementById('exitChallenge'), req: () => player.challenge.activated !== 0 },
        41: { type: 'block', element: () => document.getElementById('overdriveSelect'), req: () => true },
        42: { type: 'block', element: () => document.getElementById('overdriveType1'), req: () => true },
        43: { type: 'block', element: () => document.getElementById('overdriveType2'), req: () => UPGS.shop.special[1].unl() },
        44: { type: 'block', element: () => document.getElementById('challengeHelpDiv'), req: () => player.progressBarGoals.includes(2) },
        45: { type: 'block', element: () => document.getElementById('breakPrestigeSelect'), req: () => player.progressBarGoals.includes(5) },
        46: { type: 'block', element: () => document.getElementById('uadderBoost'), req: () => player.prestige.break.singles.includes(25) },
        47: { type: 'block', element: () => document.getElementById('ureducerBoost'), req: () => player.prestige.break.singles.includes(25) },
        48: { type: 'none', element: () => ELS.automationUpgradesArray[5], req: () => MISC.automation.uadder.time() <= 50 },
        49: { type: 'flex', element: () => document.getElementById('uadderIntervalDiv'), req: () => MISC.automation.uadder.time() <= 50 },
        50: { type: 'flex', element: () => document.getElementById('shardAchBarDiv1'), req: () => player.shard_achievements.includes(1) },
        51: { type: 'flex', element: () => document.getElementById('shardAchBarDiv2'), req: () => player.shard_achievements.includes(2) },
        52: { type: 'flex', element: () => document.getElementById('shardAchBarDiv3'), req: () => player.shard_achievements.includes(3) },
        53: { type: 'flex', element: () => document.getElementById('shardAchBarDiv4'), req: () => player.shard_achievements.includes(4) },
        54: { type: 'flex', element: () => document.getElementById('shardAchBarDiv5'), req: () => player.shard_achievements.includes(5) },
        55: { type: 'none', element: () => document.getElementById('shardAchUnlockable1'), req: () => player.shard_achievements.includes(1) },
        97: { type: 'none', element: () => document.getElementById('shardAchUnlockable2'), req: () => player.shard_achievements.includes(2) },
        56: { type: 'none', element: () => document.getElementById('shardAchUnlockable3'), req: () => player.shard_achievements.includes(3) },
        57: { type: 'none', element: () => document.getElementById('shardAchUnlockable4'), req: () => player.shard_achievements.includes(4) },
        58: { type: 'none', element: () => document.getElementById('shardAchUnlockable5'), req: () => player.shard_achievements.includes(5) },
        59: { type: 'block', element: () => document.getElementById('shardAchievementsSelect'), req: () => player.shop.special.includes(3) },
        60: { type: 'block', element: () => document.getElementById('challengesTimeSelect'), req: () => player.progressBarGoals.includes(2) },
        61: { type: 'block', element: () => document.getElementById('recentPrestigesSelect'), req: () => player.progressBarGoals.includes(1) },
        // 70: { type: 'flex', element: () => document.getElementById('postMinerals'), req: () => player.progressBarGoals.includes(4) },
        // 71: { type: 'flex', element: () => document.getElementById('postMinerals2'), req: () => player.progressBarGoals.includes(4) },
        // 72: { type: 'flex', element: () => document.getElementById('postBreakprestige'), req: () => player.progressBarGoals.includes(5) },
        // 73: { type: 'flex', element: () => document.getElementById('postBreakprestige2'), req: () => player.progressBarGoals.includes(5) },
        62: { type: 'flex', element: () => document.getElementById('uadderAutomationContainer'), req: () => player.prestige.break.singles.includes(25) },
        63: { type: 'block', element: () => document.getElementById('fortuneSelect'), req: () => player.progressBarGoals.includes(6) },
        64: { type: 'block', element: () => document.getElementById('balanceSelect'), req: () => player.fortune.upgrades.singles.includes(31) },
        65: { type: 'flex', element: () => document.getElementById('A-rarity-block'), req: () => player.fortune.upgrades.singles.includes(12) },
        66: { type: 'flex', element: () => document.getElementById('S-rarity-block'), req: () => player.fortune.upgrades.singles.includes(21) },
        67: { type: 'flex', element: () => document.getElementById('EX-rarity-block'), req: () => player.fortune.upgrades.singles.includes(32) },
        68: { type: 'flex', element: () => document.getElementById('aquamarineMineral'), req: () => player.shop.special.includes(5) },
        // 81: { type: 'flex', element: () => document.getElementById('crystalgainsc'), req: () => player.prestige.total_currency >= 1e50 },
        // 82: { type: 'flex', element: () => document.getElementById('shardeffectsc'), req: () => player.shard.currency >= 1e10 },
        69: { type: 'inline-block', element: () => document.getElementById('exitPChallenge'), req: () => player.prestige.challenge.activated !== 0 },
        70: { type: 'flex', element: () => document.getElementById('breakPUs'), req: () => player.prestige.break.singles.includes(25)},
        71: { type: 'flex', element: () => document.getElementById('doReflash'), req: () => player.prestige.challenge.completed.length >= 4 || player.reflash.resets >= 1},
        72: { type: 'block', element: () => document.getElementById('challengePrestigeSelect'), req: () => player.progressBarGoals.includes(8) || player.reflash.resets >= 1},
        73: { type: 'flex', element: () => document.getElementById('prestigeChallengePair2'), req: () => player.prestige.challenge.completed.length >= 1 },
        74: { type: 'flex', element: () => document.getElementById('prestigeChallengePair3'), req: () => player.prestige.challenge.completed.length >= 2 },
        75: { type: 'flex', element: () => document.getElementById('prestigeChallengePair4'), req: () => player.prestige.challenge.completed.length >= 3 },
        76: { type: 'block', element: () => document.getElementById('helpTab22'), req: () => player.progressBarGoals.includes(8) },
        // 77: { type: 'block', element: () => document.getElementById('aquaticPick'), req: () => ACHS.has(51) },
        77: { type: 'block', element: () => document.getElementById('supercoinsGain'), req: () => player.shop.special.includes(6) },
        78: { type: 'block', element: () => document.getElementById('reflashSelect'), req: () => player.reflash.resets >= 1 },
        79: { type: 'block', element: () => document.getElementById('recentReflashes'), req: () => player.reflash.resets >= 1 },
        80: { type: 'block', element: () => document.getElementById('reflashSection'), req: () => player.reflash.resets >= 1 },
        81: { type: 'block', element: () => document.getElementById('bitsCount'), req: () => player.reflash.resets >= 1 }, 
        // 95: { type: 'flex', element: () => document.getElementById('postReflashShop'), req: () => player.reflash.resets >= 1 }, 
        // 96: { type: 'flex', element: () => document.getElementById('postReflashShop2'), req: () => player.reflash.resets >= 1 }, 
        82: { type: 'block', element: () => document.getElementById('worldSpeed'), req: () => player.reflash.acceleratorUpgrades[5] >= 1 }, 
        83: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_prestige'), req: () => player.prestige.resets >= 1 || player.reflash.resets >= 1}, 
        84: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_shards'), req: () => player.shard.unlockables.length >= 1 || player.reflash.resets >= 1}, 
        85: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_ach33'), req: () => ACHS.has(33) || player.reflash.resets >= 1}, 
        86: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_supercrystal'), req: () => player.supercrystal.total_currency >= 1 || player.reflash.resets >= 1}, 
        87: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_challenge11'), req: () => CHALL[11].completed() || player.reflash.resets >= 1}, 
        88: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_ach32'), req: () => ACHS.has(32) || player.reflash.resets >= 1}, 
        89: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_breakprestige'), req: () => player.prestige.break.singles.includes(25) || player.reflash.resets >= 1}, 
        90: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_fortune'), req: () => player.fortune.total_tokens >= 1 || player.reflash.resets >= 1}, 
        91: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_reflash'), req: () => player.reflash.resets >= 1}, 
        92: { type: 'block', element: () => document.getElementById('acceleratorU5_1'), req: () => MISC.acc_ratio() >= 100}, 
        93: { type: 'block', element: () => document.getElementById('acceleratorU5'), req: () => MISC.acc_ratio() < 100}, 
        94: { type: 'flex', element: () => document.getElementById('temporaryBonuses'), req: () => player.virus.effect.time > 0 || player.shop.items.timer[1] > 0 || player.shop.items.timer[2] > 0 || player.shop.items.timer[4] > 0 || player.shop.items.timer[5] > 0 || player.shop.items.timer[6] > 0},
        102: {type: 'block', element: () => document.getElementById('virusEffect'), req: () => player.virus.effect.time > 0},
        103: {type: 'block', element: () => document.getElementById('shopItem1Effect'), req: () => player.shop.items.timer[1] > 0},
        104: {type: 'block', element: () => document.getElementById('shopItem2Effect'), req: () => player.shop.items.timer[2] > 0},
        95: { type: 'flex', element: () => document.getElementById('digitalizationPreStart'), req: () => !player.event.digitalization.activated},
        96: { type: 'flex', element: () => document.getElementById('digitalizationEvent'), req: () => player.event.digitalization.activated},
        //тут 98 потому что блок второго достижения осколков имеет номер 97, он где-то там выше
        98: { type: 'flex', element: () => document.getElementById('ureducerAutomationContainer'), req: () => player.prestige.break.singles.includes(25) && player.reflash.resets >= 1},
        99: { type: 'none', element: () => ELS.automationUpgradesArray[6], req: () => MISC.automation.ureducer.time() <= 50 },
        100: { type: 'flex', element: () => document.getElementById('ureducerIntervalDiv'), req: () => MISC.automation.ureducer.time() <= 50 },
        101: { type: 'block', element: () => document.getElementById('reflashHelpDiv'), req: () => player.reflash.resets >= 1 },
        105: { type: 'block', element: () => document.getElementById('maxBuyShards'), req: () => UNL.shard.buyables.unl()},
        106: { type: 'flex', element: () => document.getElementsByClassName('shop_unlock_post_computer'), req: () => player.reflash.computer[3] >= 1 },
        107: {type: 'block', element: () => document.getElementById('shopItem4Effect'), req: () => player.shop.items.timer[4] > 0},
        108: {type: 'block', element: () => document.getElementById('shopItem5Effect'), req: () => player.shop.items.timer[5] > 0},
        109: {type: 'block', element: () => document.getElementById('shopItem6Effect'), req: () => player.shop.items.timer[6] > 0},
        110: { type: 'block', element: () => document.getElementById('overdriveType3'), req: () => UPGS.shop.special[8].unl() },
        111: { type: 'block', element: () => document.getElementById('autoMaxBuyPrestige'), req: () => MILESTONES.has(10) && player.reflash.resets > 0 },
        112: { type: 'block', element: () => document.getElementById('computerSelect'), req: () => player.reflash.algo.includes(51) },
        113: { type: 'block', element: () => document.getElementById('autoMechanismsSelect'), req: () => player.reflash.computer[5] >= 1 },
        
    }
};

// --- ИСПЫТАНИЯ (CHALLENGES) ---

// Хелперы для сокращения кода испытаний
const fb8 = () => player.fortune.activatedBoosts[8].activated ? UPGS.fortune.boosts[8].effect() : 1;
const vb7 = () => player.virus.effect.type == 7 && player.virus.effect.time > 0 ? player.virus.effect.status == 'buff' ? player.virus.effect.multiplier : 1/player.virus.effect.multiplier : 1
const isChallComp = (id) => player.challenge.completed.includes(id);
const isPChallComp = (id) => player.prestige.challenge.completed.includes(id);

const CHALL = {
    1: { id: 1, completed: () => isChallComp(1), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(player.challenge.completed.length+1, 3.5) * fb8() * vb7() },
    2: { id: 2, completed: () => isChallComp(2), effect: () => player.prestige.challenge.activated == 8 ? 1 : 1000 * fb8() * vb7() },
    3: { id: 3, completed: () => isChallComp(3), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(1 + player.prestige.resets, 0.35) * fb8() * vb7() },
    4: { id: 4, completed: () => isChallComp(4), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(1.2, player.achievements.length) * fb8() * vb7() },
    5: { id: 5, completed: () => isChallComp(5), effect: () => player.prestige.challenge.activated == 8 ? 1 : CHALL[5].completed() ? 0.9 : 1 },
    6: { id: 6, completed: () => isChallComp(6), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + 0.1) },
    7: { id: 7, completed: () => isChallComp(7), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.log2(1+ player.shard.currency + 1) * fb8() * vb7() },
    8: { id: 8, completed: () => isChallComp(8), effect: () => player.prestige.challenge.activated == 8 ? 1 : (1 + player.time.real.prestige.timer) * fb8() * vb7() },
    9: { id: 9, completed: () => isChallComp(9), effect: () => player.prestige.challenge.activated == 8 ? 1 : Math.pow(1 + player.supercoin.total_currency, 1.5) * fb8() * vb7() },
    10: { id: 10, completed: () => isChallComp(10), effect: () => player.prestige.challenge.activated == 8 ? 1 : 1 + MISC.amount_of_upgrades.coin()/2 * fb8() * vb7() },
    11: { id: 11, completed: () => isChallComp(11) }, // new items in shop
    12: { id: 12, completed: () => isChallComp(12) }, // decrease umulti and upower scaling
    
    virusCoins_gen() {
        let virusCoins = Math.pow(1.1, player.time.real.prestige.timer);
        return Math.min(virusCoins, 1e100);
    }
};

const PRES_CHALLENGE = {
    1: { id: 1, completed: () => isPChallComp(1), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(1) ? 1 : ACHS.has(59) ? 1e6*1.1 : 1e6 },
    2: { id: 2, completed: () => isPChallComp(2), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(2) ? 1 : ACHS.has(59) ? 1 + 1.1 * (Math.log10(player.umultipliers + 1) / 10) : 1 + (Math.log10(player.umultipliers + 1) / 10) },
    3: { id: 3, completed: () => isPChallComp(3), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(3) ? 1 : ACHS.has(59) ? 1.1*Math.pow(4, player.prestige.challenge.completed.length) : Math.pow(4, player.prestige.challenge.completed.length) },
    4: { id: 4, completed: () => isPChallComp(4), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(4) ? 1 : ACHS.has(59) ? 1.1*13 * player.supercrystal.total_currency : 13 * player.supercrystal.total_currency },
    5: { id: 5, completed: () => isPChallComp(5), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(5) ? 1 : ACHS.has(59) ? 1 + (1.1*(Math.pow(player.balance.scales_of_balance+1, 0.005)-1)) : Math.pow(player.balance.scales_of_balance, 0.005) },
    6: { id: 6, completed: () => isPChallComp(6), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(6) ? 1 : ACHS.has(59) ? 1.1*1e12 : 1e12 },
    7: { id: 7, completed: () => isPChallComp(7), effect: () => player.prestige.challenge.activated == 8 || !isPChallComp(7) ? 1 : (ACHS.has(59) ? 1.1*(player.challenge.time[12].times_completed + 1) : player.challenge.time[12].times_completed + 1) }
};

// --- РАЗНОЕ И УТИЛИТЫ (MISC) ---

const MISC = {
    daily_reward() {
        if (!player.got_daily_reward) {
            let gain = player.offline_gain.daily;
            player.supercoin.currency += gain;
            player.supercoin.total_currency += gain;
            player.supercoin.this_reflash_currency += gain
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
    
    automation: {
        single: { 
            divider: 1.6666667, 
            cost: (x = player.automation.upgrades.single) => Math.pow(2, x), 
            time(x = player.automation.upgrades.single) { 
                let interval = Math.max(2000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { return Date.now() + this.time(); } 
        },
        buyable: { 
            divider: 1.6666667, 
            cost: (x = player.automation.upgrades.buyable) => Math.pow(2, x), 
            time(x = player.automation.upgrades.buyable) { 
                let interval = Math.max(1000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            bulk(x = player.automation.upgrades.buyable) { 
                return this.time() <= 50 ? Math.min(Math.pow(2, x - 6), 512) : 1; 
            }, 
            charged: false, 
            interval: '', 
            activateTime() { return Date.now() + this.time(); } 
        },
        umultiplier: { 
            divider: 1.6666667, 
            cost: (x = player.automation.upgrades.umultiplier) => Math.pow(2, x), 
            time(x = player.automation.upgrades.umultiplier) { 
                let interval = Math.max(15000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { 
                return Date.now() + this.time(); 
            } 
        },
        upower: { 
            divider: 1.6666667, 
            cost: (x = player.automation.upgrades.upower) => Math.pow(2, x), 
            time(x = player.automation.upgrades.upower) { 
                let interval = Math.max(30000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { 
                return Date.now() + this.time(); 
            } 
        },
        prestige: { 
            divider: 1.6666667, 
            cost: (x = player.automation.upgrades.prestige) => Math.pow(2, x), 
            time(x = player.automation.upgrades.prestige) { 
                let interval = Math.max(60000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { 
                return Date.now() + this.time(); 
            } 
        },
        uadder: { 
            divider: 1.5, 
            cost: (x = player.automation.upgrades.uadder) => 1e15 * Math.pow(100, x), 
            time(x = player.automation.upgrades.uadder) { 
                let interval = Math.max(30000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { 
                return Date.now() + this.time(); 
            } 
        },
        ureducer: { 
            divider: 2, 
            cost: (x = player.automation.upgrades.ureducer) => 1e50 * Math.pow(1000, x), 
            time(x = player.automation.upgrades.ureducer) { 
                let interval = Math.max(60000 / Math.pow(this.divider, x), 50)
                return interval
            }, 
            charged: false, 
            interval: '', 
            activateTime() { 
                return Date.now() + this.time(); 
            } 
        },
    },
    
    offline(x = player.time.savedTime, y = Date.now()) {
        if (!player.settings.offline) return 0;
        let max = ACHS.has(22) ? 28800 : 21600
        let time = Math.max(Math.min((y - x) / 1000, max), 0);
        //* UPGS.reflash.accelerator[5].effect()
        return UPGS.supercrystal[31].unl() ? time * 2  : time
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
        uadder: () => {
            let effect = 0
            return player.prestige.challenge.activated == 8 ? 0 : effect + player.shop.items.used[6]
        },
    },
    auto_save_timer: 0,
    
    // ЕДИНЫЙ цикл подсчета средних значений (прощайте 6 дубликатов!)
    average: {
        _getStat(valFunc) {
            let sum = 0;
            let resets = player.prestige.table_resets; // Защита от деления на ноль
            if (resets === 0) return 0;
            for (let i = 0; i < resets; i++) sum += valFunc(player.prestige.prestigeTable[i]);
            return sum / resets;
        },
        prestiges() { return this._getStat(t => t.prestiges, 'prestige'); },
        crystals() { return this._getStat(t => t.crystals, 'prestige'); },
        game_time() { return this._getStat(t => t.time.game.timer, 'prestige'); },
        real_time() { return this._getStat(t => t.time.real.timer, 'prestige'); },
        prestiges_per_min() { return this._getStat(t => (t.prestiges * 60) / Math.max(t.time.real.timer, 0.1), 'prestige'); },
        crystals_per_min() { return this._getStat(t => (t.crystals * 60) / Math.max(t.time.real.timer, 0.1), 'prestige'); },
        reflash: {
            _getStat(valFunc) {
            let sum = 0;
            let resets = player.reflash.table_resets; // Защита от деления на ноль
            if (resets === 0) return 0;
            for (let i = 0; i < resets; i++) sum += valFunc(player.reflash.resetTable[i]);
            return sum / resets;
            },
            resets() { return this._getStat(t => t.resets, 'reflash'); },
            currency() { return this._getStat(t => t.currency, 'reflash'); },
            game_time() { return this._getStat(t => t.time.game.timer, 'reflash'); },
            real_time() { return this._getStat(t => t.time.real.timer, 'reflash'); },
            resets_per_min() { return this._getStat(t => (t.resets * 60) / Math.max(t.time.real.timer, 0.1), 'reflash'); },
            currency_per_min() { return this._getStat(t => (t.currency * 60) / Math.max(t.time.real.timer, 0.1), 'reflash'); },
        }
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
            if (x === 'plus' && player.balance.coins.plus < 10) { 
                player.balance.total_coins.plus++; 
                player.balance.coins.plus++; 
                player.fortune.tokens--;
                player.achievement_conditions[69] = false
                if (player.virus.activated && player.virus.type == 6) player.virus.current++
            }
            if (x === 'minus' && player.balance.coins.minus < 10) { 
                player.balance.total_coins.minus++; 
                player.balance.coins.minus++; 
                player.fortune.tokens--;
                player.achievement_conditions[69] = false
                if (player.virus.activated && player.virus.type == 6) player.virus.current++
            }
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
                let coinBuff = a ? Math.pow(1000, a * UPGS.balance.buyables[1].effect()) : 1;
                let coinGainSoftcapPusher = player.balance.upgrades.singles.includes(11) && a ? Math.pow(200, a * UPGS.balance.buyables[1].effect()) : 1;
                let upgradePriceDivisor = player.balance.upgrades.singles.includes(21) && a ? Math.pow(3, a * UPGS.balance.buyables[1].effect()) : 1;
                let chanceBuffer = player.balance.upgrades.singles.includes(31) && a ? a / 200 * UPGS.balance.buyables[1].effect() : 0;
                
                if (player.prestige.challenge.activated === 8) {
                    coinBuff = 1; coinGainSoftcapPusher = 1; 
                    upgradePriceDivisor = 1; chanceBuffer = 0;
                }
                return { coinBuff, coinGainSoftcapPusher, upgradePriceDivisor, chanceBuffer: chanceBuffer + 1 };
            },
            nerf(a = player.balance.coins.plus) {
                let crystalGainNerf = a ? Math.pow(2.5, subtractPercentage(a, UPGS.balance.buyables[2].effect())) : 1;
                let crystalSoftcapHarsher = player.balance.upgrades.singles.includes(11) ? subtractPercentage(a / 300, UPGS.balance.buyables[2].effect()) : 0;
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
                let crystalGainBuff = b ? Math.pow(2.5, b * UPGS.balance.buyables[1].effect()) : 1;
                let crystalSoftcapSofter = player.balance.upgrades.singles.includes(12) && b ? b / 300 * UPGS.balance.buyables[1].effect() : 0;
                let utilsCostReducer = player.balance.upgrades.singles.includes(22) && b ? b / 30 * UPGS.balance.buyables[1].effect() : 0;
                let crystalSoftcapPusher = player.balance.upgrades.singles.includes(32) && b ? 33 * Math.pow(3, b * UPGS.balance.buyables[1].effect()) : 1;
                
                if (player.prestige.challenge.activated === 8) {
                    crystalGainBuff = 1; crystalSoftcapSofter = 0; 
                    utilsCostReducer = 0; crystalSoftcapPusher = 0;
                }
                return { crystalGainBuff, crystalSoftcapSofter, utilsCostReducer: utilsCostReducer + 1, crystalSoftcapPusher };
            },
            nerf(b = player.balance.coins.minus) {
                let coinNerf = b ? Math.pow(1000, subtractPercentage(b, UPGS.balance.buyables[2].effect())) : 1;
                let coinGainSoftcapPuller = player.balance.upgrades.singles.includes(12) && b ? Math.pow(200, subtractPercentage(b, UPGS.balance.buyables[2].effect())) : 1;
                let upgradePriceMultiplier = player.balance.upgrades.singles.includes(22) && b ? Math.pow(3, subtractPercentage(b, UPGS.balance.buyables[2].effect())): 1;
                
                if (player.prestige.challenge.activated === 8) {
                    coinNerf = 1; coinGainSoftcapPuller = 1; 
                    upgradePriceMultiplier = 1;
                }
                return { coinNerf, coinGainSoftcapPuller, upgradePriceMultiplier };
            }
        }
    },
    sum_of_utils() {
        return (player.uadders + player.ureducers + player.umultipliers + player.upowers)
    },
    acc_ratio() {
        return Math.min(MISC.sum_of_utils()/UPGS.reflash.accelerator[5].cost()*100, 100)
    },
    item_effect() {
        if (player.shop.items.used[1] > 0 && player.shop.items.timer[1] < 0) {
            player.shop.items.used[1] = 0
        }
        if (player.shop.items.used[2] > 0 && player.shop.items.timer[2] < 0) {
            player.shop.items.used[2] = 0
        }
        if (player.shop.items.used[4] > 0 && player.shop.items.timer[4] < 0) {
            player.shop.items.used[4] = 0
        }
        if (player.shop.items.used[5] > 0 && player.shop.items.timer[5] < 0) {
            player.shop.items.used[5] = 0
        }
        if (player.shop.items.used[6] > 0 && player.shop.items.timer[6] < 0) {
            player.shop.items.used[6] = 0
        }
    },
    sum_watt() {
        let total = 0;
        for (let i = 1; i <= 5; i++) {
            if (i != 2) total += UPGS.reflash.computer[i].consumation();
        }
        for (let i = 1; i <= 16; i++) {
            if (AUTO.mechanisms[i].activated()) total += AUTO.mechanisms[i].consumation;
        }
        return total;
    },
    sum_mechanisms() {
        return 4 + 2 * player.reflash.computer[4]
    },
    sum_used_mechanisms() {
        let total = 0
        for (let i = 1; i <= 16; i++) {
            if (player.automation.mechanism.checked[i]) total++
        }
        return total
    },
    sum_of_minerals() {
        let total = 0
        for (let i = 1; i <= 4; i++) {
            total += player.minerals[i]
        }
        return total
    },
    sum_of_computer() {
        let total = 0
        for (let i = 1; i <= 5; i++) {
            total += player.reflash.computer[i]
        }
        return total
    }
}

// --- СИСТЕМА ПРОГРЕССА (PROGRESS) ---

const PROGRESS = {
    unl(x) { 
        // Если есть кастомная функция current(), используем её, иначе берём стандартный путь
        let current = this[x].current ? this[x].current() : player[this[x].layer][this[x].type];
        return current >= this[x].req(); 
    },
    add(x) { if (!player.progressBarGoals.includes(x) && this.unl(x)) player.progressBarGoals.push(x); },
    
    // Оставляем пустыми, они заполнятся из languages.js
    name: ['', '', '', '', '', '', '', '', '', '','', ''],
    currency: ['', '', '', '', '', '', '', '', '', '','', ''],
    
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
    4: { layer: "prestige", type: "resets", req: () => 100000 }, // minerals
    5: { layer: "prestige", type: "currency", req: () => 1e15 }, // superprestige
    6: { layer: "supercrystal", type: "total_currency", req: () => 20 }, // fortune
    7: { layer: "supercrystal", type: "total_currency", req: () => 40 }, // balance
    8: { layer: "prestige", type: "currency", req: () => 1e100 }, // ???
    // Вот наш новый 9-й пункт с кастомной функцией:
    9: { current: () => player.prestige.challenge.completed.length, req: () => 4, linear: true },
    10: { layer: "coin", type: "currency", req: () => 1.79e308 }, // Infinity
    11: { layer: "reflash", type: "resets", req: () => 1 },
    12: { current: () => Number(player.reflash.algo.includes(51)), req: () => 1, linear: true },

    accelerator: {
        update() {
        let current = MISC.sum_of_utils();
        let required = UPGS.reflash.accelerator[5].cost();
        
        let height = 0;
        let ratio = 0;
        
        // if (this[x].linear) {
            height = (current / required) * 100;
            ratio = height;
        // } else {
        //     if (current > 0) { // Защита от Math.log(0) = -Infinity
        //         height = (Math.log(current) / Math.log(required)) * 100;
        //         ratio = findRatio(current, required);
        //     }
        // }
        
        // Жестко ограничиваем от 0 до 100%
        height = Math.min(Math.max(height, 0), 100);
        ratio = Math.min(Math.max(ratio, 0), 100);
        
        acceleratorMachineProgressBar.style.height = height + "%";
    },
    }
};

const VIRUS = {
    check() {
        if (player.virus.activated) return 0

        let chance = 24000*UPGS.shop.permanent[10].effect()/UPGS.shop.buyables[15].effect()
        let maxChance = Math.round(chance)
        let randomNum = randomNumber(0, maxChance)

        if (randomNum == maxChance) this.activate()
    },
    activate() {
        document.getElementById('additionalVirusWindow').style.display = 'block'
        document.getElementById('virusWindow').style.display = 'block'

        player.virus.type = this.current_type()
        player.virus.level = this[player.virus.type].current_level.req()
        player.virus.goal = this[player.virus.type].req(player.virus.level) / UPGS.shop.permanent[10].effect()
        player.virus.time = 60
        player.virus.activated = true
    },
    check_goal() {
        if (!player.virus.activated) return 0
        if (player.virus.current >= player.virus.goal) {
            this.win()
            this.finish()
        }
        else if (player.virus.time < 0) {
            this.lose()
            this.finish()
        }
    },
    finish() {
        document.getElementById('additionalVirusWindow').style.display = 'none'
        document.getElementById('virusWindow').style.display = 'none'

        player.virus.effect.multiplier = this.multiplier_calc()
        player.virus.effect.type = player.virus.type
        player.virus.effect.time = 300

        player.virus.activated = false
        player.virus.current = 0
        player.virus.time = 0
        player.virus.goal = 0
        player.virus.level = 0
        player.virus.type = 0
    },
    win() {
        player.virus.effect.status = 'buff'
        player.virus.times_completed++
        if (player.virus.times_completed >= 10 && !ACHS.has(62)) {
            ACHS.unl(62)
            player.cosmetics.progressBars.styles.push('option8')
        }
    },
    lose() {
        player.virus.effect.status = 'debuff'
    },
    multiplier_calc(x=player.virus.type, y=player.virus.level) {
        let effect = 0
        switch (x) {
            case 1: //монеты в секунду и нажатия вне софткапа
                effect = Math.pow(15, y)
                break;
            case 2: //кристаллы за сброс вне софткапа
                effect = Math.pow(4, y)
                break;
            case 3: //доход осколков
                effect = Math.pow(5, y)
                break;
            case 4: //шанс супермонет
                effect = 1+0.2*y
                break;
            case 5: //увеличивает эффект всех достижений осколков
                effect = 1+0.15*y
                break;
            case 6: //доход нейтрали
                effect = Math.pow(1.35, y)
                break;
            case 7:
                effect = Math.pow(10, y)
                break;
            default:
                break;
        }
        return effect
    },
    current_type() {
        let type_array = []
        for (let i = 1; i <= 7; i++) {
            if (this[i].current_level.req() != 0) {
                type_array.push(i)
            }
        }
        const randomIndex = Math.floor(Math.random() * type_array.length);
        return type_array[randomIndex];
    },
    update() {
        if (!player.virus.activated) return 0
        
        let current = player.virus.current;
        let required = player.virus.goal;
        
        let width = 0;
        let ratio = 0;
        
        width = (current / required) * 100;
        ratio = width;

        width = Math.min(Math.max(width, 0), 100);
        ratio = Math.min(Math.max(ratio, 0), 100);
        
        document.getElementById('virus-progressbar').style.width = width + "%";
    },
    ratio() {
        if (!player.virus.activated) return 0

        let current = player.virus.current;
        let required = player.virus.goal;

        return (current / required) * 100;
    },
    1: { //coin clicks
        req(x=this.current_level.req()) {
            let base = 100, multiplier = 1+0.5*(x-1)
            return base*multiplier
        },
        current_level: {
            req(x=player.coin.this_reflash_currency){
                let level_array = []
                    switch (true) {
                        case x > 1e200:
                            level_array.push(5);
                        case x > 1e150:
                            level_array.push(4);
                        case x > 1e100:
                            level_array.push(3);
                        case x > 1e50:
                            level_array.push(2);
                        case x > 0:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array[randomIndex];
                }

        },
    },
    2: { //prestige resets
        req(x=this.current_level.req()) {
            let base = 100, multiplier = 1+0.75*(x-1)
            return base*multiplier
        },
        current_level: {
            req(x=player.prestige.this_reflash_currency){
                let level_array = []
                    switch (true) {
                        case x > 1e50:
                            level_array.push(4);
                        case x > 1e30:
                            level_array.push(3);
                        case x > 1e15:
                            level_array.push(2);
                        case x > 1e6:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
    3: { //crystal breaks
        req(x=this.current_level.req()) {
            let base = 10, multiplier = 1+0.75*(x-1)
            return base*multiplier
        },
        current_level: {
            req(x=player.shard.currency){
                let level_array = []
                    switch (true) {
                        case x > 1e100:
                            level_array.push(3);
                        case x > 1e50:
                            level_array.push(2);
                        case x > 1e15:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
    4: { //spent supercoins
        req(x=this.current_level.req()) {
            let base = 1000, multiplier = x
            return base*multiplier
        },
        current_level: {
            req(x=player.supercoin.this_reflash_currency){
                let level_array = []
                    switch (true) {
                        case x > 100000:
                            level_array.push(3);
                        case x > 50000:
                            level_array.push(2);
                        case x > 10000:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
    5: { //spent supercrystals
        req(x=this.current_level.req()) {
            let base = 30, multiplier = x
            return base*multiplier
        },
        current_level: {
            req(x=player.supercrystal.total_currency){
                let level_array = []
                    switch (true) {
                        case x > 50:
                            level_array.push(3);
                        case x > 25:
                            level_array.push(2);
                        case x > 10:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
    6: { //spent fortune tokens
        req(x=this.current_level.req()) {
            let base = 25, multiplier = x
            return base*multiplier
        },
        current_level: {
            req(x=player.fortune.total_tokens){
                let level_array = []
                    switch (true) {
                        case x > 10:
                            level_array.push(2);
                        case x > 5:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
    7: { //completed challenges
        req(x=this.current_level.req()) {
            let base = 50, multiplier = x
            return base*multiplier
        },
        current_level: {
            req(x=player.coin.this_reflash_currency){
                let level_array = []
                    switch (true) {
                        case x > 1e220:
                            level_array.push(2);
                        case x > 1e150:
                            level_array.push(1);
                            break;
                    }
                    const randomIndex = Math.floor(Math.random() * level_array.length);
                    return level_array == false ? 0 : level_array[randomIndex];
                }

        },
    },
}

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
    else player.coin.currency += (player.challenge.activated !== 0 && player.coin.currency >= 1e15) ? 0 : GAIN.coin.second.effect() * time * UPGS.reflash.accelerator[5].effect();
    if (isNaN(player.coin.total_currency)) player.coin.total_currency = 1.79e308
    else player.coin.total_currency += GAIN.coin.second.effect() * time * UPGS.reflash.accelerator[5].effect();
    if (isNaN(player.coin.this_reflash_currency)) player.coin.this_reflash_currency = 1.79e308
    else player.coin.this_reflash_currency += GAIN.coin.second.effect() * time * UPGS.reflash.accelerator[5].effect();
    // Хардкап: не пускаем монеты за предел
    if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
    if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
    if (player.coin.this_reflash_currency > 1.79e308) player.coin.this_reflash_currency = 1.79e308;
    
    player.shard.currency += GAIN.shard.second() * time * UPGS.reflash.accelerator[5].effect();
    if (player.shard.currency > 1.79e308) player.shard.currency = 1.79e308;
    player.balance.neutral += GAIN.balance.generation() * time * UPGS.reflash.accelerator[5].effect();
    player.balance.scales_of_balance += GAIN.balance.scales_of_balance() * time * UPGS.reflash.accelerator[5].effect();

    player.supercoin.currency += GAIN.supercoin.gain_per_second() * time * UPGS.reflash.accelerator[5].effect();
    player.supercoin.total_currency += GAIN.supercoin.gain_per_second() * time * UPGS.reflash.accelerator[5].effect();
    player.supercoin.this_reflash_currency += GAIN.supercoin.gain_per_second() * time * UPGS.reflash.accelerator[5].effect();

    player.time.game.total.timer += time * UPGS.reflash.accelerator[5].effect();
    player.time.game.prestige.timer += time * UPGS.reflash.accelerator[5].effect();
    player.time.game.reflash.timer += time * UPGS.reflash.accelerator[5].effect();
    convert_time('game', 'total');
    convert_time('game', 'prestige');
    convert_time('game', 'reflash');
    
    player.time.real.total.timer += time;
    player.time.real.prestige.timer += time;
    player.time.real.reflash.timer += time;
    convert_time('real', 'total');
    convert_time('real', 'prestige');
    convert_time('real', 'reflash');
    
    player.time.umultiplier += time * UPGS.reflash.accelerator[5].effect();
    player.time.upower += time * UPGS.reflash.accelerator[5].effect();
    player.time.uadder += time * UPGS.reflash.accelerator[5].effect();
    player.time.ureducer += time * UPGS.reflash.accelerator[5].effect();

    if (player.event.digitalization.activated) {
        if (!player.event.digitalization.quests.daily.completed.includes(2)) player.event.digitalization.quests.daily.progress[1] += time
        if (!player.event.digitalization.quests.weekly.completed.includes(2)) player.event.digitalization.quests.weekly.progress[1] += time
    }
    
    player.time.real.daily.timer = Math.max((player.time.next_daily - player.time.currentTime) / 1000, 0);
    convert_time('real', 'daily');

    for (let i = 1; i <= 12; i++) {
        if (player.fortune.activatedBoosts[i].time > 0) player.fortune.activatedBoosts[i].time -= time;
        else if (player.fortune.activatedBoosts[i].time < 0) player.fortune.activatedBoosts[i].time = 0;
    }

    update_overdrive();
    PROGRESS.update();
    PROGRESS.accelerator.update();
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
    UPGS.shop.special.checkDisable();
    UPGS.shop.items.checkDisable();
    UPGS.supercrystal.checkDisable();
    UPGS.minerals.checkDisable();
    UPGS.fortune.upgrades.buyables.checkDisable();
    UPGS.fortune.upgrades.singles.checkDisable();
    UPGS.fortune.boosts.checkDisable();
    UPGS.balance.buyables.checkDisable();
    UPGS.balance.singles.checkDisable();

    UPGS.reflash.buyables.checkDisable();
    UPGS.reflash.singles.checkDisable();
    UPGS.reflash.accelerator.checkDisable();
    UPGS.reflash.computer.checkDisable();

    UPGS.coin.buyables.checkPurchased();
    UPGS.coin.singles.checkPurchased();
    UPGS.prestige.singles.checkPurchased();
    UPGS.shard.singles.checkPurchased();
    UPGS.supercrystal.checkPurchased();
    UPGS.prestige.break.singles.checkPurchased();
    UPGS.fortune.upgrades.singles.checkPurchased();
    UPGS.balance.singles.checkPurchased();
    UPGS.reflash.singles.checkPurchased();
    UPGS.reflash.algo.updateStates();
    AUTO.mechanisms.updateStates()
    
    if (player.reflash.resets >= 1) {
        if (player.virus.activated) {
            VIRUS.check_goal()
            player.virus.time -= time
            VIRUS.update()
        }
        else VIRUS.check()
    
        if (player.virus.effect.time > 0) player.virus.effect.time -= time
    }

    if (player.shop.items.timer[1] > 0) player.shop.items.timer[1] -= time
    if (player.shop.items.timer[2] > 0) player.shop.items.timer[2] -= time
    if (player.shop.items.timer[4] > 0) player.shop.items.timer[4] -= time
    if (player.shop.items.timer[5] > 0) player.shop.items.timer[5] -= time
    if (player.shop.items.timer[6] > 0) player.shop.items.timer[6] -= time

    MISC.item_effect()

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

    // updateBitToByteUI()

    player.time.game.average.timer = MISC.average.game_time();
    convert_time('game', 'average');
    player.time.real.average.timer = MISC.average.real_time();
    convert_time('real', 'average');

    player.time.savedTime = Date.now();
    UNL.display.check();

    DIGITALIZATION.check_event()
}

mySlider.oninput = function() { player.settings.autosave_interval = this.value; };

function convert_time(type, layer) {
    let t = Math.floor(player.time[type][layer].timer); 
    
    player.time[type][layer].seconds = t % 60;
    player.time[type][layer].minutes = Math.floor(t / 60) % 60;
    player.time[type][layer].hours = Math.floor(t / 3600) % 24;
    player.time[type][layer].days = Math.floor(t / 86400);
}

function convert_time_temp(time) {
    let seconds = time % 60;
    let minutes = (time / 60) % 60;
    let hours = (time / 3600) % 24;
    let days = time / 86400;
    let timer = time
    return { seconds, minutes, hours, days, timer };
}

// --- ВИЗУАЛ: ПОЛОСКИ ПРОГРЕССА И ОВЕРДРАЙВ ---

function update_overdrive() {
    const overdriveTypeEl = document.querySelector('.overdriveType');
    const overdriveWidth = overdriveTypeEl ? overdriveTypeEl.getBoundingClientRect().width : 800;
    const widthMultiplier = overdriveWidth / 100;
    
    let w1 = (UNL.overdrive.type1.percent() * overdriveWidth / UNL.overdrive.type1.max()) + "px";
    overdriveType1ProgressBarActive.style.width = w1;
    overdriveType1ProgressBar.style.width = w1;
    
    let w2 = (UNL.overdrive.type2.percent() * overdriveWidth / UNL.overdrive.type2.max()) + "px";
    overdriveType2ProgressBarActive.style.width = w2;
    overdriveType2ProgressBar.style.width = w2;

    let w3 = (UNL.overdrive.type3.percent() * overdriveWidth / UNL.overdrive.type3.max()) + "px";
    overdriveType3ProgressBarActive.style.width = w3;
    overdriveType3ProgressBar.style.width = w3;

    shardUnlock1.style.width = UNL.shard.second.percent() + "%";
    shardUnlock2.style.width = UNL.shard.click.percent() + "%";
    shardUnlock3.style.width = UNL.shard.buyables.percent() + "%";
    shardUnlock4.style.width = UNL.shard.singles.percent() + "%";

    superCrystalBar.style.clipPath = `inset(${100 - UNL.supercrystal.pour() / 1.05}% 0 0 0)`;
}

function setupOverdriveButton(baseId, typeObj, activeBarId, consumeCurrency, type) {
    const baseEl = document.getElementById(baseId);
    const activeBarEl = document.getElementById(activeBarId);
    if (!baseEl || !activeBarEl) return;

    baseEl.addEventListener("click", () => {
        activateOverdrive(baseId, typeObj, activeBarId, consumeCurrency, type)
    });
}

function activateOverdrive(baseId, typeObj, activeBarId, consumeCurrency, type) {
    const baseEl = document.getElementById(baseId);
    const activeBarEl = document.getElementById(activeBarId);
    typeObj.activate = !typeObj.activate;
    if (typeObj.activate) {
        typeObj.blink = setInterval(() => {
            activeBarEl.style.opacity = activeBarEl.style.opacity == 1 ? 0 : 1;
        }, 500);
        typeObj.interval = setInterval(() => {
            if (player[consumeCurrency].currency >= typeObj.cost() && typeObj.percent() !== typeObj.max()) {
                let sub = player[consumeCurrency].currency / 100;
                player.overdrive.consumed[type] += sub;
                player[consumeCurrency].currency -= sub;
            }
        }, 50);
    } else {
        clearInterval(typeObj.interval);
        clearInterval(typeObj.blink);
        activeBarEl.style.opacity = 0;
    }
}

setupOverdriveButton('overdriveType1ProgressBarBase', UNL.overdrive.type1, 'overdriveType1ProgressBarActive', 'coin', 'type1');
setupOverdriveButton('overdriveType2ProgressBarBase', UNL.overdrive.type2, 'overdriveType2ProgressBarActive', 'prestige', 'type2');
setupOverdriveButton('overdriveType3ProgressBarBase', UNL.overdrive.type3, 'overdriveType3ProgressBarActive', 'supercoin', 'type3');

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
    let total_currency = player.reflash.algo.includes(21) ? player.supercrystal.total_currency - 3 : player.supercrystal.total_currency;
    let sub = Math.min(player.supercrystal.consumedShards * Math.pow(1.337, total_currency), player.supercrystal.consumedShards, (UNL.supercrystal.cost() - player.supercrystal.consumedShards));
    
    if (UNL.supercrystal.cost() == 1.7e308) return false;

    if (player.shard.currency >= sub) {
        sub = Math.min(100 + player.supercrystal.consumedShards * Math.pow(1.337, total_currency), player.shard.currency, (UNL.supercrystal.cost() - player.supercrystal.consumedShards));
        player.shard.currency -= sub;
        player.supercrystal.consumedShards += sub;
        
        if (UNL.supercrystal.pour() >= 100) {
            player.shard.currency += player.supercrystal.consumedShards - UNL.supercrystal.cost();
            player.supercrystal.consumedShards = 0;
            player.supercrystal.currency++;
            player.supercrystal.total_currency++;
            
            if (typeof superCrystalPour !== 'undefined' && superCrystalPour) {
                superCrystalPour.innerHTML = UNL.supercrystal.pour() + '%';
            }
            return true;
        }
    }
    return false;
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
bindHoldButton(
    'superCrystalBarBase', 
    () => startSuperCrystalGen(), 
    () => stopSuperCrystalGen()
);

function startSuperCrystalGen() {
    if (UNL.supercrystal.interval) return; 
    
    UNL.supercrystal.interval = setInterval(() => {
        fillTheProgressBar2();
    }, 50);
}

function stopSuperCrystalGen() {
    if (UNL.supercrystal.interval) {
        clearInterval(UNL.supercrystal.interval);
        UNL.supercrystal.interval = '';
    }
}


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
    if (player.cosmetics.fonts.current === 'option11') { return 0 }
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

    if (!coinGain.dataset.enterHandler) {
        coinGain.dataset.enterHandler = '1';
        coinGain.addEventListener("keydown", (evt) => { if (evt.key === "Enter") evt.preventDefault(); });
    }
    
    player.clicks.real++; player.clicks.prestige++; GAIN.clicksPerSecond++; 
    if (player.virus.activated && player.virus.type == 1) player.virus.current++
    if (player.event.digitalization.activated) {
        if (!player.event.digitalization.quests.daily.completed.includes(1)) player.event.digitalization.quests.daily.progress[0]++
        if (!player.event.digitalization.quests.weekly.completed.includes(1)) player.event.digitalization.quests.weekly.progress[0]++  
        if (!player.event.digitalization.quests.daily.completed.includes(4)) {
            let randomNum = randomNumber(1, 20)
            if (randomNum == 1) {
                player.event.digitalization.quests.daily.progress[3]++
                player.event.digitalization.pass_points++
                spawnFloatingText(e, "+" + '1', false, 'spiritText');
            }
        }
    }
    
    
    for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
        player.clicks.simulated++;
        let gain = GAIN.coin.click.effect();
        let getCrit = false, getSuper = false;
        
        if (GAIN.critical.get()) {
            gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++;
            player.supercoin.currency += UPGS.shop.permanent[5].effect();
            player.supercoin.total_currency += UPGS.shop.permanent[5].effect();
            player.supercoin.this_reflash_currency += UPGS.shop.permanent[5].effect()
        }
        if (GAIN.supercoin.get()) getSuper = true;
        if (getCrit && getSuper && !ACHS.has(37)) ACHS.unl(37);
        
        player.coin.currency += gain * 1;
        player.coin.total_currency += gain * 1;
        player.coin.this_reflash_currency += gain * 1
        if (player.coin.currency > 1.79e308) player.coin.currency = 1.79e308;
        if (player.coin.total_currency > 1.79e308) player.coin.total_currency = 1.79e308;
        if (player.coin.this_reflash_currency > 1.79e308) player.coin.this_reflash_currency = 1.79e308;
        
        // Спавним текст
        spawnFloatingText(e, "+" + formatNumber(gain), getCrit, 'myMessage');

        if (getSuper) {
            let scGain = GAIN.supercoin.gain();
            player.supercoin.currency += scGain;
            player.supercoin.total_currency += scGain;
            player.supercoin.this_reflash_currency += scGain;
            spawnFloatingText(e, "+" + formatNumber(scGain), false, 'superCoinText');
        }
    }
}

function getShardPerClick(e) {
    if (GAIN.clicksPerSecond >= 10 || !player.shard.unlockables.includes(2)) return;
    
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
    ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab', 'challengeTab', 'reflashTab'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    argument.style.display = isFlex ? "flex" : "block";
    document.getElementsByClassName('mainSettings')[0].style.display = (argument === mainTab) ? "flex" : "none";
    document.getElementsByClassName('mainSettings')[3].style.display = (argument === prestigeTab) ? "flex" : "none";
    document.getElementsByClassName('mainSettings')[2].style.display = (argument === prestigeTab) ? "flex" : "none";
    document.getElementsByClassName('mainSettings')[1].style.display = (argument === prestigeTab) ? "flex" : "none";
}

function selectSubTab(argument, isFlex, mainTabType) {
    const tabsMap = {
        settings: ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab', 'settingsCosmeticsTab' ],
        clicker: ['coinsTab', 'overdriveTab'],
        info: ['aboutGameTab', 'statisticsTab', 'multipliersTab', 'challengesTimeTab', 'recentPrestigesTab', 'softcapsTab'],
        prestige: ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab', 'superCrystalsTab', 'mineralsTab', 'breakPrestigeTab', 'fortuneTab', 'balanceTab'],
        achievements: ['achScreenDescription', 'shardAchsTab', 'treasureTab'],
        challenge: ['challengeCoinTab', 'challengePrestigeTab'],
        reflash: ['reflashUpgradesTab', 'acceleratorTab', 'algorithmTab', 'computerTab', 'autoMechanismsTab']
    };
    (tabsMap[mainTabType] || []).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    argument.style.display = isFlex ? "flex" : "block";

    if (argument.id === 'reflashTreeTab' || argument.id === 'acceleratorTab') {
        requestAnimationFrame(() => {
            drawTreeLines();
        });
    }
    
    document.getElementsByClassName('mainSettings')[0].style.display = (argument === coinsTab) ? "flex" : "none";
    document.getElementsByClassName('mainSettings')[3].style.display = (argument === balanceTab) ? "flex" : "none";
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
function gameLoreOpen() { bookWindow.style.display = "flex"; myPopupBackdrop1.style.display = "flex"; toggleBadges(['badge-settings-2', 'badge-misc-2', 'badge-lore'], false)}
function howToPlayOpen() { gameHelpWindow.style.display = "flex"; myPopupBackdrop1.style.display = "flex"; toggleBadges(['badge-settings-1', 'badge-misc-1', 'badge-h2p'], false)}

function openWindow(arg, isFlex, number) {
    ['confirmationButtons', 'whichCode', 'dailyDesc', 'breakCrystal', 'brokeCrystals', 'falseBrokeCrystals', 'welcomeToDigitalGod', 'chooseSaveDiv', 'reflashConfirmation', 'presetEditor', 'treasureDetails', 'mineralsAutomationEditor', 'itemsAutomationEditor' ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    windowGame.removeAttribute('style');
    windowGame.style.display = isFlex ? "flex" : "block";
    windowTitleDiv.style.display = 'none'; windowTitle2.innerHTML = '';
    
    
    if (arg === 'hardReset' || arg === 'gotNaNed') {
        confirmationButtons.style.display = "flex"; windowTitleDiv.style.display = 'block';
        yesHR.style.display = "none"; yesRP.style.display = "none";
        if (arg === 'hardReset') { windowTitle2.innerHTML = text.window.hard; windowTitle2.style.fontSize = 'calc(24px * var(--font-scale))'; yesHR.style.display = "block"; }
        else { windowTitle2.innerHTML = text.window.NaN; windowTitle2.style.fontSize = 'calc(14px * var(--font-scale))'; yesRP.style.display = "block"; }
    } else {
        const map = { 'code': whichCode, 'daily': dailyDesc, 'break': breakCrystal, 'submit': brokeCrystals, 'falseSubmit': falseBrokeCrystals, 'welcome': welcomeToDigitalGod, 'chooseSave': chooseSaveDiv, 'reflashConfirm': reflashConfirmation, 'presetEditor': presetEditor, 'treasureDetails': treasureDetails, 'mineralsAutomationEditor': mineralsAutomationEditor, 'itemsAutomationEditor': itemsAutomationEditor };
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
        case 'presetEditor':
            windowGame.style.height = '320px'
            player.reflash.selectedPreset = number;
            document.getElementById('presetName').innerText = player.reflash.presets[number].name;
            document.getElementById('nodeOrderInput').value = player.reflash.presets[number].ids.join(', ');
            break;
        case 'mineralsAutomationEditor':
            windowGame.style.height = '650px'
            windowGame.style.width = '750px'
            break;
        case 'itemsAutomationEditor':
            windowGame.style.height = '700px'
            windowGame.style.width = '750px'
            break;
        case 'reflashConfirm':
            windowGame.style.height = '400px'
            windowGame.style.width = '500px'
            windowGame.style.fontSize = 'calc(16px * var(--font-scale))'
            break;
        case 'treasureDetails':
            let i = number
            windowGame.style.maxHeight = '500px'
            windowGame.style.maxWidth = '800px'
            windowGame.style.height = '60vh'
            windowGame.style.width = '90vw'
            document.getElementById('treasureIconBig').style.backgroundImage = `url("javascript/cssfiles/images/treasure/event_treasure_${i}.png")`
            document.getElementById('treasureDetailsName').textContent = i18next.t(`eventTreasure.${i}.name`)
            document.getElementById('treasureDetailsPermEffect').textContent = i18next.t(`eventTreasure.${i}.effect.permanent`)
            document.getElementById('treasureDetailsTempEffect').textContent = i18next.t(`eventTreasure.${i}.effect.temporary`)
            document.getElementById('treasureDescriptionText').textContent = i18next.t(`eventTreasure.${i}.desc`)
            document.getElementById('treasureDescriptionDate').textContent = i18next.t(`eventTreasure.date`) + player.treasure.digitalization[i].date
            break;
        default:
            break;
    }
    myPopupBackdrop1.style.display = "flex";
}

function hidePopup() {
    [changelogWindow, bookWindow, gameHelpWindow, windowGame, myPopupBackdrop1, myPopupBackdrop2, offlineGainWindow, reflashConfirmation].forEach(el => {
        if (el) el.style.display = "none";
    });
    showChangelog(text.changelog.start); showHelpPage(text.help.start, text.empty);
}

function hidePopupSub() {
    [paperWindow, myPopupBackdropSub].forEach(el => {
        if (el) el.style.display = "none";
    });
}

myPopupBackdrop1.addEventListener("click", hidePopup);
myPopupBackdropSub.addEventListener("click", hidePopupSub);

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
    option13: { name: 'SaiyanSans', scale: 1.1 }, option14: { name: 'bit', scale: 1.25 }
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
    player.cosmetics.fonts.current = val;
}
function changeFonts(option) { applyFont(option.value, false); }
function changeFonts2(optionVal) { applyFont(optionVal, true); }


function muteTheAudio() {
    player.settings.mutedAudio = !player.settings.mutedAudio;
    player.settings.isMuted = player.settings.mutedAudio ? 'yes' : 'no';
    if (player.cosmetics.fonts.current  === 'option7' && !player.settings.mutedAudio) setTimeout(playSong1, 1000);
    else { THEMEOFTHEGREAT.currentTime = 0; THEMEOFTHEGREAT.pause(); }
}

function switchConfirmation() {
    player.settings.confirmations.reflash = !player.settings.confirmations.reflash;
}

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
function tooltipGeneration() {
    const tooltipElements = document.querySelectorAll('.ach, .shopButton, .mineralButton, .coinUpgradeButton, .acceleratorUpgrade, .eventTreasure, .computerComponentContainer');
    tooltipElements.forEach(el => {
        const tooltip = document.getElementById('tooltip-' + el.id);
        if (!tooltip) return;
        const popperInstance = Popper.createPopper(el, tooltip, { modifiers: [{ name: 'offset', options: { offset: [0, 8] } }], placement: 'top' });
        
        ['mouseenter', 'focus'].forEach(evt => el.addEventListener(evt, () => { tooltip.setAttribute('data-show', ''); popperInstance.update(); }));
        ['mouseleave', 'blur'].forEach(evt => el.addEventListener(evt, () => tooltip.removeAttribute('data-show')));
    });
}

function separateTooltipGeneration() {
    const tooltipElementIds = ['bitsCount'];
    tooltipElementIds.forEach(id => {
        const el = document.getElementById(id);
        const tooltip = document.getElementById('tooltip-' + id);
        if (!el || !tooltip) return;
        const popperInstance = Popper.createPopper(el, tooltip, { 
            modifiers: [{ name: 'offset', options: { offset: [0, 8] } }], 
            placement: 'bottom' 
        });
        ['mouseenter', 'focus'].forEach(evt => {
            el.addEventListener(evt, () => { 
                tooltip.setAttribute('data-show', ''); 
                popperInstance.update(); 
            });
        });
        ['mouseleave', 'blur'].forEach(evt => {
            el.addEventListener(evt, () => {
                tooltip.removeAttribute('data-show');
            });
        });
    });
}  
  // Если следующий индекс 0 — значит, текущая фраза была последней