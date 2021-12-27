import React, { useState, useEffect } from 'react';
import { content } from "../../content"

import { StoredWord } from "../../interfaces/storedWord"
import { Trace } from '../../interfaces/trace';

interface Props { }

/**
 * Table to display a dynamic list of words which are blocked by the extension.
 * 
 * @returns {JSX.Element}
 */
const TraceTable: React.FC<Props> = () => {

    const [traces, setTraces] = useState<Trace[]>([]);
    const [words, setWords] = useState<StoredWord[]>([]);

    // loading indicators for word and trace lists
    const [isWordListLoading, setWordListLoading] = useState<boolean>(true);
    const [isTraceListLoading, setTraceListLoading] = useState<boolean>(true);


    /**
     * load and populate data at page load
     */
    useEffect(() => {

        /** get latest trace list from local storage */
        try {
            chrome.storage.local.get(null, function (storedObject: any) {
                console.log("[chrome.storage] :: all ", storedObject)
                const obj = storedObject
                const tracesIntermediateArray: Trace[] = []

                console.log("loading traces")
                Object.keys(obj).forEach(key => {
                    console.log(`loading traces for `, obj[key])
                    const value = obj[key]
                    tracesIntermediateArray.push({
                        word: key,
                        count: value.count,
                        urls: value.url
                    })
                })
                setTraces(tracesIntermediateArray)
                setTraceListLoading(false)
            })
        } catch (e) {
            console.error("[chrome-storage] :: wordIdCounter", e)
        }
    }, [])




    return <div className='container' style={{ marginBottom: '40px' }}>
        <h1>Trace</h1>
        <small>
            trace table contains all the traces that are currently being blocked by the extension.
        </small>

        {traces.map((trace: Trace) =>
            <div>
                <details>
                    <summary>{trace.word} <small><i>( {trace.count} instances )</i></small></summary>
                    <div>
                        <table role="grid">
                            <thead>
                                <tr>
                                    <th>{trace.count} Instances</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trace.urls.map((url: string) => <tr>
                                    <td>
                                        <a href={url} target="_blank"><small>{url}</small></a>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </details>

            </div>
        )}
        <small><i>Request new features on <a href='https://github.com/YashKumarVerma/filter-extension' target="_blank">https://github.com/YashKumarVerma/filter-extension</a></i></small>
    </div >
};

export default TraceTable