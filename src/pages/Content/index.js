const { maskBannedWordInString } = require("./util/string")

/**
 * This function tests a given word against a list of words which are not allowed to be displayed, 
 * and replaces them with an element which does not have that word.
 */
function maskAllWordsOnPage() {
    const keys = ["code", "teacher"]

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
                var maskedContentOfString = maskBannedWordInString(textContentOfString, keys)
                if (maskedContentOfString !== textContentOfString) {
                    element.replaceChild(document.createTextNode(maskedContentOfString), currentProcessingNode);
                }
            }
        }
    }
}

/** run it :) */
maskAllWordsOnPage()