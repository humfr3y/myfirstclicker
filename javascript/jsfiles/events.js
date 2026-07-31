const DIGITALIZATION = {
    start: new Date("2026-08-01T00:00:00Z").getTime(),
    end: new Date("2026-08-30T23:59:00Z").getTime(),
    check_event() {
        const now = Date.now();
        if (limits(now, this.start, this.end)) {
            player.event.digitalization.activated = true
            this.enable()
            this.quests.daily.checkQuests()
            this.quests.weekly.checkQuests()
            this.pass.update()
        }
        else {
            player.event.digitalization.activated = false
            this.disable()
        }
    },
    enable() {
        if (!player.event.digitalization.activated) return 0
        document.getElementById('digitalizationEvent').style.display = 'flex'
    },
    disable() {
        document.getElementById('digitalizationEvent').style.display = 'none'
    },
    time_left() {
        const now = Date.now();
        return convert_time_temp((this.end-now)/1000)
    },
    time_left_to_start() {
        const now = Date.now()
        return convert_time_temp((this.start-now)/1000)
    },
    quests: {
        daily: {
            1: {
                id: 1,
                requirement() {
                    return 1000
                },
                reward() {
                    return 100
                }
            },
            2: {
                id: 2,
                requirement() {
                    return 3600
                },
                reward() {
                    return 100
                }
            },
            3: {
                id: 3,
                requirement() {
                    return 5000
                },
                reward() {
                    return 100
                }
            },
            4: {
                id: 4,
                requirement() {
                    return 200
                },
                reward() {
                    return 1
                }
            },
            checkReset() {
                if (Date.now() > player.event.digitalization.time.next_daily) {
                    const next = new Date();
                    next.setUTCDate(next.getUTCDate() + 1);
                    next.setUTCHours(0, 0, 0, 0);
                    player.event.digitalization.time.next_daily = next.getTime();
                    this.questReset()
                }
            },
            left() {
                DIGITALIZATION.quests.daily.checkReset()
                return convert_time_temp(Math.max(0, Math.floor((player.event.digitalization.time.next_daily - Date.now()) / 1000)))
            },
            unl(id) {
                if (player.event.digitalization.quests.daily.progress[id-1] >= DIGITALIZATION.quests.daily[id].requirement() && !player.event.digitalization.quests.daily.completed.includes(id)) {
                    player.event.digitalization.quests.daily.completed.push(id)
                    player.event.digitalization.pass_points += DIGITALIZATION.quests.daily[id].reward()
                    notify(text.notification.digitalization.daily, 'limegreen'); 
                }
            },
            checkQuests() {
                for (let i = 1; i <= 4; i++) {
                    this.unl(i)
                    this.update(i)
                }
            },
            update(id) {
                let current = player.event.digitalization.quests.daily.progress[id-1]
                let required = DIGITALIZATION.quests.daily[id].requirement()
                
                let width = 0;
                let ratio = 0;
                
                width = (current / required) * 100;
                ratio = width;
        
                width = Math.min(Math.max(width, 0), 100);
                ratio = Math.min(Math.max(ratio, 0), 100);
        
                document.getElementsByClassName('digitalizationDailyQuestProgressBar')[id-1].style.width = width + "%";
                if (ratio === 100) document.getElementsByClassName('digitalizationDailyQuestProgressBar')[id-1].classList.add('completed')
            },
            questReset() {
                for (let i = 1; i <= 4; i++) {
                    player.event.digitalization.quests.daily.progress[i-1] = 0
                }
                player.event.digitalization.quests.daily.completed = []
            }
        },
        weekly: {
            1: {
                id: 1,
                requirement() {
                    return 10000
                },
                reward() {
                    return 500
                }
            },
            2: {
                id: 2,
                requirement() {
                    return 43200
                },
                reward() {
                    return 500
                }
            },
            3: {
                id: 3,
                requirement() {
                    return 50000
                },
                reward() {
                    return 500
                }
            },
            4: {
                id: 4,
                requirement() {
                    return 50000
                },
                reward() {
                    return 750
                }
            },
            5: {
                id: 5,
                requirement() {
                    return 10000000
                },
                reward() {
                    return 1000
                }
            },
            checkReset() {
                if (Date.now() > player.event.digitalization.time.next_weekly) {
                    const next = new Date();
                    const day = next.getUTCDay();
                    const diff = day === 0 ? 1 : (8 - day) % 7 || 7;
                    next.setUTCDate(next.getUTCDate() + diff);
                    next.setUTCHours(0, 0, 0, 0);
                    player.event.digitalization.time.next_weekly = next.getTime();
                    this.questReset()
                }
            },
            left() {
                DIGITALIZATION.quests.weekly.checkReset()
                return convert_time_temp(Math.max(0, Math.floor((player.event.digitalization.time.next_weekly - Date.now()) / 1000)))
            },
            unl(id) {
                if (player.event.digitalization.quests.weekly.progress[id-1] >= DIGITALIZATION.quests.weekly[id].requirement() && !player.event.digitalization.quests.weekly.completed.includes(id)) {
                    player.event.digitalization.quests.weekly.completed.push(id)
                    player.event.digitalization.pass_points += DIGITALIZATION.quests.weekly[id].reward()
                    notify(text.notification.digitalization.weekly, 'limegreen'); 
                }
            },
            checkQuests() {
                for (let i = 1; i <= 5; i++) {
                    this.unl(i)
                    this.update(i)
                }
            },
            update(id) {
                let current = player.event.digitalization.quests.weekly.progress[id-1]
                let required = DIGITALIZATION.quests.weekly[id].requirement()
                
                let width = 0;
                let ratio = 0;
                
                width = (current / required) * 100;
                ratio = width;
        
                width = Math.min(Math.max(width, 0), 100);
                ratio = Math.min(Math.max(ratio, 0), 100);
        
                document.getElementsByClassName('digitalizationWeeklyQuestProgressBar')[id-1].style.width = width + "%";
                if (ratio === 100) document.getElementsByClassName('digitalizationWeeklyQuestProgressBar')[id-1].classList.add('completed')
            },
            questReset() {
                for (let i = 1; i <= 5; i++) {
                    player.event.digitalization.quests.weekly.progress[i-1] = 0
                }
                player.event.digitalization.quests.weekly.completed = []
            }
        }
    },
    selectQuest(x) {
        if (x == 'daily') {
            this.quest_type = 'daily' 
            document.getElementById('digitalizationQuestListDaily').style.display = 'flex'
            document.getElementById('digitalizationQuestListWeekly').style.display = 'none'
        }
        else {
            this.quest_type = 'weekly' 
            document.getElementById('digitalizationQuestListWeekly').style.display = 'flex'
            document.getElementById('digitalizationQuestListDaily').style.display = 'none'
        }
    },
    backgroundImageList: [
        'javascript/cssfiles/images/misc/digitalization_logo.png', 'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/items/TW1m.bmp', 'javascript/cssfiles/images/misc/supercoin.png', 'javascript/cssfiles/images/misc/8bit.png', 
        'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/misc/coin5.png', 'javascript/cssfiles/images/items/U1totallydonenow.bmp', 'javascript/cssfiles/images/misc/supercoin.png', 'javascript/cssfiles/images/misc/progress-bar2.png',
        'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/items/TW1m.bmp', 'javascript/cssfiles/images/misc/supercoin.png', 'javascript/cssfiles/images/items/U1totallydonenow.bmp', 'javascript/cssfiles/images/misc/progress-bar3.png', 
        'javascript/cssfiles/images/items/TW1m.bmp', 'javascript/cssfiles/images/treasure/event_treasure_3.png', 'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/misc/supercoin.png', 'javascript/cssfiles/images/misc/theme1.png',
        'javascript/cssfiles/images/items/TW1m.bmp', 'javascript/cssfiles/images/items/U1totallydonenow.bmp', 'javascript/cssfiles/images/treasure/event_treasure_4.png', 'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/misc/theme2.png', 
        'javascript/cssfiles/images/misc/supercoin.png', 'javascript/cssfiles/images/items/TW1m.bmp', 'javascript/cssfiles/images/items/Uxtotallydonenow.bmp', 'javascript/cssfiles/images/treasure/event_treasure_5.png', 'javascript/cssfiles/images/misc/Coin2Off.png'
    ],
    generatePassList() {
        const list = document.getElementById('digitalizationPassLevels');
        const bgList = this.backgroundImageList

        for (let i = 1; i <= 30; i++) {
            let itemHTML = `
                <div class="digitalizationPassItemContainer" onclick="DIGITALIZATION.pass.getReward(${i})">
                    <span class="digitalizationPassItemTitle"> 
                        <span data-i18n="digitalization.level"></span>
                        <span>${i}</span>
                    </span>
                    <div class="digitalizationPassItemIcon"></div>
                    <span class="digitalizationPassItemDesc" data-i18n="digitalization.passRewards.${i-1}">Test</span>
                </div>
                `;
            if (i != 30) itemHTML += `<div class="horizontalLine"></div>`
            // Добавляем созданный код в список
            list.insertAdjacentHTML('beforeend', itemHTML);

            const icon = document.getElementsByClassName('digitalizationPassItemIcon')[i-1];
            if (bgList[i-1]) {
                icon.style.backgroundImage = `url('${bgList[i-1]}')`;
            }
        }
    },
    pass: { //weekly - 3250, daily x7 - 2100, clicks around 500 ig. Let's say weekly you can get 5500 points. Across event that's 20000, down to 16000
        requirement(x=player.event.digitalization.pass_level) {
            switch (true) {
                case limits(x, 0, 9):
                    return 300 //300 x 10 = 3000
                    break;
                case limits(x, 10, 19):
                    return 600 //600 x 10 = 6000 = 9000
                    break;
                case limits(x, 20, 29):
                    return 900 //900 x 10 = 9000 = 18000
                    break;
                case x >= 30:
                    return 99999
                    break;
                default:
                    break;
            }
        },
        next_level() {
            let current = player.event.digitalization.pass_points
            let req = DIGITALIZATION.pass.requirement()
            if (current >= req) {
                player.event.digitalization.pass_points -= DIGITALIZATION.pass.requirement()
                player.event.digitalization.pass_level++
            }
        },
        update() {
            if (document.getElementsByClassName('digitalizationPassItemContainer').length == 0) return;
            let current = player.event.digitalization.pass_points
            let required = DIGITALIZATION.pass.requirement()

            this.next_level()
            
            let width = 0;
            let ratio = 0;
            
            width = (current / required) * 100;
            ratio = width;
    
            width = Math.min(Math.max(width, 0), 100);
            ratio = Math.min(Math.max(ratio, 0), 100);
    
            document.getElementById('digitalization-pass-progressbar').style.width = width + "%";
        },
        checkReward() {
            for (let i = 1; i <= player.event.digitalization.pass_level; i++) {
                const element = document.getElementsByClassName('digitalizationPassItemContainer')[i-1];

                element.classList.add('completed')

                if (player.event.digitalization.taken_rewards.includes(i)) element.classList.add('tookReward')
            }
        },
        getReward(level) {
            if (player.event.digitalization.taken_rewards.includes(level) || player.event.digitalization.pass_level < level) return 0;

            const element = document.getElementsByClassName('digitalizationPassItemContainer')[level - 1];
            const notificationMessage = i18next.t('digitalization.getReward') + i18next.t(`digitalization.passRewards.${level - 1}`);

            player.event.digitalization.taken_rewards.push(level);
            element.classList.add('tookReward');
            
            notify(notificationMessage, 'lime');

            const today = MISC.what_day_is_it_today();
            const day = String(today.day).padStart(2, '0');
            const month = String(today.month).padStart(2, '0');
            const year = today.year;

            const formattedDate = `${day}.${month}.${year}`;

            const rewards = {
                1:  () => { 
                    player.treasure.digitalization[1].amount++
                    player.treasure.digitalization[1].date = formattedDate
                },
                2:  () => player.shop.items.amount[1] += 5,
                3:  () => player.shop.items.amount[3] += 6,
                4:  () => addSupercoins(1000),
                5:  () => player.cosmetics.fonts.styles.push('option14'),
                6:  () => player.shop.items.amount[1] += 6,
                7:  () => { 
                    player.treasure.digitalization[2].amount++
                    player.treasure.digitalization[2].date = formattedDate
                },
                8:  () => player.shop.items.amount[2] += 2,
                9:  () => addSupercoins(2500),
                10: () => player.cosmetics.progressBars.styles.push('option7'),
                11: () => player.shop.items.amount[1] += 7,
                12: () => player.shop.items.amount[3] += 8,
                13: () => addSupercoins(5000),
                14: () => player.shop.items.amount[2] += 4,
                15: () => player.cosmetics.progressBars.styles.push('option9'),
                16: () => player.shop.items.amount[3] += 10,
                17: () => { 
                    player.treasure.digitalization[3].amount++
                    player.treasure.digitalization[3].date = formattedDate
                },
                18: () => player.shop.items.amount[1] += 10,
                19: () => addSupercoins(10000),
                20: () => player.cosmetics.themes.styles.push('option3'),
                21: () => player.shop.items.amount[3] += 15,
                22: () => player.shop.items.amount[2] += 6,
                23: () => { 
                    player.treasure.digitalization[4].amount++
                    player.treasure.digitalization[4].date = formattedDate
                },
                24: () => player.shop.items.amount[1] += 15,
                25: () => player.cosmetics.themes.styles.push('option2'),
                26: () => addSupercoins(25000),
                27: () => player.shop.items.amount[3] += 30,
                28: () => player.shop.items.amount[2] += 10,
                29: () => { 
                    player.treasure.digitalization[5].amount++
                    player.treasure.digitalization[5].date = formattedDate
                },
                30: () => player.cosmetics.coins.styles.push('option2')
            };

            if (rewards[level]) rewards[level]();

            updateFontSelector()
            updateProgressBarSelector()
            updateThemeSelector()
            updateCoinSelector()
            generateEventTreasures()

            function addSupercoins(amount) {
                player.supercoin.currency += amount;
                player.supercoin.this_reflash_currency += amount;
                player.supercoin.total_currency += amount;
            }
        }
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
    }
    else {
    triplePowerEvent.style.display = 'none'
    noEvent.style.display = 'block'
    } 
}