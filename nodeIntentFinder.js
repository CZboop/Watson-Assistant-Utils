// passing in a node id and getting back which intent it falls under

class NodeIntentFinder {
    constructor(skill, node, intentVar = null) {
        this.skill = skill;
        this.node = node;
        this.intentVar = intentVar;
    }

    getIntent() {
        const intentFormatted = intentVar != null ? '#': `$${intentVar}`; // ternary for if intentVar or directly from the #intent
        // go through parent nodes until find and intent in entry condition or no more parents
        const startNode = this.skill.dialog_nodes.filter(node => node.hasOwnProperty('dialog_node') ? node['dialog_node']: node['title']);
        const entryCondition = startNode.conditions ;
        // TODO: handle list of conditions above
        if (entryCondition == intentFormatted) {
            // TODO: decode the formatting before returning
            return intentFormatted;
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