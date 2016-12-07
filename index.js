var reduxGenerator = require('./reduxGenerator');
var webservices    = require('./webservices');


module.exports = {
  reduxGenerator: reduxGenerator,
  webservices: webservices,
};

for (var c in constants) {
  module.exports[c] = constants[c];
}
