const { CONFIG: { MASK_CHARACTER } } = require("../config")

/**
 * 
 * This function tests a given word against a list of words which are not allowed to be displayed, and replaces them
 * with a  
 * 
 * @param {string} word word which is being tested against banned words
 * @param {string} find current banned word to be replaced
 * @returns {string} 
 */
export function maskBannedWordInString(word, find) {
    let replaceString = word
    let regex;
    for (let i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "gi");
        replaceString = replaceString.replace(regex, MASK_CHARACTER.repeat(find[i].length));
    }
    return replaceString
}


