var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntityIf = undefined;
class If extends InclusiveNode {

    static get nextEntity(){ return _nextEntityIf; }
    static set nextEntity(nextEnt){ _nextEntityIf = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="if" && currentXml.attributes[0].name=="conditionExpression") {
            var newIf = new If();
            newIf.setConditionExpression(currentXml.attributes[0].value);
            var checkAdd = parentObject.addChildFirst(newIf);
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
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newIf, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityIf!=undefined) {
                _nextEntityIf.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('If', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        
        this.conditionExpression = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.headText = $("<p></p>");
            this.headText.append("<span>If ( </span>");
            this.headText.append(this.conditionExpression);
            this.headText.append("<span> )</span>");

        super.initialization(this.headText, null);

        super.getSurroundingDiv().addClass('If');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getConditionExpression() { return this.conditionExpression.text(); }

    //Used when creating a node in a loading file context 
    setConditionExpression(newConditionExpression) { this.conditionExpression.text(newConditionExpression); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var ifXml = xmlbuilder.create('if');
            ifXml.att('conditionExpression',this.conditionExpression.text());
            
            for (var i=0; i < this.childsInstances.length; i++) {
                var ifChildXml = this.childsInstances[i].translateToXml();
                ifXml.importDocument(ifChildXml);
            }
            
        return ifXml;
    }

}
module.exports = If;