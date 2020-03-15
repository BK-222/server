exports.indexGet = (req, res, next) => {
	res.render('index.ejs') //renders the view

	// res.status(200).json({
	// 	message: 'Hi there'
	// });

	//res.send('String message');
}