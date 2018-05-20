var router = require('express').Router();
var d = new Date().toDateString();
var Customer = require('../data/models/customer');

var Summary = require('../data/models/summary');

router.get('/', function(req, res, next) {

	/*Customer.find({})
			.exec(function(err, customers) {

				if (err) {
					next(err);
				}
				
				res.render('index', {date: d, customers: customers});
			});*/
	Summary.find({})
			.exec(function(err, summary) {
				if (err) {
					next(err);
				}

				res.render('index', {date:d, summary: summary});
			});
});

module.exports = router;