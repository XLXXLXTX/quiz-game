const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/user')

const isAuthenticated = async (req, res, next)=>{

    try {
        
        // retrieve token from cookies
        const { token } = req.cookies;

        if(!token){
            
            return res.sendFile(path.join(__dirname, '../views/error-user-not-logged.html'))
            //return next('Please login to access the data');
        }

        // verify token is correct 
        const verify = await jwt.verify(token,process.env.JWT_SECRET);
        //req.user = await User.findById(verify.id);

        next();

    } catch (error) {

        return next(error); 

    }
}

module.exports = isAuthenticated;
