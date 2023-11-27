/*define methods (for user objects) to access db */

// lib to hash user's passwords to store them encrypted, increasing security
const bcrypt = require('bcrypt')
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// function to retrieve all users from the DB
const getAllUsers = async (req, res) => {
  
  try {
  
    const users = await User.find();
    res.json(users);
  
  } catch (error) {
    console.log('ERROR: Error in getAllUsers():', error);
    res.status(500).json({ error: 'Error while retrieving users' });
  }
};

// function to register a new user in the application
const signUp = async (req, res) => {
  
  console.log("req.body")
  console.log(req.body)
  // destructuring from the req.body into vars
  const { username, password } = req.body;

  try {

    // search username in DB to check if exists or not 
    const user = await User.findOne( {username} );

    // if username exist, we can't permit that, username must be unique for each user
    if (user){
      return res.status(401).json( {message: 'Username is in use: please try again.'} );
    }

    // hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // if it's a new username, we are going to register it 
    const newUser = new User( { "username": username, "password": hashedPassword} );
    await newUser.save();

    res.json( {message: 'New user registered.'} )

  } catch (error){
      console.log('ERROR: Error in signUp():', error);
      res.json(500).json( {error: 'Internal error server'} )
  }
};

// function to log in an existing user
const logIn = async (req, res) => {

  // retrieve username and password from request's body
  const { username, password } = req.body;

  try {

    // try to find one exact registry to make sure log in it's correct
    const existingUser = await User.findOne( { "username" : username } )

    // if there isnt any coincidence, maybe typped wrong username or not registered
    if(!existingUser){
        return res.status(401).json( {message: 'Username not found: please try again.'})
    }

    // verify passwords are the same
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if(!passwordMatch){
        return res.status(401).json( {message: 'Incorrect username or password: please try again.'})
    }

    // create jsw token 
    const token = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    // create a cookie with token
    return res.cookie("token", token, { httpOnly: true }).json({ success: true, message: 'LoggedIn Successfully' });
    //res.json( {message: 'Log in sucessfully'})

  } catch (error) {
    console.log('ERROR: Error in logIn()', error);
    res.json(500).json( {error: 'Internal error server'} )
  }

};

//--------------------------------------------------------------------

//Show login entry page
const showLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}; 

//Show signup entry page
const showSignUpPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'))
}

// export this functions to call them from other files  
module.exports = { getAllUsers,
                   signUp,
                   logIn,
                   showLoginPage,
                   showSignUpPage
                 };


