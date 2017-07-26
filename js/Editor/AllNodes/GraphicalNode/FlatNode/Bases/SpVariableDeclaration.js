var FlatNode = require('../../FlatNode.js');

let _nextEntitySpVariableDeclaration = undefined;
class SpVariableDeclaration extends FlatNode {

    static get nextEntity(){ return _nextEntitySpVariableDeclaration; }
    static set nextEntity(nextEnt){ _nextEntitySpVariableDeclaration = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="spVariableDeclaration" && currentXml.attributes[0].name=="variableName" && currentXml.attributes[1].name=="variableType") {
            var newSpVariableDeclaration = new SpVariableDeclaration();
            newSpVariableDeclaration.setVariableName(currentXml.attributes[0].value);
            newSpVariableDeclaration.setVariableType(currentXml.attributes[1].value);
            var checkAdd = parentObject.addChildFirst(newSpVariableDeclaration);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntitySpVariableDeclaration!=undefined) {
                _nextEntitySpVariableDeclaration.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('SpVariableDeclaration');
        this.variableName = $('<span class="quickEditable" contenteditable="true">_____</span>');
        this.variableType = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.textWrapper = $("<p></p>");
            this.textWrapper.append("<span>var </span>");
            this.textWrapper.append(this.variableName);
            this.textWrapper.append("<span> : </span>");
            this.textWrapper.append(this.variableType);

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('SpVariableDeclaration');
        super.getSurroundingDiv().data('jsObject',this);
    }
 
    getVariableName() { return this.variableName.text(); }
    getVariableType() { return this.typeTextValue.text(); }

    //Used when creating a node in a loading file context 
    setVariableName(newVariableName) { this.variableName.text(newVariableName); }
    setVariableType(newVariableType) { this.variableType.text(newVariableType); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var spVariableDeclarationXml = xmlbuilder.create('spVariableDeclaration');
            spVariableDeclarationXml.att('variableName',this.variableName.text());
            spVariableDeclarationXml.att('variableType',this.variableType.text());
        return spVariableDeclarationXml;
    }

}
module.exports = SpVariableDeclaration;