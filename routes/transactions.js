var router = require('express').Router();

var count = 0;
var transactions = [];
var date = new Date();
var amount = [];
var customername = [];
var totalAmount = [];
var customer = {};

router.get('/', function(req, res, next) {
	console.log('transactions: ', transactions);
	for (var name in customername) {
		customer[customername[name]] = totalAmount[name];
	}
	req.session.customer = customer;
	res.render('transactions', {transactions: transactions});
});

router.get('/new', function(req, res, next) {
	res.render('transactionNew');
});

router.post('/', function(req, res, next) {

	transactions[count] = req.body;


	if (customername.length === 0) {
		customername[count] = req.body.customername;
		totalAmount[count] = parseInt(req.body.amount);
	} else {
		for (var name in customername) {
			if (customername[name] === req.body.customername) {
				totalAmount[name] += parseInt(req.body.amount);
				result = true;
			} else {
				result = false;
			}
		}
		if (result === false) {
			totalAmount[customername.length] = parseInt(req.body.amount);
			customername[customername.length] = req.body.customername;
		}

	}

	if (transactions[count].setdate === '') {
		console.log('today');
		transactions[count].createddate = date.toDateString();	
	} else {
		console.log('not today');
		date.setDate(parseInt(transactions[count].setdate));
		transactions[count].createddate = date.toDateString();
	}
	count++;
	date = new Date();
	res.redirect('/transactions');
});

router.post('/delete/:transaction', function(req, res, next) {
	transactions.splice(parseInt(req.params.transaction), 1);
	res.redirect('/transactions');
});

module.exports = router;