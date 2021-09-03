const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:49154/noderest');
mongoose.Promise = global.Promise;

module.exports = mongoose;