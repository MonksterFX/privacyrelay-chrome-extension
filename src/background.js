// currently there is no need for additional pages. This stays here to show how it can be done.
const CONTEXT_MENU_ID = "PRIVACY_MENU";
const CONTEXT_MENU_SETTINGS = CONTEXT_MENU_ID + "_SETTINGS";

chrome.contextMenus.create({
    id: CONTEXT_MENU_SETTINGS,
    contexts:["action"], 
    title: "Settings", 
});

function OpenSettings(){
    // chrome-extension://glgeoalnibpjidnfpfebppmdhfboejle/src/pages/options.html
    chrome.runtime.openOptionsPage()
}

function triggerAction(info, tab){
    const id = info.menuItemId
    switch (id) {
        case CONTEXT_MENU_SETTINGS:
            OpenSettings()
            break;
        default:
            break;
    }
}

chrome.contextMenus.onClicked.addListener(triggerAction)