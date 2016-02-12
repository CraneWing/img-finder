var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	dotenv      = require('dotenv'),
	routes 		= require('./app/routes/routes.js'),
	Search	    = require('./app/models/search.js'),
	app 		= express();

dotenv.load();
app.use('/public', express.static(process.cwd() + '/public'));
mongoose.connect('mongodb://localhost/urls');
app.use(routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js started on port ' + port);
});
