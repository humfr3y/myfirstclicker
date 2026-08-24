function showChangelog(desc){
    ELS.verDesc.innerHTML = desc;
}
function showStory(chapter, title) {
    paperWindow.style.display = "flex"; myPopupBackdropSub.style.display = "flex";
    ELS.chapTitle.innerHTML = title;
    ELS.chapDesc.innerHTML = chapter;
}
function showHelpPage(help, helpName) {
    ELS.helpDesc.innerHTML = help;
    helpPageTitle.innerHTML = helpName;
}

const LORE = {
    has(id) { return player.settings.loreBoolean.includes(id); },

    unl(id) {
        if (!this.has(id)) {
            player.settings.loreBoolean.push(id);
            notify(text.notification.lore, 'mediumpurple', '500px'); 

            renderSavedLore()
            
            // Красим кнопку ТОЛЬКО один раз при получении
            let element = document.getElementsByClassName("loreChapter")[id - 1];
            if (element) element.classList.add("unlockedChapter");
        }
    },

    checkLore() {
        // Кэшируем количество глав, чтобы не дергать Object.keys каждый тик
        const totalChapters = Object.keys(this.conditions).length;
        
        for (let c = 1; c <= totalChapters; c++) {
            // Проверяем условие, только если глава еще не открыта
            if (!this.has(c) && this.conditions[c] && this.conditions[c]()) {
                this.unl(c);
                toggleBadges(['badge-settings-2', 'badge-misc-2', 'badge-lore'], true)
            }
        }
    },

    conditions: {
        1() { return player.coin.currency > 10 },
        2() { return player.coin.singleUpgrades.length > 0 },
        3() { return player.umultipliers > 0 },
        4() { return player.upowers > 0 },
        5() { return player.supercoin.total_currency > 1000 },
        6() { return player.prestige.total_currency > 0 },
        7() { return player.prestige.singleUpgrades.length > 0 },
        8() { return player.prestige.broken_currency > 0 },
        9() { return player.prestige.resets > 2 },
        10() { return player.coin.currency > 1e25 },
        11() { return player.supercrystal.currency > 0},
        12() { return player.minerals[1] > 0 || player.minerals[2] > 0 || player.minerals[3] > 0},
        13() { return player.shop.special.includes(3)},
        14() { return player.prestige.break.singles.includes(25) },
        15() { return player.uadders > 0 },
        16() { return player.ureducers > 0 },
        17() { return player.fortune.total_tokens >= 1 },
        18() { return player.balance.total_coins.plus >= 1 || player.balance.total_coins.minus >= 1},
        19() { return player.progressBarGoals.includes(8)},
        20() { return player.reflash.resets > 0},
        21() { return player.supercoin.this_reflash_currency > 10000 && player.reflash.resets > 0},
        22() { return player.reflash.computer[3] > 0},
        23() { return player.reflash.computer[5] > 0},
    }
}

// --- ОТРИСОВКА СОХРАНЕННЫХ ГЛАВ ПРИ ЗАГРУЗКЕ ---
function renderSavedLore() {
    const allChapters = document.querySelectorAll(".left-lore-chapter, .right-lore-chapter");
    
    allChapters.forEach(btn => {
        const match = btn.getAttribute("onclick").match(/\[(\d+)\]/);
        const id = match ? parseInt(match[1]) : null;

        if (id !== null && player.settings.loreBoolean.includes(id)) {
            btn.classList.add("unlockedChapter");
        }
        let key = Math.max(...player.settings.loreBoolean)

        switch (true) {
            case (key >= 21):
                document.getElementsByClassName("rightLoreTitle")[2].style.display = "block";
            case (key >= 17):
                document.getElementsByClassName("leftLoreTitle")[2].style.display = "block";
            case (key >= 13):
                document.getElementsByClassName("rightLoreTitle")[1].style.display = "block";
            case (key >= 9):
                document.getElementsByClassName("leftLoreTitle")[1].style.display = "block";
            case (key >= 5):
                document.getElementsByClassName("rightLoreTitle")[0].style.display = "block";
            case (key >= 1):
                document.getElementsByClassName("leftLoreTitle")[0].style.display = "block";
                break;
            default:
                break;
        }
    });
    let maxPage = Math.ceil(Math.max(...player.settings.loreBoolean) / 8)
    if (maxPage > 1) document.getElementsByClassName("right-arrow")[0].style.display = "block";
}

function changePage(direction) { //пусть первая страница будет 1, а вторая 2 

    //смена страниц
    let minPage = 1, maxPage = Math.ceil(Math.max(...player.settings.loreBoolean) / 8)
    document.getElementsByClassName('left-lore-page')[ELS.page-1].style.display = 'none'
    document.getElementsByClassName('right-lore-page')[ELS.page-1].style.display = 'none'
    document.getElementsByClassName("leftPageTitle")[ELS.page-1].style.display = "none";
    document.getElementsByClassName("rightPageTitle")[ELS.page-1].style.display = "none";
    direction == 'right' ? ELS.page++ : ELS.page--;
    document.getElementsByClassName('left-lore-page')[ELS.page-1].style.display = 'grid'
    document.getElementsByClassName('right-lore-page')[ELS.page-1].style.display = 'grid'
    document.getElementsByClassName("leftPageTitle")[ELS.page-1].style.display = "block";
    document.getElementsByClassName("rightPageTitle")[ELS.page-1].style.display = "block";

    //чек максимума и минимума страниц и показывать стрелку
    if (ELS.page < maxPage)
        document.getElementsByClassName("right-arrow")[0].style.display = "block";
    else
        document.getElementsByClassName("right-arrow")[0].style.display = "none";
    if (ELS.page > minPage)
        document.getElementsByClassName("left-arrow")[0].style.display = "block";
    else   
        document.getElementsByClassName("left-arrow")[0].style.display = "none";

    //смена бумажек на страницах
    let leftPageButtons = document.getElementsByClassName("left-lore-page");
    let rightPageButtons = document.getElementsByClassName("right-lore-page");
}

//так тут уже посложнее, надо чтобы одна пара кнопок-стрелок меняла полки НА ОДНОЙ ВКЛАДКЕ которые ещё так уебищно размечены мною
function changeShopPage(direction, reset=false) {
    //пусть для всех вкладок будет от 1 до 2 вкладок
    let minPage = 1, maxPage = 2

    //определяем цифру что за вкладка открыта (покупаемые, постоянные, особые или предметы)
    let shopTab = ELS.selectedShopTab

    //определяем какие вкладки будет менять
    const rowTypes = ['shopBuyableRow', 'shopPermanentRow', 'shopSpecialRow', 'shopItemRow']
    const requiredRow = rowTypes[shopTab]
    //так бляха тут ещё сложнее. Надо определить что если у нас будет 2 пары полок (4 элемента) то будет 1 и 3, 2 и 4, а если 3 пары (6 элементов) то 1 и 4, 2 и 5, 3 и 6, 4 пары (8 элементов) то 1 и 5, 2 и 6, 3 и 7, 4 и 8.
    //так как getElementsByClassName считает уёбищно, нужно как-то вычленить динамично порядковые номера полок. Первая полка будет всегда 1, а вот вторая 1+количество пар полок
    //В теории формула выйдет: { first: 1 (пока пусть 1), second: 1+length/2 }.

    //допустим у нас 2 пары, элементов будет 4. А, так можно просто умножать на индекс текущей страницы что ещё проще сделает ситуацию. 
    const rowElements = [...document.getElementsByClassName(requiredRow)]
    const rowLength = rowElements.length

    //ТЕКУЩИЕ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ СКРЫВАТЬ
    //тут определяется верхняя полка, 1, 2, 3 и т.д., так как её элементы расположены сверху и будут первыми в счетчике getElementsByClassName
    const first_current = ELS.shopPage
    //тут определяется нижняя полка, если 1 пара полок то 1+1=2, если 2 пары полок то 1+2=3, если 3 пары полок то 1+3=4 (как выше указывалось)
    const second_current = ELS.shopPage + rowLength / 2

    //меняем текущий индекс полок
    direction == 'right' ? ELS.shopPage++ : ELS.shopPage--;

    //если переключаем вкладку то сбрасывает текущую страницу до первой
    if (reset) {
        ELS.shopPage = 1
    }

    //СЛЕДУЮЩИЕ ЭЛЕМЕНТЫ КОТОРЫЕ МЫ БУДЕМ ПОКАЗЫВАТЬ
    const first_next = ELS.shopPage
    const second_next = ELS.shopPage + rowLength / 2

    //смена полок, скрываем current и показывает next
    document.getElementsByClassName(requiredRow)[first_current-1].style.display = 'none'
    document.getElementsByClassName(requiredRow)[second_current-1].style.display = 'none'
    document.getElementsByClassName(requiredRow)[first_next-1].style.display = 'flex'
    document.getElementsByClassName(requiredRow)[second_next-1].style.display = 'flex'

    //чек максимума и минимума страниц и показывать стрелку
    if (ELS.shopPage < maxPage)
        document.getElementsByClassName("right-shop-arrow")[0].style.display = "block";
    else
        document.getElementsByClassName("right-shop-arrow")[0].style.display = "none";
    if (ELS.shopPage > minPage)
        document.getElementsByClassName("left-shop-arrow")[0].style.display = "block";
    else   
        document.getElementsByClassName("left-shop-arrow")[0].style.display = "none";
}
