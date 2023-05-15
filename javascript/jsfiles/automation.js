var autoBuy46Interval
var autoBuy13Interval
var autoCoinInterval
const check46 = document.getElementById('auto-buy1-checkbox')
const check13 = document.getElementById('auto-buy2-checkbox')
const checkCoin = document.getElementById('auto-buy3-checkbox')

document.getElementById('auto-buy1-checkbox').addEventListener('change', function() {
    if (this.checked) { // флажок отмечен
      autoBuy46Interval = setInterval(autoBuy46, 100); // запускаем функцию autoBuy46() каждую секунду
    } else { // флажок снят
      clearInterval(autoBuy46Interval); // останавливаем запуск функции autoBuy46()
    }
    return autoBuy46Interval;
  });

  function autoBuy46() {
    singleUpgrade1.call()
    singleUpgrade2.call()
    singleUpgrade3.call()
    // логика автопокупки 4-6 улучшений
  }

  const timePerFrame = 50; // время между кадрами
  let previousTimestamp = Date.now();
  let delta = 0;

document.getElementById('auto-buy2-checkbox').addEventListener('change', function() {
  if (this.checked) { // флажок отмечен
    
    autoBuy13Interval = setInterval(() => {
      const now = Date.now();
      delta += now - previousTimestamp;
      previousTimestamp = now;

      while (delta >= timePerFrame) {
        delta -= timePerFrame;
        
        autoBuy13(); // выполняем функцию автопокупки
      }
    }, 0); // 0 мс означает, что функция будет запускаться как можно чаще

  } else { // флажок снят
    clearInterval(autoBuy13Interval); // останавливаем запуск функции autoBuy46()
  }
});

  function autoBuy13() {
    maxBuyAll()
    // логика автопокупки 4-6 улучшений
  }

  document.getElementById('auto-buy3-checkbox').addEventListener('change', function() {
    if (this.checked) { // флажок отмечен
      autoCoinInterval = setInterval(autoCoin, 33); // запускаем функцию autoBuy46() каждую секунду
    } else { // флажок снят
      clearInterval(autoCoinInterval); // останавливаем запуск функции autoBuy46()
    }
    return autoCoinInterval;
  });

  function autoCoin() {
    if (third.boost == 0)
    {third.boost = 1}
    gain = 1*(first.b*second.boost*third.boost*fourth.x*fifth.x)+1;
    gain = Math.pow(gain, pbfirst.boost)
    if (diamonds >= 1) {gain*=(diamonds*pbsecond.boost+1)}
    if (gain >= 1e19) {
      var softGain1 = gain/1e19
      gain = 1e19*Math.pow(softGain1, 0.6)
  }
  if (gain >= 1e35) {
      var softGain2 = gain/1e35
      gain = 1e35*Math.pow(softGain2, 0.9)
  }
    gain = gain/33
    money = money+gain;
    total = total+gain;
    if (money<=1e6){
    if (data==1) {coinsCount.innerHTML = money.toFixed(0) + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получаете в секунду " + (gain*33).toFixed(0)+ " α-монет"}
    else {coinsCount.innerHTML = money.toFixed(0) + " α-coins"; document.getElementById('coinsGain').innerHTML = "You earning " + (gain*33).toFixed(0) + " α-coins per second";}}
    if (total<=1e6){
    if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toFixed(0) + " α-монет."} 
    else {totalCoins.innerHTML = "Total you collected " + total.toFixed(0) + " α-coins."}
    }
    if (money>1e6){
    if (data==1) {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-монет"; document.getElementById('coinsGain').innerHTML = "Вы получаете в секунду " + (gain*33).toExponential(2).replace("+","")+ " α-монет"}
    else {coinsCount.innerHTML = money.toExponential(2).replace("+","") + " α-coins"; document.getElementById('coinsGain').innerHTML = "You earning " + (gain*33).toExponential(2).replace("+","") + " α-coins per second";}}
    if (total>1e6){
    if (data==1) {totalCoins.innerHTML = "Всего вы собрали " + total.toExponential(2).replace("+","") + " α-монет."} 
    else {totalCoins.innerHTML = "Total you collected " + total.toExponential(2).replace("+","") + " α-coins."}
    }
    //money.toExponential(2).replace("+","")
    if (money>1e9) {unlockedPrestige = 1}
    if (unlockedPrestige == 1) {unlockPrestige.call()}
    if (money>endGoal && (completion == 0)) {endGameScreen.call(); completion = 1}
    if (onecheck==0) {
    if (money<endGoal && (completion == 1)) {completion = 0; onecheck = 1}
    }
    return gain, money;
}