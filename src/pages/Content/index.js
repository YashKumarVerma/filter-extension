const { maskBannedWordInString, encounterCounter } = require("./util/string")
const { cachedChromeAPI } = require("./util/batch")


/** 
 * collection of events to be managed by application 
 */
const events = {
    /**
     * @param {{[string]:number}} word Key value pairs of frequencies
     */
    encounter: (word) => {
        /** using a intermediate middleware to process requests in batch */
        console.log(`[service-worker]::encounter`, word)
        cachedChromeAPI.runtime.sendMessage({
            slug: "encounter",
            payload: {
                url: window.location.href,
                word
            }
        })
    }
}

/**
 * This function tests a given word against a list of words which are not allowed to be displayed, 
 * and replaces them with an element which does not have that word.
 */
function maskAllWordsOnPage(activeBannedWordList) {
    const keys = activeBannedWordList.map(item => item.title);

    // get all elements of the page
    const elements = document.getElementsByTagName('*');

    // replace a text node with a masked version of the text node
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        for (let j = 0; j < element.childNodes.length; j++) {
            const currentProcessingNode = element.childNodes[j];

            /** 
             * Types of nodes to be replaced
             * 
             * requires to not change urls or stylesheets or attributes which are not "visible"
             * https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
             */
            if (currentProcessingNode.nodeType === 3) {
                const textContentOfString = currentProcessingNode.nodeValue;
                events.encounter(encounterCounter(textContentOfString, activeBannedWordList))
                const maskedContentOfString = maskBannedWordInString(textContentOfString, keys)
                if (maskedContentOfString !== textContentOfString) {
                    element.replaceChild(document.createTextNode(maskedContentOfString), currentProcessingNode);
                }
            }
        }
    }
}

/** wait for page load to get data to replace */
window.addEventListener('load', () => {
    console.log('[content-script] : triggering window load operations');

    /** send message to service-worker to fetch latest wordlist */
    chrome.runtime.sendMessage({ slug: 'get-user-data' }, (response) => {
        console.log('[service-worker] => [content-script] ; ', response);

        // only those words which have status = true
        const wordList = response.filter(item => item.status === true)
        console.log('[content-script] : wordList : ', wordList);

        maskAllWordsOnPage(wordList)
    });
})


/**
 * heartbeat to poll the service-worker alive and offload processing from service-worker.
 * 
 * - required as service-worker is not infinitely persistent. 
 */
let clockCycle = 0
setInterval(() => {
    cachedChromeAPI.process.batchTasks()

    // housekeeping :)
    console.log(`[service-worker] : clock cycle ${clockCycle}`)
    clockCycle++
}, 5000)