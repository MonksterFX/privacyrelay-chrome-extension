/**
 * generates uid with length of size
 * @param {number} size 
 */
function generateUID(size=6){
    const array = new Uint8Array(size);
    const baseValues = 'abcdefghijklmopqrstuvwxyz0123456789'

    crypto.getRandomValues(array);

    let uid = ''

    for(const num of array){
        uid += baseValues[num % (35)]
    }

    return uid
}

/**
 * creates privacy mail with pattern [random-uid]@[hostname]
 * @param {string} hostname
 * @param {number} length
 */
function createPrivacyEmail(hostname, length=6){
    const uid = generateUID(length)
    return `${uid}@${hostname}`
}

/**
 * @deprecated use password manager!
 */
function createPassword(){
    return generateUID(12)
}

/**
 * async wrapper for chrome storage - get
 * @param {string[]} keys keys to retrieve
 */
 const getObjectFromLocalStorage = async function(keys) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(keys, function(value) {
          resolve(value);
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };
  
  /**
   * async wrapper for chrome storage - set
   * @param {*} obj 
   */
  const saveObjectInLocalStorage = async function(obj) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set(obj, function() {
          resolve();
        });
      } catch (ex) {
        reject(ex);
      }
    });
  };
  