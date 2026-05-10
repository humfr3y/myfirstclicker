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
        if (i <= 9 && player.prestige.challenge.completed.includes(i)) window[`pChallenge${i}Start`].style.backgroundColor = '#09b909';
    }
}

function changeInputValue2(arg) {
    shopBulkBuyInput.value = arg;
    player.settings.shop_bulkbuy = arg;
}
shopBulkBuyInput.addEventListener("blur", () => player.settings.shop_bulkbuy = shopBulkBuyInput.value);

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
        case 'boost': return number < 100 ? number.toFixed(2) : number.toFixed(0);
        case 'power': return number < 10 ? number.toFixed(x) : (number < 100 ? number.toFixed(2) : number.toFixed(0));
        case 'percent': 
            let p = number * 100 - 100;
            // Если процент стал огромным, прогоняем его через настройки нотации игрока!
            if (p >= 1e6) return formatNumber(p, 'number'); 
            return p < 10 ? p.toFixed(2) : p.toFixed(0);
        default: return number.toString();
    }
}

function formatNumber(number, mode = 'number', x = 3) {
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

// Мини-форматтеры сжаты до тернарников
// Мини-форматтеры сжаты до тернарников, огромные числа идут через главную нотацию
function formatBoost(boost) { return boost < 100 ? boost.toFixed(2) : (boost < 1e6 ? boost.toFixed(0) : formatNumber(boost, 'number')); }
function formatPower(power) { return power < 10 ? power.toFixed(3) : (power < 1e6 ? power.toFixed(0) : formatNumber(power, 'number')); }
function formatPercent(percent) { 
    let p = percent * 100;
    return p < 10 ? p.toFixed(2) : (p < 1e6 ? p.toFixed(0) : formatNumber(p, 'number')); 
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
                upgrade.element.style.backgroundColor = 'rgb(255, 174, 0)'; 
                upgrade.element.style.color = 'black';
            } else if (!upgrade.element.disabled) {
                upgrade.element.style.borderColor = 'rgb(255, 174, 0)';
            }
        });

        // Запуск мигания
        modernizeBlink = setInterval(() => {
            allUpgrades.forEach(upgrade => {
                if (!upgrade.unl_super() && !upgrade.element.disabled) {
                    upgrade.element.style.color = 'white';
                    upgrade.element.style.backgroundColor = upgrade.element.style.backgroundColor === 'rgb(106, 73, 0)' ? '#000000' : 'rgb(106, 73, 0)';
                    upgrade.element.style.borderColor = 'rgb(255, 174, 0)';
                } else if (upgrade.element.disabled) {
                    upgrade.element.style.removeProperty('color');
                    upgrade.element.style.removeProperty('border-color');
                    upgrade.element.style.removeProperty('background-color');
                } else if (upgrade.unl_super()) {
                    upgrade.element.style.backgroundColor = 'rgb(255, 174, 0)'; 
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
        // Создаем текст
        statsHTML += `
        <div class="multiplierString" style="display: flex;">
            <span id="${d.id}Stats" class="whiteText" style="margin-left: 30px;">${d.title}</span>
            <span id="${d.id}StatsEffect" class="whiteText" style="margin-right: 30px;">${d.hasPiece === false ? '^0' : 'x1'}</span>
        </div>`;

        // Создаем полоску, если она нужна
        if (d.hasPiece !== false) {
            graphHTML += `
            <div id="${d.id}Piece" class="graphicPiece" style="${d.colorStyle}">
                <span id="${d.id}PiecePercent" class="whiteText pieceText">0%</span>
            </div>`;
        }
    });

    // Добавляем софткапы и подвал с переводом data-i18n
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
    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId);
        if (!effectEl) return;

        const effectRaw = src.effectValue();
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw;

        // Обновляем текст
        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power');
        } else {
            effectEl.innerHTML = (src.effectPrefix || '') + formatDecimal(effectRaw, src.effectMode || 'boost');
        }

        // Обновляем графику
        if (src.pieceId && src.piecePercentId) {
            const pieceEl = document.getElementById(src.pieceId);
            const piecePercentEl = document.getElementById(src.piecePercentId);
            if (pieceEl && piecePercentEl && src.summary) {
                const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw;
                const summaryRaw = src.summary();
                const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw;
                hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass);
            }
        }
    });

    const summaryEl = document.getElementById(summaryId);
    if (summaryEl) summaryEl.innerHTML = summaryPrefix + formatDecimal(summaryValue, summaryFormat);
}

// --- ВКЛАДКА "НАЖАТИЕ" ---

function createGainPerClickUI() {
    const descriptors = [
        { id: 'doubler', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(#23e019, rgba(0, 0, 0, 0)210%)' },
        { id: 'midasCursor', title: 'Курсор Мидаса', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'rewardForFeats', title: 'Награда за Подвиги', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'challenge1', title: 'Испытание 1', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'goldenGlove', title: 'Золотая перчатка', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'gainClick', title: 'Общий доход', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'challenge6', title: 'Испытание 6', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' }
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
    const gainWithoutPower = findMultiplierDecimal(GAIN.coin.gain.no_softcap_effect().pow(1 / (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1)), (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1));

    const sources = [
        { effectValue: () => UPGS.coin.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'doublerStatsEffect', pieceId: 'doublerPiece', piecePercentId: 'doublerPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'midasCursorStatsEffect', pieceId: 'midasCursorPiece', piecePercentId: 'midasCursorPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[23].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'rewardForFeatsStatsEffect', pieceId: 'rewardForFeatsPiece', piecePercentId: 'rewardForFeatsPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => CHALL[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge1StatsEffect', pieceId: 'challenge1Piece', piecePercentId: 'challenge1PiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenGloveStatsEffect', pieceId: 'goldenGlovePiece', piecePercentId: 'goldenGlovePiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => GAIN.coin.gain.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainClickStatsEffect', pieceId: 'gainClickPiece', piecePercentId: 'gainClickPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => (player.challenge.completed.includes(6) ? CHALL[6].effect() : 1), effectPrefix: '^', effectMode: 'power', effectId: 'challenge6StatsEffect', pieceId: 'challenge6Piece', piecePercentId: 'challenge6PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower }
    ];

    applyStatsUpdate(sources, 'summaryClickStatsEffect', GAIN.coin.click.effect());
}

// --- ВКЛАДКА "В СЕКУНДУ" ---

function createGainPerSecondUI() {
    const descriptors = [
        { id: 'smallInvestment', title: 'Небольшая Инвестиция', colorStyle: 'background-image: radial-gradient(#23e019, rgba(0, 0, 0, 0)210%)' },
        { id: 'multiplierUpgrade', title: 'Умножитель', colorStyle: 'background-image: radial-gradient(#23e019, black 210%)' },
        { id: 'richFame', title: 'Богатая Слава', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'negativeAlpha', title: 'Негативная альфа частичка', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'goldenClock', title: 'Золотые часы', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'achievement15', title: 'Достижение 15', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'challenge8', title: 'Испытание 8', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'gainSecond', title: 'Общий доход', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'challenge3', title: 'Испытание 3', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' }
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
    const sources = [
        { effectValue: () => UPGS.coin.buyables[1].effect(), effectPrefix: '+', effectMode: 'number', effectId: 'smallInvestmentStatsEffect', pieceId: 'smallInvestmentPiece', piecePercentId: 'smallInvestmentPiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => UPGS.coin.buyables[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'multiplierUpgradeStatsEffect', pieceId: 'multiplierUpgradePiece', piecePercentId: 'multiplierUpgradePiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'richFameStatsEffect', pieceId: 'richFamePiece', piecePercentId: 'richFamePiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[21].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'negativeAlphaStatsEffect', pieceId: 'negativeAlphaPiece', piecePercentId: 'negativeAlphaPiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenClockStatsEffect', pieceId: 'goldenClockPiece', piecePercentId: 'goldenClockPiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => (player.challenge.completed.includes(8) ? CHALL[8].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge8StatsEffect', pieceId: 'challenge8Piece', piecePercentId: 'challenge8PiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => Math.pow(1+0.0001*player.clicks.simulated, ACHS.has(15)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement15StatsEffect', pieceId: 'achievement15Piece', piecePercentId: 'achievement15PiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => GAIN.coin.gain.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainSecondStatsEffect', pieceId: 'gainSecondPiece', piecePercentId: 'gainSecondPiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() },
        { effectValue: () => (player.challenge.completed.includes(3) ? CHALL[3].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge3StatsEffect', pieceId: 'challenge3Piece', piecePercentId: 'challenge3PiecePercent', summary: () => GAIN.coin.second.no_softcap_effect() }
    ];

    applyStatsUpdate(sources, 'summarySecondStatsEffect', GAIN.coin.second.effect());
}

// --- ВКЛАДКА "ДОХОД" (GAIN) ---

function createGainWholeUI() {
    const descriptors = [
        { id: 'alphaPower', title: 'Альфа-Сила', colorStyle: 'background-image: radial-gradient(#23e019, black 210%)' },
        { id: 'doublerPlus', title: 'Удвоитель+', colorStyle: 'background-image: radial-gradient(#1226ff, rgba(0, 0, 0, 0)210%)' },
        { id: 'cashBack', title: 'Кэшбэк', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'goldenKey', title: 'Золотой ключ', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'overdriveType1', title: 'Овердрайв', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'achievement28', title: 'Достижение 28', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'hourglass', title: 'Часы', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'antiHourglass', title: 'Анти-Часы', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'shards', title: 'Осколки', colorStyle: 'background-image: radial-gradient(rgb(138, 255, 249), black 210%)' },
        { id: 'achievements', title: 'Достижения', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'secondMineralEffect1', title: 'Минерал', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'umultiplier', title: 'У-множители', colorStyle: 'background-image: radial-gradient(cadetblue, black 210%)' },
        { id: 'coinFactory', title: 'Фабрика монет', colorStyle: 'background-image: radial-gradient(cadetblue, black 210%)' },
        { id: 'fortuneBoostCoin', title: 'Усиление Фортуны', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinsForGain', title: 'Плюс монет', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'pchall7', title: 'Испытание Престижа 7', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'upower', title: 'У-сила', colorStyle: 'background-image: radial-gradient(palevioletred, black 210%)' },
        { id: 'activity2', title: 'Активность 2', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' }
    ];

    const softcapHTML = `
    <div id="postE15SoftcapGain" class="multiplierString" style="display: flex;">
        <span id="postE15SoftcapGainStats" class="whiteText" style="margin-left: 30px" data-i18n="postE15CoinSoftcap">Пост-е15 Софткап</span>
        <span id="postE15SoftcapGainStatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    // ЗАМЕТЬ: мы теперь передаем 'wholeGainGraphic' вместо 'gainGraphic'
    buildStatsUI('wholeGainStats', 'wholeGainGraphic', descriptors, 'Общий множитель', 'summaryGainStatsEffect', softcapHTML);
}
createGainWholeUI();

function statsGainUpdate() {
    const gainWithoutPower1 = findMultiplierDecimal(GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.prestige.singles[12].effect()), UPGS.prestige.singles[12].effect());
    const temp1 = GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.prestige.singles[12].effect());
    const gainWithoutPower2 = findMultiplierDecimal(temp1.pow(1 / GAIN.upower.effect()), GAIN.upower.effect());

    const sources = [
        { effectValue: () => UPGS.coin.buyables[5].effect(), effectPrefix: '+', effectMode: 'number', effectId: 'alphaPowerStatsEffect', pieceId: 'alphaPowerPiece', piecePercentId: 'alphaPowerPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[13].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'doublerPlusStatsEffect', pieceId: 'doublerPlusPiece', piecePercentId: 'doublerPlusPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[22].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'cashBackStatsEffect', pieceId: 'cashBackPiece', piecePercentId: 'cashBackPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenKeyStatsEffect', pieceId: 'goldenKeyPiece', piecePercentId: 'goldenKeyPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect() },
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
        { effectValue: () => UPGS.prestige.singles[12].effect(), effectPrefix: '^', effectMode: 'power', effectId: 'activity2StatsEffect', pieceId: 'activity2Piece', piecePercentId: 'activity2PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower1 }
    ];

    applyStatsUpdate(sources, 'summaryGainStatsEffect', GAIN.coin.gain.effect());
}

// --- ВКЛАДКА "СУПЕР-МОНЕТЫ (ШАНС)" ---

function createSuperCoinChanceUI() {
    const descriptors = [
        { id: 'luckyClover', title: 'Клевер удачи', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'charisma', title: 'Харизма', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'thirdSingleSuperEffect', title: 'Третий Сингл', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstSuperCrystalEffect', title: 'Супер-кристалл', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'firstMineralEffect3', title: 'Минерал', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'superDvor', title: 'Супер-двор', colorStyle: 'background-image: radial-gradient(rgb(253, 206, 78), black 210%)' },
        { id: 'hercCursor', title: 'Геркулес', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'fortuneBoostSupercoin', title: 'Фортуна', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinForSupercoin', title: '+Монеты', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'achievement37', title: 'Достижение 37', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' }
    ];

    buildStatsUI('superCoinsChanceStats', 'superCoinsChanceGraphic', descriptors, 'Общий множитель', 'summarySCChanceStatsEffect');
}
createSuperCoinChanceUI();

function statsSuperCoinChanceUpdate() {
    const ach37Graphic = () => findMultiplierInAdditive(ACHS.has(37), GAIN.supercoin.chance());
    const sources = [
        { effectValue: () => UPGS.shop.buyables[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'luckyCloverStatsEffect', pieceId: 'luckyCloverPiece', piecePercentId: 'luckyCloverPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.coin.singles[13].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdSingleSuperEffectStatsEffect', pieceId: 'thirdSingleSuperEffectPiece', piecePercentId: 'thirdSingleSuperEffectPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.prestige.singles[13].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'charismaStatsEffect', pieceId: 'charismaPiece', piecePercentId: 'charismaPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => (Math.pow(1.5, UPGS.supercrystal[11].unl())), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstSuperCrystalEffectStatsEffect', pieceId: 'firstSuperCrystalEffectPiece', piecePercentId: 'firstSuperCrystalEffectPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.minerals[1].effect3(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect3StatsEffect', pieceId: 'firstMineralEffect3Piece', piecePercentId: 'firstMineralEffect3PiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UNL.shard_achievements[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'superDvorStatsEffect', pieceId: 'superDvorPiece', piecePercentId: 'superDvorPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.prestige.break.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'hercCursorStatsEffect', pieceId: 'hercCursorPiece', piecePercentId: 'hercCursorPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.fortune.boosts[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostSupercoinStatsEffect', pieceId: 'fortuneBoostSupercoinPiece', piecePercentId: 'fortuneBoostSupercoinPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => MISC.balance.plusCoins.buff().chanceBuffer, effectPrefix: 'x', effectMode: 'boost', effectId: 'plusCoinForSupercoinStatsEffect', pieceId: 'plusCoinForSupercoinPiece', piecePercentId: 'plusCoinForSupercoinPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => Number(ACHS.has(37)), effectPrefix: '+', effectMode: 'boost', effectId: 'achievement37StatsEffect', pieceId: 'achievement37Piece', piecePercentId: 'achievement37PiecePercent', summary: () => GAIN.supercoin.chance(), graphicValue: ach37Graphic }
    ];

    applyStatsUpdate(sources, 'summarySCChanceStatsEffect', GAIN.supercoin.chance(), 'boost', '');
    document.getElementById('summarySCChanceStatsEffect').innerHTML += '%'; // Докидываем % в конец
}

// --- ВКЛАДКА "КРИСТАЛЛЫ" ---

function createCrystalsUI() {
    const descriptors = [
        { id: 'baseCrystal', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'achievement282', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'brilliantDoubler', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'recycling', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'challenge10', title: 'Испытание 10', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'crystalBoost', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'overdrive2Effect', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'thirdMineralEffect1', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'secondSuperCrystalSingleEffect', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'prestigeFame', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'crystalShAch', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'fortuneBoostCrystal', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'minusCoinsForCrystals', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'pchall1', title: 'Испытание Престижа 1', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'achievementBonus2', title: 'Кристаллический Усилитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' }
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
    const gain = player.prestige.break.singles.includes(25) ? Math.pow(1.2, Math.log10((Math.max(GAIN.coin.click.effect(), GAIN.coin.second.effect()) + 10) / 1e15) + UPGS.prestige.break.buyables[1].effect()): 1;

    const sources = [
        { effectValue: () => gain, effectPrefix: 'x', effectMode: 'boost', effectId: 'baseCrystalStatsEffect', pieceId: 'baseCrystalPiece', piecePercentId: 'baseCrystalPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => Math.pow(4, ACHS.has(28)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement282StatsEffect', pieceId: 'achievement282Piece', piecePercentId: 'achievement282PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.prestige.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'brilliantDoublerStatsEffect', pieceId: 'brilliantDoublerPiece', piecePercentId: 'brilliantDoublerPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.shard.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'recyclingStatsEffect', pieceId: 'recyclingPiece', piecePercentId: 'recyclingPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => (player.challenge.completed.includes(10) ? CHALL[10].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge10StatsEffect', pieceId: 'challenge10Piece', piecePercentId: 'challenge10PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.shop.permanent[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalBoostStatsEffect', pieceId: 'crystalBoostPiece', piecePercentId: 'crystalBoostPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UNL.overdrive.type2.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'overdrive2EffectStatsEffect', pieceId: 'overdrive2EffectPiece', piecePercentId: 'overdrive2EffectPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.minerals[3].effect1(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdMineralEffect1StatsEffect', pieceId: 'thirdMineralEffect1Piece', piecePercentId: 'thirdMineralEffect1PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => Math.pow(3, UPGS.supercrystal[12].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondSuperCrystalSingleEffectStatsEffect', pieceId: 'secondSuperCrystalSingleEffectPiece', piecePercentId: 'secondSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.prestige.break.singles[11].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFameStatsEffect', pieceId: 'prestigeFamePiece', piecePercentId: 'prestigeFamePiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UNL.shard_achievements[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalShAchStatsEffect', pieceId: 'crystalShAchPiece', piecePercentId: 'crystalShAchPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => ACHS.effect.crystal(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus2StatsEffect', pieceId: 'achievementBonus2Piece', piecePercentId: 'achievementBonus2PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.fortune.boosts[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCrystalStatsEffect', pieceId: 'fortuneBoostCrystalPiece', piecePercentId: 'fortuneBoostCrystalPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => MISC.balance.minusCoins.buff().crystalGainBuff, effectPrefix: 'x', effectMode: 'boost', effectId: 'minusCoinsForCrystalsStatsEffect', pieceId: 'minusCoinsForCrystalsPiece', piecePercentId: 'minusCoinsForCrystalsPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => player.prestige.challenge.completed.includes(1) ? PRES_CHALLENGE[1].effect() : 1, effectPrefix: 'x', effectMode: 'boost', effectId: 'pchall1StatsEffect', pieceId: 'pchall1Piece', piecePercentId: 'pchall1PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => GAIN.crystal.softcap().softcap_power, effectPrefix: '^', effectMode: 'power', effectId: 'CRYSTAL_GAIN_SC_001StatsEffect' }
    ];

    const softcapHTML = `
    <div id="postE15SoftcapGain" class="multiplierString" style="display: flex;">
        <span id="postE15SoftcapGainStats" class="whiteText" style="margin-left: 30px" data-i18n="postE15CoinSoftcap">Пост-е15 Софткап</span>
        <span id="postE15SoftcapGainStatsEffect" class="whiteText" style="margin-right: 30px">^0.5</span>
    </div>`;

    applyStatsUpdate(sources, 'summaryCrystalStatsEffect', GAIN.crystal.reset());
}

// --- ОСКОЛКИ (SHARDS) ---

// --- ОСКОЛКИ (SHARDS) ---
function createShardsUI() {
    buildStatsUI('shardsPerClickStats', 'shardsPerClickGraphic', [
        { id: 'firstShardBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'ninthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'fortuneBoostShardClick', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'breakPrestigeBuyable31', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' }
    ], 'Общий множитель', 'summaryShPerClickStatsEffect');

    buildStatsUI('shardsPerSecondStats', 'shardsPerSecondGraphic', [
        { id: 'secondShardBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'thirdMineralEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'shardShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'achievement39', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'fortuneBoostShardSecond', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'breakPrestigeBuyable32', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'achievementBonus3', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' }
    ], 'Общий множитель', 'summaryShPerSecondStatsEffect');

    const effectDescriptors = [
        { id: 'shard', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'achievement30', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'fourthShardSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'challengeReward7', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'pchall3', title: 'Испытание Престижа 3', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
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
    applyStatsUpdate([
        { effectValue: () => UPGS.shard.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstShardBuyableEffectStatsEffect', pieceId: 'firstShardBuyableEffectPiece', piecePercentId: 'firstShardBuyableEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffectStatsEffect', pieceId: 'fifthShopBuyableEffectPiece', piecePercentId: 'fifthShopBuyableEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthSuperCrystalSingleEffectStatsEffect', pieceId: 'ninthSuperCrystalSingleEffectPiece', piecePercentId: 'ninthSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardClickStatsEffect', pieceId: 'fortuneBoostShardClickPiece', piecePercentId: 'fortuneBoostShardClickPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => UPGS.prestige.break.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'breakPrestigeBuyable31StatsEffect', pieceId: 'breakPrestigeBuyable31Piece', piecePercentId: 'breakPrestigeBuyable31PiecePercent', summary: () => GAIN.shard.click() },
    ], 'summaryShPerClickStatsEffect', GAIN.shard.click());
}

function statsShardsPerSecondUpdate() {
    applyStatsUpdate([
        { effectValue: () => UPGS.shard.buyables[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondShardBuyableEffectStatsEffect', pieceId: 'secondShardBuyableEffectPiece', piecePercentId: 'secondShardBuyableEffectPiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffect2StatsEffect', pieceId: 'fifthShopBuyableEffect2Piece', piecePercentId: 'fifthShopBuyableEffect2PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.minerals[3].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdMineralEffect2StatsEffect', pieceId: 'thirdMineralEffect2Piece', piecePercentId: 'thirdMineralEffect2PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UNL.shard_achievements[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardShAchStatsEffect', pieceId: 'shardShAchPiece', piecePercentId: 'shardShAchPiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => Math.pow(1.337, ACHS.has(39)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement39StatsEffect', pieceId: 'achievement39Piece', piecePercentId: 'achievement39PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => ACHS.effect.shard(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus3StatsEffect', pieceId: 'achievementBonus3Piece', piecePercentId: 'achievementBonus3PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardSecondStatsEffect', pieceId: 'fortuneBoostShardSecondPiece', piecePercentId: 'fortuneBoostShardSecondPiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.prestige.break.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'breakPrestigeBuyable32StatsEffect', pieceId: 'breakPrestigeBuyable32Piece', piecePercentId: 'breakPrestigeBuyable32PiecePercent', summary: () => GAIN.shard.click() },
    ], 'summaryShPerSecondStatsEffect', GAIN.shard.second());
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
        { id: 'baseCriticalChanceEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fourthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'eighthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect1', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critChShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'fortuneBoostCritChance', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinsForCritChance', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(white, black 210%)' }
    ], 'Общий множитель', 'summaryCritChanceStatsEffect');
}
createCritChanceUI();

// Функция statsCritChanceUpdate остается твоя оригинальная (не вставляю ее сюда, чтобы не затирать твою логику весов)

function statsCritChanceUpdate() {
    const setIf = (id, text) => { const el = document.getElementById(id); if (el) el.innerHTML = text; }
    
    // Обновляем текстовые значения
    setIf('baseCriticalChanceEffectStatsEffect', '+' + formatDecimal(GAIN.critical.baseChance, 'boost'));
    setIf('fourthSuperCrystalSingleEffectStatsEffect', '+' + formatDecimal(UPGS.supercrystal[21].unl() ? 2 : 0, 'boost'));
    setIf('eighthShopBuyableEffectStatsEffect', '+' + formatDecimal(UPGS.shop.permanent[3].effect(), 'boost'));
    setIf('firstMineralEffect1StatsEffect', 'x' + formatDecimal(UPGS.minerals[1].effect1(), 'boost'));
    setIf('critChShAchStatsEffect', 'x' + formatDecimal(UNL.shard_achievements[8].effect(), 'boost'));
    setIf('fortuneBoostCritChanceStatsEffect', 'x' + formatDecimal(UPGS.fortune.boosts[5].effect(), 'boost'));
    setIf('plusCoinsForCritChanceStatsEffect', 'x' + formatDecimal(MISC.balance.plusCoins.buff().chanceBuffer, 'boost'));

    const zoneAddPct = 25; // Ровно 25% физической высоты под аддитивные
    const zoneMultPct = 75; // Ровно 75% физической высоты под мультипликативные

    const additiveSources = [
        { raw: GAIN.critical.baseChance, pid: 'baseCriticalChanceEffectPiece', ppid: 'baseCriticalChanceEffectPiecePercent' },
        { raw: (UPGS.supercrystal[21].unl() ? 2 : 0), pid: 'fourthSuperCrystalSingleEffectPiece', ppid: 'fourthSuperCrystalSingleEffectPiecePercent' },
        { raw: UPGS.shop.permanent[3].effect(), pid: 'eighthShopBuyableEffectPiece', ppid: 'eighthShopBuyableEffectPiecePercent' }
    ];

    const multiplicativeSources = [
        { raw: UPGS.minerals[1].effect1(), pid: 'firstMineralEffect1Piece', ppid: 'firstMineralEffect1PiecePercent' },
        { raw: UNL.shard_achievements[8].effect(), pid: 'critChShAchPiece', ppid: 'critChShAchPiecePercent' },
        { raw: UPGS.fortune.boosts[5].effect(), pid: 'fortuneBoostCritChancePiece', ppid: 'fortuneBoostCritChancePiecePercent' },
        { raw: MISC.balance.plusCoins.buff().chanceBuffer, pid: 'plusCoinsForCritChancePiece', ppid: 'plusCoinsForCritChancePiecePercent' },
    ];

    // 1. АДДИТИВНАЯ ЗОНА (Считаем линейно, так как это сложение)
    const sumAdd = additiveSources.reduce((sum, src) => sum + src.raw, 0);

    additiveSources.forEach(src => {
        const pieceEl = document.getElementById(src.pid);
        const piecePercentEl = document.getElementById(src.ppid);
        if (!pieceEl || !piecePercentEl) return;

        if (src.raw <= 0 || sumAdd <= 0) {
            pieceEl.style.display = 'none';
            piecePercentEl.innerHTML = '';
            return;
        }

        // Вычисляем ИТОГОВЫЙ процент от всей высоты полосы (доля внутри зоны * размер зоны)
        const finalPct = (src.raw / sumAdd) * zoneAddPct;

        pieceEl.style.display = 'flex';
        pieceEl.style.height = finalPct + '%';
        piecePercentEl.innerHTML = (finalPct >= 3.0) ? finalPct.toFixed(2) + '%' : '';
    });

    // 2. МУЛЬТИПЛИКАТИВНАЯ ЗОНА (Считаем логарифмически, чтобы x1000000 не сожрал визуально x2)
    const getLogWeight = (val) => {
        if (val <= 1) return 0;
        return Math.log10(val);
    };

    const multWeights = multiplicativeSources.map(src => getLogWeight(src.raw));
    const sumMultWeights = multWeights.reduce((sum, w) => sum + w, 0);

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

        // Вычисляем ИТОГОВЫЙ процент от всей высоты полосы
        const finalPct = (w / sumMultWeights) * zoneMultPct;

        pieceEl.style.display = 'flex';
        pieceEl.style.height = finalPct + '%';
        piecePercentEl.innerHTML = (finalPct >= 3.0) ? finalPct.toFixed(2) + '%' : '';
    });

    setIf('summaryCritChanceStatsEffect', formatDecimal(GAIN.critical.chance.multiplicative(), 'boost') + "%");
}

// --- КРИТ. УРОН ---

function createCritMultiUI() {
    buildStatsUI('critMultiStats', 'critMultiGraphic', [
        { id: 'baseCriticalGainEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fifthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'ninthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critMuShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'thirdBuyableSuperEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'fortuneBoostCritMulti', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ], 'Общий множитель', 'summaryCritMultiStatsEffect');
}
createCritMultiUI();

function statsCritMultiUpdate() {
    applyStatsUpdate([
        { effectValue: () => GAIN.critical.baseMult, effectPrefix: 'x', effectMode: 'boost', effectId: 'baseCriticalGainEffectStatsEffect', pieceId: 'baseCriticalGainEffectPiece', piecePercentId: 'baseCriticalGainEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => Math.pow(5, UPGS.supercrystal[22].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthSuperCrystalSingleEffectStatsEffect', pieceId: 'fifthSuperCrystalSingleEffectPiece', piecePercentId: 'fifthSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.shop.permanent[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthShopBuyableEffectStatsEffect', pieceId: 'ninthShopBuyableEffectPiece', piecePercentId: 'ninthShopBuyableEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.minerals[1].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect2StatsEffect', pieceId: 'firstMineralEffect2Piece', piecePercentId: 'firstMineralEffect2PiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UNL.shard_achievements[9].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'critMuShAchStatsEffect', pieceId: 'critMuShAchPiece', piecePercentId: 'critMuShAchPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.fortune.boosts[6].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCritMultiStatsEffect', pieceId: 'fortuneBoostCritMultiPiece', piecePercentId: 'fortuneBoostCritMultiPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.coin.buyables[3].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdBuyableSuperEffectStatsEffect', pieceId: 'thirdBuyableSuperEffectPiece', piecePercentId: 'thirdBuyableSuperEffectPiecePercent', summary: () => GAIN.critical.multiplier() }
    ], 'summaryCritMultiStatsEffect', GAIN.critical.multiplier());
}

// --- СИМУЛЯЦИЯ КЛИКА ---

function createClickSimulationUI() {
    buildStatsUI('clickSimulationStats', 'clickSimulationGraphic', [
        { id: 'thirdSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'fortuneBoostSimulation', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
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
    buildStatsUI('prestigeMultiplierStats', 'prestigeMultiplierGraphic', [
        { id: 'prestigeBase', title: 'Базовый прирост', colorStyle: 'background-image: radial-gradient(rgba(0, 242, 255, 1), black 210%)' },
        { id: 'prestigeAch35', title: 'Достижение 35', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'prestigeBreakSingle13', title: 'Супер-престиж 13', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeShop6', title: 'Магазин 6', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'prestigeShardAch7', title: 'Осколки (ach7)', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeFortune22', title: 'Фортуна 22', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ], 'Итоговый прирост', 'summaryPrestigeStatsEffect');
}
createPrestigeUI();

function statsPrestigeUpdate() {
    applyStatsUpdate([
        { effectValue: () => (MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency + 10) - 14) : 1), effectPrefix: '', effectMode: 'number', effectId: 'prestigeBaseStatsEffect', pieceId: 'prestigeBasePiece', piecePercentId: 'prestigeBasePiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (ACHS.has(35) ? (1 + MISC.amount_of_upgrades.super() / 100) : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeAch35StatsEffect', pieceId: 'prestigeAch35Piece', piecePercentId: 'prestigeAch35PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.prestige.break.singles.includes(13) ? UPGS.prestige.break.singles[13].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeBreakSingle13StatsEffect', pieceId: 'prestigeBreakSingle13Piece', piecePercentId: 'prestigeBreakSingle13PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.shop.upgrades[6] ? UPGS.shop.buyables[6].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShop6StatsEffect', pieceId: 'prestigeShop6Piece', piecePercentId: 'prestigeShop6PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.shard.achievements[7] ? UNL.shard_achievements[7].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShardAch7StatsEffect', pieceId: 'prestigeShardAch7Piece', piecePercentId: 'prestigeShardAch7PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.fortune.upgrades.singles.includes(22) ? 2 : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFortune22StatsEffect', pieceId: 'prestigeFortune22Piece', piecePercentId: 'prestigeFortune22PiecePercent', summary: () => GAIN.prestige.reset() }
    ], 'summaryPrestigeStatsEffect', GAIN.prestige.reset(), 'number', '');
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
        let amount = crystals >= 1 ? crystals : coins;
        
        document.getElementsByClassName('save_coin_amount')[i].textContent = formatNumber(amount);
        document.getElementsByClassName('saveCurrency')[i].textContent = crystals >= 1 ? i18next.t('pbcurrency3') : i18next.t('pbcurrency1');

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