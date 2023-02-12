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
        let parentNodes = [startNode.parent];
        while (parentNodes.filter(elem => elem.hasOwnProperty('parent'))){
            parentNodes = parentNodes.map(node => node.hasOwnProperty('parent') ? node['parent'] : null).filter(elem => elem != null);
            let nodesWithTargetIntent = parentNodes.filter(node => node.conditions.startsWith(intentFormatted));
            if (nodesWithTargetIntent){
                return nodesWithTargetIntent[0].conditions;
            }
        }
    }
}

module.exports = NodeIntentFinder;