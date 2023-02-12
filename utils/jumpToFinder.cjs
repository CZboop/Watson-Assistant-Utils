// return all places that jump to a node or intent
const IntentNodeFinder = require('./intentNodeFinder.cjs');

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
        if (this.intent != null && this.node != null){
            // if passed both intent and node, how to handle this? either give both or throw and error in the constructor?
        }
        else if (this.node != null) {
            return this.findNodeJumpTos(this.node);
        }
        else if (this.intent != null) {
            const nodesInIntent = new IntentNodeFinder(this.skill, this.intent);
            const nodesJumpingToIntent = [];
            for (let node of nodesInIntent) {
                nodesJumpingToIntent.push(...this.findNodeJumpTos(node));
            }
            return nodesJumpingToIntent;
        }

    }
    // not intended to be called directly but can be
    findNodeJumpTos (searchNode) {
        const nodesThatJumpTo = this.skill.dialog_nodes.filter(node => node['next_step']['behavior'] == 'jump_to' && node['next_step']['dialog_node'] == searchNode);
        return nodesThatJumpTo;
    }
}

module.exports = JumpToFinder;