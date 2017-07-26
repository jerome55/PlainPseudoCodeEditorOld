var GraphicalNode = require('../../GraphicalNode.js');

let _nextEntityIfElse = undefined;
class IfElse extends GraphicalNode {
    
    static get nextEntity(){ return _nextEntityIfElse; }
    static set nextEntity(nextEnt){ _nextEntityIfElse = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="ifElse") {
            //Vérifier si y a bien le if et le else du ifElse et rien de plus.
            var ifChildNode = currentXml.childNodes[0];
            if(ifChildNode==undefined || ifChildNode.nodeName!="if") {
                var IncorrectXmlError = require('../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
            var elseChildNode = currentXml.childNodes[1];
            if(elseChildNode==undefined || elseChildNode.nodeName!="else") {
                var IncorrectXmlError = require('../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
            var unexpectedChildNode = currentXml.childNodes[2];
            if(unexpectedChildNode!=undefined) {
                var IncorrectXmlError = require('../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }

            var newIfElse = new IfElse();
            var checkAdd = parentObject.addChildFirst(newIfElse);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
            
            //Je parcours dans le sens inverse (du dernier au premiert) car cela me permet de réutiliser la fonction addFirstChild 
            //que j'ai déjà écrit.
            for(var i=ifChildNode.childNodes.length-1; i>=0; i--){
                var currentChildNode = ifChildNode.childNodes[i];
                if(currentChildNode != undefined){
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newIfElse.getIfComponent(), currentChildNode);
                }
            }
            //Je parcours dans le sens inverse (du dernier au premiert) car cela me permet de réutiliser la fonction addFirstChild 
            //que j'ai déjà écrit.
            for(var i=elseChildNode.childNodes.length-1; i>=0; i--){
                var currentChildNode = elseChildNode.childNodes[i];
                if(currentChildNode != undefined){
                    responsibilityChain.analyzeAndLoad(responsibilityChain, newIfElse.getElseComponent(), currentChildNode);
                }
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityIfElse!=undefined) {
                _nextEntityIfElse.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('IfElse');

        var If = require('../InclusiveNode/Conditions/If.js');
        this.ifComponent = new If();
            //Désactiver le draggable du If (hérité de GraphicalNode), on voudrait pas que l'utilisateur puisse voler le If de notre If/Else.
            this.ifComponent.getSurroundingDiv().draggable('disable');
            //Mettre le If/Else comme parent du If (je sais pas si c'est utile et si ca peut pas posser de problèmes).
            this.ifComponent.setParentNode(this);
            //Accorcher graphiquement le If comme enfant du If/Else.
            this.getSurroundingDiv().append(this.ifComponent.getSurroundingDiv());

        var Else = require('../InclusiveNode/Conditions/Else.js');
        this.elseComponent = new Else();
            //Désactiver le draggable du Else (hérité de GraphicalNode), on voudrait pas que l'utilisateur puisse voler le Else de notre If/Else.
            this.elseComponent.getSurroundingDiv().draggable('disable');
            //Mettre le If/Else comme parent du If (je sais pas si c'est utile et si ca peut pas posser de problèmes).
            this.elseComponent.setParentNode(this);
            //Accorcher graphiquement le Else comme enfant du If/Else.
            this.getSurroundingDiv().append(this.elseComponent.getSurroundingDiv());

        //Faire en sorte que la classe IfElse ai une propriete css qui fait une grosse ligne sur le coté du If et du Else pour donner un effet visuel pour assembler les deux ensemble
        super.getSurroundingDiv().addClass('IfElse');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getSurroundingDiv() { return super.getSurroundingDiv(); }
    getIfComponent() { return this.ifComponent; }
    getElseComponent() { return this.elseComponent; }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var ifElseXml = xmlbuilder.create('ifElse');
            
            var ifComponentXml = this.ifComponent.translateToXml();
            ifElseXml.importDocument(ifComponentXml);
            
            var elseComponentXml = this.elseComponent.translateToXml();
            ifElseXml.importDocument(elseComponentXml);
        
        return ifElseXml;
    }

}
module.exports = IfElse;