
var FlatNode = require('../../FlatNode.js');

let _nextEntityArrayDeclaration = undefined;
class ArrayDeclaration extends FlatNode {

    static get nextEntity(){ return _nextEntityArrayDeclaration; }
    static set nextEntity(nextEnt){ _nextEntityArrayDeclaration = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="arrayDeclaration" && currentXml.attributes[0].name=="variableName" && currentXml.attributes[1].name=="dimensionAndSize" && currentXml.attributes[2].name=="arrayType") {
            var newArrayDeclaration = new ArrayDeclaration();
            newArrayDeclaration.setVariableName(currentXml.attributes[0].value);
            newArrayDeclaration.setDimensionAndSize(currentXml.attributes[1].value);
            newArrayDeclaration.setArrayType(currentXml.attributes[2].value);
            var checkAdd = parentObject.addChildFirst(newArrayDeclaration);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityArrayDeclaration!=undefined) {
                _nextEntityArrayDeclaration.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('ArrayDeclaration');
        this.variableName = $('<span class="quickEditable" contenteditable="true">_____</span>');
        this.dimensionAndSize = $('<span class="quickEditable" contenteditable="true">_____</span>');
        this.arrayType = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.textWrapper = $("<p></p>");
            this.textWrapper.append("<span>var </span>");
            this.textWrapper.append(this.variableName);
            this.textWrapper.append("<span> = tableau </span>");
            this.textWrapper.append(this.dimensionAndSize);
            this.textWrapper.append("<span> de </span>");
            this.textWrapper.append(this.arrayType);

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('ArrayDeclaration');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getVariableName() { return this.variableName.text(); }
    getDimensionAndSize() { return this.dimensionAndSize.text(); }
    getArrayType() { return this.arrayType.text(); }

    //Used when creating a node in a loading file context 
    setVariableName(newVariableName) { this.variableName.text(newVariableName); }
    setDimensionAndSize(newDimensionAndSize) { this.dimensionAndSize.text(newDimensionAndSize); }
    setArrayType(newArrayType) { this.arrayType.text(newArrayType); }


    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var arrayDeclarationXml = xmlbuilder.create('arrayDeclaration');
            arrayDeclarationXml.att('variableName',this.variableName.text());
            arrayDeclarationXml.att('dimensionAndSize',this.dimensionAndSize.text());
            arrayDeclarationXml.att('arrayType',this.arrayType.text());
        return arrayDeclarationXml;
    }

}
module.exports = ArrayDeclaration;