import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
const nodeFinder = require('../utils/intentNodeFinder.cjs');

function FindIntentNode() {
    const [storedSkill, setStoredSkill] = useState(null);
    let skillIntents = (storedSkill == null || storedSkill == undefined) ? null :JSON.parse(storedSkill).intents.map(intent => intent["intent"])
    let intentOptions = !skillIntents ? null : skillIntents.map(intent => {
        return (
            <option value={intent} key={intent}>{intent}</option>
        )
    });

    const handleIntentSelection = () => {
        console.log("TODO")
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
            <p>Select the intent whose nodes you want to see:</p>
            <div className="intent-options" >
                <select>
                    <option value="">--~*'Select Intent'*~--</option>
                    {intentOptions}
                </select>
            </div>
            <button>Upload a different skill</button>
            {/* TODO make a button to change skill/upload a new file, potentially stored previous ones and be able to switch between */}
            </div>
        }
    </div>
  )
}


export default FindIntentNode;