const { CONFIG: { MASK_CHARACTER } } = require("../config")

/**
 * 
 * This function tests a given word against a list of words which are not allowed to be displayed, and replaces them
 * with a  
 * 
 * @param {string} word word which is being tested against banned words
 * @param {string[]} find list of banned words to test the given word against
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



/**
 * Find number of times a given word exists in a string
 * 
 * @param {string} bannedWord banned word we need to find the count of
 * @param {string} wordToTestAgainst normal word we're counting the banned word in
 * @returns {number} number of matches
 */
export function countBannedWordMatchesInString(bannedWord, wordToTestAgainst) {
    const regex = new RegExp(bannedWord, "gi")
    return wordToTestAgainst.match(regex)?.length ?? 0;
}


/**
 * Calculate frequency of invocations.
 * 
 * @param {{id:number, title:string, count:number}} wordToTestAgainst String to test against banned words
 * @param {string[]} bannedWords list of banned words which are to be tested against the given string
 * @returns {[string]:number}
 */
export function encounterCounter(wordToTestAgainst, bannedWords) {

    /** initialize an object with 0 default for each word */
    let count = {}
    bannedWords.forEach(bannedWord => {
        count[bannedWord.title] = {
            id: bannedWord.id,
            count: countBannedWordMatchesInString(bannedWord.title, wordToTestAgainst)
        }
    })
    return count
}
