var mongoose = require('mongoose');

var summarySchema = require('../schemas/summary');

var Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;