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
                    return 1 + this.effect();
                }
            }
        ]),
        singles: new UniversalSinglesManager('coin', 'singleUpgrades', [
            {
                id: 11, super_id: 21, elementId: 'singleU1', basePrice: 100000, cost_super: 1500,
                effect: function(x = this.unl()) {
                    if (x == 0) return 1;
                    
                    // Блокируем значение от Infinity и NaN прямо внутри формулы
                    let safeTotal = Math.min(player.coin.total_currency || 0, 1e308);
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
                    let eff = Math.pow(MISC.amount_of_upgrades.coin() + 1, 0.6) / 1.75;
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
                    id: 1, power: 17, basePrice: 1e13, elementId: 'breakPBuyableU1',
                    effect: function(x = player.prestige.break.buyables[1]) { return x * 0.00075 * UPGS.prestige.break.buyables[2].effect(); },
                },
                {
                    id: 2, power: 40, basePrice: 1e15, elementId: 'breakPBuyableU2',
                    effect: function(x = player.prestige.break.buyables[2]) { return 1 + x / 5; },
                },
                {
                    id: 3, power: 10000, basePrice: 5e17, elementId: 'breakPBuyableU3',
                    effect: function(x = player.prestige.break.buyables[3]) { return Math.pow(3, x); },
                },
                {
                    id: 4, power: 21, basePrice: 1e20, elementId: 'breakPBuyableU4',
                    effect: function(x = player.prestige.break.buyables[4]) { return Math.pow(1.5, x); },
                },
                {
                    id: 5, power: 10000, basePrice: 5e22, elementId: 'breakPBuyableU5',
                    effect: function(x = player.prestige.break.buyables[5]) { return x / 10000; },
                }
            ], 'break.buyables'),
            singles: new UniversalSinglesManager('prestige', 'break.singles', [
                { id: 11, elementId: 'breakPSingleU1', basePrice: 1e25, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.log10(player.prestige.total_currency + 1) / 1.5; } },
                { id: 12, elementId: 'breakPSingleU2', basePrice: 1e30, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.log10(Math.log10(player.clicks.critical/2)); } },
                { id: 13, elementId: 'breakPSingleU3', basePrice: 1e35, effect: function(x = this.unl()) { return x == 0 ? 1 : 6; } },
                { id: 14, elementId: 'breakPSingleU4', basePrice: 1e40, effect: function(x = this.unl()) {
                    if (x == 0) return 0;
                    let timer = 0; for (let i = 1; i <= 12; i++) timer += player.challenge.time[i].timer;
                    return Math.pow(3600 / timer, 0.65);
                }},
                { id: 15, elementId: 'breakPSingleU5', basePrice: 1e45, effect: function(x = this.unl()) { return x == 0 ? 0 : MISC.free_upgrade.upower(); } },
                { id: 21, elementId: 'breakPSingleU6', basePrice: 1e50, effect: function(x = this.unl()) { return x == 0 ? 1 : Math.pow(1.35, player.supercrystal.total_currency); } },
                { id: 22, elementId: 'breakPSingleU7', basePrice: 1e60, effect: function(x = this.unl()) { return x == 0 ? 1 : 1000; } },
                { id: 23, elementId: 'breakPSingleU8', basePrice: 1e70, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.log10(player.time.game.prestige.timer + 1) / 25; } },
                { id: 24, elementId: 'breakPSingleU9', basePrice: 1e100, effect: function(x = this.unl()) { return x == 0 ? 0 : 10; } },
                { id: 25, elementId: 'breakPSingleU10', basePrice: 1e15, effect: function(x = this.unl()) { return 1; } }
            ])
        }
    },
    shard: {
        buyables: new UniversalBuyablesManager('shard', [
            {
                id: 1, power: 2.95, basePrice: 1000, elementId: 'shBuyableU1',
                customCostMod: function() { return player.shard.singleUpgrades.includes(13) ? 1 / UPGS.shard.singles[13].effect() : 1; },
                effect: function(x = player.shard.upgrades[1]) {
                    let eff = Math.pow(2, x);
                    if (player.shard.singleUpgrades.includes(12)) eff *= UPGS.shard.singles[12].effect();
                    return eff;
                },
            },
            {
                id: 2, power: 4.5, basePrice: 1000, elementId: 'shBuyableU2',
                customCostMod: function() { return player.shard.singleUpgrades.includes(13) ? 1 / UPGS.shard.singles[13].effect() : 1; },
                effect: function(x = player.shard.upgrades[2]) {
                    let eff = Math.pow(3, x);
                    if (player.shard.singleUpgrades.includes(12)) eff *= UPGS.shard.singles[12].effect();
                    return eff;
                },
            },
            {
                id: 3, power: 60, basePrice: 5000, elementId: 'shBuyableU3',
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
            { id: 11, elementId: 'shSingleU1', basePrice: 500000, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(player.shard.currency + 1, 0.04) * 6; } },
            { id: 12, elementId: 'shSingleU2', basePrice: 1e12, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(player.prestige.broken_currency + 1, 0.06) * 3 } },
            { id: 13, elementId: 'shSingleU3', basePrice: 1e18, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + Math.pow(player.prestige.currency + 1, 0.0525) * 4; } },
            { id: 21, elementId: 'shSingleU4', basePrice: 1e24, effect: function(x = this.unl()) {
                if (x == 0) return 1;
                let eff = 1 + Math.pow(player.rune.total_currency, 1.5);
                if (ACHS.has(48)) eff *= 1.04;
                return eff;
            } },
            { id: 22, elementId: 'shSingleU5', basePrice: 1e100, effect: function(x = this.unl()) { return x == 0 ? 1 : 1 + player.supercrystal.total_currency * 0.0005; } },
            { id: 23, elementId: 'shSingleU6', basePrice: 1e308, effect: function() { return 1; } }
        ])
    },
    shop: {
        buyables: new ShopBuyablesManager('shop', [
            { id: 1, power: 1.05, basePrice: 1.3, maxAmount: 100, elementId: 'shopBuyableU1', effect: function(x = player.shop.upgrades[1]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[1] + this.bulk()) { return 1 + x / 50; } },
            { id: 2, power: 1.05, basePrice: 1.3, maxAmount: 100, elementId: 'shopBuyableU2', effect: function(x = player.shop.upgrades[2]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[2] + this.bulk()) { return 1 + x / 50; } },
            { id: 3, power: 1.06, basePrice: 1.4, maxAmount: 100, elementId: 'shopBuyableU3', effect: function(x = player.shop.upgrades[3]) { return 1 + x / 66.666666; }, next_effect: function(x = player.shop.upgrades[3] + this.bulk()) { return 1 + x / 66.666666; } },
            { id: 4, power: 1.065, basePrice: 1.5, maxAmount: 100, elementId: 'shopBuyableU4', effect: function(x = player.shop.upgrades[4]) { return 1 + x / 100; }, next_effect: function(x = player.shop.upgrades[4] + this.bulk()) { return 1 + x / 100; } },
            { id: 5, power: 1.07, basePrice: 5, maxAmount: 50, elementId: 'shopBuyableU5', effect: function(x = player.shop.upgrades[5]) { return 1 + x / 2.5; }, next_effect: function(x = player.shop.upgrades[5] + this.bulk()) { return 1 + x / 2.5; } },
            { id: 6, power: 1.075, basePrice: 10, maxAmount: 100, elementId: 'shopBuyableU6', effect: function(x = player.shop.upgrades[6]) { return 1 + x / 50; }, next_effect: function(x = player.shop.upgrades[6] + this.bulk()) { return 1 + x / 100; } },
            { id: 7, power: 1.2, basePrice: 15, maxAmount: 20, elementId: 'shopBuyableU7', effect: function(x = player.shop.upgrades[7]) { return 1 + x / 10; }, next_effect: function(x = player.shop.upgrades[7] + this.bulk()) { return 1 + x / 10; } }
        ], 'upgrades'),

        unlockables: new ShopUnlockablesManager('shop', 'unlockables', [
            // { id: 1, elementId: 'shopSingleU1', basePrice: 250 },
            { id: 1, elementId: 'shopSingleU1', basePrice: 500 },
            { id: 2, elementId: 'shopSingleU2', basePrice: 1000 },
            { id: 3, elementId: 'shopSingleU3', basePrice: 1500 },
            { id: 4, elementId: 'shopSingleU4', basePrice: 1000 },
            { id: 5, elementId: 'shopSingleU5', basePrice: 3000 }
        ]),

        permanent: new ShopPermanentManager('shop', [
            { id: 1, power: 1.25, basePrice: 10, maxAmount: 25, elementId: 'shopPermanentU1', effect: function(x = player.shop.permanentUpgrades[1]) { return 1 + x / 10; }, next_effect: function(x = player.shop.permanentUpgrades[1] + 1) { return 1 + x / 10; } },
            { id: 2, power: 1.85, basePrice: 100, maxAmount: 5, elementId: 'shopPermanentU2', effect: function(x = player.shop.permanentUpgrades[2]) { return 1 + x / 2; }, next_effect: function(x = player.shop.permanentUpgrades[2] + 1) { return 1 + x / 25; } },
            { id: 3, power: 1.075, basePrice: 10, maxAmount: 100, elementId: 'shopPermanentU3', effect: function(x = player.shop.permanentUpgrades[3]) { return x / 50; }, next_effect: function(x = player.shop.permanentUpgrades[3] + 1) { return x / 50; } },
            { id: 4, power: 1.085, basePrice: 5, maxAmount: 100, elementId: 'shopPermanentU4', effect: function(x = player.shop.permanentUpgrades[4]) { return 1 + x / 10; }, next_effect: function(x = player.shop.permanentUpgrades[4] + 1) { return 1 + x / 10; } },
            { id: 5, power: 5, basePrice: 1000, maxAmount: 3, elementId: 'shopPermanentU5', effect: function(x = player.shop.permanentUpgrades[5]) { return x == 0 ? 0 : Math.pow(2, x); }, next_effect: function(x = player.shop.permanentUpgrades[5] + 1) { return x == 0 ? 0 : Math.pow(2, x); } },
            { id: 6, power: 1.35, basePrice: 1400, maxAmount: 5, elementId: 'shopPermanentU6', effect: function(x = player.shop.permanentUpgrades[6]) { return 0.5 + 0.02 * x; }, next_effect: function(x = player.shop.permanentUpgrades[6] + 1) { return 0.5 + 0.02 * x; } },
            { id: 7, power: 1.25, basePrice: 1500, maxAmount: 5, elementId: 'shopPermanentU7', effect: function(x = player.shop.permanentUpgrades[7]) { return !x ? 1 : 75*x; }, next_effect: function(x = player.shop.permanentUpgrades[7] + 1) { return !x ? 1 : 75*x; } },
            { id: 8, power: 1.33, basePrice: 100, maxAmount: 5, elementId: 'shopPermanentU8', effect: function(x = player.shop.permanentUpgrades[8]) { return !x ? 0 : x * 5; }, next_effect: function(x = player.shop.permanentUpgrades[8] + 1) { return !x ? 0 : x * 5; } }
        ], 'permanentUpgrades'),

        items: new ShopItemsManager([
            { id: 1, maxAmount: 5, elementId: 'shopItem1', cost: () => 80, effect: () => 0},
            { id: 2, maxAmount: 3, elementId: 'shopItem2', cost: () => 250, effect: () => 0 },
            { id: 3, maxAmount: 10, elementId: 'shopItem3', cost: () => 100, effect: () => GAIN.offline_gain_time_warp(300) },
            { id: 4, maxAmount: 3, elementId: 'shopItem4', cost: () => 400, effect: () => GAIN.offline_gain_time_warp(1800) },
            { id: 5, maxAmount: 25, elementId: 'shopItem5', cost: () => 50, effect: () => { player.coin.currency += player.coin.total_currency / 1e25; } },
            { id: 6, maxAmount: 5, elementId: 'shopItem6', cost: () => 140, effect: () => 1 }
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
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(2, x / 1.25)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(3, x / 1.65)); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(2, x / 3)); }
        },
        {
            id: 4, elementId: 'mineral4',
            cost1: x => 2 + Math.floor(x / 5),
            cost2: x => 1e111 * Math.pow(100000, x) * (Math.pow(1000000, Math.floor(x / 10))),
            effect1: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(5, x / 1.73)); },
            effect2: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(Math.pow(1.045, x)); },
            effect3: function(x) { return x == 0 || player.prestige.challenge.activated == 8 ? 1 : this.applyMods(x*33); }
        }
    ]),
    fortune: {
        boosts: new FortuneBoostsManager([
            { id: 1, generatorType: 'digits', min: () => Math.pow(10, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(250, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 2, generatorType: 'digits', min: () => Math.pow(2, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(8, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 3, generatorType: 'digits', min: () => Math.pow(4, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(24, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 4, generatorType: 'float2', min: () => Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.045, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 5, generatorType: 'float2', min: () => Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.065, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 6, generatorType: 'digits', min: () => Math.pow(1.5, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(4, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 7, generatorType: 'float3', min: () => Math.pow(1.015, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.095, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 8, generatorType: 'float2', min: () => Math.pow(1.065, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.125, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) },
            { id: 9, generatorType: 'float3', min: () => Math.pow(1.055, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.115, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 10, generatorType: 'int', min: () => 2, max: () => 2 },
            { id: 11, generatorType: 'float3', min: () => Math.pow(1.005, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.0125, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) * (player.prestige.challenge.completed.includes(5) ? PRES_CHALLENGE[5].effect() : 1) },
            { id: 12, generatorType: 'float3', min: () => Math.pow(1.01, UPGS.fortune.upgrades.buyables[1].effect()), max: () => Math.pow(1.03, UPGS.fortune.upgrades.buyables[2].effect()) * (ACHS.has(54) ? 1.05 : 1) }
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
                    effect: function(x = player.fortune.upgrades.buyables[2]) { return x == 0 ? 1 : 1 + x * 0.125; } 
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
            { id: 1, basePrice: 10, power: 1.1, elementIndex: 2, effect: function(x = player.balance.upgrades.buyables[1]) { return x == 0 ? 1 : 1 + x / 150; } },
            { id: 2, basePrice: 10, power: 1.13, elementIndex: 3, effect: function(x = player.balance.upgrades.buyables[2]) { return x == 0 ? 1 : 1 + x / 500; } },
            { id: 3, basePrice: 50, power: 1.25, elementIndex: 4, effect: function(x = player.balance.upgrades.buyables[3]) { return x == 0 ? 1 : Math.pow(1.025, x); } }
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
    }
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "M" || event.key == "m" || event.key == "ь" || event.key == "Ь") && player.clicks.real >= 1000) {
    maxBuyAll();
    }
});

function maxBuyAll () {
    for (let i = 1; i <= 2; i++) {
        for (let j = 1; j <= 5; j++) {
                UPGS.coin.singles.buy(i*10+j)
        }
    }
    UPGS.coin.buyables.buyMax()
}

function maxBuyAllPrestige() {
    UPGS.prestige.buyables.buyMax()
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
    UPGS.coin.buyables.buyMax();
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
        if (this.misc.time() != 50) UPGS.coin.buyables.buy_auto();
        else UPGS.coin.buyables.buyMax_auto();
    }),

    umultiplier: new AutomationTask('umultiplier', function() {
        if (this.misc.time() != 50 && player.prestige.challenge.activated != 3) LAYERS.umultiplier.doReset();
        else if (player.time.umultiplier >= player.automation.conditions.umultiplier && player.prestige.challenge.activated != 3) LAYERS.umultiplier.doReset();
    }),

    upower: new AutomationTask('upower', function() {
        if (this.misc.time() != 50 && player.prestige.challenge.activated != 3 && player.umultipliers >= 4) LAYERS.upower.doReset();
        else if (player.time.upower >= player.automation.conditions.upower.time && player.umultipliers >= player.automation.conditions.upower.x_of_umulti && player.prestige.challenge.activated != 3) LAYERS.upower.doReset();
    }),

    prestige: new AutomationTask('prestige', function() {
        if (this.misc.time() != 50 || !MILESTONES.has(14)) {
            LAYERS.prestige.doReset();
            return;
        }
        
        let mode = player.settings.whichPrestigeMode;
        let cond = player.automation.conditions.prestige;
        
        if (mode == 'time' && player.time.real.prestige.timer >= cond.time) LAYERS.prestige.doReset();
        else if (mode == 'coins' && player.coin.currency >= cond.coins) LAYERS.prestige.doReset();
        else if (mode == 'prestige' && GAIN.prestige.reset() >= cond.prestige) LAYERS.prestige.doReset();
        else if (mode == 'crystals' && GAIN.crystal.reset() >= cond.crystals) LAYERS.prestige.doReset();
    }),

    uadder: new AutomationTask('uadder', function() {
        if (this.misc.time() != 50 && player.prestige.challenge.activated != 3 && player.upowers >= 10) LAYERS.uadder.doReset();
        else if (player.time.uadder >= player.automation.conditions.uadder.time && player.upowers >= player.automation.conditions.uadder.x_of_upower && player.upowers >= 10 && player.prestige.challenge.activated != 3) LAYERS.uadder.doReset();
    })
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
    uadder: autoUadderCheckbox
};

Object.entries(autoCheckboxes).forEach(([type, checkbox]) => {
    checkbox.addEventListener('change', function() {
        if (this.checked) AUTO[type].start();
        else AUTO[type].stop();
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

mineralsBulkInput.addEventListener("blur", () => {
    player.settings.minerals_bulkbuy = parseFloat(mineralsBulkInput.value);
});

howMuchCrystalsInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") submitTheBreak();
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
    } else {
        // --- ДИНАМИЧЕСКИЙ ПЕРЕВОД ОШИБКИ ---
        document.getElementById('falseBrokeCrystals').innerHTML = i18next.t('didNotBreakCrystal');
        openWindow('falseSubmit', true);
    }
}
