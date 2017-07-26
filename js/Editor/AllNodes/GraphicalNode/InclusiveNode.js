var GraphicalNode = require('../GraphicalNode.js');

class InclusiveNode extends GraphicalNode {
    
    constructor(ElementClassName, autorizedChildTypes) {
        super(ElementClassName);

        console.log("inclusiveNode.js import childContainer.js Test");
        var ChildContainer = require('./ChildContainer.js');
        console.log("inclusiveNode.js import childContainer.js OK");


        this.autorizedChildTypes = autorizedChildTypes;

        this.childsInstances = new Array();
        
        this.dropZoneInsideDiv = $("<div></div>");
            this.dropZoneInsideDiv.addClass("dropZone");

        this.insideDiv = $("<div></div>");
            this.insideDiv.addClass("insideDiv");
          
        var contextInclusiveNode = this;
        this.dropZoneInsideDiv.data('futurParent', this);
        this.dropZoneInsideDiv.droppable({
            //Attention au changement de context ici. This correspond a dropZoneInsideDiv ici.
            tolerance: 'pointer',
            accept: contextInclusiveNode.autorizedChildTypes,
            hoverClass: 'hovered',
            drop: contextInclusiveNode.handleDropZoneInside
        });
    }

    handleDropZoneInside(event, ui) {
        console.log("Drag Drop Triggered");

        if(ui.draggable.hasClass("creation")) {
            var newNode = (ui.draggable.data('jsObject').generateNewNode())();
            $(this).data('futurParent').addChildFirst(newNode);
        }
        else {
            ui.draggable.data('jsObject').getParentNode().deleteChild(ui.draggable.data('jsObject'));
            $(this).data('futurParent').addChildFirst(ui.draggable.data('jsObject'));
        }
    }

    getAutorizedChildTypes() { return this.autorizedChildTypes; }
    getSurroundingDiv() { return super.getSurroundingDiv(); }
    getDropZoneInsideDiv() { return this.dropZoneInsideDiv; }

    initialization(header, footer) {
        if(header != null) { super.getSurroundingDiv().append(header); }
        super.getSurroundingDiv().append(this.dropZoneInsideDiv);
        super.getSurroundingDiv().append(this.insideDiv);
        if(footer != null) { super.getSurroundingDiv().append(footer); }
    }

    addChildFirst(_child) { 
        //On revérifie que le type du nouvel enfant est bien accepté par le parent (utile lors du chargement de fichier) 
        if(this.autorizedChildTypes.indexOf("."+_child.getElementClassName()) != -1) {
            //Ajouter l'instance au tableau des instances
            //unshift = remplissage par la gauche
            this.childsInstances.unshift(_child);
            //Mettre le parent de _child a this
            _child.setParentNode(this);
            //Créer un ChildContainer pour y stocker _child
            var ChildContainer = require('./ChildContainer.js');
            var newChildContainer = new ChildContainer(this,_child);
            //Ajouter le ChildContainer dans le DOM
            this.insideDiv.prepend(newChildContainer.getChildContainerDiv());
            return true;
        }
        else {
            return false;
        }
    }

    addChildAfter(_afterThisOne, _child) {
        //On revérifie que le type du nouvel enfant est bien accepté par le parent (utile lors du chargement de fichier) 
        if(this.autorizedChildTypes.indexOf("."+_child.getElementClassName()) != -1) {
            //Ajouter l'instance au tableau des instances
            //splice permet d'inserer et/ou de supprimer suivant les paramètres
            var index = this.childsInstances.indexOf(_afterThisOne.getChild());
            if(index > -1) {
                this.childsInstances.splice(index+1, 0, _child);

                //Mettre le parent de _child a this
                _child.setParentNode(this);
                //Créer un ChilderContainer pour y stocker _child
                var ChildContainer = require('./ChildContainer.js');
                var newChildContainer = new ChildContainer(this, _child);
                //Ajouter le ChildContainer dans le DOM 
                _afterThisOne.getSurroundingDiv().parent().after(newChildContainer.getChildContainerDiv());
            }
            return true;
        }
        else {
            return false;
        }
            
    } 

    deleteChild(_child) {
        //Retirer l'instance du tableau des instances
        var index = this.childsInstances.indexOf(_child);
        if(index > -1) {
            this.childsInstances.splice(index,1);

            //Mettre le parent de _child a null
            _child.setParentNode(null);
            //Récuperer le ChildContainer qui contient _child
            var childContainerToDelete = _child.getSurroundingDiv().parent();
            //Détacher le _child du DOM
            _child.getSurroundingDiv().detach();
            //Détacher le ChildContainer du DOM
            childContainerToDelete.detach();
        }
    }

}
module.exports = InclusiveNode;