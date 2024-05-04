const UPGS = {
    coin: {
        buyables: {
            canAfford(x) {
                let bool = false
                if (player.coin.currency >= this[x].cost()) bool = true
                if (player.challenge.activated == 6) bool = false
                if (player.challenge.activated == 10) 
                    MISC.amount_of_upgrades.coin() <= 25 ? bool : bool = false
                if (player.challenge.activated == 11) bool = false
                return bool
            },
            canAfford_super(x){
                return player.supercoin.currency >= this[x].cost_super() && !player.coin.superUpgrades.includes(x+10)
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.coin.currency -= this[x].cost()
                    player.coin.upgrades[x]++
                }
            },
            buy_super(x) {
                if (this.canAfford_super(x)) {
                    player.supercoin.currency -= this[x].cost_super()
                    player.coin.superUpgrades.push(this[x].super_id)
                }
            },
            buy_auto() {
                for (let x = 1; x <= 5; x++) {
                    this.buy(x)
                }
            },
            buyMax() {
                for (let x = 1; x <= 5; x++) {
                    this.max(x)
                }
            },
            buyMax_auto() {
                for (let x = 1; x <= 5; x++) {
                    this.max_auto(x)
                }
            },
            max(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                        player.coin.currency -= totalCost(bulk, this[x].cost(), this[x].power)
                        player.coin.upgrades[x] += bulk
                }
            },
            bulk_cost(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                    return totalCost(bulk, this[x].cost(), this[x].power)
                }
                else return this[x].cost()
            },
            max_auto(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                    bulk = Math.min(bulk, MISC.automation.buyable.bulk())
                        player.coin.currency -= totalCost(bulk, this[x].cost(), this[x].power)
                        player.coin.upgrades[x] += bulk
                }
            },
            disable(x) {
                if (!player.settings.modernization_activated) this.canAfford(x) ? this[x].element.disabled = false : this[x].element.disabled = true
                else this.canAfford_super(x) || player.coin.superUpgrades.includes(x+10) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 5; x++) {
                    this.disable(x)
                }
            },
            checkPurchased() {
                for (let y = 1; y <= 5; y++) {
                    if (this[y].unl_super()) this[y].element.classList.add('superPurchasedBuyable')
                }
            },
            1: {
                id: 1, 
                super_id: 11,
                power: 1.099,
                basePrice: 10,
                element: document.getElementById('buyableU1'),
                cost(x=player.coin.upgrades[this.id], y = MISC.amount_of_upgrades.coin()) {
                    let cost = this.basePrice*Math.pow(this.power, x)
                    if (player.challenge.activated == 5) cost = this.basePrice*Math.pow(this.power, y)
                    if (player.challenge.activated == 0 && player.challenge.completed.includes(5)) cost = Math.pow(this.basePrice*Math.pow(this.power, x), CHALL[5].effect())
                    return cost
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 500 },
                effect(x=player.coin.upgrades[this.id] + MISC.free_upgrade[this.id]()) {
                    let eff = x
                    eff *= UPGS.coin.buyables[2].effect()
                    return eff
                },
                effect_super(x = this.unl_super(), y=player.coin.upgrades[this.id]) {
                    if (x == 0) return 1
                    let eff = y*3
                    return eff
                },
                bulk(x=player.coin.currency, y=player.coin.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    if (player.challenge.activated == 10) 25-bulk < 0 ? bulk = 0 : bulk = Math.min(25-bulk, 25)
                    !player.settings.buy_max_activate ? bulk = 1 : bulk
                    return bulk
                }
            },
            2: {
                id: 2, 
                super_id: 12,
                power: 1.3,
                basePrice: 100,
                element: document.getElementById('buyableU2'),
                cost(x=player.coin.upgrades[this.id], y = MISC.amount_of_upgrades.coin()) {
                    let cost = this.basePrice*Math.pow(this.power, x)
                    if (player.challenge.activated == 5) cost = this.basePrice*Math.pow(this.power, y)
                    if (player.challenge.activated == 0 && player.challenge.completed.includes(5)) cost = Math.pow(this.basePrice*Math.pow(this.power, x), CHALL[5].effect())
                    return cost
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 750 },
                effect(x=player.coin.upgrades[this.id]) {
                    let eff = 1+x/10
                    if (player.coin.singleUpgrades.includes(14)) eff *= UPGS.coin.singles[14].effect()
                    if (player.achievements.includes(16)) eff *= 1.1
                    eff *= this.effect_super()
                    return eff
                },
                effect2(x=player.coin.upgrades[this.id]) {
                    let eff = 1+x/10
                    if (player.coin.singleUpgrades.includes(14)) eff *= UPGS.coin.singles[14].effect()
                    if (player.achievements.includes(16)) eff *= 1.1
                    return eff
                },
                effect_super(x = this.unl_super(), y = this.effect2()) {
                    if (x == 0) return 1
                    let eff = 1+Math.log10(y+1)
                    return eff
                },
                bulk(x=player.coin.currency, y=player.coin.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    if (player.challenge.activated == 10) 25-bulk < 0 ? bulk = 0 : bulk = Math.min(25-bulk, 25)
                    !player.settings.buy_max_activate ? bulk = 1 : bulk
                    return bulk
                }
            },
            3: {
                id: 3, 
                super_id: 13,
                power: 9.33,
                basePrice: 500,
                element: document.getElementById('buyableU3'),
                cost(x=player.coin.upgrades[this.id], y = MISC.amount_of_upgrades.coin()) {
                    let cost = this.basePrice*Math.pow(this.power, x)
                    if (player.challenge.activated == 5) cost = this.basePrice*Math.pow(this.power, y)
                    if (player.challenge.activated == 0 && player.challenge.completed.includes(5)) cost = Math.pow(this.basePrice*Math.pow(this.power, x), CHALL[5].effect())
                    return cost
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 1000 },
                effect(x=player.coin.upgrades[this.id]) {
                    let eff = Math.pow(2, x)
                    return eff
                },
                effect_super(x = this.unl_super(), y=player.coin.upgrades[this.id]) {
                    if (x == 0) return 1
                    let eff = 1+Math.log2(y+1)
                    return eff
                },
                bulk(x=player.coin.currency, y=player.coin.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    if (player.challenge.activated == 10) 25-bulk < 0 ? bulk = 0 : bulk = Math.min(25-bulk, 25)
                    !player.settings.buy_max_activate ? bulk = 1 : bulk
                    return bulk
                }
            },
            4: {
                id: 4, 
                super_id: 14,
                power: 1.85,
                basePrice: 1000,
                element: document.getElementById('buyableU4'),
                cost(x=player.coin.upgrades[this.id], y = MISC.amount_of_upgrades.coin()) {
                    let cost = this.basePrice*Math.pow(this.power, x)
                    if (player.challenge.activated == 5) cost = this.basePrice*Math.pow(this.power, y)
                    if (player.challenge.activated == 0 && player.challenge.completed.includes(5)) cost = Math.pow(this.basePrice*Math.pow(this.power, x), CHALL[5].effect())
                    return cost
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 1250 },
                effect(x=player.coin.upgrades[this.id] +  MISC.free_upgrade[this.id]()) {
                    let base = player.prestige.singleUpgrades.includes(22) ? 1.075 : 1.05, eff = Math.pow(base, x)
                    if (player.coin.singleUpgrades.includes(15)) eff *= UPGS.coin.singles[15].effect()
                    if (player.coin.superUpgrades.includes(14)) eff *= this.effect_super()
                    return eff
                },
                effect_super(x = this.unl_super()) {
                    if (x == 0) return 1
                    let eff = Math.pow(1.075, player.umultipliers)
                    return eff
                },
                bulk(x=player.coin.currency, y=player.coin.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    if (player.challenge.activated == 10) 25-bulk < 0 ? bulk = 0 : bulk = Math.min(25-bulk, 25)
                    !player.settings.buy_max_activate ? bulk = 1 : bulk
                    return bulk
                }
            },
            5: {
                id: 5, 
                super_id: 15,
                power: 1.8,
                basePrice: 5000,
                element: document.getElementById('buyableU5'),
                cost(x=player.coin.upgrades[this.id], y = MISC.amount_of_upgrades.coin()) {
                    let cost = this.basePrice*Math.pow(this.power, x)
                    if (player.challenge.activated == 5) cost = this.basePrice*Math.pow(this.power, y)
                    if (player.challenge.activated == 0 && player.challenge.completed.includes(5)) cost = Math.pow(this.basePrice*Math.pow(this.power, x), CHALL[5].effect())
                    return cost
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 1500 },
                effect(x=player.coin.upgrades[this.id]) {
                    let eff = 1+x/1000
                    eff = softCap(eff, 1.15, 0.5)
                    return eff
                },
                effect_super(x = this.unl_super()) {
                    if (x == 0) return 1
                    let eff = this.effect()
                    return eff
                },
                bulk(x=player.coin.currency, y=player.coin.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    if (player.challenge.activated == 10) 25-bulk < 0 ? bulk = 0 : bulk = Math.min(25-bulk, 25)
                    !player.settings.buy_max_activate ? bulk = 1 : bulk
                    return bulk
                }
            },
        },
        singles: {
            canAfford(x) {
                let bool = false
                if (player.coin.currency >= this[x].cost() && !player.coin.singleUpgrades.includes(x)) bool = true
                if (player.challenge.activated == 1) bool = false
                if (player.challenge.activated == 10) 
                    MISC.amount_of_upgrades.coin() <= 25 ? bool : bool = false
                if (player.challenge.activated == 11) bool = false
                return bool
            },
            canAfford_super(x){
                return player.supercoin.currency >= this[x].cost_super() && !player.coin.superUpgrades.includes(x+10)
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.coin.currency -= this[x].cost()
                    player.coin.singleUpgrades.push(x)
                }
            },
            buy_super(x) {
                if (this.canAfford_super(x)) {
                    player.supercoin.currency -= this[x].cost_super()
                    player.coin.superUpgrades.push(this[x].super_id)
                }
            },
            disable(x) {
                if (!player.settings.modernization_activated) this.canAfford(x) || player.coin.singleUpgrades.includes(x) ? this[x].element.disabled = false : this[x].element.disabled = true
                else this.canAfford_super(x) || player.coin.superUpgrades.includes(x+10) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 2; x++)
                    for (let y = 1; y <= 5; y++) {
                        this.disable(x*10+y)
                    }
            },
            checkPurchased() {
                for (let x = 1; x <= 2; x++)
                    for (let y = 1; y <= 5; y++) {
                    const id = x*10+y
                        if (this[id].unl() && !this[id].unl_super()) this[id].element.classList.add('purchased')
                        else if (this[id].unl() && this[id].unl_super()) {
                            this[id].element.classList.add('superPurchased')
                            this[id].element.classList.remove('superPurchasedBuyable')
                        } 
                        else if (!this[id].unl() && this[id].unl_super()) {
                            this[id].element.classList.add('superPurchasedBuyable')
                            this[id].element.classList.remove('superPurchased')
                            this[id].element.classList.remove('purchased')
                        } 
                        else this[id].element.classList.remove('purchased')
                    }
            },
            11: {
                id: 11, 
                super_id: 21,
                element: document.getElementById('singleU1'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 100000
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 2000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1+(Math.log10(player.coin.total_currency+10)/2.25)
                    eff *= this.effect_super()
                    if (player.coin.singleUpgrades.includes(24)) eff = Math.pow(eff, UPGS.coin.singles[24].effect())
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 1+(Math.log10(player.coin.currency+10))
                    return eff
                },
            },
            12: {
                id: 12, 
                super_id: 22,
                element: document.getElementById('singleU2'),
                base() {
                    return ACHS.has(19) ? 1.135 : 1.125
                },
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 3e6
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 2500 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.log1p(Math.pow(Math.pow(player.clicks.simulated, 2), this.base()))
                    eff *= this.effect_super()
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.log1p(Math.pow(Math.pow(player.clicks.real, 2), this.base()))
                    return eff
                },
            },
            13: {
                id: 13, 
                super_id: 23,
                element: document.getElementById('singleU3'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 5e6
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 5000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 2
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 2
                    return eff
                },
            },
            14: {
                id: 14, 
                super_id: 24,
                element: document.getElementById('singleU4'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 2.5e7
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 7500 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1+Math.pow(Math.log10(player.coin.upgrades[1]+10)/2.25, 1.6)
                    if (player.coin.superUpgrades.includes(24)) eff *= this.effect_super()
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 1+Math.pow((Math.log10(player.coin.upgrades[2]+10)), 2)
                    return eff
                },
            },
            15: {
                id: 15, 
                super_id: 25,
                element: document.getElementById('singleU5'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 6.5e8
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 10000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.pow(Math.log10(player.coin.upgrades[4]+10), 1.175)
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 0
                    let eff = this.effect()*33 //free multipliers 4th upg
                    return eff
                },
            },
            21: {
                id: 21,
                super_id: 31, 
                element: document.getElementById('singleU6'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 5e9
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 15000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.log10(GAIN.coin.click.effect()+10)/1.25
                    if (player.coin.superUpgrades.includes(31)) eff *= this.effect_super()
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = GAIN.critical.multiplier()
                    return eff
                },
            },
            22: {
                id: 22, 
                super_id: 32,
                element: document.getElementById('singleU7'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 5e10
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 25000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.pow(MISC.amount_of_upgrades.coin()+10, 0.9)/3.5
                    if (player.achievements.includes(17)) eff *= 1 + (0.2 * player.time.game.total.timer/7200)
                    return !player.prestige.singleUpgrades.includes(23) ? Math.min(eff, 100) : softCap(eff, this.softcap_start(), 0.5)
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 1000000
                    return eff
                },
                softcap_start() {
                    return this.unl_super() ? this.effect_super() : 100
                }
            },
            23: {
                id: 23, 
                super_id: 33,
                element: document.getElementById('singleU8'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 7e11
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 50000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.pow(player.achievements.length * 50, 0.4)
                    if (player.coin.superUpgrades.includes(33)) eff = Math.pow(eff, this.effect_super())
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 1+player.achievement_rows.length/2
                    return eff
                },
            },
            24: {
                id: 24, 
                super_id: 34,
                element: document.getElementById('singleU9'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 2e12
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)},
                cost_super() { return 100000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 + (player.time.game.total.timer/200000)
                    eff = Math.min(eff, 1.25*this.effect_super())
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 2 //hardcap till 2.5 (?)
                    return eff
                },
            },
            25: {
                id: 25, 
                super_id: 35,
                element: document.getElementById('singleU10'),
                unl() {return player.coin.singleUpgrades.includes(this.id)},
                cost(){ 
                    let cost = 1e13
                    if (player.challenge.activated == 5) cost *= Math.pow(10, MISC.amount_of_upgrades.coin())
                    if (player.challenge.activated == 6) cost /= Math.pow(Math.log10(10+player.clicks.prestige), Math.log10(10+player.clicks.prestige*player.clicks.prestige))
                    return cost 
                },
                unl_super() {return player.coin.superUpgrades.includes(this.super_id)}, //unlocks 2 ach rewards
                cost_super() { return 250000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1.5
                    return eff
                },
                effect_super(x = this.unl_super() && this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 
                    return eff
                },
            },
        }
    },
    prestige: {
        buyables: {
            canAfford(x) {
                return player.prestige.currency >= this[x].cost()
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.prestige.currency -= this[x].cost()
                    player.prestige.upgrades[x]++
                }
            },
            buyMax() {
                for (let x = 1; x <= 2; x++) {
                    this.max(x)
                }
            },
            max(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                    player.prestige.currency -= totalCost(bulk, this[x].cost(), this[x].power)
                    player.prestige.upgrades[x] += bulk
                }
            },
            disable(x) {
                this.canAfford(x) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 2; x++) {
                    this.disable(x)
                }
            },
            1: {
                id: 1, 
                power: 10,
                basePrice: 10,
                element: document.getElementById('pBuyableU1'),
                cost(x=player.prestige.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.prestige.upgrades[this.id]) {
                    let eff = Math.pow(2, x)
                    return eff
                },
                bulk(x=player.prestige.currency, y=player.prestige.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    return bulk
                }
            },
            2: {
                id: 2, 
                power: 300,
                basePrice: 20,
                element: document.getElementById('pBuyableU2'),
                cost(x=player.prestige.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.prestige.upgrades[this.id]) {
                    let eff = Math.pow(3, x)
                    return eff
                },
                bulk(x=player.prestige.currency, y=player.prestige.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power)
                    return bulk
                }
            },
        },
        singles: {
            canAfford(x) {
                return player.prestige.currency >= this[x].cost() && !player.prestige.singleUpgrades.includes(x) && (player.prestige.singleUpgrades.includes(x-1) || x % 10 == 1)
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.prestige.currency -= this[x].cost()
                    player.prestige.singleUpgrades.push(x)
                }
            },
            disable(x) {
                this.canAfford(x) || player.prestige.singleUpgrades.includes(x) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 4; x++)
                    for (let y = 1; y <= 4; y++) {
                        this.disable(x*10+y)
                    }
            },
            checkPurchased() {
                for (let x = 1; x <= 4; x++)
                    for (let y = 1; y <= 4; y++) {
                    const id = x*10+y
                        if (this[id].unl()) this[id].element.classList.add('purchased')
                        else this[id].element.classList.remove('purchased')
                    }
            },
            11: { //they're going by column
                id: 11, 
                element: document.getElementById('pSingleU1'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 1 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            12: {
                id: 12, 
                element: document.getElementById('pSingleU2'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 2 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.pow(Math.log10(player.time.game.total.timer+10), 0.01)
                    return eff
                },
            },
            13: {
                id: 13, 
                element: document.getElementById('pSingleU3'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 2 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1.5
                    return eff
                },
            },
            14: {
                id: 14, 
                element: document.getElementById('pSingleU4'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 3 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            21: {
                id: 21, 
                element: document.getElementById('pSingleU5'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 1 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            22: {
                id: 22, 
                element: document.getElementById('pSingleU6'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 2 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            23: {
                id: 23, 
                element: document.getElementById('pSingleU7'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 3 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            24: {
                id: 24, 
                element: document.getElementById('pSingleU8'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 5 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            31: {
                id: 31, 
                element: document.getElementById('pSingleU9'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 1 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = !ACHS.has(27) ? Math.max(2*(1-(0.01/6)*player.time.game.prestige.timer), 1) : Math.max(10*(1-(0.01/6.6666666667)*player.time.game.prestige.timer), 1)
                    return eff
                },
            },
            32: {
                id: 32, 
                element: document.getElementById('pSingleU10'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 2 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = Math.log10(player.time.game.prestige.timer+10)
                    return eff
                }
            },
            33: {
                id: 33, 
                element: document.getElementById('pSingleU11'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 3 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            34: {
                id: 34, 
                element: document.getElementById('pSingleU12'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 5 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            41: {
                id: 41,
                element: document.getElementById('pSingleU13'), 
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 10 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            42: {
                id: 42, 
                element: document.getElementById('pSingleU14'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 100 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            43: {
                id: 43, 
                element: document.getElementById('pSingleU15'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 1000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
            44: {
                id: 44, 
                element: document.getElementById('pSingleU16'),
                unl() {return player.prestige.singleUpgrades.includes(this.id)},
                cost(){ return 10000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1
                    return eff
                },
            },
        }
    },
    shard: {
        buyables: {
            canAfford(x) {
                return player.shard.currency >= this[x].cost()
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.shard.currency -= this[x].cost()
                    player.shard.upgrades[x]++
                }
            },
            disable(x) {
                this.canAfford(x) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 3; x++) {
                    this.disable(x)
                }
            },
            1: {
                id: 1, 
                power: 3.5,
                basePrice: 1000,
                element: document.getElementById('shBuyableU1'),
                cost(x=player.shard.upgrades[this.id]) {
                let cost = this.basePrice*Math.pow(this.power, x)
                if (player.shard.singleUpgrades.includes(12)) cost /= UPGS.shard.singles[12].effect()
                return 
                },
                effect(x=player.shard.upgrades[this.id]) {
                    let eff = Math.pow(2, x)
                    return eff
                },
            },
            2: {
                id: 2, 
                power: 4.15,
                basePrice: 1000,
                element: document.getElementById('shBuyableU2'),
                cost(x=player.shard.upgrades[this.id]) {
                let cost = this.basePrice*Math.pow(this.power, x)
                if (player.shard.singleUpgrades.includes(12)) cost /= UPGS.shard.singles[12].effect()
                return 
                },
                effect(x=player.shard.upgrades[this.id]) {
                    let eff = Math.pow(3, x)
                    return eff
                },
            },
            3: {
                id: 3, 
                power: 10,
                basePrice: 5000,
                element: document.getElementById('shBuyableU3'),
                cost(x=player.shard.upgrades[this.id]) {
                let cost = this.basePrice*Math.pow(this.power, x)
                if (player.shard.singleUpgrades.includes(12)) cost /= UPGS.shard.singles[12].effect()
                return 
                },
                effect(x=player.shard.upgrades[this.id]) {
                    let min, max
                    min = Math.pow(2, x)
                    max = Math.pow(1.75, x)
                    return {
                        min,
                        max
                    }
                },
            },
        },
        singles: {
            canAfford(x) {
                return player.shard.currency >= this[x].cost() && !player.shard.singleUpgrades.includes(x)
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.shard.currency -= this[x].cost()
                    player.shard.singleUpgrades.push(x)
                }
            },
            disable(x) {
                this.canAfford(x) || player.shard.singleUpgrades.includes(x) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 2; x++)
                    for (let y = 1; y <= 3; y++) {
                        this.disable(x*10+y)
                    }
            },
            checkPurchased() {
                for (let x = 1; x <= 2; x++)
                    for (let y = 1; y <= 3; y++) {
                    const id = x*10+y
                        if (this[id].unl()) this[id].element.classList.add('purchased')
                        else this[id].element.classList.remove('purchased')
                    }
            },
            11: {
                id: 11, 
                element: document.getElementById('shSingleU1'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 100000 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 + Math.log10(player.shard.currency+10)/1.2
                    return eff
                },
            },
            12: {
                id: 12, 
                element: document.getElementById('shSingleU2'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 1e6 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 + Math.pow(player.prestige.broken_currency, 0.175)
                    return eff
                },
            },
            13: {
                id: 13, 
                element: document.getElementById('shSingleU3'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 1e8 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 + Math.pow(player.prestige.currency, 0.3)
                    return eff
                },
            },
            21: {
                id: 21, 
                element: document.getElementById('shSingleU4'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 1e12 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 + (Math.log10(Math.log10(player.shard.currency+10)+10)/9)
                    return eff
                },
            },
            22: {
                id: 22, 
                element: document.getElementById('shSingleU5'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 1e100 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 
                    return eff
                },
            },
            23: {
                id: 23, 
                element: document.getElementById('shSingleU6'),
                unl() {return player.shard.singleUpgrades.includes(this.id)},
                cost(){ return 1e308 },
                effect(x = this.unl()) {
                    if (x == 0) return 1
                    let eff = 1 
                    return eff
                },
            },
        }
    },
    shop: {
        buyables: {
            canAfford(x) {
                return player.shop.upgrades[x] == this[x].maxAmount ? false : player.supercoin.currency >= this[x].cost()
            },
            buy(x) {
                if (this.canAfford(x)) {
                    let func = this[x].cost()
                    player.supercoin.currency -= func
                    player.supercoin.spent_currency += func
                    player.shop.upgrades[x]++
                }
            },
            max(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                    let func = totalCost(bulk, this[x].cost(), this[x].power)
                        player.supercoin.currency -= func
                        player.supercoin.spent_currency += func
                        player.shop.upgrades[x] += bulk
                }
            },
            bulk_cost(x) {
                if (this.canAfford(x)) {
                    let bulk = this[x].bulk()
                    return totalCost(bulk, this[x].cost(), this[x].power)
                }
                else return this[x].cost()
            },
            reset(x) {
                if (player.shop.upgrades[x] >= 1) {
                    player.shop.upgrades[x] = 0
                }
            },
            respec() {
                    for (let x = 1; x <= 5; x++) {
                        this.reset(x)
                    }
                    player.supercoin.currency += player.supercoin.spent_currency
                    player.spentSuperCoins = 0
            },
            disable(x) {
                this.canAfford(x) || player.shop.upgrades[x] == this[x].maxAmount ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 5; x++) {
                    this.disable(x)
                }
            },
            1: {
                id: 1, 
                power: 1.05,
                basePrice: 1.3,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU1'),
                cost(x=player.shop.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.upgrades[this.id]) {
                    let eff = 1+x/50
                    return eff
                },
                bulk(x=player.supercoin.currency, y=player.shop.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power) //10
                    let bulkBuyAmount = parseInt(shopBulkBuyInput.value), maxBulk = this.maxAmount-y, finalBulk = 0; //20, 100-70, 0
                    isNaN(bulkBuyAmount) ? bulkBuyAmount = 1 : bulkBuyAmount
                    bulkBuyAmount < maxBulk ? finalBulk = bulkBuyAmount : finalBulk = maxBulk //20 < 30 ? z = 20 (true) : z = 10 (false), it's false so z = 10
                    if (finalBulk < bulk) bulk = finalBulk //20 < 10
                    return bulk
                }
            },
            2: {
                id: 2, 
                power: 1.05,
                basePrice: 1.3,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU2'),
                cost(x=player.shop.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.upgrades[this.id]) {
                    let eff = 1+x/50
                    return eff
                },
                bulk(x=player.supercoin.currency, y=player.shop.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power) //10
                    let bulkBuyAmount = parseInt(shopBulkBuyInput.value), maxBulk = this.maxAmount-y, finalBulk = 0; //20, 100-70, 0
                    isNaN(bulkBuyAmount) ? bulkBuyAmount = 1 : bulkBuyAmount
                    bulkBuyAmount < maxBulk ? finalBulk = bulkBuyAmount : finalBulk = maxBulk //20 < 30 ? z = 20 (true) : z = 10 (false), it's false so z = 10
                    if (finalBulk < bulk) bulk = finalBulk //20 < 10
                    return bulk
                }
            },
            3: {
                id: 3, 
                power: 1.06,
                basePrice: 1.4,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU3'),
                cost(x=player.shop.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.upgrades[this.id]) {
                    let eff = 1+x/66.666666
                    return eff
                },
                bulk(x=player.supercoin.currency, y=player.shop.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power) //10
                    let bulkBuyAmount = parseInt(shopBulkBuyInput.value), maxBulk = this.maxAmount-y, finalBulk = 0; //20, 100-70, 0
                    isNaN(bulkBuyAmount) ? bulkBuyAmount = 1 : bulkBuyAmount
                    bulkBuyAmount < maxBulk ? finalBulk = bulkBuyAmount : finalBulk = maxBulk //20 < 30 ? z = 20 (true) : z = 10 (false), it's false so z = 10
                    if (finalBulk < bulk) bulk = finalBulk //20 < 10
                    return bulk
                }
            },
            4: {
                id: 4, 
                power: 1.065,
                basePrice: 1.5,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU4'),
                cost(x=player.shop.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.upgrades[this.id]) {
                    let eff = 1+x/100
                    return eff
                },
                bulk(x=player.supercoin.currency, y=player.shop.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power) //10
                    let bulkBuyAmount = parseInt(shopBulkBuyInput.value), maxBulk = this.maxAmount-y, finalBulk = 0; //20, 100-70, 0
                    isNaN(bulkBuyAmount) ? bulkBuyAmount = 1 : bulkBuyAmount
                    bulkBuyAmount < maxBulk ? finalBulk = bulkBuyAmount : finalBulk = maxBulk //20 < 30 ? z = 20 (true) : z = 10 (false), it's false so z = 10
                    if (finalBulk < bulk) bulk = finalBulk //20 < 10
                    return bulk
                }
            },
            5: {
                id: 5, 
                power: 1.075,
                basePrice: 5,
                maxAmount: 50,
                element: document.getElementById('shopBuyableU5'),
                cost(x=player.shop.upgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.upgrades[this.id]) {
                    let eff = 1+x/2.5
                    return eff
                },
                bulk(x=player.supercoin.currency, y=player.shop.upgrades[this.id]){
                    let bulk = upgradesPurchasableCustom(y, x, this.cost(), this.power) //10
                    let bulkBuyAmount = parseInt(shopBulkBuyInput.value), maxBulk = this.maxAmount-y, finalBulk = 0; //20, 100-70, 0
                    isNaN(bulkBuyAmount) ? bulkBuyAmount = 1 : bulkBuyAmount
                    bulkBuyAmount < maxBulk ? finalBulk = bulkBuyAmount : finalBulk = maxBulk //20 < 30 ? z = 20 (true) : z = 10 (false), it's false so z = 10
                    if (finalBulk < bulk) bulk = finalBulk //20 < 10
                    return bulk
                }
            },
        },
        unlockables: {
            canAfford(x) {
                return player.supercoin.currency >= this[x].cost() && !player.shop.unlockables.includes(x)
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.supercoin.currency -= this[x].cost()
                    player.shop.unlockables.push(x)
                }
            },
            disable(x) {
                this.canAfford(x) || player.shop.unlockables.includes(x) ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 3; x++) {
                    this.disable(x)
                }
            },
            1: { //overdrive type 1
                id: 1, 
                element: document.getElementById('shopSingleU1'),
                unl() { return player.shop.unlockables.includes(this.id) },
                cost() { return 250 },
            },
            2: { //overdrive type 2
                id: 2, 
                element: document.getElementById('shopSingleU2'),
                unl() { return player.shop.unlockables.includes(this.id) },
                cost() { return 2500 },
            },
            3: { //super-moderniz
                id: 3, 
                element: document.getElementById('shopSingleU3'),
                unl() { return player.shop.unlockables.includes(this.id) },
                cost() { return 3500 },
            },
        },
        permanent: {
            canAfford(x) {
                return player.shop.permanentUpgrades[x] == this[x].maxAmount ? false : player.supercoin.currency >= this[x].cost()
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.supercoin.currency -= this[x].cost()
                    player.shop.permanentUpgrades[x]++
                }
            },
            disable(x) {
                this.canAfford(x) || player.shop.permanentUpgrades[x] == this[x].maxAmount ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 4; x++) {
                    this.disable(x)
                }
            },
            1: { //crystal boost
                id: 1, 
                power: 1.4,
                basePrice: 10,
                maxAmount: 25,
                element: document.getElementById('shopBuyableU6'),
                cost(x=player.shop.permanentUpgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.permanentUpgrades[this.id]) {
                    let eff = 1+x/25
                    return eff
                },
            }, 
            2: { //credit card
                id: 2, 
                power: 4,
                basePrice: 100,
                maxAmount: 5,
                element: document.getElementById('shopBuyableU7'),
                cost(x=player.shop.permanentUpgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.permanentUpgrades[this.id]) {
                    let eff = 1+x/5
                    return eff
                },
            }, 
            3: { //crit chance
                id: 3, 
                power: 1.105,
                basePrice: 10,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU8'),
                cost(x=player.shop.permanentUpgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.permanentUpgrades[this.id]) {
                    let eff = x/50
                    return eff
                },
            }, 
            4: { //crit multi
                id: 4, 
                power: 1.115,
                basePrice: 5,
                maxAmount: 100,
                element: document.getElementById('shopBuyableU9'),
                cost(x=player.shop.permanentUpgrades[this.id]) {
                return this.basePrice*Math.pow(this.power, x)
                },
                effect(x=player.shop.permanentUpgrades[this.id]) {
                    let eff = 1+x/10
                    return eff
                },
            }, 

        },
        items: {
            canAfford(x) {
                return player.shop.items.amount[x] == this[x].maxAmount ? false : player.supercoin.currency >= this[x].cost()
            },
            buy(x) {
                if (this.canAfford(x)) {
                    player.supercoin.currency -= this[x].cost()
                    player.shop.items.amount[x]++
                }
            },
            disable(x) {
                this.canAfford(x) || player.shop.items.amount[x] == this[x].maxAmount ? this[x].element.disabled = false : this[x].element.disabled = true
            },
            checkDisable() {
                for (let x = 1; x <= 4; x++) {
                    this.disable(x)
                }
            },
            1: { //free umulti
                id: 1, 
                maxAmount: 5,
                element: document.getElementById('shopItem1'),
                cost() { return 100 },
                canUseItem(x=player.shop.items.amount[this.id], y=player.shop.items.used[this.id]) {
                    if (x == 0 || y == this.maxAmount || player.challenge.activated != 0) return false
                    else return true
                },
                useItem() {
                    if (this.canUseItem()) {
                        player.shop.items.amount[this.id]--
                        player.shop.items.used[this.id]++
                        this.effect()
                        notify(text.notification.used_item + text.itemNames[this.id-1], "limegreen", "550px")
                    }
                    else if (player.shop.items.used[this.id] == this.maxAmount) {
                        notify(text.notification.limit_item + this.maxAmount + " " + text.itemNames[this.id-1] + text.notification.limit_item_2, "red", "550px")
                    }
                    else notify(text.notification.dont_have_item + text.itemNames[this.id-1] + "!", "red", "550px")
                },
                effect() {
                    player.umultipliers++
                }
            }, 
            2: { //free upower
                id: 2, 
                maxAmount: 3,
                element: document.getElementById('shopItem2'),
                cost() { return 300 },
                canUseItem(x=player.shop.items.amount[this.id], y=player.shop.items.used[this.id]) {
                    if (x == 0 || y == this.maxAmount || player.challenge.activated != 0) return false
                    else return true
                },
                useItem() {
                    if (this.canUseItem()) {
                        player.shop.items.amount[this.id]--
                        player.shop.items.used[this.id]++
                        this.effect()
                        notify(text.notification.used_item + text.itemNames[this.id-1], "limegreen", "550px")
                    }
                    else if (player.shop.items.used[this.id] == this.maxAmount) {
                        notify(text.notification.limit_item + this.maxAmount + " " + text.itemNames[this.id-1] + text.notification.limit_item_2, "red", "550px")
                    }
                    else notify(text.notification.dont_have_item + text.itemNames[this.id-1] + "!", "red", "550px")
                },
                effect() {
                    player.upowers++
                }
            }, 
            3: { //free umulti
                id: 3, 
                maxAmount: 10,
                element: document.getElementById('shopItem3'),
                cost() { return 50 },
                canUseItem(x=player.shop.items.amount[this.id], y=player.shop.items.used[this.id]) {
                    if (x == 0 || y == this.maxAmount || player.challenge.activated != 0) return false
                    else return true
                },
                useItem() {
                    if (this.canUseItem()) {
                        player.shop.items.amount[this.id]--
                        player.shop.items.used[this.id]++
                        this.effect()
                        notify(text.notification.used_item + text.itemNames[this.id-1], "limegreen", "550px")
                    }
                    else if (player.shop.items.used[this.id] == this.maxAmount) {
                        notify(text.notification.limit_item + this.maxAmount + " " + text.itemNames[this.id-1] + text.notification.limit_item_2, "red", "550px")
                    }
                    else notify(text.notification.dont_have_item + text.itemNames[this.id-1] + "!", "red", "550px")
                },
                effect() {
                    GAIN.offline_gain_time_warp(60)
                }
            }, 
            4: { //free umulti
                id: 4, 
                maxAmount: 3,
                element: document.getElementById('shopItem4'),
                cost() { return 450 },
                canUseItem(x=player.shop.items.amount[this.id], y=player.shop.items.used[this.id]) {
                    if (x == 0 || y == this.maxAmount || player.challenge.activated != 0) return false
                    else return true
                },
                useItem() {
                    if (this.canUseItem()) {
                        player.shop.items.amount[this.id]--
                        player.shop.items.used[this.id]++
                        this.effect()
                        notify(text.notification.used_item + text.itemNames[this.id-1], "limegreen", "550px")
                    }
                    else if (player.shop.items.used[this.id] == this.maxAmount) {
                        notify(text.notification.limit_item + this.maxAmount + " " + text.itemNames[this.id-1] + text.notification.limit_item_2, "red", "550px")
                    }
                    else notify(text.notification.dont_have_item + text.itemNames[this.id-1] + "!", "red", "550px")
                },
                effect() {
                    GAIN.offline_gain_time_warp(600)
                }
            }, 
        }
    },
    supercrystal: {
        canAfford(x) {
            return player.supercrystal.currency >= this[x].cost() && !player.supercrystal.upgrades.includes(x)
        },
        buy(x) {
            if (this.canAfford(x)) {
                player.supercrystal.currency -= this[x].cost()
                player.supercrystal.upgrades.push(x)
            }
        },
        disable(x) {
            this.canAfford(x) || player.supercrystal.upgrades.includes(x) ? this[x].element.disabled = false : this[x].element.disabled = true
        },
        checkDisable() {
            for (let x = 1; x <= 3; x++)
                for (let y = 1; y <= 3; y++) {
                    this.disable(x*10+y)
                }
        },
        checkPurchased() {
            for (let x = 1; x <= 3; x++) {
                for (let y = 1; y <= 3; y++) {
                    const id = x*10+y
                        if (this[id].unl()) this[id].element.classList.add('purchased')
                        else this[id].element.classList.remove('purchased')
                    }
            }
        },
        11: { //they're going by column
            id: 11, 
            element: document.getElementById('sCSingleU1'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 2
                return eff
            }
        },
        12: { //they're going by column
            id: 12, 
            element: document.getElementById('sCSingleU2'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 3
                return eff
            }
        },
        13: { //they're going by column
            id: 13, 
            element: document.getElementById('sCSingleU3'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 2
                return eff
            }
        },
        21: { //they're going by column
            id: 21, 
            element: document.getElementById('sCSingleU4'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 2
                return eff
            }
        },
        22: { //they're going by column
            id: 22, 
            element: document.getElementById('sCSingleU5'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 5
                return eff
            }
        },
        23: { //they're going by column
            id: 23, 
            element: document.getElementById('sCSingleU6'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 1e3
                return eff
            }
        },
        31: { //they're going by column
            id: 31, 
            element: document.getElementById('sCSingleU7'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 5
                return eff
            }
        },
        32: { //they're going by column
            id: 32, 
            element: document.getElementById('sCSingleU8'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x = this.unl()) {
                if (x == 0) return 1
                let eff = 1
                return eff
            }
        },
        33: { //they're going by column
            id: 33, 
            element: document.getElementById('sCSingleU9'),
            unl() {return player.supercrystal.upgrades.includes(this.id)},
            cost(){ return 1 },
            effect(x=player.supercrystal.total_currency) {
                let eff = Math.pow(10, x)
                return eff
            }
        },
    },
    minerals: {
        canAfford(x) {
            return player.rune.currency >= this[x].cost1() && player.shard.currency >= this[x].cost2()
        },
        buy(x) {
            if (this.canAfford(x)) {
                player.rune.currency -= this[x].cost1()
                player.shard.currency -= this[x].cost2()
                player.minerals[x]++
            }
        },
        reset(x) {
            if (player.minerals[x] >= 1) {
                player.minerals[x] = 0
            }
        },
        respec() {
            player.rune.total_currency = 0
            for (x = 1; x <= 3; x++){
                this.reset(x)
            }
        },
        disable(x) {
            this.canAfford(x) ? this[x].element.disabled = false : this[x].element.disabled = true
        },
        checkDisable() {
                for (let x = 1; x <= 3; x++) {
                    this.disable(x)
                }
        },
        1: {
            id: 1, 
            element: document.getElementById('mineral1'),
            cost1() { return 1 },
            cost2(x=player.minerals[this.id]) {
                return 1e18*Math.pow(100, x)
                },
            effect1(x=player.minerals[this.id]) {
                let eff = 1 + x/12.5 
                return eff
            },
            effect2(x=player.minerals[this.id]) {
                let eff = 1 + x/2
                return eff
            },
            effect3(x=player.minerals[this.id]) {
                let eff = 1 + x/15
                return eff
            },
        },
        2: {
            id: 2,  
            element: document.getElementById('mineral2'),
            cost1() { return 1 },
            cost2(x=player.minerals[this.id]) {
                return 1e18*Math.pow(100, x)
                },
            effect1(x=player.minerals[this.id]) {
                let eff = 1 + Math.pow(x*9, 3)
                return eff
            },
            effect2(x=player.minerals[this.id]) {
                let eff = Math.pow(43, x/1.5) 
                return eff
            },
            effect3(x=player.minerals[this.id]) {
                let eff = Math.pow(x*13, 2)
                return eff
            },
        },
        3: {
            id: 3,  
            element: document.getElementById('mineral3'),
            cost1() { return 1 },
            cost2(x=player.minerals[this.id]) {
                return 1e18*Math.pow(100, x)
                },
            effect1(x=player.minerals[this.id]) {
                let eff = Math.pow(1.75, x/1.105)
                return eff
            },
            effect2(x=player.minerals[this.id]) {
                let eff = Math.pow(3, x/1.4)
                return eff
            },
            effect3(x=player.minerals[this.id]) {
                let eff = Math.pow(2, x/2.1)
                return eff
            },
        },
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

buyableU1.addEventListener("click", function(){ //HTML
    buyUpgrade(1);
})
buyableU2.addEventListener("click", function(){
    buyUpgrade(2);
})
buyableU3.addEventListener("click", function(){
    buyUpgrade(3);
})
buyableU4.addEventListener("click", function(){
    buyUpgrade(4);
})
buyableU5.addEventListener("click", function(){
    buyUpgrade(5);
})

singleU1.addEventListener("click", function(){
    buySingleUpgrade(11)
})
singleU2.addEventListener("click", function(){
    buySingleUpgrade(12)
})
singleU3.addEventListener("click", function(){
    buySingleUpgrade(13)
})
singleU4.addEventListener("click", function(){
    buySingleUpgrade(14)
})
singleU5.addEventListener("click", function(){
    buySingleUpgrade(15)
})

singleU6.addEventListener("click", function(){
    buySingleUpgrade(21)
})
singleU7.addEventListener("click", function(){
    buySingleUpgrade(22)
})
singleU8.addEventListener("click", function(){
    buySingleUpgrade(23)
})
singleU9.addEventListener("click", function(){
    buySingleUpgrade(24)
})
singleU10.addEventListener("click", function(){
    buySingleUpgrade(25)
})

shopBuyableU1.addEventListener("click", function(){ //HTML
    buyShopUpgrade(1);
})
shopBuyableU2.addEventListener("click", function(){
    buyShopUpgrade(2);
})
shopBuyableU3.addEventListener("click", function(){
    buyShopUpgrade(3);
})
shopBuyableU4.addEventListener("click", function(){
    buyShopUpgrade(4);
})
shopBuyableU5.addEventListener("click", function(){
    buyShopUpgrade(5);
})

function maxOrNo() {
    player.settings.buy_max_activate ? player.settings.buy_max_activate = false : player.settings.buy_max_activate = true
}

const AUTO = {
    single: {
        charge() {
            if (!MISC.automation.single.charged) {
                if (Date.now()+0 >= this.time) MISC.automation.single.charged = true
            }
            if (MISC.automation.single.charged) this.activate() 
        },
        activate() {
            for (let i = 1; i <= 2; i++) {
                for (let j = 1; j <= 5; j++) {
                    let temp = player.coin.singleUpgrades.includes(i*10+j) //false
                    UPGS.coin.singles.buy(i*10+j) //false -> true
                    let temp2 = player.coin.singleUpgrades.includes(i*10+j) //true
                    if (temp2 != temp) { //bought 
                        MISC.automation.single.charged = false
                        this.time = MISC.automation.single.activateTime()
                        return 1 //false != true - > true -> break
                    }
                }
            }
        },
        time: 0
    },
    buyable: {
        charge() {
            if (!MISC.automation.buyable.charged) {
                if (Date.now()+0 >= this.time) MISC.automation.buyable.charged = true
            }
            if (MISC.automation.buyable.charged) this.activate() 
        },
        activate() {
            if (MISC.automation.buyable.time() != 50) UPGS.coin.buyables.buy_auto()
            else {
            UPGS.coin.buyables.buyMax_auto()
            }
            MISC.automation.buyable.charged = false
            this.time = MISC.automation.buyable.activateTime()
        },
        time: 0
    },
    umultiplier: {
        charge() {
            if (!MISC.automation.umultiplier.charged) {
                if (Date.now()+0 >= this.time) MISC.automation.umultiplier.charged = true
            }
            if (MISC.automation.umultiplier.charged) this.activate() 
        },
        activate() {
            if (MISC.automation.umultiplier.time() != 50) LAYERS.umultiplier.doReset() 
            else {
                if (player.time.umultiplier >= player.automation.conditions.umultiplier) {
                    LAYERS.umultiplier.doReset()
                }
            }
        },
        time: 0
    },
    upower: {
        charge() {
            if (!MISC.automation.upower.charged) {
                if (Date.now()+0 >= this.time) MISC.automation.upower.charged = true
            }
            if (MISC.automation.upower.charged) this.activate() 
        },
        activate() {
            if (MISC.automation.upower.time() != 50) LAYERS.upower.doReset() 
            else {
                if (player.time.upower >= player.automation.conditions.upower.time && player.umultipliers >= player.automation.conditions.upower.x_of_umulti) {
                    LAYERS.upower.doReset()
                }
            }
        },
        time: 0
    },
    prestige: {
        charge() {
            if (!MISC.automation.prestige.charged) {
                if (Date.now()+0 >= this.time) MISC.automation.prestige.charged = true
            }
            if (MISC.automation.prestige.charged) this.activate() 
        },
        activate() {
            if (MISC.automation.prestige.time() != 50 || !MILESTONES.has(14)) LAYERS.prestige.doReset() 
            else {
        if (player.settings.whichPrestigeMode == 'time') {
                if (player.time.real.prestige.timer >= player.automation.conditions.prestige.time) {
                    LAYERS.prestige.doReset() 
                }
            }
            else {
                if (player.coin.currency >= player.automation.conditions.prestige.coins) {
                    LAYERS.prestige.doReset() 
                }
            }
            }
        },
        time: 0
    }
}
// MISC.automation.single.cost()
function decreaseInterval(type) {
    if (player.prestige.currency >= MISC.automation[type].cost() && MISC.automation[type].time() !== 50) {
        player.prestige.currency -= MISC.automation[type].cost()
        player.automation.upgrades[type]++
        if (type == 'single') {
            if (MISC.automation.single.interval != '') {
                clearInterval(MISC.automation.single.interval)
                MISC.automation.single.interval = setInterval(AUTO.single.charge(), 50); 
            }
        }
        if (type == 'buyable') {
            if (MISC.automation.buyable.interval != '') {
                clearInterval(MISC.automation.buyable.interval)
                MISC.automation.buyable.interval = setInterval(AUTO.buyable.charge(), 50); 
            }
        }       
        if (type == 'umultiplier') {
            if (MISC.automation.umultiplier.interval != '') {
                clearInterval(MISC.automation.umultiplier.interval)
                MISC.automation.umultiplier.interval = setInterval(AUTO.umultiplier.charge(), 50); 
            }
        }        
        if (type == 'upower') {
            if (MISC.automation.upower.interval != '') {
                clearInterval(MISC.automation.upower.interval)
                MISC.automation.upower.interval = setInterval(AUTO.upower.charge(), 50); 
            }
        }        
        if (type == 'prestige') {
            if (MISC.automation.prestige.interval != '') {
                clearInterval(MISC.automation.prestige.interval)
                MISC.automation.prestige.interval = setInterval(AUTO.prestige.charge(), 50); 
            }
        }
    }
}
function increaseBulkBuy(type) {
    if (player.prestige.currency >= MISC.automation[type].cost() && MISC.automation[type].bulk() <= 512) {
        player.prestige.currency -= MISC.automation[type].cost()
        player.automation.upgrades[type]++
    }
}

    autoSingleUpgradeCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            MISC.automation.single.interval = setInterval(()=>{AUTO.single.charge()}, 50); 
            player.automation.checkbox.single = true
        } 
        else { 
        clearInterval(MISC.automation.single.interval)
        MISC.automation.single.interval = ''
        player.automation.checkbox.single = false
        }});
    autoBuyableUpgradeCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            MISC.automation.buyable.interval = setInterval(()=>{AUTO.buyable.charge()}, 50); 
            player.automation.checkbox.buyable = true
        } 
        else { 
        clearInterval(MISC.automation.buyable.interval)
        MISC.automation.buyable.interval = ''
        player.automation.checkbox.buyable = false
        }});
    autoUmultiplierCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            MISC.automation.umultiplier.interval = setInterval(()=>{AUTO.umultiplier.charge()}, 50);
            player.automation.checkbox.umultiplier = true
        } 
        else { 
        clearInterval(MISC.automation.umultiplier.interval)
        MISC.automation.umultiplier.interval = ''
        player.automation.checkbox.umultiplier = false
        }});
    autoUpowerCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            MISC.automation.upower.interval = setInterval(()=>{AUTO.upower.charge()}, 50); 
            player.automation.checkbox.upower = true
        } 
        else { 
        clearInterval(MISC.automation.upower.interval)
        MISC.automation.upower.interval = ''
        player.automation.checkbox.upower = false
        }});
    autoPrestigeCheckbox.addEventListener('change', function() {
        if (this.checked) { 
            MISC.automation.prestige.interval = setInterval(()=>{AUTO.prestige.charge()}, 50);
            player.automation.checkbox.prestige = true 
        } 
        else { 
        clearInterval(MISC.automation.prestige.interval)
        MISC.automation.prestige.interval = ''
        player.automation.checkbox.prestige = false 
        }});

function changePrestigeMode() {
    if (player.settings.whichPrestigeMode == 'time') {
        autoPrestigeMode.innerHTML = text.automation.coin_req //I18
        player.settings.whichPrestigeMode = 'coins'
        autoPrestigeInput.value = player.automation.conditions.prestige.coins
    }
    else {
        autoPrestigeMode.innerHTML = text.automation.prestige_req //I18
        player.settings.whichPrestigeMode = 'time'
        autoPrestigeInput.value = player.automation.conditions.prestige.time
    }
}

function changeInputValue() {
    if (player.settings.whichPrestigeMode == 'time') autoPrestigeInput.value = player.automation.conditions.prestige.time
    else autoPrestigeInput.value = player.automation.conditions.prestige.coins
}

autoPrestigeInput.addEventListener("blur", ()=>{
        if (player.settings.whichPrestigeMode == 'time' && autoPrestigeInput.value !='') player.automation.conditions.prestige.time = parseFloat(autoPrestigeInput.value)
        else if (player.settings.whichPrestigeMode == 'coins' && autoPrestigeInput.value != '') player.automation.conditions.prestige.coins = parseFloat(autoPrestigeInput.value)
        reautomate()
    });

autoUmultiInput.addEventListener("blur", ()=>{
    player.automation.conditions.umultiplier = parseFloat(autoUmultiInput.value)
    uMultiReautomate()
});

autoUpowerInput.addEventListener("blur", ()=>{
    player.automation.conditions.upower.time = parseFloat(autoUpowerInput.value)
    uPowerReautomate()
});

autoUpowerInput2.addEventListener("blur", ()=>{
    player.automation.conditions.upower.x_of_umulti = parseFloat(autoUpowerInput2.value)
    uPowerReautomate()
});


function reautomate() {
        if (MISC.automation.prestige.interval != ''){
            clearInterval(MISC.automation.prestige.interval);
            MISC.automation.prestige.interval = ''
        }
        if (autoPrestigeCheckbox.checked) {
            MISC.automation.prestige.interval = setInterval(()=>{
                if (player.settings.whichPrestigeMode == 'time') {
                    if (player.time.real.prestige.timer >= player.automation.conditions.prestige.time) {
                        LAYERS.prestige.doReset() 
                    }
                }
                else {
                    if (player.coin.currency >= player.automation.conditions.prestige.coins) {
                        LAYERS.prestige.doReset() 
                    }
                }
            }, 50)
        } else {
        clearInterval(MISC.automation.prestige.interval);
        MISC.automation.prestige.interval = ''
    }
}

function uMultiReautomate() {
    if (MISC.automation.umultiplier.interval != ''){
        clearInterval(MISC.automation.umultiplier.interval);
        MISC.automation.umultiplier.interval = ''
    }
    if (autoUmultiplierCheckbox.checked) {
        MISC.automation.umultiplier.interval = setInterval(()=> {
            if (player.time.umultiplier >= player.automation.conditions.umultiplier) {
                LAYERS.umultiplier.doReset()
            }
        }, 50)
    }
    else {
        clearInterval(MISC.automation.umultiplier.interval);
        MISC.automation.umultiplier.interval = ''
    }
}

function uPowerReautomate() {
    if (MISC.automation.upower.interval){
        clearInterval(MISC.automation.upower.interval);
        MISC.automation.upower.interval = ''
    }
    if (autoUpowerCheckbox.checked) {
        MISC.automation.upower.interval = setInterval(()=> {
            if (player.time.upower >= player.automation.conditions.upower.time && player.umultipliers >= player.automation.conditions.upower.x_of_umulti) {
                LAYERS.upower.doReset()
            }
        }, 50)
    }
    else {
        clearInterval(MISC.automation.upower.interval);
        MISC.automation.upower.interval = ''
    }
    return MISC.automation.upower.interval
}

howMuchCrystalsInput.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
    submitTheBreak()
    }
});


function submitTheBreak() {
    let temp = parseFloat(howMuchCrystalsInput.value)
    if (((howMuchCrystalsInput.value).includes('%') && temp <= 100 || (!(howMuchCrystalsInput.value).includes('%') && temp <= player.prestige.currency)) && !(howMuchCrystalsInput.value).includes('-')) {
        text.broken_crystals = GAIN.shard.break_crystal(howMuchCrystalsInput.value)
        openWindow('submit', true)
        player.shard.currency += text.broken_crystals.gain
        player.prestige.broken_currency += text.broken_crystals.broken_crystals
    }
    else {
        openWindow('falseSubmit', true)
    }
}
