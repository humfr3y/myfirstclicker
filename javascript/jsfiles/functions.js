function updateTick() {
    if (isNaN(overdriveType1.consumed)){
        overdriveType1.consumed = 0
    }
    disabledUpgrades()
    getShardPerSec()
    addSecond()
    statsPerClickUpdate()
    statsPerSecondUpdate()
    statsGainUpdate()
    statsSuperCoinChanceUpdate()
    statsCrystalsUpdate()
    prestigeSingleEffect()
    checkUpgradesText()
    checkMaxShop()
    checkCrystalsTemp()
    checkSpiritualEvent()
    overdriveType1.effect = 1+Math.pow(2, overdriveType1.percent/2.5)/9
    achRow1.completion[18] ? overdriveType1.effect *= 1.1 : overdriveType1.effect
}

function reloadPage() {
    doHardReset()
    location.reload()
}

function checkSpiritualEvent() {
    if (limits(dayOfMonth, 5, 12) && (currentMonth == 10)) {
        isSpiritualEvent = true
    }
    else isSpiritualEvent = false
    if (isSpiritualEvent) {
    spiritualEvent.style.display = 'flex'
    noEvent.style.display = 'none'
    spiritEffects[0] = 1+(spirits/333)
    spiritEffects[1] = 1+(spirits/3333)
    firstPrestigeBuyable.amount >= 1 ? spiritEffects[2] = 1+(spirits/500) : spiritEffects[2] = 1
    spiritEffects[3] = 1+(spirits/250)
    }
    else {
    spiritualEvent.style.display = 'none'
    noEvent.style.display = 'block'
    } 
}

function checkCrystalsTemp() {
    crystalsTemp = firstPrestigeBuyableEffect
    achRow1.completion[17] ? crystalsTemp *= 4 : crystalsTemp
    crystalsTemp *= firstShardSingleEffect
    crystalsTemp *= spiritEffects[2]

    // if (prestigeMilestonesEffects[14]) {
    //     prestigeCountMultiplier = Math.floor(Math.log10(money+10)-14)
    //     console.log ("checkcrystals psm = " + prestigeCountMultiplier)
    // }
    // else {
    //     prestigeCountMultiplier = 1 
    // }
}

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

function formatNumber(number) {
    if (number < 1000000) {
        return number.toFixed(0);
    } else {
        return number.toExponential(2).replace("+","");
    }
}

function formatNumber3(number) {
    if (number < 1000000) {
        return Math.floor(number).toString()
    } else {
        return number.toExponential(2).replace("+","");
    }
}

function formatNumber4(number) {
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

    function formatBoost(boost) {
    if (boost < 100) {
        return boost.toFixed(2);
    } else if (boost >= 100 && boost < 1000000) {
        return boost.toFixed(0);
    } else {
        return boost.toExponential(2).replace("+","");
    }
}

function formatPower(power) {
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

function statsPerClickUpdate() { //multi breakdown click
    doublerStatsEffect.innerHTML = "x" + formatBoost(thirdBuyableEffect)
    midasCursorStatsEffect.innerHTML = "x" + formatBoost(secondSingleEffect)
    rewardForFeatsStatsEffect.innerHTML = "x" + formatBoost(eighthSingleEffect)
    goldenGloveStatsEffect.innerHTML = "x" + formatBoost(1+firstShopBuyableEffect)
    gainStatsEffect.innerHTML = "x" + formatBoost(gain)
    alphaPowerStatsEffect.innerHTML = "^" + formatPower(fifthBuyableEffect)
    let summ = Math.pow((thirdBuyableEffect*secondSingleEffect*eighthSingleEffect*(1+firstShopBuyableEffect)*gain), fifthBuyableEffect)
    let summWithoutPower = thirdBuyableEffect*secondSingleEffect*eighthSingleEffect*(1+firstShopBuyableEffect)*gain
    let alphaPowerMulti = findMultiplier(summWithoutPower, fifthBuyableEffect)
    hidePiece(thirdBuyableEffect, doublerPiece, doublerPiecePercent, summ)
    hidePiece(secondSingleEffect, midasCursorPiece, midasCursorPiecePercent, summ)
    hidePiece(eighthSingleEffect, rewardPiece, rewardPiecePercent, summ)
    hidePiece((1+firstShopBuyableEffect), goldenGlovePiece, goldenGlovePiecePercent, summ)
    hidePiece(gain, gainClickPiece, gainClickPiecePercent, summ)
    hidePiece(alphaPowerMulti, alphaPowerPiece, alphaPowerPiecePercent, summ)
    if (summ < 1e13) {
        postE13SoftcapClick.style.display = 'none'
    }
    else {
        postE13SoftcapClick.style.display = 'flex'
    }
    summ = softCap(summ, 1e13, prestigeSinglesEffects[10][0])
    summaryClickStatsEffect.innerHTML = "x" + formatBoost(summ)
}

function statsPerSecondUpdate() {
    let achievement15Effect
    achRow1.completion[4] ? achievement15Effect = 1+0.0001*clickCount : achievement15Effect = 1
    
    smallInvestmentStatsEffect.innerHTML = "+" + formatNumber(firstBuyableEffect)
    multiplierUpgradeStatsEffect.innerHTML = "x" + formatBoost(fourthBuyableEffect)
    richFameStatsEffect.innerHTML = "x" + formatBoost(firstSingleEffect)
    negativeAlphaStatsEffect.innerHTML = "x" + formatBoost(sixthSingleEffect)
    goldenClockStatsEffect.innerHTML = "x" + formatBoost(1+secondShopBuyableEffect)
    achievement15StatsEffect.innerHTML = "x" + formatBoost(achievement15Effect)
    gain2StatsEffect.innerHTML = "x" + formatBoost(gain)
    let summ = firstBuyableEffect*fourthBuyableEffect*firstSingleEffect*sixthSingleEffect*(1+secondShopBuyableEffect)*achievement15Effect*gain
    hidePiece(firstBuyableEffect, smallInvestmentPiece, smallInvestmentPiecePercent, summ)
    hidePiece(fourthBuyableEffect, multiplierPiece, multiplierPiecePercent, summ)
    hidePiece(firstSingleEffect, richFamePiece, richFamePiecePercent, summ)
    hidePiece(sixthSingleEffect, negativeAlphaPiece, negativeAlphaPiecePercent, summ)
    hidePiece((1+secondShopBuyableEffect), goldenClockPiece, goldenClockPiecePercent, summ)
    hidePiece(achievement15Effect, achievement15Piece, achievement15PiecePercent, summ)
    hidePiece(gain, gainSecondPiece, gainSecondPiecePercent, summ)
    if (summ < 1e13) {
        postE13SoftcapSecond.style.display = 'none'
    }
    else {
        postE13SoftcapSecond.style.display = 'flex'
    }
    summ = softCap(summ, 1e13, prestigeSinglesEffects[10][1])
    summarySecondStatsEffect.innerHTML = "x" + formatBoost(summ)
}

let ach28boost

function statsGainUpdate() {
    doublerPlusStatsEffect.innerHTML = "x" + formatBoost(thirdSingleEffect)
    cashBackStatsEffect.innerHTML = "x" + formatBoost(seventhSingleEffect)
    goldenKeyStatsEffect.innerHTML = "x" + formatBoost(1+thirdShopBuyableEffect)
    overdriveType1StatsEffect.innerHTML = "x" + formatBoost(overdriveType1.effect)
    achievementsStatsEffect.innerHTML = "x" + formatBoost(achievementBonus)
    if (achRow1.completion[17]) ach28boost = 4
    else ach28boost = 1 
    achievement28StatsEffect.innerHTML = "x" + formatBoost(ach28boost)
    hourglassStatsEffect.innerHTML = "x" + formatBoost(prestigeSinglesEffects[8])
    antiHourglassStatsEffect.innerHTML = "x" + formatBoost(prestigeSinglesEffects[9])
    shardsStatsEffect.innerHTML = "x" + formatBoost(1+shardsEffect)
    umultiplierStatsEffect.innerHTML = "x" + formatBoost(umultiplier)
    upowerStatsEffect.innerHTML = "^" + formatPower(upower)
    activity2StatsEffect.innerHTML = "^" + formatPower(prestigeSinglesEffects[1])
    let summ = Math.pow(Math.pow((thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*(1+shardsEffect)*achievementBonus*umultiplier), upower), prestigeSinglesEffects[1])
    let summWithoutPower1 = Math.pow((thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*(1+shardsEffect)*achievementBonus*umultiplier), upower)
    let summWithoutPower2 = thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*shardsEffect*achievementBonus*umultiplier
    let pse2Multi = findMultiplier(summWithoutPower1, upower)
    let upowerMulti = findMultiplier(summWithoutPower2, upower)
    hidePiece(thirdSingleEffect, doublerPlusPiece, doublerPlusPiecePercent, summ)
    hidePiece(seventhSingleEffect, cashBackPiece, cashBackPiecePercent, summ)
    hidePiece((1+thirdShopBuyableEffect), goldenKeyPiece, goldenKeyPiecePercent, summ)
    hidePiece(overdriveType1.effect, overdriveType1Piece, overdriveType1PiecePercent, summ)
    hidePiece(achievementBonus, achievementsPiece, achievementsPiecePercent, summ)
    hidePiece(ach28boost, achievement28Piece, achievement28PiecePercent, summ)
    hidePiece(prestigeSinglesEffects[8], hourglassPiece, hourglassPiecePercent, summ)
    hidePiece(prestigeSinglesEffects[9], antiHourglassPiece, antiHourglassPiecePercent, summ)
    hidePiece(1+shardsEffect, shardsPiece, shardsPiecePercent, summ)
    hidePiece(umultiplier, umultiplierPiece, umultiplierPiecePercent, summ)
    hidePiece(upowerMulti, upowerPiece, upowerPiecePercent, summ)
    hidePiece(pse2Multi, activity2Piece, activity2PiecePercent, summ)
    if (summ < 1e15) {
        postE15SoftcapGain.style.display = 'none'
    }
    else {
        postE15SoftcapGain.style.display = 'flex'
    }
    summ = softCap(summ, 1e15, 0.5)
    summaryGainStatsEffect.innerHTML = "x" + formatBoost(summ)
}

function statsSuperCoinChanceUpdate() {
    luckyCloverStatsEffect.innerHTML = "x" + formatBoost(1+fourthShopBuyableEffect)
    charismaStatsEffect.innerHTML = "x" + formatBoost(prestigeSinglesEffects[2][0])
    let sum = (1+fourthShopBuyableEffect)*prestigeSinglesEffects[2][0]
    hidePiece(1+fourthShopBuyableEffect, luckyCloverPiece, luckyCloverPiecePercent, sum)
    hidePiece(prestigeSinglesEffects[2][0], charismaPiece, charismaPiecePercent, sum)
    summarySCChanceStatsEffect.innerHTML = formatBoost(sum) + "%"
}

function statsCrystalsUpdate(){
    achievement282StatsEffect.innerHTML = "x" + formatBoost(ach28boost)
    brilliantDoublerStatsEffect.innerHTML = "x" + formatBoost(firstPrestigeBuyableEffect)
    recyclingStatsEffect.innerHTML = "x" + formatBoost(firstShardSingleEffect)
    let sum = ach28boost*firstPrestigeBuyableEffect*firstShardSingleEffect
    hidePiece(ach28boost, achievement282Piece, achievement282PiecePercent, sum)
    hidePiece(firstPrestigeBuyableEffect, brilliantDoublerPiece, brilliantDoublerPiecePercent, sum)
    hidePiece(firstShardSingleEffect, recyclingPiece, recyclingPiecePercent, sum)
    summaryCrystalStatsEffect.innerHTML = "x"+formatBoost(sum)
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


function offlineGainDev(time) {
    checkUpgradesText()
    prestigeSingleEffect()

    if (time >= (1000/(1+fourthShopBuyableEffect))/prestigeSinglesEffects[2][1]) {
        superCoinsTemp = time/((1000/(1+fourthShopBuyableEffect))/prestigeSinglesEffects[2][1])
    }
    else superCoinsTemp = 0
    if (achRow1.completion[11]) {
        offlineCrystalsTemp = time/(7200/secondPrestigeBuyableEffect)
        achRow1.completion[17] ? offlineCrystalsTemp *= 4 : offlineCrystalsTemp
        offlineCrystalsTemp *= firstShardSingleEffect
        offlineCrystalsTemp *= firstPrestigeBuyableEffect
        crystals += offlineCrystalsTemp
        totalCrystals += offlineCrystalsTemp
        }
    if (prestigeMilestonesEffects[15]){
        offlinePrestigesTemp = (time/60)*(fastestNoMaxBuyPrestiges/20)
        prestigeCount += offlinePrestigesTemp
        }
    if (shardUnlockablePerSecond.percent == 100) {
        offlineShardsTemp = shardsPerSecond * 20 * time
        shards += offlineShardsTemp
        }

    dailyTimer -= time
    dailyMinutes = 0
    dailyHours = 0
    dailySeconds = dailyTimer
    convertingDailyTime()
    superCoins += superCoinsTemp
    totalSuperCoins += superCoinsTemp
    setTimeout(() => {
        getCoinPerSec()
        moneyTemp = gainPerSecond * 20 * time
        moneyTemp = Math.max(0, moneyTemp)  
        money += moneyTemp
        total += moneyTemp
    }, 300);

    gameSecondsTemp = time
    gameTimerTemp = time
    prestigeSecondsTemp = time
    prestigeTimerTemp = time
    gameSeconds += gameSecondsTemp
    gameTimer += gameTimerTemp
    prestigeSeconds += prestigeSecondsTemp
    prestigeTimer += prestigeTimerTemp
    umultiplierTimer += time
    upowerTimer += time
}