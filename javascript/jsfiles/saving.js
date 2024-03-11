let version
function singleUpgradePurchasedRemove () {
    var singleArray = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (var i = 0; i < singleArray.length; i++){
        singleArray[i].updateText.classList.remove('purchased')
    }
}

function achievementGottenRemove () {
    for (var i = 0; i < 10; i++){
        var element = document.getElementsByClassName("ach")[i]
        element.classList.remove("green");
        element.classList.remove("greenborder");
    }
}

function autoSaveGame(){
    autoSaving == 'yes' ? autoSaving = 'no' : autoSaving = 'yes'
}

let datasave
var gainPerSecondSave

function saveGame () { 
    gainPerSecondSave = gainPerSecond * 20
    whatsYourCurrentTime()
    savingTheGame(); //образуем переменную с кучей других переменных
    autoSaverTimer = 0
    notify(saveNotify);
    let stringifiedData = JSON.stringify(datasave); //превратим в строчку
    while ((achRow1.completion).length < 20) {
        (achRow1.completion).push(false);
    }
    localStorage.setItem('completion', JSON.stringify(achRow1.completion))
    while (loreBoolean.length < 9) {
        loreBoolean.push(false);
    }
    localStorage.setItem('chapters', JSON.stringify(loreBoolean))
    // сохранить в LocalStorage по ключу коунтдата
    localStorage.setItem('datasaving', stringifiedData);
    if (isNaN(money)) openWindow('gotNaNed', false)
    
}
var loadNotify
var saveNotify
var exportNotify
var importNotify
var hardNotify

function loadGame() {
        achievementGottenRemove ()
        singleUpgradePurchasedRemove ()
        loadingTheGame();
        areYouInChallenge()
        checkCompletedChallenges()
        singleUpgradePurchased ()
        const achCompletions = localStorage.getItem('completion')
        const loreChapters = localStorage.getItem('chapters')
        if (achCompletions != null){
            achRow1.completion = JSON.parse(achCompletions).map(Boolean);
        }
        if (loreChapters != null){
            loreBoolean = JSON.parse(loreChapters).map(Boolean);
            for (let i = 0; i < loreBoolean.length; i++){
                checkLoreShorter(loreBoolean, i)
            }

        }
        checkShopSingle (firstShopSingle.amount, 'overdriveSelect')
        achCompletionsChecker()
        getCoinPerSec()
        whatsYourCurrentTime2()
        offlineGain()
        offlineGainTime()
        loadAutomations()
        changeInputValue()
        version = ["0.9", "0.10", "0.10.1", "0.11"]
        convertingTime(gameSeconds, gameMinutes, gameHours, gameDays, 'game')
        changeFonts2(optionValue)
        autoSaverTimer = 0
        clearInterval(autoSaveTime)
        if (isNaN(money)) {
            money = 10;
        }
        if (isNaN(total)) {
            total = 10;
        }
        gainPerSecondSave = gainPerSecond * 20
        notify(loadNotify);
}

var autoSaverTimer = 0
var autoSaveTime

function autoSaveThis () {
    if (autoSaving == 'yes' && !(isNaN(money) || isNaN(crystals) || isNaN(shards) || isNaN(total)))
        {
            saveGame()
        }
        if (isNaN(money) || isNaN(crystals) || isNaN(shards) || isNaN(total)) 
        openWindow('gotNaNed', false)
    }

function doHardReset () {
            autoSaving = 'yes';
            maxOrNoVar = false
            achievementBonus = 1
            achBonus = document.getElementById('achBonus')
            upgradeReset();
            whatsYourCurrentTime()
            clearInterval(autoSaveTime)
            saveGame();
            var hardNotifyColor
            hardNotifyColor = "red";
            notify(hardNotify, hardNotifyColor);
            singleUpgradePurchasedRemove()
            achievementGottenRemove()
            localStorage.clear()
            location.reload()
}

function exportSave() {
    gainPerSecondSave = gainPerSecond * 20;
    whatsYourCurrentTime();
    savingTheGame(); 
    notify(exportNotify);
    let exportedData = JSON.stringify(datasave); //превратим в строчку
    let exportedData2 = JSON.stringify(achRow1.completion)
    let exportedData3 = JSON.stringify(loreBoolean)
    let base641 = btoa(exportedData); // кодируем строку в base64
    let base642 = btoa(exportedData2); // кодируем строку в base64
    let base643 = btoa(exportedData3); // кодируем строку в base64
    var base64 = `${base641}|${base642}|${base643}`
    navigator.clipboard.writeText(base64)
    
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let filename = 'Digital-God-Save-' + date + '.txt';

  // создание и запись содержимого в новый файл
    let file = new Blob([base64], {type: 'text/plain'});
    let a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(file);
    a.click();
}

function importSave() {
    const base64 = prompt("Insert save in base64 format");
    importing(base64);
}

function importing(base64) {
    const [base64DataSave, base64Completion, base64Chapters] = base64.split("|");
    const importedData1 = atob(base64DataSave);
    const importedData2 = atob(base64Completion);
    if (base64Chapters != null){
        var importedData3 = atob(base64Chapters)
            localStorage.setItem('chapters', importedData3);
            loreBoolean = JSON.parse(localStorage.getItem('chapters')).map(Boolean);
    }
    localStorage.setItem('datasaving', importedData1);
    localStorage.setItem('completion', importedData2);
    achRow1.completion = JSON.parse(localStorage.getItem('completion')).map(Boolean);

    achievementGottenRemove ()
    singleUpgradePurchasedRemove ()
    loadingTheGame()
    areYouInChallenge()
    checkCompletedChallenges()
    for (let i = 0; i < loreBoolean.length; i++){
        checkLoreShorter(loreBoolean, i)
    }
    singleUpgradePurchased ()
    checkShopSingle (firstShopSingle.amount, 'overdriveSelect')
    achCompletionsChecker()
    getCoinPerSec()
    whatsYourCurrentTime2()
    offlineGain()
    offlineGainTime()
    loadAutomations()
    changeInputValue()
    convertingTime(gameSeconds, gameMinutes, gameHours, gameDays, 'game')
    changeFonts2(optionValue)
    autoSaverTimer = 0
    clearInterval(autoSaveTime)
    notify(importNotify);
    version = ["0.9", "0.10", "0.10.1", "0.11"]
    location.reload()
}


var fileUpload = document.getElementById('file-upload');
var fileName = document.querySelector('.file-name');

fileUpload.addEventListener('change', function(base64) {
    var file = base64.target.files[0];

    fileName.textContent = file.name;

    var reader = new FileReader();

    reader.onload = function(base64) {
    importing(base64.target.result)
    };

    reader.readAsText(file);
    fileUpload.value = null;
});
var currentLanguage = 'en'

function savingTheGame() {
    datasave = {
        select_selectedIndex: select.selectedIndex,
        gainPerSecondSave,
        lastOnlineTime: lastOnlineTime-0,
        money,
        total,
        superCoins,
        totalSuperCoins,
        spentSuperCoins,
        crystals,
        totalCrystals,
        prestigeCount,
        autoSaving,
        maxOrNoVar,
        gainPerSecond,
        gainPerClick,
        clickCount,
        gameTimer,
        prestigeTimer,
        fastestPrestigeTimer,
        amountsOfUpgrades,
        gameSeconds,
        gameMinutes,
        gameHours,
        gameDays,
        realSeconds,
        realMinutes,
        realHours,
        realDays,
        prestigeSeconds,
        prestigeMinutes,
        prestigeHours,
        prestigeDays,
        fastestPrestigeSeconds,
        fastestPrestigeMinutes,
        fastestPrestigeHours,
        fastestPrestigeDays,
        dailyTimer,
        dailySeconds,
        dailyMinutes,
        dailyHours,
        currentLanguage,
        optionValue,
        code1Check,
        code2Check,
        umultiplier,
        umultipliercount,
        upower,
        upowercount,
        achFullRow1,
        achFullRow2, 
        amountOfPrestigeUpgrades,
        fastestNoMaxBuyPrestiges,
        prestigeConditionCoins: parseFloat(prestigeConditionCoins),
        prestigeConditionTime: parseFloat(prestigeConditionTime),
        whichPrestigeMode,
        umultiplierTimer,
        upowerTimer,
        autoUmultiInput_value: autoUmultiInput.value,
        autoUpowerInput_value: autoUpowerInput.value,
        autoUpowerInput2_value: autoUpowerInput2.value,
        shards,
        shardsPerSecond,
        brokenCrystals,
        mutedAudio,
        isMuted,
        spirits,
        challengeStartedID,
        virusCoins,
    };
    
    const buyablesAndSingles = [
        'firstBuyable', 'secondBuyable', 'thirdBuyable', 'fourthBuyable', 'fifthBuyable',
        'firstSingle', 'secondSingle', 'thirdSingle', 'fourthSingle', 'fifthSingle',
        'sixthSingle', 'seventhSingle', 'eighthSingle', 'ninthSingle', 'tenthSingle',
        'firstShopBuyable', 'secondShopBuyable', 'thirdShopBuyable', 'fourthShopBuyable', 'fifthShopBuyable', 'sixthShopBuyable', 'seventhShopBuyable',
        'firstShopSingle',
        'firstPrestigeSingle', 'secondPrestigeSingle', 'thirdPrestigeSingle', 'fourthPrestigeSingle',
        'fifthPrestigeSingle', 'sixthPrestigeSingle', 'seventhPrestigeSingle', 'eighthPrestigeSingle',
        'ninthPrestigeSingle', 'tenthPrestigeSingle', 'eleventhPrestigeSingle', 'twelfthPrestigeSingle',
        'thirteenthPrestigeSingle', 'fourteenthPrestigeSingle', 'fifteenthPrestigeSingle', 'sixteenthPrestigeSingle',
        'firstPrestigeBuyable', 'secondPrestigeBuyable',
        'firstShardBuyable', 'secondShardBuyable', 'thirdShardBuyable',
        'firstShardSingle', 'secondShardSingle', 'thirdShardSingle', 'fourthShardSingle', 'fifthShardSingle', 'sixthShardSingle',
        'firstShopItem', 'secondShopItem', 'thirdShopItem', 'fourthShopItem'
    ];

    const intervals = [
        'singleInterval', 'buyableInterval', 'umultiplierInterval', 'upowerInterval', 'prestigeInterval'
    ]

    const checkmarks = [
        'autoSingleUpgradeCheckbox', 'autoBuyableUpgradeCheckbox', 'autoUmultiplierCheckbox', 'autoUpowerCheckbox', 'autoPrestigeCheckbox'
    ]

    const shardBars = ['shardUnlockablePerSecond', 'shardUnlockableClick', 'shardUnlockableBuyables', 'shardUnlockableSingles']

    for (const i of shardBars) {
        datasave[`${i}_percent`] = window[i].percent
        datasave[`${i}_consumedShards`] = window[i].consumedShards
    }


    for (const i of checkmarks) {
        datasave[`${i}_checked`] = document.getElementById(i).checked
    }

    datasave.restartChallenge_checked = restartChallenge.checked

    for (const i of intervals) {
        datasave[`${i}_time`] = window[i].time;
        datasave[`${i}_price`] = window[i].price;
        if (window[i].hasOwnProperty('effect')) {
            datasave[`${i}_effect`] = window[i].effect;
        }
    }
    
    for (const item of buyablesAndSingles) {
        datasave[`${item}_amount`] = window[item].amount;
        if (window[item].hasOwnProperty('baseEffect') && !(item.includes('ShardSingle'))) {
            datasave[`${item}_baseEffect`] = window[item].baseEffect;
        }
        if (window[item].hasOwnProperty('price') && !(item.includes('ShardSingle')) && !(item.includes('Item'))) {
            datasave[`${item}_price`] = window[item].price;
        }
        if (window[item].hasOwnProperty('used')) {
            datasave[`${item}_used`] = window[item].used;
        }
    }
    
    datasave.overdriveType1_percent = overdriveType1.percent;
    datasave.overdriveType1_effect = overdriveType1.effect;
    datasave.overdriveType1_price = overdriveType1.price;
    datasave.overdriveType1_consumed = overdriveType1.consumed;

    datasave.challengesCompleted = challengesCompleted;

    datasave.versions = JSON.stringify(version)

    datasave.challengeCompleted = JSON.stringify(challengeCompleted)

    datasave.progressBarGoals = JSON.stringify(progressBarGoals)

    datasave.codeChecks = JSON.stringify(codeChecks)

    datasave.shopBulkBuy_value = shopBulkBuyInput.value

    const tripleEventCoins = ['pinkCoin', 'greenCoin', 'blueCoin', 'greyCoin']

    for (const i of tripleEventCoins) {
        if (i !== 'greyCoin') {
            datasave[`${i}_currency`] = window[i].currency
            datasave[`${i}_amount`] = window[i].amount
            datasave[`${i}_totalAmount`] = window[i].totalAmount
            datasave[`${i}_price`] = window[i].price
            datasave[`${i}_boost`] = window[i].boost
        }
        else {
            datasave[`${i}_effect`] = window[i].effect
            datasave[`${i}_price`] = window[i].price
        }
    }

    return datasave;
}

function loadingTheGame() {
    let storedData = localStorage.getItem('datasaving'); //спарсим его обратно объект
    let parsedData = JSON.parse(storedData);

    if (parsedData != null) {
    gainPerSecondSave = parseFloat(parsedData.gainPerSecondSave)
    lastOnlineTime = parseFloat(parsedData.lastOnlineTime)
    gainPerSecond = parseFloat(parsedData.gainPerSecond)
    money = parseFloat(parsedData.money);
    autoSaving = parsedData.autoSaving;
    total = parseFloat(parsedData.total);
    gainPerSecond = parseFloat(parsedData.gainPerSecond);
    gainPerClick = parseFloat(parsedData.gainPerClick);
    currentLanguage = parsedData.currentLanguage;
    maxOrNoVar = parsedData.maxOrNoVar;
    amountsOfUpgrades = parseFloat(parsedData.amountsOfUpgrades);
    clickCount = parseFloat(parsedData.clickCount);
    gameTimer = parseFloat(parsedData.gameTimer);
    gameSeconds = parseFloat(parsedData.gameSeconds);
    gameMinutes = parseFloat(parsedData.gameMinutes);
    gameHours = parseFloat(parsedData.gameHours);

    const buyableCount = ["first","second","third","fourth","fifth"];
    for (let i of buyableCount) {
    window[i+"Buyable"].amount = parseFloat(parsedData[i+"Buyable_amount"]);
    window[i+"Buyable"].baseEffect = parseFloat(parsedData[i+"Buyable_baseEffect"]);
    window[i+"Buyable"].price = parseFloat(parsedData[i+"Buyable_price"]);
    }

    const singleCount = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"];
    for (let i of singleCount) {
    window[i+"Single"].amount = parseFloat(parsedData[i+"Single_amount"]);
    window[i+"Single"].baseEffect = parseFloat(parsedData[i+"Single_baseEffect"]);
    }

    umultiplier = parseFloat(parsedData.umultiplier);
    umultipliercount = parseFloat(parsedData.umultipliercount);
    upower = parseFloat(parsedData.upower);
    upowercount = parseFloat(parsedData.upowercount);

    parsedData.versions == undefined ? version = ["0.9", "0.10", "0.10.1"] : version = JSON.parse(parsedData.versions)

    if (version[0] == "0.9") {
        const shopBuyableCount = ["first","second","third","fourth"];
        for (let i of shopBuyableCount) {
        window[i+"ShopBuyable"].amount = parseFloat(parsedData[i+"ShopBuyable_amount"]);
        window[i+"ShopBuyable"].price = parseFloat(parsedData[i+"ShopBuyable_price"]);
        }
        const shopSingleCount = ["first"];
        for (let i of shopSingleCount) {
        window[i+"ShopSingle"].amount = parseFloat(parsedData[i+"ShopSingle_amount"]);
        window[i+"ShopSingle"].price = parseFloat(parsedData[i+"ShopSingle_price"]);
        }
        overdriveType1.percent = parseFloat(parsedData.overdriveType1_percent);
        overdriveType1.effect = parseFloat(parsedData.overdriveType1_effect);
        overdriveType1.price = parseFloat(parsedData.overdriveType1_price);
        
        gameDays = parseFloat(parsedData.gameDays);
        dailyTimer = parseFloat(parsedData.dailyTimer);
        dailySeconds = parseFloat(parsedData.dailySeconds);
        dailyMinutes = parseFloat(parsedData.dailyMinutes);
        dailyHours = parseFloat(parsedData.dailyHours);
        code1Check = parsedData.code1Check
        select.selectedIndex = parseFloat(parsedData.select_selectedIndex)
        superCoins = parseFloat(parsedData.superCoins)
        totalSuperCoins = parseFloat(parsedData.totalSuperCoins)
        spentSuperCoins = parseFloat(parsedData.spentSuperCoins)
        optionValue = parsedData.optionValue;
    }

    const prestigeSingleCount = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth"];
    const prestigeBuyableCount = ["first","second", "third"];
    const shardBars = ['shardUnlockablePerSecond', 'shardUnlockableClick', 'shardUnlockableBuyables', 'shardUnlockableSingles']

    if (version[1] === "0.10") {
        prestigeCount = parseFloat(parsedData.prestigeCount);
        crystals = parseFloat(parsedData.crystals);
        totalCrystals = parseFloat(parsedData.totalCrystals);

        prestigeSeconds = parseFloat(parsedData.prestigeSeconds);
        prestigeMinutes = parseFloat(parsedData.prestigeMinutes);
        prestigeHours = parseFloat(parsedData.prestigeHours);
        prestigeDays = parseFloat(parsedData.prestigeDays);

        fastestPrestigeSeconds = parseFloat(parsedData.fastestPrestigeSeconds);
        fastestPrestigeMinutes = parseFloat(parsedData.fastestPrestigeMinutes);
        fastestPrestigeHours = parseFloat(parsedData.fastestPrestigeHours);
        fastestPrestigeDays = parseFloat(parsedData.fastestPrestigeDays);

        prestigeTimer = parseFloat(parsedData.prestigeTimer);
        fastestPrestigeTimer = parseFloat(parsedData.fastestPrestigeTimer);
        fastestNoMaxBuyPrestiges = parseFloat(parsedData.fastestNoMaxBuyPrestiges);

        achFullRow1 = parseFloat(parsedData.achFullRow1)
        achFullRow2 = parseFloat(parsedData.achFullRow2)

        prestigeConditionCoins = parseFloat(parsedData.prestigeConditionCoins)
        prestigeConditionTime = parseFloat(parsedData.prestigeConditionTime)
        whichPrestigeMode = parsedData.whichPrestigeMode

        umultiplierTimer = parseFloat(parsedData.umultiplierTimer);
        upowerTimer = parseFloat(parsedData.upowerTimer);

        amountOfPrestigeUpgrades = parseFloat(parsedData.amountOfPrestigeUpgrades)
        autoUmultiInput.value = parseFloat(parsedData.autoUmultiInput_value)
        autoUpowerInput.value = parseFloat(parsedData.autoUpowerInput_value)
        autoUpowerInput2.value = parseFloat(parsedData.autoUpowerInput2_value)

        shards = parseFloat(parsedData.shards)
        shardsPerSecond = parseFloat(parsedData.shardsPerSecond)
        brokenCrystals = parseFloat(parsedData.brokenCrystals)

        mutedAudio = parsedData.mutedAudio
        isMuted = parsedData.isMuted

        if (parsedData.spirits != null) spirits = parseFloat(parsedData.spirits)

        code2Check = parsedData.code2Check

        for (let i = 0; i < 2; i++) {
        window[prestigeBuyableCount[i]+"PrestigeBuyable"].amount = parseFloat(parsedData[prestigeBuyableCount[i]+"PrestigeBuyable_amount"]);
        window[prestigeBuyableCount[i]+"PrestigeBuyable"].price = parseFloat(parsedData[prestigeBuyableCount[i]+"PrestigeBuyable_price"]);
        }

        for (let i of prestigeSingleCount) {
        window[i+"PrestigeSingle"].amount = parseFloat(parsedData[i+"PrestigeSingle_amount"]);
        }

        for (let i of prestigeBuyableCount) {
            window[i+"ShardBuyable"].amount = parseFloat(parsedData[i+"ShardBuyable_amount"]);
            window[i+"ShardBuyable"].price = parseFloat(parsedData[i+"ShardBuyable_price"]);
        }

        for (let i = 0; i < 6; i++) {
            window[prestigeSingleCount[i]+"ShardSingle"].amount = parseFloat(parsedData[prestigeSingleCount[i]+"ShardSingle_amount"]);
        }

        const intervalsCount = [
            'singleInterval', 'buyableInterval', 'umultiplierInterval', 'upowerInterval', 'prestigeInterval'
        ]

        for (let i of intervalsCount) {
            window[i].price = parseFloat(parsedData[i+"_price"]);
            window[i].time = parseFloat(parsedData[i+"_time"]);
            }

        buyableInterval.effect = parseFloat(parsedData.buyableInterval_effect);

        const checkmarks = [
            'autoSingleUpgradeCheckbox', 'autoBuyableUpgradeCheckbox', 'autoUmultiplierCheckbox', 'autoUpowerCheckbox', 'autoPrestigeCheckbox'
            ]
        
        for (let i of checkmarks) {
            document.getElementById(i).checked = parsedData[`${i}_checked`]
        }

        for (const i of shardBars) {
            window[i].percent = parseFloat(parsedData[i+"_percent"])
            window[i].consumedShards =  parseFloat(parsedData[i+"_consumedShards"])
        }

    }
    if (version[2] == "0.10.1") {
        overdriveType1.consumed = parseFloat(parsedData.overdriveType1_consumed);
    }
    if (version[3] == "0.11") {
        challengeStartedID = parseFloat(parsedData.challengeStartedID)
        parsedData.challengeCompleted == undefined ? challengeCompleted = [false, false, false, false, false, false, false, false, false, false, false, false] : challengeCompleted = JSON.parse(parsedData.challengeCompleted)
        parsedData.progressBarGoals == undefined ? progressBarGoals = [false, false, false] : progressBarGoals = JSON.parse(parsedData.progressBarGoals)
        parsedData.codeChecks == undefined ? codeChecks = [false, false, false, false, false] : codeChecks = JSON.parse(parsedData.codeChecks)
        
        challengesCompleted = parseFloat(parsedData.challengesCompleted)
        restartChallenge.checked = parsedData.restartChallenge_checked

        realDays = parseFloat(parsedData.realDays)
        realHours = parseFloat(parsedData.realHours)
        realMinutes = parseFloat(parsedData.realMinutes)
        realSeconds = parseFloat(parsedData.realSeconds)

        virusCoins = parseFloat(parsedData.virusCoins)

        const shopBuyableCount = ["fifth","sixth","seventh"];
        for (let i of shopBuyableCount) {
        window[i+"ShopBuyable"].amount = parseFloat(parsedData[i+"ShopBuyable_amount"]);
        window[i+"ShopBuyable"].price = parseFloat(parsedData[i+"ShopBuyable_price"]);
        }
        shopBulkBuyInput.value = parsedData.shopBulkBuy_value

        const shopItemCount = ["first","second","third","fourth"];
        for (let i of shopItemCount) {
            window[i+"ShopItem"].amount = parseFloat(parsedData[i+"ShopItem_amount"]);
            window[i+"ShopItem"].used = parseFloat(parsedData[i+"ShopItem_used"]);
            }

        const tripleEventCoins = ['pinkCoin', 'greenCoin', 'blueCoin', 'greyCoin']

        for (const i of tripleEventCoins) {
            if (i !== 'greyCoin') {
                window[i].currency = parseFloat(parsedData[`${i}_currency`])
                window[i].amount = parseFloat(parsedData[`${i}_amount`])
                window[i].totalAmount = parseFloat(parsedData[`${i}_totalAmount`])
                window[i].price = parseFloat(parsedData[`${i}_price`])
                window[i].boost = parseFloat(parsedData[`${i}_boost`])
            }
            else {
                window[i].effect = parseFloat(parsedData[`${i}_effect`])
                window[i].price = parseFloat(parsedData[`${i}_price`])
            }
        }
    }
}
}

function upgradeReset() {
    let arrayReset = [secondBuyable, firstBuyable, thirdBuyable, fourthBuyable, fifthBuyable]
    for (let i = 0; i < arrayReset.length; i++){
        arrayReset[i].amount = 0
        arrayReset[i].baseEffect = 0
    }
    firstBuyable.price = 10
    secondBuyable.price = 100
    thirdBuyable.price = 500
    fourthBuyable.price = 1000
    fifthBuyable.price = 5000
}

function singlesReset() {
    let arrayReset = [firstSingle, secondSingle, thirdSingle, fourthSingle, fifthSingle, sixthSingle, seventhSingle, eighthSingle, ninthSingle, tenthSingle]
    for (let i = 0; i < arrayReset.length; i++){
        arrayReset[i].amount = 0
        arrayReset[i].baseEffect = 0
    }
    firstSingle.price = 1e5
    secondSingle.price = 3e6
    thirdSingle.price = 5e6
    fourthSingle.price = 2.5e7
    fifthSingle.price = 6.5e8
    sixthSingle.price = 5e9
    seventhSingle.price = 5e10
    eighthSingle.price = 7e11
    ninthSingle.price = 2e12
    tenthSingle.price = 1e13
}

function loadAutomations() {
    for (let i = 0; i < autoSetIntervals.length; i++) {
        clearInterval(autoSetIntervals[i]);
        autoSetIntervals[i] = ''
    }
    if (singleCheckbox.checked) { 
        autoSetIntervals[0] = setInterval(autoBuySingle, singleInterval.time); 
    }
    if (buyableCheckbox.checked) { 
        autoSetIntervals[1] = setInterval(autoBuyBuyable, buyableInterval.time); 
    }
    if (umultiplierCheckbox.checked) {
        if (umultiplierInterval.time != 50) {
            autoSetIntervals[2] = setInterval(doUmulti, umultiplierInterval.time);
        } else {
            uMultiReautomate()
        }
    }
    if (upowerCheckbox.checked) {
        if (upowerInterval.time != 50) {
            autoSetIntervals[3] = setInterval(doUpower, upowerInterval.time);
        } else {
            uPowerReautomate()
        }
    }
    if (prestigeCheckbox.checked) {
        if ((!prestigeMilestonesEffects[13]) || prestigeInterval.time != 50) {
            autoSetIntervals[4] = setInterval(doPrestigeReset, prestigeInterval.time);
        } else {
            reautomate()
        }
    }
}