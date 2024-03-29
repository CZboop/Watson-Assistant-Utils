// passing in a node id and getting back which intent it falls under

class NodeIntentFinder {
    constructor(skill, node, intentVar = null) {
        this.skill = skill;
        this.node = node;
        this.intentVar = intentVar;
    }

    getIntent() {
        if (!this.isValid()) {
            throw new Error(`Invalid node - ${this.node}`);
        }
        const intentFormatted = this.intentVar ? `$${this.intentVar}`: '#'; // ternary for if intentVar or directly from the #intent
        // go through parent nodes until find and intent in entry condition or no more parents
        const startNode = this.skill.dialog_nodes.filter(node => node.hasOwnProperty('dialog_node') ? node['dialog_node'] === this.node: node['title'] === this.node)[0];
        // if either already has an intent condition or has no parent
        if (startNode.hasOwnProperty("conditions")){
            if (startNode.conditions.startsWith(intentFormatted) || !startNode.hasOwnProperty("parent")) {
                // TODO: decode the formatting before returning
                return startNode.conditions;
            }
        }
        let parentNodes = [this.getNodeFromName(startNode.parent)];

        while (parentNodes.filter(elem => elem.hasOwnProperty('parent')).length > 0){
            let nodesWithTargetIntent = parentNodes.filter(node => node.hasOwnProperty('conditions') ? node["conditions"].startsWith(intentFormatted) : null);
            if (nodesWithTargetIntent.length > 0){
                return nodesWithTargetIntent[0].conditions;
            }
            parentNodes = parentNodes.map(node => node.hasOwnProperty('parent') ? node['parent'] : null).filter(elem => elem != null).map(node => this.getNodeFromName(node));
        }
        // if no more parents BUT the condition of last node does not have intent as entry condition
        return parentNodes[0].conditions;
        // TODO: in the web app check if intent or not and maybe add extra message if not intent
    }
    // returning the full node from the name/reference to evaluate properties of parent nodes etc.
    getNodeFromName(name) {
        return this.skill.dialog_nodes.filter(node => node.hasOwnProperty('dialog_node') ? node['dialog_node'] === name: node['title'] === name)[0];
    }
    isValid(){
        return this.skill.dialog_nodes.filter(node => node.dialog_node === this.node).length > 0;
    }
}

export default NodeIntentFinder;