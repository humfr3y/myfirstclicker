function upgradesPurchasableCustom(currentUpgrades, currencyAmount, costPerUpgrade, increaseRate) {
    let totalCost = currencyAmount;
    let totalUpgrades = Math.floor(Math.log((totalCost * (increaseRate - 1) / costPerUpgrade + 1)) / Math.log(increaseRate));
    return totalUpgrades
}

function convert(input) {
    const [base, exponent] = input.split("e");
    const baseNum = parseFloat(base); // Преобразуем основание в число с плавающей точкой
    return baseNum * 10 ** parseInt(exponent, 10); 
}

function buyUpgrade(x) {
    if (!player.settings.modernization_activated) {
        if (player.settings.buy_max_activate) {
            UPGS.coin.buyables.max(x)
        }
        else UPGS.coin.buyables.buy(x)
    }
    else UPGS.coin.buyables.buy_super(x)
}

function buySingleUpgrade(x) {
    if (!player.settings.modernization_activated) {
        UPGS.coin.singles.buy(x)
    }
    else UPGS.coin.singles.buy_super(x)
}

function buyShopUpgrade(x) {
            UPGS.shop.buyables.max(x)
}

function buyShardUpgrade(x) {
        if (player.settings.shard_buy_max_activate) {
            UPGS.shard.buyables.max(x)
        }
        else UPGS.shard.buyables.buy(x)
}

function buySuperprestigeUpgrade(x) {
    if (player.settings.superprestige_buy_max_activate) {
        UPGS.prestige.super.buyables.max(x)
    }
    else UPGS.prestige.super.buyables.buy(x)
}

function totalCost(numUpgrades, firstCost, ratio) {
    return firstCost * ((Math.pow(ratio, numUpgrades) - 1) / (ratio - 1));
}

function totalCostFromCurrent(currentUpgrades, totalUpgrades, firstCost, ratio) {
    return totalCost(totalUpgrades, firstCost, ratio) - totalCost(currentUpgrades, firstCost, ratio)
}

function customLog(base, number) {
    return Math.log10(number) / Math.log10(base)
}

function randomNumber (min, max, digits) {
    if (digits > 0) {
        let result = Math.random() * (max - min) + min;
        return parseFloat(result.toFixed(digits));
    } else {
        let intMin = Math.ceil(min);
        let intMax = Math.floor(max);
        if (intMin > intMax) {
            return Math.round(min);
        }
        return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
    }
}


function reloadPage() {
    location.reload()
    doHardReset()
}

function reloadPage2() {
    location.reload()
}

function checkCompletedChallenges() {
    for (let i = 0; i < 12; i++) {
        if (player.challenge.completed.includes(i+1)) {
            window[`challenge${i+1}Start`].style.backgroundColor = '#3dde3d'
        }
    }
}

function changeInputValue2(arg){
    shopBulkBuyInput.value = arg
    player.settings.shop_bulkbuy = shopBulkBuyInput.value
}

shopBulkBuyInput.addEventListener("blur", ()=>{
    player.settings.shop_bulkbuy = shopBulkBuyInput.value
});

function hidePiece(condition, idOfPiece, idOfPiecePercent, summary) {
    if (condition > 1){
        idOfPiece.style.display = 'flex'
        idOfPiece.style.height = findRatio(condition, summary) + '%'
        if (findRatio(condition, summary) >= 4.5) {
            idOfPiecePercent.innerHTML = findRatio(condition, summary) + '%'
        }
        else idOfPiecePercent.innerHTML = ''
    }
    else {
        idOfPiece.style.display = 'none'
    }
}

function hidePieceDecimal(condition, idOfPiece, idOfPiecePercent, summary) {
    let condition2 = new Decimal(condition), summary2 = new Decimal(summary)
    if (condition2.gt(1)){
        idOfPiece.style.display = 'flex'
        idOfPiece.style.height = `calc(${findRatioDecimal(condition2, summary2) + '%'} - 1px)`
        if (new Decimal(findRatioDecimal(condition2, summary2)).gte(new Decimal(4.5))) {
            idOfPiecePercent.innerHTML = formatNumber(findRatioDecimal(condition2, summary2),'boost') + '%'
        }
        else idOfPiecePercent.innerHTML = ''
    }
    else {
        idOfPiece.style.display = 'none'
    }
}

function hidePiece2(condition, idOfPiece, idOfPiecePercent, summary, temp2) {
    if (condition > 0){
        idOfPiece.style.display = 'flex'
        idOfPiece.style.height = findRatio2(condition, summary) + '%'
        if (findRatio2(condition, summary) >= 4.5) {
            idOfPiecePercent.innerHTML = (findRatio2(condition, summary)/temp2).toFixed(2) + '%'
        }
        else idOfPiecePercent.innerHTML = ''
    }
    else {
        idOfPiece.style.display = 'none'
    }
}

function findSum(a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0) {
    return a+b+c+d+e+f+g+h+i+j+k+l+m+n+o+p+q+r+s+t+u+v+w+x+y+z
}

function formatNumber(number, mode='number', x=3) { //average
    switch (player.settings.notation) {
        case 'option1':
            if (number >= 1000) {
                if (number < 1e33 ) {
                    let standard = player.settings.currentLanguage == 'en' ? ['K','M','B','T','Qa','Qt','Sx','Sp','Oc','No','Dc'] : ['Тыс.','Mлн','Млрд','Трлн','Квдрлн','Квнтлн','Скс','Спт','Окт','Нон','Дц']
                    const index = Math.floor(Math.log10(number)/3)-1
                    const formula = number/Math.pow(10, (index+1)*3)
                    return formula.toFixed(2) + " " + standard[index]
                }
                else {
                    let standard1 = player.settings.currentLanguage == 'en' ? ["", "Un", "Du", "Tr", "Qd", "Qt", "Sx", "Sp", "Oc", "No"] : ["", "Ун", "Ду", "Тр", "Квд", "Квнт", "Скс", "Сп", "Ок", "Но"]
                    let standard2 = player.settings.currentLanguage == 'en' ? ["Dc", "Vg", "Tg", "Qg", "Qtg", "Sxg", "Spg", "Ocg", "Nog", "Ce"] : ["Дц", "Вг", "Трг", "Квдг", "Квнтг", "Сксг", "Сптг", "Октг", "Нонг", "Цен"]
                    const indexK = Math.floor(Math.log10(number/1000)/(30))-1 // k
                    const indexI = (Math.floor(Math.log10(number)/3)-1)-(10*(indexK+1))
                    const index = Math.floor(Math.log10(number)/3)
                    const formula = number/Math.pow(10, index*3)
                    return formula.toFixed(2) + " " + standard1[indexI] + standard2[indexK] 
                }
            }
            else { //if less than 1000
                switch (mode) {
                    case 'number': return number.toFixed(0)
                    case 'floor': return Math.floor(number).toString()
                    case 'boost': 
                        if (number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'power': 
                        if (number < 10) return number.toFixed(x);
                        else if (number >= 10 && number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'percent':
                        number *= 100
                        number -= 100
                        if (number < 10) return number.toFixed(2);
                        else return number.toFixed(0);
                }
            }
            
        case 'option2':
                if (number >= 1000000) {
                    return number.toExponential(2).replace("+","");
                }
                else if (number >= 1000 && number < 1000000) return number.toFixed(0)
                else { //if less than 1000000
                    switch (mode) {
                        case 'number': return number.toFixed(0)
                        case 'floor': return Math.floor(number).toString()
                        case 'boost': 
                            if (number < 100) return number.toFixed(2);
                            else return number.toFixed(0);
                        case 'power': 
                            if (number < 10) return number.toFixed(x);
                            else if (number >= 10 && number < 100) return number.toFixed(2);
                            else return number.toFixed(0);
                        case 'percent':
                            number *= 100
                            number -= 100
                            if (number < 10) return number.toFixed(2);
                            else return number.toFixed(0);
                    }
                }
        case 'option3':
            if (number >= 1000) {
                for (let i = 0; i < 308; i++) {
                    const formula = number/Math.pow(10, 3*(i+1))
                    if (formula < 1000) {
                        return formula.toFixed(2) + "e" + (i+1)*3
                    }
                }
            }
            else { //if less than 1000
                switch (mode) {
                    case 'number': return number.toFixed(0)
                    case 'floor': return Math.floor(number).toString()
                    case 'boost': 
                        if (number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'power': 
                        if (number < 10) return number.toFixed(x);
                        else if (number >= 10 && number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'percent':
                    number *= 100
                    number -= 100
                    if (number < 10) return number.toFixed(2);
                    else return number.toFixed(0);
                }
            }
        case 'option4':
                switch (mode) {
                    case 'percent': return "log " + Math.log10(((number*100)-100)+1).toFixed(3);
                    default: return "log " + Math.log10(number+1).toFixed(3);
                }
                
        case 'option5':
            if (number > 0) {
                return "TRUE"
            } else {
                return "FALSE"
            }
        case 'option6':
            return ""
        case 'option7':
            if (number >= 1000) {
                const num = player.settings.currentLanguage == 'en' ? 26 : 31
                if (number < Math.pow(10, (3*num)+3)) {
                    let letter = player.settings.currentLanguage == 'en' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЬЭЮЯ"
                    const index = Math.floor(Math.log10(number)/3)-1
                    const formula = number/Math.pow(10, (index+1)*3)
                    return formula.toFixed(2) + " " + letter[index]
                }
                else {
                    let letter = player.settings.currentLanguage == 'en' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЬЭЮЯ"
                    const indexK = Math.floor(Math.log10(number/1000)/(num*3))-1 // k
                    const indexI = (Math.floor(Math.log10(number)/3)-1)-(num*(indexK+1))
                    const index = Math.floor(Math.log10(number)/3)
                    const formula = number/Math.pow(10, index*3)
                    return formula.toFixed(2) + " " + letter[indexK] + letter[indexI] 
                }
            }
            else { //if less than 1000
                switch (mode) {
                    case 'number': return number.toFixed(0)
                    case 'floor': return Math.floor(number).toString()
                    case 'boost': 
                        if (number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'power': 
                        if (number < 10) return number.toFixed(x);
                        else if (number >= 10 && number < 100) return number.toFixed(2);
                        else return number.toFixed(0);
                    case 'percent':
                        number *= 100
                        number -= 100
                        if (number < 10) return number.toFixed(2);
                        else return number.toFixed(0);
                }
            }
    }
}

// function formatNumber3(number) { //for returning into 3.99 = 3
//     if (number < 1000000) {
//         return Math.floor(number).toString()
//     } else {
//         return number.toExponential(2).replace("+","");
//     }
// }

function formatNumber4(number) { //more complicated unused
    switch (true) {
        case number == Math.floor(number):
            return number.toFixed(0)
        case number < 1.1:
            return number.toFixed(3)
        case number < 2 && number >= 1.1:
            return number.toFixed(2)
        case number < 10 && number >= 2:
            return number.toFixed(1)
        case number < 1000000 && number >= 10:
            return number.toFixed(0)
        // default:
        //     return number.toExponential(2).replace("+","");
    }
}

    function formatBoost(boost) { //multipliers
    if (boost < 100) {
        return boost.toFixed(2);
    } else if (boost >= 100 && boost < 1000000) {
        return boost.toFixed(0);
    } else {
        return boost.toExponential(2).replace("+","");
    }
}

function formatPower(power) { //powers
    if (power < 10) {
        return power.toFixed(3);
    } else if (power >= 10 && power < 1000000) {
        return power.toFixed(0);
    } else {
        return power.toExponential(2).replace("+","");
    }
}

// Форматирование для значений библиотеки Break Infinity (Decimal)
function formatDecimal(value, mode='number', x=3) {
    // Числа обрабатываем стандартным форматтером
    if (typeof value === 'number') return formatNumber(value, mode, x)

    // Попытка получить безопасный number из Decimal
    try {
        if (value && typeof value.toNumber === 'function') {
            const n = value.toNumber()
            if (isFinite(n)) return formatNumber(n, mode, x)
        }
    } catch (e) {}

    // Работать со строковым представлением, например "1.23e45"
    try {
        const s = value.toString()
        if (s.includes('e')) {
            const parts = s.split('e')
            const mant = Number(parts[0])
            const exp = parts[1].replace('+','')
            let mantStr
            if (mode === 'power') {
                mantStr = mant < 10 ? mant.toFixed(x) : (mant < 100 ? mant.toFixed(2) : mant.toFixed(0))
            } else if (mode === 'boost') {
                mantStr = mant < 100 ? mant.toFixed(2) : mant.toFixed(0)
            } else {
                mantStr = mant < 1000 ? mant.toFixed(2) : mant.toFixed(0)
            }
            return mantStr + 'e' + exp
        }
        return s
    } catch (e) {
        return String(value)
    }
}

function formatPercent(percent) {
    percent *= 100
    if (percent < 10) {
        return percent.toFixed(2);
    } else if (percent >= 10 && percent < 1000000) {
        return percent.toFixed(0);
    } else {
        return percent.toExponential(2).replace("+","");
    }
}

function startChallenge(number, again=false) {
    if (!ACHS.has(31)) ACHS.unl(31)
    if (again == true && restartChallenge.checked) {
        LAYERS.reset_time()
        LAYERS.doReset()
        LAYERS.doForcedReset()
        return 0
    }
    if (number == 0 && restartChallenge.checked) {
        startChallenge(player.challenge.activated)
        return 0
    }
    else if (number != 13) {
        player.challenge.activated = number
        LAYERS.doReset()
        LAYERS.doForcedReset()
        LAYERS.reset_time()
    }
    else if (number == 13){
        player.challenge.activated = 0
        LAYERS.doReset()
        LAYERS.doForcedReset()
    } 
}

function generateRune(number) {
    for (let i = 0; i < number; i++) {
        if (player.prestige.currency >= UNL.rune.cost()) {
            player.prestige.currency -= UNL.rune.cost()
            player.rune.currency++
            player.rune.total_currency++
        }
        else break
    }
}

function createMineral(x) {
    if (player.shard.currency >= UPGS.minerals[x].cost2() && player.rune.currency >= UPGS.minerals[x].cost1()) {
        let bulk = UPGS.minerals[x].bulk()
        player.minerals[x] += bulk.iter
        player.rune.currency -= bulk.bulk1
        player.shard.currency -= bulk.bulk2
    }
}

function respecMinerals() {
    player.rune.currency = 0
    player.rune.total_currency = 0
    player.minerals[1] = 0
    player.minerals[2] = 0
    player.minerals[3] = 0
    player.minerals[4] = 0
    LAYERS.doForcedReset()
}

function respecBuyables() {
    for (let i = 1; i <= 5; i++)
        player.shop.upgrades[i] = 0
    player.supercoin.currency += player.supercoin.spent_currency
    player.supercoin.spent_currency = 0
}

function respecSuperCrystalSingles() {
    for (let i = 1; i <= 9; i++)
        player.supercrystal.upgrades = []
    player.supercrystal.currency += player.supercrystal.total_currency-player.shard_achievements.length-player.supercrystal.spent_currency_on_fortune_upgrades
    LAYERS.doReset()
    LAYERS.doForcedReset()
}


let modernizeBlink = ''
function modernize() {
    player.settings.modernization_activated ? player.settings.modernization_activated = false : player.settings.modernization_activated = true
    if (player.settings.modernization_activated){
        for (let j = 1; j <= 3; j++)
        for (let i = 0; i <= 4; i++){
            const id = i+((j-1)*5), upg_id = (j*10+i+1)-10
            let upgrade = ''
            if (id < 5) {
                upgrade = UPGS.coin.buyables[id+1]
                upgrade.element.classList.remove('buyableButton')
            }
            if (id >= 5 && id < 15) {
                upgrade = UPGS.coin.singles[upg_id]
                upgrade.element.classList.remove('singleButton')
            }
            if (upgrade.unl_super()) {
                upgrade.element.style.backgroundColor = 'rgb(255, 174, 0)'; 
                upgrade.element.style.color = 'black'
            }
            if (!upgrade.unl_super() && upgrade.element.disabled == false) {
                upgrade.element.style.borderColor = 'rgb(255, 174, 0)'
            }
        }
        modernizeBlink = setInterval(()=> {
            for (let j = 1; j <= 3; j++)
            for (let i = 0; i <= 4; i++){
                const id = i+((j-1)*5), upg_id = (j*10+i+1)-10
                let upgrade = ''
                if (id < 5) {
                    upgrade = UPGS.coin.buyables[id+1]
                }
                if (id >= 5 && id < 15) {
                    upgrade = UPGS.coin.singles[upg_id]
                }
                if (!upgrade.unl_super() && upgrade.element.disabled == false) {
                    upgrade.element.style.color = 'white'
                    upgrade.element.style.backgroundColor == 'rgb(106, 73, 0)' ? upgrade.element.style.backgroundColor = '#000000' : upgrade.element.style.backgroundColor = 'rgb(106, 73, 0)'
                    upgrade.element.style.borderColor = 'rgb(255, 174, 0)'
                }
                else if (upgrade.element.disabled == true) {
                    upgrade.element.style.removeProperty('color')
                    upgrade.element.style.removeProperty('border-color')
                    upgrade.element.style.removeProperty('background-color')
                }
                else if (upgrade.unl_super()) {
                    upgrade.element.style.backgroundColor = 'rgb(255, 174, 0)'; 
                    upgrade.element.style.color = 'black'
                }
            }
        }, 500)
    }
    else {
        clearInterval(modernizeBlink)
        modernizeBlink = ''
        for (let j = 1; j <= 3; j++)
            for (let i = 0; i <= 4; i++){
                const id = i+((j-1)*5), upg_id = (j*10+i+1)-10
                let upgrade = ''
                if (id < 5) {
                    upgrade = UPGS.coin.buyables[id+1]
                    upgrade.element.classList.add('buyableButton')
                }
                if (id >= 5 && id < 15) {
                    upgrade = UPGS.coin.singles[upg_id]
                    upgrade.element.classList.add('singleButton')
                }
                upgrade.element.style.removeProperty('color')
                upgrade.element.style.removeProperty('border-color')
                upgrade.element.style.removeProperty('background-color')
            }
        }
    }

function checkSuperUpgradesForTooltips() {
    for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 5; c++){
            const id = c+((r-1)*5)-1
            if (player.coin.superUpgrades.includes(r*10+c)) {
                document.getElementsByClassName('tooltipUpgrade')[id].style.opacity = '1'
            }
        }
    }
}

function convertToTwoDigits(arg) {
    return Math.floor(arg).toString().padStart(2, '0');
}

function getLeftValue(a, b) {
  if (a == b) return 50
  if (b === 0) return 100; // a/0 = 100 0
  if (a === 0) return 0;   // 0/b = 0 100
  return Math.round((a / (a + b)) * 100); // a/b = [a/(a+b)]% [b/(a+b)]%
}

// Функция для правого значения (второе число)
function getRightValue(a, b) {
  if (b == a) return 50
  if (b === 0) return 0;   // a/0 = 100 0
  if (a === 0) return 100; // 0/b = 0 100
  return 100 - getLeftValue(a, b); // Просто дополнение до 100%
}

function subtractPercentage(value, percentCoeff) {
    return value * (2 - percentCoeff)
}

function statsPerClickUpdate() { //multi breakdown click
    // Источники множителя для «Нажатие» — описываются в массиве, чтобы UI был динамичным
    const gainWithoutPower = findMultiplierDecimal(
        GAIN.coin.gain.no_softcap_effect().pow(1 / (player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)),
        (player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)
    )

    const sources = [
        { effectValue: () => UPGS.coin.buyables[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'doublerStatsEffect', pieceId: 'doublerPiece', piecePercentId: 'doublerPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'midasCursorStatsEffect', pieceId: 'midasCursorPiece', piecePercentId: 'midasCursorPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.coin.singles[23].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'rewardForFeatsStatsEffect', pieceId: 'rewardForFeatsPiece', piecePercentId: 'rewardForFeatsPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => CHALL[6].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'challenge6StatsEffect', pieceId: 'challenge6Piece', piecePercentId: 'challenge6PiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => UPGS.shop.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'goldenGloveStatsEffect', pieceId: 'goldenGlovePiece', piecePercentId: 'goldenGlovePiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        { effectValue: () => GAIN.coin.gain.effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'gainClickStatsEffect', pieceId: 'gainClickPiece', piecePercentId: 'gainClickPiecePercent', summary: () => GAIN.coin.click.no_softcap_effect() },
        // Challenge 1 отображаем как степень — выводим эффект как степень, но для графика используем "gainWithoutPower"
        { effectValue: () => (player.challenge.completed.includes(1) ? CHALL[1].effect() : 1), effectPrefix: '^', effectMode: 'power', effectId: 'challenge1StatsEffect', pieceId: 'challenge1Piece', piecePercentId: 'challenge1PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        // Значение для текста и графика (возможно Decimal)
        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        // Текст эффекта — используем форматтер, который понимает Decimal
        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        // Графическая полоска (процент)
        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            // hidePieceDecimal корректно создаст Decimal из строки
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summaryClickStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.coin.click.effect(), 'boost')
}

function statsPerSecondUpdate() {
    // Источники множителя для «Второе» — описываем в массиве и обновляем циклом
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
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        // Текст эффекта — используем Decimal‑безопасный форматтер
        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        // Графическая полоска
        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summarySecondStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.coin.second.effect(), 'boost')
}

function statsGainUpdate() {
    // Рассчитываем промежуточные значения для графиков, когда нужно убрать степень
    const gainWithoutPower1 = findMultiplierDecimal(GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.coin.buyables[5].effect()), UPGS.coin.buyables[5].effect())
    const temp1 = GAIN.coin.gain.no_softcap_effect().pow(1 / UPGS.coin.buyables[5].effect())
    const gainWithoutPower2 = findMultiplierDecimal(temp1.pow(1 / UPGS.prestige.singles[12].effect()), UPGS.prestige.singles[12].effect())
    const temp2 = temp1.pow(1 / UPGS.prestige.singles[12].effect())
    const gainWithoutPower3 = findMultiplierDecimal(temp2.pow(1 / GAIN.upower.effect()), GAIN.upower.effect())

    // Описание источников (effectId, pieceId и т.д.) — data-driven
    const sources = [
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
        { effectValue: () => GAIN.upower.effect(), effectPrefix: '^', effectMode: 'power', effectId: 'upowerStatsEffect', pieceId: 'upowerPiece', piecePercentId: 'upowerPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower3 },
        { effectValue: () => UPGS.prestige.singles[12].effect(), effectPrefix: '^', effectMode: 'power', effectId: 'activity2StatsEffect', pieceId: 'activity2Piece', piecePercentId: 'activity2PiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower2 },
        { effectValue: () => UPGS.coin.buyables[5].effect(), effectPrefix: '^', effectMode: 'power', effectId: 'alphaPowerStatsEffect', pieceId: 'alphaPowerPiece', piecePercentId: 'alphaPowerPiecePercent', summary: () => GAIN.coin.gain.no_softcap_effect(), graphicValue: () => gainWithoutPower1 }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summaryGainStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.coin.gain.effect(), 'boost')
}

function statsSuperCoinChanceUpdate() {
    // Для корректной работы с Decimal и чтобы UI был динамичным — используем sources
    const ach37Graphic = () => findMultiplierInAdditive(ACHS.has(37), GAIN.supercoin.chance())

    const sources = [
        { effectValue: () => UPGS.shop.buyables[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'luckyCloverStatsEffect', pieceId: 'luckyCloverPiece', piecePercentId: 'luckyCloverPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.coin.singles[13].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdSingleSuperEffectStatsEffect', pieceId: 'thirdSingleSuperEffectPiece', piecePercentId: 'thirdSingleSuperEffectPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.prestige.singles[13].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'charismaStatsEffect', pieceId: 'charismaPiece', piecePercentId: 'charismaPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => (Math.pow(1.5, UPGS.supercrystal[11].unl())), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstSuperCrystalEffectStatsEffect', pieceId: 'firstSuperCrystalEffectPiece', piecePercentId: 'firstSuperCrystalEffectPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.minerals[1].effect3(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect3StatsEffect', pieceId: 'firstMineralEffect3Piece', piecePercentId: 'firstMineralEffect3PiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UNL.shard_achievements[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'superDvorStatsEffect', pieceId: 'superDvorPiece', piecePercentId: 'superDvorPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.prestige.super.singles[12].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'hercCursorStatsEffect', pieceId: 'hercCursorPiece', piecePercentId: 'hercCursorPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => UPGS.fortune.boosts[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostSupercoinStatsEffect', pieceId: 'fortuneBoostSupercoinPiece', piecePercentId: 'fortuneBoostSupercoinPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => MISC.balance.plusCoins.buff().chanceBuffer, effectPrefix: 'x', effectMode: 'boost', effectId: 'plusCoinForSupercoinStatsEffect', pieceId: 'plusCoinForSupercoinPiece', piecePercentId: 'plusCoinForSupercoinPiecePercent', summary: () => GAIN.supercoin.chance() },
        { effectValue: () => Number(ACHS.has(37)), effectPrefix: '+', effectMode: 'boost', effectId: 'achievement37StatsEffect', pieceId: 'achievement37Piece', piecePercentId: 'achievement37PiecePercent', summary: () => GAIN.supercoin.chance(), graphicValue: ach37Graphic }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summarySCChanceStatsEffect')
    if (summaryEl) summaryEl.innerHTML = formatNumber(GAIN.supercoin.chance(), 'boost') + "%"
}

function statsCrystalsUpdate(){
    // Data-driven version: обновляем текст и графические куски из описателя источников
    const gain = player.prestige.super.singles.includes(25) ? Math.pow(1.35+UPGS.prestige.super.buyables[1].effect(), Math.log10((player.coin.currency+10)/1e15)) : 1

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
        { effectValue: () => (player.supercrystal.upgrades.includes(12) ? 3 : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFameStatsEffect', pieceId: 'prestigeFamePiece', piecePercentId: 'prestigeFamePiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UNL.shard_achievements[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'crystalShAchStatsEffect', pieceId: 'crystalShAchPiece', piecePercentId: 'crystalShAchPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => ACHS.effect.crystal(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus2StatsEffect', pieceId: 'achievementBonus2Piece', piecePercentId: 'achievementBonus2PiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => UPGS.fortune.boosts[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCrystalStatsEffect', pieceId: 'fortuneBoostCrystalPiece', piecePercentId: 'fortuneBoostCrystalPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        { effectValue: () => MISC.balance.minusCoins.buff().crystalGainBuff, effectPrefix: 'x', effectMode: 'boost', effectId: 'minusCoinsForCrystalsStatsEffect', pieceId: 'minusCoinsForCrystalsPiece', piecePercentId: 'minusCoinsForCrystalsPiecePercent', summary: () => GAIN.crystal.no_softcap_reset() },
        // Софткап: только отображение степени (нет графического куска)
        { effectValue: () => GAIN.crystal.softcap().softcap_power, effectPrefix: '^', effectMode: 'power', effectId: 'CRYSTAL_GAIN_SC_001StatsEffect' }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        if (src.pieceId && src.piecePercentId) {
            const pieceEl = document.getElementById(src.pieceId)
            const piecePercentEl = document.getElementById(src.piecePercentId)
            if (pieceEl && piecePercentEl) {
                const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
                const summaryRaw = src.summary()
                const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
                hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
            }
        }
    })

    const summaryEl = document.getElementById('summaryCrystalStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.crystal.reset(), 'boost')
}

function statsShardsPerClickUpdate() {
    const sources = [
        { effectValue: () => UPGS.shard.buyables[1].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstShardBuyableEffectStatsEffect', pieceId: 'firstShardBuyableEffectPiece', piecePercentId: 'firstShardBuyableEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffectStatsEffect', pieceId: 'fifthShopBuyableEffectPiece', piecePercentId: 'fifthShopBuyableEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthSuperCrystalSingleEffectStatsEffect', pieceId: 'ninthSuperCrystalSingleEffectPiece', piecePercentId: 'ninthSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.shard.click() },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardClickStatsEffect', pieceId: 'fortuneBoostShardClickPiece', piecePercentId: 'fortuneBoostShardClickPiecePercent', summary: () => GAIN.shard.click() }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summaryShPerClickStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.shard.click(), 'boost')
}

function statsShardsPerSecondUpdate() {
    const sources = [
        { effectValue: () => UPGS.shard.buyables[2].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'secondShardBuyableEffectStatsEffect', pieceId: 'secondShardBuyableEffectPiece', piecePercentId: 'secondShardBuyableEffectPiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.shop.buyables[5].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthShopBuyableEffect2StatsEffect', pieceId: 'fifthShopBuyableEffect2Piece', piecePercentId: 'fifthShopBuyableEffect2PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.minerals[3].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdMineralEffect2StatsEffect', pieceId: 'thirdMineralEffect2Piece', piecePercentId: 'thirdMineralEffect2PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UNL.shard_achievements[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'shardShAchStatsEffect', pieceId: 'shardShAchPiece', piecePercentId: 'shardShAchPiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => Math.pow(1.337, ACHS.has(39)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement39StatsEffect', pieceId: 'achievement39Piece', piecePercentId: 'achievement39PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => ACHS.effect.shard(), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievementBonus3StatsEffect', pieceId: 'achievementBonus3Piece', piecePercentId: 'achievementBonus3PiecePercent', summary: () => GAIN.shard.second() },
        { effectValue: () => UPGS.fortune.boosts[3].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostShardSecondStatsEffect', pieceId: 'fortuneBoostShardSecondPiece', piecePercentId: 'fortuneBoostShardSecondPiecePercent', summary: () => GAIN.shard.second() }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
            const summaryRaw = src.summary()
            const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
            hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
        }
    })

    const summaryEl = document.getElementById('summaryShPerSecondStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.shard.second(), 'boost')
}

function statsShardsEffectUpdate() {
    // Data-driven update for shard effects (including softcap power handling)
    const sources = [
        { effectValue: () => 1 + player.shard.currency / 100, effectPrefix: 'x', effectMode: 'boost', effectId: 'shardStatsEffect', pieceId: 'shardPiece', piecePercentId: 'shardPiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)), effectPrefix: 'x', effectMode: 'boost', effectId: 'achievement30StatsEffect', pieceId: 'achievement30Piece', piecePercentId: 'achievement30PiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => UPGS.shard.singles[21].effect(), effectPrefix: '^', effectMode: 'power', effectId: 'fourthShardSingleEffectStatsEffect', pieceId: 'fourthShardSingleEffectPiece', piecePercentId: 'fourthShardSingleEffectPiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect(), graphicValue: () => findMultiplier(Math.pow(GAIN.shard.effect.no_softcap_effect(), 1 / UPGS.shard.singles[21].effect()), UPGS.shard.singles[21].effect()) },
        { effectValue: () => (player.challenge.completed.includes(7) ? CHALL[7].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'challengeReward7StatsEffect', pieceId: 'challengeReward7Piece', piecePercentId: 'challengeReward7PiecePercent', summary: () => GAIN.shard.effect.no_softcap_effect() },
        { effectValue: () => GAIN.shard.effect.softcap().softcap_power, effectPrefix: '^', effectMode: 'power', effectId: 'SHARD_EFF_SC_001StatsEffect' }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const effectRaw = src.effectValue()
        const graphicRaw = src.graphicValue ? src.graphicValue() : effectRaw

        if (src.effectPrefix === '^') {
            effectEl.innerHTML = '^' + formatDecimal(effectRaw, 'power')
        } else {
            effectEl.innerHTML = src.effectPrefix + formatDecimal(effectRaw, src.effectMode)
        }

        if (src.pieceId && src.piecePercentId) {
            const pieceEl = document.getElementById(src.pieceId)
            const piecePercentEl = document.getElementById(src.piecePercentId)
            if (pieceEl && piecePercentEl) {
                const valToPass = (graphicRaw && typeof graphicRaw.toString === 'function') ? graphicRaw.toString() : graphicRaw
                const summaryRaw = src.summary()
                const summaryToPass = (summaryRaw && typeof summaryRaw.toString === 'function') ? summaryRaw.toString() : summaryRaw
                hidePieceDecimal(valToPass, pieceEl, piecePercentEl, summaryToPass)
            }
        }
    })

    const summaryEl = document.getElementById('summaryShEffectStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatNumber(GAIN.shard.effect.effect(), 'boost')
}

function statsCritChanceUpdate() {
    // Текстовые значения (Decimal-aware)
    const setIf = (id, text) => { const el = document.getElementById(id); if (el) el.innerHTML = text }
    setIf('baseCriticalChanceEffectStatsEffect', '+' + formatDecimal(GAIN.critical.baseChance, 'boost'))
    setIf('fourthSuperCrystalSingleEffectStatsEffect', '+' + formatDecimal(UPGS.supercrystal[21].unl() ? 2 : 0, 'boost'))
    setIf('eighthShopBuyableEffectStatsEffect', '+' + formatDecimal(UPGS.shop.permanent[3].effect(), 'boost'))
    setIf('firstMineralEffect1StatsEffect', 'x' + formatDecimal(UPGS.minerals[1].effect1(), 'boost'))
    setIf('critChShAchStatsEffect', 'x' + formatDecimal(UNL.shard_achievements[8].effect(), 'boost'))
    setIf('fortuneBoostCritChanceStatsEffect', 'x' + formatDecimal(UPGS.fortune.boosts[5].effect(), 'boost'))
    setIf('plusCoinsForCritChanceStatsEffect', 'x' + formatDecimal(MISC.balance.plusCoins.buff().chanceBuffer, 'boost'))
    setIf('fifthBuyableSuperEffectStatsEffect', '^' + formatDecimal(UPGS.coin.buyables[5].effect_super(), 'power'))

    // Новая графика: используем логарифмическое взвешивание, чтобы избежать доминирования больших мультипликаторов
    const zoneAddPct = 25 // процент высоты для аддитивной зоны
    const zoneMultPct = 100 - zoneAddPct

    const gainWithoutPower = findMultiplier(Math.pow(GAIN.critical.chance.multiplicative(), 1 / UPGS.coin.buyables[5].effect_super()), UPGS.coin.buyables[5].effect_super())

    const additiveSources = [
        { raw: 1, pid: 'baseCriticalChanceEffectPiece', ppid: 'baseCriticalChanceEffectPiecePercent' },
        { raw: (UPGS.supercrystal[21].unl() ? 2 : 0), pid: 'fourthSuperCrystalSingleEffectPiece', ppid: 'fourthSuperCrystalSingleEffectPiecePercent' },
        { raw: UPGS.shop.permanent[3].effect(), pid: 'eighthShopBuyableEffectPiece', ppid: 'eighthShopBuyableEffectPiecePercent' }
    ]

    const multiplicativeSources = [
        { raw: UPGS.minerals[1].effect1(), pid: 'firstMineralEffect1Piece', ppid: 'firstMineralEffect1PiecePercent' },
        { raw: UNL.shard_achievements[8].effect(), pid: 'critChShAchPiece', ppid: 'critChShAchPiecePercent' },
        { raw: UPGS.fortune.boosts[5].effect(), pid: 'fortuneBoostCritChancePiece', ppid: 'fortuneBoostCritChancePiecePercent' },
        { raw: MISC.balance.plusCoins.buff().chanceBuffer, pid: 'plusCoinsForCritChancePiece', ppid: 'plusCoinsForCritChancePiecePercent' },
        { raw: gainWithoutPower, pid: 'fifthBuyableSuperEffectPiece', ppid: 'fifthBuyableSuperEffectPiecePercent' }
    ]

    // Конвертация аддитивных raw -> мультипликаторы
    const additiveMs = additiveSources.map(s => findMultiplierInAdditive(s.raw, GAIN.critical.chance.multiplicative()))
    const multiplicativeMs = multiplicativeSources.map(s => s.raw)

    // Функция веса: log10(ms), но урезаем нижнюю грань, чтобы не было отрицательных/нулевых весов
    const msToWeight = (m) => {
        try {
            const v = Math.log10(Number(m))
            return (isFinite(v) && v > 0) ? v : 0.0001
        } catch (e) { return 0.0001 }
    }

    const additiveWeights = additiveMs.map(msToWeight)
    const multiplicativeWeights = multiplicativeMs.map(msToWeight)

    const sumAddWeights = additiveWeights.reduce((a, b) => a + b, 0)
    const sumMultWeights = multiplicativeWeights.reduce((a, b) => a + b, 0)
    const totalWeight = sumAddWeights + sumMultWeights

    // Отрисовка общей аддитивной полосы (совместимость с hover/старым видом)
    const criticalGraphicEl = document.getElementById('criticalGraphic')
    const criticalGraphicSpanEl = document.getElementById('criticalGraphicSpan')
    if (criticalGraphicEl && criticalGraphicSpanEl) hidePiece(GAIN.critical.chance.additive(), criticalGraphicEl, criticalGraphicSpanEl, GAIN.critical.chance.multiplicative())

    // Отрисовка аддитивных сегментов: высота внутри аддитивной зоны, метка — процент от полной шкалы (по весам)
    additiveSources.forEach((src, idx) => {
        const pieceEl = document.getElementById(src.pid)
        const piecePercentEl = document.getElementById(src.ppid)
        if (!pieceEl || !piecePercentEl) return

        const w = additiveWeights[idx]
        const percentOfWhole = totalWeight > 0 ? (w / totalWeight) * 100 : 0

        if (percentOfWhole <= 0 || sumAddWeights <= 0) {
            pieceEl.style.display = 'none'
            piecePercentEl.innerHTML = ''
            return
        }

        const height = (w / sumAddWeights) * zoneAddPct
        if (height < 0.5) { pieceEl.style.display = 'none'; piecePercentEl.innerHTML = ''; return }
        pieceEl.style.display = 'flex'
        pieceEl.style.height = height + '%'
        piecePercentEl.innerHTML = (percentOfWhole >= 4.5) ? percentOfWhole.toFixed(2) + '%' : ''
    })

    // Отрисовка мультипликативных сегментов: высота внутри мультипликативной зоны, метка — процент от полной шкалы (по весам)
    multiplicativeSources.forEach((src, idx) => {
        const pieceEl = document.getElementById(src.pid)
        const piecePercentEl = document.getElementById(src.ppid)
        if (!pieceEl || !piecePercentEl) return

        const w = multiplicativeWeights[idx]
        const percentOfWhole = totalWeight > 0 ? (w / totalWeight) * 100 : 0

        if (percentOfWhole <= 0 || sumMultWeights <= 0) {
            pieceEl.style.display = 'none'
            piecePercentEl.innerHTML = ''
            return
        }

        const height = (w / sumMultWeights) * zoneMultPct
        if (height < 0.5) { pieceEl.style.display = 'none'; piecePercentEl.innerHTML = ''; return }
        pieceEl.style.display = 'flex'
        pieceEl.style.height = height + '%'
        piecePercentEl.innerHTML = (percentOfWhole >= 4.5) ? percentOfWhole.toFixed(2) + '%' : ''
    })

    setIf('summaryCritChanceStatsEffect', formatDecimal(GAIN.critical.chance.multiplicative(), 'boost') + "%")
}

function statsCritMultiUpdate() {
    const sources = [
        { effectValue: () => GAIN.critical.baseMult, effectPrefix: 'x', effectMode: 'boost', effectId: 'baseCriticalGainEffectStatsEffect', pieceId: 'baseCriticalGainEffectPiece', piecePercentId: 'baseCriticalGainEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => Math.pow(5, UPGS.supercrystal[22].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'fifthSuperCrystalSingleEffectStatsEffect', pieceId: 'fifthSuperCrystalSingleEffectPiece', piecePercentId: 'fifthSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.shop.permanent[4].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'ninthShopBuyableEffectStatsEffect', pieceId: 'ninthShopBuyableEffectPiece', piecePercentId: 'ninthShopBuyableEffectPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.minerals[1].effect2(), effectPrefix: 'x', effectMode: 'boost', effectId: 'firstMineralEffect2StatsEffect', pieceId: 'firstMineralEffect2Piece', piecePercentId: 'firstMineralEffect2PiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UNL.shard_achievements[9].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'critMuShAchStatsEffect', pieceId: 'critMuShAchPiece', piecePercentId: 'critMuShAchPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.fortune.boosts[6].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostCritMultiStatsEffect', pieceId: 'fortuneBoostCritMultiPiece', piecePercentId: 'fortuneBoostCritMultiPiecePercent', summary: () => GAIN.critical.multiplier() },
        { effectValue: () => UPGS.coin.buyables[3].effect_super(), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdBuyableSuperEffectStatsEffect', pieceId: 'thirdBuyableSuperEffectPiece', piecePercentId: 'thirdBuyableSuperEffectPiecePercent', summary: () => GAIN.critical.multiplier() }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const eff = src.effectValue()
        effectEl.innerHTML = src.effectPrefix + formatDecimal(eff, src.effectMode)

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            hidePiece(eff, pieceEl, piecePercentEl, src.summary())
        }
    })

    const summaryEl = document.getElementById('summaryCritMultiStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatDecimal(GAIN.critical.multiplier(), 'boost')
}

function statsClickSimulationUpdate() {
    const sources = [
        { effectValue: () => Math.pow(2, UPGS.supercrystal[13].unl()), effectPrefix: 'x', effectMode: 'boost', effectId: 'thirdSuperCrystalSingleEffectStatsEffect', pieceId: 'thirdSuperCrystalSingleEffectPiece', piecePercentId: 'thirdSuperCrystalSingleEffectPiecePercent', summary: () => GAIN.simulation.multiplier() },
        { effectValue: () => UPGS.fortune.boosts[10].effect(), effectPrefix: 'x', effectMode: 'boost', effectId: 'fortuneBoostSimulationStatsEffect', pieceId: 'fortuneBoostSimulationPiece', piecePercentId: 'fortuneBoostSimulationPiecePercent', summary: () => GAIN.simulation.multiplier() }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return
        const eff = src.effectValue()
        effectEl.innerHTML = src.effectPrefix + formatDecimal(eff, src.effectMode)

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) hidePiece(eff, pieceEl, piecePercentEl, src.summary())
    })

    const summaryEl = document.getElementById('summaryClickSimStatsEffect')
    if (summaryEl) summaryEl.innerHTML = 'x' + formatDecimal(GAIN.simulation.multiplier(), 'boost')
}

function statsPrestigeUpdate() {
    const sources = [
        { effectValue: () => (MILESTONES.has(15) ? Math.floor(Math.log10(player.coin.currency + 10) - 14) : 1), effectPrefix: '', effectMode: 'number', effectId: 'prestigeBaseStatsEffect', pieceId: 'prestigeBasePiece', piecePercentId: 'prestigeBasePiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (ACHS.has(35) ? (1 + MISC.amount_of_upgrades.super() / 100) : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeAch35StatsEffect', pieceId: 'prestigeAch35Piece', piecePercentId: 'prestigeAch35PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.prestige.super.singles.includes(13) ? UPGS.prestige.super.singles[13].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeSuperSingle13StatsEffect', pieceId: 'prestigeSuperSingle13Piece', piecePercentId: 'prestigeSuperSingle13PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.shop.upgrades[6] ? UPGS.shop.buyables[6].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShop6StatsEffect', pieceId: 'prestigeShop6Piece', piecePercentId: 'prestigeShop6PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.shard.achievements[7] ? UNL.shard_achievements[7].effect() : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeShardAch7StatsEffect', pieceId: 'prestigeShardAch7Piece', piecePercentId: 'prestigeShardAch7PiecePercent', summary: () => GAIN.prestige.reset() },
        { effectValue: () => (player.fortune.upgrades.singles.includes(22) ? 2 : 1), effectPrefix: 'x', effectMode: 'boost', effectId: 'prestigeFortune22StatsEffect', pieceId: 'prestigeFortune22Piece', piecePercentId: 'prestigeFortune22PiecePercent', summary: () => GAIN.prestige.reset() }
    ]

    sources.forEach(src => {
        const effectEl = document.getElementById(src.effectId)
        if (!effectEl) return

        const eff = src.effectValue()
        // Отображаем значение
        if (src.effectPrefix === '^') effectEl.innerHTML = '^' + formatDecimal(eff, 'power')
        else effectEl.innerHTML = (src.effectPrefix || '') + formatDecimal(eff, src.effectMode)

        const pieceEl = document.getElementById(src.pieceId)
        const piecePercentEl = document.getElementById(src.piecePercentId)
        if (pieceEl && piecePercentEl) {
            // Для простоты используем hidePiece (работает с числами >1)
            hidePiece(eff, pieceEl, piecePercentEl, src.summary())
        }
    })

    const summaryEl = document.getElementById('summaryPrestigeStatsEffect')
    if (summaryEl) summaryEl.innerHTML = formatDecimal(GAIN.prestige.reset(), 'number')
}


function hoverColor(iden){
    let stats = iden + "Stats";
    let effect = iden + "StatsEffect"
    let element = document.getElementById(stats)
    let element2 = document.getElementById(effect)
    element.style.color = 'yellow';
    element2.style.color = 'yellow';
}

function hoverColorInverse(iden){
    let stats = iden + "Stats";
    let effect = iden + "StatsEffect"
    let element = document.getElementById(stats)
    let element2 = document.getElementById(effect)
    element.style.color = 'white';
    element2.style.color = 'white';
}

function unlockShardAch(x) {
    if (player.supercrystal.currency > 0) {
        player.supercrystal.currency--
        player.shard_achievements.push(x)
    }
}

// Создаёт DOM-элементы для вкладки "Нажатие" (stats + graphic)
function createGainPerClickUI() {
    const statsContainer = document.getElementById('gainPerClickStats')
    const graphicContainer = document.getElementById('gainPerClickGraphic')
    if (!statsContainer || !graphicContainer) return

    // Описание источников в том же порядке, что и в statsPerClickUpdate
    const descriptors = [
        { id: 'doubler', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(#23e019, rgba(0, 0, 0, 0)210%)' },
        { id: 'midasCursor', title: 'Курсор Мидаса', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'rewardForFeats', title: 'Награда за Подвиги', colorStyle: 'background-image: radial-gradient(#1226ff, black 210%)' },
        { id: 'challenge6', title: 'Испытание 6', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'goldenGlove', title: 'Золотая перчатка', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'gainClick', title: 'Общий доход', colorStyle: 'background-image: radial-gradient(gold, black 210%)' },
        { id: 'challenge1', title: 'Испытание 1', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' }
    ]

    // Создаём статистические строки
    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    // Блок с пост-софткапом и итогом
    const lastDiv = document.createElement('div')
    lastDiv.id = 'lastClickStats'

    const post = document.createElement('div')
    post.id = 'postE13SoftcapClick'
    post.className = 'multiplierString'
    post.style.display = 'flex'
    const postLeft = document.createElement('span')
    postLeft.id = 'postE13coinsSoftcapClickStats'
    postLeft.className = 'whiteText'
    postLeft.style.marginLeft = '30px'
    postLeft.textContent = 'Пост-е13 Софткап'
    const postRight = document.createElement('span')
    postRight.id = 'postE13coinsSoftcapClickStatsEffect'
    postRight.className = 'whiteText'
    postRight.style.marginRight = '30px'
    postRight.textContent = '^0.5'
    post.appendChild(postLeft)
    post.appendChild(postRight)

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryClickStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryClickStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)

    lastDiv.appendChild(post)
    lastDiv.appendChild(footer)
    statsContainer.appendChild(lastDiv)

    // Создаём графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)

        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'

        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов на момент загрузки скрипта: элементы понадобятся ниже в inline-скриптах
createGainPerClickUI()

// Создаёт DOM-элементы для вкладки "В секунду" (stats + graphic)
function createGainPerSecondUI() {
    const statsContainer = document.getElementById('gainPerSecondStats')
    const graphicContainer = document.getElementById('gainPerSecondGraphic')
    if (!statsContainer || !graphicContainer) return

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
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const post = document.createElement('div')
    post.id = 'postE13SoftcapSecond'
    post.className = 'multiplierString'
    post.style.display = 'flex'
    const postLeft = document.createElement('span')
    postLeft.id = 'postE13coinsSoftcapSecondStats'
    postLeft.className = 'whiteText'
    postLeft.style.marginLeft = '30px'
    postLeft.textContent = 'Пост-е13 Софткап'
    const postRight = document.createElement('span')
    postRight.id = 'postE13coinsSoftcapSecondStatsEffect'
    postRight.className = 'whiteText'
    postRight.style.marginRight = '30px'
    postRight.textContent = '^0.5'
    post.appendChild(postLeft)
    post.appendChild(postRight)

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summarySecondStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summarySecondStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)

    statsContainer.appendChild(post)
    statsContainer.appendChild(footer)

    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)

        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'

        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов генератора для вкладки "В секунду"
createGainPerSecondUI()

// Создаёт DOM-элементы для секции "Доход" (общий gain) — stats + graphic
function createGainWholeUI() {
    const statsContainer = document.getElementById('wholeGainStats')
    const graphicContainer = document.getElementById('gainGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
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
        { id: 'alphaPower', title: 'Альфа-Сила', colorStyle: 'background-image: radial-gradient(#23e019, black 210%)' },
        { id: 'upower', title: 'У-сила', colorStyle: 'background-image: radial-gradient(palevioletred, black 210%)' },
        { id: 'activity2', title: 'Активность 2', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' }
    ]

    // создаём строки статистики
    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    // Пост-софткап и итоги
    const post = document.createElement('div')
    post.id = 'postE15SoftcapGain'
    post.className = 'multiplierString'
    post.style.display = 'flex'
    const postLeft = document.createElement('span')
    postLeft.id = 'postE15SoftcapGainStats'
    postLeft.className = 'whiteText'
    postLeft.style.marginLeft = '30px'
    postLeft.textContent = 'Пост-е15 Софткап'
    const postRight = document.createElement('span')
    postRight.id = 'postE15SoftcapGainStatsEffect'
    postRight.className = 'whiteText'
    postRight.style.marginRight = '30px'
    postRight.textContent = '^0.5'
    post.appendChild(postLeft)
    post.appendChild(postRight)

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryGainStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryGainStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)

    statsContainer.appendChild(post)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)

        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'

        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов генератора для секции "Доход"
createGainWholeUI()

// Создаёт DOM-элементы для секции "Супер-монеты" (шанс) — stats + graphic
function createSuperCoinChanceUI() {
    const statsContainer = document.getElementById('superCoinsChanceStats')
    const graphicContainer = document.getElementById('superCoinsChanceGraphic')
    if (!statsContainer || !graphicContainer) return

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
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summarySCChanceStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summarySCChanceStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '0%'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)

        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'

        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов генератора для секции "Супер-монеты"
createSuperCoinChanceUI()

// Создаёт DOM-элементы для секции "Кристаллы" (stats + graphic)
function createCrystalsUI() {
    const statsContainer = document.getElementById('crystalsMultiplierStats')
    const graphicContainer = document.getElementById('crystalsMultiplierGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
        { id: 'baseCrystal', title: 'Удвоитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'achievement282', title: 'Удвоитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'brilliantDoubler', title: 'Удвоитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'recycling', title: 'Удвоитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'challenge10', title: 'Испытание 10', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)' },
        { id: 'crystalBoost', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'overdrive2Effect', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(0, 242, 255), black 210%)' },
        { id: 'thirdMineralEffect1', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'secondSuperCrystalSingleEffect', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'prestigeFame', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'crystalShAch', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'fortuneBoostCrystal', title: 'Альфа-Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'minusCoinsForCrystals', title: 'Альфа-Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(white, black 210%)' },
        { id: 'achievementBonus2', title: 'Кристаллический Усилитель', hasPiece: true, colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'CRYSTAL_GAIN_SC_001', title: 'Кристаллический Усилитель', hasPiece: false }
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = d.hasPiece ? 'x1' : '^0'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryCrystalStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryCrystalStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // Создаём графические куски только для тех, у кого hasPiece === true
    descriptors.forEach(d => {
        if (!d.hasPiece) return
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)

        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'

        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов генератора для секции "Кристаллы"
createCrystalsUI()

// Создаёт DOM-элементы для секций осколков (shards) — stats + graphic для Click/Second/Effect
function createShardsUI() {
    const clickStats = document.getElementById('shardsPerClickStats')
    const secondStats = document.getElementById('shardsPerSecondStats')
    const effectStats = document.getElementById('shardsEffectStats')
    const clickGraphic = document.getElementById('shardsPerClickGraphic')
    const secondGraphic = document.getElementById('shardsPerSecondGraphic')
    const effectGraphic = document.getElementById('shardsEffectGraphic') || document.getElementById('shardsPerSecondGraphic')
    if (!clickStats || !secondStats || !effectStats || !clickGraphic || !secondGraphic) return

    // Click descriptors
    const clickDesc = [
        { id: 'firstShardBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'ninthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 151, 151), black 210%)' },
        { id: 'fortuneBoostShardClick', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ]

    clickDesc.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'
        row.appendChild(left)
        row.appendChild(right)
        // expose stats globals
        try { window[left.id] = left; window[right.id] = right } catch(e) {}
        clickStats.appendChild(row)
    })

    const footerClick = document.createElement('div')
    footerClick.className = 'multiplierString footer'
    footerClick.style.display = 'flex'
    const fLeft = document.createElement('span')
    fLeft.id = 'summaryShPerClickStats'
    fLeft.className = 'whiteText'
    fLeft.style.marginLeft = '30px'
    fLeft.textContent = 'Общий множитель'
    const fRight = document.createElement('span')
    fRight.id = 'summaryShPerClickStatsEffect'
    fRight.className = 'whiteText'
    fRight.style.marginRight = '30px'
    fRight.textContent = '1.00x'
    footerClick.appendChild(fLeft)
    footerClick.appendChild(fRight)
    clickStats.appendChild(footerClick)

    // Click graphic pieces
    clickDesc.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        try { window[span.id] = span; window[piece.id] = piece } catch(e) {}
        clickGraphic.appendChild(piece)
    })

    // Second descriptors
    const secondDesc = [
        { id: 'secondShardBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)' },
        { id: 'fifthShopBuyableEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'thirdMineralEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'shardShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(86, 247, 255), black 210%)' },
        { id: 'achievement39', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'fortuneBoostShardSecond', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'achievementBonus3', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' }
    ]

    secondDesc.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'
        row.appendChild(left)
        row.appendChild(right)
        try { window[left.id] = left; window[right.id] = right } catch(e) {}
        secondStats.appendChild(row)
    })

    const footerSecond = document.createElement('div')
    footerSecond.className = 'multiplierString footer'
    footerSecond.style.display = 'flex'
    const sLeft = document.createElement('span')
    sLeft.id = 'summaryShPerSecondStats'
    sLeft.className = 'whiteText'
    sLeft.style.marginLeft = '30px'
    sLeft.textContent = 'Общий множитель'
    const sRight = document.createElement('span')
    sRight.id = 'summaryShPerSecondStatsEffect'
    sRight.className = 'whiteText'
    sRight.style.marginRight = '30px'
    sRight.textContent = '1.00x'
    footerSecond.appendChild(sLeft)
    footerSecond.appendChild(sRight)
    secondStats.appendChild(footerSecond)

    secondDesc.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        try { window[span.id] = span; window[piece.id] = piece } catch(e) {}
        secondGraphic.appendChild(piece)
    })

    // Effect descriptors
    const effectDesc = [
        { id: 'shard', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(111, 202, 199), black 210%)', hasPiece: true },
        { id: 'achievement30', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)', hasPiece: true },
        { id: 'fourthShardSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(127, 210, 136), black 210%)', hasPiece: true },
        { id: 'challengeReward7', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)', hasPiece: true },
        { id: 'SHARD_EFF_SC_001', title: 'Пост-e7 Софткап', hasPiece: false }
    ]

    effectDesc.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = d.hasPiece ? 'x1' : '^0'
        row.appendChild(left)
        row.appendChild(right)
        try { window[left.id] = left; window[right.id] = right } catch(e) {}
        effectStats.appendChild(row)
    })

    const footerEffect = document.createElement('div')
    footerEffect.className = 'multiplierString footer'
    footerEffect.style.display = 'flex'
    const eLeft = document.createElement('span')
    eLeft.id = 'summaryShEffectStats'
    eLeft.className = 'whiteText'
    eLeft.style.marginLeft = '30px'
    eLeft.textContent = 'Общий множитель'
    const eRight = document.createElement('span')
    eRight.id = 'summaryShEffectStatsEffect'
    eRight.className = 'whiteText'
    eRight.style.marginRight = '30px'
    eRight.textContent = '1.00x'
    footerEffect.appendChild(eLeft)
    footerEffect.appendChild(eRight)
    effectStats.appendChild(footerEffect)

    // Effect graphic pieces (shardPiece exists already in some layouts; create if missing)
    effectDesc.forEach(d => {
        if (!d.hasPiece) return
        const existing = document.getElementById(d.id + 'Piece')
        if (existing) return
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span);
        // expose globals for legacy inline listeners
        try { window[span.id] = span; window[piece.id] = piece } catch(e) {}
        // append to effectGraphic if exists, else to secondGraphic
        (effectGraphic || secondGraphic).appendChild(piece)
    })
}

// Вызов генератора для секций осколков
createShardsUI()

// Создаёт DOM-элементы для вкладки "Крит. шанс" (stats + graphic)
function createCritChanceUI() {
    const statsContainer = document.getElementById('critChanceStats')
    const graphicContainer = document.getElementById('critChanceGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
        { id: 'baseCriticalChanceEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fourthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'eighthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect1', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critChShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'fifthBuyableSuperEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'fortuneBoostCritChance', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' },
        { id: 'plusCoinsForCritChance', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(white, black 210%)' }
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'
        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryCritChanceStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryCritChanceStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

function createCritMultiUI() {
    const statsContainer = document.getElementById('critMultiStats')
    const graphicContainer = document.getElementById('critMultiGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
        { id: 'baseCriticalGainEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 0, 0), black 210%)' },
        { id: 'fifthSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'ninthShopBuyableEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'firstMineralEffect2', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(45, 202, 210), black 210%)' },
        { id: 'critMuShAch', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(179, 0, 0), black 210%)' },
        { id: 'thirdBuyableSuperEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'fortuneBoostCritMulti', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'
        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryCritMultiStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryCritMultiStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

function createClickSimulationUI() {
    const statsContainer = document.getElementById('clickSimulationStats')
    const graphicContainer = document.getElementById('clickSimulationGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
        { id: 'thirdSuperCrystalSingleEffect', title: 'Удвоитель', colorStyle: 'background-image: radial-gradient(rgb(0, 180, 212), black 210%)' },
        { id: 'fortuneBoostSimulation', title: 'Альфа-Усилитель', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'
        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title
        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'
        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryClickSimStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Общий множитель'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryClickSimStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '1.00x'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызовы генераторов для новых вкладок
createCritChanceUI()
createCritMultiUI()
createClickSimulationUI()
// Создаёт DOM-элементы для секции "Престижи" (stats + graphic)
function createPrestigeUI(){
    const statsContainer = document.getElementById('prestigeMultiplierStats')
    const graphicContainer = document.getElementById('prestigeMultiplierGraphic')
    if (!statsContainer || !graphicContainer) return

    const descriptors = [
        { id: 'prestigeBase', title: 'Базовый прирост', colorStyle: 'background-image: radial-gradient(rgba(0, 242, 255, 1), black 210%)' },
        { id: 'prestigeAch35', title: 'Ачивка 35', colorStyle: 'background-image: radial-gradient(lightsteelblue, black 210%)' },
        { id: 'prestigeSuperSingle13', title: 'Супер-престиж 13', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeShop6', title: 'Магазин 6', colorStyle: 'background-image: radial-gradient(rgb(255, 174, 0), black 210%)' },
        { id: 'prestigeShardAch7', title: 'Осколки (ach7)', colorStyle: 'background-image: radial-gradient(rgb(0, 212, 212), black 210%)' },
        { id: 'prestigeFortune22', title: 'Фортуна 22', colorStyle: 'background-image: radial-gradient(hotpink, black 210%)' }
    ]

    descriptors.forEach(d => {
        const row = document.createElement('div')
        row.className = 'multiplierString'
        row.style.display = 'flex'

        const left = document.createElement('span')
        left.id = d.id + 'Stats'
        left.className = 'whiteText'
        left.style.marginLeft = '30px'
        left.textContent = d.title

        const right = document.createElement('span')
        right.id = d.id + 'StatsEffect'
        right.className = 'whiteText'
        right.style.marginRight = '30px'
        right.textContent = 'x1'

        row.appendChild(left)
        row.appendChild(right)
        statsContainer.appendChild(row)
    })

    const footer = document.createElement('div')
    footer.className = 'multiplierString footer'
    footer.style.display = 'flex'
    const footerLeft = document.createElement('span')
    footerLeft.id = 'summaryPrestigeStats'
    footerLeft.className = 'whiteText'
    footerLeft.style.marginLeft = '30px'
    footerLeft.textContent = 'Итоговый прирост'
    const footerRight = document.createElement('span')
    footerRight.id = 'summaryPrestigeStatsEffect'
    footerRight.className = 'whiteText'
    footerRight.style.marginRight = '30px'
    footerRight.textContent = '0'
    footer.appendChild(footerLeft)
    footer.appendChild(footerRight)
    statsContainer.appendChild(footer)

    // графические куски
    descriptors.forEach(d => {
        const piece = document.createElement('div')
        piece.id = d.id + 'Piece'
        piece.className = 'graphicPiece'
        piece.setAttribute('style', d.colorStyle)
        const span = document.createElement('span')
        span.id = d.id + 'PiecePercent'
        span.className = 'whiteText pieceText'
        span.textContent = '0%'
        piece.appendChild(span)
        graphicContainer.appendChild(piece)
    })
}

// Вызов генератора для секции "Престижи"
createPrestigeUI()

// Универсальная регистрация hover-обработчиков для всех графических кусков
function setupHoverHandlers() {
    const pieces = document.querySelectorAll('.graphicPiece')
    pieces.forEach(p => {
        if (!p.id) return
        const prefix = p.id.replace(/Piece$/, '')
        p.addEventListener('mouseenter', () => { try { hoverColor(prefix) } catch(e){} })
        p.addEventListener('mouseleave', () => { try { hoverColorInverse(prefix) } catch(e){} })
    })
}

// Вешаем обработчики сразу после генерации UI
try { setupHoverHandlers() } catch (e) { }