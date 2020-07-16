require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const serverProxy = require("http-proxy");
const server = http.createServer(app);
const PORT = process.env.PORT || 3300;
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const db = require("./models/index");
const stuDetails = require("./middlewares/user-details")(db);
const errorHandler = require("./middlewares/error-handler.js");
const auth = require("./middlewares/authenticate")(db);
const indexRouter = require("./routes/index");
let fileStoreOptions = {};
const sess = {
	secret: `secret`,
	store: new FileStore(fileStoreOptions),
	resave: false,
	saveUninitialized: false,
};

// template engine set up
app.set("view engine", "ejs");

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/assets", auth.authToken, express.static(__dirname + "/public"));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));

// mounting routes
app.use("/", indexRouter);

// routes
app.get("/", function (req, res) {
	res.sendFile(`${__dirname}/public/index.html`);
});

/*errors*/
app.use(function (req, res) {
	res.status(404).send("File not found");
});

app.use(errorHandler);

// database connection
db.sequelize.sync({ force: true }).then(
	function () {
		if (process.env.NODE_ENV == "development") {
			serverProxy
				.createProxyServer({
					target: "http://localhost:" + PORT,
					autoRewrite: true,
					hostRewrite: true,
				})
				.listen(80);
		}
		server.listen(PORT, function () {
			console.log(`server running on port ${PORT}`);
		});
	},
	function (e) {
		console.error(e);
	}
);

// exit
process.on("exit", function () {
	process.exit();
	console.log("server shutting down normally");
});

process.on("SIGINT", function () {
	console.log("Ctrl+C : shutting down server");
	process.exit(2);
});

process.on("uncaughtException", function () {
	process.exit(99);
	console.log("server shutdown due to Uncaught Exception");
});
