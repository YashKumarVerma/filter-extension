/**
 * @author YashKumarVerma
 * 
 * This script powers the service worker. 
 * 
 * to debug, goto Extension > Extension Details > Inspect Views  > Service Worker
 * 
 * TLDR:
 * - SW(service worker) do not have access to the DOM
 * - SW can access network
 * - SW can trigger a content script
 */

/**
 * @param {string} data Message to display in console

 */
const contextLog = (data) => `[service-worker] : ${data}`

let locallyStoredWords = []
let wordTracing = {}
let localCache = {}

/** 
 * 
 * listen for requests from content scripts for data 
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { slug } = message

    /** 
     * when content scripts request entire data snapshot
     *
     * -directly return the data once shared by settings page.
     */
    if (slug === 'get-user-data') {
        try {
            sendResponse(locallyStoredWords);
            console.log(`[service-worker] replied to get-user-data with ${locallyStoredWords.length} words`)
        } catch (e) {
            sendResponse(locallyStoredWords)
        }
    }

    /**
     * handler for banned word encounter event
     * 
     * 
     * since google chrome (and other browsers) force a write limit on synchronized storages, 
     * therefore traces are stored on local items
     */
    else if (slug === 'encounter') {
        const { payload } = message
        const { url, word } = payload

        /** 
         * process each matching received by content script
         */
        const wordListInEncounter = Object.keys(word)
        wordListInEncounter.forEach(key => {
            const count = word[key].count

            /**
             * implemented a simple batch processing to avoid hitting the write limit
             */
            if (count != 0) {
                // write the counter updates to storage
                chrome.storage.local.get(key, (result) => {

                    // if the key is not in storage, then result is either undefined or empty object
                    if (result[key] === undefined || Object.keys(result[key]).length === 0) {
                        // directly write the object to storage
                        chrome.storage.local.set({ [key]: { count, url: [url] } }, () => {
                            console.log(`[service-worker] :: encounter/new-word${key}, new count ${count}`)
                        })
                    }

                    // else update existing entry
                    else {
                        const { count: existingCount, url: existingUrls } = result[key]
                        // update existing entry
                        console.log({ count, existingCount, new: count + existingCount })
                        chrome.storage.local.set({ [key]: { count: existingCount + count, url: [...existingUrls, url] } }, () => {
                            console.log(`[service-worker] :: encounter/update-word ${key}, new count ${existingCount + count}`)
                        })
                    }

                })

            }
        })

    }

    /**
     * handler for batch processing - to minimize write calls due to chrome storage and access limits
     */
    else if (slug === 'batch-process') {
        const { payload: word } = message

        /** 
         * process each matching received by content script
         */
        const wordListInEncounter = Object.keys(word)
        wordListInEncounter.forEach(key => {
            const count = word[key].count

            /**
             * write data to chrome local storage
             *
             * - if the key is not in storage, then result is either undefined or empty object
             * - if the key is in storage, then simply update the values 
             */
            chrome.storage.local.get(key, (result) => {
                // if the key is not in storage, then result is either undefined or empty object
                if (result[key] === undefined || Object.keys(result[key]).length === 0) {
                    // directly write the object to storage
                    chrome.storage.local.set({ [key]: { count, url: word[key].url } }, () => {
                        console.log(`[service-worker] :: encounter/batch/new-word${key}, new count ${count}`)
                    })
                }

                // else update existing entry
                else {
                    const { count: existingCount, url: existingUrls } = result[key]
                    // update existing entry
                    console.log({ count, existingCount, new: count + existingCount })
                    chrome.storage.local.set({ [key]: { count: existingCount + count, url: [...existingUrls, ...word[key].url] } }, () => {
                        console.log(`[service-worker] :: encounter/batch/update-word ${key}, new count ${existingCount + count}`)
                    })
                }
            })

        })
    }
})


/** 
 * listen for storage updates from options / settings page
 */
chrome.storage.sync.onChanged.addListener((changes, area) => {
    const { words: { newValue } } = changes
    console.log("[service-worker] : wordList received after update ", newValue)
    locallyStoredWords = newValue
});
