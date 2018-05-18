var router = require('express').Router();

var customers = {};
var date = new Date();

router.get('/', function(req, res, next) {
	console.log(req.session.customer);
	res.render('customers', {customers: customers});
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
	delete customers[req.params.customername];
	res.redirect('/customers');
});

module.exports = router;