/**
 * this file contains additional logic for batch processing, and a middleware to collect requests
 * raised by content script.
 *
 * @author YashKumarVerma
 */
let localCache = {}


function sendMessageHandler(obj) {
    try {
        const { url, word } = obj.payload
        if (localCache === null) {
            localCache = {}
        }
        /** 
         * process each matching received by content script
         */
        const wordListInEncounter = Object.keys(word)
        wordListInEncounter.forEach(key => {
            const count = word[key].count

            /** only process non zero entries */
            if (count != 0) {

                /** write data to cache */
                const result = localCache[key]
                if (result === undefined) {
                    localCache[key] = { count, url: [url] }
                } else {
                    const { count: existingCount, url: existingUrls } = result
                    localCache[key] = { count: existingCount + count, url: [...existingUrls, url] }
                }
            }
        })

    } catch (e) {
        console.error(`[content-script] :: encounter/batch-processing `, e)
    }
}

function triggerBatchProcess() {
    try {
        /**
         * send a new message to service worker with cache snapshot and clear cache
         */
        chrome.runtime.sendMessage({ slug: "batch-process", payload: localCache }, (response) => {
            console.log(`[content-script] :: batch-process-trigger`, response)
            localCache = {};
            console.log(`[content-script] :: batch-process-clear`, { localCache })
        });
    }
    catch (e) {
        console.error(`[content-script] :: encounter/batch-processing-trigger `, e)
    }
}

/**
 * export an API interface to be used in place of main chrome API.
 * 
 * finally run process.batchTasks() to trigger batch processing
 */
export const cachedChromeAPI = {
    runtime: {
        sendMessage: sendMessageHandler
    },
    process: {
        batchTasks: triggerBatchProcess
    }
}