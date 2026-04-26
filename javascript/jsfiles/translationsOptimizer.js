
const TabUpdater = {
    currentMainTab: null,
    currentSubTab: null,
    
    subTabsMap: {
        mainTab: ['coinsTab', 'overdriveTab'],
        prestigeTab: ['upgradesTab', 'milestonesTab', 'automationTab', 'shardsTab', 'superCrystalsTab', 'mineralsTab', 'breakPrestigeTab', 'fortuneTab', 'balanceTab'],
        infoTab: ['aboutGameTab', 'statisticsTab', 'multipliersTab', 'challengesTimeTab', 'recentPrestigesTab', 'softcapsTab'],
        settingsTab: ['settingsSaveTab', 'settingsGraphicTab', 'settingsOtherTab'],
        achTab: ['achScreenDescription', 'shardAchsTab'],
        challengeTab: ['challengeCoinTab', 'challengePrestigeTab'],
        shopTab: [],
        eventTab: []
    },
    
    getActiveTab() {
        const mainTabs = ['mainTab', 'prestigeTab', 'infoTab', 'settingsTab', 'achTab', 'eventTab', 'shopTab', 'challengeTab'];
        
        for (const tabId of mainTabs) {
            const tab = document.getElementById(tabId);
            if (tab && tab.style.display !== 'none') {
                this.currentMainTab = tabId;
                break;
            }
        }
        
        const subTabs = this.subTabsMap[this.currentMainTab] || [];
        this.currentSubTab = null;
        
        for (const subTabId of subTabs) {
            const subTab = document.getElementById(subTabId);
            if (subTab && subTab.style.display !== 'none' && subTab.style.display !== '') {
                this.currentSubTab = subTabId;
                break;
            }
        }
    }
};
