const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:49153/noderest');
mongoose.Promise = global.Promise;

module.exports = mongoose;