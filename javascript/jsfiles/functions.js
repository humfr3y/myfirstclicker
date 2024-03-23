

function updateTick() {
    if (isNaN(overdriveType1.consumed)){
        overdriveType1.consumed = 0
    }
    disabledUpgrades()
    getShardPerSec()
    
    statsPerClickUpdate()
    statsPerSecondUpdate()
    statsGainUpdate()
    statsSuperCoinChanceUpdate()
    statsCrystalsUpdate()
    prestigeSingleEffect()
    checkUpgradesText()
    checkCrystalsTemp()
    // checkSpiritualEvent()
    checkTriplePowerEvent()
    overdriveType1.effect = 1+Math.pow(2, overdriveType1.percent/2.5)/9
    achRow1.completion[18] ? overdriveType1.effect *= 1.1 : overdriveType1.effect
    challengeCompleted[10] ? post11challenge.style.display = 'flex' : post11challenge.style.display = 'none'
    challengeCompleted[10] ? post11challenge2.style.display = 'flex' : post11challenge2.style.display = 'none'
}

function reloadPage() {
    location.reload()
    doHardReset()
}

function reloadPage2() {
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

function checkTriplePowerEvent() {
    if (limits(dayOfMonth, 8, 23) && (currentMonth == 3)) {
        isTriplePowerEvent = true
    }
    else isTriplePowerEvent = false
    if (isTriplePowerEvent) {
    triplePowerEvent.style.display = 'flex'
    noEvent.style.display = 'none'
    // spiritEffects[0] = 1+(spirits/333)
    // spiritEffects[1] = 1+(spirits/3333)
    // firstPrestigeBuyable.amount >= 1 ? spiritEffects[2] = 1+(spirits/500) : spiritEffects[2] = 1
    // spiritEffects[3] = 1+(spirits/250)
    }
    else {
    triplePowerEvent.style.display = 'none'
    noEvent.style.display = 'block'
    } 
}

function sacrifice(type) {
    if (type.currency >= type.requirement) {
        type.amount++
        type.totalAmount++
        type.currency -= type.requirement
    }
}

function buyTripleEventUpgrade(type) {
    if (type.amount >= type.price) {
        type.amount -= type.price
        type.boost += 0.1
        type.price++
    }
}

function buyTripleEventGreyUpgrade() {
    if (greyCoin.amount >= greyCoin.price && greyCoin.effect <= 4) {
        greyCoin.amount -= greyCoin.price
        pinkCoin.amount -= greyCoin.price
        greenCoin.amount -= greyCoin.price
        blueCoin.amount -= greyCoin.price
        greyCoin.effect += 1
        greyCoin.price++
    }
    if (greyCoin.effect >= 5) greyCoin.price = 999
}

function checkCompletedChallenges() {
    for (let i = 0; i < challengeCompleted.length; i++) {
        if (challengeCompleted[i]) {
            window[`challenge${i+1}Start`].innerHTML = 'Пройден'
            window[`challenge${i+1}Start`].style.backgroundColor = '#3dde3d'
        }
    }
}

function changeInputValue2(arg){
    shopBulkBuyInput.value = arg
}

function checkCrystalsTemp() {
    crystalsTemp = firstPrestigeBuyableEffect
    achRow1.completion[17] ? crystalsTemp *= 4 : crystalsTemp
    crystalsTemp *= firstShardSingleEffect
    crystalsTemp *= spiritEffects[2]
    crystalsTemp *= 1+sixthShopBuyableEffect
    crystalsTemp *= 1+pinkCoin.effect
    !challengeActivate && challengeCompleted[9] ? crystalsTemp *= Math.log(10+amountsOfUpgrades) : crystalsTemp
    
    if (prestigeMilestonesEffects[14]) {
        prestigeCountMultiplier2 = Math.floor(Math.log10(money+10)-14)
    }
    else {
        prestigeCountMultiplier2 = 1 
    }
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

function useShopItem(item, id) {
    let notifyUsed = (useNotify + itemNames[id-1])
    let notifyNoItem = (notUseNotify + itemNames[id-1] + "!")
    let notifyLimit = (notUseNotify2 + item.max + " " + itemNames[id-1] + notUseNotify3)
    if (item.amount > 0 && item.used != item.max && !challengeActivate) {
        item.amount--
        item.used++
        if (id == 1){
            umultipliercount++
        }
        if (id == 2){
            upowercount++
        }
        if (id == 3){
            offlineGainDev(60)
        }
        if (id == 4){
            offlineGainDev(600)
        }
        notify(notifyUsed)
    } 
    else if ((item.used == item.max && item.amount > 0) || challengeActivate) notify(notifyLimit, "red", "550px")
    else notify(notifyNoItem, "red")

}









function statsPerClickUpdate() { //multi breakdown click
    let chall6 = Math.pow(Math.pow(1.99, challengesCompleted), challengeCompleted[5])
    challengeActivate ? chall6 = 1 : chall6
    doublerStatsEffect.innerHTML = "x" + formatBoost(thirdBuyableEffect)
    midasCursorStatsEffect.innerHTML = "x" + formatBoost(secondSingleEffect)
    rewardForFeatsStatsEffect.innerHTML = "x" + formatBoost(eighthSingleEffect)
    challenge6StatsEffect.innerHTML = "x" + formatBoost(chall6)
    goldenGloveStatsEffect.innerHTML = "x" + formatBoost(1+firstShopBuyableEffect)
    gainStatsEffect.innerHTML = "x" + formatBoost(gain)
    alphaPowerStatsEffect.innerHTML = "^" + formatPower(fifthBuyableEffect)
    let summ = Math.pow((thirdBuyableEffect*secondSingleEffect*eighthSingleEffect*(1+firstShopBuyableEffect)*chall6*gain), fifthBuyableEffect)
    let summWithoutPower = thirdBuyableEffect*secondSingleEffect*eighthSingleEffect*(1+firstShopBuyableEffect)*chall6*gain
    let alphaPowerMulti = findMultiplier(summWithoutPower, fifthBuyableEffect)
    hidePiece(thirdBuyableEffect, doublerPiece, doublerPiecePercent, summ)
    hidePiece(secondSingleEffect, midasCursorPiece, midasCursorPiecePercent, summ)
    hidePiece(eighthSingleEffect, rewardPiece, rewardPiecePercent, summ)
    hidePiece((1+firstShopBuyableEffect), goldenGlovePiece, goldenGlovePiecePercent, summ)
    hidePiece(chall6, challenge6Piece, challenge6PiecePercent, summ)
    hidePiece(gain, gainClickPiece, gainClickPiecePercent, summ)
    hidePiece(alphaPowerMulti, alphaPowerPiece, alphaPowerPiecePercent, summ)
    if (summ < 1e13) {
        postE13SoftcapClick.style.display = 'none'
    }
    else {
        postE13SoftcapClick.style.display = 'flex'
    }
    if (!challengeActivate && challengeCompleted[8]) summ = softCap(summ, 1e13 * Math.pow(totalSuperCoins, 1.2), prestigeSinglesEffects[10][0]);
        else summ = softCap(summ, 1e13, prestigeSinglesEffects[10][0]);
    summaryClickStatsEffect.innerHTML = "x" + formatBoost(summ)
}

function statsPerSecondUpdate() {
    let achievement15Effect
    let chall8 = Math.pow(prestigeTimer, challengeCompleted[7])
    let chall3 = Math.pow(1+(Math.log(prestigeCount)/111), challengeCompleted[3])
    challengeActivate ? chall8 = 1 : chall8
    challengeActivate ? chall3 = 1 : chall3
    achRow1.completion[4] ? achievement15Effect = 1+0.0001*clickCount : achievement15Effect = 1
    
    smallInvestmentStatsEffect.innerHTML = "+" + formatNumber(firstBuyableEffect)
    multiplierUpgradeStatsEffect.innerHTML = "x" + formatBoost(fourthBuyableEffect)
    richFameStatsEffect.innerHTML = "x" + formatBoost(firstSingleEffect)
    negativeAlphaStatsEffect.innerHTML = "x" + formatBoost(sixthSingleEffect)
    goldenClockStatsEffect.innerHTML = "x" + formatBoost(1+secondShopBuyableEffect)
    challenge8StatsEffect.innerHTML = "x" + formatBoost(chall8)
    achievement15StatsEffect.innerHTML = "x" + formatBoost(achievement15Effect)
    gain2StatsEffect.innerHTML = "x" + formatBoost(gain)
    challenge3StatsEffect.innerHTML = "^" + formatPower(chall3)
    let summ = Math.pow(firstBuyableEffect*fourthBuyableEffect*firstSingleEffect*sixthSingleEffect*(1+secondShopBuyableEffect)*achievement15Effect*chall8*gain, chall3)
    let summWithoutPower = firstBuyableEffect*fourthBuyableEffect*firstSingleEffect*sixthSingleEffect*(1+secondShopBuyableEffect)*achievement15Effect*chall8*gain
    let chall3Multi = findMultiplier(summWithoutPower, chall3)
    hidePiece(firstBuyableEffect, smallInvestmentPiece, smallInvestmentPiecePercent, summ)
    hidePiece(fourthBuyableEffect, multiplierPiece, multiplierPiecePercent, summ)
    hidePiece(firstSingleEffect, richFamePiece, richFamePiecePercent, summ)
    hidePiece(sixthSingleEffect, negativeAlphaPiece, negativeAlphaPiecePercent, summ)
    hidePiece((1+secondShopBuyableEffect), goldenClockPiece, goldenClockPiecePercent, summ)
    hidePiece(achievement15Effect, achievement15Piece, achievement15PiecePercent, summ)
    hidePiece(chall8, challenge3Piece, challenge3PiecePercent, summ)
    hidePiece(gain, gainSecondPiece, gainSecondPiecePercent, summ)
    hidePiece(chall3Multi, challenge8Piece, challenge8PiecePercent, summ)
    if (summ < 1e13) {
        postE13SoftcapSecond.style.display = 'none'
    }
    else {
        postE13SoftcapSecond.style.display = 'flex'
    }
    if (!challengeActivate && challengeCompleted[8]) summ = softCap(summ, 1e13 * Math.pow(totalSuperCoins, 1.2), prestigeSinglesEffects[10][1]);
        else summ = softCap(summ, 1e13, prestigeSinglesEffects[10][1]);
    summarySecondStatsEffect.innerHTML = "x" + formatBoost(summ)
}

let ach28boost

function statsGainUpdate() {
    let chall1 = Math.pow(1.1, challengeCompleted[0])
    challengeActivate ? chall1 = 1 : chall1
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
    challenge1StatsEffect.innerHTML = "^" + formatPower(chall1)
    let summ = Math.pow(Math.pow(Math.pow((thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*(1+shardsEffect)*achievementBonus*umultiplier), upower), prestigeSinglesEffects[1]), chall1)
    let summWithoutPower1 = Math.pow(Math.pow((thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*(1+shardsEffect)*achievementBonus*umultiplier), upower), prestigeSinglesEffects[1])
    let summWithoutPower2 = Math.pow((thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*(1+shardsEffect)*achievementBonus*umultiplier), upower)
    let summWithoutPower3 = thirdSingleEffect*seventhSingleEffect*(1+thirdShopBuyableEffect)*overdriveType1.effect*ach28boost*prestigeSinglesEffects[8]*prestigeSinglesEffects[9]*shardsEffect*achievementBonus*umultiplier
    let chall1Multi = findMultiplier(summWithoutPower1, chall1)
    let pse2Multi = findMultiplier(summWithoutPower2, prestigeSinglesEffects[1])
    let upowerMulti = findMultiplier(summWithoutPower3, upower)
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
    hidePiece(chall1Multi, challenge1Piece, challenge1PiecePercent, summ)
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
    let chall10 = Math.pow(Math.log(10+amountsOfUpgrades), challengeCompleted[9])
    challengeActivate ? chall10 = 1 : chall10
    achievement282StatsEffect.innerHTML = "x" + formatBoost(ach28boost)
    brilliantDoublerStatsEffect.innerHTML = "x" + formatBoost(firstPrestigeBuyableEffect)
    recyclingStatsEffect.innerHTML = "x" + formatBoost(firstShardSingleEffect)
    challenge10StatsEffect.innerHTML = "x" + formatBoost(chall10)
    crystalBoostStatsEffect.innerHTML = "x" + formatBoost(1+sixthShopBuyableEffect)
    let sum = ach28boost*firstPrestigeBuyableEffect*firstShardSingleEffect*chall10*(1+sixthShopBuyableEffect)
    hidePiece(ach28boost, achievement282Piece, achievement282PiecePercent, sum)
    hidePiece(firstPrestigeBuyableEffect, brilliantDoublerPiece, brilliantDoublerPiecePercent, sum)
    hidePiece(firstShardSingleEffect, recyclingPiece, recyclingPiecePercent, sum)
    hidePiece(chall10, challenge10Piece, challenge10PiecePercent, sum)
    hidePiece(1+sixthShopBuyableEffect, crystalBoostPiece, crystalBoostPiecePercent, sum)
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
    if (isTriplePowerEvent) greenCoin.currency += time*0.000028
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
