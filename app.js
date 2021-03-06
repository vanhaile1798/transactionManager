var dbURL = 'mongodb://vanhaile:12345678@ds229450.mlab.com:29450/transactionmanager';
// var dbURL = 'mongodb://127.0.0.1:27017/transaction';
var db = require('mongoose').connect(dbURL);
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

var index = require('./routes/index');
var customers = require('./routes/customers');
var transactions = require('./routes/transactions');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
	secret: 'my string',
	cookie: {
		maxAge: null
	},
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/customers', customers);
app.use('/transactions', transactions);

app.listen(process.env.PORT || 3030, function() {
	console.log('Server is listening on port 3030');
});