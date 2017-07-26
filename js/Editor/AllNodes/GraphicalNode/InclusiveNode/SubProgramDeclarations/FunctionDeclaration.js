var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntityFunctionDeclaration = undefined;
class FunctionDeclaration extends InclusiveNode {

    static get nextEntity(){ return _nextEntityFunctionDeclaration; }
    static set nextEntity(nextEnt){ _nextEntityFunctionDeclaration = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="functionDeclaration" && currentXml.attributes[0].name=="functionName" && currentXml.attributes[1].name=="inputParameters" && currentXml.attributes[2].name=="returnType" && currentXml.attributes[3].name=="returnValue") {
            var newFunctionDeclaration = new FunctionDeclaration();
            newFunctionDeclaration.setFunctionName(currentXml.attributes[0].value);
            newFunctionDeclaration.setInputParameters(currentXml.attributes[1].value);
            newFunctionDeclaration.setReturnType(currentXml.attributes[2].value);
            newFunctionDeclaration.setReturnValue(currentXml.attributes[3].value);
            var checkAdd = parentObject.addChildFirst(newFunctionDeclaration);
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
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newFunctionDeclaration, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityFunctionDeclaration!=undefined) {
                _nextEntityFunctionDeclaration.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('FunctionDeclaration', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        
        this.functionName = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.inputParameters = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.returnType = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.returnValue = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.headText = $("<p></p>");
            this.headText.append("<span>Function </span>");
            this.headText.append(this.functionName);
            this.headText.append("<span> ( </span>");
            this.headText.append(this.inputParameters);
            this.headText.append("<span> ) : </span>");
            this.headText.append(this.returnType);
        this.footText = $("<p></p>");
            this.footText.append("<span>return ( </span>");
            this.footText.append(this.returnTextValue);
            this.footText.append("<span> )</span>");

        super.initialization(this.headText, this.footText);

        super.getSurroundingDiv().addClass('FunctionDeclaration');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getFunctionName() { return this.functionName.text(); }
    getInputParameters() { return this.inputParameters.text(); }
    getReturnType() { return this.returnType.text(); }
    getReturnValue() { return this.returnValue.text(); }

    //Used when creating a node in a loading file context 
    setFunctionName(newFunctionName) { this.functionName.text(newFunctionName); }
    setInputParameters(newInputParameters) { this.inputParameters.tex(newInputParameters); }
    setReturnType(newReturnType) { this.returnType.text(newReturnType); }
    setReturnValue(newReturnValue) { this.returnValue.text(newReturnValue); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var functionDeclarationXml = xmlbuilder.create('functionDeclaration');
            functionDeclarationXml.att('functionName',this.functionName.text());
            functionDeclarationXml.att('inputParameters',this.inputParameters.text());
            functionDeclarationXml.att('returnType',this.returnType.text());
            functionDeclarationXml.att('returnValue',this.returnValue.text());
            
            for (var i=0; i < this.childsInstances.length; i++) {
                var functionDeclarationChildXml = this.childsInstances[i].translateToXml();
                functionDeclarationXml.importDocument(functionDeclarationChildXml);
            }
            
        return functionDeclarationXml;
    }

}
module.exports = FunctionDeclaration;