import React, { useState, useEffect } from 'react';
import { content } from "../../content"
import { StoredWord } from "../../interfaces/storedWord"

interface Props { }


/**
 * Table to display a dynamic list of words which are blocked by the extension.
 * 
 * @returns {JSX.Element}
 */
const ContentTable: React.FC<Props> = () => {

    const [words, setWords] = useState<StoredWord[]>([]);
    const [isWordListLoading, setWordListLoading] = useState<boolean>(true);
    const [idCounter, setIdCounter] = useState<number>(0);

    /** state holder for insert new element  */
    const [newWord, setNewWord] = useState<string>("");


    /** to run at page load */
    useEffect(() => {
        // get latest list of words from service worker
        try {
            chrome.storage.sync.get('words', function (storedObject: any) {
                console.log("[chrome-storage] :: words ", storedObject)
                const { words } = storedObject
                setWords(words)
                setWordListLoading(false)
            });
        } catch (e) {
            console.error("[chrome-storage] :: words ", e)
        }

        // get latest id counter
        try {
            chrome.storage.sync.get("wordIdCounter", function (storedObject: any) {
                console.log("[chrome-storage] :: wordIdCounter ", storedObject)
                const { idCounter } = storedObject
                setIdCounter(idCounter)
            })
        } catch (e) {
            console.error("[chrome-storage] :: wordIdCounter", e)
        }
    }, [])

    /** to run when words change */
    useEffect(() => {
        try {
            chrome.storage.sync.set({ words }, function () {
                console.log("words written to chrome.storage", words)
            });
        } catch (e) {
            console.error("[chrome-storage] :: words/update", e)
        }
    }, [words])

    /**
     * mechanism to add or remove words system 
     */
    const addNewWord = () => {

        // check for empty submission 
        if (newWord.length === 0) {
            alert("Please enter a word to add to the list.")
            return;
        }

        // add new word to storage
        let newWordToBeInserted: StoredWord = {
            id: words.length + 1,
            title: newWord,
            status: true,
            count: 0
        }
        setWords([...words, newWordToBeInserted])

        // clear input field
        setNewWord("")
    }

    const removeWord = (id: number) => {
        let newWords = words.filter((word: StoredWord) => word.id !== id)
        setWords(newWords)
    }

    const switchListener = (id: number, value: any) => {
        const checked = value === 'on' ? true : false;
        console.log({ id, value, checked })
        let newWords = words.map((word: StoredWord) => {
            if (word.id === id) {
                word.status = !checked
            }
            return word
        })
        setWords(newWords)
    }


    return <div className='container' >
        <table role="grid" >
            <thead >
                <tr >
                    <th scope="col">Word</th>
                    <th scope="col">Status</th>
                    <th scope="col">Count</th>
                    {words.length ? <td>Actions</td> : null}
                </tr>
            </thead>
            <tbody aria-busy={isWordListLoading} >
                {words.map((word: StoredWord, index: number) => {
                    return <tr key={index}>
                        <td>{word.title}</td>
                        <td>
                            <fieldset>
                                <label htmlFor="switch">
                                    <input type="checkbox" id="switch" name="switch" role="switch" defaultChecked={word.status} onChange={(e) => { switchListener(word.id, e.target.value) }} />
                                </label>
                            </fieldset>
                        </td>
                        <td>{word.count}</td>
                        <td>
                            <a style={{ cursor: "pointer", color: "#D2686E" }} onClick={() => { removeWord(word.id) }}>Delete</a>
                        </td>
                    </tr>
                })}
                <tr>
                    <td>Insert New Word</td>
                    <td colSpan={words.length == 0 ? 1 : 2}>
                        <input type="text" placeholder="Enter new word" value={newWord} onChange={(e) => { setNewWord(e.target.value); }} onKeyDown={(e) => {
                            if (e.key === 'Enter') { addNewWord() }
                        }} />
                    </td>

                    <td>
                        <button type="button" className="contrast outline" onClick={() => { addNewWord() }}>Add</button>
                    </td>
                </tr>
            </tbody>
        </table >


    </div >
};

export default ContentTable