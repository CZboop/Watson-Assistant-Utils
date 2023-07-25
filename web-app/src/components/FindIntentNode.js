import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import IntentNodeFinder from '../utils/intentNodeFinder.js';

function FindIntentNode() {
    const [storedSkill, setStoredSkill] = useState(null);
    let skillIntents = (storedSkill === null || storedSkill === undefined) ? null :JSON.parse(storedSkill).intents.map(intent => intent["intent"])
    let intentOptions = !skillIntents ? null : skillIntents.map(intent => {
        return (
            <option value={intent} key={intent}>{intent}</option>
        )
    });
    const [intentName, setIntentName] = useState("");
    const [nodeList, setNodeList] = useState([]);

    const handleIntentNameChange = (e) => {
        setIntentName(e.target.value);
    }

    const handleIntentSubmission = (e) => {
        e.preventDefault();
        // console.log(intentName)
        if (intentName === ""){
            alert("Please select an intent!")
        }
        else {
            const intentNodeFinder = new IntentNodeFinder(JSON.parse(storedSkill), intentName);
            try{
                const listOfNodes = intentNodeFinder.findAllNodes();
                setNodeList(listOfNodes.map(node => {
                    return <li key={node}>{node}</li>
                }));
            }
            catch {
                alert("No intent found with that name! Please select one of the given options.")
            }
        }
    }

    const handleIntentSwitch = () => {
        setIntentName("");
        setNodeList([]);
    }

    const handleSkillSwitch = () => {
        sessionStorage.removeItem('files');
        setStoredSkill(null);
        window.location.reload();
    }
    
    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill, skillIntents, intentOptions])

  return (
    <div className="FindIntentNode PageContainer">
        <h2 id="page-header">Intent Node Finder</h2>
        <p>{storedSkill == null ? 'Please upload a JSON file of a Watson Assistant dialogue skill' : `Skill stored: ${JSON.parse(storedSkill).name}`}</p>
        {
            !storedSkill?
            <FileUploader />
            :
            <div>            
            {
                nodeList.length === 0 ?
                <form onSubmit={handleIntentSubmission} className="form-intent">
                <label htmlFor="intent-options">Select or start typing the intent whose nodes you want to see:</label>
            <div className="intent-options" value={intentName} onChange={handleIntentNameChange}>
                <input list="optionData" id="intent-options"/>
                <datalist id="optionData" title="optionDataList">
                    {/* <option >--~*'Select Intent'*~--</option> */}
                    {intentOptions}
                </datalist>
            </div>
            <input type="submit" value="Submit" className="submit-intent"/>
            </form>
                :
                <div>
                <h4 className="intent-node-list">Nodes in Intent - {intentName}</h4>
                <ul>
                    {nodeList}
                </ul>
                <button onClick={handleIntentSwitch} className="submit-button" id="switch-intent">Switch Intent</button>
                </div>

            }
            <hr></hr>
            <button onClick={handleSkillSwitch}>Upload a different skill</button>
            </div>
        }
    </div>
  )
}


export default FindIntentNode;