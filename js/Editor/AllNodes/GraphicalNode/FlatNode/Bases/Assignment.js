var FlatNode = require('../../FlatNode.js');

let _nextEntityAssignment = undefined;
class Assignment extends FlatNode {

    static get nextEntity(){ return _nextEntityAssignment; }
    static set nextEntity(nextEnt){ _nextEntityAssignment = nextEnt; }

    static analyzeAndLoad(responsibilityChain, parentObject, currentXml){
        if(currentXml.nodeName=="assignment" && currentXml.attributes[0].name=="variableName" && currentXml.attributes[1].name=="expression") {
            var newAssignment = new Assignment();
            newAssignment.setVariableName(currentXml.attributes[0].value);
            newAssignment.setExpression(currentXml.attributes[1].value);
            var checkAdd = parentObject.addChildFirst(newAssignment);
            //addChildFirst retournera false si la class du nouveau noeud ne fait pas partie de celles accepté par le noeud parent
            if(checkAdd==false){
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
        else { //Si c'est pas ce noeud, on passe au suivant dans la chaine de responsabilité.
            //Vérifier si on a pas atteint le bout de la chaine de responsabilité.
            if(_nextEntityAssignment!=undefined) {
                _nextEntityAssignment.analyzeAndLoad(responsibilityChain, parentObject, currentXml);
            }
            else {
                var IncorrectXmlError = require('../../../../Errors/IncorrectXmlError.js');
                throw new IncorrectXmlError("None valid input file");
            }
        }
    }

    constructor() {
        super('Assignment');
        this.variableName = $('<span class="quickEditable" contenteditable="true">_____</span>');
        this.expression = $('<span class="quickEditable" contenteditable="true">_____</span>');

        this.textWrapper = $("<p></p>");
            this.textWrapper.append(this.variableName);
            this.textWrapper.append("<span> <-- </span>");
            this.textWrapper.append(this.expression);


        super.initialization(this.textWrapper);

        super.getSurroundingDiv().addClass('Assignment');
        super.getSurroundingDiv().data('jsObject',this);
    }

    getVariableName() { return this.variableName.text(); }
    getExpression() { return this.expression.text(); }

    //Used when creating a node in a loading file context 
    setVariableName(newVariableName) { this.variableName.text(newVariableName); }
    setExpression(newExpression) { this.expression.text(newExpression); }

    translateToXml() {
        var xmlbuilder = new require('xmlbuilder');
        var assignmentXml = xmlbuilder.create('assignment');
            assignmentXml.att('variableName',this.variableName.text());
            assignmentXml.att('expression',this.expression.text());
        return assignmentXml;
    }

}
module.exports = Assignment;