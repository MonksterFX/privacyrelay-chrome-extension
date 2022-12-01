// https://developer.chrome.com/docs/extensions/reference/storage/
// https://developer.chrome.com/docs/extensions/mv3/options/

function saveOptions(options){
    chrome.storage.local.set(options, function() {
        console.info('options saved', options)
    });
}

function getOptions(callback){
    chrome.storage.local.get(['domain', 'password_length'], function(result) {
        console.info('options loaded', result)
        callback(result)
    });
}

function loadData(data){
    const form = document.getElementById('options')

    // load data into the form
    for([key, value] of Object.entries(data)){
        const el = form.querySelector(`[name=${key}]`)
        if(el){
            el.value = value
        }
    }
}

// listen to form changes
document.addEventListener('submit', (event)=>{
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target));
    saveOptions(data);
})

// load data as soon as all content is loaded
getOptions(loadData)