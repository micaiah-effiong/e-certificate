require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const serverProxy = require("http-proxy");
const server = http.createServer(app);
const path = require("path");
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const db = require("./models/index");
const { errorHandler } = require("./middlewares/index");
const indexRouter = require("./routes/index");
let fileStoreOptions = {};
const sess = {
	secret: `secret`,
	store: new FileStore(fileStoreOptions),
	resave: false,
	saveUninitialized: true,
};

// template engine set up
app.set("view engine", "ejs");

// middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.resolve(__dirname, "public", "build", "static")));

// mounting routes
app.use("/", indexRouter);

// errors
app.use(function (req, res) {
	res.status(404).send("File not found");
});

app.use(errorHandler);

// database connection
db.sequelize.sync({ force: false }).then(
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
	console.log("server shutting down normally");
	process.exit();
});

process.on("SIGINT", function () {
	console.log("Ctrl+C : shutting down server");
	process.exit(2);
});

process.on("uncaughtException", function () {
	console.log("server shutdown due to Uncaught Exception");
	process.exit(99);
});

module.exports = app;
