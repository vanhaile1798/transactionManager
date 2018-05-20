var mongoose = require('mongoose');

var transactionSchema = require('../schemas/transaction');

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;