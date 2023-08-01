import React, { useState, useEffect, useContext } from 'react';
import FileUploader from './FileUploader';
import NodeIntentFinder from '../utils/nodeIntentFinder.js';
import { ModalContext } from '../App';

function FindNodeIntent() {
    const modalContext = useContext(ModalContext);
    const [storedSkill, setStoredSkill] = useState(null);
    let skillNodes = (storedSkill === null || storedSkill === undefined) ? null :JSON.parse(storedSkill).dialog_nodes.map(node => node);
    let nodeOptions = !skillNodes ? null : skillNodes.map(node => {
        return (
            <option value={node.dialog_node} key={node.dialog_node}>{node.title}</option>
        )
    });
    const [nodeName, setNodeName] = useState("");
    const [nodeIntent, setNodeIntent] = useState("");

    const handleNodeNameChange = (e) => {
        setNodeName(e.target.value);
    }

    const handleNodeSubmission = (e) => {
        e.preventDefault();
        if (nodeName === "") {
            modalContext.setModalTitle("Error - No Node Selected!");
            modalContext.setModalMessage("Please enter or select a valid option in the input or from the dropdown")
            modalContext.setModalOpen(true);
            // alert("Please select a node!")
        }
        else {
            try {
                const nodeIntentFinder = new NodeIntentFinder(JSON.parse(storedSkill), nodeName);
                const intentOfNode = nodeIntentFinder.getIntent();
                setNodeIntent(intentOfNode);
            }
            catch {
                modalContext.setModalTitle("Error - Node Not Found!");
                modalContext.setModalMessage(`Invalid input - no node found with the id ${nodeName}. Please select one of the options.`)
                modalContext.setModalOpen(true);
                // alert(`Invalid input - no node found with the id ${nodeName}`);
                setNodeName("");
            }
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
        <h2 id="page-header">Node Intent Finder</h2>
        <p>{storedSkill == null ? 'Please upload a JSON file of a Watson Assistant dialogue skill' : `Skill stored: ${JSON.parse(storedSkill).name}`}</p>
        {
            !storedSkill?
            <FileUploader />
            :
            <div>            
            {
                nodeIntent === "" ?
                <form onSubmit={handleNodeSubmission} className="form-intent">
                <label htmlFor="node-options">Select or start typing the node whose intent you want to see:</label>
            <div className="node-options" value={nodeName} onChange={handleNodeNameChange}>
                <input id="optionDataInput" list="optionData" value={nodeName} onChange={handleNodeNameChange} className='data-list'/>
                    <datalist id="optionData" >
                    {/* <option >--~*'Select Node'*~--</option> */}
                    {nodeOptions}
                    </datalist>
            </div>
            <input type="submit" value="Submit" className="submit-node"/>
            </form>
                :
                <div>
                <h4 id="result-heading">Intent/Entity/Parent For Node - {nodeName}</h4>
                <p id="result-text">{nodeIntent}</p>
                <button onClick={handleNodeSwitch} className="submit-button" id="switch-node">Switch Node</button>
                </div>
            }
            <hr></hr>
            <button onClick={handleSkillSwitch} className='submit-button'>Upload a different skill</button>
            </div>
        }
    </div>
  )
}


export default FindNodeIntent;