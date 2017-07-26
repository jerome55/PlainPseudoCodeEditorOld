var FlatNode = require('../../FlatNode.js');

let _nextEntityRead = undefined;
class Read extends FlatNode {

    static get nextEntity(){ return _nextEntityRead; }
    static set nextEntity(nextEnt){ _nextEntityRead = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="read" && currentXml.attributes[0].name=="variableName") {
            var newRead = new Read();
            newRead.setVariableName(currentXml.attributes[0].value);
            var checkAdd = parentObject.addChildFirst(newRead);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityRead!=undefined) {
                _nextEntityRead.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('Read');
        this.variableName = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.textWrapper = $("<p></p>");
            this.textWrapper.append("<span>Lire ( </span>");
            this.textWrapper.append(this.variableName);
            this.textWrapper.append("<span> )</span>");

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('Read');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getVariableName() { return this.variableName.text(); }

    //Used when creating a node in a loading file context 
    setVariableName(newVariableName) { this.variableName.text(newVariableName); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var readXml = xmlbuilder.create('read');
            readXml.att('variableName',this.variableName.text());
        return readXml;
    }

}
module.exports = Read;