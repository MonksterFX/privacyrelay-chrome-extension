/**
 * send message to content script
 */
function sendMessage(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.storage.local.get(['domain'], function(value) {
            chrome.tabs.sendMessage(tabs[0].id, {data: {email: createPrivacyEmail(value.domain)}}, function(response) {
                console.log(response);
            });
          });
      });
}

// TODO: only if there are buttons found
const fillButton = document.getElementById('fill')
fillButton.addEventListener("click", sendMessage);
fillButton.disabled = false


