import React, { useState, useEffect } from 'react';
import { content } from "../../content"

interface Props { }

interface Trace {
    url: string;
    baseSite: string
    extra: any
}

interface StoredWord {
    id: number;
    title: string;
    status: boolean;
    count: number,
    trace: Array<Trace>
}

/**
 * Table to display a dynamic list of words which are blocked by the extension.
 * 
 * @returns {JSX.Element}
 */
const ContentTable: React.FC<Props> = () => {

    const [words, setWords] = useState<StoredWord[]>([]);
    const [isWordListLoading, setWordListLoading] = useState<boolean>(true);

    /** state holder for insert new element  */
    const [newWord, setNewWord] = useState<string>("");

    useEffect(() => {
        chrome.storage.sync.get('words', function (storedObject: any) {
            console.log("words loaded from chrome.storage", storedObject)
            const { words } = storedObject
            setWords(words)
            setWordListLoading(false)
        });
    }, [])

    useEffect(() => {
        chrome.storage.sync.set({ words }, function () {
            console.log("words written to chrome.storage", words)
        });
    }, [words])

    /** mechanism to add or remove words system */
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
            count: 0,
            trace: []
        }
        setWords([...words, newWordToBeInserted])

        // clear input field
        setNewWord("")
    }

    const removeWord = (id: number) => {
        let newWords = words.filter((word: StoredWord) => word.id !== id)
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
                        <td>{word.status}</td>
                        <td>{word.count}</td>
                        <td>
                            <a style={{ cursor: "pointer", color: "#D2686E" }} onClick={() => { removeWord(word.id) }}>Delete</a>
                        </td>
                    </tr>
                })}
                <tr>
                    <td>Insert New Word</td>
                    <td>
                        <input type="text" placeholder="Enter new word" value={newWord} onChange={(e) => { setNewWord(e.target.value); }} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addNewWord()
                            }
                        }} />
                    </td>
                    <td>
                        <button type="button" className="contrast outline" onClick={() => { addNewWord() }}>Add</button>
                    </td>
                </tr>
            </tbody>
        </table>


    </div >
};

export default ContentTable