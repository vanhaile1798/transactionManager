var router = require('express').Router();

var Transaction = require('../data/models/transaction');

var Customer = require('../data/models/customer');

var Summary = require('../data/models/summary');

var date = new Date();

var summaryinit = {
	totalamount: 0,
	totaldebt: 0,
	customernum: 0,
	tdtransactionnum: 0,
	tdtotalamount: 0,
	today: date.toDateString()
};

/*
var count = 0;
var transactions = [];
var date = new Date();
var amount = [];
var customername = [];
var totalAmount = [];
var customer = {};
*/
router.get('/', function(req, res, next) {
	/*console.log('transactions: ', transactions);
	for (var name in customername) {
		customer[customername[name]] = totalAmount[name];
	}
	req.session.customer = customer;*/
	Summary.count(function(err, num) {
		console.log(num);
		if (num === 0) {
			Summary.create(summaryinit, function(err) {
				if (err) {
					next(err);
				}
				
			});
		} else {
			console.log(num);
			Summary.find({}).exec(function(err, doc) {
					if (err) {
						next(err);
					}
					document = doc[0];
					Customer.count(function(err, num) {
						if (err) {
							next(err);
						}
						console.log(num);
						if (num > 0) {
							document.customernum = num;
							document.save();
						}
					});
			});
		}
		/* else {
			Summary.find({}, function(err, doc) {
				if (err) {
					next(err);
				}
			console.log(num);
			});
		}*/
	});
	/*Summary.find({}, function(err, doc) {
		if (err) {
			next(err);
		}
		document = doc[0];

		Customer.count(function(err, num) {
		if (err) {
			next(err);
		}
		document.customernum = num;
		document.save();
		});
	});*/

	Transaction.find({})
				.exec(function(err, transactions) {

					if (err) {
						next(err);
					}
					res.render('transactions', {transactions: transactions});
				});
});

router.get('/new', function(req, res, next) {
	res.render('transactionNew');
});

router.post('/', function(req, res, next) {

	var date = new Date();

	console.log('Request body: ', req.body);
	/*transactions[count] = req.body;


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
	count++;*/

	if (req.body.setdate === '') {
		req.body.setdate = date.toDateString();
	} else {
		date.setDate(parseInt(req.body.setdate));
		req.body.setdate = date.toDateString();
	}
	console.log(req.body.setdate);

	Customer.findOne({customername: req.body.customername}, function(err, document) {
		if (err) {
			next(err);
		}

		if (!document) {
			Customer.create(req.body, function(err) {
				if (err) {
					next(err);
				}
			});
		} else {
			document.amount = parseInt(document.amount) + parseInt(req.body.amount);
			document.customerdebt = parseInt(document.customerdebt) + parseInt(req.body.customerdebt);
			document.save();
		}
	});
	Summary.find({}, function(err, doc) {
		if (err) {
			next(err);
		}
		document = doc[0];
		document.totalamount = parseInt(document.totalamount) + parseInt(req.body.amount);
		document.totaldebt = parseInt(document.totaldebt) + parseInt(req.body.customerdebt);
	
			/*if (document.today !== req.body.setdate) {
				document.today = req.body.setdate;
				document.tdtotalamount = 0;
				document.tdtotalamount += parseInt(req.body.amount);
				document.tdtransactionnum = 0;
				document.tdtransactionnum++;
			} else {
				document.tdtotalamount += parseInt(req.body.amount);
				document.tdtransactionnum++;
			}*/
		if (document.today === req.body.setdate) {
			document.tdtotalamount += parseInt(req.body.amount);
			document.tdtransactionnum = document.tdtransactionnum + 1;
		}
		document.save();
	});
	Transaction.create(req.body, function(err) {
			if (err) {
					next(err);
				}

			res.redirect('/transactions');
	});
});

router.post('/delete/:transaction', function(req, res, next) {
	// transactions.splice(parseInt(req.params.transaction), 1);
	res.redirect('/transactions');
});

module.exports = router;