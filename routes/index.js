var router = require('express').Router();
var d = new Date();
var customers = {};

router.get('/', function(req, res, next) {

	var customers = req.session.customers;
	console.log(customers);
	res.render('index', {date: d, customers: customers});
});

module.exports = router;