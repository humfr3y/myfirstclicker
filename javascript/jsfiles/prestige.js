// var diamonds = 0
// var diamondsGain = 0
// var diamondsBoost = 0
// var singleUpgradeHover1 = document.querySelector('#singleU1')
// var singleUpgradeHover2 = document.querySelector('#singleU2')
// var singleUpgradeHover3 = document.querySelector('#singleU3')
// var bestPrestigeRun = 1000000
// var tenthBank, ninthBank, eighthBank, seventhBank, sixthBank, fifthBank, fourthBank, thirdBank, secondBank, firstBank
// var doPrestige = document.getElementById('doPrestige')
// function canPrestige () {
// if (money>1e9) {
//    // if (diamondsGain<1e5)
//     diamondsGain = Math.floor(Math.pow(150, ((Math.log10(money) / 9) - 0.9))*1.2)
//     // diamondsGain = diamondsGain*psthird.boost
//     if (diamondsGain >= 4000) {
//         var softDiamondsGain1 = diamondsGain/4000
//         diamondsGain = Math.floor(4000*Math.pow(softDiamondsGain1, 0.201))
//     }
//     if (diamondsGain >= 100000) {
//         var softDiamondsGain2 = diamondsGain/100000
//         diamondsGain = Math.floor(1e5*Math.pow(softDiamondsGain2, 0.4275))
//     }
//     if (diamondsGain<1e6){
//     if (data==1) {doPrestige.innerHTML = "<ut>Стать престижным</ut> <br> Сбросьте всё и получите " + diamondsGain + " алмазов."}
//     else {doPrestige.innerHTML =  "<ut>Became prestige</ut> <br> Reset everything for " + diamondsGain + " diamonds."}
//     }
//     if (diamondsGain>=1e6){
//         if (data==1) {doPrestige.innerHTML = "<ut>Стать престижным</ut> <br> Сбросьте всё и получите " + diamondsGain.toExponential(2).replace("+","") + " алмазов." } 
//         else {doPrestige.innerHTML =  "<ut>Became prestige</ut> <br> Reset everything for " + diamondsGain.toExponential(2).replace("+","") + " diamonds."}
//         }
//     return diamondsGain, diamonds;
//     }
//     if (data==1) doPrestige.innerHTML = "Соберите 1е9 α-монет"
//     else doPrestige.innerHTML = "Gather 1e9 α-монет"
// }
// function doPrestigeReset () {
//     if (money>1e9) {
//         crystalCount.style.display = "block"
//         latestPrestigesTab.style.display = "block"
//         diamonds = diamonds + diamondsGain;
//         diamondsBoost = diamonds // and multipliers
//         totalDiamond = totalDiamond + diamonds
//         totalPrestiges++
//         if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toFixed(0) + " алмазов."} 
//         else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toFixed(0) + " diamonds."}
//         if (totalDiamond>1e6){
//         if (data==1) {totalDiamonds.innerHTML = "Всего вы собрали " + totalDiamond.toExponential(2).replace("+","") + " алмазов."} 
//         else {totalDiamonds.innerHTML = "Totally you collected " + totalDiamond.toExponential(2).replace("+","") + " diamonds."}
//     }
//         if (data==1) {totalResets.innerHTML = "Всего вы сделали " + totalPrestiges.toFixed(0) + " престиж сбросов."} 
//         else {totalResets.innerHTML = "Totally you did " + totalPrestiges.toFixed(0) + " prestige resets."}
//         addLatestPrestige()
//         if (bestPrestigeRun > fastPrestigeSecondsTimer) {
//             bestPrestigeRun = fastPrestigeSecondsTimer
//             fastPrestigeHours = 0, fastPrestigeMinutes = 0, fastPrestigeSeconds = 0
//             if (fastPrestigeSecondsTimer >= 60) {
//                 while (fastPrestigeSecondsTimer >= 60) {
//                     if (fastPrestigeSecondsTimer >= 60) {fastPrestigeSecondsTimer -= 60, fastPrestigeMinutes++; fastPrestigeSeconds = ("0" + fastPrestigeSeconds).slice(-2); fastPrestigeMinutes = ("0" + fastPrestigeMinutes).slice(-2)}
//                     if (fastPrestigeMinutes >= 60) {fastPrestigeMinutes -= 60, fastPrestigeHours++; fastPrestigeMinutes = ("0" + fastPrestigeMinutes).slice(-2)}
//                 } 
//             }
//             else fastPrestigeSeconds = fastPrestigeSecondsTimer
//         }
//         unlockPrestige.call();
//         prestigeReset.call()
//         stopPRInterval.call()
        
//     }
// }
// setInterval(canPrestige,50)

// document.addEventListener("keydown", function(event) {
//     if (event.key == "P" || event.key == "p" || event.key == "З" || event.key == "з") {
//       doPrestigeReset();
//     }
//   });

// //latest prestiges

// function addLatestPrestige() {
//         const diamondsGain1 = diamondsGain;
//         const diamondsGain2 = diamondsGain.toExponential(2).replace("+","");
//         if (diamondsGain < 1e6) whichDiamondsGain = diamondsGain1
//         if (diamondsGain >= 1e6) whichDiamondsGain = diamondsGain2
//         const pTime1 = "Время престижа: "
//         const pTime2 = "Prestige time: "
//         const yGot1 = ". Вы получили "
//         const yGot2 = ". You've got "
//         const dims1 = " алмазов."
//         const dims2 = " diamonds."
//         var whichPTime, whichYGot, whichDims;
//         if (data==1) {
//             whichPTime = pTime1;
//             whichYGot = yGot1;
//             whichDims = dims1
//         }
//         else {
//             whichPTime = pTime2;
//             whichYGot = yGot2;
//             whichDims = dims2;
//         }
//         lastPrestige = whichPTime + prestigeHours + ":" + prestigeMinutes + ":" + prestigeSeconds + whichYGot + whichDiamondsGain + whichDims;
//         tenthPrestigeRun.innerHTML = ninthPrestigeRun.innerHTML
//         tenthBank = ninthBank
//         ninthPrestigeRun.innerHTML = eighthPrestigeRun.innerHTML
//         ninthBank = eighthBank
//         eighthPrestigeRun.innerHTML = seventhPrestigeRun.innerHTML
//         eighthBank = seventhBank
//         seventhPrestigeRun.innerHTML = sixthPrestigeRun.innerHTML
//         seventhBank = sixthBank
//         sixthPrestigeRun.innerHTML = fifthPrestigeRun.innerHTML
//         sixthBank = fifthBank
//         fifthPrestigeRun.innerHTML = fourthPrestigeRun.innerHTML
//         fifthBank = fourthBank
//         fourthPrestigeRun.innerHTML = thirdPrestigeRun.innerHTML
//         fourthBank = thirdBank
//         thirdPrestigeRun.innerHTML = secondPrestigeRun.innerHTML
//         thirdBank = secondBank
//         secondPrestigeRun.innerHTML = firstPrestigeRun.innerHTML
//         secondBank = firstBank
//         firstPrestigeRun.innerHTML = lastPrestige
//         firstBank = lastPrestige
// }



