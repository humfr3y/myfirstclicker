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

function randomNumber (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min))
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
    if (number < 1) {
        return number.toFixed(3);
    } else if (number < 10 && number >= 1) {
        return number.toFixed(2)
    } else if (number < 100 && number >= 10) {
        return number.toFixed(0)
    }
    else {
        return number.toExponential(2).replace("+","");
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

function startChallenge(number) {
    if (!ACHS.has(31)) ACHS.unl(31)
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
    player.supercrystal.currency = player.supercrystal.total_currency-player.shard_achievements.length
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

function statsPerClickUpdate() { //multi breakdown click
    doublerStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.buyables[3].effect(), 'boost')
    midasCursorStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[12].effect(), 'boost')
    rewardForFeatsStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[23].effect(), 'boost')
    challenge6StatsEffect.innerHTML = "x" + formatNumber(CHALL[6].effect(), 'boost')
    goldenGloveStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[1].effect(), 'boost')
    gainStatsEffect.innerHTML = "x" + formatNumber(GAIN.coin.gain.effect(), 'boost')
    challenge1StatsEffect.innerHTML = "^" + formatNumber(player.challenge.completed.includes(1) ? CHALL[1].effect() : 1, 'power')
    let gainWithoutPower = findMultiplier(Math.pow(GAIN.coin.gain.no_softcap_effect(), 1 / player.challenge.completed.includes(1) ? CHALL[1].effect() : 1), player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)
    hidePiece(UPGS.coin.buyables[3].effect(), doublerPiece, doublerPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.coin.singles[12].effect(), midasCursorPiece, midasCursorPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.coin.singles[23].effect(), rewardPiece, rewardPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.shop.buyables[1].effect(), goldenGlovePiece, goldenGlovePiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(CHALL[6].effect(), challenge6Piece, challenge6PiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(GAIN.coin.gain.effect(), gainClickPiece, gainClickPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(gainWithoutPower, challenge1Piece, challenge1PiecePercent, GAIN.coin.gain.no_softcap_effect())

    summaryClickStatsEffect.innerHTML = "x" + formatNumber(GAIN.coin.click.effect(), 'boost')
}

function statsPerSecondUpdate() {
    smallInvestmentStatsEffect.innerHTML = "+" + formatNumber(UPGS.coin.buyables[1].effect())
    multiplierUpgradeStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.buyables[4].effect(), 'boost')
    richFameStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[11].effect(), 'boost')
    negativeAlphaStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[21].effect(), 'boost')
    goldenClockStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[2].effect(), 'boost')
    challenge8StatsEffect.innerHTML = "x" + formatNumber(player.challenge.completed.includes(8) ? CHALL[8].effect() : 1, 'boost')
    achievement15StatsEffect.innerHTML = "x" + formatNumber(Math.pow(1+0.0001*player.clicks.simulated, ACHS.has(15)), 'boost')
    gain2StatsEffect.innerHTML = "x" + formatNumber(GAIN.coin.gain.effect(), 'boost')
    challenge3StatsEffect.innerHTML = "^" + formatNumber(player.challenge.completed.includes(3) ? CHALL[3].effect() : 1, 'power')
    let gainWithoutPower = findMultiplier(Math.pow(GAIN.coin.second.no_softcap_effect(), 1 / player.challenge.completed.includes(3) ? CHALL[3].effect() : 1), player.challenge.completed.includes(3) ? CHALL[3].effect() : 1)
    hidePiece(UPGS.coin.buyables[1].effect(), smallInvestmentPiece, smallInvestmentPiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(UPGS.coin.buyables[4].effect(), multiplierPiece, multiplierPiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(UPGS.coin.singles[11].effect(), richFamePiece, richFamePiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(UPGS.coin.singles[21].effect(), negativeAlphaPiece, negativeAlphaPiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(UPGS.shop.buyables[2].effect(), goldenClockPiece, goldenClockPiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(Math.pow(1+0.0001*player.clicks.simulated, player.achievements.includes(15)), achievement15Piece, achievement15PiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(player.challenge.completed.includes(8) ? CHALL[8].effect() : 1, challenge8Piece, challenge8PiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(GAIN.coin.gain.effect(), gainSecondPiece, gainSecondPiecePercent, GAIN.coin.second.no_softcap_effect())
    hidePiece(gainWithoutPower, challenge3Piece, challenge3PiecePercent, GAIN.coin.second.no_softcap_effect())
    summarySecondStatsEffect.innerHTML = "x" + formatNumber(GAIN.coin.second.effect(), 'boost')
}

function statsGainUpdate() {
    doublerPlusStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[13].effect(), 'boost')
    cashBackStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[22].effect(), 'boost')
    goldenKeyStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[3].effect(), 'boost')
    overdriveType1StatsEffect.innerHTML = "x" + formatNumber(UNL.overdrive.type1.effect(), 'boost')
    achievementsStatsEffect.innerHTML = "x" + formatNumber(ACHS.effect.coin(), 'boost')
    achievement28StatsEffect.innerHTML = "x" + formatNumber(Math.pow(4, player.achievements.includes(28)), 'boost')
    hourglassStatsEffect.innerHTML = "x" + formatNumber(UPGS.prestige.singles[31].effect(), 'boost')
    antiHourglassStatsEffect.innerHTML = "x" + formatNumber(UPGS.prestige.singles[32].effect(), 'boost')
    shardsStatsEffect.innerHTML = "x" + formatNumber(GAIN.shard.effect.effect(), 'boost')
    secondMineralEffect1StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[2].effect1(), 'boost')
    umultiplierStatsEffect.innerHTML = "x" + formatNumber(GAIN.umultiplier.effect(), 'boost')
    upowerStatsEffect.innerHTML = "^" + formatNumber(GAIN.upower.effect(), 'power')
    activity2StatsEffect.innerHTML = "^" + formatNumber(UPGS.prestige.singles[12].effect(), 'power')
    alphaPowerStatsEffect.innerHTML = "^" + formatNumber(UPGS.coin.buyables[5].effect(), 'power')
    let gainWithoutPower1 = findMultiplier(Math.pow(GAIN.coin.click.no_softcap_effect(), 1 / UPGS.coin.buyables[5].effect()), UPGS.coin.buyables[5].effect())
    let temp1 = Math.pow(GAIN.coin.gain.no_softcap_effect(), 1 / player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)
    let gainWithoutPower2 = findMultiplier(Math.pow(temp1, 1 / UPGS.prestige.singles[12].effect()), UPGS.prestige.singles[12].effect())
    let temp2 = Math.pow(temp1, 1 / UPGS.prestige.singles[12].effect())
    let gainWithoutPower3 = findMultiplier(Math.pow(temp2, 1 / GAIN.upower.effect()), GAIN.upower.effect())
    hidePiece(UPGS.coin.singles[13].effect(), doublerPlusPiece, doublerPlusPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UPGS.coin.singles[22].effect(), cashBackPiece, cashBackPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UPGS.shop.buyables[3].effect(), goldenKeyPiece, goldenKeyPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UNL.overdrive.type1.effect(), overdriveType1Piece, overdriveType1PiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(ACHS.effect.coin(), achievementsPiece, achievementsPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(Math.pow(4, player.achievements.includes(28)), achievement28Piece, achievement28PiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UPGS.prestige.singles[31].effect(), hourglassPiece, hourglassPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UPGS.prestige.singles[32].effect(), antiHourglassPiece, antiHourglassPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(GAIN.shard.effect.effect(), shardsPiece, shardsPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(UPGS.minerals[2].effect1(), secondMineralEffect1Piece, secondMineralEffect1PiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(GAIN.umultiplier.effect(), umultiplierPiece, umultiplierPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(gainWithoutPower1, alphaPowerPiece, alphaPowerPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(gainWithoutPower3, upowerPiece, upowerPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(gainWithoutPower2, activity2Piece, activity2PiecePercent, GAIN.coin.gain.no_softcap_effect())


    summaryGainStatsEffect.innerHTML = "x" + formatNumber(GAIN.coin.gain.effect(), 'boost')
}

function statsSuperCoinChanceUpdate() {
    luckyCloverStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[4].effect(), 'boost')
    thirdSingleSuperEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.singles[13].effect_super(), 'boost')
    charismaStatsEffect.innerHTML = "x" + formatNumber(UPGS.prestige.singles[13].effect(), 'boost')
    firstSuperCrystalEffectStatsEffect.innerHTML = "x" + formatNumber(Math.pow(2, UPGS.supercrystal[11].unl()), 'boost')
    firstMineralEffect3StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[1].effect3(), 'boost')
    superDvorStatsEffect.innerHTML = "x" + formatNumber(UNL.shard_achievements[2].effect(), 'boost')
    hercCursorStatsEffect.innerHTML = "x" + formatNumber(UPGS.prestige.super.singles[12].effect(), 'boost')
    achievement37StatsEffect.innerHTML = "+" + formatNumber(Number(ACHS.has(37)), 'boost')

    let ach37 = findMultiplierInAdditive(ACHS.has(37), GAIN.supercoin.chance())

    hidePiece(UPGS.shop.buyables[4].effect(), luckyCloverPiece, luckyCloverPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.coin.singles[13].effect_super(), thirdSingleSuperEffectPiece, thirdSingleSuperEffectPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.prestige.singles[13].effect(), charismaPiece, charismaPiecePercent, GAIN.supercoin.chance())
    hidePiece(Math.pow(2, UPGS.supercrystal[11].unl()), firstSuperCrystalEffectPiece, firstSuperCrystalEffectPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.minerals[1].effect3(), firstMineralEffect3Piece, firstMineralEffect3PiecePercent, GAIN.supercoin.chance())
    hidePiece(UNL.shard_achievements[2].effect(), superDvorPiece, superDvorPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.prestige.super.singles[12].effect(), hercCursorPiece, hercCursorPiecePercent, GAIN.supercoin.chance())
    hidePiece(ach37, achievement37Piece, achievement37PiecePercent, GAIN.supercoin.chance())

    summarySCChanceStatsEffect.innerHTML = formatNumber(GAIN.supercoin.chance(), 'boost') + "%"
}

function statsCrystalsUpdate(){
    let gain = player.prestige.super.singles.includes(25) ? Math.pow(1.35+UPGS.prestige.super.buyables[1].effect(), Math.log10((player.coin.currency+10)/1e15)) : 1
    baseCrystalStatsEffect.innerHTML = "x" + formatNumber(gain, 'boost')
    achievement282StatsEffect.innerHTML = "x" + formatNumber(Math.pow(4, ACHS.has(28)), 'boost')
    brilliantDoublerStatsEffect.innerHTML = "x" + formatNumber(UPGS.prestige.buyables[1].effect(), 'boost')
    recyclingStatsEffect.innerHTML = "x" + formatNumber(UPGS.shard.singles[11].effect(), 'boost')
    challenge10StatsEffect.innerHTML = "x" + formatNumber(player.challenge.completed.includes(10) ? CHALL[10].effect() : 1, 'boost')
    crystalBoostStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.permanent[1].effect(), 'boost')
    overdrive2EffectStatsEffect.innerHTML = "x" + formatNumber(UNL.overdrive.type2.effect(), 'boost')
    thirdMineralEffect1StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[3].effect1(), 'boost')
    secondSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatNumber(Math.pow(3, UPGS.supercrystal[12].unl()), 'boost')
    prestigeFameStatsEffect.innerHTML = "x" + formatNumber(player.supercrystal.upgrades.includes(12) ? 3 : 1, 'boost')
    crystalShAchStatsEffect.innerHTML = "x" + formatNumber(UNL.shard_achievements[3].effect(), 'boost')
    achievementBonus2StatsEffect.innerHTML = "x" + formatNumber(ACHS.effect.crystal(), 'boost')
    hidePiece(gain, baseCrystalPiece, baseCrystalPiecePercent, GAIN.crystal.reset())
    hidePiece(Math.pow(4, ACHS.has(28)), achievement282Piece, achievement282PiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.prestige.buyables[1].effect(), brilliantDoublerPiece, brilliantDoublerPiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.shard.singles[11].effect(), recyclingPiece, recyclingPiecePercent, GAIN.crystal.reset())
    hidePiece(player.challenge.completed.includes(10) ? CHALL[10].effect() : 1, challenge10Piece, challenge10PiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.shop.permanent[1].effect(), crystalBoostPiece, crystalBoostPiecePercent, GAIN.crystal.reset())
    hidePiece(UNL.overdrive.type2.effect(), overdrive2EffectPiece, overdrive2EffectPiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.minerals[3].effect1(), thirdMineralEffect1Piece, thirdMineralEffect1PiecePercent, GAIN.crystal.reset())
    hidePiece(Math.pow(3, UPGS.supercrystal[12].unl()), secondSuperCrystalSingleEffectPiece, secondSuperCrystalSingleEffectPiecePercent, GAIN.crystal.reset())
    hidePiece(player.supercrystal.upgrades.includes(12) ? 3 : 1, prestigeFamePiece, prestigeFamePiecePercent, GAIN.crystal.reset())
    hidePiece(UNL.shard_achievements[3].effect(), crystalShAchPiece, crystalShAchPiecePercent, GAIN.crystal.reset())
    hidePiece(ACHS.effect.crystal(), achievementBonus2Piece, achievementBonus2PiecePercent, GAIN.crystal.reset())
    summaryCrystalStatsEffect.innerHTML = "x"+formatNumber(GAIN.crystal.reset(), 'boost')
}

function statsShardsPerClickUpdate() {
    firstShardBuyableEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.shard.buyables[1].effect(), 'boost')
    fifthShopBuyableEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[5].effect(), 'boost')
    ninthSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatNumber(Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), 'boost')

    hidePiece(UPGS.shard.buyables[1].effect(), firstShardBuyableEffectPiece, firstShardBuyableEffectPiecePercent, GAIN.shard.click())
    hidePiece(UPGS.shop.buyables[5].effect(), fifthShopBuyableEffectPiece, fifthShopBuyableEffectPiecePercent, GAIN.shard.click())
    hidePiece(Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), ninthSuperCrystalSingleEffectPiece, ninthSuperCrystalSingleEffectPiecePercent, GAIN.shard.click())
    
    summaryShPerClickStatsEffect.innerHTML = "x" + formatNumber(GAIN.shard.click(), 'boost')
}

function statsShardsPerSecondUpdate() {
    secondShardBuyableEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.shard.buyables[2].effect(), 'boost')
    fifthShopBuyableEffect2StatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.buyables[5].effect(), 'boost')
    thirdMineralEffect2StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[3].effect2(), 'boost')
    shardShAchStatsEffect.innerHTML = "x" + formatNumber(UNL.shard_achievements[4].effect(), 'boost')
    achievement39StatsEffect.innerHTML = "x" + formatNumber(Math.pow(1.337, ACHS.has(39)), 'boost')
    achievementBonus3StatsEffect.innerHTML = "x" + formatNumber(ACHS.effect.shard(), 'boost')
    
    hidePiece(UPGS.shard.buyables[2].effect(), secondShardBuyableEffectPiece, secondShardBuyableEffectPiecePercent, GAIN.shard.second())
    hidePiece(UPGS.shop.buyables[5].effect(), fifthShopBuyableEffect2Piece, fifthShopBuyableEffect2PiecePercent, GAIN.shard.second())
    hidePiece(UPGS.minerals[3].effect2(), thirdMineralEffect2Piece, thirdMineralEffect2PiecePercent, GAIN.shard.second())
    hidePiece(Math.pow(1.337, ACHS.has(39)), achievement39Piece, achievement39PiecePercent, GAIN.shard.second())
    hidePiece(UNL.shard_achievements[4].effect(), shardShAchPiece, shardShAchPiecePercent, GAIN.shard.second())
    hidePiece(ACHS.effect.shard(), achievementBonus3Piece, achievementBonus3PiecePercent, GAIN.shard.second())
    
    summaryShPerSecondStatsEffect.innerHTML = "x" + formatNumber(GAIN.shard.second(), 'boost')
}

function statsShardsEffectUpdate() {
    shardStatsEffect.innerHTML = "x" + formatNumber(1 + player.shard.currency / 100, 'boost')
    achievement30StatsEffect.innerHTML = "x" + formatNumber(Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)), 'boost')
    fourthShardSingleEffectStatsEffect.innerHTML = "^" + formatNumber(UPGS.shard.singles[21].effect(), 'power')
    challengeReward7StatsEffect.innerHTML = "x" + formatNumber(player.challenge.completed.includes(7) ? CHALL[7].effect() : 1, 'boost')

    let gainWithoutPower = findMultiplier(Math.pow(GAIN.shard.effect.no_softcap_effect(), 1 / UPGS.shard.singles[21].effect()), UPGS.shard.singles[21].effect())

    hidePiece(1 + player.shard.currency / 100, shardPiece, shardPiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)), achievement30Piece, achievement30PiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(gainWithoutPower, fourthShardSingleEffectPiece, fourthShardSingleEffectPiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(player.challenge.completed.includes(7) ? CHALL[7].effect() : 1, challengeReward7Piece, challengeReward7PiecePercent, GAIN.shard.effect.no_softcap_effect())

    summaryShEffectStatsEffect.innerHTML = "x" + formatNumber(GAIN.shard.effect.effect(), 'boost')
}

function statsCritChanceUpdate() {
    baseCriticalChanceEffectStatsEffect.innerHTML = "+" + formatNumber(GAIN.critical.baseChance, 'boost')
    fourthSuperCrystalSingleEffectStatsEffect.innerHTML = "+" + formatNumber(UPGS.supercrystal[21].unl() ? 2 : 0, 'boost')
    eighthShopBuyableEffectStatsEffect.innerHTML = "+" + formatNumber(UPGS.shop.permanent[3].effect(), 'boost')
    firstMineralEffect1StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[1].effect1(), 'boost')
    critChShAchStatsEffect.innerHTML = "x" + formatNumber(UNL.shard_achievements[8].effect(), 'boost')
    fifthBuyableSuperEffectStatsEffect.innerHTML = "^" + formatNumber(UPGS.coin.buyables[5].effect_super(), 'power')
    let gainWithoutPower = findMultiplier(Math.pow(GAIN.critical.chance.multiplicative(), 1 / UPGS.coin.buyables[5].effect_super()), UPGS.coin.buyables[5].effect_super())
    
    let add = findMultiplierInAdditive(GAIN.critical.chance.additive(), GAIN.critical.chance.multiplicative())
    let sum = findSum(add, UPGS.minerals[1].effect1(), UNL.shard_achievements[8].effect(), gainWithoutPower)
    let temp2 = 100/findRatio(add, sum)

    hidePiece(GAIN.critical.chance.additive(), criticalGraphic, criticalGraphicSpan, GAIN.critical.chance.multiplicative())
    hidePiece2(1, baseCriticalChanceEffectPiece, baseCriticalChanceEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece2(UPGS.supercrystal[21].unl() ? 2 : 0, fourthSuperCrystalSingleEffectPiece, fourthSuperCrystalSingleEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece2(UPGS.shop.permanent[3].effect(), eighthShopBuyableEffectPiece, eighthShopBuyableEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece(UPGS.minerals[1].effect1(), firstMineralEffect1Piece, firstMineralEffect1PiecePercent, GAIN.critical.chance.multiplicative())
    hidePiece(UNL.shard_achievements[8].effect(), critChShAchPiece, critChShAchPiecePercent, GAIN.critical.chance.multiplicative())
    hidePiece(gainWithoutPower, fifthBuyableSuperEffectPiece, fifthBuyableSuperEffectPiecePercent, GAIN.critical.chance.multiplicative())


    summaryCritChanceStatsEffect.innerHTML = formatNumber(GAIN.critical.chance.multiplicative(), 'boost') + "%"
}

function statsCritMultiUpdate() {
    baseCriticalGainEffectStatsEffect.innerHTML = "x" + formatNumber(GAIN.critical.baseMult, 'boost')
    fifthSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatNumber(Math.pow(5, UPGS.supercrystal[22].unl()), 'boost')
    ninthShopBuyableEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.shop.permanent[4].effect(), 'boost')
    firstMineralEffect2StatsEffect.innerHTML = "x" + formatNumber(UPGS.minerals[1].effect2(), 'boost')
    critMuShAchStatsEffect.innerHTML = "x" + formatNumber(UNL.shard_achievements[9].effect(), 'boost')
    thirdBuyableSuperEffectStatsEffect.innerHTML = "x" + formatNumber(UPGS.coin.buyables[3].effect_super(), 'boost')
    
    hidePiece(GAIN.critical.baseMult, baseCriticalGainEffectPiece, baseCriticalGainEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(Math.pow(5, UPGS.supercrystal[22].unl()), fifthSuperCrystalSingleEffectPiece, fifthSuperCrystalSingleEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.shop.permanent[4].effect(), ninthShopBuyableEffectPiece, ninthShopBuyableEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.minerals[1].effect2(), firstMineralEffect2Piece, firstMineralEffect2PiecePercent, GAIN.critical.multiplier())
    hidePiece(UNL.shard_achievements[9].effect(), critMuShAchPiece, critMuShAchPiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.coin.buyables[3].effect_super(), thirdBuyableSuperEffectPiece, thirdBuyableSuperEffectPiecePercent, GAIN.critical.multiplier())
    
    summaryCritMultiStatsEffect.innerHTML = "x" + formatNumber(GAIN.critical.multiplier(), 'boost')
}

function statsClickSimulationUpdate() {
    thirdSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatNumber(Math.pow(2, UPGS.supercrystal[13].unl()), 'boost')

    hidePiece(Math.pow(2, UPGS.supercrystal[13].unl()), thirdSuperCrystalSingleEffectPiece, thirdSuperCrystalSingleEffectPiecePercent, GAIN.simulation.multiplier())
    
    summaryClickSimStatsEffect.innerHTML = "x" + formatNumber(GAIN.simulation.multiplier(), 'boost')
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