var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntityDoLoop = undefined;
class DoLoop extends InclusiveNode {

    static get nextEntity(){ return _nextEntityDoLoop; }
    static set nextEntity(nextEnt){ _nextEntityDoLoop = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if( (currentXml.nodeName=="doWhile"||currentXml.nodeName=="doUntil") && currentXml.attributes[0].name=="conditionExpression") {
            var newDoLoop = undefined;
            var DoLoopTypes = require('./DoLoopTypes.js');
            if(currentXml.nodeName=="doWhile"){ newDoLoop = new DoLoop(DoLoopTypes.DoWhile); }
            else{ newDoLoop = new DoLoop(DoLoopTypes.DoUntil); }
            newDoLoop.setConditionExpression(currentXml.attributes[0].value);
            var checkAdd = parentObject.addChildFirst(newDoLoop);
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
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newDoLoop, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityDoLoop!=undefined) {
                _nextEntityDoLoop.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor(doLoopType) {
        super('DoLoop', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        this.doLoopType = doLoopType;
        
        this.conditionExpression = $('<span class="quickEditable" contenteditable="true">_____</span>');
        
        this.headText = $("<p></p>");
            this.headText.html(""+this.doLoopType.TopText);
        this.footText = $("<p></p>");
            this.footText.append(this.doLoopType.BottomText);
            this.footText.append("<span> ( </span>");
            this.footText.append(this.conditionExpression);
            this.footText.append("<span> )</span>");

        super.initialization(this.headText, this.footText);

        super.getSurroundingDiv().addClass('DoLoop');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getDoLoopType() { return this.doLoopType; }
    getConditionExpression() { return this.conditionExpression.text(); }

    //Used when creating a node in a loading file context 
    setDoLoopType(newDoLoopType) { this.doLoopType = newDoLoopType; }
    setConditionExpression(newConditionExpression) { this.conditionExpression.text(newConditionExpression); }

    translateToXml() {
        var DoLoopTypes = require('./DoLoopTypes.js');
        
        var xmlbuilder = new require('xmlbuilder');
        var doLoopXml = undefined;
        if(this.doLoopType == DoLoopTypes.DoWhile){
            doLoopXml = xmlbuilder.create('doWhile');
        }
        else if(this.doLoopType == DoLoopTypes.DoUntil){
            doLoopXml = xmlbuilder.create('doUntil');
        }
        else{ console.log("Une erreure est survenue dans le translate xml de doLoop"); }

            doLoopXml.att('conditionExpression',this.conditionExpression.text());
            
            for (var i=0; i < this.childsInstances.length; i++) {
                var doLoopChildXml = this.childsInstances[i].translateToXml();
                doLoopXml.importDocument(doLoopChildXml);
            }

        return doLoopXml;
    }

}
module.exports = DoLoop;