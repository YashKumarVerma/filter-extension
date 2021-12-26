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

let words = []

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'get-user-data') {
        sendResponse(words);
    }
});

chrome.storage.sync.onChanged.addListener((changes, area) => {
    console.log({ changes, area })
    const { words: { newValue } } = changes
    console.log("newValue", newValue)
    words = newValue
});