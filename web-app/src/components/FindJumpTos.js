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
        if ((nodeName === "" && nodeOrIntent === "node") || (intentName === "" && nodeOrIntent === "intent")) {
            alert(nodeOrIntent === "node" ? "Please select a node!" : "Please select an intent!")
        }
        else {
            if (nodeOrIntent === "intent"){
                const jumpToFinder = new JumpToFinder(JSON.parse(storedSkill), null, intentName);
                try {
                    const jumpTosFound = jumpToFinder.findJumpTos();
                    setJumpTos(jumpTosFound);
                    // console.log(jumpTosFound);
                    if (jumpTosFound.length === 0) {
                        alert(`No nodes jumping to intent - ${intentName}!`);
                    }
                }
                catch {
                    alert(`Invalid intent - no intent found named ${intentName}. Please select one of the options.`);
                }
                
                setIntentName("");
            }
            else {
                const jumpToFinder = new JumpToFinder(JSON.parse(storedSkill), nodeName, null);
                try {
                    const jumpTosFound = jumpToFinder.findJumpTos();
                    setJumpTos(jumpTosFound.map(jumpTo => {
                        return <li key={jumpTo}>{jumpTo}</li>
                    }));
                    // console.log(jumpTosFound);
                    if (jumpTosFound.length === 0) {
                        alert(`No nodes jumping to node - ${nodeName}!`);
                        setNodeName("");
                    }
                }
                catch {
                    alert(`Invalid node - no node found name ${nodeName}. Please select one of the options.`);
                    setNodeName("");
                }
                
                
            }
        }
    }

    const handleTypeToggle = (e) => {
        if (nodeOrIntent === "intent"){
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

    const handleSkillSwitch = () => {
        sessionStorage.removeItem('files');
        setStoredSkill(null);
        window.location.reload();
    }
    
    useEffect(()=> {
        setStoredSkill(sessionStorage.getItem('files'))
    }, [storedSkill, skillNodes, nodeOptions])

  return (
    <div className="FindJumpTos PageContainer">
        <h2 id="page-header">Jump-To Finder</h2>
        <p>{storedSkill == null ? 'Please upload a JSON file of a Watson Assistant dialogue skill' : `Skill stored: ${JSON.parse(storedSkill).name}`}</p>
        {
            !storedSkill?
            <FileUploader />
            :
            <div>            
            {
                jumpTos.length === 0 ?
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
                        <p>Select or start typing the node whose jump-tos you want to see:</p>
                        <div className="node-options" >
                            <input list="optionData" value={nodeName} onChange={handleNodeNameChange}/>
                                <datalist id="optionData" >
                                {/* <option >--~*'Select Node'*~--</option> */}
                                {nodeOptions}
                                </datalist>
                        </div>
                        <input type="submit" value="Submit" className="submit-node"/>
                        </div>
                        :
                        <div>
                        <p>Select or start typing the intent whose jump-tos you want to see:</p>
                        <div className="node-options" >
                            <input list="optionData" value={intentName} onChange={handleIntentNameChange}/>
                                <datalist id="optionData" >
                                {/* <option >--~*'Select Intent'*~--</option> */}
                                {intentOptions}
                                </datalist>
                        </div>
                        <input type="submit" value="Submit" className="submit-intent"/>
                        </div>
                    }
                
            </form>
                :
                <div>
                <h4 id="result-list">Jump Tos - {nodeOrIntent === "node" ? nodeName : intentName}</h4>
                <ul>
                    {jumpTos}
                </ul>
                <button onClick={handleSelectionSwitch} className="submit-button">Switch Node/Intent</button>
                </div>

            }
            <hr></hr>
            <button onClick={handleSkillSwitch}>Upload a different skill</button>
            </div>
        }
    </div>
  )
}

export default FindJumpTos;