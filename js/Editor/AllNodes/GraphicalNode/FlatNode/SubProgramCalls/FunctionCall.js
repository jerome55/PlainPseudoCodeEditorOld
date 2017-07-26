var FlatNode = require('../../FlatNode.js');

let _nextEntityFunctionCall = undefined;
class FunctionCall extends FlatNode {

    static get nextEntity(){ return _nextEntityFunctionCall; }
    static set nextEntity(nextEnt){ _nextEntityFunctionCall = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="functionCall") {
            var newFunctionCall = new FunctionCall();
            
            var checkAdd = parentObject.addChildFirst(newFunctionCall);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityFunctionCall!=undefined)  {
                _nextEntityFunctionCall.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('FunctionCall');
        this.functionName = "";
        this.inputExpressionTextValue = "";
        this.outputTargetName = "";
        //SOLUTION D AFFICHAGE TEMPORAIRE
        //Essayer par la suite une div qui contient une image et du text positionné
        //en absolu par rapport à la div.
        this.textWrapper = $("<p></p>");

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('FunctionCall');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getFunctionName() { return this.functionName; }
    getInputExpressionTextValue() { return this.inputExpressionTextValue; }
    getOutputTargetName() { return this.outputTargetName; }
    setFunctionName(functionName) {
        this.functionName = functionName;
        this.textWrapper.html(this.outputTargetName+" <-- "+this.functionName+"( "+this.inputExpressionTextValue+" )"); 
    }
    setInputExpressionTextValue(inputExpressionTextValue) {
        this.inputExpressionTextValue = inputExpressionTextValue;
        this.textWrapper.html(this.outputTargetName+" <-- "+this.functionName+"( "+this.inputExpressionTextValue+" )");
    }
    setOutputTargetName(outputTargetName) {
        this.outputTargetName = outputTargetName;
        this.textWrapper.html(this.outputTargetName+" <-- "+this.functionName+"( "+this.inputExpressionTextValue+" )");
    }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var functionCallXml = xmlbuilder.create('functionCall');
        return functionCallXml;
    }

}
module.exports = FunctionCall;