let player = {
    clicks: {
        real: 0,
        simulated: 0,
        critical: 0,
        prestige: 0
    },
    achievements: [],
    achievement_rows: [],
    progressBarGoals: [0],
    umultipliers: 0,
    upowers: 0,
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
        }
    },
    shop: {
        upgrades: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        },
        permanentUpgrades: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        },
        unlockables: [],
        items: {
            amount: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
            },
            used: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
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
            }
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
            }
        },
        next_daily: 0,
        umultiplier: 0,
        upower: 0,

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
        font: 'option1',
        buy_max_activate: false,
        modernization_activated: false,
        loreBoolean: [],
        event: {
            spiritual: false,
            triplePower: false
        },
        whichPrestigeMode: 'time'
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
            prestige: 0
        },
        conditions: {
            umultiplier: 0,
            upower: {
                time: 0,
                x_of_umulti: 0,
            },
            prestige: {
                time: 3600,
                coins: 1e15
            }
        }
    },
    got_daily_reward: false,
    code: {
        activated: [],
        name: ['digitalgod', 'shirakamifubuki', 'suisei', 'koyori', 'manilovefauna', 'revolution', 'supercoin'],
    },
    overdrive: {
        consumed: {
            type1: 0,
            type2: 0
        }
    },
    offline_gain: {
        time: '',
        coin: '',
        supercoin: '',
        crystal: '',
        prestige: '',
        shard: ''
    }
}

const ELS = {
    automationUpgradesArray: document.getElementsByClassName('automationUpgrade'),
    verDesc: document.getElementById("versionDescription"),
    chapDesc: document.getElementById("chapterDescription"),
    helpDesc: document.getElementById("helpDescription"),
    mediaQuery: window.matchMedia('screen and (max-width: 600px)'),
}

const text = {
        optionValue: "option1",
        broken_crystals: {
            gain: 0,
            broken_crystals: 0
        },
        daily: {
            true: '',
            false: ''
        },
        whichPrestigeMode: 'time',
        multiBreakdown: ['','','','','','','','','','',''],
        itemNames: ['', '', '', ''],
        notification: {
            lore: '',
            load: '',
            save: '',
            export: '',
            import: '',
            hard: '',
            achievement: '',
            dailyRewardRestart: '',
            used_item: '', 
            dont_have_item: '', 
            limit_item: '', 
            limit_item_2: '',
        },
        window: {
            hard: '',
            NaN: '',
        },
        automation: {
            prestige_req: '',
            coin_req: ''
        },
        code: {
            rewards: ['', '', '', '', '', '', ''],
            reward: '',//codeReward
            used_code: '',
            wrong_code: '',
            true_code: '',
            name_of_code: ''
        },
        changelog: {
            start: '',
            "0.0":'',
            "0.1":'',
            "0.2":'',
            "0.3":'',
            "0.4":'',
            "0.5":'',
            "0.5.1":'',
            "0.6":'',
            "0.7":'',
            "0.7.1":'',
            "0.8":'',
            "0.8.0.1":'',
            "0.9":'',
            "0.9.1":'',
            "0.9.2":'',
            "0.10":'',
            "0.10.1":'',
            "0.11":'',
            "0.11.1":'',
            "0.12":''
        },
        chapter: {
            start:'',
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
        },
        helpTitle: {
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:'',
            13:'',
            14:'',
            15:'',
            16:'',
        },
        help: {
            start:'',
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:'',
            13:'',
            14:'',
            15:'',
            16:'',
        },
        empty: '',
    }
