var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
	customername: String,
	amount: Number,
	customerdebt: Number,
	setdate: String
}, {collection: 'transaction'});

module.exports = transactionSchema;