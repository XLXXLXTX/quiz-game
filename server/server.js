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

// import module for real time WebSockets
const socketIo = require('socket.io');


// import function to connect to DB 
const { connectDB } = require('./db');

// load routes
const userRoutes = require('./routes/userRoutes');

//--------------------------------------------------
// SERVER CONFIG / INSTANCE SECTION
//--------------------------------------------------

// create an express instance 
const app = express();
// use body parser to process data from forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

// config routes for the app, from the file userRoutes.js  
app.use('/api/users', userRoutes);


//--------------------------------------------------
// INIT SERVER SECTION
//--------------------------------------------------

//define port for server 
const PORT = process.env.PORT || 3000;

// start server to listen connections on designed port 
server.listen(PORT, () => {
  console.log(`Server innitiated in port ${PORT}`);
});
