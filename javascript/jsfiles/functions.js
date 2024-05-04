function upgradesPurchasableCustom(currentUpgrades, currencyAmount, costPerUpgrade, increaseRate) {
    let totalCost = currencyAmount;
    let totalUpgrades = Math.floor(Math.log((totalCost * (increaseRate - 1) / costPerUpgrade + 1)) / Math.log(increaseRate));
    return totalUpgrades
}

function convert(input) {
  const [base, exponent] = input.split("e");
  return BigInt(base) * 10n ** BigInt(exponent); // ** вместо +
}

const result = convert("1e21");

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

function formatNumber(number) { //average
    if (number < 1000000) {
        return number.toFixed(0);
    } else {
        return number.toExponential(2).replace("+","");
    }
}

function formatNumber3(number) { //for returning into 3.99 = 3
    if (number < 1000000) {
        return Math.floor(number).toString()
    } else {
        return number.toExponential(2).replace("+","");
    }
}

function formatNumber4(number) { //more complicated
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

function generateRune() {
    if (player.prestige.currency >= UNL.rune.cost()) {
        player.prestige.currency -= UNL.rune.cost()
        player.rune.currency++
        player.rune.total_currency++
    }
}

function createMineral(x) {
    if (player.shard.currency >= UPGS.minerals[x].cost2() && player.rune.currency >= UPGS.minerals[x].cost1()) {
        player.rune.currency -= UPGS.minerals[x].cost1()
        player.shard.currency -= UPGS.minerals[x].cost2()
        player.minerals[x]++
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
    player.supercrystal.currency = player.supercrystal.total_currency
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
    doublerStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.buyables[3].effect())
    midasCursorStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[12].effect())
    rewardForFeatsStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[23].effect())
    challenge6StatsEffect.innerHTML = "x" + formatBoost(CHALL[6].effect())
    goldenGloveStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[1].effect())
    gainStatsEffect.innerHTML = "x" + formatBoost(GAIN.coin.gain.effect())
    alphaPowerStatsEffect.innerHTML = "^" + formatPower(UPGS.coin.buyables[5].effect())
    let gainWithoutPower = findMultiplier(Math.pow(GAIN.coin.click.no_softcap_effect(), 1 / UPGS.coin.buyables[5].effect()), UPGS.coin.buyables[5].effect())
    hidePiece(UPGS.coin.buyables[3].effect(), doublerPiece, doublerPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.coin.singles[12].effect(), midasCursorPiece, midasCursorPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.coin.singles[23].effect(), rewardPiece, rewardPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(UPGS.shop.buyables[1].effect(), goldenGlovePiece, goldenGlovePiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(CHALL[6].effect(), challenge6Piece, challenge6PiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(GAIN.coin.gain.effect(), gainClickPiece, gainClickPiecePercent, GAIN.coin.click.no_softcap_effect())
    hidePiece(gainWithoutPower, alphaPowerPiece, alphaPowerPiecePercent, GAIN.coin.click.no_softcap_effect())

    summaryClickStatsEffect.innerHTML = "x" + formatBoost(GAIN.coin.click.effect())
}

function statsPerSecondUpdate() {
    smallInvestmentStatsEffect.innerHTML = "+" + formatNumber(UPGS.coin.buyables[1].effect())
    multiplierUpgradeStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.buyables[4].effect())
    richFameStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[11].effect())
    negativeAlphaStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[21].effect())
    goldenClockStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[2].effect())
    challenge8StatsEffect.innerHTML = "x" + formatBoost(player.challenge.completed.includes(8) ? CHALL[8].effect() : 1)
    achievement15StatsEffect.innerHTML = "x" + formatBoost(Math.pow(1+0.0001*player.clicks.simulated, ACHS.has(15)))
    gain2StatsEffect.innerHTML = "x" + formatBoost(GAIN.coin.gain.effect())
    challenge3StatsEffect.innerHTML = "^" + formatPower(player.challenge.completed.includes(3) ? CHALL[3].effect() : 1)
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
    summarySecondStatsEffect.innerHTML = "x" + formatBoost(GAIN.coin.second.effect())
}

function statsGainUpdate() {
    doublerPlusStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[13].effect())
    cashBackStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[22].effect())
    goldenKeyStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[3].effect())
    overdriveType1StatsEffect.innerHTML = "x" + formatBoost(UNL.overdrive.type1.effect())
    achievementsStatsEffect.innerHTML = "x" + formatBoost(ACHS.effect.coin())
    achievement28StatsEffect.innerHTML = "x" + formatBoost(Math.pow(4, player.achievements.includes(28)))
    hourglassStatsEffect.innerHTML = "x" + formatBoost(UPGS.prestige.singles[31].effect())
    antiHourglassStatsEffect.innerHTML = "x" + formatBoost(UPGS.prestige.singles[32].effect())
    shardsStatsEffect.innerHTML = "x" + formatBoost(GAIN.shard.effect.effect())
    secondMineralEffect1StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[2].effect1())
    umultiplierStatsEffect.innerHTML = "x" + formatBoost(GAIN.umultiplier.effect())
    upowerStatsEffect.innerHTML = "^" + formatPower(GAIN.upower.effect())
    activity2StatsEffect.innerHTML = "^" + formatPower(UPGS.prestige.singles[12].effect())
    challenge1StatsEffect.innerHTML = "^" + formatPower(player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)
    let gainWithoutPower1 = findMultiplier(Math.pow(GAIN.coin.gain.no_softcap_effect(), 1 / player.challenge.completed.includes(1) ? CHALL[1].effect() : 1), player.challenge.completed.includes(1) ? CHALL[1].effect() : 1)
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
    hidePiece(gainWithoutPower3, upowerPiece, upowerPiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(gainWithoutPower2, activity2Piece, activity2PiecePercent, GAIN.coin.gain.no_softcap_effect())
    hidePiece(gainWithoutPower1, challenge1Piece, challenge1PiecePercent, GAIN.coin.gain.no_softcap_effect())

    summaryGainStatsEffect.innerHTML = "x" + formatBoost(GAIN.coin.gain.effect())
}

function statsSuperCoinChanceUpdate() {
    luckyCloverStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[4].effect())
    thirdSingleSuperEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.singles[13].effect_super())
    charismaStatsEffect.innerHTML = "x" + formatBoost(UPGS.prestige.singles[13].effect())
    firstSuperCrystalEffectStatsEffect.innerHTML = "x" + formatBoost(Math.pow(2, UPGS.supercrystal[11].unl()))
    firstMineralEffect3StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[1].effect3())
    achievement37StatsEffect.innerHTML = "+" + formatBoost(Number(ACHS.has(37)))

    let ach37 = findMultiplierInAdditive(ACHS.has(37), GAIN.supercoin.chance())
    hidePiece(UPGS.shop.buyables[4].effect(), luckyCloverPiece, luckyCloverPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.coin.singles[13].effect_super(), thirdSingleSuperEffectPiece, thirdSingleSuperEffectPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.prestige.singles[13].effect(), charismaPiece, charismaPiecePercent, GAIN.supercoin.chance())
    hidePiece(Math.pow(2, UPGS.supercrystal[11].unl()), firstSuperCrystalEffectPiece, firstSuperCrystalEffectPiecePercent, GAIN.supercoin.chance())
    hidePiece(UPGS.minerals[1].effect3(), firstMineralEffect3Piece, firstMineralEffect3PiecePercent, GAIN.supercoin.chance())
    hidePiece(ach37, achievement37Piece, achievement37PiecePercent, GAIN.supercoin.chance())

    summarySCChanceStatsEffect.innerHTML = formatBoost(GAIN.supercoin.chance()) + "%"
}

function statsCrystalsUpdate(){
    achievement282StatsEffect.innerHTML = "x" + formatBoost(Math.pow(4, ACHS.has(28)))
    brilliantDoublerStatsEffect.innerHTML = "x" + formatBoost(UPGS.prestige.buyables[1].effect())
    recyclingStatsEffect.innerHTML = "x" + formatBoost(UPGS.shard.singles[11].effect())
    challenge10StatsEffect.innerHTML = "x" + formatBoost(player.challenge.completed.includes(10) ? CHALL[10].effect() : 1)
    crystalBoostStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.permanent[1].effect())
    overdrive2EffectStatsEffect.innerHTML = "x" + formatBoost(UNL.overdrive.type2.effect())
    thirdMineralEffect1StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[3].effect1())
    secondSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatBoost(Math.pow(3, UPGS.supercrystal[12].unl()))
    achievementBonus2StatsEffect.innerHTML = "x" + formatBoost(ACHS.effect.crystal())
    hidePiece(Math.pow(4, ACHS.has(28)), achievement282Piece, achievement282PiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.prestige.buyables[1].effect(), brilliantDoublerPiece, brilliantDoublerPiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.shard.singles[11].effect(), recyclingPiece, recyclingPiecePercent, GAIN.crystal.reset())
    hidePiece(player.challenge.completed.includes(10) ? CHALL[10].effect() : 1, challenge10Piece, challenge10PiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.shop.permanent[1].effect(), crystalBoostPiece, crystalBoostPiecePercent, GAIN.crystal.reset())
    hidePiece(UNL.overdrive.type2.effect(), overdrive2EffectPiece, overdrive2EffectPiecePercent, GAIN.crystal.reset())
    hidePiece(UPGS.minerals[3].effect1(), thirdMineralEffect1Piece, thirdMineralEffect1PiecePercent, GAIN.crystal.reset())
    hidePiece(Math.pow(3, UPGS.supercrystal[12].unl()), secondSuperCrystalSingleEffectPiece, secondSuperCrystalSingleEffectPiecePercent, GAIN.crystal.reset())
    hidePiece(ACHS.effect.crystal(), achievementBonus2Piece, achievementBonus2PiecePercent, GAIN.crystal.reset())
    summaryCrystalStatsEffect.innerHTML = "x"+formatBoost(GAIN.crystal.reset())
}

function statsShardsPerClickUpdate() {
    firstShardBuyableEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.shard.buyables[1].effect())
    fifthShopBuyableEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[5].effect())
    ninthSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatBoost(Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()))

    hidePiece(UPGS.shard.buyables[1].effect(), firstShardBuyableEffectPiece, firstShardBuyableEffectPiecePercent, GAIN.shard.click())
    hidePiece(UPGS.shop.buyables[5].effect(), fifthShopBuyableEffectPiece, fifthShopBuyableEffectPiecePercent, GAIN.shard.click())
    hidePiece(Math.pow(UPGS.supercrystal[33].effect(), UPGS.supercrystal[33].unl()), ninthSuperCrystalSingleEffectPiece, ninthSuperCrystalSingleEffectPiecePercent, GAIN.shard.click())
    
    summaryShPerClickStatsEffect.innerHTML = "x" + formatBoost(GAIN.shard.click())
}

function statsShardsPerSecondUpdate() {
    secondShardBuyableEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.shard.buyables[2].effect())
    fifthShopBuyableEffect2StatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.buyables[5].effect())
    thirdMineralEffect2StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[3].effect2())
    achievement39StatsEffect.innerHTML = "x" + formatBoost(Math.pow(1.337, ACHS.has(39)))
    achievementBonus3StatsEffect.innerHTML = "x" + formatBoost(ACHS.effect.shard())
    
    hidePiece(UPGS.shard.buyables[2].effect(), secondShardBuyableEffectPiece, secondShardBuyableEffectPiecePercent, GAIN.shard.second())
    hidePiece(UPGS.shop.buyables[5].effect(), fifthShopBuyableEffect2Piece, fifthShopBuyableEffect2PiecePercent, GAIN.shard.second())
    hidePiece(UPGS.minerals[3].effect2(), thirdMineralEffect2Piece, thirdMineralEffect2PiecePercent, GAIN.shard.second())
    hidePiece(Math.pow(1.337, ACHS.has(39)), achievement39Piece, achievement39PiecePercent, GAIN.shard.second())
    hidePiece(ACHS.effect.shard(), achievementBonus3Piece, achievementBonus3PiecePercent, GAIN.shard.second())
    
    summaryShPerSecondStatsEffect.innerHTML = "x" + formatBoost(GAIN.shard.second())
}

function statsShardsEffectUpdate() {
    shardStatsEffect.innerHTML = "x" + formatBoost(1 + player.shard.currency / 100)
    achievement30StatsEffect.innerHTML = "x" + formatBoost(Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)))
    fourthShardSingleEffectStatsEffect.innerHTML = "^" + formatPower(UPGS.shard.singles[21].effect())
    challengeReward7StatsEffect.innerHTML = "x" + formatBoost(player.challenge.completed.includes(7) ? CHALL[7].effect() : 1)

    let gainWithoutPower = findMultiplier(Math.pow(GAIN.shard.effect.no_softcap_effect(), 1 / UPGS.shard.singles[21].effect()), UPGS.shard.singles[21].effect())

    hidePiece(1 + player.shard.currency / 100, shardPiece, shardPiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(Math.pow(1+Math.pow(player.prestige.resets, 0.3), ACHS.has(30)), achievement30Piece, achievement30PiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(gainWithoutPower, fourthShardSingleEffectPiece, fourthShardSingleEffectPiecePercent, GAIN.shard.effect.no_softcap_effect())
    hidePiece(player.challenge.completed.includes(7) ? CHALL[7].effect() : 1, challengeReward7Piece, challengeReward7PiecePercent, GAIN.shard.effect.no_softcap_effect())

    summaryShEffectStatsEffect.innerHTML = "x" + formatBoost(GAIN.shard.effect.effect())
}

function statsCritChanceUpdate() {
    baseCriticalChanceEffectStatsEffect.innerHTML = "+" + formatBoost(GAIN.critical.baseChance)
    fourthSuperCrystalSingleEffectStatsEffect.innerHTML = "+" + formatBoost(UPGS.supercrystal[21].unl() ? 2 : 0)
    eighthShopBuyableEffectStatsEffect.innerHTML = "+" + formatBoost(UPGS.shop.permanent[3].effect())
    firstMineralEffect1StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[1].effect1())
    fifthBuyableSuperEffectStatsEffect.innerHTML = "^" + formatPower(UPGS.coin.buyables[5].effect_super())
    
    let gainWithoutPower = findMultiplier(Math.pow(GAIN.critical.chance.multiplicative(), 1 / UPGS.coin.buyables[5].effect_super()), UPGS.coin.buyables[5].effect_super())

    let temp2 = 100/findRatio2(GAIN.critical.chance.additive(), GAIN.critical.chance.multiplicative())

    hidePiece(GAIN.critical.chance.additive(), criticalGraphic, criticalGraphicSpan, GAIN.critical.chance.multiplicative())
    hidePiece2(GAIN.critical.baseChance, baseCriticalChanceEffectPiece, baseCriticalChanceEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece2(UPGS.supercrystal[21].unl() ? 2 : 0, fourthSuperCrystalSingleEffectPiece, fourthSuperCrystalSingleEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece2(UPGS.shop.permanent[3].effect(), eighthShopBuyableEffectPiece, eighthShopBuyableEffectPiecePercent, GAIN.critical.chance.additive(), temp2)
    hidePiece(UPGS.minerals[1].effect1(), firstMineralEffect1Piece, firstMineralEffect1PiecePercent, GAIN.critical.chance.multiplicative())
    hidePiece(gainWithoutPower, fifthBuyableSuperEffectPiece, fifthBuyableSuperEffectPiecePercent, GAIN.critical.chance.multiplicative())
    summaryCritChanceStatsEffect.innerHTML = formatBoost(GAIN.critical.chance.multiplicative()) + "%"
}

function statsCritMultiUpdate() {
    baseCriticalGainEffectStatsEffect.innerHTML = "x" + formatBoost(GAIN.critical.baseMult)
    fifthSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatBoost(Math.pow(5, UPGS.supercrystal[22].unl()))
    ninthShopBuyableEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.shop.permanent[4].effect())
    firstMineralEffect2StatsEffect.innerHTML = "x" + formatBoost(UPGS.minerals[1].effect2())
    thirdBuyableSuperEffectStatsEffect.innerHTML = "x" + formatBoost(UPGS.coin.buyables[3].effect_super())
    
    hidePiece(GAIN.critical.baseMult, baseCriticalGainEffectPiece, baseCriticalGainEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(Math.pow(5, UPGS.supercrystal[22].unl()), fifthSuperCrystalSingleEffectPiece, fifthSuperCrystalSingleEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.shop.permanent[4].effect(), ninthShopBuyableEffectPiece, ninthShopBuyableEffectPiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.minerals[1].effect2(), firstMineralEffect2Piece, firstMineralEffect2PiecePercent, GAIN.critical.multiplier())
    hidePiece(UPGS.coin.buyables[3].effect_super(), thirdBuyableSuperEffectPiece, thirdBuyableSuperEffectPiecePercent, GAIN.critical.multiplier())
    
    summaryCritMultiStatsEffect.innerHTML = "x" + formatBoost(GAIN.critical.multiplier())
}

function statsClickSimulationUpdate() {
    thirdSuperCrystalSingleEffectStatsEffect.innerHTML = "x" + formatBoost(Math.pow(2, UPGS.supercrystal[13].unl()))

    hidePiece(Math.pow(2, UPGS.supercrystal[13].unl()), thirdSuperCrystalSingleEffectPiece, thirdSuperCrystalSingleEffectPiecePercent, GAIN.simulation.multiplier())
    
    summaryClickSimStatsEffect.innerHTML = "x" + formatBoost(GAIN.simulation.multiplier())
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
