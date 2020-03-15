const express = require('express');
const app = express();

const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');

const indexRoutes = require('./api/routes/index.js');


// mongoose.connect('mongodb://127.0.0.1:27017/mangaStore', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
} //might be required to move to another place

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is working!');
});

setTimeout(() => {
console.log(mongoose.connection.readyState);
}, 1000);


app.set('view engine', 'ejs'); //sets the view engine like ejs/puck
app.set('views', __dirname + '/views'); //where views are coming from and are put
app.set('layout', 'layouts/layout.ejs'); //every file is put here, won't have to duplicate (header/footer)
app.use(expressLayouts); //using the express layout
app.use(express.static('public')); //where are our public files are (js/style/images)

//public folder - public views
//views folder - server-rendered views

app.use('/', indexRoutes);

app.use('/', (req, res, next) => {
	const error = new Error('Uh oh! Looks like nothing is here.');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		Friendly_Store_Employee: error.message
	});
});

module.exports = app;