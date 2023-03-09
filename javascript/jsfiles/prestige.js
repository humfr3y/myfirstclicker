var diamonds = 0
var diamondsGain = 0
var diamondsBoost = 0
var singleUpgradeHover1 = document.querySelector('#singleU1')
var singleUpgradeHover2 = document.querySelector('#singleU2')
var singleUpgradeHover3 = document.querySelector('#singleU3')
function canPrestige () {
if (money>1e9) {
   // if (diamondsGain<1e5)
    diamondsGain = Math.floor(Math.pow(150, ((Math.log10(money) / 9) - 0.9))*1.2)
    diamondsGain = diamondsGain*psthird.boost
    if (diamondsGain >= 4000) {
        var softDiamondsGain1 = diamondsGain/4000
        diamondsGain = Math.floor(4000*Math.pow(softDiamondsGain1, 0.25))
    }
    if (diamondsGain >= 100000) {
        var softDiamondsGain2 = diamondsGain/100000
        diamondsGain = Math.floor(1e5*Math.pow(softDiamondsGain2, 0.75))
    }
    if (diamondsGain<1e6){
    if (data==1) {doPrestige.innerHTML = "<ut>Стать престижным</ut> <br> Сбросьте все α-монеты и улучшения чтобы получить " + diamondsGain + " алмазов." } 
    else {doPrestige.innerHTML =  "<ut>Became prestige</ut> <br> Reset all α-coins and upgrades for " + diamondsGain + " diamonds."}
    }
    if (diamondsGain>=1e6){
        if (data==1) {doPrestige.innerHTML = "<ut>Стать престижным</ut> <br> Сбросьте все α-монеты и улучшения чтобы получить " + diamondsGain.toExponential(2).replace("+","") + " алмазов." } 
        else {doPrestige.innerHTML =  "<ut>Became prestige</ut> <br> Reset all α-coins and upgrades for " + diamondsGain.toExponential(2).replace("+","") + " diamonds."}
        }
    return diamondsGain, diamonds;
    }
else {
    if (data==1) {doPrestige.innerHTML = "<ut>Стать престижным</ut> <br> Накопите 1,000,000,000 α-монет" } 
    else {doPrestige.innerHTML =  "<ut>Became prestige</ut> <br> Get 1,000,000,000 α-coins"}
}
}
function doPrestigeReset () {
    if (money>1e9) {
        diamonds = diamonds + diamondsGain;
        diamondsBoost = diamonds // and multipliers
        totalDiamond = totalDiamond + diamonds
        totalPrestiges++
        if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toFixed(0) + " алмазов."} 
        else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toFixed(0) + " diamonds."}
        if (totalDiamond>1e6){
        if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toExponential(2).replace("+","") + " алмазов."} 
        else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toExponential(2).replace("+","") + " diamonds."}
    }
        if (data==1) {totalResets.innerHTML = "Всего вы сделали " + totalPrestiges.toFixed(0) + " престиж сбросов."} 
        else {totalResets.innerHTML = "Totally you did " + totalPrestiges.toFixed(0) + " prestige resets."}

        unlockPrestige.call();
        prestigeReset.call()
        stopPRInterval.call()
    }
}
setInterval(canPrestige,50)







