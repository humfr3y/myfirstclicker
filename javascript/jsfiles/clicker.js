const GAIN = {
    coin: {
        click: {
            no_softcap_effect() {
                let effect = new Decimal("1");
                [
                    [player.coin.upgrades[3], UPGS.coin.buyables[3].effect()],
                    [player.shop.upgrades[1], UPGS.shop.buyables[1].effect()],
                    [player.coin.singleUpgrades.includes(12), UPGS.coin.singles[12].effect()],
                    [player.coin.singleUpgrades.includes(23), UPGS.coin.singles[23].effect()],
                    [GAIN.coin.gain.effect(), GAIN.coin.gain.effect()]
                ].forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                if (player.challenge.activated === 0) {
                    if (player.challenge.completed.includes(6)) effect = effect.mul(CHALL[6].effect());
                } else {
                    switch (player.challenge.activated) {
                        case 3: effect = effect.div(100000); break;
                        case 4: effect = effect.sqrt(); break;
                        case 6:
                            effect = effect.pow(0.8);
                            effect.mul(new Decimal(1 + MISC.amount_of_upgrades.coin()).pow(new Decimal("1.00185").pow(player.clicks.prestige)));
                            break;
                        case 7:
                            effect = MISC.amount_of_upgrades.coin() < 50
                                ? effect.pow(1 - MISC.amount_of_upgrades.coin() / 50)
                                : 0;
                            break;
                        case 8: effect = effect.div(CHALL.virusCoins_gen()); break;
                        case 12:
                            effect = effect.pow(0.01).mul(GAIN.umultiplier.effect()).pow(GAIN.upower.effect());
                            break;
                    }
                }
                if (player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) {
                    effect = effect.div(100000)
                    effect = effect.sqrt()
                    effect = effect.pow(0.8);
                    effect.mul(new Decimal(1 + MISC.amount_of_upgrades.coin()).pow(new Decimal("1.00185").pow(player.clicks.prestige)));
                }
                if (player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
                    effect = MISC.amount_of_upgrades.coin() < 50
                        ? effect.pow(1 - MISC.amount_of_upgrades.coin() / 50)
                        : 0;
                    effect = effect.div(CHALL.virusCoins_gen());
                    effect = effect.pow(0.01).mul(GAIN.umultiplier.effect()).pow(GAIN.upower.effect());
                    }
                if (player.challenge.completed.includes(1)) effect = effect.pow(CHALL[1].effect());
                if (player.prestige.challenge.activated != 0) effect = effect.pow(0.5)
                if (player.prestige.challenge.activated == 8) effect = effect.pow(0.25)
                return effect
            },
            effect() {
                const { softcap_start, softcap_power } = this.softcap();
                return softCapDecimal(this.no_softcap_effect(), softcap_start, softcap_power);
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4;
                if ((player.challenge.activated !== 0 && player.challenge.activated === 9) || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
                    softcap_start = 1e8;
                    softcap_power *= softcap_power;
                } 
                if (player.challenge.completed.includes(8)) {
                    softcap_start *= CHALL[9].effect();
                }
                softcap_start *= UPGS.minerals[2].effect2();
                return { softcap_start, softcap_power };
            }
        },
        second: {
            no_softcap_effect() {
                let effect = new Decimal(UPGS.coin.buyables[1].effect());
                [
                    [player.coin.upgrades[4], UPGS.coin.buyables[4].effect()],
                    [player.shop.upgrades[2], UPGS.shop.buyables[2].effect()],
                    [player.coin.singleUpgrades.includes(11), UPGS.coin.singles[11].effect()],
                    [player.coin.singleUpgrades.includes(21), UPGS.coin.singles[21].effect()],
                    [ACHS.has(15), (1 + 0.0001 * player.clicks.simulated)],
                    [GAIN.coin.gain.effect(), GAIN.coin.gain.effect()]
                ].forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                if (player.challenge.activated === 0) {
                    if (player.challenge.completed.includes(3)) effect = effect.mul(CHALL[3].effect());
                } else {
                    switch (player.challenge.activated) {
                        case 4: effect = effect.sqrt(); break;
                        case 7:
                            effect = MISC.amount_of_upgrades.coin() < 50
                                ? effect.pow(1 - MISC.amount_of_upgrades.coin() / 50)
                                : 0;
                            break;
                        case 8: effect = effect.div(CHALL.virusCoins_gen()); break;
                        case 12:
                            effect = effect.pow(0.01).mul(GAIN.umultiplier.effect()).pow(GAIN.upower.effect());
                            break;
                    }
                }
                if (player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) {
                    effect = effect.sqrt()
                }
                if (player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
                    effect = MISC.amount_of_upgrades.coin() < 50
                        ? effect.pow(1 - MISC.amount_of_upgrades.coin() / 50)
                        : 0;
                    effect = effect.div(CHALL.virusCoins_gen());
                    effect = effect.pow(0.01).mul(GAIN.umultiplier.effect()).pow(GAIN.upower.effect());
                    }
                if (player.challenge.activated === 0 && player.challenge.completed.includes(8)) effect = effect.mul(CHALL[8].effect());
                if (player.prestige.challenge.activated != 0) effect = effect.pow(0.5);
                if ([3, 8].includes(player.challenge.activated)) effect = 0;
                if ([2, 7].includes(player.prestige.challenge.activated)) effect = 0;
                if (player.prestige.challenge.activated == 8) effect = effect.pow(0.25)
                return effect
            },
            effect() {
                const { softcap_start, softcap_power } = this.softcap();
                return softCapDecimal(this.no_softcap_effect(), softcap_start, softcap_power);
            },
            softcap() {
                let softcap_start = 1e13;
                let softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5;
                if ((player.challenge.activated !== 0 && player.challenge.activated === 9) || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
                    softcap_start = 1e8;
                    softcap_power *= softcap_power;
                } 
                if (player.challenge.completed.includes(8)) {
                    softcap_start *= CHALL[9].effect();
                }
                softcap_start *= UPGS.minerals[2].effect2();
                return { softcap_start, softcap_power };
            }
        },
        gain: {
            no_softcap_effect() {
                let effect = new Decimal("1");
                if (player.coin.upgrades[5]) effect = effect.add(UPGS.coin.buyables[5].effect());
                [
                    [player.shop.upgrades[3], UPGS.shop.buyables[3].effect()],
                    [player.coin.singleUpgrades.includes(13), UPGS.coin.singles[13].effect()],
                    [player.coin.singleUpgrades.includes(22), UPGS.coin.singles[22].effect()],
                    [ACHS.effect.coin(), ACHS.effect.coin()],
                    [ACHS.has(28), 4],
                    [GAIN.umultiplier.effect(), GAIN.umultiplier.effect()],
                    [UNL.overdrive.type1.effect(), UNL.overdrive.type1.effect()],
                    [UPGS.minerals[2].effect1(), UPGS.minerals[2].effect1()],
                    [UPGS.prestige.singles[31].unl(), UPGS.prestige.singles[31].effect()],
                    [UPGS.prestige.singles[32].unl(), UPGS.prestige.singles[32].effect()],
                    [GAIN.shard.effect.effect(), GAIN.shard.effect.effect()],
                    [player.shard.achievements[1], UNL.shard_achievements[1].effect()],
                    [player.fortune.activatedBoosts[1].activated, UPGS.fortune.boosts[1].effect()],
                    [player.balance.coins.plus, MISC.balance.plusCoins.buff().coinBuff],
                    [PRES_CHALLENGE[7].completed(), PRES_CHALLENGE[7].effect().effect1]
                ].forEach(([cond, val]) => { if (cond) effect = effect.mul(val); });

                if (PRES_CHALLENGE[7].completed() && player.prestige.challenge.activated == 8) effect = effect.mul(PRES_CHALLENGE[7].effect().effect2)
                if (player.balance.coins.minus) effect = effect.div(MISC.balance.minusCoins.nerf().coinNerf)

                if (GAIN.upower.effect()) effect = effect.pow(GAIN.upower.effect());
                if (UPGS.prestige.singles[12].unl()) effect = effect.pow(UPGS.prestige.singles[12].effect());

                return effect
            },
            effect() {
                const { softcap_start, softcap_power } = this.softcap();
                return softCapDecimal(this.no_softcap_effect(), softcap_start, softcap_power);
            },
            softcap() {
                let softcap_start = 1e20
                if (player.balance.upgrades.singles.includes(11)) softcap_start = softcap_start * MISC.balance.plusCoins.buff().coinGainSoftcapPusher 
                if (player.balance.upgrades.singles.includes(12)) softcap_start = softcap_start * MISC.balance.minusCoins.nerf().coinGainSoftcapPuller
                softcap_start = Math.max(softcap_start, 1)
                return { softcap_start, softcap_power: 1 };
            }
        },
        offline(x = GAIN.coin.second.effect(), y = MISC.offline()) {
            return x * y;
        }
    },
    shard: {
        click() {
            let effect = 1;
            [
                [player.shard.upgrades[1], UPGS.shard.buyables[1].effect()],
                [player.shop.upgrades[5], UPGS.shop.buyables[5].effect()],
                [UPGS.supercrystal[33].unl(), UPGS.supercrystal[33].effect()],
                [player.fortune.activatedBoosts[3].activated, UPGS.fortune.boosts[3].effect()],
                [player.prestige.challenge.completed.includes(4), PRES_CHALLENGE[4].effect()]
            ].forEach(([cond, val]) => { if (cond) effect *= val; });
            return effect;
        },
        second() {
            if (!UNL.shard.second.unl()) return 0;
            let effect = 1;
            [
                [player.shard.upgrades[2], UPGS.shard.buyables[2].effect()],
                [player.shop.upgrades[5], UPGS.shop.buyables[5].effect()],
                [player.minerals[3], UPGS.minerals[3].effect2()],
                [ACHS.has(39), 1.337],
                [ACHS.effect.shard(), ACHS.effect.shard()],
                [player.shard.achievements[4], UNL.shard_achievements[4].effect()],
                [player.fortune.activatedBoosts[3].activated, UPGS.fortune.boosts[3].effect()],
                [player.prestige.challenge.completed.includes(4), PRES_CHALLENGE[4].effect()]
            ].forEach(([cond, val]) => { if (cond) effect *= val; });
            return effect;
        },
        offline(x = GAIN.shard.second(), y = MISC.offline()) {
            return UNL.shard.second.unl() ? x * y : 0;
        },
        effect: {
            no_softcap_effect() {
                let effect = new Decimal("1");
                effect = effect.add(player.shard.currency / 100);
                if (ACHS.has(30)) effect = effect.mul(1 + Math.pow(player.prestige.resets, 0.3));
                if (player.shard.singleUpgrades.includes(21)) effect = effect.pow(UPGS.shard.singles[21].effect())

                if (player.challenge.activated != 0) {
                    effect = effect.sqrt().sqrt();
                    switch (player.challenge.activated) {
                        case 2: effect = Decimal("0.01"); break;
                        case 5:
                        case 6:
                        case 7:
                        case 10: effect = effect.sqrt(effect); break;
                        case 8: effect = effect.pow(0.25); break;
                        case 12: effect = effect.pow(0.02); break;
                    }
                }
                if (player.prestige.challenge.activated != 0) {
                    effect = effect.pow(0.1);
                }
                if (player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) {
                    effect = Decimal("0.01")
                    effect = effect.sqrt()
                    effect = effect.sqrt()
                }
                if (player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) {
                    effect = effect.sqrt()
                    effect = effect.pow(0.25)
                    effect = effect.pow(0.02)
                }
                if (player.prestige.challenge.activated == 8) effect = effect.pow(0.01)
                return effect;
            },
            effect() {
                const challenge_reward = player.challenge.completed.includes(7) && player.challenge.activated == 0 ? CHALL[7].effect() : 1;
                const { softcap_start, softcap_power } = this.softcap();
                return softCapDecimal(this.no_softcap_effect(), softcap_start, softcap_power) * challenge_reward;
            },
            softcap() {
                let softcap_start = player.supercrystal.upgrades.includes(23) ? 1e15 : 1e12;
                let softcap_power = UPGS.shop.permanent[6].effect();
                return { softcap_start, softcap_power };
            }
        },
        min() {
            return UPGS.shard.buyables[3].effect().min;
        },
        max() {
            return 50 * UPGS.shard.buyables[3].effect().max;
        },
        break_crystal(x = howMuchCrystalsInput.value) {
            let gain = 0, temp = 0, parsed_x = x.includes('e') ? convert(x) : parseInt(parseFloat(x)), broken_crystals = parsed_x;
            if (x.includes('%')) {
                temp = Math.floor(player.prestige.currency - (player.prestige.currency * (parsed_x / 100)));
                broken_crystals = player.prestige.currency - temp;
                player.prestige.currency = Math.floor(temp);
            } else {
                broken_crystals = parsed_x;
                player.prestige.currency -= parsed_x;
            }
            if (broken_crystals < 1e6) {
                for (let i = 0; i < broken_crystals; i++) {
                    gain += randomNumber(this.min(), this.max());
                    if (player.shard.currency == 0) gain = 100;
                }
            } else {
                gain = ((this.min() + this.max()) / 2) * broken_crystals;
            }
            if (UPGS.supercrystal[33].unl()) gain *= UPGS.supercrystal[33].effect();
            if (player.fortune.activatedBoosts[3].activated) gain *= UPGS.fortune.boosts[3].effect()
            if (player.prestige.challenge.completed.includes(4)) gain *= PRES_CHALLENGE[4].effect()
            return { gain, broken_crystals };
        }
    },
    crystal: {
        offline(x = GAIN.crystal.offline_calc(), y = MISC.offline(), z = ACHS.has(22)) {
            let time = y / (7200 / UPGS.prestige.buyables[2].effect()), gain = x * time;
            if (player.prestige.super.buyables[3]) gain *= UPGS.prestige.super.buyables[3].effect();
            return z ? softCap(gain, this.softcap().softcap_start, this.softcap().softcap_power) : 0;
        },
        no_softcap_reset() {
            let gain = 1;
            [
                [player.prestige.super.singles.includes(25), Math.pow(1.1 + UPGS.prestige.super.buyables[1].effect(), Math.log10((player.coin.currency + 10) / 1e15))],
                [player.prestige.upgrades[1], UPGS.prestige.buyables[1].effect()],
                [ACHS.has(28), 4],
                [player.shard.singleUpgrades.includes(11), UPGS.shard.singles[11].effect()],
                [player.shop.permanentUpgrades[1], UPGS.shop.permanent[1].effect()],
                [UNL.overdrive.type2.unl(), UNL.overdrive.type2.effect()],
                [player.minerals[3], UPGS.minerals[3].effect1()],
                [player.challenge.completed.includes(10) && player.challenge.activated == 0, CHALL[10].effect()],
                [player.supercrystal.upgrades.includes(12), 3],
                [player.coin.superUpgrades.includes(35), ACHS.effect.crystal()],
                [player.prestige.super.singles.includes(11), UPGS.prestige.super.singles[11].effect()],
                [player.shard.achievements[3], UNL.shard_achievements[3].effect()],
                [player.fortune.activatedBoosts[2].activated, UPGS.fortune.boosts[2].effect()],
                [player.balance.coins.minus, MISC.balance.minusCoins.buff().crystalGainBuff],
                [player.prestige.challenge.completed.includes(1), 1e6]
            ].forEach(([cond, val]) => { if (cond) gain *= val; });

            if (player.balance.coins.plus) gain /= MISC.balance.plusCoins.nerf().crystalGainNerf
            return gain;
        },
        reset() {
            const gain = this.no_softcap_reset();
            return softCap(gain, this.softcap().softcap_start, this.softcap().softcap_power);
        },
        offline_calc() {
            return player.prestige.super.singles.includes(25)
                ? GAIN.crystal.no_softcap_reset() / Math.pow(1.35 + UPGS.prestige.super.buyables[1].effect(), Math.log10((player.coin.currency + 10) / 1e15))
                : GAIN.crystal.no_softcap_reset();
        },
        softcap() {
            let addition = player.balance.upgrades.singles.includes(12) ? MISC.balance.minusCoins.buff().crystalSoftcapSofter : 0
            let substract = player.balance.upgrades.singles.includes(11) ? MISC.balance.plusCoins.nerf().crystalSoftcapHarsher : 0
            let pusher = player.balance.upgrades.singles.includes(32) ? MISC.balance.minusCoins.buff().crystalSoftcapPusher : 1
            const softcap_start = 1e50 * pusher
            const softcap_power = player.prestige.currency < 1e50 ? 1 :Math.max((1 - ((Math.log10(this.no_softcap_reset()) - 50 - Math.log(pusher)) / 100)) - substract + addition, 0.3 - substract + addition)
            return { softcap_start, softcap_power };
        }
    },
    prestige: {
        offline(y = MISC.offline()) {
            if (!MILESTONES.has(16)) return 0;
            let gain = y / 60, formula = 60 / player.time.real.fastestPrestige.timer;
            if (formula) gain *= formula * 2.11;
            [
                [ACHS.has(35), 1 + MISC.amount_of_upgrades.super() / 100],
                [player.prestige.super.singles.includes(13), UPGS.prestige.super.singles[13].effect()],
                [player.shop.upgrades[6], UPGS.shop.buyables[6].effect()],
                [player.shard.achievements[7], UNL.shard_achievements[7].effect()]
            ].forEach(([cond, val]) => { if (cond) gain *= val; });
            return gain;
        },
        reset() {
            let gain = MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency + 10) - 14) : 1;
            [
                [ACHS.has(35), 1 + MISC.amount_of_upgrades.super() / 100],
                [player.prestige.super.singles.includes(13), UPGS.prestige.super.singles[13].effect()],
                [player.shop.upgrades[6], UPGS.shop.buyables[6].effect()],
                [player.shard.achievements[7], UNL.shard_achievements[7].effect()],
                [player.fortune.upgrades.singles.includes(22), 2]
            ].forEach(([cond, val]) => { if (cond) gain *= val; });
            return Math.floor(gain);
        }
    },
    supercoin: {
        offline(x = GAIN.supercoin.chance(), y = MISC.offline()) {
            return Math.floor(y / (1000 / x));
        },
        chance() {
            let chance = 1;
            [
                [player.shop.upgrades[4], UPGS.shop.buyables[4].effect()],
                [player.coin.superUpgrades.includes(23), UPGS.coin.singles[13].effect_super()],
                [player.prestige.singleUpgrades.includes(13), UPGS.prestige.singles[13].effect()],
                [player.supercrystal.upgrades.includes(11), Math.pow(1.5, UPGS.supercrystal[11].unl())],
                [player.minerals[1], UPGS.minerals[1].effect3()],
                [player.prestige.super.singles.includes(12), UPGS.prestige.super.singles[12].effect()],
                [player.shard.achievements[2], UNL.shard_achievements[2].effect()],
                [player.fortune.activatedBoosts[4].activated, UPGS.fortune.boosts[4].effect()],
                [player.balance.upgrades.singles.includes(31), MISC.balance.plusCoins.buff().chanceBuffer],
            ].forEach(([cond, val]) => { if (cond) chance *= val; });
            if (ACHS.has(37)) chance += 1;
            return chance;
        },
        get() {
            return randomNumber(0, (100 / this.chance()) - 1) == 0;
        },
        gain() {
            let gain = 1;
            if (ACHS.has(44)) gain *= 2;
            return gain;
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
        }
    },
    critical: {
        baseMult: 2,
        baseChance: 1,
        multiplier() {
            let effect = GAIN.critical.baseMult;
            [
                [player.supercrystal.upgrades.includes(22), 5],
                [player.shop.permanentUpgrades[4], UPGS.shop.permanent[4].effect()],
                [player.minerals, UPGS.minerals[1].effect2()],
                [player.coin.superUpgrades.includes(13), UPGS.coin.buyables[3].effect_super()],
                [player.shard.achievements[9], UNL.shard_achievements[9].effect()],
                [player.fortune.activatedBoosts[6].activated, UPGS.fortune.boosts[6].effect()]
            ].forEach(([cond, val]) => { if (cond) effect *= val; });
            if (player.prestige.challenge.activated == 8) effect = Math.pow(effect, 0.1)
            return effect;
        },
        chance: {
            additive() {
                let effect = GAIN.critical.baseChance;
                [
                    [player.supercrystal.upgrades.includes(21), 2],
                    [player.shop.permanentUpgrades[3], UPGS.shop.permanent[3].effect()]
                ].forEach(([cond, val]) => { if (cond) effect += val; });
                return effect;
            },
            multiplicative() {
                let effect = this.additive();
                [
                    [player.minerals, UPGS.minerals[1].effect1()],
                    [player.shard.achievements[8], UNL.shard_achievements[8].effect()],
                    [player.fortune.activatedBoosts[5].activated, UPGS.fortune.boosts[5].effect()],
                    [player.balance.upgrades.singles.includes(31), MISC.balance.plusCoins.buff().chanceBuffer],
                ].forEach(([cond, val]) => { if (cond) effect *= val; });
                return effect;
            }
        },
        get() {
            return randomNumber(0, (100 / this.chance.multiplicative()) - 1) == 0;
        },
        gain(x) {
            return x * this.multiplier();
        }
    },
    simulation: {
        multiplier() {
            let effect = 1;
            if (player.supercrystal.upgrades.includes(13)) effect *= 2;
            if (player.fortune.activatedBoosts[10].activated) effect *= UPGS.fortune.boosts[10].effect()
            return effect;
        }
    },
    umultiplier: {
        base() {
            let base = 2;
            if (player.prestige.singleUpgrades.includes(14)) base = 2.5;
            if (ACHS.has(42)) base += 0.05;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect()
            if (player.prestige.challenge.completed.includes(2)) base *= PRES_CHALLENGE[2].effect()
            return base;
        },
        effect(x = player.umultipliers) {
            let effect = Math.pow(this.base(), x + MISC.free_upgrade.umultiplier())
            player.challenge.activated != 3
                ? effect
                : effect = Math.sqrt(effect);
            player.prestige.challenge.activated == 8
                ? effect = Math.pow(effect, 0.1)
                : effect;
            return effect
        }
    },
    upower: {
        base() {
            let base = 0.01;
            if (player.prestige.singleUpgrades.includes(24)) base = 0.015;
            if (player.prestige.super.buyables[5]) base += UPGS.prestige.super.buyables[5].effect();
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect()
            return base;
        },
        effect(x = player.upowers) {
            let effect = 1 + (this.base() * (x + MISC.free_upgrade.upower()))
            return player.prestige.challenge.activated == 8 ? Math.pow(effect, 0.1) : effect;
        }
    },
    uadder: {
        base() {
            let base = 1;
            if (ACHS.has(50)) base *= 1.1;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect()
            return base;
        },
        base2(x = player.prestige.super.singles.includes(15)) {
            if (!x) return 0;
            let base = 0.1;
            if (ACHS.has(50)) base *= 1.1;
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect()
            return base;
        },
        effect(x = player.uadders) {
            return player.prestige.challenge.activated == 8 ? Math.pow(this.base()*x, 0.1) : this.base() * x;
        },
        effect2(x = player.uadders) {
            return player.prestige.challenge.activated == 8 ? Math.pow(this.base2()*x, 0.1) : this.base2() * x;
        }
    },
    ureducer: {
        base() {
            let base = 500;
            if (player.prestige.super.singles.includes(14)) base += UPGS.prestige.super.singles[14].effect();
            if (player.fortune.activatedBoosts[11].activated) base *= UPGS.fortune.boosts[11].effect()
            return base;
        },
        effect(x = player.ureducers) {
            let effect = this.base() * x;
            if (player.prestige.challenge.activated == 4 || player.prestige.challenge.activated == 8) effect = Math.pow(effect, 0.1);
            return effect
        }
    },
    offline_gain(y = MISC.offline()) {
        // кэшируем значения, чтобы избежать повторных вычислений
        const coinOffline = this.coin.offline();
        const shardOffline = this.shard.offline();
        const crystalOffline = this.crystal.offline();
        const prestigeOffline = Math.floor(this.prestige.offline());
        const superCoinOffline = this.supercoin.offline();
        const balanceNeutral = this.balance.offline();
        const balanceScales = this.balance.scales_of_balance();
        
        player.coin.currency += coinOffline;
        player.coin.total_currency += coinOffline;
        player.shard.currency += shardOffline;
        player.prestige.currency += crystalOffline;
        player.prestige.total_currency += crystalOffline;
        player.prestige.resets += prestigeOffline;
        player.supercoin.total_currency += superCoinOffline;
        player.supercoin.currency += superCoinOffline;
        player.balance.neutral += balanceNeutral;
        player.balance.scales_of_balance += balanceScales;
        player.time.game.total.timer += y;
        player.time.game.prestige.timer += y;
        player.time.umultiplier += y;
        player.time.upower += y;
        player.time.real.total.timer += UPGS.supercrystal[31].unl() ? y / 5 : y;
        player.time.real.prestige.timer += UPGS.supercrystal[31].unl() ? y / 5 : y;
    },
    offline_gain_time_warp(x) {
        // кэшируем значения для избежания повторных вычислений
        const coinOffline = this.coin.offline(undefined, x);
        const shardOffline = this.shard.offline(undefined, x);
        const crystalOffline = this.crystal.offline(undefined, x);
        const prestigeOffline = this.prestige.offline(x);
        const superCoinOffline = this.supercoin.offline(undefined, x);
        const balanceNeutral = this.balance.offline(undefined, x);
        const balanceScales = this.balance.sob_offline(undefined, x);
        
        player.coin.currency += coinOffline;
        player.coin.total_currency += coinOffline;
        player.shard.currency += shardOffline;
        player.prestige.currency += crystalOffline;
        player.prestige.total_currency += crystalOffline;
        player.prestige.resets += prestigeOffline;
        player.supercoin.currency += superCoinOffline;
        player.supercoin.total_currency += superCoinOffline;
        player.balance.neutral += balanceNeutral;
        player.balance.scales_of_balance += balanceScales;
        player.time.game.total.timer += x;
        player.time.game.prestige.timer += x;
        player.time.umultiplier += x;
        player.time.upower += x;
    },
    balance: {
        generation() {
            if (!player.balance.upgrades.singles.includes(23)) return Math.pow(MISC.balance.scales_of_balance(), 2) * UPGS.balance.buyables[3].effect()
                return (Math.pow(player.balance.scales_of_balance, 2) + Math.pow(MISC.balance.scales_of_balance(), 2)) * UPGS.balance.buyables[3].effect()
        },
        offline(x = GAIN.balance.generation(), y = MISC.offline()) {
            return UNL.display[76].req() ? x * y : 0;
        },
        scales_of_balance() {
            if (!player.balance.upgrades.singles.includes(23)) return 0
            return MISC.balance.scales_of_balance()/2500
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
            unl(x = player.shop.unlockables.includes(1)) {
                return x
            },
            cost() {
                return 1000+Math.pow(10, this.percent())/20*2
            },
            percent() {
                return Math.min(Math.log10(player.overdrive.consumed.type1+1), 100)
            },
            effect() {
                if (this.percent() == 0) return 1
                let eff = 1 + (Math.pow(2, this.percent()/2.75)/2)
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect()
                return eff
            },
            activate: false,
            blink: '',
            interval: ''
        },
        type2: {
            unl(x = player.shop.unlockables.includes(2)) {
                return x
            },
            cost() {
                return 1000+Math.pow(10, this.percent()+8)
            },
            percent() {
                return Math.min(Math.log10((player.overdrive.consumed.type2/1e8)+1), 100)
            },
            effect() {
                if (this.percent() == 0) return 1
                let eff = 1+(Math.pow(10, this.percent()/7.5)/10)
                if (player.shop.upgrades[7]) eff *= UPGS.shop.buyables[7].effect()
                return eff-1.2
            },
            activate: false,
            blink: '',
            interval: ''
        }
    },
    shard: {
        click: {
            cost: 1000,
            interval: '',
            unl(x = player.shard.unlockables.includes(2)) {
                return x
            },
            percent() {
                return Math.min(player.shard.consumed.click/10, 100)
            }
        },
        second: {
            cost: 1000,
            interval: '',
            unl(x = player.shard.unlockables.includes(1)) {
                return x
            },
            percent() {
                return Math.min(player.shard.consumed.second/10, 100)
            }
        },
        buyables: {
            cost: 10000,
            interval: '',
            unl(x = player.shard.unlockables.includes(3)) {
                return x
            },
            percent() {
                return Math.min(player.shard.consumed.buyables/100, 100)
            }
        },
        singles: {
            cost: 100000,
            interval: '',
            unl(x = player.shard.unlockables.includes(4)) {
                return x
            },
            percent() {
                return Math.min(player.shard.consumed.singles/1000, 100)
            }
        },
    },
    supercrystal: {
        pour() { //clipValue
            return Math.max(Math.min(findRatio(player.supercrystal.consumedShards, this.cost()), 100),0)
        },
        cost() {
            let cost = (1e18 * Math.pow(1000, player.supercrystal.total_currency))
            cost /= UPGS.minerals[3].effect3()
            cost /= UPGS.shop.permanent[7].effect()
            PRES_CHALLENGE[6].completed() ? cost /= PRES_CHALLENGE[6].effect() : cost
            return cost
        },
        interval: ''
    },
    rune: {
        cost() {
            return 1e8*Math.pow(10, player.rune.total_currency)
        },
        max_cost(){
            let cost = 1e8*Math.pow(10, player.rune.total_currency)
            let currency = player.prestige.currency 
            let iter = 0
            for (let i = 0; i < 999; i++) {
                if (currency >= cost) {
                    cost = 1e8*Math.pow(10, i+player.rune.total_currency)
                    currency -= cost
                    iter = i
                }
                else break
            }
            return {
                cost, iter
            }
        }
    },
    shard_achievements: {
        unl(x) {
            if ((this[x].current() >= this[x].goal()) && player.shop.unlockables.includes(4)) player.shard.achievements[x]++
        },
        check() {
            for (let i = 1; i <= 10; i++) {
                this.unl(i)
                document.getElementsByClassName('shardAchBar')[i-1].style.clipPath = `inset(0 ${100-this[i].ratio()}% 0 0)`
            }
        },
        1: {
            id: 1,
            current() { return player.coin.total_currency },
            goal(x=player.shard.achievements[this.id]) { return 1e50*Math.pow(1e20, x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(1))) return 1
                let effect = Math.pow(7, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                if (player.prestige.challenge.activated == 8) effect = Math.pow(effect, 0.1)
                return effect
            }
        },
        2: {
            id: 2,
            current() { return player.supercoin.total_currency },
            goal(x=player.shard.achievements[this.id]) { return 1000*Math.pow(2, x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(1))) return 1
                let effect = 1
                if (player.fortune.activatedBoosts[9].activated) {
                    effect = 1 + (x/25) * UNL.shard_achievements[10].effect() * UPGS.fortune.boosts[9].effect()
                }
                else effect = 1 + (x/25) * UNL.shard_achievements[10].effect()
                return effect
            }
        },
        3: {
            id: 3,
            current() { return player.prestige.total_currency },
            goal(x=player.shard.achievements[this.id]) { return 1e10*Math.pow(1e10, x) },
            ratio() { return findRatio(this.current()+0.00001, this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(2))) return 1
                let effect = Math.pow(2.33, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                return effect
            }
        },
        4: {
            id: 4,
            current() { return player.shard.currency },
            goal(x=player.shard.achievements[this.id]) { return 1e25*Math.pow(1e25, x) },
            ratio() { return findRatio(this.current()+0.00001, this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(2))) return 1
                let effect = Math.pow(7, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                return effect
            }
        },
        5: {
            id: 5,
            current() { return player.achievements.length },
            goal(x=player.shard.achievements[this.id]) { return 10+(10*x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(3))) return 1
                let effect = Math.pow(1.85, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                return effect
            }
        },
        6: {
            id: 6,
            current() { return player.time.game.total.days },
            goal(x=player.shard.achievements[this.id]) { return 1*Math.pow(2, x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(3))) return 1
                let effect = 1
                if (player.fortune.activatedBoosts[9].activated) {
                    effect = 1 + (0.002 * x) * UNL.shard_achievements[10].effect() * UPGS.fortune.boosts[9].effect()
                }
                else effect = 1 + (0.002 * x) * UNL.shard_achievements[10].effect()
                return effect
            }
        },
        7: {
            id: 7,
            current() { return player.prestige.resets },
            goal(x=player.shard.achievements[this.id]) { return 1e6*Math.pow(10, x) },
            ratio() { return findRatio(this.current()+0.00001, this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(4))) return 1
                let effect = Math.pow(2.05, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                return effect
            }
        },
        8: {
            id: 8,
            current() { return player.clicks.simulated },
            goal(x=player.shard.achievements[this.id]) { return 1000*Math.pow(2, x) },
            ratio() { return findRatio(this.current()+0.00001, this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(4))) return 1
                let effect = 1
                if (player.fortune.activatedBoosts[9].activated) {
                    effect = 1 + (0.04 * x) * UNL.shard_achievements[10].effect() * UPGS.fortune.boosts[9].effect()
                }
                else effect = 1 + (0.04 * x) * UNL.shard_achievements[10].effect()
                return effect
            }
        },
        9: {
            id: 9,
            current() { return player.clicks.critical },
            goal(x=player.shard.achievements[this.id]) { return 100*Math.pow(2, x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id])  { 
                if (!(player.shop.unlockables.includes(4) && player.shard_achievements.includes(5))) return 1
                let effect = Math.pow(2.2, x) * UNL.shard_achievements[10].effect()
                if (player.fortune.activatedBoosts[9].activated) {
                    effect *= UPGS.fortune.boosts[9].effect()
                }
                return effect
            }
        },
        10: {
            id: 10,
            current() { 
                let number = 0
                for (let i = 1; i <= 10; i++) {
                    number += player.shard.achievements[i]
                }
                return number
            },
            goal(x=player.shard.achievements[this.id]) { return 10+(10*x) },
            ratio() { return findRatio(this.current(), this.goal()) },
            effect(x=player.shard.achievements[this.id]) { return player.shop.unlockables.includes(4) && player.shard_achievements.includes(5) ? Math.pow(1.1, x) : 1}
        },
    },
    display: {
        unl(x, y = 'none') {
            let el = this[x].element
            if (typeof el === 'function') el = el()
            if (!el) return
            if (this[x].req()) el.style.display = this[x].type
            else el.style.display = y
            return el.style.display
        },
        check() {
            for (let i = 1; i <= Object.keys(UNL.display).length-2; i++) {
                if (this[i].type != 'none') this.unl(i)
                else this.unl(i, 'flex') 
            }
        },
        1: {//button in middle
            name: 'buyAll',
            type: 'block',
            element: () => document.getElementById('maxbuy'),
            req() { return ACHS.has(15)},
        },
        2: {//button in top left
            name: 'buyMax',
            type: 'block',
            element: () => document.getElementById('maxOrNoUpgrades'),
            req() { return ACHS.has(15)},
        },
        3: {
            name: 'prestige_reset_button',
            type: 'block',
            element: () => document.getElementById('doPrestige'),
            req() { return ACHS.has(20)},
        },
        4: {
            name: 'crystals_amount',
            type: 'block',
            element: () => document.getElementById('crystalCount'),
            req() { return ACHS.has(21)},
        },
        5: {
            name: 'prestige_tab',
            type: 'block',
            element: () => document.getElementById('prestigeSelect'),
            req() { return ACHS.has(21)},
        },
        // offline: {
        //     element: document.getElementById('offlinePrestigeFarm'),
        //     req() { return ACHS.has(21)},
        //     unl(x = element) { return this.req() ? x.style.display = 'block' : x.style.display = 'none'}
        // },
        6: {
            name: 'prestige_stats',
            type: 'block',
            element: () => document.getElementById('prestigeSection'),
            req() { return ACHS.has(21)},
        },
        7: {
            name: 'prestige_buyables_bulk',
            type: 'flex',
            element: () => document.getElementById('prestigeSpecialRow'),
            req() { return MILESTONES.has(10)},
        },
        8: {
            name: 'single_automation',
            type: 'flex',
            element: () => document.getElementById('singleAutomationContainer'),
            req() { return MILESTONES.has(2)},
        },
        9: {
            name: 'buyable_automation',
            type: 'flex',
            element: () => document.getElementById('buyableAutomationContainer'),
            req() { return MILESTONES.has(3)},
        },
        10: {
            name: 'umultiplier_automation',
            type: 'flex',
            element: () => document.getElementById('umultiplierAutomationContainer'),
            req() { return MILESTONES.has(4)},
        },
        11: {
            name: 'upower_automation',
            type: 'flex',
            element: () => document.getElementById('upowerAutomationContainer'),
            req() { return MILESTONES.has(5)},
        },
        12: {
            name: 'prestige_automation',
            type: 'flex',
            element: () => document.getElementById('prestigeAutomationContainer'),
            req() { return MILESTONES.has(8)},
        },
        13: {
            name: 'supercrystals_tab',
            type: 'block',
            element: () => document.getElementById('superCrystalsSelect'),
            req() { return player.progressBarGoals.includes(3)}, 
        },
        14: {
            name: 'minerals_tab',
            type: 'block',
            element: () => document.getElementById('mineralsSelect'),
            req() { return player.progressBarGoals.includes(4)},
        },
        15: {
            name: 'challenges_tab',
            type: 'block',
            element: () => document.getElementById('challengeSelect'),
            req() { return player.progressBarGoals.includes(2) },
        },
        16: {
            name: 'post_c11_shop_buyables',
            type: 'flex',
            element: () => document.getElementById('post11challenge'),
            req() { return player.challenge.completed.includes(11)},
        },
        17: {
            name: 'post_c11_shop_permanent',
            type: 'flex',
            element: () => document.getElementById('post11challenge2'),
            req() { return player.challenge.completed.includes(11)},
        },
        18: {
            name: 'post_c11_shop_items',
            type: 'flex',
            element: () => document.getElementById('post11challenge3'),
            req() { return player.challenge.completed.includes(11)},
        },
        19: {
            name: 'post_ach32_unlocklable',
            type: 'flex',
            element: () => document.getElementById('postAch32'),
            req() { return ACHS.has(32)},
        },
        20: {
            name: 'post_ach33_permanent_1',
            type: 'flex',
            element: () => document.getElementsByClassName('postAch33')[0],
            req() { return ACHS.has(33)},
        },
        21: {
            name: 'post_ach33_permanent_2',
            type: 'flex',
            element: () => document.getElementsByClassName('postAch33')[1],
            req() { return ACHS.has(33)},
        },
        22: {
            name: 'post_ach33_unlockable',
            type: 'flex',
            element: () => document.getElementsByClassName('postAch33')[2],
            req() { return ACHS.has(33)},
        },
        23: {
            name: 'prestige_help_pages',
            type: 'block',
            element: () => document.getElementById('prestigeHelpDiv'),
            req() { return ACHS.has(21)},
        },
        24: {
            name: 'modernization_button',
            type: 'block',
            element: () => document.getElementById('modernizeButton'),
            req() { return UPGS.shop.unlockables[3].unl() },
        },
        25: {
            name: 'force_umulti',
            type: 'block',
            element: () => document.getElementById('harshUmulti'),
            req() { return player.challenge.activated == 5 || player.challenge.activated == 7 || player.prestige.challenge.activated == 1},
        },
        26: {
            name: 'post_e13_click_softcap',
            type: 'flex',
            element: () => document.getElementById('postE13SoftcapClick'),
            req() { return GAIN.coin.click.effect() >= 1e13 },
        },
        27: {
            name: 'post_e13_second_softcap',
            type: 'flex',
            element: () => document.getElementById('postE13SoftcapSecond'),
            req() { return GAIN.coin.second.effect() >= 1e13 },
        },
        28: {
            name: 'post_e15_gain_softcap',
            type: 'flex',
            element: () => document.getElementById('postE15SoftcapGain'),
            req() { return GAIN.coin.gain.effect() >= 1e15 },
        },
        29: {
            name: 'post_e7_shard_effect_softcap',
            type: 'flex',
            element: () => document.getElementById('postE7SoftcapEffect'),
            req() { return GAIN.shard.effect.effect() >= 1e7 },
        },
        30: {
            name: 'shard_unlockable_second',
            type: 'flex',
            element: () => document.getElementById('shardsPerSecondText'),
            req() { return UNL.shard.second.unl() }
        },
        31: {
            name: 'shard_unlockable_second',
            type: 'none',
            element: () => document.getElementById('shardUnlockableBase1'),
            req() { return UNL.shard.second.unl() }
        },
        32: {
            name: 'shard_unlockable_click',
            type: 'flex',
            element: () => document.getElementById('shardsClick'),
            req() { return UNL.shard.click.unl() }
        },
        33: {
            name: 'shard_unlockable_click',
            type: 'none',
            element: () => document.getElementById('shardUnlockableBase2'),
            req() { return UNL.shard.click.unl() }
        },
        34: {
            name: 'shard_unlockable_buyable',
            type: 'flex',
            element: () => document.getElementById('shardBuyables'),
            req() { return UNL.shard.buyables.unl() }
        },
        35: {
            name: 'shard_unlockable_buyable',
            type: 'none',
            element: () => document.getElementById('shardUnlockableBase3'),
            req() { return UNL.shard.buyables.unl() }
        },
        36: {
            name: 'shard_unlockable_single',
            type: 'flex',
            element: () => document.getElementById('shardSingles'),
            req() { return UNL.shard.singles.unl() }
        },
        37: {
            name: 'shard_unlockable_single',
            type: 'none',
            element: () => document.getElementById('shardUnlockableBase4'),
            req() { return UNL.shard.singles.unl()}
        },
        38: {
            name: 'auto_single_upgrade',
            type: 'none',
            element: () => ELS.automationUpgradesArray[0],
            req() { return MISC.automation.single.time() == 50}
        },
        39: {
            name: 'auto_buyable_upgrade',
            type: 'none',
            element: () => ELS.automationUpgradesArray[1],
            req() { return MISC.automation.buyable.time() == 50}
        },
        40: {
            name: 'auto_umulti_upgrade',
            type: 'none',
            element: () => ELS.automationUpgradesArray[2],
            req() { return MISC.automation.umultiplier.time() == 50}
        },
        41: {
            name: 'auto_upower_upgrade',
            type: 'none',
            element: () => ELS.automationUpgradesArray[3],
            req() { return MISC.automation.upower.time() == 50}
        },
        42: {
            name: 'auto_prestige_upgrade',
            type: 'none',
            element: () => ELS.automationUpgradesArray[4],
            req() { return MISC.automation.prestige.time() == 50}
        },
        43: {
            name: 'auto_prestige_mode_select',
            type: 'flex',
            element: () => document.getElementById('prestigeModeDiv'),
            req() { return MISC.automation.prestige.time() == 50 && MILESTONES.has(14)}
        },
        44: {
            name: 'auto_buyable_bulk_button',
            type: 'flex',
            element: () => document.getElementById('increaseBulkBuyButton'),
            req() { return MISC.automation.buyable.time() == 50 && MILESTONES.has(6) && MISC.automation.buyable.bulk() != 512}
        },
        45: {
            name: 'auto_umulti_input',
            type: 'flex',
            element: () => document.getElementById('umultiIntervalDiv'),
            req() { return MISC.automation.umultiplier.time() == 50}
        },
        46: {
            name: 'auto_upower_input',
            type: 'flex',
            element: () => document.getElementById('upowerIntervalDiv'),
            req() { return MISC.automation.upower.time() == 50}
        },
        47: {
            name: 'exit_chall_button',
            type: 'inline-block',
            element: () => document.getElementById('exitChallenge'),
            req() { return player.challenge.activated != 0}
        },
        48: {
            name: 'overdrive_tab',
            type: 'block',
            element: () => document.getElementById('overdriveSelect'),
            req() { return UPGS.shop.unlockables[1].unl()}
        },
        49: {
            name: 'overdrive1',
            type: 'block',
            element: () => document.getElementById('overdriveType1'),
            req() { return UPGS.shop.unlockables[1].unl()}
        },
        50: {
            name: 'overdrive2',
            type: 'block',
            element: () => document.getElementById('overdriveType2'),
            req() { return UPGS.shop.unlockables[2].unl()}
        },
        51: {
            name: 'challenge_help',
            type: 'block',
            element: () => document.getElementById('challengeHelpDiv'),
            req() { return player.progressBarGoals.includes(2) }
        },
        52: {
            name: 'superprestige',
            type: 'block',
            element: () => document.getElementById('superprestigeSelect'),
            req() { return player.progressBarGoals.includes(5) }
        },
        53: {
            name: 'uadder',
            type: 'block',
            element: () => document.getElementById('uadderBoost'),
            req() { return player.progressBarGoals.includes(5) }
        },
        54: {
            name: 'ureducer',
            type: 'block',
            element: () => document.getElementById('ureducerBoost'),
            req() { return player.progressBarGoals.includes(5) }
        },
        55: {
            name: 'hide_autoadder_purchase',
            type: 'none',
            element: () => ELS.automationUpgradesArray[5],
            req() { return MISC.automation.uadder.time() == 50}
        },
        56: {
            name: 'uadder_settings',
            type: 'flex',
            element: () => document.getElementById('uadderIntervalDiv'),
            req() { return MISC.automation.uadder.time() == 50}
        },
        57: {
            name: 'show_shardachs1',
            type: 'flex',
            element: () => document.getElementById('shardAchBarDiv1'),
            req() { return player.shard_achievements.includes(1)}
        },
        58: {
            name: 'show_shardachs2',
            type: 'flex',
            element: () => document.getElementById('shardAchBarDiv2'),
            req() { return player.shard_achievements.includes(2)}
        },
        59: {
            name: 'show_shardachs3',
            type: 'flex',
            element: () => document.getElementById('shardAchBarDiv3'),
            req() { return player.shard_achievements.includes(3)}
        },
        60: {
            name: 'show_shardachs4',
            type: 'flex',
            element: () => document.getElementById('shardAchBarDiv4'),
            req() { return player.shard_achievements.includes(4)}
        },
        61: {
            name: 'show_shardachs5',
            type: 'flex',
            element: () => document.getElementById('shardAchBarDiv5'),
            req() { return player.shard_achievements.includes(5)}
        },
        62: {
            name: 'hide_shardachblock1',
            type: 'none',
            element: () => document.getElementById('shardAchUnlockable1'),
            req() { return player.shard_achievements.includes(1)}
        },
        63: {
            name: 'hide_shardachblock2',
            type: 'none',
            element: () => document.getElementById('shardAchUnlockable2'),
            req() { return player.shard_achievements.includes(2)}
        },
        64: {
            name: 'hide_shardachblock3',
            type: 'none',
            element: () => document.getElementById('shardAchUnlockable3'),
            req() { return player.shard_achievements.includes(3)}
        },
        65: {
            name: 'hide_shardachblock4',
            type: 'none',
            element: () => document.getElementById('shardAchUnlockable4'),
            req() { return player.shard_achievements.includes(4)}
        },
        66: {
            name: 'hide_shardachblock5',
            type: 'none',
            element: () => document.getElementById('shardAchUnlockable5'),
            req() { return player.shard_achievements.includes(5)}
        },
        67: {
            name: 'shardachs_select',
            type: 'block',
            element: () => document.getElementById('shardAchievementsSelect'),
            req() { return player.shop.unlockables.includes(4)}
        },
        68: {
            name: 'challenge_select',
            type: 'block',
            element: () => document.getElementById('challengesTimeSelect'),
            req() { return player.progressBarGoals.includes(2)}
        },
        69: {
            name: 'prestiges_select',
            type: 'block',
            element: () => document.getElementById('recentPrestigesSelect'),
            req() { return player.progressBarGoals.includes(1)}
        },
        70: {
            name: 'shop_buyables',
            type: 'flex',
            element: () => document.getElementById('postMinerals'),
            req() { return player.progressBarGoals.includes(4)}
        },
        71: {
            name: 'shop_unlockables',
            type: 'flex',
            element: () => document.getElementById('postMinerals2'),
            req() { return player.progressBarGoals.includes(4)}
        },
        72: {
            name: 'shop_singles',
            type: 'flex',
            element: () => document.getElementById('postSuperprestige'),
            req() { return player.progressBarGoals.includes(5)}
        },
        73: {
            name: 'shop_items',
            type: 'flex',
            element: () => document.getElementById('postSuperprestige2'),
            req() { return player.progressBarGoals.includes(5)}
        },
        74: {
            name: 'uadder_show',
            type: 'flex',
            element: () => document.getElementById('uadderAutomationContainer'),
            req() { return player.progressBarGoals.includes(5)}
        },
        75: {
            name: 'fortune_button',
            type: 'block',
            element: () => document.getElementById('fortuneSelect'),
            req() { return player.progressBarGoals.includes(6)}
        },
        76: {
            name: 'balance_button',
            type: 'block',
            element: () => document.getElementById('balanceSelect'),
            req() { return player.fortune.upgrades.singles.includes(31)}
        },
        77: {
            name: 'a_rarity_block',
            type: 'flex',
            element: () => document.getElementById('A-rarity-block'),
            req() { return player.fortune.upgrades.singles.includes(12)}
        },
        78: {
            name: 's_rarity_block',
            type: 'flex',
            element: () => document.getElementById('S-rarity-block'),
            req() { return player.fortune.upgrades.singles.includes(21)}
        },
        79: {
            name: 'ex_rarity_block',
            type: 'flex',
            element: () => document.getElementById('EX-rarity-block'),
            req() { return player.fortune.upgrades.singles.includes(32)}
        },
        80: {
            name: 'aquamarine',
            type: 'flex',
            element: () => document.getElementById('aquamarineMineral'),
            req() { return player.shop.unlockables.includes(6) }
        },
        81: {
            name: 'crystal softcap',
            type: 'flex',
            element: () => document.getElementById('crystalgainsc'),
            req() { return player.prestige.total_currency >= 1e50}
        },
        82: {
            name: 'shard softcap',
            type: 'flex',
            element: () => document.getElementById('shardeffectsc'),
            req() { return player.shard.currency >= 1e10}
        },
        83: {
            name: 'exit_prestige_chall_button',
            type: 'inline-block',
            element: () => document.getElementById('exitPChallenge'),
            req() { return player.prestige.challenge.activated != 0}
        },
    }
}

const CHALL = {
    1: {
        id: 1,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? 1 + 0.1 * UPGS.fortune.boosts[8].effect()
            : 1.1
        }
    },
    2: {
        id: 2,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? 1000000 * UPGS.fortune.boosts[8].effect()
            : 1000000
        }
    },
    3: {
        id: 3,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? 1 + (Math.log(player.prestige.resets+1)) * UPGS.fortune.boosts[8].effect()
            : 1 + (Math.log(player.prestige.resets+1))
        }
    },
    4: {
        id: 4,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? Math.pow(1.43, player.achievements.length) * UPGS.fortune.boosts[8].effect()
            : Math.pow(1.43, player.achievements.length)
        }
    },
    5: {
        id: 5,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = CHALL[5].completed()) {
            return x ? 0.9 : 1
        }
    },
    6: {
        id: 6,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? Math.pow(1.99, player.challenge.completed.length) * UPGS.fortune.boosts[8].effect()
            : Math.pow(1.99, player.challenge.completed.length)
        }
    },
    7: {
        id: 7,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? Math.log2(player.shard.currency+1) * UPGS.fortune.boosts[8].effect()
            : Math.log2(player.shard.currency+1)
        }
    },
    8: {
        id: 8,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? 1+player.time.real.prestige.timer * UPGS.fortune.boosts[8].effect()
            : 1+player.time.real.prestige.timer
        }
    },
    9: {
        id: 9,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? Math.pow(player.supercoin.total_currency, 1.5) * UPGS.fortune.boosts[8].effect()
            : Math.pow(player.supercoin.total_currency, 1.5)
        }
    },
    10: {
        id: 10,
        completed() { return player.challenge.completed.includes(this.id) },
        effect(x = player.fortune.activatedBoosts[8].activated) { return x 
            ? 1+Math.log10(MISC.amount_of_upgrades.coin()+1) * UPGS.fortune.boosts[8].effect()
            : 1+Math.log10(MISC.amount_of_upgrades.coin()+1)
        }
    },
    11: {
        id: 11,
        completed() { return player.challenge.completed.includes(this.id) },
        // new items in shop
    },
    12: {
        id: 12,
        completed() { return player.challenge.completed.includes(this.id) },
        // decrease umulti and upower scaling
    },
    virusCoins_gen() {
        let virusCoins = 1
        virusCoins = Math.pow(1.115, player.time.real.prestige.timer)
        virusCoins >= 1e100 ? virusCoins = 1e100 : virusCoins // needs gametimer generation via date.now()
        return virusCoins
    },
}

const PRES_CHALLENGE = {
    1: {
        id: 1,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { return 1e6
        },
    },
    2: {
        id: 2,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { return Math.log10(player.umultipliers/2 + 1);
        }
    },
    3: {
        id: 3,
        completed() { return player.prestige.challenge.completed.includes(this.id) 

        },
    },
    4: {
        id: 4,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { return player.clicks.critical * 10
        }
    },
    5: {
        id: 5,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { return Math.pow(player.balance.scales_of_balance, 0.005)
        }
    },
    6: {
        id: 6,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { return 1e12
        }
    },
    7: {
        id: 7,
        completed() { return player.prestige.challenge.completed.includes(this.id) },
        effect() { 
            let effect1 = 1 + player.challenge.time[12].times_completed, effect2 = 1 + (player.challenge.time[12].times_completed * 10001)
            return {
                effect1, effect2
            }
        }
    },
}
const MISC = {
    daily_reward() {
            if (!player.got_daily_reward){
                let gain = player.offline_gain.daily
                player.supercoin.currency += gain
                player.supercoin.total_currency += gain
                player.got_daily_reward = true
                dailyDesc.innerHTML = text.daily.true
            }
            else dailyDesc.innerHTML = text.daily.false
            openWindow('daily', true)
    },
    what_day_is_it_today() {
        return {
            day: new Date().getDate(), 
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    },
    amount_of_upgrades: {
        coin() {
            return player.coin.upgrades[1] + player.coin.upgrades[2] + player.coin.upgrades[3] + player.coin.upgrades[4] + player.coin.upgrades[5] + player.coin.singleUpgrades.length
        },
        prestige() {
            return player.prestige.upgrades[1] + player.prestige.upgrades[2] + player.prestige.singleUpgrades.length
        },
        super() {
            return player.coin.superUpgrades.length
        },
        utils() {
            return player.uadders + player.ureducers + player.umultipliers + player.upowers
        }
    },
    set_intervals: {
            auto_save: '',
            update_game: '',
    },
    automation: {
        single: {
            divider: 1.6666667,
            cost(x = player.automation.upgrades.single) {
                return Math.pow(2, x)
            },
            time(x = player.automation.upgrades.single) {
                return Math.max(2000/Math.pow(this.divider, x), 50)
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        },
        buyable: {
            divider: 1.6666667,
            cost(x = player.automation.upgrades.buyable) {
                return Math.pow(2, x)
            },
            time(x = player.automation.upgrades.buyable) {
                return Math.max(1000/Math.pow(this.divider, x), 50)
            },
            bulk(x = player.automation.upgrades.buyable) {
                return this.time() == 50 ? Math.min(Math.pow(2, x-6), 512) : 1
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        },
        umultiplier: {
            divider: 1.6666667,
            cost(x = player.automation.upgrades.umultiplier) {
                return Math.pow(2, x)
            },
            time(x = player.automation.upgrades.umultiplier) {
                return Math.max(15000/Math.pow(this.divider, x), 50)
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        },
        upower: {
            divider: 1.6666667,
            cost(x = player.automation.upgrades.upower) {
                return Math.pow(2, x)
            },
            time(x = player.automation.upgrades.upower) {
                return Math.max(30000/Math.pow(this.divider, x), 50)
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        },
        prestige: {
            divider: 1.6666667,
            cost(x = player.automation.upgrades.prestige) {
                return Math.pow(2, x)
            },
            time(x = player.automation.upgrades.prestige) {
                return Math.max(60000/Math.pow(this.divider, x), 50)
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        },
        uadder: {
            divider: 1.5,
            cost(x = player.automation.upgrades.uadder) {
                return 1e15*Math.pow(100, x)
            },
            time(x = player.automation.upgrades.uadder) {
                return Math.max(600000/Math.pow(this.divider, x), 50)
            },
            charged: false,
            interval: '',
            activateTime() { return Date.now() + this.time() }
        }
    },
    offline(x = player.time.savedTime, y = Date.now()) {
        let time = (y-x)/1000
        time = Math.min(time, 1e6)
        if (UPGS.supercrystal[31].unl()) time *= 5
        return time
    },
    free_upgrade: {
        1() { 
            let effect = 0
            if (player.challenge.completed.includes(4) && player.challenge.activated == 0) effect = CHALL[4].effect()
            if (player.coin.superUpgrades.includes(11)) effect += UPGS.coin.buyables[1].effect_super()
            if (player.minerals[2]) effect += UPGS.minerals[2].effect3()
            if (GAIN.uadder.effect()) effect += GAIN.uadder.effect()
            if (player.minerals[4]) effect *= UPGS.minerals[4].effect2()
            return effect
        },
        2() {
            let effect = 0
            if (player.prestige.super.singles.includes(15)) effect += GAIN.uadder.effect2()
            if (player.minerals[4]) effect *= UPGS.minerals[4].effect2()
            return effect
        },
        4() { 
            let effect = 0
            if (player.coin.superUpgrades.includes(25)) effect += UPGS.coin.singles[15].effect_super()
            if (player.minerals[4]) effect *= UPGS.minerals[4].effect2()
            effect += player.shop.items.used[6]*20
            return effect
        },
        umultiplier() {
            let effect = 0
            if (player.uadders) effect += GAIN.uadder.effect()
            return effect
        },
        upower() {
            let effect = 0
            if (player.uadders && player.prestige.super.singles.includes(15)) effect += GAIN.uadder.effect2()
            return effect
        }
    },
    auto_save_timer: 0,
    average: {
        prestiges() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].prestiges
            return average/player.prestige.table_resets
        },
        crystals() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].crystals
            return average/player.prestige.table_resets
        },
        game_time() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].time.game.timer
            return average/player.prestige.table_resets
        },
        real_time() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].time.real.timer
            return average/player.prestige.table_resets
        },
        prestiges_per_min() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].prestiges*60/player.prestige.prestigeTable[i].time.real.timer
            return average/player.prestige.table_resets
        },
        crystals_per_min() {
            let average = 0
            for (let i = 0; i < player.prestige.table_resets; i++)
            average += player.prestige.prestigeTable[i].crystals*60/player.prestige.prestigeTable[i].time.real.timer
            return average/player.prestige.table_resets
        },
    },
    fortune: {
        convert(x = type) {
            switch (x) {
                case 'coin':
                    if (player.coin.currency < this.cost.coin()) return 0
                    player.coin.currency -= this.cost.coin()
                    player.fortune.tokens += 1
                    player.fortune.total_tokens += 1
                    player.fortune.converted.coins++
                    break;
                case 'crystal':
                    if (player.prestige.currency < this.cost.crystal()) return 0
                    player.prestige.currency -= this.cost.crystal()
                    player.fortune.tokens += 1
                    player.fortune.total_tokens += 1
                    player.fortune.converted.crystals++
                    break;
                default:
                    return 0;
            }
        },
        cost: {
            coin(x = player.fortune.converted.coins) {
                return formatNumber(1e100 * Math.pow(1e20, x))
            }, 
            crystal(x = player.fortune.converted.crystals) {
                return formatNumber(1e50 * Math.pow(1e10, x))
            }, 
        },
        fortuneBoost12() {
            for (let i = 1; i < 11; i++) {
                if (player.fortune.activatedBoosts[i].activated) 
                    if (i != 10) player.fortune.activatedBoosts[i].effect *= UPGS.fortune.boosts[12].effect()
            }
        }
    },
    balance: {
        exchange(x) {
            if (player.fortune.tokens == 0) return 0
            switch (x) {
                case 'plus':
                    player.fortune.tokens -= 1
                    player.balance.total_coins.plus++
                    player.balance.coins.plus++
                    break;
                case 'minus':
                    player.fortune.tokens -= 1
                    player.balance.total_coins.minus++
                    player.balance.coins.minus++
                    break;
                default:
                    break;
            }
        },
        respec() {
            player.fortune.tokens += player.balance.total_coins.minus
            player.balance.coins.minus = 0
            player.balance.total_coins.minus = 0
            player.fortune.tokens += player.balance.total_coins.plus
            player.balance.coins.plus = 0
            player.balance.total_coins.plus = 0
            LAYERS.doForcedReset()
        },
        maxLineHeight: 168, //px
        ratio(a = player.balance.coins.plus, b = player.balance.coins.minus) {
            const leftPercent = getLeftValue(a, b);
            const rightPercent = getRightValue(a, b);

            // Устанавливаем высоту с ограничением в 336px
            document.getElementById('plusCoinBlockLine').style.height = `${(leftPercent / 100) * 168}px`
            document.getElementById('minusCoinBlockLine').style.height = `${(rightPercent / 100) * 168}px`

            return {
                leftPercent, rightPercent
            }
        },
        scales_of_balance(a = player.balance.coins.plus, b = player.balance.coins.minus) {
            return Math.min(a, b)
        },
        plusCoins: {
            buff(a = player.balance.coins.plus) {
                let coinBuff = a ? Math.pow(1000, a) * UPGS.balance.buyables[1].effect() : 1, 
                coinGainSoftcapPusher = player.balance.upgrades.singles.includes(11) && a ? Math.pow(80, a) * UPGS.balance.buyables[1].effect() : 0, 
                upgradePriceDivisor = player.balance.upgrades.singles.includes(21) && a ? Math.pow(10, a) * UPGS.balance.buyables[1].effect() : 1, 
                chanceBuffer = player.balance.upgrades.singles.includes(31) && a ? a / 200 * UPGS.balance.buyables[1].effect() : 1
                if (player.prestige.challenge.activated == 8) coinBuff = Math.pow(coinBuff, 0.1), coinGainSoftcapPusher = Math.pow(coinGainSoftcapPusher, 0.1), upgradePriceDivisor = Math.pow(upgradePriceDivisor, 0.1), chanceBuffer = Math.pow(chanceBuffer, 0.1)
                chanceBuffer++
                return {
                    coinBuff, coinGainSoftcapPusher, upgradePriceDivisor, chanceBuffer
                }
            },
            nerf(a = player.balance.coins.plus) {
                let crystalGainNerf = a ? Math.pow(20, a) / UPGS.balance.buyables[2].effect() : 1, 
                crystalSoftcapHarsher = player.balance.upgrades.singles.includes(11) ? subtractPercentage(a / 350, UPGS.balance.buyables[2].effect()) : 0, 
                utilsCostIncreaser = player.balance.upgrades.singles.includes(21) ? subtractPercentage(a / 30, UPGS.balance.buyables[2].effect()) : 1
                if (player.prestige.challenge.activated == 8) crystalGainNerf = Math.pow(crystalGainNerf, 0.1), crystalSoftcapHarsher = Math.pow(crystalSoftcapHarsher, 0.1), utilsCostIncreaser = Math.pow(utilsCostIncreaser, 0.1)
                utilsCostIncreaser++
                return {
                    crystalGainNerf, crystalSoftcapHarsher, utilsCostIncreaser
                }
            },
        },
        minusCoins :{
            buff(b = player.balance.coins.minus) {
                let crystalGainBuff = b ? Math.pow(20, b) * UPGS.balance.buyables[1].effect() : 1, 
                crystalSoftcapSofter = player.balance.upgrades.singles.includes(12) && b ? b / 350 * UPGS.balance.buyables[1].effect() : 0, 
                utilsCostReducer = player.balance.upgrades.singles.includes(22) && b ? b / 30 * UPGS.balance.buyables[1].effect() : 1, 
                crystalSoftcapPusher = player.balance.upgrades.singles.includes(32) && b ? 33 * Math.pow(3, b) * UPGS.balance.buyables[1].effect() : 1
                if (player.prestige.challenge.activated == 8) crystalGainBuff = Math.pow(crystalGainBuff, 0.1), crystalSoftcapSofter = Math.pow(crystalSoftcapSofter, 0.1), utilsCostReducer = Math.pow(utilsCostReducer, 0.1), crystalSoftcapPusher = Math.pow(crystalSoftcapPusher, 0.1)
                utilsCostReducer++
                    return {
                        crystalGainBuff, crystalSoftcapSofter, utilsCostReducer, crystalSoftcapPusher
                    }
            },
            nerf(b = player.balance.coins.minus) {
                let coinNerf = b ? Math.pow(1000, b) / UPGS.balance.buyables[2].effect() : 1, 
                coinGainSoftcapPuller = player.balance.upgrades.singles.includes(12) && b ? subtractPercentage(Math.pow(80, b), UPGS.balance.buyables[2].effect()) : 0, 
                upgradePriceMultiplier = player.balance.upgrades.singles.includes(22) && b ? subtractPercentage(Math.pow(10, b), UPGS.balance.buyables[2].effect()) : 1
                if (player.prestige.challenge.activated == 8) coinNerf = Math.pow(coinNerf, 0.1), coinGainSoftcapPuller = Math.pow(coinGainSoftcapPuller, 0.1), upgradePriceMultiplier = Math.pow(upgradePriceMultiplier, 0.1)
                    return {
                        coinNerf, coinGainSoftcapPuller, upgradePriceMultiplier
                    }
            },
        }
    }

}

const PROGRESS = {
    unl(x) { return player[this[x].layer][this[x].type] >= this[x].req()},
    add(x) { if (!player.progressBarGoals.includes(x) && this.unl(x)) player.progressBarGoals.push(x) },
    name: ['', '', '', '', '', '', '', ''],
    currency: ['', '', '', '', '', '', '', ''],
    check_progress() {
        for (i = 1; i <= this.name.length; i++) {
            this.add(i)
        }
    },
    update(x = (Math.max(...player.progressBarGoals))+1) {
        this.check_progress()
        progressbar.style.width = Math.min(Math.log(player[this[x].layer][this[x].type])/Math.log(this[x].req())*100, 100)  + "%"
        percent.innerHTML = this.name[x-1] + ": " + formatNumber(player[this[x].layer][this[x].type]) + "/" + formatNumber(this[x].req()) + " " + this.currency[x-1] + " (" + Math.min(findRatio(player[this[x].layer][this[x].type], this[x].req()), 100) + "%)"
    },
    1: {
        layer: "coin",
        type: "currency",
        req() { return 1e15 }, //prestige
    },
    2: {
        layer: "coin",
        type: "currency",
        req() { return 1e25 }, //challenges
    },
    3: {
        layer: "coin",
        type: "currency",
        req() { return 1e35 }, //supercrystals
    },
    4: {
        layer: "prestige",
        type: "resets",
        req() { return 1e7 }, //minerals
    },
    5: {
        layer: "prestige",
        type: "currency",
        req() { return 1e15 }, //superprestige
    },
    6: {
        layer: "supercrystal",
        type: "total_currency",
        req() { return 25 }, //fortune
    },
    7: {
        layer: "supercrystal",
        type: "total_currency",
        req() { return 40 }, //balls
    },
    8: {
        layer: "prestige",
        type: "currency",
        req() { return 1e100 }
    },
    9: {
        layer: "coin",
        type: "currency",
        req() { return 1.79e308 }
    }
}
let new_date = 0, time = 0


function loop() {
    new_date = Date.now()
    player.time.currentTime = new_date
    let time = (new_date-player.time.savedTime)/1000 //0.033, 0.05, 0.1, 0.5

    player.settings.auto_save ? MISC.auto_save_timer += time : MISC.auto_save_timer = 0
    if (MISC.auto_save_timer >= player.settings.autosave_interval/1000) autoSaveThis()

    player.coin.currency += player.challenge.activated != 0 && player.coin.currency >= 1e15 ? 0 : GAIN.coin.second.effect()*time
    player.coin.total_currency += GAIN.coin.second.effect()*time
    player.shard.currency += GAIN.shard.second()*time
    player.balance.neutral += GAIN.balance.generation()*time
    player.balance.scales_of_balance += GAIN.balance.scales_of_balance()*time

    player.time.game.total.timer += time
    player.time.game.prestige.timer += time
    convert_time('game', 'total')
    convert_time('game', 'prestige')
    player.time.real.total.timer += time
    player.time.real.prestige.timer += time
    convert_time('real', 'total')
    convert_time('real', 'prestige')
    player.time.umultiplier += time
    player.time.upower += time
    player.time.uadder += time
    player.time.ureducer += time
    player.time.real.daily.timer = Math.max((player.time.next_daily-player.time.currentTime)/1000, 0)
    convert_time('real', 'daily')

    for (let i = 1; i <= 12; i++) {
        if (player.fortune.activatedBoosts[i].time < 0) player.fortune.activatedBoosts[i].time = 0
        if (player.fortune.activatedBoosts[i].time > 0) player.fortune.activatedBoosts[i].time -= time
    }

    update_overdrive()
    PROGRESS.update()
    ACHS.checkAchievements()
    ACHS.checkRows()

    LAYERS.umultiplier.disable()
    LAYERS.upower.disable()
    LAYERS.uadder.disable()
    LAYERS.ureducer.disable()

    MILESTONES.checkMilestones()

    UPGS.coin.buyables.checkDisable()
    UPGS.coin.singles.checkDisable()
    UPGS.prestige.buyables.checkDisable()
    UPGS.prestige.singles.checkDisable()
    UPGS.prestige.super.buyables.checkDisable()
    UPGS.prestige.super.singles.checkDisable()
    UPGS.shard.buyables.checkDisable()
    UPGS.shard.singles.checkDisable()
    UPGS.shop.buyables.checkDisable()
    UPGS.shop.permanent.checkDisable()
    UPGS.shop.unlockables.checkDisable()
    UPGS.shop.items.checkDisable()
    UPGS.supercrystal.checkDisable()
    UPGS.minerals.checkDisable()
    UPGS.fortune.upgrades.buyables.checkDisable()
    UPGS.fortune.upgrades.singles.checkDisable()
    UPGS.fortune.boosts.checkDisable()

    UPGS.balance.buyables.checkDisable()
    UPGS.balance.singles.checkDisable()

    UPGS.coin.buyables.checkPurchased()
    UPGS.coin.singles.checkPurchased()
    UPGS.prestige.singles.checkPurchased()
    UPGS.shard.singles.checkPurchased()
    UPGS.supercrystal.checkPurchased()
    UPGS.prestige.super.singles.checkPurchased()
    UPGS.fortune.upgrades.singles.checkPurchased()
    UPGS.balance.singles.checkPurchased()

    MISC.balance.ratio()

    UNL.shard_achievements.check()

    LORE.checkLore()

    resetDailyReward()
    checkCompletedChallenges()
    checkSuperUpgradesForTooltips()

    statsPerClickUpdate()
    statsPerSecondUpdate()
    statsGainUpdate()
    statsSuperCoinChanceUpdate()
    statsCrystalsUpdate()
    statsPrestigeUpdate()
    statsShardsPerClickUpdate()
    statsShardsPerSecondUpdate()
    statsShardsEffectUpdate()
    statsCritChanceUpdate()
    statsCritMultiUpdate()
    statsClickSimulationUpdate()

    player.time.game.average.timer = MISC.average.game_time()
    convert_time('game', 'average')
    player.time.real.average.timer = MISC.average.real_time()
    convert_time('real', 'average')

    player.time.savedTime = Date.now()

    UNL.display.check()
}

// mySlider.onmouseup = function() {
//     player.settings.autosave_interval = this.value; 
// }

mySlider.oninput = function() {
    player.settings.autosave_interval = this.value; 
}

function convert_time(type, layer) {
    let time = player.time[type][layer].timer // type - real/game, layer - total/fastest
    //time = 63249
    player.time[type][layer].seconds = time % 60 //39
    player.time[type][layer].minutes = (time / 60) % 60
    player.time[type][layer].hours = (time / 3600) % 24
    player.time[type][layer].days = time / 86400
}

function update_overdrive() {
    // Получаем ширину .overdriveType в пикселях
    const overdriveTypeEl = document.querySelector('.overdriveType');
    const overdriveWidth = overdriveTypeEl ? overdriveTypeEl.getBoundingClientRect().width : 800;
    const widthMultiplier = overdriveWidth / 100;
    overdriveType1ProgressBarActive.style.width = (UNL.overdrive.type1.percent() * widthMultiplier) + "px";
    overdriveType1ProgressBar.style.width = (UNL.overdrive.type1.percent() * widthMultiplier) + "px";
    overdriveType2ProgressBarActive.style.width = (UNL.overdrive.type2.percent() * widthMultiplier) + "px";
    overdriveType2ProgressBar.style.width = (UNL.overdrive.type2.percent() * widthMultiplier) + "px";

    shardUnlock1.style.width = UNL.shard.second.percent() + "%";
    shardUnlock2.style.width = UNL.shard.click.percent() + "%";
    shardUnlock3.style.width = UNL.shard.buyables.percent() + "%";
    shardUnlock4.style.width = UNL.shard.singles.percent() + "%";

    superCrystalBar.style.clipPath = `inset(${100-UNL.supercrystal.pour()/1.05}% 0 0 0)`
}

overdriveType1ProgressBarBase.addEventListener("click", function() {
    UNL.overdrive.type1.activate ? UNL.overdrive.type1.activate = false : UNL.overdrive.type1.activate = true
    if (UNL.overdrive.type1.activate){
        UNL.overdrive.type1.blink = setInterval(()=> {
            overdriveType1ProgressBarActive.style.opacity == 1 ? overdriveType1ProgressBarActive.style.opacity = 0 :  overdriveType1ProgressBarActive.style.opacity = 1
        }, 500)
        UNL.overdrive.type1.interval = setInterval(()=> {
            if (player.coin.currency >= UNL.overdrive.type1.cost() && UNL.overdrive.type1.percent() != 100){
                let sub = player.coin.currency/100
                player.overdrive.consumed.type1 += sub
                player.coin.currency -= sub
            }
        }, 50)
    }
    else {clearInterval(UNL.overdrive.type1.interval)
    clearInterval(UNL.overdrive.type1.blink)
    overdriveType1ProgressBarActive.style.opacity = 0}
})
overdriveType2ProgressBarBase.addEventListener("click", function() {
    UNL.overdrive.type2.activate ? UNL.overdrive.type2.activate = false : UNL.overdrive.type2.activate = true
    if (UNL.overdrive.type2.activate){
        UNL.overdrive.type2.blink = setInterval(()=> {
            overdriveType2ProgressBarActive.style.opacity == 1 ? overdriveType2ProgressBarActive.style.opacity = 0 :  overdriveType2ProgressBarActive.style.opacity = 1
        }, 500)
        UNL.overdrive.type2.interval = setInterval(()=> {
            if (player.prestige.currency >= UNL.overdrive.type2.cost()){
                let sub = player.prestige.currency/100
                player.overdrive.consumed.type2 += sub
                player.prestige.currency -= sub
            }
        }, 50)
    }
    else {clearInterval(UNL.overdrive.type2.interval)
    clearInterval(UNL.overdrive.type2.blink)
    overdriveType2ProgressBarActive.style.opacity = 0}
})

function fillTheProgressBar(type, number) {
    let sub = UNL.shard[type].cost/500
        UNL.shard[type].interval = setInterval(()=> {
            if (player.shard.currency >= sub){
                player.shard.currency -= sub*(1+UNL.shard[type].percent()/20)
                player.shard.consumed[type] += sub*(1+UNL.shard[type].percent()/20)
                if (UNL.shard[type].percent() == 100) {
                    player.shard.currency += player.shard.consumed[type] - UNL.shard[type].cost
                    if (!player.shard.unlockables.includes(number)) player.shard.unlockables.push(number)
                }
            }
        }, 50)
}

function fillTheProgressBar2(type) {
    let sub = Math.min(player.supercrystal.consumedShards*Math.pow(1.337, player.supercrystal.total_currency), player.supercrystal.consumedShards, (UNL[type].cost()-player.supercrystal.consumedShards))
        UNL[type].interval = setInterval(()=> {
            if (player.shard.currency >= sub){
                sub = Math.min(100+player.supercrystal.consumedShards*Math.pow(1.337, player.supercrystal.total_currency), player.shard.currency, (UNL[type].cost()-player.supercrystal.consumedShards))
                player.shard.currency -= sub
                player.supercrystal.consumedShards += sub
                if (UNL[type].pour() >= 100) {
                    player.shard.currency += player.supercrystal.consumedShards - UNL[type].cost()
                    player.supercrystal.consumedShards = 0
                    player.supercrystal.currency++
                    player.supercrystal.total_currency++
                    sub = 1+player.supercrystal.consumedShards
                    superCrystalPour.innerHTML = UNL.supercrystal.pour()+'%'
                }
            }
        }, 50)
}

shardUnlockableBase1.addEventListener("mousedown", () => {
    fillTheProgressBar('second',1)
})
shardUnlockableBase1.addEventListener("mouseup", () => {
    clearInterval(UNL.shard.second.interval)
})
shardUnlockableBase1.addEventListener("mouseleave", () => {
    clearInterval(UNL.shard.second.interval)
})

shardUnlockableBase1.addEventListener("touchstart", () => {
    fillTheProgressBar('second',1);
});
shardUnlockableBase1.addEventListener("touchend", () => {
    clearInterval(UNL.shard.second.interval);
});
shardUnlockableBase1.addEventListener("touchcancel", () => {
    clearInterval(UNL.shard.second.interval);
});


shardUnlockableBase2.addEventListener("mousedown", () => {
    fillTheProgressBar('click',2)
})
shardUnlockableBase2.addEventListener("mouseup", () => {
    clearInterval(UNL.shard.click.interval)
})
shardUnlockableBase2.addEventListener("mouseleave", () => {
    clearInterval(UNL.shard.click.interval)
})

shardUnlockableBase2.addEventListener("touchstart", () => {
    fillTheProgressBar('click',2);
});
shardUnlockableBase2.addEventListener("touchend", () => {
    clearInterval(UNL.shard.click.interval);
});
shardUnlockableBase2.addEventListener("touchcancel", () => {
    clearInterval(UNL.shard.click.interval);
});


shardUnlockableBase3.addEventListener("mousedown", () => {
    fillTheProgressBar('buyables',3)
})
shardUnlockableBase3.addEventListener("mouseup", () => {
    clearInterval(UNL.shard.buyables.interval)
})
shardUnlockableBase3.addEventListener("mouseleave", () => {
    clearInterval(UNL.shard.buyables.interval)
})

shardUnlockableBase3.addEventListener("touchstart", () => {
    fillTheProgressBar('buyables',3);
});
shardUnlockableBase3.addEventListener("touchend", () => {
    clearInterval(UNL.shard.buyables.interval);
});
shardUnlockableBase3.addEventListener("touchcancel", () => {
    clearInterval(UNL.shard.buyables.interval);
});


shardUnlockableBase4.addEventListener("mousedown", () => {
    fillTheProgressBar('singles',4)
})
shardUnlockableBase4.addEventListener("mouseup", () => {
    clearInterval(UNL.shard.singles.interval)
})
shardUnlockableBase4.addEventListener("mouseleave", () => {
    clearInterval(UNL.shard.singles.interval)
})

shardUnlockableBase4.addEventListener("touchstart", () => {
    fillTheProgressBar('singles',4);
});
shardUnlockableBase4.addEventListener("touchend", () => {
    clearInterval(UNL.shard.singles.interval);
});
shardUnlockableBase4.addEventListener("touchcancel", () => {
    clearInterval(UNL.shard.singles.interval);
});


superCrystalBarBase.addEventListener("mousedown", () => {
    fillTheProgressBar2('supercrystal')
})

superCrystalBarBase.addEventListener("mouseup", () => {
    clearInterval(UNL.supercrystal.interval)
})

superCrystalBarBase.addEventListener("mouseleave", () => {
    clearInterval(UNL.supercrystal.interval)
})

superCrystalBarBase.addEventListener("touchstart", () => {
    fillTheProgressBar2('supercrystal');
});

superCrystalBarBase.addEventListener("touchend", () => {
    clearInterval(UNL.supercrystal.interval);
});

superCrystalBarBase.addEventListener("touchcancel", () => {
    clearInterval(UNL.supercrystal.interval);
});

function softCap(resource, conditionCount, softCapPower) {
    if (resource >= conditionCount) { // gain >= 1e13
        let needToSoftCap = resource / conditionCount 
        needToSoftCap = Math.pow(needToSoftCap, softCapPower)
        return conditionCount * needToSoftCap
    }
    else return resource
}

function softCapDecimal(resource, conditionCount, softCapPower) {
    if (resource >= conditionCount) { // gain >= 1e13
        let needToSoftCap = resource.div(conditionCount) 
        needToSoftCap = needToSoftCap.pow(softCapPower)
        let conditionCount2 = new Decimal(conditionCount)
        return conditionCount2.mul(needToSoftCap)
    }
    else return resource
}

function limits(variable, min, max) {
    if (variable >= min && variable <= max) {
        return true
    }
    else return false
}

setInterval(() => {
    GAIN.clicksPerSecond = 0
}, 1000);

function getCoin() {
    if (GAIN.clicksPerSecond < 10) {
        player.clicks.real++; player.clicks.prestige++
        GAIN.clicksPerSecond++
        if (!coinGain.dataset.enterHandler) {
            coinGain.dataset.enterHandler = '1'
            coinGain.addEventListener("keydown", function(event) {
                if (event.key == "Enter") {
                    event.preventDefault();
                }
            })
        }
        for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
            player.clicks.simulated++
            let gain = GAIN.coin.click.effect(), getCrit = false, getSuper = false
            if (GAIN.critical.get()) {gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++; player.supercoin.currency += UPGS.shop.permanent[5].effect(); player.supercoin.total_currency += UPGS.shop.permanent[5].effect()}
            if (GAIN.supercoin.get()) {getSuper = true}
            if (GAIN.critical.get() && GAIN.supercoin.get()) {if (!ACHS.has(37)) ACHS.unl(37)}
            player.coin.currency += gain*1
            player.coin.total_currency += gain*1

            //+coins appear
            const myMessage = document.createElement('div');
        
            var x = event.clientX;
            var y = event.clientY;
        
            myMessage.style.left = (x - 50 - randomNumber(-30, 30)) + "px";
            myMessage.style.top = (y - 20 - randomNumber(-30, 30)) + "px";
            if (getCrit) {
                myMessage.classList.add('criticalClick')
            }
            else {
                myMessage.classList.add('myMessage')
            }
            myMessage.innerHTML = ("+" + formatNumber(gain));
        
            document.body.appendChild(myMessage);
        
            setTimeout(() => {
                myMessage.classList.add('show');
                setTimeout(() => {
                myMessage.classList.remove('show');
                myMessage.classList.add('hide')
                setTimeout(() => {
                    myMessage.remove();
                  }, 300); // подождать завершения анимации исчезновения
                }, 0); // показывать уведомление 5 секунд
            },0 );

            if (getSuper) {
                player.supercoin.currency += GAIN.supercoin.gain()
                player.supercoin.total_currency += GAIN.supercoin.gain()

                const superCoinText = document.createElement('div');
        
                var x = event.clientX;
                var y = event.clientY;
            
                superCoinText.style.left = (x - 50 - randomNumber(-30, 30)) + "px";
                superCoinText.style.top = (y - 20 - randomNumber(-30, 30)) + "px";
            
                superCoinText.classList.add('superCoinText');
                superCoinText.innerHTML = (`+${GAIN.supercoin.gain()}`);
                document.body.appendChild(superCoinText);
            
                setTimeout(() => {
                    superCoinText.classList.add('show');
                    setTimeout(() => {
                        superCoinText.classList.remove('show');
                        superCoinText.classList.add('hide')
                    setTimeout(() => {
                        superCoinText.remove();
                      }, 500); // подождать завершения анимации исчезновения
                    }, 0); // показывать уведомление 5 секунд
                },0 );
            }
        }
    }
}

function getShardPerClick() {
    if (GAIN.clicksPerSecond < 10 && UNL.shard.click.percent() == 100) {
        player.clicks.real++; GAIN.clicksPerSecond++
        if (!shardsClick.dataset.enterHandler) {
            shardsClick.dataset.enterHandler = '1'
            shardsClick.addEventListener("keydown", function(event) {
                if (event.key == "Enter") {
                    event.preventDefault();
                }
            })
        }
        for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
            player.clicks.simulated++
            let gain = GAIN.shard.click(), getCrit = false
            if (GAIN.critical.get() && UPGS.supercrystal[32].unl()) {
                gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++
            }
            player.shard.currency += gain

            const shardCountPerClick = document.createElement('div');
    
            var x = event.clientX;
            var y = event.clientY;

            shardCountPerClick.style.left = (x - 50 - randomNumber(-30, 30)) + "px";
            shardCountPerClick.style.top = (y - 20 - randomNumber(-30, 30)) + "px";
            if (getCrit) {
                shardCountPerClick.classList.add('criticalClick')
            }
            else {
                shardCountPerClick.classList.add('shardCountPerClick')
            }
            shardCountPerClick.innerHTML = ("+" + formatNumber(gain));

            document.body.appendChild(shardCountPerClick);
        
            setTimeout(() => {
                shardCountPerClick.classList.add('show');
                setTimeout(() => {
                shardCountPerClick.classList.remove('show');
                shardCountPerClick.classList.add('hide')
                setTimeout(() => {
                    shardCountPerClick.remove();
                }, 500); // подождать завершения анимации исчезновения
                }, 0); // показывать уведомление 5 секунд
            },0 );
        }
    }
}

function selectTab(argument, isFlex) {
    const tabsToHide = ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab', 'challengeTab']
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    if (!isFlex) argument.style.display = "block"
    else argument.style.display = "flex"
    if (argument == mainTab) document.getElementsByClassName('mainSettings')[0].style.display = "flex";
    else document.getElementsByClassName('mainSettings')[0].style.display = "none";
}

function selectSubTab(argument, isFlex, mainTab) {
    const settingsTabsToHide = ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab']
    const clickerTabsToHide = ['coinsTab', 'overdriveTab']
    const infoTabsToHide = ['aboutGameTab', 'statisticsTab', 'multipliersTab', 'challengesTimeTab', 'recentPrestigesTab', 'softcapsTab']
    const prestigeTabsToHide = ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab', 'superCrystalsTab', 'mineralsTab', 'superprestigeTab', 'fortuneTab', 'balanceTab']
    const achTabsToHide = ['achScreenDescription', 'shardAchsTab']
    const challengeTabsToHide = ['challengeCoinTab', 'challengePrestigeTab']
    let tabsToHide;
    switch (mainTab) {
        case 'settings':
            tabsToHide = settingsTabsToHide;
            break;
        case 'clicker':
            tabsToHide = clickerTabsToHide;
            break;
        case 'info':
            tabsToHide = infoTabsToHide;
            break;
        case 'prestige':
            tabsToHide = prestigeTabsToHide;
            break;
        case 'achievements':
            tabsToHide = achTabsToHide;
            break;
        case 'challenge':
            tabsToHide = challengeTabsToHide;
            break;
        default:
            tabsToHide = [];
    }
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    if (!isFlex) argument.style.display = "block"
    else argument.style.display = "flex"
    switch (argument) {
        case shardsTab:
            document.getElementsByClassName('mainSettings')[1].style.display = "flex";
            break;
        case superprestigeTab:
            document.getElementsByClassName('mainSettings')[2].style.display = "flex";
            break;
        default:
            document.getElementsByClassName('mainSettings')[1].style.display = "none";
            document.getElementsByClassName('mainSettings')[2].style.display = "none";
            break;
    }
}

function showStats(multId) {
    const tabsToHide = ['gainPerClickStats', 'gainPerSecondStats', 'wholeGainStats', 'superCoinsChanceStats', 'crystalsMultiplierStats', 'shardsPerClickStats', 'shardsPerSecondStats', 'shardsEffectStats', 'critChanceStats', 'critMultiStats', 'clickSimulationStats', 'prestigeMultiplierStats',
    'gainPerClickGraphic', 'gainPerSecondGraphic', 'gainGraphic', 'superCoinsChanceGraphic', 'crystalsMultiplierGraphic', 'shardsPerClickGraphic', 'shardsPerSecondGraphic', 'shardsEffectGraphic', 'critChanceGraphic', 'critMultiGraphic', 'clickSimulationGraphic', 'prestigeMultiplierGraphic',
]
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    for (let i = 0; i < 12; i++){
        if (i == multId) {
            document.getElementById(tabsToHide[i]).style.display = 'block'; 
            document.getElementById(tabsToHide[i+12]).style.display = 'block'; 
            multBreakdownTitle.innerHTML = text.multiBreakdown[i]
            break
        }
    }
    
}

function notify(notiString, notiColor, notiWidth) {
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
        setTimeout(() => {
        notification.remove();
        }, 1800); // подождать завершения анимации исчезновения
      }, 1700); // показывать уведомление 5 секунд
    }, 100);
}

function changelog(){
    changelogWindow.style.display = "block"
    myPopupBackdrop1.style.display = "flex";
}

function gameLoreOpen(){
    gameLoreWindow.style.display = "block"
    myPopupBackdrop1.style.display = "flex";
}

function howToPlayOpen(){
    gameHelpWindow.style.display = "flex"
    myPopupBackdrop1.style.display = "flex";
}

function openWindow(arg, isFlex) {
    const descsToHide = ['confirmationButtons', 'whichCode', 'dailyDesc', 'breakCrystal', 'brokeCrystals', 'falseBrokeCrystals', 'welcomeToDigitalGod', 'chooseSaveDiv']
    for (const descId of descsToHide) {
        const desc = document.getElementById(descId);
        if (desc) {
            desc.style.display = "none";
        }
    }
    if (!isFlex) windowGame.style.display = "block"
    else windowGame.style.display = "flex"
    if (arg == 'hardReset' || arg == 'gotNaNed') {
        confirmationButtons.style.display = "flex";windowTitleDiv.style.display = 'block' 
        yesHR.style.display = "none"; yesRP.style.display = "none"
        if (arg == 'hardReset') {
        windowTitle2.style.fontSize = 'font-size: calc(24px * var(--font-scale));'; 
        windowTitle2.innerHTML = text.window.hard; 
        yesHR.style.display = "block"
        }
        else if (arg == 'gotNaNed') {
            windowTitle2.style.fontSize = 'font-size: calc(14px * var(--font-scale));';
            windowTitle2.innerHTML = text.window.NaN
            yesRP.style.display = "block"
        }
}
    else if (arg == 'code') {whichCode.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'daily') {dailyDesc.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'break') {breakCrystal.style.display = "flex"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'submit') {brokeCrystals.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'falseSubmit') {falseBrokeCrystals.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'welcome') {welcomeToDigitalGod.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    else if (arg == 'chooseSave') {chooseSaveDiv.style.display = "block"; windowTitle2.innerHTML = ''; windowTitleDiv.style.display = 'none'}
    myPopupBackdrop1.style.display = "flex";
}



function hidePopup() {
    changelogWindow.style.display = "none";
    gameLoreWindow.style.display = "none";
    gameHelpWindow.style.display = "none";
    windowGame.style.display = "none";
    myPopupBackdrop1.style.display = "none";
    myPopupBackdrop2.style.display = "none";
    offlineGainWindow.style.display = "none";
    showChangelog(text.changelog.start)
    showStory(text.chapter.start)
    showHelpPage(text.help.start, text.empty)
    }

myPopupBackdrop1.addEventListener("click", hidePopup);



function playSong1() {
    THEMEOFTHEGREAT.play()
    THEMEOFTHEGREAT.addEventListener("ended", function() {
        playSong1()
    })
}

function changeFonts(option) {
    let font = option, body = document.querySelector("body"), 
    select = document.querySelectorAll("select"), 
    label = document.querySelectorAll("label"), 
    buttons = document.querySelectorAll("button"),
    divs = document.querySelectorAll("div")
    if (option.value == 'option1') {
        font = 'Poly'
        document.documentElement.style.setProperty('--font-scale', 1);
    }
    if (option.value == 'option2') {
        font = 'serif'
        document.documentElement.style.setProperty('--font-scale', 1);
    }
    if (option.value == 'option3') {
        font = 'Impact'
        document.documentElement.style.setProperty('--font-scale', 0.95);
    }
    if (option.value == 'option4') {
        font = 'Courier'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option.value == 'option5') {
        font = 'Verdana'
        document.documentElement.style.setProperty('--font-scale', 0.85);
    }
    if (option.value == 'option6') {
        font = 'system-ui'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option.value == 'option7') {
        font = 'PAPYRUS THE GREAT'
        document.documentElement.style.setProperty('--font-scale', 0.85);
        if (!player.settings.mutedAudio) {
            playSong1();
        }
        else {
            THEMEOFTHEGREAT.currentTime = 0
            THEMEOFTHEGREAT.pause()
        }
    }
    if (option.value == 'option8') {
        font = 'Comic Sans'
        document.documentElement.style.setProperty('--font-scale', 0.85);
    }
    if (option.value == 'option9') {
        font = 'monotyper'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option.value == 'option10') {
        font = 'swkeys'
        document.documentElement.style.setProperty('--font-scale', 0.8);
    }
    if (option.value == 'option11') {
        font = 'swkeys'
        document.documentElement.style.setProperty('--font-scale', 0);
    }
    if (option.value == 'option12') {
        font = 'minecraft'
        document.documentElement.style.setProperty('--font-scale', 0.92);
    }
    if (option.value == 'option13') {
        font = 'SaiyanSans'
        document.documentElement.style.setProperty('--font-scale', 1.1);
    }
    if (option.value != 'option7'){
        THEMEOFTHEGREAT.currentTime = 0
        THEMEOFTHEGREAT.pause()
    }
    select.forEach(sel => sel.style.fontFamily = font)
    label.forEach(lbl => lbl.style.fontFamily = font)
    divs.forEach(div => div.style.fontFamily = font)
    buttons.forEach(btn => btn.style.fontFamily = font)
    player.settings.font = option.value
}

function changeNotations(option){
    player.settings.notation = option.value
}

function changeFonts2(option) {
    let font = option, body = document.querySelector("body"), 
    select = document.querySelectorAll("select"), 
    label = document.querySelectorAll("label"), 
    buttons = document.querySelectorAll("button"),
    divs = document.querySelectorAll("div")
    if (option == 'option1') {
        font = 'Poly'
        document.documentElement.style.setProperty('--font-scale', 1);
    }
    if (option == 'option2') {
        font = 'serif'
        document.documentElement.style.setProperty('--font-scale', 1);
    }
    if (option == 'option3') {
        font = 'Impact'
        document.documentElement.style.setProperty('--font-scale', 0.95);
    }
    if (option == 'option4') {
        font = 'Courier'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option == 'option5') {
        font = 'Verdana'
        document.documentElement.style.setProperty('--font-scale', 0.85);
    }
    if (option == 'option6') {
        font = 'system-ui'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option == 'option7') {
        font = 'PAPYRUS THE GREAT'
        document.documentElement.style.setProperty('--font-scale', 0.85);
        if (!player.settings.mutedAudio) {
            setTimeout(playSong1,3000);
        }
        else {
            THEMEOFTHEGREAT.currentTime = 0
            THEMEOFTHEGREAT.pause()
        }
    }
    if (option == 'option8') {
        font = 'Comic Sans'
        document.documentElement.style.setProperty('--font-scale', 0.85);
    }
    if (option == 'option9') {
        font = 'monotyper'
        document.documentElement.style.setProperty('--font-scale', 0.9);
    }
    if (option == 'option10') {
        font = 'swkeys'
        document.documentElement.style.setProperty('--font-scale', 0.8);
    }
    if (option == 'option11') {
        font = 'swkeys'
        document.documentElement.style.setProperty('--font-scale', 0);
    }
    if (option == 'option12') {
        font = 'minecraft'
        document.documentElement.style.setProperty('--font-scale', 0.92);
    }
    if (option == 'option13') {
        font = 'SaiyanSans'
        document.documentElement.style.setProperty('--font-scale', 1.1);
    }
    if (option != 'option7'){
        THEMEOFTHEGREAT.currentTime = 0
        THEMEOFTHEGREAT.pause()
    }
    body.style.fontFamily = font
    select.forEach(sel => sel.style.fontFamily = font)
    label.forEach(lbl => lbl.style.fontFamily = font)
    divs.forEach(div => div.style.fontFamily = font)
    buttons.forEach(btn => btn.style.fontFamily = font)
}

function muteTheAudio() {
    player.settings.mutedAudio ? (player.settings.mutedAudio = false, player.settings.isMuted = 'no') : (player.settings.mutedAudio = true, player.settings.isMuted = 'yes')
    if (text.optionValue == 'option7' && !player.settings.mutedAudio) {
        setTimeout(playSong1,1000);
    }
    else {
        THEMEOFTHEGREAT.currentTime = 0
        THEMEOFTHEGREAT.pause()
    }
}

// function changeTheme(option) {
//     if (option.value == 'theme1') { //dark
//             body.style.backgroundColor = '#060606'
//     }
//     if (option.value == 'theme2') { //light
//             body.style.backgroundColor = 'white'
//     }
//     // body.style.backgroundColor = themeColor
//     // select.style.backgroundColor = themeColor
//     // label.style.backgroundColor = themeColor
//     // for (var i = 0; i < buttons.length; i++){
//     //     buttons[i].style.backgroundColor = themeColor
//     // }
// }


function nextShopPage(direction) {
    if (direction == 'right'){
        firstShopRow.style.display = 'none'
        secondShopRow.style.display = 'none'
        rightShopArrowDiv.style.display = 'none'
        firstItemRow.style.display = 'flex'
        secondItemRow.style.display = 'flex'
        leftShopArrowDiv.style.display = 'flex'
        shoppingDiv.style.borderRadius = '0px 0px 5px 0px'
    }
    if (direction == 'left'){
        firstShopRow.style.display = 'flex'
        secondShopRow.style.display = 'flex'
        rightShopArrowDiv.style.display = 'flex'
        firstItemRow.style.display = 'none'
        secondItemRow.style.display = 'none'
        leftShopArrowDiv.style.display = 'none'
        shoppingDiv.style.borderRadius = '0px 0px 0px 5px'
    }
}

galaxyClickButton.addEventListener('click', function() {
    window.open('https://galaxy.click/play/131', '_blank');
});

gmailButton.addEventListener('click', function() {
    window.open('mailto:madkotodax@gmail.com', '_blank');
});

discordButton.addEventListener('click', function() {
    window.open('https://discord.gg/WdbaQC4nuM', '_blank');
});

// telegramChatButton.addEventListener('click', function() {
//     window.open('https://t.me/+zy5z7obW4cBjMTA6', '_blank');
// });

// telegramChannelButton.addEventListener('click', function() {
//     window.open('https://t.me/+pqju4vzGrrY2NzI6', '_blank');
// });


const versionDiv = document.getElementById('versionDiv');
let startY;
let startScrollTop;

versionDiv.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
    startScrollTop = versionDiv.scrollTop;
});

versionDiv.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startY;
    versionDiv.scrollTop = startScrollTop - deltaY;

    event.preventDefault(); // Отменяем стандартное скроллирование
});


const achEls = document.querySelectorAll('.ach');
const shopButtons = document.querySelectorAll('.shopButton');
const mineralButtons = document.querySelectorAll('.mineralButton');
const coinButtons = document.querySelectorAll('.coinUpgradeButton');

function show(tooltip, popperInstance) {
  // Make the tooltip visible
tooltip.setAttribute('data-show', '');

  // Update its position
popperInstance.update();

  // other code
}

function hide(tooltip) {
  // Hide the tooltip
tooltip.removeAttribute('data-show');

  // other code
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

for (const achEl of achEls) {
const tooltip = document.getElementById('tooltip-' + achEl.id);
const popperInstance = Popper.createPopper(achEl, tooltip, {
    modifiers: [
    {
        name: 'offset',
        options: {
        offset: [0, 8],
        },
    },
    ],
    placement: 'top',
});

showEvents.forEach((event) => {
    achEl.addEventListener(event, () => show(tooltip, popperInstance));
});

hideEvents.forEach((event) => {
    achEl.addEventListener(event, () => hide(tooltip));
  });
}

for (const shopButton of shopButtons) {
    const tooltip = document.getElementById('tooltip-' + shopButton.id);
    const popperInstance = Popper.createPopper(shopButton, tooltip, {
        modifiers: [
        {
            name: 'offset',
            options: {
            offset: [0, 8],
            },
        },
        ],
        placement: 'top',
    });
    
    showEvents.forEach((event) => {
        shopButton.addEventListener(event, () => show(tooltip, popperInstance));
    });
    
    hideEvents.forEach((event) => {
        shopButton.addEventListener(event, () => hide(tooltip));
    });
    }

for (const mineralButton of mineralButtons) {
    const tooltip = document.getElementById('tooltip-' + mineralButton.id);
    const popperInstance = Popper.createPopper(mineralButton, tooltip, {
        modifiers: [
        {
            name: 'offset',
            options: {
            offset: [0, 8],
            },
        },
        ],
        placement: 'top',
    });

    showEvents.forEach((event) => {
        mineralButton.addEventListener(event, () => show(tooltip, popperInstance));
    });
        
    hideEvents.forEach((event) => {
        mineralButton.addEventListener(event, () => hide(tooltip));
    });
    }

for (const coinButton of coinButtons) {
    const tooltip = document.getElementById('tooltip-' + coinButton.id);
    const popperInstance = Popper.createPopper(coinButton, tooltip, {
        modifiers: [
        {
            name: 'offset',
            options: {
            offset: [0, 8],
            },
        },
        ],
        placement: 'top',
    });
    
    showEvents.forEach((event) => {
        coinButton.addEventListener(event, () => show(tooltip, popperInstance));
    });
        
    hideEvents.forEach((event) => {
        coinButton.addEventListener(event, () => hide(tooltip));
    });
    }
