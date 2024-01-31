//--------------------------------------------------
// REQUIRES SECTION
//--------------------------------------------------

// load env vars for the rest of the files in the project 
const dotenv = require('dotenv').config()

// import required modules
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// import module for real time WebSockets
const socketIo = require('socket.io');


// import function to connect to DB 
const { connectDB } = require('./db');

// load routes
////const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const apiRoutes = require('./routes/apiRoutes');
const questionRoutes = require('./routes/questionRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const userRoutes = require('./routes/userRoutes');

//API and token related imports
const { resetTokenTriviaApi } = require('./utils/urlApiUtils');

//--------------------------------------------------
// SERVER CONFIG / INSTANCE SECTION
//--------------------------------------------------

// create an express instance 
const app = express();
// use body parser to process data from forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//set js folder as static folder for js files
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// allow cookie transfer to auth users
const corsOptions = {
	origin: ['http://localhost'],
	credentials: true,
};

app.use(cors(corsOptions));



// config to use static files from public folder
app.use('/public', express.static('public'));

// create http server
const server = http.createServer(app);
// link server to socketio
const io = socketIo(server);

//--------------------------------------------------
//  DB SECTION
//--------------------------------------------------

// obtain the arguments passed to the script
const args = process.argv.slice(2);

// verify if the local environment is set
const isLocalEnvironment = args.includes('--env=local');

if (isLocalEnvironment) {
	console.log('Setting database for local environment...⌛');
	connectDB(process.env.MONGODB_SERVER_LOCAL, process.env.MONGODB_URL_LOCAL, process.env.MONGODB_PORT_LOCAL);
} else {
	console.log('Setting database for mongodb atlas...⌛');
	// connect to DB
	connectDB(process.env.MONGODB_SERVER, process.env.MONGODB_URL);
}


//--------------------------------------------------
// ROUTES SECTION
//--------------------------------------------------

// set the default entry point in web browser
app.use('/', homeRoutes);

// set default entry point for API
app.use('/api', apiRoutes);

// set default entry point for questions from the clientside
app.use('/questions', questionRoutes);

// set default entry point for scores from the clientside
app.use('/scoreboard', scoreRoutes);

// set default entry point for users from the clientside
app.use('/users', userRoutes);

//--------------------------------------------------
// INIT SERVER SECTION
//--------------------------------------------------

//define port for server 
const PORT = process.env.PORT || 3000;

// start server to listen connections on designed port 
server.listen(PORT, () => {
	resetTokenTriviaApi();

	console.log(`✅ Server innitiated in port ${PORT}`);
});
