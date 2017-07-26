var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntitySimpleLoop = undefined;
class SimpleLoop extends InclusiveNode {

    static get nextEntity(){ return _nextEntitySimpleLoop; }
    static set nextEntity(nextEnt){ _nextEntitySimpleLoop = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if( (currentXml.nodeName=="while"||currentXml.nodeName=="until") && currentXml.attributes[0].name=="conditionExpression") {
            var newSimpleLoop = undefined;
            var SimpleLoopTypes = require('./SimpleLoopTypes.js');
            if(currentXml.nodeName=="while"){ newSimpleLoop = new SimpleLoop(SimpleLoopTypes.While); }
            else{ newSimpleLoop = new SimpleLoop(SimpleLoopTypes.Until); }
            newSimpleLoop.setConditionExpression(currentXml.attributes[0].value);
            var checkAdd = parentObject.addChildFirst(newSimpleLoop);
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
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newSimpleLoop, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntitySimpleLoop!=undefined) {
                _nextEntitySimpleLoop.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor(simpleLoopType) {
        super('SimpleLoop', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        this.simpleLoopType = simpleLoopType;
        
        this.conditionExpression = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.headText = $("<p></p>");
            this.headText.append(this.simpleLoopType);
            this.headText.append("<span> ( </span>");
            this.headText.append(this.conditionExpression);
            this.headText.append("<span> )</span>");
            
        super.initialization(this.headText, null);

        super.getSurroundingDiv().addClass('SimpleLoop');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getSimpleLoopType() { return this.simpleLoopType; }
    getConditionExpression() { return this.conditionExpression.text(); }

    //Used when creating a node in a loading file context 
    setSimpleLoopType(newSimpleLoopType) { this.simpleLoopType.text(newSimpleLoopType); }
    setConditionExpression(newConditionExpression) { this.conditionExpression.text(newConditionExpression); }

    translateToXml() {
        var SimpleLoopTypes = require('./SimpleLoopTypes.js');
        
        var xmlbuilder = new require('xmlbuilder');
        var simpleLoopXml = undefined;
        if(this.simpleLoopType == SimpleLoopTypes.While){
            simpleLoopXml = xmlbuilder.create('while');
        }
        else if(this.simpleLoopType == SimpleLoopTypes.Until){
            simpleLoopXml = xmlbuilder.create('until');
        }
        else{ console.log("Une erreure est survenue dans le translate xml de simpleLoop"); }
            
            simpleLoopXml.att('conditionExpression',this.conditionExpression.text());

            for (var i=0; i < this.childsInstances.length; i++) {
                var simpleLoopChildXml = this.childsInstances[i].translateToXml();
                simpleLoopXml.importDocument(simpleLoopChildXml);
            }

        return simpleLoopXml;
    }

}
module.exports = SimpleLoop;