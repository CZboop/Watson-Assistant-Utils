import React, { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import JumpToFinder from '../utils/jumpToFinder.js';
import './FindJumpTos.css';

function FindJumpTos() {
    // TODO: convert node and intent options into own elements to centrally use across other components
    const [storedSkill, setStoredSkill] = useState(null);
    let skillNodes = (storedSkill === null || storedSkill === undefined) ? null :JSON.parse(storedSkill).dialog_nodes.map(node => node.dialog_node);
    let nodeOptions = !skillNodes ? null : skillNodes.map(node => {
        return (
            <option value={node} key={node}>{node}</option>
        )
    });
    let skillIntents = (storedSkill === null || storedSkill === undefined) ? null :JSON.parse(storedSkill).intents.map(intent => intent["intent"])
    let intentOptions = !skillIntents ? null : skillIntents.map(intent => {
        return (
            <option value={intent} key={intent}>{intent}</option>
        )
    });
    const [nodeName, setNodeName] = useState("");
    const [intentName, setIntentName] = useState("");
    const [jumpTos, setJumpTos] = useState([]);
    const [nodeOrIntent, setNodeOrIntent] = useState("intent");
    const [intentChecked, setIntentChecked] = useState(true);
    const [nodeChecked, setNodeChecked] = useState(false);

    const handleNodeNameChange = (e) => {
        setNodeName(e.target.value);
    }

    const handleIntentNameChange = (e) => {
        setIntentName(e.target.value);
    }

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (nodeOrIntent == "intent"){
            const jumpToFinder = new JumpToFinder(JSON.parse(storedSkill), null, intentName);
            const jumpTosFound = jumpToFinder.findJumpTos();
            setJumpTos(jumpTosFound);
            console.log(jumpTosFound);
        }
        else {
            const jumpToFinder = new JumpToFinder(JSON.parse(storedSkill), nodeName, null);
            const jumpTosFound = jumpToFinder.findJumpTos();
            setJumpTos(jumpTosFound.map(jumpTo => {
                return <li key={jumpTo}>{jumpTo}</li>
            }));
            console.log(jumpTosFound);
        }
    }

    const handleTypeToggle = (e) => {
        if (nodeOrIntent == "intent"){
            setIntentChecked(false)
            setNodeChecked(true)
            setNodeOrIntent("node");
        }
        else {
            setIntentChecked(true)
            setNodeChecked(false)
            setNodeOrIntent("intent");
        }
    }

    const handleSelectionSwitch = () => {
        setNodeName("");
        setIntentName("")
        setJumpTos([])
    }
    
    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill, skillNodes, nodeOptions])

  return (
    <div className="FindJumpTos">
        {
            !storedSkill?
            <FileUploader />
            :
            <div>
            <p>Skill stored: {JSON.parse(storedSkill).name}</p>
            
            {
                jumpTos.length == 0 ?
                <form onSubmit={handleFormSubmission} className="form-intent">
                    <div className="type-toggle" >
                    <input type="radio" id="type-toggle-intent" name="type" value="intent" checked={intentChecked} onChange={handleTypeToggle}/>
                    <label className="radio-button" htmlFor="type-toggle-intent">Intent</label>

                    <input type="radio" id="type-toggle-node" name="type" value="node" checked={nodeChecked} onChange={handleTypeToggle}/>
                    <label className="radio-button" htmlFor="type-toggle-node">Node</label>
                    </div>

                    <div id="out"></div>
                    {
                        nodeOrIntent === "node" ?
                        <div>
                        <p>Select the node whose jump-tos you want to see:</p>
                        <div className="node-options" value={nodeName} onChange={handleNodeNameChange}>
                            <select>
                                <option >--~*'Select Node'*~--</option>
                                {nodeOptions}
                            </select>
                        </div>
                        <input type="submit" value="Submit" className="submit-node"/>
                        </div>
                        :
                        <div>
                        <p>Select the intent whose jump-tos you want to see:</p>
                        <div className="node-options" value={nodeName} onChange={handleIntentNameChange}>
                            <select>
                                <option >--~*'Select Intent'*~--</option>
                                {intentOptions}
                            </select>
                        </div>
                        <input type="submit" value="Submit" className="submit-intent"/>
                        </div>
                    }
                
            </form>
                :
                <div>
                <h4>Jump Tos - {nodeOrIntent == "node" ? nodeName : intentName}</h4>
                <ul>
                    {jumpTos}
                </ul>
                <button onClick={handleSelectionSwitch} className="submit-button">Switch Node/Intent</button>
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

export default FindJumpTos;