
class ChildContainer {
    
    constructor(owner, _child) {
        this.owner = owner;
        this._child = _child;
        this.childContainerDiv = $("<div></div>"); 
            this.childContainerDiv.addClass("childContainer")
        
        this._childSurroundingDiv = _child.getSurroundingDiv();
            this.childContainerDiv.append(this._childSurroundingDiv);
        this.dropZoneAfterDiv = $("<div></div>");
            this.dropZoneAfterDiv.addClass("dropZone");
            this.childContainerDiv.append(this.dropZoneAfterDiv);
    
        //Droppable initializ
        var contextChildContainer = this;
        this.dropZoneAfterDiv.data('siblingContainer',this);
        this.dropZoneAfterDiv.droppable( {
            //ATTENTION ! Changement de context this devient dropZoneAfterDiv
            tolerance: 'pointer',
            accept: contextChildContainer.owner.getAutorizedChildTypes(),
            hoverClass: 'hovered',
            drop: contextChildContainer.handleDropZoneAfter
        });

    }

    getChild() { return this._child; }
    getChildContainerDiv() { return this.childContainerDiv; }
    getSurroundingDiv() { return this._childSurroundingDiv; }
    
    handleDropZoneAfter(event, ui) {
        console.log("Drag Drop Triggered");

        if(ui.draggable.hasClass("creation")) {
            var newNode = (ui.draggable.data('jsObject').generateNewNode())();
            $(this).data('siblingContainer').addSiblingAfterThis(newNode);
        }
        else {
            if(ui.draggable.data('jsObject') != $(this).data('siblingContainer').getChild())
            {
                ui.draggable.data('jsObject').getParentNode().deleteChild(ui.draggable.data('jsObject'));
                $(this).data('siblingContainer').addSiblingAfterThis(ui.draggable.data('jsObject'));
            }
        }
    }

    addSiblingAfterThis(_sibling) {
        this.owner.addChildAfter(this, _sibling);
    }
}
module.exports = ChildContainer;