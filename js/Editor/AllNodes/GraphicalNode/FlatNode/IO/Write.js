var FlatNode = require('../../FlatNode.js');

let _nextEntityWrite = undefined;
class Write extends FlatNode {

    static get nextEntity(){ return _nextEntityWrite; }
    static set nextEntity(nextEnt){ _nextEntityWrite = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="write" && currentXml.attributes[0].name=="expression") {
            var newWrite = new Write();
            newWrite.setExpression(currentXml.attributes[0].value);
            var checkAdd = parentObject.addChildFirst(newWrite);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityWrite!=undefined) {
                _nextEntityWrite.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('Write');
        this.expression = $('<span class="quickEditable" contenteditable="true">_____</span>');
        
        this.textWrapper = $("<p></p>");
            this.textWrapper.append("<span>Write ( </span>");
            this.textWrapper.append(this.expression);
            this.textWrapper.append("<span> )</span>");

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('Write');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getExpression() { return this.expression.text(); }

    //Used when creating a node in a loading file context 
    setExpression(newExpression) { this.expression.text(newExpression); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var writeXml = xmlbuilder.create('write');
            writeXml.att('expression',this.expression.text());
        return writeXml;
    }

}
module.exports = Write;