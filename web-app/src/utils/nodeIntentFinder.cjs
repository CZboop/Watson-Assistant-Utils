// passing in a node id and getting back which intent it falls under

class NodeIntentFinder {
    constructor(skill, node, intentVar = null) {
        this.skill = skill;
        this.node = node;
        this.intentVar = intentVar;
    }

    getIntent() {
        const intentFormatted = this.intentVar ? `$${this.intentVar}`: '#'; // ternary for if intentVar or directly from the #intent
        // go through parent nodes until find and intent in entry condition or no more parents
        const startNode = this.skill.dialog_nodes.filter(node => node.hasOwnProperty('dialog_node') ? node['dialog_node'] == this.node: node['title'] == this.node)[0];
        // TODO: handle list of conditions above
        if (startNode.conditions.startsWith(intentFormatted)) {
            // TODO: decode the formatting before returning
            return startNode.conditions;
        }
        let parentNodes = [startNode.parent].map(node => this.getNodeFromName(node));
        while (parentNodes.filter(elem => elem.hasOwnProperty('parent'))){
            let nodesWithTargetIntent = parentNodes.filter(node => node.hasOwnProperty('conditions') ? node.conditions.startsWith(intentFormatted) : null);
            if (nodesWithTargetIntent.length > 0){
                return nodesWithTargetIntent[0].conditions;
            }
            parentNodes = parentNodes.map(node => node.hasOwnProperty('parent') ? node['parent'] : null).filter(elem => elem != null).map(node => this.getNodeFromName(node));
        }
    }
    // returning the full node from the name/reference to evaluate properties of parent nodes etc.
    getNodeFromName(name) {
        return this.skill.dialog_nodes.filter(node => node.hasOwnProperty('dialog_node') ? node['dialog_node'] == name: node['title'] == name)[0];
    }
}

module.exports = NodeIntentFinder;