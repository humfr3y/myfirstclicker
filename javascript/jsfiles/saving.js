let save_number = 1
function autoSaveGame(){
    player.settings.auto_save == true ? player.settings.auto_save = false : player.settings.auto_save = true
}

function toggleOfflineGain() {
    player.settings.offline == true ? player.settings.offline = false : player.settings.offline = true
}

function saveGame () { 
    if (isNaN(player.coin.currency)) {
        openWindow('gotNaNed', false)
    } 
    else {
        MISC.auto_save_timer = 0
        notify(text.notification.save, 'limegreen');
        localStorage.setItem('SAVE_NUMBER', JSON.stringify(save_number))
        let stringifiedData = JSON.stringify(player); //превратим в строчку
        switch (save_number) {
            case 2:
                localStorage.setItem('player2', stringifiedData);
                break;
            case 3: 
                localStorage.setItem('player3', stringifiedData);
                break;
            default:
                localStorage.setItem('player', stringifiedData);
                break;
        }
    }
}

function updateNestedProperties(targetObj, sourceObj) {
for (const key in sourceObj) {
    if (sourceObj.hasOwnProperty(key)) {
    if (typeof sourceObj[key] === 'object' && sourceObj[key] !== null && !Array.isArray(sourceObj[key])) {
        if (!targetObj[key]) {
        targetObj[key] = {};
        }
        updateNestedProperties(targetObj[key], sourceObj[key]);
    } else {
        targetObj[key] = sourceObj[key];
    }
    }
}
}

function chooseSave(number) {
    save_number = number
    localStorage.setItem('SAVE_NUMBER', JSON.stringify(save_number))
    location.reload()
}

function loadGame() {
        let storedData = '' 
        save_number = JSON.parse(localStorage.getItem('SAVE_NUMBER'))
        switch (save_number) {
            case 2:
                storedData = localStorage.getItem('player2'); 
                break;
            case 3:
                storedData = localStorage.getItem('player3'); 
                break;
            default:
                storedData = localStorage.getItem('player'); 
                break;
        }
        let parsedData = ''
        if (localStorage.getItem('datasaving') != null && storedData == null) {
            convert_save()
            updateNestedProperties(player, newData);
        } 
        else {
            parsedData = JSON.parse(storedData);
            updateNestedProperties(player, parsedData)
        }
        GAIN.offline_gain()
        if (isNaN(player.coin.currency)) {
            player.coin.currency = 10
        }
        if (isNaN(player.coin.total_currency)) {
            player.coin.total_currency = 10
        }
        if (isNaN(player.prestige.currency)) {
            player.prestige.total_currency = 0
            player.prestige.currency = 0
        }
        if (isNaN(player.shard.currency)) {
            player.shard.currency = 0
        }
        setTimeout(()=>{
            notify(text.notification.load, 'limegreen')        
            showChangelog(text.changelog.start)
            showStory(text.chapter.start)
            showHelpPage(text.help.start, text.empty)
        }, 3000);
        resetDailyReward()
        if (!player.got_daily_reward) setTimeout(()=>{notify(text.notification.dailyRewardRestart, 'mediumspringgreen')}, 5000)
        if (player.coin.total_currency == 10) {
            let userLang = navigator.language || navigator.userLanguage
            if (userLang == 'ru' || userLang == 'ru-RU') {
                player.settings.currentLanguage = 'ru'
            }
            else player.settings.currentLanguage = 'en'
            openWindow('welcome', false)
            player.time.savedTime = Date.now()
        }
        if (player.settings.offline == true) {
            player.offline_gain.time = MISC.offline()
            player.offline_gain.coin = GAIN.coin.offline()
            player.offline_gain.supercoin = GAIN.supercoin.offline()
            player.offline_gain.crystal  = ACHS.has(22) ? GAIN.crystal.offline() : 0,
            player.offline_gain.prestige = MILESTONES.has(16) ? GAIN.prestige.offline() : 0
            player.offline_gain.shard = UNL.shard.second.unl() ? GAIN.shard.offline() : 0
        }
        else {
            player.offline_gain.time = 0
            player.offline_gain.coin = 0
            player.offline_gain.supercoin = 0
            player.offline_gain.crystal = 0
            player.offline_gain.prestige = 0
            player.offline_gain.shard = 0
        }

        player.offline_gain.daily = GAIN.supercoin.daily.reward()
        player.code.name = ['digitalgod', 'shirakamifubuki', 'suisei', 'koyori', 'manilovefauna', 'revolution', 'supercoin', 'superprestige', 'sorry'],

        changeFonts2(player.settings.font)
        changeFont.value = player.settings.font
        
        changeNotation.value = player.settings.notation

        shopBulkBuyInput.value = player.settings.shop_bulkbuy

        mySlider.value = player.settings.autosave_interval

        autoUmultiInput.value = player.automation.conditions.umultiplier
        autoUpowerInput.value = player.automation.conditions.upower.time
        autoUpowerInput2.value = player.automation.conditions.upower.x_of_umulti

        autoUadderInput.value = player.automation.conditions.uadder.time
        autoUadderInput2.value = player.automation.conditions.uadder.x_of_upower

        mineralsBulkInput.value = player.settings.minerals_bulkbuy

        if (player.settings.whichPrestigeMode == 'time') autoPrestigeInput.value = player.automation.conditions.prestige.time
        else if (player.settings.whichPrestigeMode == 'prestige') autoPrestigeInput.value = player.automation.conditions.prestige.prestige
        else if (player.settings.whichPrestigeMode == 'crystal') autoPrestigeInput.value = player.automation.conditions.prestige.crystals
        else autoPrestigeInput.value = player.automation.conditions.prestige.coins

        if (player.automation.checkbox.single == true) {
            autoSingleUpgradeCheckbox.checked = true
            MISC.automation.single.interval = setInterval(()=>{AUTO.single.charge()}, 50)
        }
        if (player.automation.checkbox.buyable == true) {
            autoBuyableUpgradeCheckbox.checked = true
            MISC.automation.buyable.interval = setInterval(()=>{AUTO.buyable.charge()}, 50)
        }
        if (player.automation.checkbox.umultiplier == true) {
            autoUmultiplierCheckbox.checked = true
            MISC.automation.umultiplier.interval = setInterval(()=>{AUTO.umultiplier.charge()}, 50)
        }
        if (player.automation.checkbox.upower == true) {
            autoUpowerCheckbox.checked = true
            MISC.automation.upower.interval = setInterval(()=>{AUTO.upower.charge()}, 50)
        }
        if (player.automation.checkbox.prestige == true) {
            autoPrestigeCheckbox.checked = true
            MISC.automation.prestige.interval = setInterval(()=>{AUTO.prestige.charge()}, 50)
        }
        if (player.automation.checkbox.uadder == true) {
            autoUadderCheckbox.checked = true
            MISC.automation.uadder.interval = setInterval(()=>{AUTO.uadder.charge()}, 50)
        }
        player.settings.modernization_activated = false
        player.shard.currency < 0 ? player.shard.currency = 0 : player.shard.currency
        if (player.supercoin.total_currency > 1e7) {
player.supercoin.total_currency = player.supercoin.spent_currency + player.supercoin.currency
}
}

function resetDailyReward() {
    const currentDate2 = new Date();
    const millisecondsCurrentDay = currentDate2.getTime();
    if (millisecondsCurrentDay > player.time.next_daily) { //86390 > 86400 - false ||||| 87000 > 86400 -> 87000 > 172800
        const currentDate = new Date();
        nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(0, 0, 0, 0);
        player.time.next_daily = nextDay.getTime();
        player.got_daily_reward = false;
    }
}

function autoSaveThis() {
    if (player.settings.auto_save == true && !(isNaN(player.coin.currency) || isNaN(player.prestige.currency) || isNaN(player.shard.currency) || isNaN(player.coin.total_currency)))
        {
            if (isNaN(player.coin.currency)) {
                openWindow('gotNaNed', false)
            } 
            else {
                MISC.auto_save_timer = 0
                localStorage.setItem('SAVE_NUMBER', JSON.stringify(save_number))
                let stringifiedData = JSON.stringify(player); //превратим в строчку
                switch (save_number) {
                    case 2:
                        localStorage.setItem('player2', stringifiedData);
                        break;
                    case 3: 
                        localStorage.setItem('player3', stringifiedData);
                        break;
                    default:
                        localStorage.setItem('player', stringifiedData);
                        break;
                }
            }
            MISC.auto_save_timer = 0
        }
        if (isNaN(player.coin.currency) || isNaN(player.prestige.currency) || isNaN(player.shard.currency) || isNaN(player.coin.total_currency)) 
        openWindow('gotNaNed', false)
    }

function doHardReset () {
            notify(text.notification.hard, "red");
            save_number = JSON.parse(localStorage.getItem('SAVE_NUMBER'))
            switch (save_number) {
                case 2:
                    localStorage.removeItem('player2');
                    break;
                case 3:
                    localStorage.removeItem('player3');
                    break;
                default:
                    localStorage.removeItem('player');
                    break;
            }
            location.reload() //сделать чтобы страница НЕ загружала через лоад
}

function exportSave() {
    notify(text.notification.export, 'limegreen');
    let exportedData = JSON.stringify(player); //превратим в строчку
    let base64 = btoa(exportedData); // кодируем строку в base64
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
    if (base64.includes('|')) {
        const [base64DataSave, base64Completion, base64Chapters] = base64.split("|");
        const importedData1 = atob(base64DataSave);
        console.log(importedData1)
        localStorage.setItem('datasaving', importedData1);
            convert_save()
            updateNestedProperties(player, newData);
    }
    else {
        const importedData = atob(base64);
        const parsedData = JSON.parse(importedData)
        console.log(importedData)
        console.log(parsedData)
        updateNestedProperties(player, parsedData)
    }
    save_number = JSON.parse(localStorage.getItem('SAVE_NUMBER'))
    console.log(player)
    saveGame()
    notify(text.notification.import, 'limegreen');
    location.reload()
}

//import from file, should be like this!
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
let newData = {}
function convert_save() {
    if (localStorage.getItem('datasaving') != null) {
        console.log('CONVERTING SAVE!!!!!!!!!!!!!!!')
        let parsedData = JSON.parse(localStorage.getItem('datasaving')) //make parsedData as object
        newData = {
        clicks: {
            real: 0,
            simulated: 0,
            critical: 0,
            prestige: 0
        },
        achievements: [],
        achievement_rows: [],
        shard_achievements: [],
        progressBarGoals: [0],
        umultipliers: 0,
        upowers: 0,
        uadders: 0,
        ureducers: 0,
        coin: {
            upgrades: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            },
            singleUpgrades: [],
            superUpgrades: [],
            currency: 10,
            total_currency: 10,
        },
        supercoin: {
            currency: 0,
            total_currency: 0,
            spent_currency: 0,
        },
        prestige: {
            upgrades: {
                1: 0,
                2: 0
            },
            singleUpgrades: [],
            super: {
                buyables: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                },
                singles: [],
            },
            milestones: [],
            currency: 0,
            total_currency: 0,
            broken_currency: 0,
            resets: 0,
            prestigeTable: {
                0: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                1: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                2: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                3: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                4: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                5: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                6: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                7: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                8: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
                9: {
                    crystals: '',
                    prestiges: '',
                    time: {
                        game: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        },
                        real: {
                            days: '',
                            hours: '',
                            minutes: '',
                            seconds: '', 
                            timer: ''
                        }
                    }
                },
            },
            table_resets: 1
        },
        shard: {
            upgrades: {
                1: 0,
                2: 0,
                3: 0
            },
            singleUpgrades: [],
            currency: 0,
            unlockables: [],
            consumed: {
                click: 0,
                second: 0,
                buyables: 0,
                singles: 0,
            },
            achievements: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0
            }
        },
        shop: {
            upgrades: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
            },
            permanentUpgrades: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
            },
            unlockables: [],
            items: {
                amount: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                },
                used: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                }
            }
        },
        supercrystal: {
            upgrades: [],
            currency: 0,
            total_currency: 0,
            consumedShards: 0,
        },
        rune: {
            currency: 0,
            total_currency: 0,
        },
        minerals: {
            1: 0,
            2: 0,
            3: 0
        },
        time: {
            savedTime: Date.now(), //lastOnlineTime
            currentTime: 0,
            game: {
                total: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 0, 
                },
                prestige: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 0, 
                },
                fastestPrestige: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 1e69, 
                },
                average: {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: '', 
                    timer: ''
                },
            },
            real: {
                total: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 0, 
                },
                prestige: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 0, 
                },
                fastestPrestige: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    days: 0,
                    timer: 1e69, 
                },
                daily: {
                    seconds: 0, 
                    minutes: 0, 
                    hours: 0,
                    timer: 0,
                },
                average: {
                    days: '',
                    hours: '',
                    minutes: '',
                    seconds: '', 
                    timer: ''
                },
            },
            next_daily: 0,
            umultiplier: 0,
            upower: 0,
            uadder: 0,
            ureducer: 0,
        },
        challenge: {
            completed: [],
            activated: 0,
            time: {
                1: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                2: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                3: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                4: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                5: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                6: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                7: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                8: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                9: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                10: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                11: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
                12: {
                    days: 999,
                    hours: 99,
                    minutes: 59,
                    seconds: 59, 
                    timer: 99999
                },
            }
        },
        tabs: {
            main: [],
            settings_sub: [],
            clicker_sub: [],
            info_sub: [],
            prestige_sub: [],
            multi_breakdown_sub: [],
        },
        settings: {
            currentLanguage: 'en',
            auto_save: true,
            mutedAudio: false,
            shop_bulkbuy: 1,
            minerals_bulkbuy: 1,
            font: 'option1',
            notation: 'option1',
            buy_max_activate: false,
            shard_buy_max_activate: false,
            superprestige_buy_max_activate: false,
            modernization_activated: false,
            loreBoolean: [],
            event: {
                spiritual: false,
                triplePower: false
            },
            whichPrestigeMode: 'time',
            autosave_interval: 30000,
            offline: true
        },
        automation: {
            checkbox: {
            single: false, 
            buyable: false, 
            umultiplier: false, 
            upower: false, 
            prestige: false
            },
            setIntervals: {
                single: '', 
                buyable: '', 
                umultiplier: '', 
                upower: '', 
                prestige: ''
            },
            upgrades: {
                single: 0, 
                buyable: 0, 
                umultiplier: 0, 
                upower: 0, 
                prestige: 0,
                uadder: 0,
            },
            conditions: {
                umultiplier: 0,
                upower: {
                    time: 0,
                    x_of_umulti: 0,
                },
                prestige: {
                    time: 3600,
                    coins: 1e15,
                    prestige: 10000,
                    crystals: 1e50,
                },
                uadder: {
                    time: 0,
                    x_of_upower: 0,
                }
            }
        },
        got_daily_reward: false,
        code: {
            activated: [],
            name: ['digitalgod', 'shirakamifubuki', 'suisei', 'koyori', 'manilovefauna', 'revolution', 'supercoin', 'superprestige', 'sorry'],
        },
        overdrive: {
            consumed: {
                type1: 0,
                type2: 0
            }
        },
        offline_gain: {
            time: 0,
            coin: 0,
            supercoin: 0,
            crystal: 0,
            prestige: 0,
            shard: 0
        },
}

        parsedData.firstBuyable_amount != undefined ? newData.coin.upgrades[1] = parsedData.firstBuyable_amount : 0
        parsedData.secondBuyable_amount != undefined ? newData.coin.upgrades[2] = parsedData.secondBuyable_amount : 0
        parsedData.thirdBuyable_amount != undefined ? newData.coin.upgrades[3] = parsedData.thirdBuyable_amount : 0
        parsedData.fourthBuyable_amount != undefined ? newData.coin.upgrades[4] = parsedData.fourthBuyable_amount : 0
        parsedData.fifthBuyable_amount != undefined ? newData.coin.upgrades[5] = parsedData.fifthBuyable_amount : 0

        parsedData.firstSingle_amount != undefined && parsedData.firstSingle_amount == 1 ? newData.coin.singleUpgrades.push(11) : ''
        parsedData.secondSingle_amount != undefined && parsedData.secondSingle_amount == 1 ? newData.coin.singleUpgrades.push(12) : ''
        parsedData.thirdSingle_amount != undefined && parsedData.thirdSingle_amount == 1 ? newData.coin.singleUpgrades.push(13) : ''
        parsedData.fourthSingle_amount != undefined && parsedData.fourthSingle_amount == 1 ? newData.coin.singleUpgrades.push(14) : ''
        parsedData.fifthSingle_amount != undefined && parsedData.fifthSingle_amount == 1 ? newData.coin.singleUpgrades.push(15) : ''
        parsedData.sixthSingle_amount != undefined && parsedData.sixthSingle_amount == 1 ? newData.coin.singleUpgrades.push(21) : ''
        parsedData.seventhSingle_amount != undefined && parsedData.seventhSingle_amount == 1 ? newData.coin.singleUpgrades.push(22) : ''
        parsedData.eighthSingle_amount != undefined && parsedData.eighthSingle_amount == 1 ? newData.coin.singleUpgrades.push(23) : ''
        parsedData.ninthSingle_amount != undefined && parsedData.ninthSingle_amount == 1 ? newData.coin.singleUpgrades.push(24) : ''
        parsedData.tenthSingle_amount != undefined && parsedData.tenthSingle_amount == 1 ? newData.coin.singleUpgrades.push(25) : ''

        parsedData.firstPrestigeBuyable_amount != undefined ? newData.prestige.upgrades[1] = parsedData.firstPrestigeBuyable_amount : 0
        parsedData.secondPrestigeBuyable_amount != undefined ? newData.prestige.upgrades[2] = parsedData.secondPrestigeBuyable_amount : 0

        parsedData.firstPrestigeSingle_amount != undefined && parsedData.firstPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(11) : ''
        parsedData.secondPrestigeSingle_amount != undefined && parsedData.secondPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(12) : ''
        parsedData.thirdPrestigeSingle_amount != undefined && parsedData.thirdPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(13) : ''
        parsedData.fourthPrestigeSingle_amount != undefined && parsedData.fourthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(14) : ''
        parsedData.fifthPrestigeSingle_amount != undefined && parsedData.fifthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(21) : ''
        parsedData.sixthPrestigeSingle_amount != undefined && parsedData.sixthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(22) : ''
        parsedData.seventhPrestigeSingle_amount != undefined && parsedData.seventhPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(23) : ''
        parsedData.eighthPrestigeSingle_amount != undefined && parsedData.eighthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(24) : ''
        parsedData.ninthPrestigeSingle_amount != undefined && parsedData.ninthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(31) : ''
        parsedData.tenthPrestigeSingle_amount != undefined && parsedData.tenthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(32) : ''
        parsedData.eleventhPrestigeSingle_amount != undefined && parsedData.eleventhPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(33) : ''
        parsedData.twelfthPrestigeSingle_amount != undefined && parsedData.twelfthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(34) : ''
        parsedData.thirteenthPrestigeSingle_amount != undefined && parsedData.thirteenthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(41) : ''
        parsedData.fourteenthPrestigeSingle_amount != undefined && parsedData.fourteenthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(42) : ''
        parsedData.fifteenthPrestigeSingle_amount != undefined && parsedData.fifteenthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(43) : ''
        parsedData.sixteenthPrestigeSingle_amount != undefined && parsedData.sixteenthPrestigeSingle_amount == 1 ? newData.prestige.singleUpgrades.push(44) : ''

        parsedData.firstShardBuyable_amount != undefined ? newData.shard.upgrades[1] = parsedData.firstShardBuyable_amount : 0
        parsedData.secondShardBuyable_amount != undefined ? newData.shard.upgrades[2] = parsedData.secondShardBuyable_amount : 0
        parsedData.thirdShardBuyable_amount != undefined ? newData.shard.upgrades[3] = parsedData.thirdShardBuyable_amount : 0

        parsedData.firstShardSingle_amount != undefined && parsedData.firstShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(11) : ''
        parsedData.secondShardSingle_amount != undefined && parsedData.secondShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(12) : ''
        parsedData.thirdShardSingle_amount != undefined && parsedData.thirdShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(13) : ''
        parsedData.fourthShardSingle_amount != undefined && parsedData.fourthShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(21) : ''
        parsedData.fifthShardSingle_amount != undefined && parsedData.fifthShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(22) : ''
        parsedData.sixthShardSingle_amount != undefined && parsedData.sixthShardSingle_amount == 1 ? newData.shard.singleUpgrades.push(23) : ''

        parsedData.firstShopBuyable_amount != undefined ? newData.shop.upgrades[1] = parsedData.firstShopBuyable_amount : 0
        parsedData.secondShopBuyable_amount != undefined ? newData.shop.upgrades[2] = parsedData.secondShopBuyable_amount : 0
        parsedData.thirdShopBuyable_amount != undefined ? newData.shop.upgrades[3] = parsedData.thirdShopBuyable_amount : 0
        parsedData.fourthShopBuyable_amount != undefined ? newData.shop.upgrades[4] = parsedData.fourthShopBuyable_amount : 0
        parsedData.fifthShopBuyable_amount != undefined ? newData.shop.upgrades[5] = parsedData.fifthShopBuyable_amount : 0

        parsedData.sixthShopBuyable_amount != undefined ? newData.shop.permanentUpgrades[1] = parsedData.sixthShopBuyable_amount : 0
        parsedData.seventhShopBuyable_amount != undefined ? newData.shop.permanentUpgrades[2] = parsedData.seventhShopBuyable_amount : 0

        parsedData.firstShopItem_used != undefined ? newData.shop.items.used[1] = parsedData.firstShopItem_used : 0
        parsedData.firstShopItem_amount != undefined ? newData.shop.items.amount[1] = parsedData.firstShopItem_amount : 0
        parsedData.secondShopItem_used != undefined ? newData.shop.items.used[2] = parsedData.secondShopItem_used : 0
        parsedData.secondShopItem_amount != undefined ? newData.shop.items.amount[2] = parsedData.secondShopItem_amount : 0
        parsedData.thirdShopItem_used != undefined ? newData.shop.items.used[3] = parsedData.thirdShopItem_used : 0
        parsedData.thirdShopItem_amount != undefined ? newData.shop.items.amount[3] = parsedData.thirdShopItem_amount : 0
        parsedData.fourthShopItem_used != undefined ? newData.shop.items.used[4] = parsedData.fourthShopItem_used : 0
        parsedData.fourthShopItem_amount != undefined ? newData.shop.items.amount[4] = parsedData.fourthShopItem_amount : 0

        parsedData.gameTimer != undefined ? newData.time.game.total.timer = parsedData.gameTimer : 0
        parsedData.gameTimer != undefined ? newData.time.real.total.timer = parsedData.gameTimer : 0

        parsedData.lastOnlineTime != undefined ? newData.time.savedTime = parsedData.lastOnlineTime : 0

        parsedData.money != undefined ? newData.coin.currency = parsedData.money : 0
        
        parsedData.optionValue != undefined ? newData.settings.font = parsedData.optionValue : 0

        parsedData.overdriveType1_consumed != undefined ? newData.overdrive.consumed.type1 = parsedData.overdriveType1_consumed : 0

        parsedData.prestigeCount != undefined ? newData.prestige.resets = parsedData.prestigeCount : 0

        parsedData.prestigeTimer != undefined ? newData.time.real.prestige.timer = parsedData.prestigeTimer : 0
        parsedData.prestigeTimer != undefined ? newData.time.game.prestige.timer = parsedData.prestigeTimer : 0

        parsedData.shards != undefined ? newData.shard.currency = parsedData.shards : 0

        parsedData.shardUnlockablePerSecond_consumedShards != undefined ? newData.shard.consumed.second = parsedData.shardUnlockablePerSecond_consumedShards : 0
        parsedData.shardUnlockableClick_consumedShards != undefined ? newData.shard.consumed.click = parsedData.shardUnlockableClick_consumedShards : 0
        parsedData.shardUnlockableSingles_consumedShards != undefined ? newData.shard.consumed.singles = parsedData.shardUnlockableSingles_consumedShards : 0
        parsedData.shardUnlockableBuyables_consumedShards != undefined ? newData.shard.consumed.buyables = parsedData.shardUnlockableBuyables_consumedShards : 0

        newData.shard.consumed.second >= 1000 ? newData.shard.unlockables.push(1) : ''
        newData.shard.consumed.click >= 1000 ? newData.shard.unlockables.push(2) : ''
        newData.shard.consumed.buyables >= 10000 ?newData.shard.unlockables.push(3) : ''
        newData.shard.consumed.singles >= 100000 ? newData.shard.unlockables.push(4) : ''

        parsedData.spentSuperCoins != undefined ? newData.supercoin.spent_currency = parsedData.spentSuperCoins : 0
        parsedData.superCoins != undefined ? newData.supercoin.currency = parsedData.superCoins : 0
        parsedData.totalSuperCoins != undefined ? newData.supercoin.total_currency = parsedData.totalSuperCoins : 0

        parsedData.total != undefined ? newData.coin.total_currency = parsedData.total : 0
        parsedData.totalCrystals != undefined ? newData.prestige.total_currency = parsedData.totalCrystals : 0

        parsedData.umultiplierTimer != undefined ? newData.time.umultiplier = parsedData.umultiplierTimer : 0
        parsedData.upowerTimer != undefined ? newData.time.upower = parsedData.upowerTimer : 0
        parsedData.umultipliercount != undefined ? newData.umultipliers = parsedData.umultipliercount : 0
        parsedData.upowercount != undefined ? newData.upowers = parsedData.upowercount : 0

        let challenge = parsedData.challengeCompleted != undefined ? JSON.parse(parsedData.challengeCompleted) : []
        for (let i = 0; i < 12; i++){
            if (challenge[i] == true) {
                newData.challenge.completed.push(i+1)
            }
        }

        newData.coin.superUpgrades = [0]
        newData.supercrystal.upgrades = [0]

        localStorage.removeItem('datasaving');
    }
}
