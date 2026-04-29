class UniversalBuyableUpgrade {
    constructor(config, layerName, arrayName = 'upgrades') {
        this.layer = layerName;
        this.arrayName = arrayName; // Теперь поддерживает вложенность типа 'super.buyables'
        this.id = config.id;
        this.power = config.power;
        this.basePrice = config.basePrice;
        this.elementId = config.elementId;
        
        this.customEffect = config.effect ? config.effect.bind(this) : () => 1;
        this.customCostMod = config.customCostMod ? config.customCostMod.bind(this) : () => 1;
        this.customBulk = config.bulk ? config.bulk.bind(this) : null;
        
        this.super_id = config.super_id; 
        this._superCost = config.superCost;
        this.customSuperEffect = config.effect_super ? config.effect_super.bind(this) : null;
        this.customEffect2 = config.effect2 ? config.effect2.bind(this) : null;
        this.customCost = config.cost ? config.cost.bind(this) : null;
    }

    // Возвращаем базовый объект для валюты
    get state() { return player[this.layer]; }
    // Умный поиск массива по имени (даже если там есть точки)
    get targetArray() { 
        let keys = this.arrayName.split('.');
        // Если путь начинается с глобального ключа (например 'fortune...'), ищем от корня player. Иначе - от текущего слоя.
        return player[keys[0]] ? keys.reduce((obj, key) => obj[key], player) : keys.reduce((obj, key) => obj[key], this.state); 
    }
    get element() { return document.getElementById(this.elementId); }

    cost(x = this.targetArray[this.id]) {
        // Условие Испытания 5: цены зависят от суммы всех покупаемых улучшений монет
        if (this.layer === 'coin' && (player.challenge.activated == 5 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7)) {
            if (x === this.targetArray[this.id]) {
                x = player.coin.upgrades[1] + player.coin.upgrades[2] + player.coin.upgrades[3] + player.coin.upgrades[4] + player.coin.upgrades[5];
            }
        }
        
        if (this.customCost) return this.customCost(x); // Если есть кастомная цена - используем её!
        let cost = this.basePrice * Math.pow(this.power, x);
        cost *= this.customCostMod(cost, x); 
        return cost;
    }

    effect(...args) { return this.customEffect(...args); }
    effect2(...args) { return this.customEffect2 ? this.customEffect2(...args) : null; }

    bulk(x = this.state.currency, y = this.targetArray[this.id]) {
        // Условие Испытания 5 для синхронизации оптовой покупки
        if (this.layer === 'coin' && (player.challenge.activated == 5 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7)) {
            if (y === this.targetArray[this.id]) {
                y = player.coin.upgrades[1] + player.coin.upgrades[2] + player.coin.upgrades[3] + player.coin.upgrades[4] + player.coin.upgrades[5];
            }
        }

        // Сколько мы физически можем позволить себе купить по деньгам
        let affordable = upgradesPurchasableCustom(y, x, this.cost(), this.power);

        // === ЖЕСТКИЙ ЛИМИТ ДЛЯ ИСПЫТАНИЯ 10 ===
        // Если мы в нужном испытании и покупаем улучшения монет:
        if (this.layer === 'coin' && (player.challenge.activated == 10 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7)) {
            // Вычисляем, сколько улучшений нам еще можно купить до лимита в 25
            let upgradesLeft = 25 - MISC.amount_of_upgrades.coin();
            
            if (upgradesLeft <= 0) return 0; // Если лимит исчерпан, запрещаем опт
            
            // Берем самое маленькое: либо на сколько хватит денег, либо сколько осталось до лимита
            affordable = Math.min(affordable, upgradesLeft);
        }

        // Если у улучшения прописана своя логика опта (как у Осколков и Суперпрестижа)
        if (this.customBulk) {
            let custom = this.customBulk(x, y);
            return Math.max(Math.min(custom, affordable), 0);
        }

        // Проверяем, включена ли кнопка "Купить всё" для конкретной вкладки
        let isMaxActive = true;
        if (this.layer === 'coin') isMaxActive = player.settings.buy_max_activate;
        if (this.layer === 'prestige') isMaxActive = player.settings.breakprestige_buy_max_activate;
        if (this.layer === 'shard') isMaxActive = player.settings.shard_buy_max_activate;

        // Если кнопка выключена, мы хотим купить только 1 штуку (если хватает денег)
        if (!isMaxActive) {
            return affordable >= 1 ? 1 : 0;
        }

        return Math.max(affordable, 0);
    }

    unl_super() { return this.state.superUpgrades && this.state.superUpgrades.includes(this.super_id); }
    cost_super() { return this._superCost; }
    effect_super(x = this.unl_super(), y = this.targetArray[this.id]) { 
        if (!this.customSuperEffect) return 1; 
        return this.customSuperEffect(x, y); 
    }
}

class UniversalBuyablesManager {
    constructor(layerName, upgradesArray, arrayName = 'upgrades') {
        this.layer = layerName;
        this.arrayName = arrayName;
        this._max = upgradesArray.length;
        this._keys = [];

        upgradesArray.forEach(upg => {
            this[upg.id] = new UniversalBuyableUpgrade(upg, layerName, arrayName);
            this._keys.push(upg.id);
        });
    }

    get state() { return player[this.layer]; }
    get targetArray() { 
        let keys = this.arrayName.split('.');
        // Если путь начинается с глобального ключа (например 'fortune...'), ищем от корня player. Иначе - от текущего слоя.
        return player[keys[0]] ? keys.reduce((obj, key) => obj[key], player) : keys.reduce((obj, key) => obj[key], this.state); 
    }
    _forEachBuyable(fn) { this._keys.forEach(x => fn(x)); }

    canAfford(x) {
        let canAffordBase = this.state.currency >= this[x].cost();
        if (this.layer === 'coin') {
            if (player.challenge.activated == 1 || player.challenge.activated == 11 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) return false;
            if ((player.challenge.activated == 10 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) && MISC.amount_of_upgrades.coin() >= 25) return false;
        }
        return canAffordBase;
    }

    canAfford_super(x) { return player.supercoin.currency >= this[x].cost_super() && (!this.state.superUpgrades || !this.state.superUpgrades.includes(this[x].super_id)); }

    buy(x) {
        if (this.canAfford(x)) {
            this.state.currency -= this[x].cost();
            this.targetArray[x]++;
        }
    }

    buy_super(x) {
        if (this.canAfford_super(x)) {
            player.supercoin.currency -= this[x].cost_super();
            if (!this.state.superUpgrades.includes(this[x].super_id)) {
                this.state.superUpgrades.push(this[x].super_id);
            }
        }
    }

    max(x) {
        if (this.canAfford(x)) {
            let bulk = this[x].bulk();
            this.state.currency -= totalCost(bulk, this[x].cost(), this[x].power);
            this.targetArray[x] += bulk;
        }
    }

    // СТАЛО: Покупаем с конца (от дорогих к дешевым)
    buy_auto() { [...this._keys].reverse().forEach(x => this.buy(x)); }
    buyMax() { [...this._keys].reverse().forEach(x => this.max(x)); }
    buyMax_auto() { [...this._keys].reverse().forEach(x => this.max_auto(x)); }

    max_auto(x) {
        if (this.canAfford(x)) {
            let bulk = Math.min(this[x].bulk(), MISC.automation.buyable.bulk());
            this.state.currency -= totalCost(bulk, this[x].cost(), this[x].power);
            this.targetArray[x] += bulk;
        }
    }

    bulk_cost(x) {
        if (this.canAfford(x)) {
            let bulk = this[x].bulk();
            return totalCost(bulk, this[x].cost(), this[x].power);
        }
        return this[x].cost();
    }

    disable(x) {
        if (this.layer === 'coin' && player.settings.modernization_activated) {
            const can = this.canAfford_super(x) || (this.state.superUpgrades && this.state.superUpgrades.includes(this[x].super_id));
            this[x].element.disabled = !can;
        } else {
            this[x].element.disabled = !this.canAfford(x);
        }
    }

    checkDisable() { this._forEachBuyable(x => this.disable(x)); }
    checkPurchased() {
        this._forEachBuyable(y => {
            if (this[y].unl_super && this[y].unl_super()) {
                if (this[y].element) this[y].element.classList.add('superPurchasedBuyable');
            }
        });
    }
}

class UniversalSingleUpgrade {
    constructor(config, layerName, arrayName = 'singleUpgrades') {
        this.layer = layerName;
        this.arrayName = arrayName;
        this.id = config.id;
        this.super_id = config.super_id;
        this.elementId = config.elementId;
        this.basePrice = config.basePrice; 
        
        this.customCost = config.cost ? config.cost.bind(this) : null;
        this.customEffect = config.effect ? config.effect.bind(this) : () => 1;
        
        this._superCost = config.cost_super;
        this.customSuperEffect = config.effect_super ? config.effect_super.bind(this) : null;
        
        if (config.base) this.base = config.base.bind(this);
        if (config.softcap_start) this.softcap_start = config.softcap_start.bind(this);
        this.req = config.req ? config.req.bind(this) : null; 
    }

    get state() { return player[this.layer]; }
    get targetArray() { 
        let keys = this.arrayName.split('.');
        // Если путь начинается с глобального ключа (например 'fortune...'), ищем от корня player. Иначе - от текущего слоя.
        return player[keys[0]] ? keys.reduce((obj, key) => obj[key], player) : keys.reduce((obj, key) => obj[key], this.state); 
    }
    get element() { return document.getElementById(this.elementId); }

    unl() { return this.targetArray && this.targetArray.includes(this.id); }
    
    cost() { 
        if (this.customCost) return this.customCost();
        if (this.basePrice !== undefined && this.layer === 'coin') {
            let cost = this.basePrice;
            if (player.challenge.activated == 5 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) cost *= Math.pow(10, MISC.amount_of_upgrades.coin());
            if (player.challenge.activated == 1 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) cost /= Math.pow(Math.log10(10 + player.clicks.prestige), Math.log10(10 + player.clicks.prestige * player.clicks.prestige));
            if (player.prestige.challenge.activated == 4) cost = Math.pow(cost, 2);
            return cost;
        }
        return this.basePrice || 0;
    }

    effect(...args) { return this.customEffect(...args); }
    unl_super() { return this.state.superUpgrades && this.state.superUpgrades.includes(this.super_id); }
    cost_super() { return typeof this._superCost === 'function' ? this._superCost() : this._superCost; }
    effect_super(...args) { 
        if (!this.customSuperEffect) return 1;
        return this.customSuperEffect(...args); 
    }
}

class UniversalSinglesManager {
    constructor(layerName, arrayName, upgradesArray) {
        this.layer = layerName;
        this.arrayName = arrayName;
        this._keys = [];
        
        upgradesArray.forEach(upg => {
            this[upg.id] = new UniversalSingleUpgrade(upg, layerName, arrayName);
            this._keys.push(upg.id);
        });
    }

    get state() { return player[this.layer]; }
    get targetArray() { 
        let keys = this.arrayName.split('.');
        // Если путь начинается с глобального ключа (например 'fortune...'), ищем от корня player. Иначе - от текущего слоя.
        return player[keys[0]] ? keys.reduce((obj, key) => obj[key], player) : keys.reduce((obj, key) => obj[key], this.state); 
    }

    canAfford(x) {
        if (this[x].req) return player.supercrystal.total_currency >= this[x].req() && !this[x].unl();
        let bool = this.state.currency >= this[x].cost() && !this[x].unl();
        
        if (this.layer === 'coin') {
            if (player.challenge.activated == 6 || player.prestige.challenge.activated == 1 || player.prestige.challenge.activated == 7) bool = false;
            if ((player.challenge.activated == 10 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) && MISC.amount_of_upgrades.coin() >= 25) bool = false;
            if (player.challenge.activated == 11 || player.prestige.challenge.activated == 2 || player.prestige.challenge.activated == 7) bool = false;
        } 
        // ДОБАВИЛИ ПРОВЕРКУ МАССИВА: применяем логику рядов ТОЛЬКО для базовых синглов престижа
        else if (this.layer === 'prestige' && this.arrayName === 'singleUpgrades') {
            if (!this.targetArray.includes(x - 1) && x % 10 !== 1) bool = false;
        }
        
        return bool;
    }

    canAfford_super(x) { return player.supercoin.currency >= this[x].cost_super() && (!this.state.superUpgrades || !this.state.superUpgrades.includes(this[x].super_id)); }

    buy(x) {
        if (this.canAfford(x)) {
            this.state.currency -= this[x].cost();
            if (!this[x].unl()) this.targetArray.push(x);
        }
    }

    buy_super(x) {
        if (this.canAfford_super(x)) {
            player.supercoin.currency -= this[x].cost_super();
            if (!this.state.superUpgrades.includes(this[x].super_id)) {
                this.state.superUpgrades.push(this[x].super_id);
            }
        }
    }

    disable(x) {
        if (this.layer === 'coin' && player.settings.modernization_activated) {
            this[x].element.disabled = !(this.canAfford_super(x) || this[x].unl_super());
        } else {
            this[x].element.disabled = !(this.canAfford(x) || this[x].unl());
        }
    }

    checkDisable() { this._keys.forEach(x => this.disable(x)); }
    checkPurchased() {
        this._keys.forEach(id => {
            if (this.layer === 'coin') {
                if (this[id].unl() && !this[id].unl_super()) {
                    this[id].element.classList.add('purchased');
                    this[id].element.classList.remove('superPurchased', 'superPurchasedBuyable');
                } else if (this[id].unl() && this[id].unl_super()) {
                    this[id].element.classList.add('superPurchased');
                    this[id].element.classList.remove('superPurchasedBuyable', 'purchased');
                } else if (!this[id].unl() && this[id].unl_super()) {
                    this[id].element.classList.add('superPurchasedBuyable');
                    this[id].element.classList.remove('superPurchased', 'purchased');
                } else {
                    this[id].element.classList.remove('purchased', 'superPurchased', 'superPurchasedBuyable');
                }
            } else {
                if (this[id].unl()) this[id].element.classList.add('purchased');
                else this[id].element.classList.remove('purchased');
            }
        });
    }
}

// --- КЛАССЫ ДЛЯ МАГАЗИНА ---

// Улучшение магазина с лимитом и прогнозом эффекта
class ShopBuyableUpgrade extends UniversalBuyableUpgrade {
    constructor(config, layerName, arrayName) {
        super(config, layerName, arrayName);
        this.maxAmount = config.maxAmount;
        this.customNextEffect = config.next_effect ? config.next_effect.bind(this) : null;
    }

    next_effect(...args) { return this.customNextEffect ? this.customNextEffect(...args) : null; }
    
    // Встроенный bulk с учетом поля ввода и лимита
    bulk(x = player.supercoin.currency, y = this.targetArray[this.id]) {
        // Сколько мы ВООБЩЕ можем позволить себе купить по деньгам
        let maxAffordable = upgradesPurchasableCustom(y, x, this.cost(), this.power);
        
        // Сколько мы ХОТИМ купить (из поля ввода)
        let bulkBuyAmount = parseInt(shopBulkBuyInput.value);
        if (isNaN(bulkBuyAmount) || bulkBuyAmount < 1) bulkBuyAmount = 1;
        
        // Сколько нам ОСТАЛОСЬ купить до максимума
        let leftToMax = this.maxAmount - y;
        
        // Берем самое маленькое из трех: что можем, что хотим, и что осталось
        let finalBulk = Math.min(maxAffordable, bulkBuyAmount, leftToMax);
        
        // Если ничего купить не можем (уперлись в цену или лимит), возвращаем 0
        return Math.max(finalBulk, 0);
    }
}

// Менеджер покупаемых улучшений магазина (учитывает spent_currency и respec)
class ShopBuyablesManager extends UniversalBuyablesManager {
    constructor(layerName, upgradesArray, arrayName = 'upgrades') {
        super(layerName, upgradesArray, arrayName);
        upgradesArray.forEach(upg => { this[upg.id] = new ShopBuyableUpgrade(upg, layerName, arrayName); });
    }

    canAfford(x) { return this.targetArray[x] < this[x].maxAmount && player.supercoin.currency >= this[x].cost(); }

    buy(x) {
        if (this.canAfford(x)) {
            let cost = this[x].cost();
            player.supercoin.currency -= cost;
            player.supercoin.spent_currency += cost;
            this.targetArray[x]++;
        }
    }

    max(x) {
        if (this.canAfford(x)) {
            let bulk = this[x].bulk();
            let cost = totalCost(bulk, this[x].cost(), this[x].power);
            player.supercoin.currency -= cost;
            player.supercoin.spent_currency += cost;
            this.targetArray[x] += bulk;
        }
    }

    reset(x) { if (this.targetArray[x] >= 1) this.targetArray[x] = 0; }
    
    respec() {
        this._forEachBuyable(x => this.reset(x));
        player.supercoin.currency += player.supercoin.spent_currency;
        player.spentSuperCoins = 0; 
        player.supercoin.spent_currency = 0; // Для безопасности
    }

    disable(x) { this[x].element.disabled = !(this.canAfford(x) || this.targetArray[x] == this[x].maxAmount); }
}

// Менеджер перманентных улучшений (похож на buyables, но без возврата валюты)
class ShopPermanentManager extends ShopBuyablesManager {
    buy(x) {
        if (this.canAfford(x)) {
            player.supercoin.currency -= this[x].cost();
            this.targetArray[x]++;
        }
    }
    max(x) {
        if (this.canAfford(x)) {
            let bulk = this[x].bulk();
            player.supercoin.currency -= totalCost(bulk, this[x].cost(), this[x].power);
            this.targetArray[x] += bulk;
        }
    }
    respec() { /* Перманентные не сбрасываются */ }
}

// Менеджер разблокировок (синглы)
class ShopUnlockablesManager extends UniversalSinglesManager {
    canAfford(x) { return player.supercoin.currency >= this[x].cost() && !this.targetArray.includes(x); }
    buy(x) {
        if (this.canAfford(x)) {
            player.supercoin.currency -= this[x].cost();
            this.targetArray.push(x);
        }
    }
}

// Класс для расходуемых предметов
class ShopItemUpgrade {
    constructor(config) {
        this.id = config.id;
        this.maxAmount = config.maxAmount;
        this.elementId = config.elementId;
        this.customCost = config.cost;
        this.customEffect = config.effect;
    }
    
    get element() { return document.getElementById(this.elementId); }
    cost() { return this.customCost(); }
    effect() { return this.customEffect(); }
    
    canUseItem(x = player.shop.items.amount[this.id], y = player.shop.items.used[this.id]) {
        return !(x == 0 || y == this.maxAmount || player.challenge.activated != 0 || player.prestige.challenge.activated != 0);
    }
    
    useItem() {
        if (this.canUseItem()) {
            player.shop.items.amount[this.id]--;
            player.shop.items.used[this.id]++;
            this.effect();
            notify(text.notification.used_item + text.itemNames[this.id - 1], "limegreen", "550px");
        } else if (player.shop.items.used[this.id] == this.maxAmount) {
            notify(text.notification.limit_item + this.maxAmount + " " + text.itemNames[this.id - 1] + text.notification.limit_item_2, "red", "550px");
        } else {
            notify(text.notification.dont_have_item + text.itemNames[this.id - 1] + "!", "red", "550px");
        }
    }
}

// Менеджер предметов
class ShopItemsManager {
    constructor(itemsArray) {
        this._keys = [];
        itemsArray.forEach(item => {
            this[item.id] = new ShopItemUpgrade(item);
            this._keys.push(item.id);
        });
    }
    canAfford(x) { return player.shop.items.amount[x] < this[x].maxAmount && player.supercoin.currency >= this[x].cost(); }
    buy(x) {
        if (this.canAfford(x)) {
            player.supercoin.currency -= this[x].cost();
            player.shop.items.amount[x]++;
        }
    }
    disable(x) { this[x].element.disabled = !(this.canAfford(x) || player.shop.items.amount[x] == this[x].maxAmount); }
    checkDisable() { this._keys.forEach(x => this.disable(x)); }
}

// --- КЛАССЫ ДЛЯ МИНЕРАЛОВ ---

class MineralUpgrade {
    constructor(config) {
        this.id = config.id;
        this.elementId = config.elementId;
        this.customCost1 = config.cost1.bind(this);
        this.customCost2 = config.cost2.bind(this);
        this.customEffect1 = config.effect1.bind(this);
        this.customEffect2 = config.effect2.bind(this);
        this.customEffect3 = config.effect3.bind(this);
    }

    get element() { return document.getElementById(this.elementId); }
    
    cost1(x = player.minerals[this.id]) { return this.customCost1(x); }
    cost2(x = player.minerals[this.id]) { return this.customCost2(x); }

    // Универсальный метод, который заменяет 12 одинаковых проверок из старого кода!
    applyMods(eff) {
        if (player.prestige.break.singles.includes(23)) eff *= UPGS.prestige.break.singles[23].effect();
        if (player.fortune.activatedBoosts[7].activated) eff *= UPGS.fortune.boosts[7].effect();
        if (player.shard.singleUpgrades.includes(22)) eff = Math.pow(eff, UPGS.shard.singles[22].effect());
        if (player.prestige.challenge.activated == 5) eff = Math.pow(eff, 0.1);
        return eff;
    }

    effect1(x = player.minerals[this.id]) { return this.customEffect1(x); }
    effect2(x = player.minerals[this.id]) { return this.customEffect2(x); }
    effect3(x = player.minerals[this.id]) { return this.customEffect3(x); }

    // Вшитая функция массовой покупки, которая сама берет нужные формулы цены
    bulk(x = player.minerals[this.id]) {
        let bulk1 = 0, bulk2 = 0, costLimit = Math.min(100, player.settings.minerals_bulkbuy), it1 = 0, it2 = 0;
        
        for (let i = 0; i < costLimit; i++) {
            bulk1 += this.cost1(x + i);
            it1++;
            if (bulk1 + this.cost1(x + i) > player.rune.currency) break; 
        }
        for (let i = 0; i < it1; i++) {
            bulk2 += this.cost2(x + i);
            it2++;
            if (this.cost2(x + i + 1) > player.shard.currency) break; 
        }
        
        let iter = Math.min(it1, it2);
        return { bulk1, bulk2, iter };
    }
}

class MineralManager {
    constructor(upgradesArray) {
        this._keys = [];
        upgradesArray.forEach(upg => {
            this[upg.id] = new MineralUpgrade(upg);
            this._keys.push(upg.id);
        });
    }

    canAfford(x) { return player.rune.currency >= this[x].cost1() && player.shard.currency >= this[x].cost2(); }

    buy(x) {
        if (this.canAfford(x)) {
            player.rune.currency -= this[x].cost1();
            player.shard.currency -= this[x].cost2();
            player.minerals[x]++;
        }
    }

    reset(x) { if (player.minerals[x] >= 1) player.minerals[x] = 0; }

    respec() {
        player.rune.currency = 0
        player.rune.total_currency = 0;
        this._keys.forEach(x => this.reset(x));
    }

    disable(x) { this[x].element.disabled = !this.canAfford(x); }
    checkDisable() { this._keys.forEach(x => this.disable(x)); }
}

class FortuneBoost {
    constructor(config) {
        this.id = config.id;
        this.customMin = config.min;
        this.customMax = config.max;
        this.generatorType = config.generatorType; // 'digits', 'float2', 'float3', 'int'
    }

    min() { return this.customMin(); }
    max() { return this.customMax(); }
    get element() { return document.getElementsByClassName('fortuneBoost')[this.id - 1]; }
    get element2() { return document.getElementsByClassName('fortune-img')[this.id - 1]; }
    effect() { return player.fortune.activatedBoosts[this.id].activated ? player.fortune.activatedBoosts[this.id].effect : 1; }

    generateNumber() {
        if (player.balance.upgrades.singles.includes(33)) return this.max();
        let min = this.min(), max = this.max();
        
        if (this.generatorType === 'digits') {
            let minD = Math.floor(Math.log10(min)), maxD = Math.floor(Math.log10(max));
            let digit = randomNumber(minD, maxD);
            return randomNumber(Math.max(min, 10 ** digit), Math.min(max, 10 ** (digit + 1) - 1));
        }
        if (this.generatorType === 'float2') return randomNumber(min, max, 2);
        if (this.generatorType === 'float3') return randomNumber(min, max, 3);
        return randomNumber(min, max); // int
    }
}

class FortuneBoostsManager {
    constructor(boostsArray) {
        this._keys = [];
        boostsArray.forEach(b => {
            this[b.id] = new FortuneBoost(b);
            this._keys.push(b.id);
        });
    }

    checkActivated(x) { return player.fortune.activatedBoosts[x].activated == true; }
    
    reset(x, forced=false) {
        if ((player.fortune.activatedBoosts[x].time < 0 || forced == true) && player.fortune.activatedBoosts[x].activated) {
            player.fortune.activatedBoosts[x].activated = false;
            player.fortune.activatedBoosts[x].time = 0;
            if (player.fortune.spent_tokens > 0) { player.fortune.tokens += 1; player.fortune.spent_tokens -= 1; }
            let idx = player.fortune.activatedBoosts.list.indexOf(x);
            if (idx > -1) player.fortune.activatedBoosts.list.splice(idx, 1);
        }
    }
    
    respec(free=false) { 
        if (player.fortune.daily_resets == 0 && free == false) return 0;
        this._keys.forEach(x => this.reset(x, true));
        player.fortune.daily_resets -= 1;
    }
    
    finishedBoost(x) { if (player.fortune.activatedBoosts[x].time < 0) this.reset(x); }
    
    disable(x) {
        if (this.checkActivated(x)) this.finishedBoost(x);
        if (this.checkActivated(x)) {
            this[x].element.classList.remove('disabled');
            this[x].element2.classList.remove('disabled');
        } else {
            this[x].element.classList.add('disabled');
            this[x].element2.classList.add('disabled');
        }
    }
    
    checkDisable() { this._keys.forEach(x => this.disable(x)); }
    
    activate(x) {
        player.fortune.activatedBoosts[x].activated = true;
        player.fortune.activatedBoosts[x].time = 60 * UPGS.fortune.upgrades.buyables[3].effect();
        player.fortune.activatedBoosts[x].effect = this[x].generateNumber();
        if (player.prestige.challenge.activated == 8) player.fortune.activatedBoosts[x].effect = 1;
        if (x == 12) MISC.fortune.fortuneBoost12();
    }

    activateTheBoost() {
        let x = player.balance.upgrades.singles.includes(13) ? 2 : 1;
        if (player.fortune.tokens == 0 || player.fortune.activatedBoosts.list.length == 12) return 0;
        for (let i = 1; i <= x; i++) {
            if (player.fortune.activatedBoosts.list.length == 12) return 0;
            let max_rarity_number = 80;
            if (player.fortune.upgrades.singles.includes(12)) max_rarity_number = 90;
            if (player.fortune.upgrades.singles.includes(21)) max_rarity_number = 98;
            if (player.fortune.upgrades.singles.includes(32)) max_rarity_number = 100;
            
            let rarity_number = randomNumber(1, max_rarity_number);
            let rarity = null;
            let list = player.fortune.activatedBoosts.list;
            
            switch (true) {
                case ((rarity_number >= 1 && rarity_number <= 80) && ![1, 2, 3].every(e => list.includes(e))) && !player.fortune.upgrades.singles.includes(33): rarity = 'B'; break;
                case ((rarity_number >= 81 && rarity_number <= 90 && ![1, 2, 3, 4, 5, 6].every(e => list.includes(e))) || (([1, 2, 3].every(e => list.includes(e))) && ![1, 2, 3, 4, 5, 6].every(e => list.includes(e)) && player.fortune.upgrades.singles.includes(12))) && !player.fortune.upgrades.singles.includes(33): rarity = 'A'; break;
                case ((rarity_number >= 91 && rarity_number <= 98 && ![1, 2, 3, 4, 5, 6, 7, 8, 9].every(e => list.includes(e))) || (([1, 2, 3, 4, 5, 6].every(e => list.includes(e))) && ![1, 2, 3, 4, 5, 6, 7, 8, 9].every(e => list.includes(e)) && player.fortune.upgrades.singles.includes(21))) && !player.fortune.upgrades.singles.includes(33): rarity = 'S'; break;
                case ((rarity_number >= 99 && rarity_number <= 100) || ([1, 2, 3, 4, 5, 6, 7, 8, 9].every(e => list.includes(e)) && player.fortune.upgrades.singles.includes(32))) && !player.fortune.upgrades.singles.includes(33): rarity = 'EX'; break;
                default: if (player.fortune.upgrades.singles.includes(33)) rarity = 'ALL'; else return 0;
            }
            
            let boost = 0;
            switch (true) {
                case rarity == 'B' && ![1, 2, 3].every(e => list.includes(e)): do { boost = randomNumber(1, 3); } while (list.includes(boost)); if (!list.includes(boost)) list.push(boost); break;
                case rarity == 'A' && ![1, 2, 3, 4, 5, 6].every(e => list.includes(e)) && player.fortune.upgrades.singles.includes(12): do { boost = randomNumber(4, 6); } while (list.includes(boost)); if (!list.includes(boost)) list.push(boost); break;
                case rarity == 'S' && ![1, 2, 3, 4, 5, 6, 7, 8, 9].every(e => list.includes(e)): do { boost = randomNumber(7, 9); } while (list.includes(boost)); if (!list.includes(boost)) list.push(boost); break;
                case rarity == 'EX' && ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every(e => list.includes(e)): do { boost = randomNumber(10, 12); } while (list.includes(boost)); if (!list.includes(boost)) list.push(boost); break;
                case rarity == 'ALL': do { boost = randomNumber(1, 12); } while (list.includes(boost)); if (!list.includes(boost)) list.push(boost); break;
                default: return 0;
            }
            if (rarity != null) {
                if (i == 1) { player.fortune.tokens -= 1; player.fortune.spent_tokens += 1; }
                this.activate(boost);
            }
        }
    }
}

class FortuneBuyablesManager extends UniversalBuyablesManager {
    buy(x) {
        if (this.canAfford(x)) {
            let cost = this[x].cost();
            player.supercrystal.currency -= cost;
            player.supercrystal.spent_currency_on_fortune_upgrades += cost;
            this.targetArray[x]++;
        }
    }
    reset(x) { if (this.targetArray[x] >= 1) this.targetArray[x] = 0; }
    respec() {
        this._forEachBuyable(x => this.reset(x));
        player.supercrystal.currency += player.supercrystal.spent_currency_on_fortune_upgrades;
        player.supercrystal.spent_currency_on_fortune_upgrades = 0;
    }
}

class FortuneSinglesManager extends UniversalSinglesManager {
    buy(x) {
        if (this.canAfford(x)) {
            this.state.currency -= this[x].cost(); // Для fortune это 0, так как валюта не списывается (только req)
            if (!this[x].unl()) {
                this.targetArray.push(x);
                if (x === 23) player.fortune.daily_resets += 10; // Уникальное событие покупки 23
            }
        }
    }
}

// --- КЛАССЫ ДЛЯ BALANCE ---

class BalanceBuyableUpgrade extends UniversalBuyableUpgrade {
    constructor(config, layerName, arrayName) {
        super(config, layerName, arrayName);
        this.elementIndex = config.elementIndex; // Запоминаем индекс вместо ID
    }
    // Переопределяем поиск элемента
    get element() { return document.getElementsByClassName('balanceBuyableButton')[this.elementIndex]; }
}

class BalanceBuyablesManager extends UniversalBuyablesManager {
    constructor(layerName, upgradesArray, arrayName = 'upgrades') {
        super(layerName, upgradesArray, arrayName);
        this._keys = [];
        upgradesArray.forEach(upg => {
            this[upg.id] = new BalanceBuyableUpgrade(upg, layerName, arrayName);
            this._keys.push(upg.id);
        });
    }

    // Заменяем currency на neutral
    canAfford(x) { return player.balance.neutral >= this[x].cost(); }
    buy(x) {
        if (this.canAfford(x)) {
            player.balance.neutral -= this[x].cost();
            this.targetArray[x]++;
        }
    }
}

class BalanceSingleUpgrade extends UniversalSingleUpgrade {
    constructor(config, layerName, arrayName) {
        super(config, layerName, arrayName);
        this.elementIndex = config.elementIndex;
    }
    get element() { return document.getElementsByClassName('balanceSingleButton')[this.elementIndex]; }
}

class BalanceSinglesManager extends UniversalSinglesManager {
    constructor(layerName, arrayName, upgradesArray) {
        super(layerName, arrayName, upgradesArray);
        this._keys = [];
        upgradesArray.forEach(upg => {
            this[upg.id] = new BalanceSingleUpgrade(upg, layerName, arrayName);
            this._keys.push(upg.id);
        });
    }

    canAfford(x) { return player.balance.neutral >= this[x].cost() && !this[x].unl(); }
    buy(x) {
        if (this.canAfford(x)) {
            player.balance.neutral -= this[x].cost();
            if (!this[x].unl()) this.targetArray.push(x);
        }
    }
}

// --- КЛАСС АВТОМАТИЗАЦИИ ---

class AutomationTask {
    constructor(type, activateLogic) {
        this.type = type;
        this.customActivate = activateLogic.bind(this);
        this.time = 0;
    }

    get misc() { return MISC.automation[this.type]; }

    charge() {
        if (!this.misc.charged) {
            if (Date.now() >= this.time) this.misc.charged = true;
        }
        if (this.misc.charged) this.activate();
    }

    activate() {
        // Если функция вернула true (как в случае с single), она сама обработала таймеры
        if (this.customActivate()) return; 
        
        this.misc.charged = false;
        this.time = this.misc.activateTime();
    }

    start() {
        this.stop(); // На всякий случай очищаем старый интервал
        this.misc.interval = setInterval(() => this.charge(), 50);
        this.time = this.misc.activateTime();
        player.automation.checkbox[this.type] = true;
    }

    stop() {
        if (this.misc.interval) {
            clearInterval(this.misc.interval);
            this.misc.interval = '';
        }
        player.automation.checkbox[this.type] = false;
    }

    restart() {
        // Перезапускаем только если автоматизация сейчас включена (checked)
        if (this.misc.interval !== '') this.start();
    }
}