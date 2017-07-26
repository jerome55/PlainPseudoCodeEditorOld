
class GraphicalNode {
    
    constructor(ElementClassName) {
        this.parentInstance = null;
        this.elementClassName = ElementClassName;

        this.surroundingDiv = $("<div></div>");
            this.surroundingDiv.addClass("surroundingDiv");

        this.surroundingDiv.draggable({
            //containment: 'rootDiv',// Ce paramètre restraint la zone dans 
            //laquelle le drag&drop fonctionnera.
            /*stack: ''*/ // A REVOIR PLUS TARD CERTAINEMENT
            cursor: 'move',
            revert: true
        }).click(function(){
            $(this).draggable({ disabled: false });
        }).dblclick(function(){
            $(this).draggable({ disabled: true });
        });
    }

    getParentNode() { return this.parentNode; }
    setParentNode(parentNode) { this.parentNode = parentNode; }

    getElementClassName() { return this.elementClassName; }

    getSurroundingDiv() { return this.surroundingDiv; }

}
module.exports = GraphicalNode;