var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntityProcedureDeclaration = undefined;
class ProcedureDeclaration extends InclusiveNode {

    static get nextEntity(){ return _nextEntityProcedureDeclaration; }
    static set nextEntity(nextEnt){ _nextEntityProcedureDeclaration = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="procedureDeclaration" && currentXml.attributes[0].name=="procedureName" && currentXml.attributes[1].name=="inputParameters") {
            var newProcedureDeclaration = new ProcedureDeclaration();
            newProcedureDeclaration.setProcedureName(currentXml.attributes[0].value);
            newProcedureDeclaration.setInputParameters(currentXml.attributes[1].value);
            var checkAdd = parentObject.addChildFirst(newProcedureDeclaration);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }

            //Je parcours dans le sens inverse (du dernier au premiert) car cela me permet de réutiliser la fonction addFirstChild 
            //que j'ai déjà écrit.
            for(var i=currentXml.childNodes.length-1; i>=0; i--){
                var currentChildNode = currentXml.childNodes[i];
                if(currentChildNode != undefined){
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newProcedureDeclaration, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityProcedureDeclaration!=undefined) {
                _nextEntityProcedureDeclaration.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('ProcedureDeclaration', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        
        this.procedureName = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.inputParameters = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.headText = $("<p></p>");
            this.headText.append("<span>Procedure </span>");
            this.headText.append(this.procedureName);
            this.headText.append("<span> ( </span>");
            this.headText.append(this.inputParameters);
            this.headText.append("<span> )</span>");
        this.footText = $("<p></p>");
            this.footText.html("return");

        super.initialization(this.headText, this.footText);

        super.getSurroundingDiv().addClass('ProcedureDeclaration');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getProcedureName() { return this.procedureName.text(); }
    getInputParameters() { return this.inputParameters.text(); }

    //Used when creating a node in a loading file context
    setProcedureName(newProcedureName) { this.procedureName.text(newProcedureName); }
    setInputParameters(newInputParameters) { this.inputParameters.text(newInputParameters); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var procedureDeclarationXml = xmlbuilder.create('procedureDeclaration');
            procedureDeclarationXml.att('procedureName',this.functionName.text());
            procedureDeclarationXml.att('inputParameters',this.inputParameters.text());
            
            for (var i=0; i < this.childsInstances.length; i++) {
                var procedureDeclarationChildXml = this.childsInstances[i].translateToXml();
                procedureDeclarationXml.importDocument(procedureDeclarationChildXml);
            }
            
        return procedureDeclarationXml;
    }

}
module.exports = ProcedureDeclaration;