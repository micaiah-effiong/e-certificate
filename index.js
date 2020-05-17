require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3300;
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const db = require('./db/db');
const stuDetails = require('./middlewares/user-details')(db);
const errorHandler = require('./middlewares/error-handler.js');
const auth = require('./middlewares/authenticate')(db);
const certRoute = require('./routes/certificate');
const courseRoute = require('./routes/course');
const studentRoute = require('./routes/user');

// template engine set up
app.set('view engine', 'ejs');

// middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// mounting routes
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

app.use(errorHandler);

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
