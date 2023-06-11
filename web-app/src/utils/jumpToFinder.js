// return all places that jump to a node or intent
const IntentNodeFinder = require('./intentNodeFinder.js');

class JumpToFinder {
    // TODO: what's the best way of being able to get for both node and intent
    constructor (skill, node = null, intent = null) {
        this.skill = skill;
        this.node = node;
        this.intent = intent;
        if (this.node == null && this.intent == null) {
            throw new Error('No intent or node provided');
        }
    }

    findJumpTos () {
        // if it's an intent, use intent node finder to find all nodes and run for each
        // else just find for the one node
        if (this.intent && this.node){
            // if passed both intent and node, how to handle this? either give both or throw and error in the constructor?
        }
        else if (this.node) {
            return this.findNodeJumpTos(this.node);
        }
        else if (this.intent) {
            let nodesInIntent = new IntentNodeFinder(this.skill, this.intent).findAllNodes();
            const nodesJumpingToIntent = [];
            for (let node of nodesInIntent) {
                let nodesJumping = this.findNodeJumpTos(node);
                if (nodesJumping.length > 0){
                    nodesJumpingToIntent.push(...nodesJumping);
                }
            }
            return nodesJumpingToIntent;
        }
    }
    // not intended to be called directly but can be
    findNodeJumpTos (searchNode) {
        const nodesThatJumpTo = this.skill.dialog_nodes.filter(node => (node['next_step']['behavior'] == 'jump_to') && (node['next_step']['dialog_node'] == searchNode));
        
        return this.getNameFromNodes(nodesThatJumpTo);
    }
    // getting names from full node filter results
    getNameFromNodes (nodeArray) {
        return nodeArray.map(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
    }
}

export default JumpToFinder;