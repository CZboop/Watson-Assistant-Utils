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
        console.log(intentName)
        if (intentName == ""){
            alert("Please select an intent!")
        }
        else {
            const intentNodeFinder = new IntentNodeFinder(JSON.parse(storedSkill), intentName);
            const listOfNodes = intentNodeFinder.findAllNodes();
        setNodeList(listOfNodes.map(node => {
            return <li key={node}>{node}</li>
        }));
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
        <h2>Intent Node Finder</h2>
        <p>{storedSkill == null ? 'Please upload a JSON file of a Watson Assistant dialogue skill' : `Skill stored: ${JSON.parse(storedSkill).name}`}</p>
        {
            !storedSkill?
            <FileUploader />
            :
            <div>            
            {
                nodeList.length === 0 ?
                <form onSubmit={handleIntentSubmission} className="form-intent">
                <p>Select or start typing the intent whose nodes you want to see:</p>
            <div className="intent-options" value={intentName} onChange={handleIntentNameChange}>
                <input list="optionData"/>
                <datalist id="optionData" >
                    {/* <option >--~*'Select Intent'*~--</option> */}
                    {intentOptions}
                </datalist>
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
            <button onClick={handleSkillSwitch}>Upload a different skill</button>
            </div>
        }
    </div>
  )
}


export default FindIntentNode;