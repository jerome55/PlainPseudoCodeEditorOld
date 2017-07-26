const ExtendableError = require("./ExtendableError.js");
class IncorrectXmlError extends ExtendableError
{
  constructor(m) {   
    super(m);
  }
}
module.exports = IncorrectXmlError;