function maxOrNo(type) {
    switch (type) {
        case 'coin':
            player.settings.buy_max_activate = !player.settings.buy_max_activate;
            break;
        case 'shard':
            player.settings.shard_buy_max_activate = !player.settings.shard_buy_max_activate;
            break;
        case 'balance':
            player.settings.balance_buy_max_activate = !player.settings.balance_buy_max_activate;
            break;
        case 'breakprestige':
            player.settings.breakprestige_buy_max_activate = !player.settings.breakprestige_buy_max_activate;
            break;
        default:
            break;
    }
}

// --- МАТЕМАТИКА И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

function upgradesPurchasableCustom(currentUpgrades, currencyAmount, costPerUpgrade, increaseRate) {
    // Защита от переполнения: ограничиваем валюту так, чтобы при умножении не вышло Infinity
    let safeCurrency = Math.min(currencyAmount, 1.7e308 / increaseRate);
    let bulk = Math.floor(Math.log((safeCurrency * (increaseRate - 1) / costPerUpgrade + 1)) / Math.log(increaseRate));
    // Если по какой-то причине вылез NaN или Infinity, возвращаем 0
    return isFinite(bulk) ? Math.max(bulk, 1) : 0;
}

// JS умеет парсить "1e10" нативно, сложные сплиты больше не нужны
function convert(input) { return Number(input); }

function totalCost(numUpgrades, firstCost, ratio) {
    let cost = firstCost * ((Math.pow(ratio, numUpgrades) - 1) / (ratio - 1));
    // Если стоимость перевалила за лимит, просто возвращаем потолок
    return isFinite(cost) ? cost : 1.79e308;
}

function totalCostFromCurrent(currentUpgrades, totalUpgrades, firstCost, ratio) {
    return totalCost(totalUpgrades, firstCost, ratio) - totalCost(currentUpgrades, firstCost, ratio);
}

function customLog(base, number) {
    return Math.log(number) / Math.log(base);
}

function randomNumber(min, max, digits = 0) {
    if (digits > 0) return parseFloat((Math.random() * (max - min) + min).toFixed(digits));
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

// Теперь функция принимает любое количество аргументов
function findSum(...args) {
    return args.reduce((sum, val) => sum + val, 0); 
}

// --- ФУНКЦИИ ПОКУПОК (ОБЕРТКИ ДЛЯ HTML) ---

function buyUpgrade(x) {
    player.settings.modernization_activated ? UPGS.coin.buyables.buy_super(x) : 
    (player.settings.buy_max_activate ? UPGS.coin.buyables.max(x) : UPGS.coin.buyables.buy(x));
}

function buySingleUpgrade(x) {
    player.settings.modernization_activated ? UPGS.coin.singles.buy_super(x) : UPGS.coin.singles.buy(x);
}

function buyShopUpgrade(x) { UPGS.shop.buyables.max(x); }

function buyShardUpgrade(x) {
    player.settings.shard_buy_max_activate ? UPGS.shard.buyables.max(x) : UPGS.shard.buyables.buy(x);
}

function buyBreakPrestigeUpgrade(x) {
    player.settings.breakprestige_buy_max_activate ? UPGS.prestige.break.buyables.max(x) : UPGS.prestige.break.buyables.buy(x);
}

function buyBalanceUpgrade(x) {
    player.settings.balance_buy_max_activate ? UPGS.balance.buyables.max(x) : UPGS.balance.buyables.buy(x);
}

// --- УПРАВЛЕНИЕ СТРАНИЦЕЙ И UI ---

function reloadPage() { location.reload(); doHardReset(); }
function reloadPage2() { location.reload(); }

function checkCompletedChallenges() {
    for (let i = 1; i <= 12; i++) {
        if (player.challenge.completed.includes(i)) window[`challenge${i}Start`].style.backgroundColor = '#09b909';
            else window[`challenge${i}Start`].style.backgroundColor = '';
        if (i < 9) {
            if (player.prestige.challenge.completed.includes(i)) window[`pChallenge${i}Start`].style.backgroundColor = '#09b909';
            else window[`pChallenge${i}Start`].style.backgroundColor = ''
        } 
    }
}

// СМЕНА КОЛИЧЕСТВА ОПТОВОЙ ПОКУПКИ В СУПЕРШОПЕ
function changeInputValue(arg) {
    player.settings.shop_bulkbuy = arg;
}

// --- ФУНКЦИИ ОТРИСОВКИ ГРАФИКОВ (ПОЛОСОК) ---

function hidePiece(condition, idOfPiece, idOfPiecePercent, summary) {
    if (condition > 1) {
        let ratio = findRatio(condition, summary);
        idOfPiece.style.display = 'flex';
        idOfPiece.style.height = `${ratio}%`;
        idOfPiecePercent.innerHTML = ratio >= 4.5 ? `${ratio}%` : '';
    } else {
        idOfPiece.style.display = 'none';
    }
}

function hidePieceDecimal(condition, idOfPiece, idOfPiecePercent, summary) {
    let cond = new Decimal(condition), summ = new Decimal(summary);
    if (cond.gt(1)) {
        let ratio = findRatioDecimal(cond, summ);
        idOfPiece.style.display = 'flex';
        idOfPiece.style.height = `calc(${ratio}% - 1px)`;
        idOfPiecePercent.innerHTML = new Decimal(ratio).gte(4.5) ? `${formatNumber(ratio, 'boost')}%` : '';
    } else {
        idOfPiece.style.display = 'none';
    }
}

function hidePiece2(condition, idOfPiece, idOfPiecePercent, summary, temp2) {
    if (condition > 0) {
        let ratio = findRatio2(condition, summary);
        idOfPiece.style.display = 'flex';
        idOfPiece.style.height = `${ratio}%`;
        idOfPiecePercent.innerHTML = ratio >= 4.5 ? `${(ratio / temp2).toFixed(2)}%` : '';
    } else {
        idOfPiece.style.display = 'none';
    }
}

// --- ФОРМАТТЕРЫ ЧИСЕЛ ---

// Вынес логику для маленьких чисел, чтобы не дублировать ее 5 раз
function formatSmallNumber(number, mode, x) {
    switch (mode) {
        case 'number': return number.toFixed(0);
        case 'floor': return Math.floor(number).toString();
        case 'boost': return number < 100 ? parseFloat(number.toFixed(2)).toString() : number.toFixed(0);
        case 'power': return number < 10 ? number.toFixed(x) : (number < 100 ? number.toFixed(2) : number.toFixed(0));
        case 'percent': 
            let p = number * 100 - 100;
            // Если процент стал огромным, прогоняем его через настройки нотации игрока!
            if (p >= 1e6) return formatNumber(p, 'number'); 
            return p < 10 ? p.toFixed(2) : p.toFixed(0);
        default: return number.toString();
    }
}

function formatNumber(number, mode = 'number', x = 3, isReflash = false) {
    if (isReflash && player.reflash.computer[3] >= 1 && number >= 8) {
        number /= 8
    }  
    if (number >= 1.79e308) return "Infinity";
    const notation = player.settings.notation;

    // Специфичные моды, игнорирующие размер числа
    if (notation === 'option5') return number > 0 ? "TRUE" : "FALSE";
    if (notation === 'option6') return "";
    if (notation === 'option4') return mode === 'percent' ? "log " + Math.log10(number * 100 - 99).toFixed(3) : "log " + Math.log10(number + 1).toFixed(3);

    // Обработка маленьких чисел (для научной нотации порог 1млн, для остальных 1тыс)
    const threshold = notation === 'option2' ? 1000000 : 1000;
    if (number < threshold) return formatSmallNumber(number, mode, x);

    // Обработка больших чисел
    const isEn = player.settings.currentLanguage === 'en';
    const index = Math.floor(Math.log10(number) / 3);

    switch (notation) {
        case 'option1': { // Standard
            const std1 = isEn ? ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc"] : ["", "Тыс.", "Mлн", "Млрд", "Трлн", "Квдрлн", "Квнтлн", "Скс", "Спт", "Окт", "Нон", "Дц"];
            if (index < std1.length) return (number / Math.pow(10, index * 3)).toFixed(2) + " " + std1[index];

            const pre = isEn ? ["", "Un", "Du", "Tr", "Qd", "Qt", "Sx", "Sp", "Oc", "No"] : ["", "Ун", "Ду", "Тр", "Квд", "Квнт", "Скс", "Сп", "Ок", "Но"];
            const suf = isEn ? ["Dc", "Vg", "Tg", "Qg", "Qtg", "Sxg", "Spg", "Ocg", "Nog", "Ce"] : ["Дц", "Вг", "Трг", "Квдг", "Квнтг", "Сксг", "Сптг", "Октг", "Нонг", "Цен"];
            const indexK = Math.floor((index - 1) / 10) - 1;
            const indexI = (index - 1) % 10;
            return (number / Math.pow(10, index * 3)).toFixed(2) + " " + pre[indexI] + suf[indexK];
        }
        case 'option2': // Scientific
            return number.toExponential(2).replace("+", "");
        case 'option3': // Engineering
            return (number / Math.pow(10, index * 3)).toFixed(2) + "e" + (index * 3);
        case 'option7': { // Letters
            const letters = isEn ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЬЭЮЯ";
            const numLetters = letters.length;
            const idx = index - 1;
            
            if (idx < numLetters) return (number / Math.pow(10, (idx + 1) * 3)).toFixed(2) + " " + letters[idx];
            
            const indexK = Math.floor(idx / numLetters) - 1;
            const indexI = idx % numLetters;
            return (number / Math.pow(10, (idx + 1) * 3)).toFixed(2) + " " + letters[indexK] + letters[indexI];
        }
    }
}

// Форматирование для значений библиотеки Break Infinity (Decimal)
function formatDecimal(value, mode = 'number', x = 3) {
    if (typeof value === 'number' && value >= 1.79e308) return "Infinity";
    if (value && typeof value.gte === 'function' && value.gte(new Decimal("1.79e308"))) return "Infinity"; // <-- ДОБАВЛЯЕМ СЮДА
    // 1. Если это обычное число, прогоняем через наш основной форматтер
    if (typeof value === 'number') return formatNumber(value, mode, x);

    // 2. Попытка безопасно вытащить number из объекта Decimal
    try {
        if (value && typeof value.toNumber === 'function') {
            const n = value.toNumber();
            if (isFinite(n)) return formatNumber(n, mode, x);
        }
    } catch (e) {}

    // 3. Если число слишком огромное (Infinity), работаем со строкой "1.23e45"
    try {
        const s = String(value);
        if (s.includes('e')) {
            const [mantissaStr, exponentStr] = s.split('e');
            const mant = Number(mantissaStr);
            const exp = exponentStr.replace('+', '');
            
            let mantStr;
            if (mode === 'power') {
                mantStr = mant < 10 ? mant.toFixed(x) : (mant < 100 ? mant.toFixed(2) : mant.toFixed(0));
            } else if (mode === 'boost') {
                mantStr = mant < 100 ? mant.toFixed(2) : mant.toFixed(0);
            } else {
                mantStr = mant < 1000 ? mant.toFixed(2) : mant.toFixed(0);
            }
            return `${mantStr}e${exp}`;
        }
        return s;
    } catch (e) {
        return String(value);
    }
}

// --- ИСПЫТАНИЯ (CHALLENGES) ---

function startChallenge(number, again = false) {
    if (!ACHS.has(31)) ACHS.unl(31);
    
    if (again && restartChallenge.checked) {
        LAYERS.reset_time(); LAYERS.doReset(); LAYERS.doForcedReset();
        return;
    }
    if (number === 0 && restartChallenge.checked) {
        startChallenge(player.challenge.activated);
        return;
    }
    
    // Если number == 13 (выход), ставим 0. Иначе ставим number.
    player.challenge.activated = (number !== 13) ? number : 0;
    LAYERS.doReset();
    LAYERS.doForcedReset();
    if (number !== 13) LAYERS.reset_time();
}

function startPChallenge(number, again = false) {
    UPGS.fortune.boosts.respec(true);
    
    if (again && restartPChallenge.checked) {
        LAYERS.reset_time(); LAYERS.doReset(); LAYERS.doForcedReset();
        return;
    }
    if (number === 0 && restartPChallenge.checked) {
        startPChallenge(player.prestige.challenge.activated);
        return;
    }

    // Если number == 9 (выход), ставим 0. Иначе ставим number.
    player.prestige.challenge.activated = (number !== 9) ? number : 0;
    LAYERS.doReset();
    LAYERS.doForcedReset();
    if (number !== 9) LAYERS.reset_time();
}

// --- ГЕНЕРАЦИЯ И ПОКУПКИ ---

function generateRune(number) {
    for (let i = 0; i < number; i++) {
        let cost = UNL.rune.cost(); // Вынес переменную, чтобы не вызывать функцию дважды за цикл
        if (player.prestige.currency >= cost) {
            player.prestige.currency -= cost;
            player.rune.currency++;
            player.rune.total_currency++;
        } else break;
    }
}

function createMineral(x) {
    let bulk = UPGS.minerals[x].bulk();

    if (bulk.iter > 0 && player.rune.currency >= bulk.bulk1 && player.shard.currency >= bulk.bulk2) {
        player.minerals[x] += bulk.iter;
        player.rune.currency -= bulk.bulk1;
        player.shard.currency -= bulk.bulk2;
    }
}

// --- СБРОСЫ (RESPECS) ---

function respecMinerals() { 
    UPGS.minerals.respec(); // ООП магия: класс делает всё сам!
    LAYERS.doForcedReset(); 
}

function respecShardAchs() {
    player.supercrystal.currency += player.shard_achievements.length
    player.shard_achievements = []
}

function respecBuyables() { 
    UPGS.shop.buyables.respec(); 
}

function respecSuperCrystalSingles() {
    player.supercrystal.currency += player.supercrystal.upgrades.length;
    player.supercrystal.upgrades = [];
    
    LAYERS.doReset();
    LAYERS.doForcedReset();
}

// --- UI И ОФОРМЛЕНИЕ ---

let modernizeBlink = '';

function modernize() {
    player.settings.modernization_activated = !player.settings.modernization_activated;
    
    // Собираем все улучшения монет в один плоский массив из наших классов
    let allUpgrades = [
        ...UPGS.coin.buyables._keys.map(id => UPGS.coin.buyables[id]),
        ...UPGS.coin.singles._keys.map(id => UPGS.coin.singles[id])
    ];

    if (modernizeBlink) {
        clearInterval(modernizeBlink);
        modernizeBlink = '';
    }

    if (player.settings.modernization_activated) {
        // Первичное применение стилей при включении
        allUpgrades.forEach(upgrade => {
            upgrade.element.classList.remove('buyableButton', 'singleButton');
            if (upgrade.unl_super()) {
                upgrade.element.style.backgroundColor = 'var(--supercoin)'; 
                upgrade.element.style.color = 'black';
            } else if (!upgrade.element.disabled) {
                upgrade.element.style.borderColor = 'var(--supercoin)';
            }
        });

        // Запуск мигания
        modernizeBlink = setInterval(() => {
            allUpgrades.forEach(upgrade => {
                if (!upgrade.unl_super() && !upgrade.element.disabled) {
                    upgrade.element.style.color = 'white';
                    const darkBg = 'color-mix(in srgb, var(--supercoin) 40%, black 60%)';
                    
                    upgrade.element.style.backgroundColor = upgrade.element.style.backgroundColor === darkBg ? '#000000' : darkBg;
                    upgrade.element.style.borderColor = 'var(--supercoin)';
                } else if (upgrade.element.disabled) {
                    upgrade.element.style.removeProperty('color');
                    upgrade.element.style.removeProperty('border-color');
                    upgrade.element.style.removeProperty('background-color');
                } else if (upgrade.unl_super()) {
                    upgrade.element.style.backgroundColor = 'var(--supercoin)'; 
                    upgrade.element.style.color = 'black';
                }
            });
        }, 500);
    } else {
        // Возврат стандартных стилей при выключении
        allUpgrades.forEach(upgrade => {
            // ID от 1 до 5 - это buyables, всё что больше - singles
            if (upgrade.id < 10) upgrade.element.classList.add('buyableButton');
            else upgrade.element.classList.add('singleButton');
            
            upgrade.element.style.removeProperty('color');
            upgrade.element.style.removeProperty('border-color');
            upgrade.element.style.removeProperty('background-color');
        });
    }
}

function checkSuperUpgradesForTooltips() {
    let tooltipElements = document.getElementsByClassName('tooltipUpgrade');
    let index = 0;
    
    // Проходим по 3 рядам и 5 столбцам супер-улучшений
    for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 5; c++) {
            if (player.coin.superUpgrades.includes(r * 10 + c)) {
                if (tooltipElements[index]) tooltipElements[index].style.opacity = '1';
            }
            index++;
        }
    }
}

// --- ВСПОМОГАТЕЛЬНАЯ МАТЕМАТИКА ---

function convertToTwoDigits(arg) { return Math.floor(arg).toString().padStart(2, '0'); }

function getLeftValue(a, b) {
    if (a == b) return 50;
    if (b === 0) return 100;
    if (a === 0) return 0;
    return Math.round((a / (a + b)) * 100);
}

function getRightValue(a, b) {
    if (a == b) return 50;
    if (b === 0) return 0;
    if (a === 0) return 100;
    return 100 - getLeftValue(a, b);
}

function subtractPercentage(value, percentCoeff) { return value * (2 - percentCoeff); }


// --- УНИВЕРСАЛЬНЫЙ ГЕНЕРАТОР И ОБНОВИТЕЛЬ UI ---

// 1. Строит весь HTML интерфейс панели за одну миллисекунду
function buildStatsUI(statsId, graphicId, descriptors, summaryTitle, summaryId, softcapHTML = '') {
    const statsC = document.getElementById(statsId);
    const graphC = document.getElementById(graphicId);
    if (!statsC || !graphC) return;

    let statsHTML = '';
    let graphHTML = '';

    descriptors.forEach(d => {
        statsHTML += `
        <div class="multiplierString" style="display: flex;">
            <span id="${d.id}Stats" class="whiteText" style="margin-left: 30px;" data-i18n="${d.i18nKey || ''}">${d.title}</span>
            <span id="${d.id}StatsEffect" class="whiteText" style="margin-right: 30px;">${d.hasPiece === false ? '^0' : 'x1'}</span>
        </div>`;

        if (d.hasPiece !== false) {
            graphHTML += `
            <div id="${d.id}Piece" class="graphicPiece" style="${d.colorStyle}">
                <span id="${d.id}PiecePercent" class="whiteText pieceText">0%</span>
            </div>`;
        }
    });

    statsHTML += softcapHTML + `
    <div class="multiplierString footer" style="display: flex;">
        <span class="whiteText" style="margin-left: 30px;" data-i18n="totalMultiplier">${summaryTitle}</span>
        <span id="${summaryId}" class="whiteText" style="margin-right: 30px;">1.00x</span>
    </div>`;

    statsC.innerHTML = statsHTML; 
    graphC.innerHTML = graphHTML;
}
// 2. Обновляет значения и высоту полосок (заменяет дубликаты `forEach` циклов)
function applyStatsUpdate(sources, summaryId, summaryValue, summaryFormat = 'boost', summaryPrefix = 'x') {
    let totalWeight = 0;
    
    const processedSources = sources.map(src => {
        const effectRaw = src.effectValue();
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw;
        
        let weight = 0;
        let isActive = false;
        try {
            // Жёстко разделяем проверку активности для плюсов и умножения
            let numEffect = Number(effectRaw);
            if (src.effectPrefix === '+') {
                isActive = numEffect > 0;
            } else if (src.effectPrefix === '^') {
                isActive = numEffect !== 1;
            } else {
                isActive = numEffect > 1; // для обычных 'x' множителей
            }

            if (isActive) {
                let val = graphicRaw;
                let isDec = val && typeof val.gt === 'function' && typeof val.log10 === 'function';
                
                if (isDec) {
                    let num = Number(val.toString());
                    weight = val.gt(1) ? val.log10() : Math.max(0, num);
                } else {
                    let num = Number(val);
                    if (isFinite(num)) {
                        weight = num > 1 ? Math.log10(num) : Math.max(0, num);
                    }
                }
            }
            if (!isFinite(weight) || weight < 0) weight = 0;
        } catch (e) {
            weight = 0;
        }
        
        if (isActive) totalWeight += Number(weight);
        return { ...src, effectRaw, graphicRaw, weight, isActive };
    });

    processedSources.forEach(src => {
        const effectEl = document.getElementById(src.effectId);
        if (!effectEl) return;
        
        const textRow = effectEl.parentElement; // Кешируем родителя для скорости
        const pieceEl = src.pieceId ? document.getElementById(src.pieceId) : null;
        const piecePercentEl = src.piecePercentId ? document.getElementById(src.piecePercentId) : null;

        // Обновляем текст значения
        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(src.effectRaw, 'power');
        } else {
            effectEl.innerHTML = (src.effectPrefix || '') + formatDecimal(src.effectRaw, src.effectMode || 'boost');
        }

        // Меняем display только если он реально отличается, чтобы не вызывать лишний Reflow
        const targetDisplay = src.isActive ? 'flex' : 'none';
        
        if (textRow && textRow.style.display !== targetDisplay) {
            textRow.style.display = targetDisplay;
        }
        
        if (pieceEl && piecePercentEl) {
            if (!src.isActive) {
                if (pieceEl.style.display !== 'none') pieceEl.style.display = 'none';
                piecePercentEl.innerHTML = '';
            } else {
                let ratio = totalWeight > 0 ? (src.weight / totalWeight) * 100 : 0;
                if (pieceEl.style.display !== 'flex') pieceEl.style.display = 'flex';
                pieceEl.style.height = `calc(${ratio}% - 1px)`;
                piecePercentEl.innerHTML = ratio >= 4.5 ? `${ratio.toFixed(2)}%` : '';
            }
        }
    });

    const summaryEl = document.getElementById(summaryId);
    if (summaryEl) {
        const summaryText = summaryPrefix + formatDecimal(summaryValue, summaryFormat);
        if (summaryEl.innerHTML !== summaryText) summaryEl.innerHTML = summaryText;
    }
}
// --- ВКЛАДКА "НАЖАТИЕ" ---

function createGainPerClickUI() {
    const descriptors = [
        { id: 'doubler', title: 'Удвоитель', i18nKey: 'doublerName', colorStyle: 'background-image: radial-gradient(#23e019, rgba(0, 0, 0, 0)210%)' },
        { id: 'midasCursor', title: 'Курсор Мидаса', i18nKey: 'midasCursorName', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'rewardForFeats', title: 'Награда за Подвиги', i18nKey: 'rewardName', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'challenge1', title: 'Испытание 1', i18nKey: 'challenge1Name', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'goldenGlove', title: 'Золотая перчатка', i18nKey: 'goldenGloveName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'goldenGlove2', title: 'sixthShopBuyableEffectName', i18nKey: 'sixthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'gainClick', title: 'Общий доход', i18nKey: 'gainName', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'challenge6', title: 'Испытание 6', i18nKey: 'challenge6Name', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'reflashAlgo11', title: 'Алгоритм Рефлеша', i18nKey: 'reflashAlgoName', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'digiPerm1', title: 'Цифровизация (Сокровище 1.1)', i18nKey: 'digiPerm1Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'digiTemp1', title: 'Цифровизация (Сокровище 1.2)', i18nKey: 'digiTemp1Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'digiPerm2', title: 'Цифровизация (Сокровище 2)', i18nKey: 'digiPerm2Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'digiPerm5', title: 'Цифровизация (Сокровище 5.1)', i18nKey: 'digiPerm5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'digiTemp5', title: 'Цифровизация (Сокровище 5.2)', i18nKey: 'digiTemp5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'virusBuff', title: 'Вирусный эффект', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' }
    ];
    
    const softcapHTML = `
    <div id="lastClickStats">
        <div id="postE13SoftcapClick" class="multiplierString" style="display: flex;">
            <span id="postE13coinsSoftcapClickStats" class="whiteText" style="margin-left: 30px" data-i18n="postE13CoinSoftcap2">Пост-е13 Софткап</span>
            <span id="postE13coinsSoftcapClickStatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
        </div>
    </div>`;

    buildStatsUI('gainPerClickStats', 'gainPerClickGraphic', descriptors, 'Общий множитель', 'summaryClickStatsEffect', softcapHTML);
}
createGainPerClickUI();

function statsPerClickUpdate() {
    const gainWithoutPower = findMultiplierDecimal(GAIN.coin.click.no_softcap_effect().pow(1 / (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1)), (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1));

    // Базовое значение после софткапа (но до пост-множителей) для корректного расчета шкалы новых множителей
    const softcapBaseValue = applyDecimalSoftcap(GAIN.coin.click);

    const superSummary = GAIN.coin.click.no_softcap_effect() * GAIN.coin.click.post_softcap_effect()

    const sources = [
        { effectValue: () => UPGS.coin.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'doublerStatsEffect', pieceId: 'doublerPiece', piecePercentId: 'doublerPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.coin.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'midasCursorStatsEffect', pieceId: 'midasCursorPiece', piecePercentId: 'midasCursorPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.coin.singles[23].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'rewardForFeatsStatsEffect', pieceId: 'rewardForFeatsPiece', piecePercentId: 'rewardForFeatsPiecePercent', summary: () => superSummary },
        { effectValue: () => CHALL[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge1StatsEffect', pieceId: 'challenge1Piece', piecePercentId: 'challenge1PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shop.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenGloveStatsEffect', pieceId: 'goldenGlovePiece', piecePercentId: 'goldenGlovePiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shop.buyables[8].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenGlove2StatsEffect', pieceId: 'goldenGlove2Piece', piecePercentId: 'goldenGlove2PiecePercent', summary: () => superSummary },
        { effectValue: () => GAIN.coin.gain.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainClickStatsEffect', pieceId: 'gainClickPiece', piecePercentId: 'gainClickPiecePercent', summary: () => superSummary },
        
        { effectValue: () => (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1), effectPrefix: '^', effectMode: 'power', effectId: 'challenge6StatsEffect', pieceId: 'challenge6Piece', piecePercentId: 'challenge6PiecePercent', summary: () => superSummary, graphicValue: () => gainWithoutPower },
        // Новые источники (пост-софткап множители):
        { effectValue: () => player.reflash.algo.includes(11) ? UPGS.reflash.algo.tree[0].effect() : new Decimal(1), effectPrefix: 'x', effectMode: 'boost', effectId: 'reflashAlgo11StatsEffect', pieceId: 'reflashAlgo11Piece', piecePercentId: 'reflashAlgo11PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[1].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'digiPerm1StatsEffect', pieceId: 'digiPerm1Piece', piecePercentId: 'digiPerm1PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[1].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'digiTemp1StatsEffect', pieceId: 'digiTemp1Piece', piecePercentId: 'digiTemp1PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[2].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'digiPerm2StatsEffect', pieceId: 'digiPerm2Piece', piecePercentId: 'digiPerm2PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'digiPerm5StatsEffect', pieceId: 'digiPerm5Piece', piecePercentId: 'digiPerm5PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'digiTemp5StatsEffect', pieceId: 'digiTemp5Piece', piecePercentId: 'digiTemp5PiecePercent', summary: () => superSummary },
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 1) {
                return player.virus.effect.multiplier;
            }
            return new Decimal(1);
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'virusBuffStatsEffect', pieceId: 'virusBuffPiece', piecePercentId: 'virusBuffPiecePercent', summary: () => superSummary },
    ];

    applyStatsUpdate(sources, 'summaryClickStatsEffect', GAIN.coin.click.effect());
}

// --- ВКЛАДКА "В СЕКУНДУ" ---

function createGainPerSecondUI() {
    const descriptors = [
        { id: 'smallInvestment', title: 'Небольшая Инвестиция', i18nKey: 'smallInvestmentName', colorStyle: 'background-image: radial-gradient(#23e019, rgba(0, 0, 0, 0)210%)' },
        { id: 'multiplierUpgrade', title: 'Умножитель', i18nKey: 'multiplierName', colorStyle: 'background-image: radial-gradient(#23e019, black 210%)' },
        { id: 'richFame', title: 'Богатая Слава', i18nKey: 'richFameName', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'negativeAlpha', title: 'Негативная альфа частичка', i18nKey: 'negativeAlphaName', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'goldenClock', title: 'Золотые часы', i18nKey: 'goldenClockName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'goldenClock2', title: 'Золотые часы II', i18nKey: 'sixthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'achievement15', title: 'Достижение 15', i18nKey: 'achievement15Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'challenge8', title: 'Испытание 8', i18nKey: 'challenge8Name', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'challenge3', title: 'Испытание 3', i18nKey: 'challenge3Name', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'gainSecond', title: 'Общий доход', i18nKey: 'gainName', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'secReflashAlgo11', title: 'Алгоритм Рефлеша', i18nKey: 'reflashAlgoName', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'secDigiPerm1', title: 'Цифровизация (Сокровище 1.1)', i18nKey: 'digiPerm1Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'secDigiTemp1', title: 'Цифровизация (Сокровище 1.2)', i18nKey: 'digiTemp1Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'secDigiPerm2', title: 'Цифровизация (Сокровище 2)', i18nKey: 'digiPerm2Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'secDigiPerm5', title: 'Цифровизация (Сокровище 5.1)', i18nKey: 'digiPerm5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'secDigiTemp5', title: 'Цифровизация (Сокровище 5.2)', i18nKey: 'digiTemp5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'secVirusBuff', title: 'Вирусный эффект', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' }
    ];

    const softcapHTML = `
    <div id="postE13SoftcapSecond" class="multiplierString" style="display: flex;">
        <span id="postE13coinsSoftcapSecondStats" class="whiteText" style="margin-left: 30px" data-i18n="postE13CoinSoftcap1">Пост-е13 Софткап</span>
        <span id="postE13coinsSoftcapSecondStatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    buildStatsUI('gainPerSecondStats', 'gainPerSecondGraphic', descriptors, 'Общий множитель', 'summarySecondStatsEffect', softcapHTML);
}
createGainPerSecondUI();

function statsPerSecondUpdate() {
    // Считаем единый супер-суммри для шкал без ломающих софткапов
    const superSummary = new Decimal(GAIN.coin.second.no_softcap_effect()).mul(GAIN.coin.second.post_softcap_effect());

    const sources = [
        { effectValue: () => UPGS.coin.buyables[1].effect(), effectPrefix: '+', effectMode: 'number', effectId: 'smallInvestmentStatsEffect', pieceId: 'smallInvestmentPiece', piecePercentId: 'smallInvestmentPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.coin.buyables[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'multiplierUpgradeStatsEffect', pieceId: 'multiplierUpgradePiece', piecePercentId: 'multiplierUpgradePiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.coin.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'richFameStatsEffect', pieceId: 'richFamePiece', piecePercentId: 'richFamePiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.coin.singles[21].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'negativeAlphaStatsEffect', pieceId: 'negativeAlphaPiece', piecePercentId: 'negativeAlphaPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shop.buyables[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenClockStatsEffect', pieceId: 'goldenClockPiece', piecePercentId: 'goldenClockPiecePercent', summary: () => superSummary },
        { effectValue: () => (player.challenge.completed.includes(8) ? CHALL[8].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge8StatsEffect', pieceId: 'challenge8Piece', piecePercentId: 'challenge8PiecePercent', summary: () => superSummary },
        { effectValue: () => Math.pow(1+0.0001*player.clicks.simulated, ACHS.has(15)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement15StatsEffect', pieceId: 'achievement15Piece', piecePercentId: 'achievement15PiecePercent', summary: () => superSummary },
        { effectValue: () => (player.challenge.completed.includes(3) ? CHALL[3].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge3StatsEffect', pieceId: 'challenge3Piece', piecePercentId: 'challenge3PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shop.buyables[9].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenClock2StatsEffect', pieceId: 'goldenClock2Piece', piecePercentId: 'goldenClock2PiecePercent', summary: () => superSummary },
        { effectValue: () => GAIN.coin.gain.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainSecondStatsEffect', pieceId: 'gainSecondPiece', piecePercentId: 'gainSecondPiecePercent', summary: () => superSummary },
        { effectValue: () => player.reflash.algo.includes(11) ? UPGS.reflash.algo.tree[0].effect() : new Decimal(1), effectPrefix: 'x', effectMode: 'boost', effectId: 'secReflashAlgo11StatsEffect', pieceId: 'secReflashAlgo11Piece', piecePercentId: 'secReflashAlgo11PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[1].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secDigiPerm1StatsEffect', pieceId: 'secDigiPerm1Piece', piecePercentId: 'secDigiPerm1PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[1].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secDigiTemp1StatsEffect', pieceId: 'secDigiTemp1Piece', piecePercentId: 'secDigiTemp1PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[2].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secDigiPerm2StatsEffect', pieceId: 'secDigiPerm2Piece', piecePercentId: 'secDigiPerm2PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secDigiPerm5StatsEffect', pieceId: 'secDigiPerm5Piece', piecePercentId: 'secDigiPerm5PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secDigiTemp5StatsEffect', pieceId: 'secDigiTemp5Piece', piecePercentId: 'secDigiTemp5PiecePercent', summary: () => superSummary },
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 1) {
                return player.virus.effect.multiplier;
            }
            return new Decimal(1);
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'secVirusBuffStatsEffect', pieceId: 'secVirusBuffPiece', piecePercentId: 'secVirusBuffPiecePercent', summary: () => superSummary }
    ];

    applyStatsUpdate(sources, 'summarySecondStatsEffect', GAIN.coin.second.effect());
}

// --- ВКЛАДКА "ДОХОД" (GAIN) ---

function createGainWholeUI() {
    const descriptors = [
        { id: 'alphaPower', title: 'Альфа-Сила', i18nKey: 'alphaPowerName', colorStyle: 'background-image: radial-gradient(#23e019, black 210%)' },
        { id: 'doublerPlus', title: 'Удвоитель+', i18nKey: 'doublerPlusName', colorStyle: 'background-image: radial-gradient(#1226ff, rgba(0, 0, 0, 0)210%)' },
        { id: 'cashBack', title: 'Кэшбэк', i18nKey: 'cashBack', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'goldenKey', title: 'Золотой ключ', i18nKey: 'goldenKeyName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'goldenKey2', title: 'Золотой ключ 2', i18nKey: 'sixthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'overdriveType1', title: 'Овердрайв', i18nKey: 'overdrive', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'achievement28', title: 'Достижение 28', i18nKey: 'achievement28Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'hourglass', title: 'Часы', i18nKey: 'pse9Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'antiHourglass', title: 'Анти-Часы', i18nKey: 'pse10Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'shards', title: 'Осколки', i18nKey: 'shardsName', colorStyle: 'background-image: radial-gradient(rgb(138, 255, 249), black 210%)' },
        { id: 'achievements', title: 'Достижения', i18nKey: 'achievementsName', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'secondMineralEffect1', title: 'Минерал', i18nKey: 'secondMineral2Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'umultiplier', title: 'У-множители', i18nKey: 'umultiplierName', colorStyle: 'background-image: radial-gradient(cadetblue, black 210%)' },
        { id: 'coinFactory', title: 'Фабрика монет', i18nKey: 'coinFactoryName', colorStyle: 'background-image: radial-gradient(cadetblue, black 210%)' },
        { id: 'fortuneBoostCoin', title: 'Усиление Фортуны', i18nKey: 'coinBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinsForGain', title: 'Плюс монет', i18nKey: 'plusCoinForCoinsName', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'pchall7', title: 'Испытание Престижа 7', i18nKey: 'pchall7Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'upower', title: 'У-сила', i18nKey: 'upowerName', colorStyle: 'background-image: radial-gradient(palevioletred, black 210%)' },
        { id: 'activity2', title: 'Активность 2', i18nKey: 'pse2Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'gainReflash11', title: 'Рефлеш (Алт. 11)', i18nKey: 'reflashUpg11Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'node71', title: 'Рефлеш (Алт. 11)', i18nKey: 'node71Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' }
    ];

    const softcapHTML = `
    <div id="postE15SoftcapGain" class="multiplierString" style="display: flex;">
        <span id="postE15SoftcapGainStats" class="whiteText" style="margin-left: 30px" data-i18n="postE15CoinSoftcap">Пост-е15 Софткап</span>
        <span id="postE15SoftcapGainStatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    buildStatsUI('wholeGainStats', 'wholeGainGraphic', descriptors, 'Общий множитель', 'summaryGainStatsEffect', softcapHTML);
}
createGainWholeUI();

function statsGainUpdate() {
    const gainWithoutPower1 = findMultiplierDecimal(GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.prestige.singles[12].effect()), UPGS.prestige.singles[12].effect());
    const temp1 = GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.prestige.singles[12].effect());
    const gainWithoutPower2 = findMultiplierDecimal(temp1.pow(1 / GAIN.upower.effect()), GAIN.upower.effect());

    // Собираем надежный супер-суммарный множитель для шкал (включая рефлеш, если открыт)

    const sources = [
        { effectValue: () => UPGS.coin.buyables[5].effect(), effectPrefix: '+', effectMode: 'number', effectId: 'alphaPowerStatsEffect', pieceId: 'alphaPowerPiece', piecePercentId: 'alphaPowerPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[13].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'doublerPlusStatsEffect', pieceId: 'doublerPlusPiece', piecePercentId: 'doublerPlusPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[22].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'cashBackStatsEffect', pieceId: 'cashBackPiece', piecePercentId: 'cashBackPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenKeyStatsEffect', pieceId: 'goldenKeyPiece', piecePercentId: 'goldenKeyPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[10].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenKey2StatsEffect', pieceId: 'goldenKey2Piece', piecePercentId: 'goldenKey2PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UNL.overdrive.type1.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'overdriveType1StatsEffect', pieceId: 'overdriveType1Piece', piecePercentId: 'overdriveType1PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => ACHS.effect.coin(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementsStatsEffect', pieceId: 'achievementsPiece', piecePercentId: 'achievementsPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => Math.pow(4, player.achievements.includes(28)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement28StatsEffect', pieceId: 'achievement28Piece', piecePercentId: 'achievement28PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.prestige.singles[31].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'hourglassStatsEffect', pieceId: 'hourglassPiece', piecePercentId: 'hourglassPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.prestige.singles[32].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'antiHourglassStatsEffect', pieceId: 'antiHourglassPiece', piecePercentId: 'antiHourglassPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => GAIN.shard.effect.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardsStatsEffect', pieceId: 'shardsPiece', piecePercentId: 'shardsPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.minerals[2].effect1(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondMineralEffect1StatsEffect', pieceId: 'secondMineralEffect1Piece', piecePercentId: 'secondMineralEffect1PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => GAIN.umultiplier.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'umultiplierStatsEffect', pieceId: 'umultiplierPiece', piecePercentId: 'umultiplierPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UNL.shard_achievements[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'coinFactoryStatsEffect', pieceId: 'coinFactoryPiece', piecePercentId: 'coinFactoryPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.fortune.boosts[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCoinStatsEffect', pieceId: 'fortuneBoostCoinPiece', piecePercentId: 'fortuneBoostCoinPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => MISC.balance.plusCoins.buff().coinBuff, effectPrefix: 'x', effectMode: 'boost', effectId: 'plusCoinsForGainStatsEffect', pieceId: 'plusCoinsForGainPiece', piecePercentId: 'plusCoinsForGainPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => PRES_CHALLENGE[7].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'pchall7StatsEffect', pieceId: 'pchall7Piece', piecePercentId: 'pchall7PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => GAIN.upower.effect(), effectPrefix: '^', effectMode: 'power', effectId: 'upowerStatsEffect', pieceId: 'upowerPiece', piecePercentId: 'upowerPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower2 },
        { effectValue: () => UPGS.prestige.singles[12].effect(), effectPrefix: '^', effectMode: 'power', effectId: 'activity2StatsEffect', pieceId: 'activity2Piece', piecePercentId: 'activity2PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower1 },
        
        // Добавляем новый источник рефлеша в массив sources:
        { effectValue: () => UPGS.reflash.singles[11].unl() ? UPGS.reflash.singles[11].effect() : new Decimal(1), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainReflash11StatsEffect', pieceId: 'gainReflash11Piece', piecePercentId: 'gainReflash11PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => player.reflash.algo.includes(71) ? UPGS.reflash.algo.tree[17].effect() : new Decimal(1), effectPrefix: 'x', effectMode: 'boost', effectId: 'node71StatsEffect', pieceId: 'node71Piece', piecePercentId: 'node71PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() }

        
    ];

    applyStatsUpdate(sources, 'summaryGainStatsEffect', GAIN.coin.gain.effect());
}

// --- ВКЛАДКА "СУПЕР-МОНЕТЫ (ШАНС)" ---

function createSuperCoinChanceUI() {
    const descriptors = [
        { id: 'luckyClover', title: 'Клевер удачи', i18nKey: 'luckyCloverName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'luckyClover2', title: 'Клевер удачи II', i18nKey: 'sixthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'charisma', title: 'Харизма', i18nKey: 'charismaName', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'thirdSingleSuperEffect', title: 'Третий Сингл', i18nKey: 'thirdSingleSuperEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstSuperCrystalEffect', title: 'Супер-кристалл', i18nKey: 'firstSuperCrystalEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'firstMineralEffect3', title: 'Минерал', i18nKey: 'firstMineralEffect3Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'superDvor', title: 'Супер-двор', i18nKey: 'superDvorName', colorStyle: 'background-image: radial-gradient(rgb(253, 206, 78), black 210%)' },
        { id: 'hercCursor', title: 'Геркулес', i18nKey: 'hercCursorName', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'fortuneBoostSupercoin', title: 'Фортуна', i18nKey: 'supercoinBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinForSupercoin', title: '+Монеты', i18nKey: 'plusCoinForSupercoinsName', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'scDigiPerm3', title: 'Цифровизация (Сокровище 3.1)', i18nKey: 'digiPerm3Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'scDigiTemp2', title: 'Цифровизация (Сокровище 2.2)', i18nKey: 'digiTemp2Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'scVirusBuff4', title: 'Вирусный эффект (Тип 4)', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'achievement73', title: 'Достижение 73', i18nKey: 'achievement73Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'achievement37', title: 'Достижение 37', i18nKey: 'achievement37Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'scDigiTemp3', title: 'Цифровизация (Сокровище 3.2)', i18nKey: 'digiTemp3Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' }
    ];

    buildStatsUI('superCoinsChanceStats', 'superCoinsChanceGraphic', descriptors, 'Общий множитель', 'summarySCChanceStatsEffect');
}
createSuperCoinChanceUI();

function statsSuperCoinChanceUpdate() {
    const ach37Graphic = () => findMultiplierInAdditive(ACHS.has(37), GAIN.supercoin.chance());
    const digiTemp3Val = TREASURES.event.digitalization[3].temporary.effect();
    const digiTemp3Graphic = () => findMultiplierInAdditive(digiTemp3Val, GAIN.supercoin.chance());

    // Базовый суммарный итог шанса для шкал
    const totalChance = GAIN.supercoin.chance();

    const sources = [
        { effectValue: () => UPGS.shop.buyables[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'luckyCloverStatsEffect', pieceId: 'luckyCloverPiece', piecePercentId: 'luckyCloverPiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.shop.buyables[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'luckyClover2StatsEffect', pieceId: 'luckyClover2Piece', piecePercentId: 'luckyClover2PiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.coin.singles[13].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdSingleSuperEffectStatsEffect', pieceId: 'thirdSingleSuperEffectPiece', piecePercentId: 'thirdSingleSuperEffectPiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.prestige.singles[13].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'charismaStatsEffect', pieceId: 'charismaPiece', piecePercentId: 'charismaPiecePercent', summary: () => totalChance },
        { effectValue: () => (Math.pow(1.5, UPGS.supercrystal[11].unl())), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstSuperCrystalEffectStatsEffect', pieceId: 'firstSuperCrystalEffectPiece', piecePercentId: 'firstSuperCrystalEffectPiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.minerals[1].effect3(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect3StatsEffect', pieceId: 'firstMineralEffect3Piece', piecePercentId: 'firstMineralEffect3PiecePercent', summary: () => totalChance },
        { effectValue: () => UNL.shard_achievements[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'superDvorStatsEffect', pieceId: 'superDvorPiece', piecePercentId: 'superDvorPiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.prestige.break.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'hercCursorStatsEffect', pieceId: 'hercCursorPiece', piecePercentId: 'hercCursorPiecePercent', summary: () => totalChance },
        { effectValue: () => UPGS.fortune.boosts[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostSupercoinStatsEffect', pieceId: 'fortuneBoostSupercoinPiece', piecePercentId: 'fortuneBoostSupercoinPiecePercent', summary: () => totalChance },
        { effectValue: () => MISC.balance.plusCoins.buff().chanceBuffer, effectPrefix: 'x', effectMode: 'boost', effectId: 'plusCoinForSupercoinStatsEffect', pieceId: 'plusCoinForSupercoinPiece', piecePercentId: 'plusCoinForSupercoinPiecePercent', summary: () => totalChance },
        { effectValue: () => TREASURES.event.digitalization[3].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'scDigiPerm3StatsEffect', pieceId: 'scDigiPerm3Piece', piecePercentId: 'scDigiPerm3PiecePercent', summary: () => totalChance },
        { effectValue: () => TREASURES.event.digitalization[2].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'scDigiTemp2StatsEffect', pieceId: 'scDigiTemp2Piece', piecePercentId: 'scDigiTemp2PiecePercent', summary: () => totalChance },
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 4) {
                return player.virus.effect.multiplier;
            }
            return 1;
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'scVirusBuff4StatsEffect', pieceId: 'scVirusBuff4Piece', piecePercentId: 'scVirusBuff4PiecePercent', summary: () => totalChance },
        { effectValue: () => Math.pow(1.1, ACHS.has(73)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement73StatsEffect', pieceId: 'achievement73Piece', piecePercentId: 'achievement73PiecePercent', summary: () => totalChance },
        { effectValue: () => Number(ACHS.has(37)), effectPrefix: '+', effectMode: 'boost', effectId: 'achievement37StatsEffect', pieceId: 'achievement37Piece', piecePercentId: 'achievement37PiecePercent', summary: () => totalChance, graphicValue: ach37Graphic },
        { effectValue: () => digiTemp3Val, effectPrefix: '+', effectMode: 'boost', effectId: 'scDigiTemp3StatsEffect', pieceId: 'scDigiTemp3Piece', piecePercentId: 'scDigiTemp3PiecePercent', summary: () => totalChance, graphicValue: digiTemp3Graphic },
    ];

    applyStatsUpdate(sources, 'summarySCChanceStatsEffect', GAIN.supercoin.chance(), 'boost', '');
    document.getElementById('summarySCChanceStatsEffect').innerHTML += '%'; // Докидываем % в конец
}

// --- ВКЛАДКА "КРИСТАЛЛЫ" ---

function createCrystalsUI() {
    const descriptors = [
        { id: 'baseCrystal', title: 'Удвоитель', i18nKey: 'baseCrystalName', colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'achievement282', title: 'Удвоитель', i18nKey: 'achievement28Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'brilliantDoubler', title: 'Удвоитель', i18nKey: 'brilliantDoublerName', colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'recycling', title: 'Удвоитель', i18nKey: 'recyclingName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'challenge10', title: 'Испытание 10', i18nKey: 'challenge10Name', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'crystalBoost', title: 'Кристаллический Усилитель', i18nKey: 'crystalBoostName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'overdrive2Effect', title: 'Кристаллический Усилитель', i18nKey: 'overdrive2Name', colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'thirdMineralEffect1', title: 'Кристаллический Усилитель', i18nKey: 'thirdMineralEffect1Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'secondSuperCrystalSingleEffect', title: 'Кристаллический Усилитель', i18nKey: 'secondSuperCrystalSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'prestigeFame', title: 'Кристаллический Усилитель', i18nKey: 'prestigeFameName', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'crystalShAch', title: 'Кристаллический Усилитель', i18nKey: 'crystalShAchName', colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'fortuneBoostCrystal', title: 'Альфа-Усилитель', i18nKey: 'crystalBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'minusCoinsForCrystals', title: 'Альфа-Усилитель', i18nKey: 'minusCoinForCrystalsName', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'pchall1', title: 'Испытание Престижа 1', i18nKey: 'pchall1Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'achievementBonus2', title: 'Кристаллический Усилитель', i18nKey: 'achievementBonus2Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'crystalDigiPerm4', title: 'Цифровизация (Сокровище 4.1)', i18nKey: 'digiPerm4Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'crystalDigiTemp4', title: 'Цифровизация (Сокровище 4.2)', i18nKey: 'digiTemp4Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'crystalDigiPerm5', title: 'Цифровизация (Сокровище 5.1)', i18nKey: 'digiPerm5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'crystalDigiTemp5', title: 'Цифровизация (Сокровище 5.2)', i18nKey: 'digiTemp5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'crystalVirusBuff2', title: 'Вирусный эффект (Тип 2)', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'crystalReflashSingle12', title: 'Рефлеш (Сингл 12)', i18nKey: 'reflashUpg12Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'crystalReflashAlgo22', title: 'Алгоритм Рефлеша (22)', i18nKey: 'reflashAlgo22Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'node81', title: 'Рефлеш (Алт. 11)', i18nKey: 'node81Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' }
    ];

    const softcapHTML = `
    <div id="postE50SoftcapCrystal" class="multiplierString" style="display: flex;">
        <span id="CRYSTAL_GAIN_SC_001Stats" class="whiteText" style="margin-left: 30px" data-i18n="postE50CrystalSoftcap">Пост-е50 Софткап</span>
        <span id="CRYSTAL_GAIN_SC_001StatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    buildStatsUI('crystalsMultiplierStats', 'crystalsMultiplierGraphic', descriptors, 'Общий множитель', 'summaryCrystalStatsEffect', softcapHTML);
}
createCrystalsUI();

function statsCrystalsUpdate() {
    const gain = GAIN.crystal.base()
    
    const superSummary = GAIN.crystal.no_softcap_reset() * GAIN.crystal.post_softcap_effect();

    const sources = [
        { effectValue: () => gain, effectPrefix: 'x', effectMode: 'boost', effectId: 'baseCrystalStatsEffect', pieceId: 'baseCrystalPiece', piecePercentId: 'baseCrystalPiecePercent', summary: () => superSummary },
        { effectValue: () => Math.pow(4, ACHS.has(28)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement282StatsEffect', pieceId: 'achievement282Piece', piecePercentId: 'achievement282PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.prestige.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'brilliantDoublerStatsEffect', pieceId: 'brilliantDoublerPiece', piecePercentId: 'brilliantDoublerPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shard.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'recyclingStatsEffect', pieceId: 'recyclingPiece', piecePercentId: 'recyclingPiecePercent', summary: () => superSummary },
        { effectValue: () => (player.challenge.completed.includes(10) ? CHALL[10].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge10StatsEffect', pieceId: 'challenge10Piece', piecePercentId: 'challenge10PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.shop.buyables[16].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalBoostStatsEffect', pieceId: 'crystalBoostPiece', piecePercentId: 'crystalBoostPiecePercent', summary: () => superSummary },
        { effectValue: () => UNL.overdrive.type2.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'overdrive2EffectStatsEffect', pieceId: 'overdrive2EffectPiece', piecePercentId: 'overdrive2EffectPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.minerals[3].effect1(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdMineralEffect1StatsEffect', pieceId: 'thirdMineralEffect1Piece', piecePercentId: 'thirdMineralEffect1PiecePercent', summary: () => superSummary },
        { effectValue: () => Math.pow(3, UPGS.supercrystal[12].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondSuperCrystalSingleEffectStatsEffect', pieceId: 'secondSuperCrystalSingleEffectPiece', piecePercentId: 'secondSuperCrystalSingleEffectPiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.prestige.break.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFameStatsEffect', pieceId: 'prestigeFamePiece', piecePercentId: 'prestigeFamePiecePercent', summary: () => superSummary },
        { effectValue: () => UNL.shard_achievements[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalShAchStatsEffect', pieceId: 'crystalShAchPiece', piecePercentId: 'crystalShAchPiecePercent', summary: () => superSummary },
        { effectValue: () => ACHS.effect.crystal(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus2StatsEffect', pieceId: 'achievementBonus2Piece', piecePercentId: 'achievementBonus2PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.fortune.boosts[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCrystalStatsEffect', pieceId: 'fortuneBoostCrystalPiece', piecePercentId: 'fortuneBoostCrystalPiecePercent', summary: () => superSummary },
        { effectValue: () => MISC.balance.minusCoins.buff().crystalGainBuff, effectPrefix: 'x', effectMode: 'boost', effectId: 'minusCoinsForCrystalsStatsEffect', pieceId: 'minusCoinsForCrystalsPiece', piecePercentId: 'minusCoinsForCrystalsPiecePercent', summary: () => superSummary },
        { effectValue: () => player.prestige.challenge.completed.includes(1) ? PRES_CHALLENGE[1].effect() : 1, effectPrefix: 'x', effectMode: 'boost', effectId: 'pchall1StatsEffect', pieceId: 'pchall1Piece', piecePercentId: 'pchall1PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[4].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalDigiPerm4StatsEffect', pieceId: 'crystalDigiPerm4Piece', piecePercentId: 'crystalDigiPerm4PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[4].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalDigiTemp4StatsEffect', pieceId: 'crystalDigiTemp4Piece', piecePercentId: 'crystalDigiTemp4PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalDigiPerm5StatsEffect', pieceId: 'crystalDigiPerm5Piece', piecePercentId: 'crystalDigiPerm5PiecePercent', summary: () => superSummary },
        { effectValue: () => TREASURES.event.digitalization[5].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalDigiTemp5StatsEffect', pieceId: 'crystalDigiTemp5Piece', piecePercentId: 'crystalDigiTemp5PiecePercent', summary: () => superSummary },
        
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 2) {
                return player.virus.effect.multiplier;
            }
            return 1;
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalVirusBuff2StatsEffect', pieceId: 'crystalVirusBuff2Piece', piecePercentId: 'crystalVirusBuff2PiecePercent', summary: () => superSummary },
        { effectValue: () => UPGS.reflash.algo.tree[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalReflashAlgo22StatsEffect', pieceId: 'crystalReflashAlgo22Piece', piecePercentId: 'crystalReflashAlgo22PiecePercent', summary: () => superSummary },
        { effectValue: () => player.reflash.algo.includes(81) ? UPGS.reflash.algo.tree[18].effect() : new Decimal(1), effectPrefix: 'x', effectMode: 'boost', effectId: 'node81StatsEffect', pieceId: 'node81Piece', piecePercentId: 'node81PiecePercent', summary: () => superSummary},
        { effectValue: () => UPGS.reflash.singles[12].unl() ? UPGS.reflash.singles[12].effect() : 1, effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalReflashSingle12StatsEffect', pieceId: 'crystalReflashSingle12Piece', piecePercentId: 'crystalReflashSingle12PiecePercent', summary: () => superSummary },

        { effectValue: () => GAIN.crystal.softcap().softcap_power, effectPrefix: '^', effectMode: 'power', effectId: 'CRYSTAL_GAIN_SC_001StatsEffect' }
    ];

    applyStatsUpdate(sources, 'summaryCrystalStatsEffect', GAIN.crystal.reset());
}

// --- ОСКОЛКИ (SHARDS) ---
function createShardsUI() {
    buildStatsUI('shardsPerClickStats', 'shardsPerClickGraphic', [
        { id: 'firstShardBuyableEffect', title: 'Удвоитель', i18nKey: 'firstShardBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect', title: 'Удвоитель', i18nKey: 'firstShardBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'ninthSuperCrystalSingleEffect', title: 'Удвоитель', i18nKey: 'ninthSuperCrystalSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'fortuneBoostShardClick', title: 'Альфа-Усилитель', i18nKey: 'shardBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'breakPrestigeBuyable31', title: 'Удвоитель', i18nKey: 'triplerName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'shardClickDigiPerm5', title: 'Цифровизация (Сокровище 5.1)', i18nKey: 'digiPerm5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'shardClickDigiTemp5', title: 'Цифровизация (Сокровище 5.2)', i18nKey: 'digiTemp5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'shardClickVirus3', title: 'Вирусный эффект (Тип 3)', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'shardClickReflashAlgo42', title: 'Алгоритм Рефлеша (42)', i18nKey: 'reflashAlgo42Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'nodeshClick91', title: 'Рефлеш (Алт. 11)', i18nKey: 'node91Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' }
    ], 'Общий множитель', 'summaryShPerClickStatsEffect');

    buildStatsUI('shardsPerSecondStats', 'shardsPerSecondGraphic', [
        { id: 'secondShardBuyableEffect', title: 'Удвоитель', i18nKey: 'secondShardBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect2', title: 'Удвоитель', i18nKey: 'fifthShopBuyableEffectStats2Name', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'thirdMineralEffect2', title: 'Удвоитель', i18nKey: 'thirdMineralEffect2Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'shardShAch', title: 'Удвоитель', i18nKey: 'shardShAchName', colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'achievement39', title: 'Удвоитель', i18nKey: 'achievement39Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'fortuneBoostShardSecond', title: 'Удвоитель', i18nKey: 'shardBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'breakPrestigeBuyable32', title: 'Удвоитель', i18nKey: 'triplerName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'achievementBonus3', title: 'Удвоитель', i18nKey: 'achievementBonus3Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'shardSecDigiPerm5', title: 'Цифровизация (Сокровище 5.1)', i18nKey: 'digiPerm5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'shardSecDigiTemp5', title: 'Цифровизация (Сокровище 5.2)', i18nKey: 'digiTemp5Name', colorStyle: 'background-image: radial-gradient(rgb(255, 215, 130), black 210%)' },
        { id: 'shardSecVirus3', title: 'Вирусный эффект (Тип 3)', i18nKey: 'virusBuffName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'shardSecReflashAlgo42', title: 'Алгоритм Рефлеша (42)', i18nKey: 'reflashAlgo42Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' },
        { id: 'nodeshSecond91', title: 'Рефлеш (Алт. 11)', i18nKey: 'node91Name', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' }
    ], 'Общий множитель', 'summaryShPerSecondStatsEffect');

    const effectDescriptors = [
        { id: 'shard', title: 'Удвоитель', i18nKey: 'shardName', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'achievement30', title: 'Удвоитель', i18nKey: 'achievement30Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'fourthShardSingleEffect', title: 'Удвоитель', i18nKey: 'fourthShardSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'challengeReward7', title: 'Удвоитель', i18nKey: 'challengeReward7Name', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'pchall3', title: 'Испытание Престижа 3', i18nKey: 'pchall3Name', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
    ];

    const softcapHTML = `
    <div id="postE7SoftcapShard" class="multiplierString" style="display: flex;">
        <span id="SHARD_EFF_SC_001Stats" class="whiteText" style="margin-left: 30px" data-i18n="postE7ShardSoftcap">Пост-e7 Софткап</span>
        <span id="SHARD_EFF_SC_001StatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    buildStatsUI('shardsEffectStats', 'shardsEffectGraphic', effectDescriptors, 'Общий множитель', 'summaryShEffectStatsEffect', softcapHTML);
}
createShardsUI();

function statsShardsPerClickUpdate() {
    const totalClick = GAIN.shard.click();

    applyStatsUpdate([
        { effectValue: () => UPGS.shard.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstShardBuyableEffectStatsEffect', pieceId: 'firstShardBuyableEffectPiece', piecePercentId: 'firstShardBuyableEffectPiecePercent', summary: () => totalClick },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffectStatsEffect', pieceId: 'fifthShopBuyableEffectPiece', piecePercentId: 'fifthShopBuyableEffectPiecePercent', summary: () => totalClick },
        { effectValue: () => Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthSuperCrystalSingleEffectStatsEffect', pieceId: 'ninthSuperCrystalSingleEffectPiece', piecePercentId: 'ninthSuperCrystalSingleEffectPiecePercent', summary: () => totalClick },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardClickStatsEffect', pieceId: 'fortuneBoostShardClickPiece', piecePercentId: 'fortuneBoostShardClickPiecePercent', summary: () => totalClick },
        { effectValue: () => UPGS.prestige.break.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'breakPrestigeBuyable31StatsEffect', pieceId: 'breakPrestigeBuyable31Piece', piecePercentId: 'breakPrestigeBuyable31PiecePercent', summary: () => totalClick },
        { effectValue: () => TREASURES.event.digitalization[5].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardClickDigiPerm5StatsEffect', pieceId: 'shardClickDigiPerm5Piece', piecePercentId: 'shardClickDigiPerm5PiecePercent', summary: () => totalClick },
        { effectValue: () => TREASURES.event.digitalization[5].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardClickDigiTemp5StatsEffect', pieceId: 'shardClickDigiTemp5Piece', piecePercentId: 'shardClickDigiTemp5PiecePercent', summary: () => totalClick },
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 3) {
                return player.virus.effect.multiplier;
            }
            return 1;
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'shardClickVirus3StatsEffect', pieceId: 'shardClickVirus3Piece', piecePercentId: 'shardClickVirus3PiecePercent', summary: () => totalClick },
        { effectValue: () => UPGS.reflash.algo.tree[10].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardClickReflashAlgo42StatsEffect', pieceId: 'shardClickReflashAlgo42Piece', piecePercentId: 'shardClickReflashAlgo42PiecePercent', summary: () => totalClick },
        { effectValue: () => UPGS.reflash.algo.tree[19].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'nodeshClick91StatsEffect', pieceId: 'nodeshClick91Piece', piecePercentId: 'nodeshClick91PiecePercent', summary: () => totalClick },
    ], 'summaryShPerClickStatsEffect', totalClick);
}

function statsShardsPerSecondUpdate() {
    const totalSecond = GAIN.shard.second();

    applyStatsUpdate([
        { effectValue: () => UPGS.shard.buyables[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondShardBuyableEffectStatsEffect', pieceId: 'secondShardBuyableEffectPiece', piecePercentId: 'secondShardBuyableEffectPiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffect2StatsEffect', pieceId: 'fifthShopBuyableEffect2Piece', piecePercentId: 'fifthShopBuyableEffect2PiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.minerals[3].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdMineralEffect2StatsEffect', pieceId: 'thirdMineralEffect2Piece', piecePercentId: 'thirdMineralEffect2PiecePercent', summary: () => totalSecond },
        { effectValue: () => UNL.shard_achievements[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardShAchStatsEffect', pieceId: 'shardShAchPiece', piecePercentId: 'shardShAchPiecePercent', summary: () => totalSecond },
        { effectValue: () => Math.pow(1.337, ACHS.has(39)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement39StatsEffect', pieceId: 'achievement39Piece', piecePercentId: 'achievement39PiecePercent', summary: () => totalSecond },
        { effectValue: () => ACHS.effect.shard(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus3StatsEffect', pieceId: 'achievementBonus3Piece', piecePercentId: 'achievementBonus3PiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardSecondStatsEffect', pieceId: 'fortuneBoostShardSecondPiece', piecePercentId: 'fortuneBoostShardSecondPiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.prestige.break.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'breakPrestigeBuyable32StatsEffect', pieceId: 'breakPrestigeBuyable32Piece', piecePercentId: 'breakPrestigeBuyable32PiecePercent', summary: () => totalSecond },
        { effectValue: () => TREASURES.event.digitalization[5].permanent.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardSecDigiPerm5StatsEffect', pieceId: 'shardSecDigiPerm5Piece', piecePercentId: 'shardSecDigiPerm5PiecePercent', summary: () => totalSecond },
        { effectValue: () => TREASURES.event.digitalization[5].temporary.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardSecDigiTemp5StatsEffect', pieceId: 'shardSecDigiTemp5Piece', piecePercentId: 'shardSecDigiTemp5PiecePercent', summary: () => totalSecond },
        { effectValue: () => {
            if (player.virus.effect.time > 0 && player.virus.effect.type == 3) {
                return player.virus.effect.multiplier;
            }
            return 1;
        }, effectPrefix: 'x', effectMode: 'boost', effectId: 'shardSecVirus3StatsEffect', pieceId: 'shardSecVirus3Piece', piecePercentId: 'shardSecVirus3PiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.reflash.algo.tree[10].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardSecReflashAlgo42StatsEffect', pieceId: 'shardSecReflashAlgo42Piece', piecePercentId: 'shardSecReflashAlgo42PiecePercent', summary: () => totalSecond },
        { effectValue: () => UPGS.reflash.algo.tree[19].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'nodeshSecond91StatsEffect', pieceId: 'nodeshSecond91Piece', piecePercentId: 'nodeshSecond91PiecePercent', summary: () => totalSecond },
    ], 'summaryShPerSecondStatsEffect', totalSecond);
}

function statsShardsEffectUpdate() {
    applyStatsUpdate([
        { effectValue: () => 1 + player.shard.currency / 100, effectPrefix: 'x', effectMode: 'boost', effectId: 'shardStatsEffect', pieceId: 'shardPiece', piecePercentId: 'shardPiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement30StatsEffect', pieceId: 'achievement30Piece', piecePercentId: 'achievement30PiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => UPGS.shard.singles[21].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fourthShardSingleEffectStatsEffect', pieceId: 'fourthShardSingleEffectPiece', piecePercentId: 'fourthShardSingleEffectPiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => (player.challenge.completed.includes(7) ? CHALL[7].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challengeReward7StatsEffect', pieceId: 'challengeReward7Piece', piecePercentId: 'challengeReward7PiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => PRES_CHALLENGE[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'pchall3StatsEffect', pieceId: 'pchall3Piece', piecePercentId: 'pchall3PiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => GAIN.shard.effect.softcap().softcap_power, effectPrefix: '^', effectMode: 'power', effectId: 'SHARD_EFF_SC_001StatsEffect' }
    ], 'summaryShEffectStatsEffect', GAIN.shard.effect.effect());
}

// --- КРИТ. ШАНС (UI ГЕНЕРИРУЕМ, ФУНКЦИЮ ОБНОВЛЕНИЯ ПРОПУСКАЕМ) ---

function createCritChanceUI() {
    buildStatsUI('critChanceStats', 'critChanceGraphic', [
        { id: 'baseCriticalChanceEffect', title: 'Удвоитель', i18nKey: 'baseCriticalChanceEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fourthSuperCrystalSingleEffect', title: 'Удвоитель', i18nKey: 'fourthSuperCrystalSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'eighthShopBuyableEffect', title: 'Удвоитель', i18nKey: 'eighthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect1', title: 'Удвоитель', i18nKey: 'firstMineralEffect1Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critChShAch', title: 'Удвоитель', i18nKey: 'critChShAchName', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'fortuneBoostCritChance', title: 'Альфа-Усилитель', i18nKey: 'critChanceBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinsForCritChance', title: 'Альфа-Усилитель', i18nKey: 'plusCoinForCritChanceName', colorStyle: 'background-image: radial-gradient(white, black 210%)' }
    ], 'Общий множитель', 'summaryCritChanceStatsEffect');
}
createCritChanceUI();

// Функция statsCritChanceUpdate остается твоя оригинальная (не вставляю ее сюда, чтобы не затирать твою логику весов)

function statsCritChanceUpdate() {
    const setIf = (id, text) => { const el = document.getElementById(id); if (el) el.innerHTML = text; }
    
    // Обновляем текстовые значения
    setIf('baseCriticalChanceEffectStatsEffect', '+' + formatDecimal(GAIN.critical.baseChance, 'boost'));
    setIf('fourthSuperCrystalSingleEffectStatsEffect', '+' + formatDecimal(UPGS.supercrystal[21].unl() ? 2 : 0, 'boost'));
    setIf('eighthShopBuyableEffectStatsEffect', '+' + formatDecimal(UPGS.shop.buyables[17].effect(), 'boost'));
    setIf('firstMineralEffect1StatsEffect', 'x' + formatDecimal(UPGS.minerals[1].effect1(), 'boost'));
    setIf('critChShAchStatsEffect', 'x' + formatDecimal(UNL.shard_achievements[8].effect(), 'boost'));
    setIf('fortuneBoostCritChanceStatsEffect', 'x' + formatDecimal(UPGS.fortune.boosts[5].effect(), 'boost'));
    setIf('plusCoinsForCritChanceStatsEffect', 'x' + formatDecimal(MISC.balance.plusCoins.buff().chanceBuffer, 'boost'));

    const additiveSources = [
        { raw: GAIN.critical.baseChance, pid: 'baseCriticalChanceEffectPiece', ppid: 'baseCriticalChanceEffectPiecePercent' },
        { raw: (UPGS.supercrystal[21].unl() ? 2 : 0), pid: 'fourthSuperCrystalSingleEffectPiece', ppid: 'fourthSuperCrystalSingleEffectPiecePercent' },
        { raw: UPGS.shop.buyables[17].effect(), pid: 'eighthShopBuyableEffectPiece', ppid: 'eighthShopBuyableEffectPiecePercent' }
    ];

    const multiplicativeSources = [
        { raw: UPGS.minerals[1].effect1(), pid: 'firstMineralEffect1Piece', ppid: 'firstMineralEffect1PiecePercent' },
        { raw: UNL.shard_achievements[8].effect(), pid: 'critChShAchPiece', ppid: 'critChShAchPiecePercent' },
        { raw: UPGS.fortune.boosts[5].effect(), pid: 'fortuneBoostCritChancePiece', ppid: 'fortuneBoostCritChancePiecePercent' },
        { raw: MISC.balance.plusCoins.buff().chanceBuffer, pid: 'plusCoinsForCritChancePiece', ppid: 'plusCoinsForCritChancePiecePercent' },
    ];

    // 1. Считаем «веса» зон
    const sumAdd = additiveSources.reduce((sum, src) => sum + Math.max(0, src.raw), 0);
    
    const getLogWeight = (val) => {
        let num = Number(val);
        if (!isFinite(num) || num <= 1) return 0;
        return Math.log10(num);
    };

    const multWeights = multiplicativeSources.map(src => getLogWeight(src.raw));
    const sumMultWeights = multWeights.reduce((sum, w) => sum + w, 0);

    // Общий объем для пропорции между зонами (если соткап или пусто, страхуем от деления на ноль)
    // Можем дать аддитивной зоне базовый условный вес 1, если там есть хоть что-то, 
    // либо делить пропорционально суммарной значимости.
    const addZonePower = sumAdd > 0 ? sumAdd : 0;
    const multZonePower = sumMultWeights > 0 ? sumMultWeights : 0;
    const totalPower = addZonePower + multZonePower;

    // Если вообще ничего нет, гасим всё
    if (totalPower <= 0) {
        [...additiveSources, ...multiplicativeSources].forEach(src => {
            const pieceEl = document.getElementById(src.pid);
            const piecePercentEl = document.getElementById(src.ppid);
            if (pieceEl) pieceEl.style.display = 'none';
            if (piecePercentEl) piecePercentEl.innerHTML = '';
        });
        setIf('summaryCritChanceStatsEffect', formatDecimal(GAIN.critical.chance.multiplicative(), 'boost') + "%");
        return;
    }

    // Проценты высоты всей аддитивной и мультипликативной зоны от общей шкалы (в сумме дают 100%)
    const addZonePct = (addZonePower / totalPower) * 100;
    const multZonePct = (multZonePower / totalPower) * 100;

    // 2. АДДИТИВНАЯ ЗОНА
    additiveSources.forEach(src => {
        const pieceEl = document.getElementById(src.pid);
        const piecePercentEl = document.getElementById(src.ppid);
        if (!pieceEl || !piecePercentEl) return;

        if (src.raw <= 0 || sumAdd <= 0) {
            pieceEl.style.display = 'none';
            piecePercentEl.innerHTML = '';
            return;
        }

        // Доля внутри зоны * размер всей зоны от общей шкалы
        const localShare = src.raw / sumAdd;
        const finalPct = localShare * addZonePct;

        pieceEl.style.display = 'flex';
        pieceEl.style.height = `calc(${finalPct}% - 1px)`;
        piecePercentEl.innerHTML = (finalPct >= 3.0) ? finalPct.toFixed(2) + '%' : '';
    });

    // 3. МУЛЬТИПЛИКАТИВНАЯ ЗОНА
    multiplicativeSources.forEach((src, idx) => {
        const pieceEl = document.getElementById(src.pid);
        const piecePercentEl = document.getElementById(src.ppid);
        if (!pieceEl || !piecePercentEl) return;

        const w = multWeights[idx];
        if (w <= 0 || sumMultWeights <= 0) {
            pieceEl.style.display = 'none';
            piecePercentEl.innerHTML = '';
            return;
        }

        // Доля внутри зоны * размер всей зоны от общей шкалы
        const localShare = w / sumMultWeights;
        const finalPct = localShare * multZonePct;

        pieceEl.style.display = 'flex';
        pieceEl.style.height = `calc(${finalPct}% - 1px)`;
        piecePercentEl.innerHTML = (finalPct >= 3.0) ? finalPct.toFixed(2) + '%' : '';
    });

    setIf('summaryCritChanceStatsEffect', formatDecimal(GAIN.critical.chance.multiplicative(), 'boost') + "%");
}

// --- КРИТ. УРОН ---

function createCritMultiUI() {
    buildStatsUI('critMultiStats', 'critMultiGraphic', [
        { id: 'baseCriticalGainEffect', title: 'Удвоитель', i18nKey: 'baseCriticalGainEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fifthSuperCrystalSingleEffect', title: 'Удвоитель', i18nKey: 'fifthSuperCrystalSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'ninthShopBuyableEffect', title: 'Удвоитель', i18nKey: 'ninthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect2', title: 'Удвоитель', i18nKey: 'firstMineralEffect2Name', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critMuShAch', title: 'Удвоитель', i18nKey: 'critMuShAchName', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'thirdBuyableSuperEffect', title: 'Удвоитель', i18nKey: 'thirdBuyableSuperEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'fortuneBoostCritMulti', title: 'Альфа-Усилитель', i18nKey: 'critMultiplierBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ], 'Общий множитель', 'summaryCritMultiStatsEffect');
}
createCritMultiUI();

function statsCritMultiUpdate() {
    applyStatsUpdate([
        { effectValue: () => GAIN.critical.baseMult, effectPrefix: 'x', effectMode: 'boost', effectId: 'baseCriticalGainEffectStatsEffect', pieceId: 'baseCriticalGainEffectPiece', piecePercentId: 'baseCriticalGainEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => Math.pow(5, UPGS.supercrystal[22].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthSuperCrystalSingleEffectStatsEffect', pieceId: 'fifthSuperCrystalSingleEffectPiece', piecePercentId: 'fifthSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.shop.buyables[18].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthShopBuyableEffectStatsEffect', pieceId: 'ninthShopBuyableEffectPiece', piecePercentId: 'ninthShopBuyableEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.minerals[1].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect2StatsEffect', pieceId: 'firstMineralEffect2Piece', piecePercentId: 'firstMineralEffect2PiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UNL.shard_achievements[9].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'critMuShAchStatsEffect', pieceId: 'critMuShAchPiece', piecePercentId: 'critMuShAchPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.fortune.boosts[6].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCritMultiStatsEffect', pieceId: 'fortuneBoostCritMultiPiece', piecePercentId: 'fortuneBoostCritMultiPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.coin.buyables[3].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdBuyableSuperEffectStatsEffect', pieceId: 'thirdBuyableSuperEffectPiece', piecePercentId: 'thirdBuyableSuperEffectPiecePercent', summary: () => GAIN.critical.multiplier() }
    ], 'summaryCritMultiStatsEffect', GAIN.critical.multiplier());
}

// --- СИМУЛЯЦИЯ КЛИКА ---

function createClickSimulationUI() {
    buildStatsUI('clickSimulationStats', 'clickSimulationGraphic', [
        { id: 'thirdSuperCrystalSingleEffect', title: 'Удвоитель', i18nKey: 'thirdSuperCrystalSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'fortuneBoostSimulation', title: 'Альфа-Усилитель', i18nKey: 'simulationBlessingName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ], 'Общий множитель', 'summaryClickSimStatsEffect');
}
createClickSimulationUI();

function statsClickSimulationUpdate() {
    applyStatsUpdate([
        { effectValue: () => Math.pow(2, UPGS.supercrystal[13].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdSuperCrystalSingleEffectStatsEffect', pieceId: 'thirdSuperCrystalSingleEffectPiece', piecePercentId: 'thirdSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.simulation.multiplier() },
        { effectValue: () => UPGS.fortune.boosts[10].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostSimulationStatsEffect', pieceId: 'fortuneBoostSimulationPiece', piecePercentId: 'fortuneBoostSimulationPiecePercent', summary: () => GAIN.simulation.multiplier() }
    ], 'summaryClickSimStatsEffect', GAIN.simulation.multiplier());
}

// --- ПРЕСТИЖИ ---
function createPrestigeUI(){
    const descriptors = [
        { id: 'prestigeBase', title: 'Базовый прирост', i18nKey: 'basePrestigesName', colorStyle: 'background-image: radial-gradient(rgba(0, 242, 255, 1), black 210%)' },
        { id: 'prestigeAch35', title: 'Достижение 35', i18nKey: 'achievement35Name', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'prestigeBreakSingle13', title: 'Супер-престиж 13', i18nKey: 'thirdBreakPrestigeSingleEffectName', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeShop6', title: 'Магазин 6', i18nKey: 'sixthShopBuyableEffectName', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'prestigeShardAch7', title: 'Осколки (ach7)', i18nKey: 'prestigeShAchName', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeFortune22', title: 'Фортуна 22', i18nKey: 'fifthFortuneSingleEffectName', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'prestigeReflashAlgo32', title: 'Алгоритм Рефлеша (32)', i18nKey: 'reflashAlgoName', colorStyle: 'background-image: radial-gradient(#26a826, black 210%)' }
    ];

    buildStatsUI('prestigeMultiplierStats', 'prestigeMultiplierGraphic', descriptors, 'Итоговый прирост', 'summaryPrestigeStatsEffect');
}
createPrestigeUI();

function statsPrestigeUpdate() {
    const totalPrestige = GAIN.prestige.reset();

    applyStatsUpdate([
        { effectValue: () => (MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency + 10) - 14) : 1), effectPrefix: '', effectMode: 'number', effectId: 'prestigeBaseStatsEffect', pieceId: 'prestigeBasePiece', piecePercentId: 'prestigeBasePiecePercent', summary: () => totalPrestige },
        { effectValue: () => (ACHS.has(35) ? (1 + MISC.amount_of_upgrades.super() / 100) : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeAch35StatsEffect', pieceId: 'prestigeAch35Piece', piecePercentId: 'prestigeAch35PiecePercent', summary: () => totalPrestige },
        { effectValue: () => (player.prestige.break.singles.includes(13) ? UPGS.prestige.break.singles[13].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeBreakSingle13StatsEffect', pieceId: 'prestigeBreakSingle13Piece', piecePercentId: 'prestigeBreakSingle13PiecePercent', summary: () => totalPrestige },
        { effectValue: () => (player.shop.upgrades[6] ? UPGS.shop.buyables[6].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShop6StatsEffect', pieceId: 'prestigeShop6Piece', piecePercentId: 'prestigeShop6PiecePercent', summary: () => totalPrestige },
        { effectValue: () => (player.shard.achievements[7] ? UNL.shard_achievements[7].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShardAch7StatsEffect', pieceId: 'prestigeShardAch7Piece', piecePercentId: 'prestigeShardAch7PiecePercent', summary: () => totalPrestige },
        { effectValue: () => (player.fortune.upgrades.singles.includes(22) ? 2 : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFortune22StatsEffect', pieceId: 'prestigeFortune22Piece', piecePercentId: 'prestigeFortune22PiecePercent', summary: () => totalPrestige },
        
        // Новый источник рефлеша для престижей:
        { effectValue: () => UPGS.reflash.algo.tree[6].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeReflashAlgo32StatsEffect', pieceId: 'prestigeReflashAlgo32Piece', piecePercentId: 'prestigeReflashAlgo32PiecePercent', summary: () => totalPrestige }
    ], 'summaryPrestigeStatsEffect', totalPrestige, 'number', '');
}

// --- ГЛОБАЛЬНАЯ ОБРАБОТКА НАВЕДЕНИЯ НА ГРАФИКИ (БЕЗ СТАРЫХ ФУНКЦИЙ) ---

document.addEventListener('mouseover', (event) => {
    const piece = event.target.closest('.graphicPiece');
    if (!piece || !piece.id) return;
    
    // Защита от мерцания: игнорируем, если мышь двигается ВНУТРИ самой полоски (например, над текстом 13.55%)
    const related = event.relatedTarget;
    if (related && piece.contains(related)) return;

    // Отрезаем "Piece" от ID (например, "doublerPiece" -> "doubler")
    const prefix = piece.id.replace(/Piece$/, '');
    
    // Находим текст слева и красим напрямую
    const titleEl = document.getElementById(prefix + 'Stats');
    const effectEl = document.getElementById(prefix + 'StatsEffect');
    
    if (titleEl) titleEl.style.color = 'yellow';
    if (effectEl) effectEl.style.color = 'yellow';
});

document.addEventListener('mouseout', (event) => {
    const piece = event.target.closest('.graphicPiece');
    if (!piece || !piece.id) return;
    
    const related = event.relatedTarget;
    if (related && piece.contains(related)) return;

    const prefix = piece.id.replace(/Piece$/, '');
    const titleEl = document.getElementById(prefix + 'Stats');
    const effectEl = document.getElementById(prefix + 'StatsEffect');
    
    // Убираем желтый цвет, возвращая контроль CSS-классу (whiteText)
    if (titleEl) titleEl.style.color = '';
    if (effectEl) effectEl.style.color = '';
});

// --- УПРАВЛЕНИЕ АКТИВНЫМИ ВКЛАДКАМИ (БЕЛЫЙ ФОН) ---
document.addEventListener('click', function(e) {
    const btn = e.target.closest && e.target.closest('.tabButton');
    if (!btn) return;

    if (btn.classList.contains('challengeStart') || 
        btn.classList.contains('challengePStart') || 
        btn.classList.contains('exitChallenge')) return;

    let parent = btn.parentElement;
    if (!parent) return;

    if (parent.classList.contains('button-wrapper')) {
        parent = parent.parentElement;
    }

    parent.querySelectorAll('.tabButton.active:not(.challengeStart)').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}, false);

function unlockShardAch(id) {
    if (player.supercrystal.currency >= 1 && !player.shard_achievements.includes(id)) {
        player.supercrystal.currency--;
        if (player.virus.activated && player.virus.type == 5) player.virus.current++
        player.shard_achievements.push(id);
    }
}

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ ЧТЕНИЯ СЛОТОВ ---
function changeSaveSlotsText() {
    for (let i = 0; i < 5; i++) {
        let savedDataStr = localStorage.getItem(getSaveKey(i+1));
        let savedObj = savedDataStr ? JSON.parse(savedDataStr) : null;
        
        let coins = savedObj ? Number(savedObj.coin.currency) : 10;
        let crystals = savedObj ? Number(savedObj.prestige.currency) : 0;
        let bits = savedObj ? Number(savedObj.reflash.currency) : 0;
        let amount = bits >= 1 
        ? bits : crystals >= 1 
        ? crystals : coins;
        
        document.getElementsByClassName('save_coin_amount')[i].textContent = formatNumber(amount);
        document.getElementsByClassName('saveCurrency')[i].textContent = bits >= 1 
        ? i18next.t('pbcurrency8') : crystals >= 1 
        ? i18next.t('pbcurrency3') : i18next.t('pbcurrency1');

        let nameSpan = document.getElementById(`saveName${i+1}`);
        if (nameSpan) {
            let customName = (savedObj && savedObj.saveName) ? savedObj.saveName : '';
            nameSpan.textContent = customName !== '' ? customName : i18next.t(`save${i+1}`);
        }
    }
}

// --- НОВАЯ ФУНКЦИЯ ПЕРЕИМЕНОВАНИЯ ---
function editSaveName(slotNum) {
    let savedDataStr = localStorage.getItem(getSaveKey(slotNum));
    let savedObj = savedDataStr ? JSON.parse(savedDataStr) : null;
    
    if (!savedObj && slotNum !== save_number) {
        notify("Сначала сохраните игру в этот слот!", "red");
        return;
    }

    // Достаем текущее имя
    let currentName = (savedObj && savedObj.saveName) ? savedObj.saveName : "";
    
    // Спрашиваем новое
    let promptMsg = player.settings.currentLanguage === 'ru' 
        ? "Введите новое название сохранения (оставьте пустым для сброса):" 
        : "Enter a new name for the save (leave blank to reset):";
        
    let newName = prompt(promptMsg, currentName);
    if (newName === null) return;
    let finalName = newName.trim();
    if (slotNum === save_number) {
        player.saveName = finalName;
    }
    if (savedObj) {
        savedObj.saveName = finalName;
        localStorage.setItem(getSaveKey(slotNum), JSON.stringify(savedObj));
    }
    changeSaveSlotsText();
}

function toggleBadges(badgeIds, condition) {
    let displayStyle = condition ? 'flex' : 'none';
    
    if (!Array.isArray(badgeIds)) {
        badgeIds = [badgeIds];
    }
    
    badgeIds.forEach(id => {
        let badge = document.getElementById(id);
        if (badge) badge.style.display = displayStyle;
    });
}

function getAcceleratorPower() {
    if (!player.reflash.seed) {
        player.reflash.seed = Math.floor(Math.random() * 4294967296);
    }
    let randomFloat = player.reflash.seed / 4294967296;
    
    return (1 + UPGS.reflash.accelerator[1].effect()) + randomFloat * (2 + UPGS.reflash.accelerator[2].effect()); // Returns a value between 1 and 3
}

function rollNextAcceleratorSeed() {
    if (!player.reflash.seed) player.reflash.seed = Math.floor(Math.random() * 4294967296);
    player.reflash.seed = (player.reflash.seed * 1664525 + 1013904223) % 4294967296;
}

function renamePresets() {
    for (let i = 1; i <= 6; i++) {
        document.getElementsByClassName('presetButton')[i-1].textContent = player.reflash.presets[i].name;
    }
}

function presetRename(number) {
    let promptMsg = player.settings.currentLanguage === 'ru' 
        ? "Введите новое название набора (максимум 8 символов):" 
        : "Enter a new name for the preset (max 8 characters):";
    
    let newName = prompt(promptMsg, player.reflash.presets[number].name);
    if (newName === null) return; 
    if (newName.length > 8) {
        alert(player.settings.currentLanguage === 'ru' ? "Слишком длинное название!" : "Name is too long!");
        return; 
    }
    player.reflash.presets[number].name = newName || player.reflash.presets[number].name;   
    renamePresets();
    document.getElementById('presetName').innerText = player.reflash.presets[number].name;
}

function copyPreset(number) {
    let preset = player.reflash.presets[number].ids.join(', ');
    notify(text.notification.reflash.copy, 'limegreen');
    navigator.clipboard.writeText(preset);
}

async function pastePreset(number) {
    let alertMsg = player.settings.currentLanguage === 'ru' 
        ? "Неверный формат (нужно: 11, 21, 31...)"
        : "Wrong format (should be: 11, 21, 31...)";
    const paste = await navigator.clipboard.readText();
    const regex = /^(\d+)(,\s*\d+)*$/;

    if (regex.test(paste.trim())) {
        document.getElementById('nodeOrderInput').value = paste.trim();
        notify(text.notification.reflash.paste, 'limegreen');
    } else {
        alert(alertMsg);
    }
} 

function resetPreset(number) {
    player.reflash.presets[number].name = number
    player.reflash.presets[number].ids = []
    document.getElementById('presetName').innerText = player.reflash.presets[number].name;
    document.getElementById('nodeOrderInput').value = player.reflash.presets[number].ids;
    document.getElementsByClassName('presetButton')[number-1].textContent = player.reflash.presets[number].name;
    notify(text.notification.reflash.reset, 'red');
}

function savePreset(number) {
    let alertMsg = player.settings.currentLanguage === 'ru' 
        ? "Неверный формат (нужно: 11, 21, 31...)"
        : "Wrong format (should be: 11, 21, 31...)";
    const paste = document.getElementById('nodeOrderInput').value;
    const regex = /^(\d+)(,\s*\d+)*$/;
    if (regex.test(paste.trim())) {
        raw = paste.trim();
        notify(text.notification.reflash.paste, 'limegreen');
    } else {
        alert(alertMsg);
        return;
    }

    player.reflash.presets[number].ids = JSON.parse('[' + raw + ']')
    notify(text.notification.reflash.save, 'limegreen');
}

function importPreset(number) {
    let algo = player.reflash.algo //то что сейчас в древе куплено
    let ids = player.reflash.presets[number].ids //то что будет куплено из буфера обмена

    notify(text.notification.reflash.import, 'limegreen');

    const uniqueIds = ids.filter(id => !algo.includes(id))

    uniqueIds.forEach(id => UPGS.reflash.algo.buy(id))
}

function exportTree() {
    let preset = player.reflash.algo.join(', ')
    notify(text.notification.reflash.copy, 'limegreen');
    navigator.clipboard.writeText(preset);
}

async function importTree() {
    let algo = player.reflash.algo //то что сейчас в древе куплено
    let ids = [] //то что будет куплено из буфера обмена
    let raw = ''

    let alertMsg = player.settings.currentLanguage === 'ru' 
        ? "Неверный формат (нужно: 11, 21, 31...)"
        : "Wrong format (should be: 11, 21, 31...)";
    const paste = await navigator.clipboard.readText();
    const regex = /^(\d+)(,\s*\d+)*$/;
    if (regex.test(paste.trim())) {
        raw = paste.trim();
        notify(text.notification.reflash.import, 'limegreen');
    } else {
        alert(alertMsg);
        return 0;
    }
    ids = raw.split(',').map(id => Number(id.trim()))
    const uniqueIds = ids.filter(id => !algo.includes(id))

    uniqueIds.forEach(id => UPGS.reflash.algo.buy(id))
}

function respecTree() {
    if (!player.reflash.respecTree) {
        document.getElementById('respecTree').classList.add('active')
        player.reflash.respecTree = true
    }
    else {
        document.getElementById('respecTree').classList.remove('active')
        player.reflash.respecTree = false
    }
}

function doReflash(showConfirm=player.settings.confirmations.reflash) {
    if (player.coin.currency < 1.7e308 || !player.prestige.challenge.completed.includes(8)) return 0;
    if (showConfirm) openWindow('reflashConfirm', true)
    else LAYERS.reflash.doReset()
}

document.addEventListener("keydown", function(event) {
    if ((event.key == "С" || event.key == "с" || event.key == "c" || event.key == "C")) {
    changelog(this)
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.key == "L" || event.key == "l" || event.key == "д" || event.key == "Д")) {
    gameLoreOpen(this)
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.key == "H" || event.key == "h" || event.key == "р" || event.key == "Р")) {
    howToPlayOpen(this)
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.key === "P" || event.key === "p" || event.key === "з" || event.key === "З") && player.prestige.total_currency >= 1) {
        LAYERS.prestige.doReset();
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.key == "R" || event.key == "r" || event.key == "к" || event.key == "К") && player.reflash.total_currency >= 1) {
        doReflash(false)
    }
});

function switchVersion(version) {
    const buttons = [...document.getElementsByClassName('versionButtons')];
    buttons.forEach(el => {
        if (el) el.style.display = "none";
    });
    document.getElementsByClassName('versionButtons')[version].style.display = 'flex'
}

// АКТИВИРОВАТЬ КНОПКУ ПЕРЕКЛЮЧЕНИЯ ВКЛАДКИ В СУПЕРШОПЕ
document.addEventListener('click', function(e) {
    const btn = e.target.closest && e.target.closest('.shopSelection');
    if (!btn) return;

    let parent = btn.parentElement;
    if (!parent) return;

    parent.querySelectorAll('.shopSelection.active').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}, false);

// АКТИВИРОВАТЬ КНОПКУ ПЕРЕКЛЮЧЕНИЯ ОПТ ПОКУПКИ В СУПЕРШОПЕ
document.addEventListener('click', function(e) {
    const btn = e.target.closest && e.target.closest('.bulkBuySelection');
    if (!btn) return;

    let parent = btn.parentElement;
    if (!parent) return;

    parent.querySelectorAll('.bulkBuySelection.active').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}, false);

// ПЕРЕКЛЮЧЕНИЕ ВКЛАДКИ В СУПЕРШОПЕ
function switchShopTab(tab) {
    ELS.selectedShopTab = tab
    const shopTop = [...document.getElementsByClassName('shopShelfRowTop')], shopBottom = [...document.getElementsByClassName('shopShelfRowBottom')];
    const rowTypes = ['shopBuyableRow', 'shopPermanentRow', 'shopSpecialRow', 'shopItemRow']
    for (let i = 0; i < rowTypes.length; i++) {
        const elements = document.getElementsByClassName(rowTypes[i])
        for (let j = 0; j < elements.length; j++) {
            elements[j].style.display = "none";
        }
    }

    shopTop.forEach(el => {
        if (el) el.style.display = "none";
    });
    shopBottom.forEach(el => {
        if (el) el.style.display = "none";
    });
    document.getElementsByClassName('shopShelfRowTop')[tab].style.display = 'flex'
    document.getElementsByClassName('shopShelfRowBottom')[tab].style.display = 'flex'

    changeShopPage(null, true)
}

// ВЫВЕДЕНИЕ ТЕКСТА ПОСИМВОЛЬНО
let currentTimer = null; // ID таймера
let isTyping = false;     // Флаг печати
let currentIsLast = false; // Флаг конца диалога

function typeEffect(element, textContent, speed = 20) {
  if (currentTimer) clearTimeout(currentTimer);
  
  element.textContent = "";
  isTyping = true;
  let i = 0;

  function type() {
    if (i < textContent.length) {
      element.textContent += textContent.charAt(i);
      i++;
      currentTimer = setTimeout(type, speed);
    } else {
      isTyping = false;
      currentTimer = null;
    }
  }
  type();
}

// ЗАПУСК РЕПЛИКИ
function getTalk(charName, stageId = null) {
  const char = text.talk[charName];
  if (!char) return { text: "Ошибка", isLast: true };

  if (stageId === null) {
    let allAvailable = [];
    Object.entries(char.stages).forEach(([id, stage]) => {
      if (stage.condition()) allAvailable.push(...stage.replies);
    });
    const line = allAvailable.length > 0 ? allAvailable[Math.floor(Math.random() * allAvailable.length)] : "Нечего сказать.";
    return { text: line, isLast: true };
  }

  const stage = char.stages[stageId];
  if (!stage || !stage.condition()) return { text: "Условие не выполнено", isLast: true };
  
  const line = stage.replies[char.progress[stageId]];
  const nextIndex = (char.progress[stageId] + 1) % stage.replies.length;

  const isLast = (nextIndex === 0);
  
  char.progress[stageId] = nextIndex;
  return { text: line, isLast: isLast };
}

function runDialogue(charName, stageId = null) {
  const displayElement = document.getElementById('dialogueTextSpan');
  const result = getTalk(charName, stageId); 
  
  currentIsLast = result.isLast;
  displayElement.dataset.fullText = result.text; // Сохраняем полный текст тут
  
  typeEffect(displayElement, result.text);
}

document.getElementById('superPopupBackdrop').addEventListener('click', () => {
  const displayElement = document.getElementById('dialogueTextSpan');

  if (isTyping) {
    if (currentTimer) clearTimeout(currentTimer);
    displayElement.textContent = displayElement.dataset.fullText;
    isTyping = false;
  } else {
    if (currentIsLast) {
      hideDialogueWindow();
    } else {
      runDialogue(window.activeChar, window.activeStage); 
    }
  }
});

function openDialogueWindow(character, stage, mainImage) {
    window.activeChar = character;
    window.activeStage = stage;

    const el = document.getElementById('dialogueWindow'), 
          backdrop = document.getElementById('myPopupBackdropDialogue'), 
          superbackdrop = document.getElementById('superPopupBackdrop');
    
    const characterImage = document.getElementById(mainImage);
    
    if (el.style.display === "flex") return;
    
    el.style.display = "flex";
    backdrop.style.display = "flex";
    superbackdrop.style.display = "flex"; 
    
    if (characterImage) characterImage.style.display = "flex"; 

    document.getElementById('dialogueNameSpan').textContent = text.talk[character].name
    
    runDialogue(character, stage);
}

function hideDialogueWindow() {
    const el = document.getElementById('dialogueWindow'), backdrop = document.getElementById('myPopupBackdropDialogue'), superbackdrop = document.getElementById('superPopupBackdrop')
    el.style.display = "none", backdrop.style.display = "none", superbackdrop.style.display = "none";
    Array.from(document.getElementsByClassName('toHide')).forEach(element => {
        element.style.display = 'none'
    })
}


function togglePanel() {
  const panel = document.getElementById('temporaryBonuses');
  panel.classList.toggle('open');
}

function generateEventTreasures() {
    const container = document.getElementById('eventTreasuresDiv'); // Замени на ID твоего общего родителя
    container.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        if (player.treasure.digitalization[i].amount != 0) {
            const html = `
              <div class="eventTreasureContainer" onclick="openWindow('treasureDetails', true, ${i})">
                <div id="eventTreasure${i}" class="treasure eventTreasure"></div>
                <div class="treasuneName">
                  <span class="eventTreasureName" data-i18n="eventTreasure.${i}.name">Прыжок веры</span>
                </div>
              </div>
              <div id="tooltip-eventTreasure${i}" class="tooltip" role="tooltip">
                <ut data-i18n="eventTreasure.${i}.name">Activity 2.0</ut><br>
                <span data-i18n="eventTreasure.${i}.effect.permanent">Currently:</span><br>
                <div class="temporaryTreasure">
                  <span data-i18n="eventTreasure.${i}.effect.temporary">Currently:</span><br>
                </div>
                <div class="arrow" data-popper-arrow></div>
              </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
            document.getElementById(`eventTreasure${i}`).style.backgroundImage = `url("javascript/cssfiles/images/treasure/event_treasure_${i}.png")`
        }
    }
}

function switchProgressBar(selectedValue) {
    player.cosmetics.progressBars.current = selectedValue
    changeProgressBar(selectedValue)
}

function changeProgressBar(selectedValue) {
    const bar = document.getElementById("progress-bar")

    function reset() {
        bar.classList.remove('progressbar-option2')
        bar.classList.remove('progressbar-option3')
        bar.classList.remove('progressbar-option4')
        bar.classList.remove('progressbar-option5')
        bar.classList.remove('progressbar-option6')
        bar.classList.remove('progressbar-option7')
        bar.classList.remove('progressbar-option8')
        bar.classList.remove('progressbar-option9')
    }
    reset()

    switch (selectedValue) {
        case 'option2':
            bar.classList.add('progressbar-option2')
            break;
        case 'option3':
            bar.classList.add('progressbar-option3')
            break;
        case 'option4':
            bar.classList.add('progressbar-option4')
            break;
        case 'option5':
            bar.classList.add('progressbar-option5')
            break;
        case 'option6':
            bar.classList.add('progressbar-option6')
            break;
        case 'option7':
            bar.classList.add('progressbar-option7')
            break;
        case 'option8':
            bar.classList.add('progressbar-option8')
            break;
        case 'option9':
            bar.classList.add('progressbar-option9')
            break;
        default:
            break;
    }
}

function switchTheme(selectedValue) {
    player.cosmetics.themes.current = selectedValue
    changeTheme(player.cosmetics.themes.current)
}


function changeTheme(selectedValue) {
    const body = document.getElementsByTagName('body')[0]

    function reset() {
        body.classList.remove('theme-option2')
        body.classList.remove('theme-option3')
        document.documentElement.style.removeProperty('--crystal');
        document.documentElement.style.removeProperty('--prestige-upgrade');
        document.documentElement.style.removeProperty('--break-prestige-upgrade');
        document.documentElement.style.removeProperty('--supercrystal');
        document.documentElement.style.removeProperty('--reflash');
        document.documentElement.style.removeProperty('--shard');
        document.documentElement.style.removeProperty('--coin');
        document.documentElement.style.removeProperty('--rune');
        document.documentElement.style.removeProperty('--settings');
        document.documentElement.style.removeProperty('--coin-upgrade');
        document.documentElement.style.removeProperty('--supercoin');
    }
    reset()

    switch (selectedValue) {
        case 'option2':
            body.classList.add('theme-option2')
            document.documentElement.style.setProperty('--crystal', '#b67f33');
            document.documentElement.style.setProperty('--prestige-upgrade', '#b67f33');
            document.documentElement.style.setProperty('--break-prestige-upgrade', '#ca7e14');
            document.documentElement.style.setProperty('--supercrystal', '#a86b15');
            document.documentElement.style.setProperty('--reflash', '#b341e0');
            document.documentElement.style.setProperty('--shard', '#f1b663');
            document.documentElement.style.setProperty('--coin', '#df5050')
            document.documentElement.style.setProperty('--rune', '#dd9632');
            break;
        case 'option3':
            body.classList.add('theme-option3')
            document.documentElement.style.setProperty('--coin', 'limegreen')
            document.documentElement.style.setProperty('--settings', 'lightgray');
            document.documentElement.style.setProperty('--coin-upgrade', 'limegreen');
            document.documentElement.style.setProperty('--supercoin', 'forestgreen');
            document.documentElement.style.setProperty('--crystal', 'lightskyblue');
            document.documentElement.style.setProperty('--prestige-upgrade', 'lightskyblue');
            document.documentElement.style.setProperty('--shard', 'lightblue');
            document.documentElement.style.setProperty('--supercrystal', 'royalblue');
            document.documentElement.style.setProperty('--rune', 'royalblue');
            document.documentElement.style.setProperty('--break-prestige-upgrade', 'royalblue');
            document.documentElement.style.setProperty('--reflash', 'mediumspringgreen');
            break;
        default:
            break;
    }
    UPGS.reflash.algo.updateStates()
}

function switchCoin(selectedValue) {
    player.cosmetics.coins.current = selectedValue
    changeCoin(player.cosmetics.coins.current)
}

function changeCoin(selectedValue) {
    const coin = document.getElementById("coinGain")

    function reset() {
        coin.classList.remove('coin-option2')
    }
    reset()

    switch (selectedValue) {
        case 'option2':
            coin.classList.add('coin-option2')
            break;
        default:
            break;
    }
}

const treeObserver = new ResizeObserver(() => {
    drawTreeLines();
});

function initAlgoTree() {
    if (!player.reflash.algo) player.reflash.algo = [];
    const grid = document.getElementById('treeGrid');
    const grid2 = document.getElementById('treeGrid2');
    const container = document.getElementById('treeContainer');
    if (!grid) return;
    
    grid.innerHTML = '';
    grid2.innerHTML = '';

    // Берем данные из UPGS
    UPGS.reflash.algo.tree.forEach(node => {
        let btn = document.createElement('button');
        let div = document.createElement('div')
        btn.id = 'algoNode_' + node.id;
        btn.className = 'treeNode';

        div.id = 'algoNodeGhost_' + node.id;
        div.className = 'treeNodeGhost';
        
        btn.style.gridRow = node.row;
        div.style.gridRow = node.row;
        if (node.id === 11) {
            btn.style.gridColumn = '2 / 4';
            div.style.gridColumn = '2 / 4';
        }
        else {
            btn.style.gridColumn = node.col;
            div.style.gridColumn = node.col;
        }

        div.textContent = i18next.t('upg_algo_cpu_req', { cpu_lvl: node.cpu_req })

        btn.onclick = () => UPGS.reflash.algo.buy(node.id); 
        grid.appendChild(btn);
        grid2.appendChild(div)
    });

    if (container) treeObserver.observe(container);
    UPGS.reflash.algo.updateStates(); // Инициализация цветов
}

function drawTreeLines() {
    const svg = document.getElementById('treeLines');
    const container = document.getElementById('treeContainer');
    if (!svg || !container) return;

    svg.innerHTML = ''; 
    const containerRect = container.getBoundingClientRect();

    // Берем данные из UPGS!
    UPGS.reflash.algo.tree.forEach(node => {
        // Проверяем кастомную переменную draw (массив ID родителей для отрисовки линий)
        if (!node.draw || !Array.isArray(node.draw) || node.draw.length === 0) return;

        const childBtn = document.getElementById('algoNode_' + node.id);
        if (!childBtn) return;
        const childRect = childBtn.getBoundingClientRect();

        const x2 = childRect.left - containerRect.left + container.scrollLeft + (childRect.width / 2);
        const y2 = childRect.top - containerRect.top + container.scrollTop + (childRect.height / 2);

        node.draw.forEach(parentId => {
            const parentBtn = document.getElementById('algoNode_' + parentId);
            if (!parentBtn) return;
            const parentRect = parentBtn.getBoundingClientRect();

            const x1 = parentRect.left - containerRect.left + container.scrollLeft + (parentRect.width / 2);
            const y1 = parentRect.top - containerRect.top + container.scrollTop + (parentRect.height / 2);

            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.id = `algoLine_${parentId}_${node.id}`; // Уникальный ID линии для закраски
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke-width', '20'); 
            svg.appendChild(line);
        });
    });
    
    if (UPGS.reflash && UPGS.reflash.algo) {
        UPGS.reflash.algo.updateStates();
    }
}
window.addEventListener('resize', drawTreeLines);

function updateFontSelector() {
    const select = document.getElementById('changeFont');
    const unlockedFonts = player.cosmetics.fonts.styles;

    Array.from(select.options).forEach(option => {
        if (unlockedFonts.includes(option.value)) {
            option.style.display = ''; 
        } else {
            option.style.display = 'none';
        }
    });
}
function updateProgressBarSelector() {
    const select = document.getElementById('changeProgressBar');
    const unlockedPBs = player.cosmetics.progressBars.styles;

    Array.from(select.options).forEach(option => {
        if (unlockedPBs.includes(option.value)) {
            option.style.display = ''; 
        } else {
            option.style.display = 'none';
        }
    });
}
// function updateBackgroundSelector() {
//     const select = document.getElementById('changeBackground');
//     const unlockedBGs= player.cosmetics.backgrounds.styles;

//     Array.from(select.options).forEach(option => {
//         if (unlockedBGs.includes(option.value)) {
//             option.style.display = ''; 
//         } else {
//             option.style.display = 'none';
//         }
//     });
// }
function updateThemeSelector() {
    const select = document.getElementById('changeTheme');
    const unlockedThemes = player.cosmetics.themes.styles;

    Array.from(select.options).forEach(option => {
        if (unlockedThemes.includes(option.value)) {
            option.style.display = ''; 
        } else {
            option.style.display = 'none';
        }
    });
}
function updateCoinSelector() {
    const select = document.getElementById('changeCoinIcon');
    const unlockedCoins = player.cosmetics.coins.styles;

    Array.from(select.options).forEach(option => {
        if (unlockedCoins.includes(option.value)) {
            option.style.display = ''; 
        } else {
            option.style.display = 'none';
        }
    });
}

function updateBitToByteUI() {
    const isBytes = player.reflash.computer[3] >= 1;
    
    // 1. Меняем текст валюты везде, где в JSON завязаны биты/байты
    // Ищем элементы с определенными ключами или атрибутами
    document.querySelectorAll('[data-i18n="currency_bits"], [data-i18n="currency_bits.bit"], [data-i18n="currency_bits.byte"]').forEach(el => {
        el.textContent = isBytes ? i18next.t('currency_bits.byte') : i18next.t('currency_bits.bit');
    });
    return isBytes ? 'byte' : 'bit'
}

function getBitOrByteKey(number) {
    const isComputerUnlocked = player && player.reflash && player.reflash.computer && player.reflash.computer[3] >= 1;
    
    if (isComputerUnlocked && number >= 8) {
        return 'currency_bits.byte'; // Вернет "Bytes" / "Байтов"
    }
    return 'currency_bits.bit'; // Вернет "BITs" / "БИТов"
}

const sortableConfig = {
    group: 'mineralsGroup',
    animation: 150,
    // ВАЖНО для мобилок: даем задержку в 100мс и порог смещения, 
    // чтобы браузер отличал скролл страницы от перетаскивания элемента
    delay: 100, 
    delayOnTouchOnly: true,
    touchStartThreshold: 5,
    onEnd: function (evt) {
        updateMineralOrderArray();
    }
};

// Применяем к обоим контейнерам
new Sortable(document.getElementById('orderContainer'), sortableConfig);
new Sortable(document.getElementById('poolContainer'), sortableConfig);

new Sortable(document.getElementById('itemOrderContainer'), sortableConfig);
new Sortable(document.getElementById('itemPoolContainer'), sortableConfig);

function updateMineralOrderArray() {
    const orderContainer = document.getElementById('orderContainer');
    const items = orderContainer.querySelectorAll('.mineral-item');
    
    // Превращаем элементы в массив чисел по их data-id
    const mineralOrderArray = Array.from(items).map(item => {
        return parseInt(item.getAttribute('data-id'));
    });

    let preset = player.automation.mechanism_conditions[14].preset
    player.automation.mechanism_conditions[14].presets[preset].order = mineralOrderArray 
}
function updateItemOrderArray() {
    const orderContainer = document.getElementById('itemOrderContainer');
    const items = orderContainer.querySelectorAll('.item-item');
    
    // Превращаем элементы в массив чисел по их data-id
    const itemOrderArray = Array.from(items).map(item => {
        return parseInt(item.getAttribute('data-item-id'));
    });

    let preset = player.automation.mechanism_conditions[15].preset
    player.automation.mechanism_conditions[15].presets[preset].order = itemOrderArray 
}

function initDoubleTapTransfer() {
    const orderContainer = document.getElementById('orderContainer');
    const poolContainer = document.getElementById('poolContainer');
    const orderContainer2 = document.getElementById('itemOrderContainer');
    const poolContainer2 = document.getElementById('itemPoolContainer');

    document.addEventListener('dblclick', (e) => {
        const item = e.target.closest('.mineral-item');
        if (!item) return;

        const currentParent = item.parentElement;

        if (currentParent === poolContainer) {
            orderContainer.appendChild(item);
        } else if (currentParent === orderContainer) {
            poolContainer.appendChild(item);
        }

        if (typeof updateMineralOrderArray === 'function') {
            updateMineralOrderArray();
        }
    });
    document.addEventListener('dblclick', (e) => {
        const item = e.target.closest('.item-item');
        if (!item) return;

        const currentParent = item.parentElement;

        if (currentParent === poolContainer2) {
            orderContainer2.appendChild(item);
        } else if (currentParent === orderContainer2) {
            poolContainer2.appendChild(item);
        }

        if (typeof updateItemOrderArray === 'function') {
            updateItemOrderArray();
        }
    });
}

initDoubleTapTransfer();

function isEqualArray(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}