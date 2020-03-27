require('dotenv').config();
const express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  PORT = process.env.PORT || 3300,
  ejs = require('ejs'),
  db = require('./db/db'),
  pdf = require('./handlers/html-pdf'),
  mailer = require('./middlewares/mailer');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

// routes
app.get('/', function(req, res){
	res.send("<h1> working </h1>");
});

app.get('/certificate', function(req, res){
	res.sendFile(`${__dirname}/public/certificate.html`);
});

app.get('/certificate/get'/*/:id/:key*/, pdf, mailer, function(req, res){
	// run codes for sending files
	console.log('finished');
	res.send(req.userCertBuffer);

	// check and confirm user's registration key 
	// gather certifiicate details
	// render and create certificate pdf file /*if not already exist*/
	// 
	// if (req.params.id == "view") {
	// 	// render certificate
	// 	res.send('this is your certificate');
	// }else{
	// 	// download certificate
	// 	res./*download*/send('downloading certificate');
	// }
});

/*may not be used*/
app.get('/certificate/download', function(req, res){
	// run codes for sending files
	res./*download*/send('downloading certificate');
});

app.get('/certificate/verify', function(req, res){
	// verifying certification

	// check and confirm user's registration key 
	// gather user details
		// fullname
		// course of study
		// duration <optional>
		// date and time completed
	db.user.findOne({
		where: {
			regNo: req.query.key,
			completed: true
		}
	}).then(function(user){
		if (user) {
			return res.json(user.toJSON());
		}

		res.status(404).send();
	}, function(e){
		res.status(500).send();
	});
});

app.post('/register-course', function(req, res){
	// register user for course
	// firstname
	// last name
	// other names <optional>
	// email address
	// course of study
	// duration <optional>
	// 
	// genatrate
	// registration key
	// registration date
	// 
	db.user.createRegKey(req).then(function(){
		db.user.create(req.body).then(function(user){
			res.json(user.toJSON());
		}, function(){
			res.status(500).send();
		});
	}, function(){
		res.status(500).send();
	});
});

/*errors*/
app.use(function(req, res){
	res.status(404).send("File not found");
});

app.use(function(error, res, res, next){
	console.log(error);
	res.status(500).send();
});

// running
db.sequelize.sync({force: false}).then(function(){
	server.listen(PORT, function(){
		console.log(`server running on port ${PORT}`);
	});
}, function(e){
	console.error(e);
});

// exit
process.on('exit', function(){
	process.exit();
	console.log('server shutting down normally');
});

process.on('SIGINT', function(){
	console.log('Ctrl+C : shutting down server');
	process.exit(2);
});

process.on('uncaughtException', function(){
	process.exit(99);
	console.log('server shutdown due to Uncaught Exception');
});
