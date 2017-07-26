var FlatNode = require('../../FlatNode.js');

let _nextEntityProcedureCall = undefined;
class ProcedureCall extends FlatNode {

    static get nextEntity(){ return _nextEntityProcedureCall; }
    static set nextEntity(nextEnt){ _nextEntityProcedureCall = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="procedureCall") {
            var newProcedureCall = new ProcedureCall();
            
            var checkAdd = parentObject.addChildFirst(newProcedureCall);
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityProcedureCall!=undefined) {
                _nextEntityProcedureCall.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('ProcedureCall');
        this.procedureName = "";
        this.inputExpressionTextValue = "";
        this.outputParametersNames = "";
        //SOLUTION D AFFICHAGE TEMPORAIRE
        //Essayer par la suite une div qui contient une image et du text positionné
        //en absolu par rapport à la div.
        this.textWrapper = $("<p></p>");

        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('ProcedureCall');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getProcedureName() { return this.procedureName; }
    getInputExpressionTextValue() { return this.inputExpressionTextValue; }
    getOutputParametersNames() { return this.outputParametersNames; }
    setProcedureName(procedureName) {
        this.procedureName = procedureName;
        this.textWrapper.html(this.procedureName+"( "+this.inputExpressionTextValue+" ) --> "+this.outputParametersNames);
    }
    setInputExpressionTextValue(inputExpressionTextValue) {
        this.inputExpressionTextValue = inputExpressionTextValue;
        this.textWrapper.html(this.procedureName+"( "+this.inputExpressionTextValue+" ) --> "+this.outputParametersNames);
    }
    setOutputParametersNames(outputParametersNames) {
        this.outputParametersNames = outputParametersNames;
        this.textWrapper.html(this.procedureName+"( "+this.inputExpressionTextValue+" ) --> "+this.outputParametersNames);
    }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var procedureCallXml = xmlbuilder.create('procedureCall');
        return procedureCallXml;
    }

}
module.exports = ProcedureCall;