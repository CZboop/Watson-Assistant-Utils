import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import NodeIntentFinder from '../utils/nodeIntentFinder.js';

function FindNodeIntent() {
    // TODO: change select dropdown to be a filtered search of nodes
    // TODO: catch exception/handle where no intent found
    const [storedSkill, setStoredSkill] = useState(null);
    let skillNodes = (storedSkill === null || storedSkill === undefined) ? null :JSON.parse(storedSkill).dialog_nodes.map(node => node.dialog_node);
    let nodeOptions = !skillNodes ? null : skillNodes.map(node => {
        return (
            <option value={node} key={node}>{node}</option>
        )
    });
    const [nodeName, setNodeName] = useState("");
    const [nodeIntent, setNodeIntent] = useState("");

    const handleNodeNameChange = (e) => {
        setNodeName(e.target.value);
    }

    const handleNodeSubmission = (e) => {
        e.preventDefault();
        if (nodeName == "") {
            alert("Please select a node!")
        }
        else {
            const nodeIntentFinder = new NodeIntentFinder(JSON.parse(storedSkill), nodeName);
            const intentOfNode = nodeIntentFinder.getIntent();
            setNodeIntent(intentOfNode);
        }
    }

    const handleNodeSwitch = () => {
        setNodeName("");
        setNodeIntent("");
    }

    const handleSkillSwitch = () => {
        sessionStorage.removeItem('files');
        setStoredSkill(null);
        window.location.reload();
    }
    
    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill, skillNodes, nodeOptions])

  return (
    <div className="FindNodeIntent PageContainer">
        <h2>Node Intent Finder</h2>
        <p>{storedSkill == null ? 'Please upload a JSON file of a Watson Assistant dialogue skill' : `Skill stored: ${JSON.parse(storedSkill).name}`}</p>
        {
            !storedSkill?
            <FileUploader />
            :
            <div>            
            {
                nodeIntent === "" ?
                <form onSubmit={handleNodeSubmission} className="form-intent">
                <p>Select or start typing the node whose intent you want to see:</p>
            <div className="node-options" value={nodeName} onChange={handleNodeNameChange}>
                <input list="optionData"/>
                    <datalist id="optionData" >
                    {/* <option >--~*'Select Node'*~--</option> */}
                    {nodeOptions}
                    </datalist>
            </div>
            <input type="submit" value="Submit" className="submit-node"/>
            </form>
                :
                <div>
                <h4>Intent For Node - {nodeName}</h4>
                <p>{nodeIntent}</p>
                <button onClick={handleNodeSwitch} className="submit-button">Switch Node</button>
                </div>

            }
            <hr></hr>
            <button onClick={handleSkillSwitch}>Upload a different skill</button>
            </div>
        }
    </div>
  )
}


export default FindNodeIntent;