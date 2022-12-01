function getEmailNode(){
    // inputmode=email, name=email, type=email, autocomplete=email
    const nodeList = document.querySelectorAll("[type=email],[inputmode=email],[name=email],[autocomplete=email]")
    return nodeList[0]
}

/**
 * fill all accessable nodes
 * @param {{email: string}} fields
 * @returns 
 */
function fillNodes({email }){
    const emailNode = getEmailNode()

    if(emailNode && email ){
        emailNode.value = email
        return true
    }

    return false
}

// listing on messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.data){
        const {email } = request.data
        const success = fillNodes({email})
        sendResponse(success)
    }
    sendResponse(false)
    return true
});

/**
 * checks if required field are set in storage
 * @returns 
 */
async function storageIsValid(){
    const obj = await getObjectFromLocalStorage(['domain']).catch((err)=>{
        return {}
    })
    return !!obj.domain 
}

/**
 * autofill fields
 */
async function autofill(event){
    event.preventDefault()

    const isValid = await storageIsValid()
    if(isValid){
        const store = await getObjectFromLocalStorage(['domain'])
        const data = {email: createPrivacyEmail(store.domain)}
        fillNodes(data)
    }else{
        alert('Extension: Privacy Relay | Please Set Domain In Options')
    }
}

/**
 * inject auto fill buttons to email inputs
 */
function inject(){
    const emailNode = getEmailNode()
    const height = emailNode.clientHeight

    // create button in the input field
    const button = document.createElement("button");
    button.style=`height:${height}px;width:${height}px; left:-${height + 2}px`
    button.classList = ['pr-generate-button']
    button.innerHTML = "&#8203;"
    button.onclick = autofill

    emailNode.insertAdjacentElement("afterend", button)
}

// TODO: only inject if input field is selected
// inject generate email button to email fields
// document.addEventListener('', ()=>{
// })

inject()