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

chrome.browserAction.onClicked.addListener(function () {
    chrome.scripting.executeScript({ file: "content.bundle.js" }, function (result) {
        contextLog(`running content.bundle.js`)
    })
});