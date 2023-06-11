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

        const intentNodeFinder = new IntentNodeFinder(JSON.parse(storedSkill), intentName);
        const listOfNodes = intentNodeFinder.findAllNodes();
        setNodeList(listOfNodes.map(node => {
            return <li key={node}>{node}</li>
        }));
    }

    const handleIntentSwitch = () => {
        setIntentName("");
        setNodeList([]);
    }
    
    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill, skillIntents, intentOptions])

  return (
    <div className="FindIntentNode">
        {
            !storedSkill?
            <FileUploader />
            :
            <div>
            <p>Skill stored: {JSON.parse(storedSkill).name}</p>
            
            {
                nodeList.length === 0 ?
                <form onSubmit={handleIntentSubmission} className="form-intent">
                <p>Select the intent whose nodes you want to see:</p>
            <div className="intent-options" value={intentName} onChange={handleIntentNameChange}>
                <select>
                    <option >--~*'Select Intent'*~--</option>
                    {intentOptions}
                </select>
            </div>
            <input type="submit" value="Submit" className="submit-intent"/>
            </form>
                :
                <div>
                <h4>Nodes in Intent - {intentName}</h4>
                <ul>
                    {nodeList}
                </ul>
                <button onClick={handleIntentSwitch} className="submit-button">Switch Intent</button>
                </div>

            }
            <hr></hr>
            <button>Upload a different skill</button>
            {/* TODO make a button to change skill/upload a new file, potentially stored previous ones and be able to switch between */}
            </div>
        }
    </div>
  )
}


export default FindIntentNode;