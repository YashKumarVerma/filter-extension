import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {

  // store word states here
  const [traces, setTraces] = useState([]);
  const [isTraceListLoading, setTraceListLoading] = useState(true);

  /**
    * load and populate data at page load
    */
  useEffect(() => {

    /** get latest trace list from local storage */
    try {
      chrome.storage.local.get(null, function (storedObject) {
        console.log("[chrome.storage] :: all ", storedObject)
        const obj = storedObject
        const tracesIntermediateArray = []

        console.log("[chrome.storage] :: traces :: ", obj)
        Object.keys(obj).forEach(key => {
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
      console.error("[chrome-popup] :: wordIdCounter", e)
    }
  }, [])


  return (
    <main className="container">
      <hgroup>
        <h2>Filter Extension</h2>
        <h3>Words filtered from page</h3>
      </hgroup>
      <hr />
      <table role="grid" >
        <thead >
          <tr >
            <th scope="col">Word</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody aria-busy={isTraceListLoading} >
          {Object.keys(traces).map((key) => {
            return (
              <tr key={key}>
                <td>{traces[key].word}</td>
                <td>{traces[key].count}</td>
              </tr>
            )
          })}
        </tbody>
      </table >


    </main>
  );
};

export default Popup;
