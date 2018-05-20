var mongoose = require('mongoose');

var summarySchema = new mongoose.Schema({
	totalamount: Number,
	totaldebt: Number,
	customernum: Number,
	tdtransactionnum: Number,
	tdtotalamount: Number,
	today: String

}, {collection: 'summary'});

module.exports = summarySchema;
