const UPGS = {
    coin: {
        buyables: new UniversalBuyablesManager('coin', [
            {
                id: 1,
                super_id: 11,
                power: 1.1,
                basePrice: 10,
                elementId: 'buyableU1',
                superCost: 100,
                customCostMod: function() { 
                    // Скидка 4% от ачивки 47 есть ТОЛЬКО у первого апгрейда
                    return ACHS.has(47) ? 0.96 : 1; 
                },
                effect: function(x = player.coin.upgrades[1] + MISC.free_upgrade[1]()) {
                    let eff = x;
                    eff *= UPGS.coin.buyables[2].effect();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = 1, y = player.coin.upgrades[1]) {
                    if (x == 0) return 1;
                    return y * 3;
                }
            },
            {
                id: 2,
                super_id: 12,
                power: 1.35,
                basePrice: 100,
                elementId: 'buyableU2',
                superCost: 250,
                effect: function(x = player.coin.upgrades[2] + MISC.free_upgrade[2]()) {
                    let eff = 1 + x / 10;
                    if (player.coin.singleUpgrades.includes(14)) eff *= UPGS.coin.singles[14].effect();
                    if (player.achievements.includes(16)) eff *= 1.1;
                    eff *= this.effect_super();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect2: function(x = player.coin.upgrades[2]) {
                    let eff = 1 + x / 10;
                    if (player.coin.singleUpgrades.includes(14)) eff *= UPGS.coin.singles[14].effect();
                    if (player.achievements.includes(16)) eff *= 1.1;
                    return eff;
                },
                effect_super: function(x = this.unl_super(), y = this.effect2()) {
                    if (x == 0) return 1;
                    return 1 + Math.log10(y + 1);
                }
            },
            {
                id: 3,
                super_id: 13,
                power: 11,
                basePrice: 500,
                elementId: 'buyableU3',
                superCost: 500,
                effect: function(x = player.coin.upgrades[3]) {
                    let eff = Math.pow(2, x);
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super(), y = player.coin.upgrades[3]) {
                    if (x == 0) return 1;
                    return 1 + Math.log2(y + 1);
                }
            },
            {
                id: 4,
                super_id: 14,
                power: 1.95,
                basePrice: 1000,
                elementId: 'buyableU4',
                superCost: 750,
                effect: function(x = player.coin.upgrades[4] + MISC.free_upgrade[4]()) {
                    let base = player.prestige.singleUpgrades.includes(22) ? 1.075 : 1.05, eff = Math.pow(base, x);
                    if (player.coin.singleUpgrades.includes(15)) eff *= UPGS.coin.singles[15].effect();
                    if (player.coin.superUpgrades.includes(14)) eff *= this.effect_super();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super()) {
                    if (x == 0) return 1;
                    return Math.pow(1.2, player.umultipliers);
                }
            },
            {
                id: 5,
                super_id: 15,
                power: 20,
                basePrice: 10000,
                elementId: 'buyableU5',
                superCost: 1000,
                effect: function(x = player.coin.upgrades[5]) {
                    let eff = x;
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super()) {
                    if (x == 0) return 1;
                    return Math.pow(this.effect(), 2);
                }
            }
        ]),
        singles: new UniversalSinglesManager('coin', 'singleUpgrades', [
            {
                id: 11, super_id: 21, elementId: 'singleU1', basePrice: 100000, cost_super: 1500,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    
                    // Блокируем значение от Infinity и NaN прямо внутри формулы
                    let safeTotal = Math.min(player.coin.this_reflash_currency || 0, 1e308);
                    let eff = 1 + (Math.log10(safeTotal + 10));
                    
                    eff *= this.effect_super();
                    if (player.coin.singleUpgrades.includes(24)) eff = Math.pow(eff, UPGS.coin.singles[24].effect());
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1;
                    
                    // Блокируем и тут
                    let safeCurrency = Math.min(player.coin.currency || 0, 1e308);
                    return 1 + (Math.log10(safeCurrency + 10));
                }
            },
            {
                id: 12, super_id: 22, elementId: 'singleU2', basePrice: 3e6, cost_super: 2000,
                base: function() { return ACHS.has(19) ? 1.135 : 1.125; },
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = Math.log1p(Math.pow(Math.pow(player.clicks.simulated, 2.8), this.base()));
                    eff *= this.effect_super();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1;
                    return Math.log1p(Math.pow(Math.pow(player.clicks.real, 2), this.base()));
                }
            },
            {
                id: 13, super_id: 23, elementId: 'singleU3', basePrice: 5e6, cost_super: 2500,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = 2;
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) { return x == 0 ? 1 : 2; }
            },
            {
                id: 14, super_id: 24, elementId: 'singleU4', basePrice: 2.5e7, cost_super: 3000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = 1 + Math.pow(Math.log10(player.coin.upgrades[1] + 10), 2);
                    if (player.coin.superUpgrades.includes(24)) eff *= this.effect_super();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1;
                    return 1 + Math.pow((Math.log10(player.coin.upgrades[2] + 10)), 2.15);
                }
            },
            {
                id: 15, super_id: 25, elementId: 'singleU5', basePrice: 6.5e8, cost_super: 4000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = Math.pow(Math.log10(player.coin.upgrades[4] + 10), 2);
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 0;
                    return this.effect() * 33; 
                }
            },
            {
                id: 21, super_id: 31, elementId: 'singleU6', basePrice: 5e9, cost_super: 5000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = new Decimal((GAIN.coin.click.effect().add(10)).log10()).mul(1.09);
                    if (player.coin.superUpgrades.includes(31)) eff = eff.mul(this.effect_super());
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1;
                    return new Decimal(GAIN.critical.multiplier());
                }
            },
            {
                id: 22, super_id: 32, elementId: 'singleU7', basePrice: 5e10, cost_super: 7500,
                softcap_start: function() { return this.unl_super() ? this.effect_super() : 100; },
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = Math.pow(MISC.amount_of_upgrades.coin() + 1, 0.85);
                    if (player.achievements.includes(17)) eff *= 1 + (0.2 * player.time.game.total.timer / 86400);
                    if (player.prestige.break.singles.includes(21)) eff *= UPGS.prestige.break.singles[21].effect();
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return !player.prestige.singleUpgrades.includes(23) || player.prestige.challenge.activated == 8 ? Math.min(eff, 100) : softCap(eff, this.softcap_start(), 0.5);
                },
                effect_super: function(x = this.unl_super() && this.unl()) { return x == 0 ? 1 : 1000000; }
            },
            {
                id: 23, super_id: 33, elementId: 'singleU8', basePrice: 7e11, cost_super: 10000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = Math.pow(player.achievements.length * 50, 0.4);
                    if (player.coin.superUpgrades.includes(33)) eff = Math.pow(eff, this.effect_super());
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1;
                    return 1 + player.achievement_rows.length / 2;
                }
            },
            {
                id: 24, super_id: 34, elementId: 'singleU9', basePrice: 2e12, cost_super: 15000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = 1 + (player.time.game.total.timer / 1200000);
                    eff = Math.min(eff, 1.25 * this.effect_super());
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) { return x == 0 ? 1 : 1.6; }
            },
            {
                id: 25, super_id: 35, elementId: 'singleU10', basePrice: 1e13, cost_super: 25000,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    let eff = 1.5;
                    if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
                    return eff;
                },
                effect_super: function(x = this.unl_super() && this.unl()) { return x == 0 ? 1 : 1; }
            }
        ])
    },
    prestige: {
        buyables: new UniversalBuyablesManager('prestige', [
            {
                id: 1, power: 10, basePrice: 10, elementId: 'pBuyableU1',
                effect: function(x = player.prestige.upgrades[1]) { return Math.pow(2, x); }
            },
        ]),
        singles: new UniversalSinglesManager('prestige', 'singleUpgrades', [
            { id: 11, elementId: 'pSingleU1', basePrice: 1 },
            { id: 12, elementId: 'pSingleU2', basePrice: 1, effect: function(x = this.unl()) {
                if (x == 0 || player.prestige.challenge.activated == 8) return 1;
                let eff = Math.pow(Math.log10(player.time.game.total.timer + 10), 0.02);
                if (player.shard.achievements[6]) eff *= UNL.shard_achievements[6].effect();
                return eff;
            }},
            { id: 13, elementId: 'pSingleU3', basePrice: 1, effect: function(x = this.unl()) { return x == 0 ? 1 : 1.5; } },
            { id: 14, elementId: 'pSingleU4', basePrice: 2 },
            { id: 21, elementId: 'pSingleU5', basePrice: 1 },
            { id: 22, elementId: 'pSingleU6', basePrice: 1 },
            { id: 23, elementId: 'pSingleU7', basePrice: 2 },
            { id: 24, elementId: 'pSingleU8', basePrice: 4 },
            { id: 31, elementId: 'pSingleU9', basePrice: 1, effect: function(x = this.unl()) {
                if (x == 0 || player.prestige.challenge.activated == 8) return 1;
                return !ACHS.has(27)
                    ? Math.max(2 * (1 - (0.01 / 6) * player.time.game.prestige.timer), 1)
                    : Math.max(10 * (1 - (0.01 / 6.6666666667) * player.time.game.prestige.timer), 1);
            }},
            { id: 32, elementId: 'pSingleU10', basePrice: 1, effect: function(x = this.unl()) {
                if (x == 0 || player.prestige.challenge.activated == 8) return 1;
                return Math.log10(player.time.game.prestige.timer + 10);
            }},
            { id: 33, elementId: 'pSingleU11', basePrice: 2 },
            { id: 34, elementId: 'pSingleU12', basePrice: 3, effect: function(x = this.unl()) {
                if (x == 0) return 1;
                return MISC.average.crystals_per_min()/100
            } },
            { id: 41, elementId: 'pSingleU13', basePrice: 10 },
            { id: 42, elementId: 'pSingleU14', basePrice: 100 },
            { id: 43, elementId: 'pSingleU15', basePrice: 1000 },
            { id: 44, elementId: 'pSingleU16', basePrice: 10000 }
        ]),
        break: {
            buyables: new UniversalBuyablesManager('prestige', [
                {
                    id: 1, power: 4, basePrice: 1e13, elementId: 'breakPBuyableU1',
                    cost: function(x = player.prestige.break.buyables[1]) {
                        let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                        let finalCost = Math.pow(10, logCost);

                        if (player.reflash.algo.includes(43)) {
                            finalCost = Math.pow(finalCost, 0.98);
                        }

                        return finalCost
                    },
                    effect: function(x = player.prestige.break.buyables[1]) { return Math.pow(x * 0.1 * UPGS.prestige.break.buyables[2].effect(), UPGS.reflash.algo.tree[24].effect()); },
                },
                {
                    id: 2, power: 8, basePrice: 1e15, elementId: 'breakPBuyableU2',
                    cost: function(x = player.prestige.break.buyables[2]) {
                        let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                        let finalCost = Math.pow(10, logCost);

                        if (player.reflash.algo.includes(43)) {
                            finalCost = Math.pow(finalCost, 0.98);
                        }

                        return finalCost
                    },
                    customCostMod: function() { return player.reflash.algo.includes(43) ? 0.9 : 1; },
                    effect: function(x = player.prestige.break.buyables[2]) { return Math.pow(1 + x / 5, UPGS.reflash.algo.tree[24].effect()); },
                },
                {
                    id: 3, power: 10000, basePrice: 5e17, elementId: 'breakPBuyableU3',
                    cost: function(x = player.prestige.break.buyables[3]) {
                        let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                        let finalCost = Math.pow(10, logCost);

                        if (player.reflash.algo.includes(43)) {
                            finalCost = Math.pow(finalCost, 0.98);
                        }

                        return finalCost
                    },
                    customCostMod: function() { return player.reflash.algo.includes(43) ? 0.9 : 1; },
                    effect: function(x = player.prestige.break.buyables[3]) { return Math.pow(Math.pow(3, x), UPGS.reflash.algo.tree[24].effect()); },
                },
                {
                    id: 4, power: 16, basePrice: 1e20, elementId: 'breakPBuyableU4',
                    cost: function(x = player.prestige.break.buyables[4]) {
                        let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                        let finalCost = Math.pow(10, logCost);

                        if (player.reflash.algo.includes(43)) {
                            finalCost = Math.pow(finalCost, 0.98);
                        }

                        return finalCost
                    },
                    customCostMod: function() { return player.reflash.algo.includes(43) ? 0.9 : 1; },
                    effect: function(x = player.prestige.break.buyables[4]) { return Math.pow(Math.pow(1.5, x), UPGS.reflash.algo.tree[24].effect()); },
                },
                {
                    id: 5, power: 10000, basePrice: 5e22, elementId: 'breakPBuyableU5',
                    cost: function(x = player.prestige.break.buyables[5]) {
                        let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                        let finalCost = Math.pow(10, logCost);

                        if (player.reflash.algo.includes(43)) {
                            finalCost = Math.pow(finalCost, 0.98);
                        }

                        return finalCost
                    },
                    customCostMod: function() { return player.reflash.algo.includes(43) ? 0.9 : 1; },
                    effect: function(x = player.prestige.break.buyables[5]) { return Math.pow(1 + x / 10000, UPGS.reflash.algo.tree[24].effect()) - 1; },
                }
            ], 'break.buyables'),
            singles: new UniversalSinglesManager('prestige', 'break.singles', [
                { id: 11, elementId: 'breakPSingleU1', basePrice: 1e25, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(Math.log10(player.prestige.this_reflash_currency + 1), 1.5); } },
                { id: 12, elementId: 'breakPSingleU2', basePrice: 1e30, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.log10(Math.log10(10+player.clicks.critical/2)); } },
                { id: 13, elementId: 'breakPSingleU3', basePrice: 1e35, effect: function(x = this.unl()) { return x == 0 ? 1 : 6; } },
                { id: 14, elementId: 'breakPSingleU4', basePrice: 1e40, effect: function(x = this.unl()) {
                    if (x == 0) return 0;
                    let timer = 0; for (let i = 1; i <= 12; i++) timer += player.challenge.time[i].timer;
                    return Math.pow(3600 / timer, 0.7);
                }},
                { id: 15, elementId: 'breakPSingleU5', basePrice: 1e45, effect: function(x = this.unl()) { return x == 0 ? 0 : MISC.free_upgrade.upower(); } },
                { id: 21, elementId: 'breakPSingleU6', basePrice: 1e50, effect: function(x = this.unl()) { return x == 0 ? 1 : Math.pow(1.25, player.supercrystal.total_currency); } },
                { id: 22, elementId: 'breakPSingleU7', basePrice: 1e60, effect: function(x = this.unl()) { return x == 0 ? 1 : 100; } },
                { id: 23, elementId: 'breakPSingleU8', basePrice: 1e70, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.log10(player.time.game.prestige.timer + 1) / 25; } },
                { id: 24, elementId: 'breakPSingleU9', basePrice: 1e100, effect: function(x = this.unl()) { return x == 0 ? 0 : 10; } },
                { id: 25, elementId: 'breakPSingleU10', basePrice: 1e15, effect: function(x = this.unl()) { return 1; } }
            ])
        }
    },
    shard: {
        buyables: new UniversalBuyablesManager('shard', [
            {
                id: 1, power: 2.6, basePrice: 1000, elementId: 'shBuyableU1',
                customCostMod: function() { return player.shard.singleUpgrades.includes(13) ? 1 / UPGS.shard.singles[13].effect() : 1; },
                effect: function(x = player.shard.upgrades[1]) {
                    let eff = Math.pow(2, x);
                    if (player.shard.singleUpgrades.includes(12)) eff *= UPGS.shard.singles[12].effect();
                    return eff;
                },
            },
            {
                id: 2, power: 4.6, basePrice: 1000, elementId: 'shBuyableU2',
                customCostMod: function() { return player.shard.singleUpgrades.includes(13) ? 1 / UPGS.shard.singles[13].effect() : 1; },
                effect: function(x = player.shard.upgrades[2]) {
                    let eff = Math.pow(3, x);
                    if (player.shard.singleUpgrades.includes(12)) eff *= UPGS.shard.singles[12].effect();
                    return eff;
                },
            },
            {
                id: 3, power: 62, basePrice: 5000, elementId: 'shBuyableU3',
                customCostMod: function() { return player.shard.singleUpgrades.includes(13) ? 1 / UPGS.shard.singles[13].effect() : 1; },
                effect: function(x = player.shard.upgrades[3]) {
                    let min = Math.pow(2, x);
                    let max = Math.pow(1.7, x);
                    if (player.shard.singleUpgrades.includes(12)) {
                        let eff12 = UPGS.shard.singles[12].effect();
                        min *= eff12;
                        max *= eff12;
                    }
                    return { min, max }; // Класс спокойно вернет этот объект туда, где он нужен!
                },
            }
        ]),
        singles: new UniversalSinglesManager('shard', 'singleUpgrades', [
            { id: 11, elementId: 'shSingleU1', basePrice: 500000, effect: function(x = this.unl()) { 
                let safeTotal = Math.min(player.shard.currency || 0, 1e308);
                return x == 0 ? 1 : 1 + Math.pow(safeTotal + 1, 0.04) * 6; } 
            },
            { id: 12, elementId: 'shSingleU2', basePrice: 1e12, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(player.prestige.broken_currency + 1, 0.055) * 3 } },
            { id: 13, elementId: 'shSingleU3', basePrice: 1e18, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(player.prestige.currency + 1, 0.0515) * 4; } },
            { id: 21, elementId: 'shSingleU4', basePrice: 1e24, effect: function(x = this.unl()) {
                if (x == 0) return 1;
                let eff = 1 + Math.pow(player.rune.total_currency, 1.5);
                if (ACHS.has(48)) eff *= 1.04;
                return eff;
            } },
            { id: 22, elementId: 'shSingleU5', basePrice: 1e100, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + player.supercrystal.total_currency * 0.0005; } },
            { id: 23, elementId: 'shSingleU6', basePrice: 1e200, effect: function(x = this.unl()) {
                if (x == 0) return 1
                let r = 1 + player.rune.total_currency * 1.25, s = 1 + player.supercrystal.total_currency * 1.75, p = 1 + Math.pow(player.prestige.resets, 0.225), c = 1 + Math.log10(player.prestige.this_reflash_currency+10)/1.2
                return r*s*p*c} 
            }
        ])
    },
    shop: {
        buyables: new ShopBuyablesManager('shop', [
            { id: 1, power: 1.05, basePrice: 1.3, maxAmount: 100, elementId: 'shopBuyableU1', effect: function(x = player.shop.upgrades[1]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[1] + this.bulk()) { return 1 + x / 50; } },
            { id: 2, power: 1.05, basePrice: 1.3, maxAmount: 100, elementId: 'shopBuyableU2', effect: function(x = player.shop.upgrades[2]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[2] + this.bulk()) { return 1 + x / 50; } },
            { id: 3, power: 1.06, basePrice: 1.4, maxAmount: 100, elementId: 'shopBuyableU3', effect: function(x = player.shop.upgrades[3]) { return 1 + x / 66.666666; }, next_effect: function(x = player.shop.upgrades[3] + this.bulk()) { return 1 + x / 66.666666; } },
            { id: 4, power: 1.065, basePrice: 1.5, maxAmount: 100, elementId: 'shopBuyableU4', effect: function(x = player.shop.upgrades[4]) { return 1 + x / 100; }, next_effect: function(x = player.shop.upgrades[4] + this.bulk()) { return 1 + x / 100; } },
            { id: 5, power: 1.07, basePrice: 5, maxAmount: 50, elementId: 'shopBuyableU5', effect: function(x = player.shop.upgrades[5]) { return 1 + x / 2.5; }, next_effect: function(x = player.shop.upgrades[5] + this.bulk()) { return 1 + x / 2.5; } },
            { id: 6, power: 1.075, basePrice: 10, maxAmount: 100, elementId: 'shopBuyableU6', effect: function(x = player.shop.upgrades[6]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[6] + this.bulk()) { return 1 + x / 50; } },
            { id: 7, power: 1.2, basePrice: 15, maxAmount: 20, elementId: 'shopBuyableU7', effect: function(x = player.shop.upgrades[7]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[7] + this.bulk()) { return 1 + x / 10; } },
            { id: 8, power: 1.075, basePrice: 5, maxAmount: 100, elementId: 'shopBuyableU8', effect: function(x = player.shop.upgrades[8]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[8] + this.bulk()) { return 1 + x / 10; } },
            { id: 9, power: 1.075, basePrice: 5, maxAmount: 100, elementId: 'shopBuyableU9', effect: function(x = player.shop.upgrades[9]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[9] + this.bulk()) { return 1 + x / 10; } },
            { id: 10, power: 1.08, basePrice: 5.5, maxAmount: 100, elementId: 'shopBuyableU10', effect: function(x = player.shop.upgrades[10]) { return 1 + x / 15; }, next_effect: function(x = player.shop.upgrades[10] + this.bulk()) { return 1 + x / 15; } },
            { id: 11, power: 1.09, basePrice: 6, maxAmount: 100, elementId: 'shopBuyableU11', effect: function(x = player.shop.upgrades[11]) { return 1 + x / 75; }, next_effect: function(x = player.shop.upgrades[11] + this.bulk()) { return 1 + x / 75; } },
            { id: 12, power: 1.25, basePrice: 20, maxAmount: 100, elementId: 'shopBuyableU12', effect: function(x = player.shop.upgrades[12]) { return x * 40; }, next_effect: function(x = player.shop.upgrades[12] + this.bulk()) { return x * 40; } },
            { id: 13, power: 1.4, basePrice: 50, maxAmount: 20, elementId: 'shopBuyableU13', effect: function(x = player.shop.upgrades[13]) { return 1 + x / 30; }, next_effect: function(x = player.shop.upgrades[13] + this.bulk()) { return 1 + x / 30; } },
            { id: 14, power: 1.3, basePrice: 25, maxAmount: 50, elementId: 'shopBuyableU14', effect: function(x = player.shop.upgrades[14]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[14] + this.bulk()) { return 1 + x / 10; } },
            { id: 15, power: 1.5, basePrice: 120, maxAmount: 10, elementId: 'shopBuyableU15', effect: function(x = player.shop.upgrades[15]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[15] + this.bulk()) { return 1 + x / 10; } },
            { id: 16, power: 1.25, basePrice: 10, maxAmount: 25, elementId: 'shopBuyableU16', effect: function(x = player.shop.upgrades[16]) { return 1 + x / 12.5; }, next_effect: function(x = player.shop.upgrades[16] + this.bulk()) { return 1 + x / 12.5; } },
            { id: 17, power: 1.075, basePrice: 10, maxAmount: 100, elementId: 'shopBuyableU17', effect: function(x = player.shop.upgrades[17]) { return x / 50; }, next_effect: function(x = player.shop.upgrades[17] + this.bulk()) { return x / 50; } },
            { id: 18, power: 1.085, basePrice: 5, maxAmount: 100, elementId: 'shopBuyableU18', effect: function(x = player.shop.upgrades[18]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[18] + this.bulk()) { return 1 + x / 10; } },
            { id: 19, power: 1.6, basePrice: 200, maxAmount: 10, elementId: 'shopBuyableU19', effect: function(x = player.shop.upgrades[19]) { return Math.pow(4, x); }, next_effect: function(x = player.shop.upgrades[19] + this.bulk()) { return Math.pow(4, x) } },
        ], 'upgrades'),

        special: new ShopSpecialManager('shop', 'special', [
            // { id: 1, elementId: 'shopSingleU1', basePrice: 250 },
            { id: 1, elementId: 'shopSingleU1', basePrice: 500 },
            { id: 2, elementId: 'shopSingleU2', basePrice: 1000 },
            { id: 3, elementId: 'shopSingleU3', basePrice: 1500 },
            { id: 4, elementId: 'shopSingleU4', basePrice: 1000 },
            { id: 5, elementId: 'shopSingleU5', basePrice: 3000 },
            { id: 6, elementId: 'shopSingleU6', basePrice: 100 },
            { id: 7, elementId: 'shopSingleU7', basePrice: 10000 },
            { id: 8, elementId: 'shopSingleU8', basePrice: 50000 },
        ]),

        permanent: new ShopPermanentManager('shop', [
            { id: 1, power: 2, basePrice: 100, maxAmount: 5, elementId: 'shopPermanentU1', effect: function(x = player.shop.permanentUpgrades[1]) { return 1 + x / 2; }, next_effect: function(x = player.shop.permanentUpgrades[1] + 1) { return 1 + x / 2; } },
            { id: 2, power: 5, basePrice: 1000, maxAmount: 3, elementId: 'shopPermanentU2', effect: function(x = player.shop.permanentUpgrades[2]) { return x == 0 ? 0 : Math.pow(2, x-1); }, next_effect: function(x = player.shop.permanentUpgrades[2] + 1) { return x == 0 ? 0 : Math.pow(2, x-1); } },
            { id: 3, power: 1.5, basePrice: 1400, maxAmount: 5, elementId: 'shopPermanentU3', effect: function(x = player.shop.permanentUpgrades[3]) { return 0.5 + 0.02 * x; }, next_effect: function(x = player.shop.permanentUpgrades[3] + 1) { return 0.5 + 0.02 * x; } },
            { id: 4, power: 1.5, basePrice: 1500, maxAmount: 5, elementId: 'shopPermanentU4', effect: function(x = player.shop.permanentUpgrades[4]) { return !x ? 1 : 75*x; }, next_effect: function(x = player.shop.permanentUpgrades[4] + 1) { return !x ? 1 : 75*x; } },
            { id: 5, power: 1.4, basePrice: 100, maxAmount: 5, elementId: 'shopPermanentU5', effect: function(x = player.shop.permanentUpgrades[5]) { return !x ? 0 : x * 5; }, next_effect: function(x = player.shop.permanentUpgrades[5] + 1) { return !x ? 0 : x * 5; } },
            { id: 6, power: 1.25, basePrice: 250, maxAmount: 10, elementId: 'shopPermanentU6', effect: function(x = player.shop.permanentUpgrades[6]) { return 1 + x / 3; }, next_effect: function(x = player.shop.permanentUpgrades[6] + 1) { return 1 + x / 3; } },
            { id: 7, power: 1.75, basePrice: 150, maxAmount: 10, elementId: 'shopPermanentU7', effect: function(x = player.shop.permanentUpgrades[7]) { return 1 + x / 40; }, next_effect: function(x = player.shop.permanentUpgrades[7] + 1) { return 1 + x / 40; } },
            { id: 8, power: 1.5, basePrice: 100, maxAmount: 20, elementId: 'shopPermanentU8', effect: function(x = player.shop.permanentUpgrades[8]) { return !x ? 1 : Math.pow(10, x / 6.666667) * 1000; }, next_effect: function(x = player.shop.permanentUpgrades[8] + 1) { return Math.pow(10, x / 6.666667) * 1000} },
        ], 'permanentUpgrades'),

        temporaryBonuses() { 
            const used = player.shop.items.used
            let total = 0
        
            for (let i = 1; i <= 6; i++) {
                if (used[i] > 0 && i != 3) {
                    total++
                }
            }
            return total
        },
        items_limit() {
            return this.temporaryBonuses() >= 3
        },
        respec_items() {
            for (let i = 1; i <= 6; i++) {
                player.shop.items.used[i] = 0
                player.shop.items.timer[i] = 0
            }
        },

        items: new ShopItemsManager([
            { id: 1, maxAmount: 5, elementId: 'shopItem1', cost: () => 80, effect: () => { return player.shop.items.used[1]} },
            { id: 2, maxAmount: 3, elementId: 'shopItem2', cost: () => 250, effect: () => { return player.shop.items.used[2] } },
            { id: 3, maxAmount: 10, elementId: 'shopItem3', cost: () => 120, effect: () => GAIN.offline_gain_time_warp(180) },
            { id: 4, maxAmount: 1, elementId: 'shopItem4', cost: () => 600, effect: () => { return player.shop.items.used[4]*1.05 }},
            { id: 5, maxAmount: 1, elementId: 'shopItem5', cost: () => 1000, effect: () => { return player.shop.items.used[5]*1.05 }},
            { id: 6, maxAmount: 2, elementId: 'shopItem6', cost: () => 300, effect: () => { return player.shop.items.used[6] }}
        ])
    },
    supercrystal: new UniversalSinglesManager('supercrystal', 'upgrades', [
        { id: 11, elementId: 'sCSingleU1', basePrice: 1, effect: function(x = this.unl()) { return x ? 1.5 : 1; } },
        { id: 12, elementId: 'sCSingleU2', basePrice: 1, effect: function(x = this.unl()) { return x ? 3 : 1; } },
        { id: 13, elementId: 'sCSingleU3', basePrice: 1, effect: function(x = this.unl()) { return x ? 2 : 1; } },
        { id: 21, elementId: 'sCSingleU4', basePrice: 1, effect: function(x = this.unl()) { return x ? 2 : 1; } },
        { id: 22, elementId: 'sCSingleU5', basePrice: 1, effect: function(x = this.unl()) { return x ? 3 : 1; } },
        { id: 23, elementId: 'sCSingleU6', basePrice: 1, effect: function(x = this.unl()) { return x ? 1e3 : 1; } },
        { id: 31, elementId: 'sCSingleU7', basePrice: 1, effect: function(x = this.unl()) { return x ? 5 : 1; } },
        { id: 32, elementId: 'sCSingleU8', basePrice: 1, effect: function(x = this.unl()) { return 1; } },
        { id: 33, elementId: 'sCSingleU9', basePrice: 1, effect: function(x = player.supercrystal.total_currency) { return Math.pow(2, x); } }
    ]),
    minerals: new MineralManager([
        {
            id: 1, elementId: 'mineral1',
            cost1: x => 1 + Math.floor(x / 10),
            cost2: x => 1e15 * Math.pow(100, x) * (Math.pow(1000000, Math.floor(x / 10))),
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : 1 + this.applyMods(Math.log10(Math.log10(x + 1)+1)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : 1 + this.applyMods(x / 3.5); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : 1 + this.applyMods(Math.log10(Math.log10(x + 1)+1)); }
        },
        {
            id: 2, elementId: 'mineral2',
            cost1: x => 1 + Math.floor(x / 10),
            cost2: x => 1e15 * Math.pow(100, x) * (Math.pow(1000000, Math.floor(x / 10))),
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(1 + Math.pow(x * 8, 3)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(9, x / 1.525)); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 0 : this.applyMods(Math.pow(x * 15, 2.215)); }
        },
        {
            id: 3, elementId: 'mineral3',
            cost1: x => 1 + Math.floor(x / 10),
            cost2: x => 1e15 * Math.pow(100, x) * (Math.pow(1000000, Math.floor(x / 10))),
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(1.85, x / 1.25)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(3, x / 1.65)); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(2, x / 3)); }
        },
        {
            id: 4, elementId: 'mineral4',
            cost1: x => 2 + Math.floor(x / 5),
            cost2: x => ACHS.has(68) ? 1e90 * Math.pow(100000, x) * (Math.pow(1000000, Math.floor(x / 10))) : 1e111 * Math.pow(100000, x) * (Math.pow(1000000, Math.floor(x / 10))),
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(3, x / 1.7)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(1.045, x)); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(x*33); }
        }
    ]),
    fortune: {
        boosts: new FortuneBoostsManager([
            { id: 1, generatorType: 'digits', 
                min: () => Math.pow(Math.pow(10, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1500, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 2, generatorType: 'digits', 
                min: () => Math.pow(Math.pow(1.5, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(5, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 3, generatorType: 'digits', 
                min: () => Math.pow(Math.pow(2, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(8, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 4, generatorType: 'float2', 
                min: () => Math.pow(Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.045, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 5, generatorType: 'float2', 
                min: () => Math.pow(Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.065, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 6, generatorType: 'digits', 
                min: () => Math.pow(Math.pow(1.5, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(4, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 7, generatorType: 'float3', 
                min: () => Math.pow(Math.pow(1.015, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.095, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 8, generatorType: 'float2', 
                min: () => Math.pow(Math.pow(2.5, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(4.5, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) },
            { id: 9, generatorType: 'float3', 
                min: () => Math.pow(Math.pow(1.055, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.115, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1 )* (ACHS.has(69) ? 1.05 : 1)  * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 10, generatorType: 'int', 
                min: () => 2, max: () => 2 },
            { id: 11, generatorType: 'float3', 
                min: () => Math.pow(Math.pow(1.005, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.0125, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1)  * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 12, generatorType: 'float3', 
                min: () => Math.pow(Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()), 
                max: () => Math.pow(Math.pow(1.03, UPGS.fortune.upgrades.buyables[2].effect() * UPGS.shop.buyables[13].effect()), UPGS.reflash.algo.tree[14].effect()) * (ACHS.has(54) ? 1.05 : 1) * (ACHS.has(69) ? 1.05 : 1) }
        ]),
        upgrades: {
            buyables: new FortuneBuyablesManager('supercrystal', [
                { 
                    id: 1, basePrice: 1, elementId: 'fortuneBuyableU1', 
                    cost: function(x = player.fortune.upgrades.buyables[1]) { return this.basePrice + x - player.fortune.upgrades.singles.includes(13); }, 
                    effect: function(x = player.fortune.upgrades.buyables[1]) { return x == 0 ? 1 : 1 + x * 0.5; } 
                },
                { 
                    id: 2, basePrice: 1, elementId: 'fortuneBuyableU2', 
                    cost: function(x = player.fortune.upgrades.buyables[2]) { return this.basePrice + x - player.fortune.upgrades.singles.includes(13); }, 
                    effect: function(x = player.fortune.upgrades.buyables[2]) { return x == 0 ? 1 : 1 + x * 0.15; } 
                },
                { 
                    id: 3, basePrice: 2, elementId: 'fortuneBuyableU3', 
                    cost: function(x = player.fortune.upgrades.buyables[3]) { return this.basePrice + x - player.fortune.upgrades.singles.includes(13); }, 
                    effect: function(x = player.fortune.upgrades.buyables[3]) { return x == 0 ? 1 : Math.pow(2, x); } 
                }
            ], 'fortune.upgrades.buyables'),
            
            singles: new FortuneSinglesManager('supercrystal', 'fortune.upgrades.singles', [
                { id: 11, elementId: 'fortuneSingleU1', req: () => 27 },
                { id: 12, elementId: 'fortuneSingleU2', req: () => 30 },
                { id: 13, elementId: 'fortuneSingleU3', req: () => 32 },
                { id: 21, elementId: 'fortuneSingleU4', req: () => 34 },
                { id: 22, elementId: 'fortuneSingleU5', req: () => 36 },
                { id: 23, elementId: 'fortuneSingleU6', req: () => 38 },
                { id: 31, elementId: 'fortuneSingleU7', req: () => 40 },
                { id: 32, elementId: 'fortuneSingleU8', req: () => 45 },
                { id: 33, elementId: 'fortuneSingleU9', req: () => 50 }
            ])
        }
    },
    balance: {
        buyables: new BalanceBuyablesManager('balance', [
            { id: 1, basePrice: 10, power: 1.125, elementIndex: 2, 
                cost: function(x = player.balance.upgrades.buyables[1]) {
                    let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                    let finalCost = Math.pow(10, logCost);

                    if (player.reflash.algo.includes(62)) {
                        finalCost = Math.pow(finalCost, UPGS.reflash.algo.tree[15].effect());
                    }

                    return finalCost
                },
                effect: function(x = player.balance.upgrades.buyables[1]) { return x == 0 ? 1 : 1 + x / 250; } },
            { id: 2, basePrice: 10, power: 1.15, elementIndex: 3, 
                cost: function(x = player.balance.upgrades.buyables[2]) {
                    let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                    let finalCost = Math.pow(10, logCost);

                    if (player.reflash.algo.includes(62)) {
                        finalCost = Math.pow(finalCost, UPGS.reflash.algo.tree[15].effect());
                    }

                    return finalCost
                },
                effect: function(x = player.balance.upgrades.buyables[2]) { return x == 0 ? 1 : Math.min(1 + x / 400, 2); } },
            { id: 3, basePrice: 50, power: 1.15, elementIndex: 4, 
                cost: function(x = player.balance.upgrades.buyables[3]) {
                    let logCost = Math.log10(this.basePrice) + x * Math.log10(this.power);
                    let finalCost = Math.pow(10, logCost);

                    if (player.reflash.algo.includes(62)) {
                        finalCost = Math.pow(finalCost, UPGS.reflash.algo.tree[15].effect());
                    }

                    return finalCost
                },
                effect: function(x = player.balance.upgrades.buyables[3]) { return x == 0 ? 1 : Math.pow(1.05, x); } }
        ], 'upgrades.buyables'),

        singles: new BalanceSinglesManager('balance', 'upgrades.singles', [
            { id: 11, elementIndex: 0, basePrice: 100000 },
            { id: 12, elementIndex: 1, basePrice: 100000 },
            { id: 13, elementIndex: 2, basePrice: 1000000 },
            { id: 21, elementIndex: 3, basePrice: 2500000 },
            { id: 22, elementIndex: 4, basePrice: 2500000 },
            { id: 23, elementIndex: 5, basePrice: 1e7 },
            { id: 31, elementIndex: 6, basePrice: 1e8 },
            { id: 32, elementIndex: 7, basePrice: 1e8 },
            { id: 33, elementIndex: 8, basePrice: 1e10 }
        ])
    },
    reflash: {
        buyables: new UniversalBuyablesManager('reflash', [
            {
                id: 1, power: 6, basePrice: 4, elementId: 'rBuyableU1',
                effect: function(x = player.reflash.upgrades[1]) { return Math.pow(2, x); }
            },
        ]),
        singles: new UniversalSinglesManager('reflash', 'singleUpgrades', [
            { id: 11, elementId: 'rSingleU1', basePrice: 2, effect: function(x = this.unl()) {
                if (x == 0) return 1;
                let eff = Math.pow(1 + player.reflash.resets, 7);
                return eff;
            }},
            { id: 12, elementId: 'rSingleU2', basePrice: 16, effect: function(x = this.unl()) {
                if (x == 0) return 1;
                let eff = 1 + Math.pow(player.time.game.reflash.timer, 0.5);
                return eff;
            }},
            { id: 13, elementId: 'rSingleU3', basePrice: 128 },
            { id: 21, elementId: 'rSingleU4', basePrice: 9999 },
            { id: 22, elementId: 'rSingleU5', basePrice: 9999 },
            { id: 23, elementId: 'rSingleU6', basePrice: 9999 },
        ]),
        accelerator: new AcceleratorManager('reflash', [
            {
                id: 1, power: 3, basePrice: 4, elementId: 'acceleratorU1',
                effect: function(x = player.reflash.acceleratorUpgrades[1], y = UPGS.reflash.accelerator[3].effect()) { return x*0.2*y; }
            },
            {
                id: 2, power: 3, basePrice: 4, elementId: 'acceleratorU2',
                effect: function(x = player.reflash.acceleratorUpgrades[2], y = UPGS.reflash.accelerator[3].effect()) { return x*0.25*y; }
            },
            {
                id: 3, power: 3, basePrice: 4, elementId: 'acceleratorU3',
                effect: function(x = player.reflash.acceleratorUpgrades[3]) { return 1+x*0.25; }
            },
            {
                id: 4, power: 3, basePrice: 4, elementId: 'acceleratorU4',
                effect: function(x = player.reflash.acceleratorUpgrades[4]) { return 1+x*0.125; }
            },
            {
                id: 5, power: 1.5, basePrice: 50, elementId: 'acceleratorU5',
                effect: function(x = player.reflash.acceleratorUpgrades[5]) {
                    if (x === 0) return 1;
                    // 1. Получаем случайный множитель текущего забега (от 0.1 до 0.25)
                    let basePower = getAcceleratorPower(); 
                    // 2. Получаем бонус 4-го улучшения (+10% за каждый уровень)
                    let bonusU4 = UPGS.reflash.accelerator[4].effect(); 
                    // 3. Считаем: 1 + (Кол-во аксов * Силу) * Бонус 4-го улучшения
                    return 1 + (x * basePower * bonusU4); 
                },
                min_effect: function(x=UPGS.reflash.accelerator[1].effect(), y=UPGS.reflash.accelerator[4].effect(), z=player.reflash.acceleratorUpgrades[5]) {
                    x *= z
                    return (1+1*(z+x))*y
                },
                max_effect: function(x=UPGS.reflash.accelerator[2].effect(), y=UPGS.reflash.accelerator[4].effect(), z=player.reflash.acceleratorUpgrades[5]) {
                    x *= z
                    return (1+3*(z+x))*y
                }
            },
        ], 'acceleratorUpgrades'),
        algo: {
            tree: [ // lmao looks weird and fine at same time
                //bit tree                  nodes to draw line btwn required nodes              cpu req level   required to not have    required to have at least one           cost of node
                { id: 11, row: 1, col: 1,   draw: [],               req: [],                                                                                                    cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 100 : 1} }, 
                { id: 21, row: 2, col: 1,   draw: [11],             req: [11],                                                                                                  cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 5 : 0}  },
                { id: 22, row: 2, col: 2,   draw: [11],             req: [11],                                                                                                  cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 10 : 1}  },
                { id: 23, row: 2, col: 3,   draw: [11],             req: [11],                                                                                                  cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? true : false}  },
                { id: 24, row: 2, col: 4,   draw: [23],             req: [23],                                                                                                  cost: 4,    effect(x=player.reflash.algo.includes(this.id)) {return x ? true : false } },
                { id: 31, row: 3, col: 1,   draw: [21],             req: [21],                                                                                                  cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? { shard: 1e9, rune: 3} : { shard: 0, rune: 0} } },
                { id: 32, row: 3, col: 2,   draw: [22],             req: [22],                                                                                                  cost: 2,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 10 : 1}  },
                { id: 33, row: 3, col: 3,   draw: [23],             req: [23],                                                                                                  cost: 2,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 10 : 1}  },
                { id: 34, row: 3, col: 4,   draw: [23],             req: [23],                                                                                                  cost: 1,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 0.1 : 0}  },
                { id: 41, row: 4, col: 1,   draw: [31],             req: [31],                                                                                                  cost: 3,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 3 : 0 }  },
                { id: 42, row: 4, col: 2,   draw: [32],             req: [32],                                                                                                  cost: 2,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 100 : 1}  },
                { id: 43, row: 4, col: 3,   draw: [33],             req: [33],                                                                                                  cost: 6,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 0.975 : 1}  },
                { id: 44, row: 4, col: 4,   draw: [34],             req: [34],                                                                                                  cost: 4,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 2 : 1}  },
                { id: 51, row: 5, col: 2,   draw: [41, 42, 43],                                                                         at_least_one_req: [41, 42, 43],         cost: 6     },
                // byte tree                nodes to draw line btwn required nodes              cpu req level   required to not have    required to have at least one           cost of node
                { id: 61, row: 6, col: 2,   draw: [51],             req: [51],                  cpu_req: 1,                             at_least_one_req: [41, 42, 43],         cost: 8,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 1.25 : 1}},
                { id: 62, row: 6, col: 3,   draw: [61],             req: [61],                  cpu_req: 2,                                                                     cost: 16,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 0.75 : 1} },
                { id: 63, row: 6, col: 4,   draw: [62],             req: [62],                  cpu_req: 3,                                                                     cost: 64,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 1.25 : 1}},
                { id: 71, row: 7, col: 1,   draw: [61],             req: [61],                  cpu_req: 1,     not_req: [72, 73],                                              cost: 8,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 1e15 : 1}},
                { id: 81, row: 8, col: 1,   draw: [71],             req: [71],                  cpu_req: 1,                                                                     cost: 8,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 1e9 : 1}},
                { id: 91, row: 9, col: 1,   draw: [81],             req: [81],                  cpu_req: 1,                                                                     cost: 8,    effect(x=player.reflash.algo.includes(this.id)) {return x ? 1e12 : 1}},
                { id: 72, row: 7, col: 2,   draw: [61],             req: [61],                  cpu_req: 2,     not_req: [71, 73],                                              cost: 16    },
                { id: 82, row: 8, col: 2,   draw: [72],             req: [72],                  cpu_req: 2,                                                                     cost: 16,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 1.5 : 1}},
                { id: 92, row: 9, col: 2,   draw: [82],             req: [82],                  cpu_req: 2,                                                                     cost: 16,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 2 : 1}},
                { id: 73, row: 7, col: 3,   draw: [61],             req: [61],                  cpu_req: 3,     not_req: [71, 72],                                              cost: 24,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 0.85 : 1}},
                { id: 83, row: 8, col: 3,   draw: [73],             req: [73],                  cpu_req: 3,                                                                     cost: 24,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 1.015 : 1} },
                { id: 93, row: 9, col: 3,   draw: [83],             req: [83],                  cpu_req: 3,                                                                     cost: 24,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 0.8 : 1} },
                { id: 101, row: 10, col: 2, draw: [91, 92, 93],                                 cpu_req: 3,                             at_least_one_req: [91, 92, 93],         cost: 24,   effect(x=player.reflash.algo.includes(this.id)) {return x ? 3 : 1}},

                //пример
                // { 
                //     id: 62, 
                //     row: 6, 
                //     col: 3, 
                //     cpu_req: 2,                 
                //     not_req: [24, 34],          
                //     at_least_one_req: [61, 51], 
                //     cost: 16 
                // }
            ],
            buy(id) {
                if (!player.reflash.algo) player.reflash.algo = [];
                if (player.reflash.algo.includes(id)) return;
                
                let node = this.tree.find(n => n.id === id);
                if (!node) return;
                
                let maxNodes = UPGS.reflash.computer && UPGS.reflash.computer[5] ? UPGS.reflash.computer[5].effect() : Infinity;
                if (player.reflash.algo.length >= maxNodes) return;

                if (!this.checkRequirements(node)) return;
                
                if (player.reflash.currency >= node.cost) {
                    player.reflash.currency -= node.cost;
                    node.id != 51 ? player.reflash.spent_currency_on_algo += node.cost : null;
                    player.reflash.algo.push(id);
                    this.updateStates();
                    this.update_if_bought(id)
                }
            },

            checkRequirements(node) {
                if (node.cpu_req !== undefined) {
                    let currentCpu = player.reflash.computer && player.reflash.computer[3] ? player.reflash.computer[3] : 0;
                    if (currentCpu < node.cpu_req) return false;
                }

                if (node.not_req !== undefined) {
                    let notArray = Array.isArray(node.not_req) ? node.not_req : [node.not_req];
                    let hasForbidden = notArray.some(r => player.reflash.algo.includes(r));
                    if (hasForbidden) return false;
                }

                if (node.at_least_one_req !== undefined && Array.isArray(node.at_least_one_req)) {
                    let hasOne = node.at_least_one_req.some(r => player.reflash.algo.includes(r));
                    if (!hasOne) return false;
                }

                if (node.req !== undefined) {
                    let reqMet = node.req.length === 0 || node.req.every(r => player.reflash.algo.includes(r));
                    if (!reqMet) return false;
                }

                return true;
            },

            updateStates() {
                if (!player.reflash.algo) return;
                
                let maxNodes = UPGS.reflash.computer && UPGS.reflash.computer[5] ? UPGS.reflash.computer[5].effect() : Infinity;
                let reachedNodeLimit = player.reflash.algo.length >= maxNodes;

                this.tree.forEach(node => {
                    let btn = document.getElementById('algoNode_' + node.id);
                    let div = document.getElementById('algoNodeGhost_' + node.id);
                    if (!btn) return;
                    
                    let isBought = player.reflash.algo.includes(node.id);
                    let reqMet = this.checkRequirements(node);
                    let canAfford = player.reflash.currency >= node.cost;
                    let cpuLocked = player.reflash.computer[3] < node.cpu_req

                    if (isBought) {
                        btn.classList.add('bought');
                        btn.classList.remove('locked');
                        btn.disabled = false;
                    } else if (!reqMet || reachedNodeLimit) {
                        btn.classList.add('locked');
                        btn.classList.remove('bought');
                        btn.disabled = true;
                    } else {
                        btn.classList.remove('locked');
                        btn.classList.remove('bought');
                        btn.disabled = !canAfford;
                    }

                    if (cpuLocked) {
                        div.classList.add('locked')
                    }
                    else div.classList.remove('locked')
                    if (isBought) {
                        div.classList.remove('locked')
                    } 

                    let parentIds = [];
                    if (node.draw && Array.isArray(node.draw)) {
                        parentIds = node.draw;
                    }

                    parentIds.forEach(parentId => {
                        let line = document.getElementById(`algoLine_${parentId}_${node.id}`);
                        if (line) {
                            let parentBought = player.reflash.algo.includes(parentId);
                            let isAtLeastOne = node.at_least_one_req && node.at_least_one_req.includes(parentId);

                            if (isAtLeastOne) {
                                if (isBought && parentBought) {
                                    line.setAttribute('stroke', 'color-mix(in srgb, var(--reflash) 80%, black 60%)');
                                } else {
                                    line.setAttribute('stroke', '#333333');
                                }
                            } else {
                                let childCanBeUnlocked = this.checkRequirements(node);

                                if (isBought && parentBought) {
                                    line.setAttribute('stroke', 'color-mix(in srgb, var(--reflash) 80%, black 60%)');
                                }
                                else if (parentBought && childCanBeUnlocked) {

                                    line.setAttribute('stroke', '#adabab');
                                }
                                else {
                                    line.setAttribute('stroke', '#333333');
                                }
                            }
                        }
                    });
                });

                const targetIds = [11, 23, 22, 21, 31, 32, 33, 41, 24, 43, 42, 34, 44];
                let hasAll = targetIds.every(id => player.reflash.algo.includes(id));
                if (hasAll && !ACHS.has(65)) ACHS.unl(65);
            },
            respec() {
                if (!player.reflash.algo || !player.reflash.respecTree) return;
                let refund = player.reflash.spent_currency_on_algo;
                player.reflash.currency += refund;
                player.reflash.spent_currency_on_algo = 0;
                if (player.reflash.algo.includes(51)) player.reflash.algo = [51];
                else player.reflash.algo = [];
                this.updateStates();
            },
            update_if_bought(id) {
                switch (id) {
                    case 21:
                        player.supercrystal.currency += UPGS.reflash.algo.tree[1].effect()
                        player.supercrystal.total_currency += UPGS.reflash.algo.tree[1].effect()
                        break;
                    case 23:
                        player.prestige.singleUpgrades = [11,12,13,14,21,22,23,24,31,32,33,34,41,42,43,44]
                        player.shard.singleUpgrades = [11,12,13,21,22,23]
                        player.shard.unlockables = [1,2,3,4]
                        break;
                    case 24:
                        player.challenge.completed = [1,2,3,4,5,6,7,8,9,10,11,12]
                        for (let i = 1; i <= 12; i++) {
                            updateTimeObject(player.challenge.time[i], 0.05)
                        } 
                        break;
                    case 31:
                        player.shard.currency += UPGS.reflash.algo.tree[5].effect().shard
                        player.rune.currency += UPGS.reflash.algo.tree[5].effect().rune
                        player.rune.total_currency += UPGS.reflash.algo.tree[5].effect().rune
                        break;
                    case 33:
                        player.fortune.upgrades.singles.push(31)
                        break;
                    case 41:
                        player.fortune.tokens += 3
                        player.fortune.total_tokens += 3
                        break;
                    default:
                        break; 
                }
            }
        },
        computer: new ComputerManager('reflash', [
            {
                id: 1, power: 5, basePrice: 3, elementId: 'computerComponent1', maxAmount: 4,
                effect: function(x = player.reflash.computer[1]) { return 1 + x; },
                consumation: function(x = player.reflash.computer[1]) { return x * 6; },
                next_effect: function() { return this.effect(x = player.reflash.computer[1] + 1) },
                next_consumation: function() { return this.consumation(x = player.reflash.computer[1] + 1) },
            },
            {
                id: 2, power: 4, basePrice: 3, elementId: 'computerComponent2', maxAmount: 3,
                effect: function(x = player.reflash.computer[2]) { return 25 * (x + 1); },
                next_effect: function() { return this.effect(x = player.reflash.computer[2] + 1) },
            },
            {
                id: 3, power: 4, basePrice: 4, elementId: 'computerComponent3', maxAmount: 3,
                // effect: function(x = player.reflash.computer[3]) { return Math.pow(2, x); },
                consumation: function(x = player.reflash.computer[3]) { return x * 5; },
                next_consumation: function() { return this.consumation(x = player.reflash.computer[3] + 1) },
            },
            {
                id: 4, power: 4, basePrice: 3, elementId: 'computerComponent4', maxAmount: 3,
                effect: function(x = player.reflash.computer[4]) { return 4 * Math.pow(2, x); },
                consumation: function(x = player.reflash.computer[4]) { return x * 2; },
                next_effect: function() { return this.effect(x = player.reflash.computer[4] + 1) },
                next_consumation: function() { return this.consumation(x = player.reflash.computer[4] + 1) },
            },
            {
                id: 5, power: 4, basePrice: 3, elementId: 'computerComponent5', maxAmount: 3,
                effect: function(x = player.reflash.computer[5]) { return 12 + x * 3 },
                consumation: function(x = player.reflash.computer[5]) { return x * 3; },
                next_effect: function() { return this.effect(x = player.reflash.computer[5] + 1) },
                next_consumation: function() { return this.consumation(x = player.reflash.computer[5] + 1) },
            },
        ], 'computer'),
    }
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "M" || event.key == "m" || event.key == "ь" || event.key == "Ь") && player.clicks.real >= 1000) {
    maxBuyAll(true);
    }
});

// function maxBuyAll () {
//     for (let i = 1; i <= 2; i++) {
//         for (let j = 1; j <= 5; j++) {
//                 UPGS.coin.singles.buy(i*10+j)
//         }
//     }
//     UPGS.coin.buyables.buyMax()
// }

function maxBuyAllPrestige() {
    UPGS.prestige.buyables.buyMax(true)
}

let buyAllPrestige_interval = ''
function enableMaxBuyAllPrestigeAutomation(change=true) {
    if (change) player.automation.small.prestige = !player.automation.small.prestige
    if (player.automation.small.prestige) {
        buyAllPrestige_interval = setInterval(() => UPGS.prestige.buyables.buyMax(), 50)
    }
    else {
        clearInterval(buyAllPrestige_interval)
        buyAllPrestige_interval = null
    }
} 

function maxBuyAllShards() {
    UPGS.shard.buyables.buyMax(true)
}

function maxBuyAllBalance() {
    UPGS.balance.buyables.buyMax(true)
}

function maxBuyAllBreakPrestige() {
    UPGS.prestige.break.buyables.buyMax(true)
}

// --- ДИНАМИЧЕСКАЯ ПРИВЯЗКА КНОПОК УЛУЧШЕНИЙ ---

// 1. Покупаемые улучшения монет (ID: 1-5)
UPGS.coin.buyables._keys.forEach(id => {
    document.getElementById(`buyableU${id}`).addEventListener("click", () => buyUpgrade(id));
});

// 2. Одиночные улучшения монет (ID: 11-15, 21-25)
// У кнопок ID идут по порядку (singleU1...singleU10), поэтому используем index
UPGS.coin.singles._keys.forEach((id, index) => {
    document.getElementById(`singleU${index + 1}`).addEventListener("click", () => buySingleUpgrade(id));
});

// 3. Улучшения магазина (ID: 1-7)
UPGS.shop.buyables._keys.forEach(id => {
    document.getElementById(`shopBuyableU${id}`).addEventListener("click", () => buyShopUpgrade(id));
});

function maxBuyAll() {
    UPGS.coin.singles._keys.forEach(id => UPGS.coin.singles.buy(id));
    UPGS.coin.buyables.buyMax(true);
}

const AUTO = {
    single: new AutomationTask('single', function() {
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 5; j++) {
                let id = i * 10 + j;
                let isBoughtBefore = player.coin.singleUpgrades.includes(id);
                UPGS.coin.singles.buy(id);
                
                // Если мы только что что-то купили, уходим на перезарядку
                if (player.coin.singleUpgrades.includes(id) !== isBoughtBefore) { 
                    this.misc.charged = false;
                    this.time = this.misc.activateTime();
                    return true; 
                }
            }
        }
        return false;
    }),

    buyable: new AutomationTask('buyable', function() {
        if (this.misc.time() > 50) UPGS.coin.buyables.buy_auto();
        else UPGS.coin.buyables.buyMax_auto(true);
    }),

    umultiplier: new AutomationTask('umultiplier', function() {
        if (this.misc.time() > 50 && player.prestige.challenge.activated != 3) LAYERS.umultiplier.doReset();
        else if (player.time.umultiplier >= player.automation.conditions.umultiplier && player.prestige.challenge.activated != 3) LAYERS.umultiplier.doReset();
    }),

    upower: new AutomationTask('upower', function() {
        if (this.misc.time() > 50 && player.prestige.challenge.activated != 3 && player.umultipliers >= 4) LAYERS.upower.doReset();
        else if (player.time.upower >= player.automation.conditions.upower.time && player.umultipliers >= player.automation.conditions.upower.x_of_umulti && player.prestige.challenge.activated != 3) LAYERS.upower.doReset();
    }),

    prestige: new AutomationTask('prestige', function() {
        if (this.misc.time() > 50 || !MILESTONES.has(14)) {
            LAYERS.prestige.doReset();
            return;
        }
        
        let mode = player.settings.whichPrestigeMode;
        let cond = player.automation.conditions.prestige;
        
        if (mode == 'time' && player.time.real.prestige.timer >= cond.time) LAYERS.prestige.doReset();
        else if (mode == 'coins' && player.coin.currency >= cond.coins) LAYERS.prestige.doReset();
        else if (mode == 'prestige' && GAIN.prestige.reset() >= cond.prestige) LAYERS.prestige.doReset();
        else if (mode == 'crystals' && Number(GAIN.crystal.reset()) >= cond.crystals) LAYERS.prestige.doReset();
    }),

    uadder: new AutomationTask('uadder', function() {
        if (this.misc.time() > 50 && player.prestige.challenge.activated != 3 && player.upowers >= 6) LAYERS.uadder.doReset();
        else if (player.time.uadder >= player.automation.conditions.uadder.time && player.upowers >= player.automation.conditions.uadder.x_of_upower && player.upowers >= 6 && player.prestige.challenge.activated != 3) LAYERS.uadder.doReset();
    }),

    ureducer: new AutomationTask('ureducer', function() {
        if (this.misc.time() > 50 && player.prestige.challenge.activated != 3 && player.uadders >= 4) LAYERS.ureducer.doReset();
        else if (player.time.ureducer >= player.automation.conditions.ureducer.time && player.uadders >= player.automation.conditions.ureducer.x_of_uadder && player.uadders >= 4 && player.prestige.challenge.activated != 3) LAYERS.ureducer.doReset();
    }),

    mechanisms: {
        start(x) {
            this.stop(x); // На всякий случай очищаем старый интервал
            ELS.auto_mechanisms.interval[x] = setInterval(() => this[x].work(), 50);
            player.automation.mechanism.checked[x] = true;
        },

        stop(x) {
            if (ELS.auto_mechanisms.interval[x]) {
                clearInterval(ELS.auto_mechanisms.interval[x]);
                ELS.auto_mechanisms.interval[x] = '';
            }
            player.automation.mechanism.checked[x] = false;
            if (this[x].after_work != undefined) this[x].after_work()
        },

        run(x) {
            let mechanism = this[x].activated()
            if (mechanism && ELS.auto_mechanisms.interval[x] == '') {
                this.start(x);
            }
            else this.stop(x);
        },

        run_all() {
            for (let i = 1; i <= 16; i++) {
                if (player.automation.mechanism.checked[i]) {
                    document.getElementsByClassName('automechanismCheckbox')[i-1].checked = true
                    this.run(i)
                }
            }
        },

        updateStates() {
            if (!player.reflash.resets) return;
            
            let maxMechs = MISC.sum_mechanisms();
            let activated = 0
            let reachedMechLimit = false 
            for (let i = 1; i <= 16; i++) {
                if (AUTO.mechanisms[i].activated()) activated++
            }
            for (let i = 1; i <= 16; i++) {
                reachedMechLimit = activated >= maxMechs;
                let ghost = document.getElementsByClassName('automechanismGhost')[i-1];
                let div = document.getElementsByClassName('automechanismContainer')[i-1];
                
                // let isActivated = player.automation.mechanism.checked[i]
                let reqMet = UPGS.reflash.computer[2].effect() >= MISC.sum_watt() + this[i].consumation
                let romLocked = this[i].rom_req > player.reflash.computer[5]

                ghost.classList.remove('locked')
                switch (true) {
                    case romLocked:
                        ghost.classList.add('locked')
                        break;
                    case reachedMechLimit:
                        ghost.classList.add('locked')
                        ghost.textContent = i18next.t('maxActivatedMechs')
                        break;
                    case !reqMet:
                        ghost.classList.add('locked')
                        ghost.textContent = i18next.t('notEnoughWatt')
                        break;
                    default:
                        ghost.classList.remove('locked')
                        break;
                }
                if (AUTO.mechanisms[i].activated()) ghost.classList.remove('locked')
            }
        },

        1: { //auto shard achs
            id: 1,
            consumation: 2, 
            rom_req: 0,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return player.shard_achievements.length == 5},
            work() { 
                if (this.finished_work()) return 0;
                for (let i = 1; i <= 5; i++) {
                    unlockShardAch(i)
                }  
            }
        },
        2: { //auto fortune tokens
            id: 2,
            consumation: 4, 
            rom_req: 0,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return player.prestige.currency < MISC.fortune.cost.crystal() && player.coin.currency < MISC.fortune.cost.coin()},
            work() { 
                if (this.finished_work()) return 0;
                MISC.fortune.convert('coin')
                MISC.fortune.convert('crystal')
            }
        },
        3: { //auto supercrystal upgrades
            id: 3,
            consumation: 2, 
            rom_req: 0,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return player.supercrystal.upgrades.length == 9 },
            work() { 
                if (this.finished_work()) return 0;
                let ids = [11,12,13,21,22,23,31,32,33]
                ids.forEach(id => {
                    UPGS.supercrystal.buy(id)
                })
            }
        },
        4: { //auto runes
            id: 4,
            consumation: 4, 
            rom_req: 0,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return player.prestige.currency < UNL.rune.cost() },
            work() { 
                if (this.finished_work()) return 0;
                generateRune(999)
            }
        },
        5: { //auto modernization
            id: 5,
            consumation: 5, 
            rom_req: 0,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return player.coin.superUpgrades.length == 15 },
            work() { 
                if (this.finished_work()) return 0;
                for (let i = 1; i <= 5; i++) {
                    UPGS.coin.buyables.buy_super(i)
                }
                let ids = [11,12,13,14,15,21,22,23,24,25]
                ids.forEach(id => {
                    UPGS.coin.singles.buy_super(id)
                })
            }
        },
        6: { //auto shard upgs
            id: 6,
            consumation: 5, 
            rom_req: 1,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return false },
            work() { 
                if (this.finished_work()) return 0;
                for (let i = 1; i <= 3; i++) {
                    UPGS.shard.buyables.buyMax()
                }
            }
        },
        7: { //auto break prestige upgs
            id: 7,
            consumation: 6, 
            rom_req: 1,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return false },
            work() { 
                for (let i = 1; i <= 5; i++) {
                    UPGS.prestige.break.buyables.buyMax()
                }
                let ids = [11,12,13,14,15,21,22,23,24,25]
                ids.forEach(id => {
                    UPGS.prestige.break.singles.buy(id)
                })
            }
        },
        8: { //auto fortune upgs
            id: 8,
            consumation: 4, 
            rom_req: 1,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return false },
            work() { 
                if (this.finished_work()) return 0;
                let ids = [11,12,13,21,22,23,31,32,33]
                ids.forEach(id => {
                    UPGS.fortune.upgrades.singles.buy(id)
                })
                while (player.supercrystal.currency >= UPGS.fortune.upgrades.buyables[2].cost()) {
                    UPGS.fortune.upgrades.buyables.buy(2)
                }
                while (player.supercrystal.currency >= UPGS.fortune.upgrades.buyables[3].cost()) {
                    UPGS.fortune.upgrades.buyables.buy(3)
                }
                while (player.supercrystal.currency >= UPGS.fortune.upgrades.buyables[1].cost()) {
                    UPGS.fortune.upgrades.buyables.buy(1)
                }
            }
        },
        9: { //auto overdrive
            id: 9,
            consumation: 4, 
            rom_req: 1,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            after_work() { 
                activateOverdrive('overdriveType1ProgressBarBase', UNL.overdrive.type1, 'overdriveType1ProgressBarActive', 'coin', 'type1')
                if (UNL.overdrive.type2.unl()) activateOverdrive('overdriveType2ProgressBarBase', UNL.overdrive.type2, 'overdriveType2ProgressBarActive', 'prestige', 'type2')
                if (UNL.overdrive.type3.unl()) activateOverdrive('overdriveType3ProgressBarBase', UNL.overdrive.type3, 'overdriveType3ProgressBarActive', 'supercoin', 'type3')
            },
            finished_work() { return UNL.overdrive.type1.activate },
            work() { 
                if (this.finished_work()) return 0;
                activateOverdrive('overdriveType1ProgressBarBase', UNL.overdrive.type1, 'overdriveType1ProgressBarActive', 'coin', 'type1')
                if (UNL.overdrive.type2.unl()) activateOverdrive('overdriveType2ProgressBarBase', UNL.overdrive.type2, 'overdriveType2ProgressBarActive', 'prestige', 'type2')
                if (UNL.overdrive.type3.unl()) activateOverdrive('overdriveType3ProgressBarBase', UNL.overdrive.type3, 'overdriveType3ProgressBarActive', 'supercoin', 'type3')
            }
        },
        10: { //auto supercrystal gen
            id: 10,
            consumation: 6, 
            rom_req: 1,
            activated() { 
                return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked;
            },
            after_work() { 
                stopSuperCrystalGen();
            },
            finished_work() { 
                return false; 
            },
            work() { 
                startSuperCrystalGen(); 
            }
        },
        11: { //auto balance upgs
            id: 11,
            consumation: 6, 
            rom_req: 2,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work() { return false },
            work() { 
                if (this.finished_work()) return 0;
                let ids = [11,12,13,21,22,23,31,32,33]
                ids.forEach(id => {
                    UPGS.balance.singles.buy(id)
                })
                UPGS.balance.buyables.buyMax()
            }
        },
        12: { //auto balance upgs
            id: 12,
            consumation: 7, 
            rom_req: 2,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work(x = player.balance.coins.plus, y = player.balance.coins.minus, p = player.automation.mechanism_conditions[12].preset) { 
                let array = this.current_preset()
                return x >= array[0] && y >= array[1]
             },
            work() { 
                if (this.finished_work()) return 0;

                //buy plus coins
                for (let i = player.balance.coins.plus; i < this.current_preset()[0]; i++) {
                    MISC.balance.exchange('plus')
                }
                //buy minus coins
                for (let i = player.balance.coins.minus; i < this.current_preset()[1]; i++) {
                    MISC.balance.exchange('minus')
                }
            },
            switch() {
                let preset = player.automation.mechanism_conditions[12].preset 
                player.automation.mechanism_conditions[12].preset = preset % 3 + 1
                preset = player.automation.mechanism_conditions[12].preset 

                document.getElementById('autoBPCInput').value = this.current_preset()[0]
                document.getElementById('autoBMCInput').value = this.current_preset()[1]
                player.automation.mechanism_conditions[12].cppxp_diff = player.automation.mechanism_conditions[12].change_preset_per_x_prestiges
            },
            current_preset() {
                let preset = player.automation.mechanism_conditions[12].preset 
                return player.automation.mechanism_conditions[12].presets[preset]
            }
        },
        13: { //auto balance upgs
            id: 13,
            consumation: 6, 
            rom_req: 2,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work(x = player.fortune.spent_tokens, p = player.automation.mechanism_conditions[13].tokens) { 
                return x >= p
             },
            work(x = player.fortune.spent_tokens, p = player.automation.mechanism_conditions[13].tokens) { 
                if (this.finished_work()) return 0;

                //buy plus coins
                for (let i = x; i < p; i++) {
                    UPGS.fortune.boosts.activateTheBoost()
                }
            },
        },
        14: { //auto minerals
            id: 14,
            consumation: 8, 
            rom_req: 3,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work(x = player.minerals) { 
                //массив с количеством требуемых попыток
                let buy_array = this.current_preset().amount_to_buy
                //массив с порядком и указанными только теми минералами КОТОРЫЕ НАДО КУПИТЬ. А также пустой массив с минералами которые мы уже купили полностью
                let order_array = this.current_preset().order, completed_array = []
                //цикл в котором мы сравниваем купили ли больше или равно от того сколько нужно
                //если да то пушим айди минерала в пустой массив
                order_array.forEach(mineral => {
                    if (x[order_array] >= buy_array[order_array]) completed_array.push(order_array)
                });
                //сравниваем массивы (функция такая), если ВЫПОЛНЕННЫЙ порядок совпадает с ТРЕБУЕМЫМ то возвращаем тру (однако могут возникнуть трудности так как порядок разным может быть, стоит учесть, но вроде как всё нормально должно быть)
                return isEqualArray(completed_array, order_array) 
             },
            work() { 
                if (this.finished_work()) return 0;

                //массив с количеством требуемых попыток покупки, короче говоря СКОЛЬКО НАМ НУЖНО КУПИТЬ
                let buy_array = this.current_preset().amount_to_buy
                //такие же массивы и действия чтобы скипать отдельные минерады которые нам больше не нужно покупать
                let order_array = this.current_preset().order, completed_array = []
                //главный цикл, вообще имбулечка, выбираем только те минералы которые указали в порядке И ПОКУПАЕМ ИХ В ТОМ ЖЕ ПОРЯДКЕ.
                order_array.forEach(mineral => {
                    //под-цикл, тут мы начинаем ОТ ТЕКУЩЕГО КОЛИЧЕСТВО и идём ДО НЕОБХОДИМОГО ДЛЯ ПОКУПКИ. По идее если количество будет равно или больше то покупать не будет, хз
                    for (let j = player.minerals[mineral]; j < buy_array[mineral]; j++) {
                        //функция единичной покупки минерала ПОД ВИДОМ <mineral>, это не количество а вид минерала (1 - Опал, 2 - Топаз, ...)
                        UPGS.minerals.buy(mineral)
                    }
                });
            },
            switch() {
                let preset = player.automation.mechanism_conditions[14].preset 
                player.automation.mechanism_conditions[14].preset = preset % 3 + 1
                preset = player.automation.mechanism_conditions[14].preset 

                document.getElementById('mineralInput1').value = this.current_preset().amount_to_buy[1]
                document.getElementById('mineralInput2').value = this.current_preset().amount_to_buy[2]
                document.getElementById('mineralInput3').value = this.current_preset().amount_to_buy[3]
                document.getElementById('mineralInput4').value = this.current_preset().amount_to_buy[4]

                loadMineralOrder()

                player.automation.mechanism_conditions[14].cppxp_diff = player.automation.mechanism_conditions[14].change_preset_per_x_prestiges
            },
            current_preset() {
                let preset = player.automation.mechanism_conditions[14].preset 
                return player.automation.mechanism_conditions[14].presets[preset]
            }
        },
        15: { //auto items
            id: 15,
            consumation: 8, 
            rom_req: 3,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work(x = player.shop.items.amount, y = UPGS.shop.items_limit()) { 
                let buy_array = this.current_preset().amount_to_buy
                let order_array = this.current_preset().order, completed_array = []
                order_array.forEach(item => {
                    if (x[order_array] >= buy_array[order_array]) completed_array.push(order_array)
                });
                return isEqualArray(completed_array, order_array) || y
             },
            work() { 
                if (this.finished_work()) return 0;

                let buy_array = this.current_preset().amount_to_buy

                let order_array = this.current_preset().order, completed_array = []
                order_array.forEach(item => {
                    if (UPGS.shop.items_limit()) return 0
                    for (let j = player.shop.items.amount[item]; j < buy_array[item]; j++) {
                        UPGS.shop.items.buy(item)
                    }
                    for (let j = player.shop.items.used[item]; j < buy_array[item]; j++) {
                        UPGS.shop.items[item].useItem(true)
                    }
                });
            },
            switch() {
                let preset = player.automation.mechanism_conditions[15].preset 
                player.automation.mechanism_conditions[15].preset = preset % 3 + 1
                preset = player.automation.mechanism_conditions[15].preset 

                document.getElementById('itemInput1').value = this.current_preset().amount_to_buy[1]
                document.getElementById('itemInput2').value = this.current_preset().amount_to_buy[2]
                document.getElementById('itemInput3').value = this.current_preset().amount_to_buy[3]
                document.getElementById('itemInput4').value = this.current_preset().amount_to_buy[4]
                document.getElementById('itemInput5').value = this.current_preset().amount_to_buy[5]
                document.getElementById('itemInput6').value = this.current_preset().amount_to_buy[6]

                loadMineralOrder()

                player.automation.mechanism_conditions[15].cppxp_diff = player.automation.mechanism_conditions[15].change_preset_per_x_prestiges
            },
            current_preset() {
                let preset = player.automation.mechanism_conditions[15].preset 
                return player.automation.mechanism_conditions[15].presets[preset]
            }
        },
        16: { //auto PCs
            id: 16,
            consumation: 10, 
            rom_req: 3,
            activated() { return document.getElementsByClassName('automechanismCheckbox')[this.id-1].checked },
            finished_work(x = player.prestige.challenge.completed.length) { 
                return x == 8
             },
            work(x = player.coin.this_reflash_currency, y = player.prestige.challenge.completed.length) { 
                if (this.finished_work()) return 0;

                cost = 1e200 * Math.pow(1e10, y)
                //buy plus coins
                if (x >= cost && y != 8) {
                    player.prestige.challenge.completed.push(y+1)
                    updateTimeObject(player.prestige.challenge.time[y+1], 0.05)
                }
                return cost
            },
        },
    }
};

// --- СОКРАЩЕННАЯ ЛОГИКА ИНТЕРВАЛОВ И КНОПОК ---

function decreaseInterval(type) {
    if (player.prestige.currency >= MISC.automation[type].cost() && MISC.automation[type].time() !== 50) {
        player.prestige.currency -= MISC.automation[type].cost();
        player.automation.upgrades[type]++;
        AUTO[type].restart(); // Класс сам всё очистит и запустит заново!
    }
}

function increaseBulkBuy(type) {
    if (player.prestige.currency >= MISC.automation[type].cost() && MISC.automation[type].bulk() <= 512) {
        player.prestige.currency -= MISC.automation[type].cost();
        player.automation.upgrades[type]++;
    }
}

// Привязываем все чекбоксы циклом (больше никаких 6 одинаковых функций)
const autoCheckboxes = {
    single: autoSingleUpgradeCheckbox,
    buyable: autoBuyableUpgradeCheckbox,
    umultiplier: autoUmultiplierCheckbox,
    upower: autoUpowerCheckbox,
    prestige: autoPrestigeCheckbox,
    uadder: autoUadderCheckbox,
    ureducer: autoUreducerCheckbox
};

Object.entries(autoCheckboxes).forEach(([type, checkbox]) => {
    checkbox.addEventListener('change', function() {
        if (this.checked) AUTO[type].start();
        else AUTO[type].stop();
    });
});

[...document.getElementsByClassName('automechanismCheckbox')].forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
        let clickedIndex = index+1; 
        AUTO.mechanisms.run(clickedIndex);
    });
});

// --- UI ЛОГИКА ---

function changePrestigeMode() {
    const modes = ['crystals', 'coins', 'time', 'prestige'];
    const textReqs = [text.automation.coin_req, text.automation.time_req, text.automation.prestige_req, text.automation.crystal_req];
    
    let currentIndex = modes.indexOf(player.settings.whichPrestigeMode);
    let nextIndex = (currentIndex + 1) % modes.length;
    
    player.settings.whichPrestigeMode = modes[nextIndex];
    autoPrestigeMode.innerHTML = textReqs[currentIndex]; // Вставляем текст следующего мода
    autoPrestigeInput.value = formatNumber(Number(player.automation.conditions.prestige[modes[nextIndex]]));
}

// Потеря фокуса инпутов: просто обновляем данные и говорим классу "перезапустись"
autoPrestigeInput.addEventListener("blur", () => {
    if (autoPrestigeInput.value !== '') player.automation.conditions.prestige[player.settings.whichPrestigeMode] = autoPrestigeInput.value;
    AUTO.prestige.restart();
});

autoUmultiInput.addEventListener("blur", () => {
    player.automation.conditions.umultiplier = parseFloat(autoUmultiInput.value);
    AUTO.umultiplier.restart();
});

autoUpowerInput.addEventListener("blur", () => {
    player.automation.conditions.upower.time = parseFloat(autoUpowerInput.value);
    AUTO.upower.restart();
});
autoUpowerInput2.addEventListener("blur", () => {
    player.automation.conditions.upower.x_of_umulti = parseFloat(autoUpowerInput2.value);
    AUTO.upower.restart();
});

autoUadderInput.addEventListener("blur", () => {
    player.automation.conditions.uadder.time = parseFloat(autoUadderInput.value);
    AUTO.uadder.restart();
});
autoUadderInput2.addEventListener("blur", () => {
    player.automation.conditions.uadder.x_of_upower = parseFloat(autoUadderInput2.value);
    AUTO.uadder.restart();
});

autoUreducerInput.addEventListener("blur", () => {
    player.automation.conditions.ureducer.time = parseFloat(autoUreducerInput.value);
    AUTO.ureducer.restart();
});
autoUreducerInput2.addEventListener("blur", () => {
    player.automation.conditions.ureducer.x_of_uadder = parseFloat(autoUreducerInput2.value);
    AUTO.ureducer.restart();
});

mineralsBulkInput.addEventListener("blur", () => {
    player.settings.minerals_bulkbuy = parseFloat(mineralsBulkInput.value);
});

howMuchCrystalsInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") submitTheBreak();
});

autoBPCInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[12].presets[player.automation.mechanism_conditions[12].preset][0] = parseFloat(autoBPCInput.value);
});
autoBMCInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[12].presets[player.automation.mechanism_conditions[12].preset][1] = parseFloat(autoBMCInput.value);
});
autoBCPrestigesInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[12].change_preset_per_x_prestiges = parseFloat(autoBCPrestigesInput.value);
    player.automation.mechanism_conditions[12].cppxp_diff = player.automation.mechanism_conditions[12].change_preset_per_x_prestiges
});
autoFortuneBoostsInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[13].tokens = parseFloat(autoFortuneBoostsInput.value);
});

mineralInput1.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[14].preset
    player.automation.mechanism_conditions[14].presets[preset].amount_to_buy[1] = parseFloat(mineralInput1.value);
});
mineralInput2.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[14].preset
    player.automation.mechanism_conditions[14].presets[preset].amount_to_buy[2] = parseFloat(mineralInput2.value);
});
mineralInput3.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[14].preset
    player.automation.mechanism_conditions[14].presets[preset].amount_to_buy[3] = parseFloat(mineralInput3.value);
});
mineralInput4.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[14].preset
    player.automation.mechanism_conditions[14].presets[preset].amount_to_buy[4] = parseFloat(mineralInput4.value);
});
autoMineralsPrestigesInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[14].change_preset_per_x_prestiges = parseFloat(autoMineralsPrestigesInput.value || 0);
    player.automation.mechanism_conditions[14].cppxp_diff = player.automation.mechanism_conditions[14].change_preset_per_x_prestiges
});

itemInput1.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[1] = parseFloat(itemInput1.value);
});
itemInput2.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[2] = parseFloat(itemInput2.value);
});
itemInput3.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[3] = parseFloat(itemInput3.value);
});
itemInput4.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[4] = parseFloat(itemInput4.value);
});
itemInput5.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[5] = parseFloat(itemInput5.value);
});
itemInput6.addEventListener("blur", () => {
    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].amount_to_buy[6] = parseFloat(itemInput6.value);
});
autoItemsPrestigesInput.addEventListener("blur", () => {
    player.automation.mechanism_conditions[15].change_preset_per_x_prestiges = parseFloat(autoItemsPrestigesInput.value || 0);
    player.automation.mechanism_conditions[15].cppxp_diff = player.automation.mechanism_conditions[15].change_preset_per_x_prestiges
});
respecItemsCheckbox.addEventListener('change', function() {
        if (this.checked) player.automation.mechanism_conditions[15].respec_after_changing_preset = true
        else player.automation.mechanism_conditions[15].respec_after_changing_preset = false
    });

function submitTheBreak() {
    let temp = parseFloat(howMuchCrystalsInput.value);
    let val = howMuchCrystalsInput.value;
    
    if (((val.includes('%') && temp <= 100) || (!val.includes('%') && temp <= player.prestige.currency)) && !val.includes('-')) {
        let brokenData = GAIN.shard.break_crystal(val);
        
        // --- ДИНАМИЧЕСКИЙ ПЕРЕВОД УСПЕШНОГО РАЗБИТИЯ ---
        document.getElementById('brokeCrystals').innerHTML = i18next.t('didBreakCrystal', {
            crystals: formatNumber(brokenData.broken_crystals),
            shards: formatNumber(brokenData.gain)
        });
        
        openWindow('submit', true);
        player.shard.currency += brokenData.gain;
        player.prestige.broken_currency += brokenData.broken_crystals;
        if (player.virus.activated && player.virus.type == 3) player.virus.current++
    } else {
        // --- ДИНАМИЧЕСКИЙ ПЕРЕВОД ОШИБКИ ---
        document.getElementById('falseBrokeCrystals').innerHTML = i18next.t('didNotBreakCrystal');
        openWindow('falseSubmit', true);
    }
}

