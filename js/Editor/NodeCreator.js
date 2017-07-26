class NodeCreator {

    constructor(className, illustration, nodeGenerateFunction) {

        this.nodeCreatorDiv = $("<div></div>");
            this.nodeCreatorDiv.addClass(className);
            this.nodeCreatorDiv.addClass("creation");
            
            this.nodeCreatorDiv.data('jsObject',this);

            this.illustration = illustration;
            this.nodeCreatorDiv.append(this.illustration);

            this.nodeCreatorDiv.draggable({
                appendTo: 'body',
                helper: 'clone',
                containment: '#editorDiv',
                scroll: false,
                cursor: 'move',
                revert: true
            });

            this.nodeGenerateFunction = nodeGenerateFunction;
    }

    getNodeCreatorDiv() { return this.nodeCreatorDiv; }
    generateNewNode() { return this.nodeGenerateFunction; }

}
module.exports = NodeCreator;