var GraphicalNode = require('../GraphicalNode.js');

class FlatNode extends GraphicalNode {
    
    constructor(ElementClassName) {
        super(ElementClassName);
    }

    initialization(content) {
        super.getSurroundingDiv().append(content);
    }

    getSurroundingDiv() { return super.getSurroundingDiv(); }
}
module.exports = FlatNode;