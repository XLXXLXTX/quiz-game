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

// connect to DB
connectDB();

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

// config routes for the app, from the file userRoutes.js  
//app.use('/api/users', userRoutes);


//--------------------------------------------------
// INIT SERVER SECTION
//--------------------------------------------------

//define port for server 
const PORT = process.env.PORT || 3000;

// start server to listen connections on designed port 
server.listen(PORT, () => {
  console.log(`✅ Server innitiated in port ${PORT}`);
});
