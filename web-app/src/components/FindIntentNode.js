import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';

function FindIntentNode() {
    const [storedSkill, setStoredSkill] = useState(null);

    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill])
  return (
    <div className="FindIntentNode">
        {
            !storedSkill?
            <FileUploader />
            :
            <div>
            <p>Skill stored: {JSON.parse(storedSkill).name}</p>
            <p>Upload a different skill</p>
            {/* TODO make a button to change skill/upload a new file, potentially stored previous ones and be able to switch between */}
            </div>
        }
    </div>
  )
}

export default FindIntentNode;