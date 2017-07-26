var InclusiveNode = require('../../InclusiveNode.js');

let _nextEntityElse = undefined;
class Else extends InclusiveNode {

    static get nextEntity(){ return _nextEntityElse; }
    static set nextEntity(nextEnt){ _nextEntityElse = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="else") {
            var newElse = new Else();
            
            var checkAdd = parentObject.addChildFirst(newElse);
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
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newElse, currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityElse!=undefined) {
                _nextEntityElse.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('Else', ".SpVariableDeclaration, .ArrayDeclaration, .Assignment, .Read, .Write, .FunctionCall, .ProcedureCall, .SimpleLoop, .DoLoop, .If, .IfElse");
        
        this.headText = $("<p></p>");
            this.headText.html("Else");

        super.initialization(this.headText, null);

        super.getSurroundingDiv().addClass('Else');
        super.getSurroundingDiv().data('jsObject',this);
    }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var elseXml = xmlbuilder.create('else');
            
            for (var i=0; i < this.childsInstances.length; i++) {
                var elseChildXml = this.childsInstances[i].translateToXml();
                elseXml.importDocument(elseChildXml);
            }
            
        return elseXml;
    }

}
module.exports = Else;