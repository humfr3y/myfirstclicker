const GAIN = {
    coin: {
        click: {
            no_softcap_effect() {
                let effect = 1;
                if (player.coin.upgrades[3]) effect *= UPGS.coin.buyables[3].effect()
                if (player.shop.upgrades[1]) effect *= UPGS.shop.buyables[1].effect()
                if (player.coin.singleUpgrades.includes(12)) effect *= UPGS.coin.singles[12].effect()
                if (player.coin.singleUpgrades.includes(23)) effect *= UPGS.coin.singles[23].effect()
                if (GAIN.coin.gain.effect()) effect *= GAIN.coin.gain.effect()
                if (player.challenge.activated == 0) {
                    if (player.challenge.completed.includes(6)) effect *= CHALL[6].effect()
                }
                else {
                    if (player.challenge.activated == 3) effect /= GAIN.umultiplier.effect()*100000
                    if (player.challenge.activated == 4) effect = Math.sqrt(effect)
                    if (player.challenge.activated == 6) {
                        effect = Math.pow(effect, 0.8)
                        effect *= Math.pow(1 + MISC.amount_of_upgrades.coin(), Math.pow(1.00185, player.clicks.prestige))
                    }
                    if (player.challenge.activated == 7) effect = MISC.amount_of_upgrades.coin() < 50 ? Math.pow(effect, 1 - MISC.amount_of_upgrades.coin() / 50) : 0
                    if (player.challenge.activated == 8) effect /= CHALL.virusCoins_gen()
                    if (player.challenge.activated == 12) effect = Math.pow(Math.pow(effect, 0.01) * GAIN.umultiplier.effect(), GAIN.upower.effect())
                }
                if (player.coin.upgrades[5]) effect = Math.pow(effect, UPGS.coin.buyables[5].effect())
                return effect
            },
            effect() {
                return softCap(this.no_softcap_effect(), this.softcap().softcap_start, this.softcap().softcap_power)
            },
            softcap() {
                let softcap_start = 1e13, softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.45 : 0.4
                if (player.challenge.activated !== 0) {
                    if (player.challenge.activated == 9) {
                        softcap_start = 1e8
                        softcap_power *= softcap_power
                    }
                }
                else {
                    if (player.challenge.completed.includes(8)) softcap_start *= CHALL[9].effect() 
                }
                softcap_start *= UPGS.minerals[2].effect2()
                return { 
                    softcap_start,
                    softcap_power
                }
            }
        },
        second: {
            no_softcap_effect() {
                let effect = 0;
                if (player.coin.upgrades[1]) effect += UPGS.coin.buyables[1].effect()
                if (player.coin.upgrades[4]) effect *= UPGS.coin.buyables[4].effect()
                if (player.shop.upgrades[2]) effect *= UPGS.shop.buyables[2].effect()
                if (player.coin.singleUpgrades.includes(11)) effect *= UPGS.coin.singles[11].effect()
                if (player.coin.singleUpgrades.includes(21)) effect *= UPGS.coin.singles[21].effect()
                if (ACHS.has(15)) effect *= 1+0.0001*player.clicks.simulated
                if (GAIN.coin.gain.effect()) effect *= GAIN.coin.gain.effect()

                if (player.challenge.activated == 0) {
                    if (player.challenge.completed.includes(3)) effect *= CHALL[3].effect()
                }
                else {
                    if (player.challenge.activated == 4) effect = Math.sqrt(effect)
                    if (player.challenge.activated == 7) effect = MISC.amount_of_upgrades.coin() < 50 ? Math.pow(effect, 1 - MISC.amount_of_upgrades.coin() / 50) : 0
                    if (player.challenge.activated == 8) effect /= CHALL.virusCoins_gen()
                    if (player.challenge.activated == 12) effect = Math.pow(Math.pow(effect, 0.01) * GAIN.umultiplier.effect(), GAIN.upower.effect())
                }
                if (player.challenge.activated == 0 && player.challenge.completed.includes(8)) effect *= CHALL[8].effect()
            
                if (player.challenge.activated == 3 || player.challenge.activated == 8) effect = 0

                return effect
            },
            effect() {
                return softCap(this.no_softcap_effect(), this.softcap().softcap_start, this.softcap().softcap_power)
            },
            softcap(){
                let softcap_start = 1e13, softcap_power = player.prestige.singleUpgrades.includes(11) ? 0.55 : 0.5
                if (player.challenge.activated !== 0) {
                    if (player.challenge.activated == 9) {
                        softcap_start = 1e8
                        softcap_power *= softcap_power
                    }
                }
                else {
                    if (player.challenge.completed.includes(8)) softcap_start *= CHALL[9].effect()
                }
                softcap_start *= UPGS.minerals[2].effect2()
                return { 
                    softcap_start,
                    softcap_power
                }
            }
        },
        gain: {
            no_softcap_effect() {
                let effect = 1;
                if (player.shop.upgrades[3]) effect *= UPGS.shop.buyables[3].effect()
                if (player.coin.singleUpgrades.includes(13)) effect *= UPGS.coin.singles[13].effect()
                if (player.coin.singleUpgrades.includes(22)) effect *= UPGS.coin.singles[22].effect()
                if (ACHS.effect.coin()) effect *= ACHS.effect.coin()
                if (ACHS.has(28)) effect *= 4
                if (GAIN.umultiplier.effect()) effect *= GAIN.umultiplier.effect()
                if (UNL.overdrive.type1.effect()) effect *= UNL.overdrive.type1.effect()
                if (UPGS.minerals[2].effect1()) effect *= UPGS.minerals[2].effect1()
                if (UPGS.prestige.singles[31].unl()) effect *= UPGS.prestige.singles[31].effect()
                if (UPGS.prestige.singles[32].unl()) effect *= UPGS.prestige.singles[32].effect()
                if (GAIN.shard.effect.effect()) effect *= GAIN.shard.effect.effect()

                if (GAIN.upower.effect()) effect = Math.pow(effect, GAIN.upower.effect())
                if (UPGS.prestige.singles[12].unl()) effect = Math.pow(effect, UPGS.prestige.singles[12].effect())
                if (player.challenge.completed.includes(1)) effect = Math.pow(effect, CHALL[1].effect())

                return effect
            },
            effect() {
                return softCap(this.no_softcap_effect(), this.softcap().softcap_start, this.softcap().softcap_power)
            },
            softcap(){
                let softcap_start = 1e15, softcap_power = 0.5
                return { 
                    softcap_start,
                    softcap_power
                }
            }
        },
        offline(x = GAIN.coin.second.effect(), y = MISC.offline()) {
            return x*y
        }
    },
    shard: {
        click() {
            let effect = 1
            if (player.shard.upgrades[1]) effect *= UPGS.shard.buyables[1].effect()
            if (player.shop.upgrades[5]) effect *= UPGS.shop.buyables[5].effect()
            if (UPGS.supercrystal[33].unl()) effect *= UPGS.supercrystal[33].effect()
            return effect
        },
        second() {
            if (!UNL.shard.second.unl()) return 0
            let effect = 1
            if (player.shard.upgrades[2]) effect *= UPGS.shard.buyables[2].effect()
            if (player.shop.upgrades[5]) effect *= UPGS.shop.buyables[5].effect()
            if (player.minerals[3]) effect *= UPGS.minerals[3].effect2()
            if (ACHS.has(39)) effect *= 1.337
            if (ACHS.effect.shard()) effect *= ACHS.effect.shard()
            return effect
        },
        offline(x = GAIN.shard.second(), y = MISC.offline()) {
            return UNL.shard.second.unl() ? x*y : 0
        },
        effect: {
            no_softcap_effect() {
                let effect = 1 + player.shard.currency / 100
                if (ACHS.has(30)) effect *= 1+Math.pow(player.prestige.resets, 0.3)
                if (player.shard.singleUpgrades.includes(21)) effect = Math.pow(effect, UPGS.shard.singles[21].effect())

                if (player.challenge.activated != 0) {
                    effect = Math.sqrt(Math.sqrt(effect))

                    if (player.challenge.activated == 2) effect = 0.01
                    if (player.challenge.activated == 5 || player.challenge.activated == 6 || player.challenge.activated == 7 || player.challenge.activated == 10) effect = Math.sqrt(effect)
                    if (player.challenge.activated == 8) effect = Math.pow(effect, 0.25)
                    if (player.challenge.activated == 12) effect = Math.pow(effect, 0.02)
                }
                return effect
            },
            effect() {
                challenge_reward = player.challenge.completed.includes(7) && player.challenge.activated == 0 ? CHALL[7].effect() : 1
                return softCap(this.no_softcap_effect(), this.softcap().softcap_start, this.softcap().softcap_power) * challenge_reward
            },
            softcap(){
                let softcap_start = 1e7, softcap_power = 0.5
                if (player.supercrystal.upgrades.includes(23)) softcap_start = 1e10
                return { 
                    softcap_start,
                    softcap_power
                }
            }

        },
        min() {
            return UPGS.shard.buyables[3].effect().min
        },
        max() {
            return 50*UPGS.shard.buyables[3].effect().max
        },
        break_crystal(x = howMuchCrystalsInput.value) {
            let gain = 0, temp = 0, parsed_x = x.includes('e') ? convert(x) : parseInt(parseFloat(x)), broken_crystals = parsed_x
            
            if (x.includes('%')){
                temp = Math.floor(player.prestige.currency - (player.prestige.currency * (parsed_x / 100))) //10 = 10 - (10*(1/100)); 10 = 10 - (0.1) = 9.9 = 9
                broken_crystals = player.prestige.currency - temp //200-180 = 20 crystals broken
                player.prestige.currency = Math.floor(temp) //200 => 180 crystals left
            }
            else {
                broken_crystals = parsed_x // 130
                player.prestige.currency -= parsed_x //200 - 130 = 70
            }
            if (broken_crystals < 1e6) {
                for (let i = 0; i < broken_crystals; i++) {
                    gain += randomNumber(this.min(), this.max())
                    if (player.shard.currency == 0) {
                        gain = 100
                    }
                } 
            }
            else gain = ((this.min()+this.max())/2)*broken_crystals
            if (UPGS.supercrystal[33].unl()) gain *= UPGS.supercrystal[33].effect()
            return {
                gain,
                broken_crystals
            }
        },
    },
    crystal: {
        offline(x = GAIN.crystal.reset(), y = MISC.offline(), z = ACHS.has(22)) {
            let time = y/(14400/UPGS.prestige.buyables[2].effect()), gain = x * time
            return z ? gain : 0
        },
        reset() {
            let gain = 1
            if (player.prestige.upgrades[1]) gain *= UPGS.prestige.buyables[1].effect()
            if (ACHS.has(28)) gain *= 4
            if (player.shard.singleUpgrades.includes(11)) gain *= UPGS.shard.singles[11].effect()
            if (player.shop.permanentUpgrades[1]) gain *= UPGS.shop.permanent[1].effect()
            if (UNL.overdrive.type2.unl()) gain *= UNL.overdrive.type2.effect()
            if (player.minerals[3]) gain *= UPGS.minerals[3].effect1()
            if (player.challenge.completed.includes(10) && player.challenge.activated == 0) gain *= CHALL[10].effect()
            if (player.supercrystal.upgrades.includes(12)) gain *= 3
            if (player.coin.superUpgrades.includes(35)) gain *= ACHS.effect.crystal()

            return gain
        }
    },
    prestige: {
        offline(y = MISC.offline()) {
            if (!MILESTONES.has(16)) return 0
            let gain = y/60, formula = 60/player.time.game.fastestPrestige.timer
            if (formula) gain *= formula * 1.66
            if (ACHS.has(35)) gain *= 1 + MISC.amount_of_upgrades.super()/100
            return gain //per y sec
        },
        reset() {
            let gain = MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency+10)-14) : 1
            if (ACHS.has(35)) gain *= 1 + MISC.amount_of_upgrades.super()/100
            return Math.floor(gain)
        },
    },
    supercoin: {
        offline(x = GAIN.supercoin.chance(), y = MISC.offline()) {
            return Math.floor(y/(1000/x))
        },
        chance() {
            let chance = 1
            if (player.shop.upgrades[4]) chance *= UPGS.shop.buyables[4].effect()
            if (player.prestige.singleUpgrades.includes(13)) chance *= 1.75
            if (player.supercrystal.upgrades.includes(11)) chance *= 1.5
            if (player.coin.superUpgrades.includes(23)) chance *= UPGS.coin.singles[13].effect_super()
            if (player.minerals[1]) chance *= UPGS.minerals[1].effect3()
            if (ACHS.has(37)) chance += 1
            return chance
        },
        get() {
            return randomNumber(0, (100/this.chance())-1) == 0
        },
        gain() {
            return 1
        },
        daily: {
            min() {
                let effect = 25
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect()
                return effect
            },
            max() {
                let effect = 100
                if (player.shop.permanentUpgrades[2]) effect *= UPGS.shop.permanent[2].effect()
                return effect
            },
            reward() {
                return randomNumber(this.min(), this.max())
            }
        }
    },
    critical: {
        baseMult: 2,
        baseChance: 1,
        multiplier() {
            let effect = GAIN.critical.baseMult
            if (player.supercrystal.upgrades.includes(22)) effect *= 5
            if (player.shop.permanentUpgrades[4]) effect *= UPGS.shop.permanent[4].effect()
            if (player.minerals) effect *= UPGS.minerals[1].effect2()
            if (player.coin.superUpgrades.includes(13)) effect *= UPGS.coin.buyables[3].effect_super()
            return effect
        },
        chance: {
            additive() {
                let effect = GAIN.critical.baseChance
                if (player.supercrystal.upgrades.includes(21)) effect += 2
                if (player.shop.permanentUpgrades[3]) effect += UPGS.shop.permanent[3].effect()
                return effect
            },
            multiplicative() {
                let effect = this.additive()
                if (player.minerals) effect *= UPGS.minerals[1].effect1()
                if (player.coin.superUpgrades.includes(15)) effect = Math.pow(effect, UPGS.coin.buyables[5].effect_super())
                return effect
            }
        },
        get() {
            return randomNumber(0, (100/this.chance.multiplicative())-1) == 0
        },
        gain(x) {
            return x*this.multiplier()
        }
    },
    simulation: {
        multiplier() {
            let effect = 1
            if (player.supercrystal.upgrades.includes(13)) effect *= 2
            return effect
        }
    },
    umultiplier: {
        base() {
            let base = 2
            if (player.prestige.singleUpgrades.includes(14)) base = 2.5
            return base
        },
        effect(x = player.umultipliers) {
        return Math.pow(this.base(), x)
        },
    },
    upower: {
        base() {
            let base = 0.045
            if (player.prestige.singleUpgrades.includes(24)) base = 0.05
            return base
        },
        effect(x = player.upowers) {
            return 1+this.base()*x
        },
    },
    offline_gain(y = MISC.offline()) {
        player.coin.currency += this.coin.offline()
        player.coin.total_currency += this.coin.offline()
        player.shard.currency += this.shard.offline()
        player.prestige.currency += this.crystal.offline()
        player.prestige.total_currency += this.crystal.offline()
        player.prestige.resets += Math.floor(this.prestige.offline())
        player.supercoin.total_currency += this.supercoin.offline()
        player.supercoin.currency += this.supercoin.offline()
        player.time.game.total.timer += y
        player.time.game.prestige.timer += y
        player.time.umultiplier += y
        player.time.upower += y
        player.time.real.total.timer += UPGS.supercrystal[31].unl() ? y/5 : y
        player.time.real.prestige.timer += UPGS.supercrystal[31].unl() ? y/5 : y
    },
    offline_gain_time_warp (x) {
        player.coin.currency += this.coin.offline(undefined, x)
        player.coin.total_currency += this.coin.offline(undefined, x)
        player.shard.currency += this.shard.offline(undefined, x)
        player.prestige.currency += this.crystal.offline(undefined, x)
        player.prestige.total_currency += this.crystal.offline(undefined, x)
        player.prestige.resets += this.prestige.offline(x)
        player.supercoin.currency += this.supercoin.offline(undefined, x)
        player.supercoin.total_currency += this.supercoin.offline(undefined, x)
        player.time.game.total.timer += x
        player.time.game.prestige.timer += x
        player.time.umultiplier += x
        player.time.upower += x
    },
    clicksPerSecond: 0
}

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
                return (1+Math.pow(2, this.percent()/2.5)/9)-0.11
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
                return Math.pow(10, this.percent()/4.85)
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
            return (1e21 * Math.pow(1000, player.supercrystal.total_currency))/UPGS.minerals[3].effect3()
        },
        interval: ''
    },
    rune: {
        cost() {
            return 1e9*Math.pow(10, player.rune.total_currency)
        }
    },
    display: {
        unl(x, y = 'none') { return this[x].req() ? (this[x].element).style.display = this[x].type : (this[x].element).style.display = y},
        check() {
            for (let i = 1; i <= 51; i++)
            if (this[i].type != 'none') this.unl(i)
            else this.unl(i, 'flex')
        },
        1: {//button in middle
            name: 'buyAll',
            type: 'block',
            element: document.getElementById('maxbuy'),
            req() { return ACHS.has(15)},
        },
        2: {//button in top left
            name: 'buyMax',
            type: 'block',
            element: document.getElementById('maxOrNoUpgrades'),
            req() { return ACHS.has(15)},
        },
        3: {
            name: 'prestige_reset_button',
            type: 'block',
            element: document.getElementById('doPrestige'),
            req() { return ACHS.has(20)},
        },
        4: {
            name: 'crystals_amount',
            type: 'block',
            element: document.getElementById('crystalCount'),
            req() { return ACHS.has(21)},
        },
        5: {
            name: 'prestige_tab',
            type: 'block',
            element: document.getElementById('prestigeSelect'),
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
            element: document.getElementById('prestigeSection'),
            req() { return ACHS.has(21)},
        },
        7: {
            name: 'prestige_buyables_bulk',
            type: 'flex',
            element: document.getElementById('prestigeSpecialRow'),
            req() { return MILESTONES.has(10)},
        },
        8: {
            name: 'single_automation',
            type: 'flex',
            element: document.getElementById('singleAutomationContainer'),
            req() { return MILESTONES.has(2)},
        },
        9: {
            name: 'buyable_automation',
            type: 'flex',
            element: document.getElementById('buyableAutomationContainer'),
            req() { return MILESTONES.has(3)},
        },
        10: {
            name: 'umultiplier_automation',
            type: 'flex',
            element: document.getElementById('umultiplierAutomationContainer'),
            req() { return MILESTONES.has(4)},
        },
        11: {
            name: 'upower_automation',
            type: 'flex',
            element: document.getElementById('upowerAutomationContainer'),
            req() { return MILESTONES.has(5)},
        },
        12: {
            name: 'prestige_automation',
            type: 'flex',
            element: document.getElementById('prestigeAutomationContainer'),
            req() { return MILESTONES.has(8)},
        },
        13: {
            name: 'supercrystals_tab',
            type: 'block',
            element: document.getElementById('superCrystalsSelect'),
            req() { return player.progressBarGoals.includes(3)}, 
        },
        14: {
            name: 'minerals_tab',
            type: 'block',
            element: document.getElementById('mineralsSelect'),
            req() { return player.progressBarGoals.includes(4)},
        },
        15: {
            name: 'challenges_tab',
            type: 'block',
            element: document.getElementById('challengeSelect'),
            req() { return player.progressBarGoals.includes(2) },
        },
        16: {
            name: 'post_c11_shop_buyables',
            type: 'flex',
            element: document.getElementById('post11challenge'),
            req() { return player.challenge.completed.includes(11)},
        },
        17: {
            name: 'post_c11_shop_permanent',
            type: 'flex',
            element: document.getElementById('post11challenge2'),
            req() { return player.challenge.completed.includes(11)},
        },
        18: {
            name: 'post_c11_shop_items',
            type: 'flex',
            element: document.getElementById('post11challenge3'),
            req() { return player.challenge.completed.includes(11)},
        },
        19: {
            name: 'post_ach32_unlocklable',
            type: 'flex',
            element: document.getElementById('postAch32'),
            req() { return ACHS.has(32)},
        },
        20: {
            name: 'post_ach33_permanent_1',
            type: 'flex',
            element: document.getElementsByClassName('postAch33')[0],
            req() { return ACHS.has(33)},
        },
        21: {
            name: 'post_ach33_permanent_2',
            type: 'flex',
            element: document.getElementsByClassName('postAch33')[1],
            req() { return ACHS.has(33)},
        },
        22: {
            name: 'post_ach33_unlockable',
            type: 'flex',
            element: document.getElementsByClassName('postAch33')[2],
            req() { return ACHS.has(33)},
        },
        23: {
            name: 'prestige_help_pages',
            type: 'block',
            element: document.getElementById('prestigeHelpDiv'),
            req() { return ACHS.has(21)},
        },
        24: {
            name: 'modernization_button',
            type: 'block',
            element: document.getElementById('modernizeButton'),
            req() { return UPGS.shop.unlockables[3].unl() },
        },
        25: {
            name: 'force_umulti',
            type: 'block',
            element: document.getElementById('harshUmulti'),
            req() { return player.challenge.activated == 5 || player.challenge.activated == 7},
        },
        26: {
            name: 'post_e13_click_softcap',
            type: 'flex',
            element: document.getElementById('postE13SoftcapClick'),
            req() { return GAIN.coin.click.effect() >= 1e13 },
        },
        27: {
            name: 'post_e13_second_softcap',
            type: 'flex',
            element: document.getElementById('postE13SoftcapSecond'),
            req() { return GAIN.coin.second.effect() >= 1e13 },
        },
        28: {
            name: 'post_e15_gain_softcap',
            type: 'flex',
            element: document.getElementById('postE15SoftcapGain'),
            req() { return GAIN.coin.gain.effect() >= 1e15 },
        },
        29: {
            name: 'post_e7_shard_effect_softcap',
            type: 'flex',
            element: document.getElementById('postE7SoftcapEffect'),
            req() { return GAIN.shard.effect.effect() >= 1e7 },
        },
        30: {
            name: 'shard_unlockable_second',
            type: 'flex',
            element: document.getElementById('shardsPerSecondText'),
            req() { return UNL.shard.second.unl() }
        },
        31: {
            name: 'shard_unlockable_second',
            type: 'none',
            element: document.getElementById('shardUnlockableBase1'),
            req() { return UNL.shard.second.unl() }
        },
        32: {
            name: 'shard_unlockable_click',
            type: 'flex',
            element: document.getElementById('shardsClick'),
            req() { return UNL.shard.click.unl() }
        },
        33: {
            name: 'shard_unlockable_click',
            type: 'none',
            element: document.getElementById('shardUnlockableBase2'),
            req() { return UNL.shard.click.unl() }
        },
        34: {
            name: 'shard_unlockable_buyable',
            type: 'flex',
            element: document.getElementById('shardBuyables'),
            req() { return UNL.shard.buyables.unl() }
        },
        35: {
            name: 'shard_unlockable_buyable',
            type: 'none',
            element: document.getElementById('shardUnlockableBase3'),
            req() { return UNL.shard.buyables.unl() }
        },
        36: {
            name: 'shard_unlockable_single',
            type: 'flex',
            element: document.getElementById('shardSingles'),
            req() { return UNL.shard.singles.unl() }
        },
        37: {
            name: 'shard_unlockable_single',
            type: 'none',
            element: document.getElementById('shardUnlockableBase4'),
            req() { return UNL.shard.singles.unl()}
        },
        38: {
            name: 'auto_single_upgrade',
            type: 'none',
            element: ELS.automationUpgradesArray[0],
            req() { return MISC.automation.single.time() == 50}
        },
        39: {
            name: 'auto_buyable_upgrade',
            type: 'none',
            element: ELS.automationUpgradesArray[1],
            req() { return MISC.automation.buyable.time() == 50}
        },
        40: {
            name: 'auto_umulti_upgrade',
            type: 'none',
            element: ELS.automationUpgradesArray[2],
            req() { return MISC.automation.umultiplier.time() == 50}
        },
        41: {
            name: 'auto_upower_upgrade',
            type: 'none',
            element: ELS.automationUpgradesArray[3],
            req() { return MISC.automation.upower.time() == 50}
        },
        42: {
            name: 'auto_prestige_upgrade',
            type: 'none',
            element: ELS.automationUpgradesArray[4],
            req() { return MISC.automation.prestige.time() == 50}
        },
        43: {
            name: 'auto_prestige_mode_select',
            type: 'flex',
            element: document.getElementById('prestigeModeDiv'),
            req() { return MISC.automation.prestige.time() == 50 && MILESTONES.has(14)}
        },
        44: {
            name: 'auto_buyable_bulk_button',
            type: 'flex',
            element: document.getElementById('increaseBulkBuyButton'),
            req() { return MISC.automation.buyable.time() == 50 && MILESTONES.has(6) && MISC.automation.buyable.bulk() != 512}
        },
        45: {
            name: 'auto_umulti_input',
            type: 'flex',
            element: document.getElementById('umultiIntervalDiv'),
            req() { return MISC.automation.umultiplier.time() == 50}
        },
        46: {
            name: 'auto_upower_input',
            type: 'flex',
            element: document.getElementById('upowerIntervalDiv'),
            req() { return MISC.automation.upower.time() == 50}
        },
        47: {
            name: 'exit_chall_button',
            type: 'inline-block',
            element: document.getElementById('exitChallenge'),
            req() { return player.challenge.activated != 0}
        },
        48: {
            name: 'overdrive_tab',
            type: 'block',
            element: document.getElementById('overdriveSelect'),
            req() { return UPGS.shop.unlockables[1].unl()}
        },
        49: {
            name: 'overdrive1',
            type: 'block',
            element: document.getElementById('overdriveType1'),
            req() { return UPGS.shop.unlockables[1].unl()}
        },
        50: {
            name: 'overdrive2',
            type: 'block',
            element: document.getElementById('overdriveType2'),
            req() { return UPGS.shop.unlockables[2].unl()}
        },
        51: {
            name: 'challenge_help',
            type: 'block',
            element: document.getElementById('challengeHelpDiv'),
            req() { return player.progressBarGoals.includes(2) }
        }
    }
}

const CHALL = {
    1: {
        id: 1,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() { return 1.1 }
    },
    2: {
        id: 2,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() { return 1000000 }
    },
    3: {
        id: 3,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return 1+(Math.log(player.prestige.resets+1)/222)
        }
    },
    4: {
        id: 4,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return Math.pow(1.43, player.achievements.length)
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
        effect() {
            return Math.pow(1.99, player.challenge.completed.length)
        }
    },
    7: {
        id: 7,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return Math.log2(player.shard.currency+1)
        }
    },
    8: {
        id: 8,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return 1+player.time.real.prestige.timer
        }
    },
    9: {
        id: 9,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return Math.pow(player.supercoin.total_currency, 1.2)
        }
    },
    10: {
        id: 10,
        completed() { return player.challenge.completed.includes(this.id) },
        effect() {
            return 1+Math.log10(MISC.amount_of_upgrades.coin()+1)
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
    }
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
    },
    offline(x = player.time.savedTime, y = Date.now()) {
        let time = (y-x)/1000
        time = Math.min(time, 1e6)
        if (UPGS.supercrystal[31].unl()) time*5
        if (player.settings.offline == false) return 0
        return time
    },
    free_upgrade: {
        1() { 
            let effect = 0
            if (player.challenge.completed.includes(4) && player.challenge.activated == 0) effect = CHALL[4].effect()
            if (player.coin.superUpgrades.includes(11)) effect += UPGS.coin.buyables[1].effect_super()
            if (player.minerals[2]) effect += UPGS.minerals[2].effect3()
            return effect
        },
        4() { 
            let effect = 0
            if (player.coin.superUpgrades.includes(25)) effect += UPGS.coin.singles[15].effect_super()
            return effect
        }
    },
    auto_save_timer: 0
}

const PROGRESS = {
    unl(x) { return player[this[x].layer][this[x].type] >= this[x].req()},
    add(x) { if (!player.progressBarGoals.includes(x) && this.unl(x)) player.progressBarGoals.push(x) },
    name: ['', '', '', '', '', ''],
    currency: ['', '', '', '', '', ''],
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
        req() { return 1e40 }, //supercrystals
    },
    4: {
        layer: "prestige",
        type: "resets",
        req() { return 1e7 }, //minerals
    },
    5: {
        layer: "coin",
        type: "currency",
        req() { return 1e100 }, //superprestige
    },
    6: {
        layer: "coin",
        type: "currency",
        req() { return 1.79e308 }, //balls
    },
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
    player.time.real.daily.timer = Math.max((player.time.next_daily-player.time.currentTime)/1000, 0)
    convert_time('real', 'daily')

    update_overdrive()
    PROGRESS.update()
    UNL.display.check()
    ACHS.checkAchievements()
    ACHS.checkRows()

    LAYERS.umultiplier.disable()
    LAYERS.upower.disable()

    MILESTONES.checkMilestones()

    UPGS.coin.buyables.checkDisable()
    UPGS.coin.singles.checkDisable()
    UPGS.prestige.buyables.checkDisable()
    UPGS.prestige.singles.checkDisable()
    UPGS.shard.buyables.checkDisable()
    UPGS.shard.singles.checkDisable()
    UPGS.shop.buyables.checkDisable()
    UPGS.shop.permanent.checkDisable()
    UPGS.shop.unlockables.checkDisable()
    UPGS.shop.items.checkDisable()
    UPGS.supercrystal.checkDisable()
    UPGS.minerals.checkDisable()

    UPGS.coin.buyables.checkPurchased()
    UPGS.coin.singles.checkPurchased()
    UPGS.prestige.singles.checkPurchased()
    UPGS.shard.singles.checkPurchased()
    UPGS.supercrystal.checkPurchased()

    LORE.checkLore()

    resetDailyReward()
    checkCompletedChallenges()
    checkSuperUpgradesForTooltips()

    statsPerClickUpdate()
    statsPerSecondUpdate()
    statsGainUpdate()
    statsSuperCoinChanceUpdate()
    statsCrystalsUpdate()
    statsShardsPerClickUpdate()
    statsShardsPerSecondUpdate()
    statsShardsEffectUpdate()
    statsCritChanceUpdate()
    statsCritMultiUpdate()
    statsClickSimulationUpdate()

    player.time.savedTime = Date.now()
}

// mySlider.onmouseup = function() {
//     player.settings.autosave_interval = this.value; 
// }

mySlider.oninput = function() {
    player.settings.autosave_interval = this.value; 
}

function convert_time(type, layer) {
    let time = player.time[type][layer].timer // type - real/time, layer - total/fastest
    //time = 63249
    player.time[type][layer].seconds = time % 60 //39
    player.time[type][layer].minutes = (time / 60) % 60
    player.time[type][layer].hours = (time / 3600) % 24
    player.time[type][layer].days = time / 86400
}

function update_overdrive() {
    if (ELS.mediaQuery.matches) {
        overdriveType1ProgressBarActive.style.width = (UNL.overdrive.type1.percent()*3) + "px"
        overdriveType1ProgressBar.style.width = (UNL.overdrive.type1.percent()*3) + "px"
        overdriveType2ProgressBarActive.style.width = (UNL.overdrive.type2.percent()*3) + "px"
        overdriveType2ProgressBar.style.width = (UNL.overdrive.type2.percent()*3) + "px"
    } else {
        overdriveType1ProgressBarActive.style.width = (UNL.overdrive.type1.percent()*8) + "px"
        overdriveType1ProgressBar.style.width = (UNL.overdrive.type1.percent()*8) + "px"
        overdriveType2ProgressBarActive.style.width = (UNL.overdrive.type2.percent()*8) + "px"
        overdriveType2ProgressBar.style.width = (UNL.overdrive.type2.percent()*8) + "px"
    }
    shardUnlock1.style.width = UNL.shard.second.percent() + "%"
    shardUnlock2.style.width = UNL.shard.click.percent() + "%"
    shardUnlock3.style.width = UNL.shard.buyables.percent() + "%"
    shardUnlock4.style.width = UNL.shard.singles.percent() + "%"

    superCrystalBar.style.clipPath = `inset(${100-UNL.supercrystal.pour()/1.05}% 0 0 0)`
}

overdriveType1ProgressBarBase.addEventListener("click", function() {
    UNL.overdrive.type1.activate ? UNL.overdrive.type1.activate = false : UNL.overdrive.type1.activate = true
    if (UNL.overdrive.type1.activate){
        UNL.overdrive.type1.blink = setInterval(()=> {
            overdriveType1ProgressBarActive.style.opacity == 1 ? overdriveType1ProgressBarActive.style.opacity = 0 :  overdriveType1ProgressBarActive.style.opacity = 1
        }, 500)
        UNL.overdrive.type1.interval = setInterval(()=> {
            if (player.coin.currency >= UNL.overdrive.type1.cost()){
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
                    player.shard.unlockables.push(number)
                }
            }
        }, 50)
}

function fillTheProgressBar2(type) {
    let sub = Math.min(player.supercrystal.consumedShards, UNL[type].cost()-player.supercrystal.consumedShards)
        UNL[type].interval = setInterval(()=> {
            if (player.shard.currency >= sub){
                sub = (player.supercrystal.consumedShards+100)
                player.shard.currency -= sub
                player.supercrystal.consumedShards += sub
                sub = Math.min(1+player.supercrystal.consumedShards, UNL[type].cost()-player.supercrystal.consumedShards)
                if (UNL[type].pour() == 100) {
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
        coinGain.addEventListener("keydown", function(event) {
            if (event.key == "Enter") {
                    event.preventDefault();
                }})
        for (let i = 1; i <= GAIN.simulation.multiplier(); i++) {
            player.clicks.simulated++
            let gain = GAIN.coin.click.effect(), getCrit = false, getSuper = false
            if (GAIN.critical.get()) {gain = GAIN.critical.gain(gain); getCrit = true; player.clicks.critical++}
            if (GAIN.supercoin.get()) {getSuper = true}
            if (GAIN.critical.get() && GAIN.supercoin.get()) {if (!ACHS.has(37)) ACHS.unl(37)}
            player.coin.currency += gain
            player.coin.total_currency += gain

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
                superCoinText.innerHTML = ("+1");
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
        shardsClick.addEventListener("keydown", function(event) {
            if (event.key == "Enter") {
                    event.preventDefault();
                }})
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
}

function selectSubTab(argument, isFlex, mainTab) {
    const settingsTabsToHide = ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab']
    const clickerTabsToHide = ['coinsTab', 'overdriveTab']
    const infoTabsToHide = ['aboutGameTab', 'statisticsTab', 'multipliersTab', 'challengesTimeTab', 'recentPrestigesTab']
    const prestigeTabsToHide = ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab', 'superCrystalsTab', 'mineralsTab']
    let tabsToHide
    if (mainTab == 'settings') tabsToHide = settingsTabsToHide
    else if (mainTab == 'clicker') tabsToHide = clickerTabsToHide
    else if (mainTab == 'info') tabsToHide = infoTabsToHide
    else if (mainTab == 'prestige') tabsToHide = prestigeTabsToHide
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    if (!isFlex) argument.style.display = "block"
    else argument.style.display = "flex"
}

function showStats(multId) {
    const tabsToHide = ['gainPerClickStats', 'gainPerSecondStats', 'wholeGainStats', 'superCoinsChanceStats', 'crystalsMultiplierStats', 'shardsPerClickStats', 'shardsPerSecondStats', 'shardsEffectStats', 'critChanceStats', 'critMultiStats', 'clickSimulationStats', 
    'gainPerClickGraphic', 'gainPerSecondGraphic', 'gainGraphic', 'superCoinsChanceGraphic', 'crystalsMultiplierGraphic', 'shardsPerClickGraphic', 'shardsPerSecondGraphic', 'shardsEffectGraphic', 'critChanceGraphic', 'critMultiGraphic', 'clickSimulationGraphic'
]
    for (const tabId of tabsToHide) {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = "none";
        }
    }
    for (let i = 0; i < 11; i++){
        if (i == multId) {
            document.getElementById(tabsToHide[i]).style.display = 'block'; 
            document.getElementById(tabsToHide[i+11]).style.display = 'block'; 
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
        windowTitle2.style.fontSize = '24px'; 
        windowTitle2.innerHTML = text.window.hard; 
        yesHR.style.display = "block"
        }
        else if (arg == 'gotNaNed') {
            windowTitle2.style.fontSize = '14px';
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
    let font, body = document.querySelector("body"), select = document.querySelector("select"), label = document.querySelector("label"), buttons = document.querySelectorAll("button")
    if (option.value == 'option1') {
        font = 'Poly'
    }
    if (option.value == 'option2') {
        font = 'serif'
    }
    if (option.value == 'option3') {
        font = 'Impact'
    }
    if (option.value == 'option4') {
        font = 'Courier'
    }
    if (option.value == 'option5') {
        font = 'Verdana'
    }
    if (option.value == 'option6') {
        font = 'system-ui'
    }
    if (option.value == 'option7') {
        font = 'PAPYRUS THE GREAT'
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
    }
    if (option.value == 'option9') {
        font = 'monotyper'
    }
    if (option.value == 'option10') {
        font = 'swkeys'
    }
    if (option.value != 'option7'){
        THEMEOFTHEGREAT.currentTime = 0
        THEMEOFTHEGREAT.pause()
    }
    body.style.fontFamily = font
    select.style.fontFamily = font
    label.style.fontFamily = font
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.fontFamily = font
    }
    player.settings.font = option.value
}

function changeNotations(option){
    player.settings.notation = option.value
}

function changeFonts2(option) {
    let font = option, body = document.querySelector("body"), select = document.querySelector("select"), label = document.querySelector("label"), buttons = document.querySelectorAll("button")
    if (option == 'option1') {
        font = 'Poly'
    }
    if (option == 'option2') {
        font = 'serif'
    }
    if (option == 'option3') {
        font = 'Impact'
    }
    if (option == 'option4') {
        font = 'Courier'
    }
    if (option == 'option5') {
        font = 'Verdana'
    }
    if (option == 'option6') {
        font = 'system-ui'
    }
    if (option == 'option7') {
        font = 'PAPYRUS THE GREAT'
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
    }
    if (option == 'option9') {
        font = 'monotyper'
    }
    if (option == 'option10') {
        font = 'swkeys'
    }
    if (option != 'option7'){
        THEMEOFTHEGREAT.currentTime = 0
        THEMEOFTHEGREAT.pause()
    }
    body.style.fontFamily = font
    select.style.fontFamily = font
    label.style.fontFamily = font
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.fontFamily = font
    }
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
