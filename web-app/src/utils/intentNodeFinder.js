// return all nodes within an intent

class IntentNodeFinder {
    constructor(skill, intentName, intentVar = null){
        this.skill = skill;
        this.intentName = intentName;
        this.intentVar = intentVar; // optional param if using a proxy variable to store intent name
    }

    findAllNodes(){
        let nodeArray = [];
        // finding the parent node of the intent with entry condition of intent name
        // TODO: account for using intentVar
        // TODO: account for multiple nodes using in entry condition?
        const dialog_nodes = this.skill['dialog_nodes']
        const rootNode = dialog_nodes.filter(node => node['conditions'] === `#${this.intentName}`)[0];
        // note all nodes have dialog_node property, getting title if not to compare against parent of other nodes
        if (rootNode){
            const rootNodeName = rootNode.hasOwnProperty('dialog_node') ? rootNode['dialog_node']: rootNode['title'];
            nodeArray.push(rootNode);
            const levelOneChildren = dialog_nodes.filter(node => node.parent === rootNodeName);
            const levelOneChildrenNames = levelOneChildren.map(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
            nodeArray.push(...levelOneChildren);
            // looping until no more children
            // TODO: is there a better way to do this?
            let currentLevelChildren = levelOneChildrenNames;
            // TODO: verify this with proper tests with more layered nodes/intents
            while (true) {
                let tempChildren = [];
                for (let child of currentLevelChildren) {
                    let currentLevelChildrenOfNode = dialog_nodes.filter(node => node.parent === child);
                    // let currentLevelChildrenOfNodeNames = currentLevelChildrenOfNode.map(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
                    tempChildren.push(...currentLevelChildrenOfNode);
                }
                if (tempChildren.length === 0) {
                    break;
                }
                nodeArray.push(...tempChildren);
                currentLevelChildren = tempChildren;
            }
    }
        if (nodeArray.length === 0) {
            throw new EvalError("Intent not found! Check the spelling and make sure not to enter the '#' symbol before the name");
        }
        else {
            // return nodeArray;
            return this.getNamesOfNodes(nodeArray);
        }
    }
    getNamesOfNodes(nodeIds){
        return nodeIds.map(node => {
            return node.hasOwnProperty('dialog_node') ? node.hasOwnProperty('title') ? node['dialog_node'] + " - " +  node["title"] : node['dialog_node'] : node['title']
        });
    }
}

export default IntentNodeFinder;