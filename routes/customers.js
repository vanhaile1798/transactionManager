var router = require('express').Router();

var Customer = require('../data/models/customer');

var customers = {};
var date = new Date();

router.get('/', function(req, res, next) {
	Customer.find({})
			.sort({customername: 1})
			.exec(function(err, customers) {
				if (err) {
					next(err);
				}
				res.render('customers', {customers: customers});
			});
	// console.log(req.session.customer);
});

router.get('/new', function(req, res, next) {
	res.render('customerNew');
});

router.post('/', function(req, res, next) {
	customers[req.body.customername] = req.body;
	if (customers[req.body.customername].setdate === '') {
		console.log('today');
		customers[req.body.customername].createddate = date.toDateString();	
	} else {
		console.log('not today');
		date.setDate(parseInt(customers[req.body.customername].setdate));
		customers[req.body.customername].createddate = date.toDateString();
	}
	date = new Date();
	res.redirect('/customers');
});

router.post('/delete/:customername', function(req, res, next) {
	// delete customers[req.params.customername];
	res.redirect('/customers');
});

module.exports = router;