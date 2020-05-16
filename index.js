require('dotenv').config();
const express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app),
  PORT = process.env.PORT || 3300,
  ejs = require('ejs'),
  cookieParser = require('cookie-parser'),
  db = require('./db/db'),
  stuDetails = require('./middlewares/user-details')(db),
  auth = require('./middlewares/authenticate')(db),
  certRoute = require('./routes/certificate'),
  courseRoute = require('./routes/course'),
  studentRoute = require('./routes/user');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use('/certificate', certRoute);
app.use('/user', studentRoute);

// routes
app.get('/', function(req, res){
	res.sendFile(`${__dirname}/public/certificate.html`);
});

app.post('/course/register', auth.authEmail, function(req, res){
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
	db.course.create(req.body).then(function(course){
		req.user.addCourse(course).then(function(){
			return course.reload();
		}).then(function(course){
			res.json(course.toJSON());
		}, function(e){
			res.status(500).send(e||null);
		});
	}, function(e){
		res.status(500).send(e||null);
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

// database connection
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
