var mongoose = require('mongoose');

var customerSchema = require('../schemas/customer');

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;