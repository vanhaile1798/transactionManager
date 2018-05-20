var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
	customername: String,
	amount: Number,
	customerdebt: Number
}, {collection: 'customer'});

module.exports = customerSchema;