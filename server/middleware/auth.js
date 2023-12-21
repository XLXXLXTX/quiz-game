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
        try {
            const verify = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
              res.redirect('/login');
            } else {
              // Handle other errors
            }
        }
        
        //req.user = await User.findById(verify.id);

        next();

    } catch (error) {

        return next(error); 

    }
}


const decodeToken = async (req, res) => {
	const { token } = req.body;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
    	res.json(decoded);
	} catch (error) {
		console.error('Error al decodificar el token:', error);
		res.status(500).json({ error: 'Error al decodificar el token' });
	}
};


module.exports = { isAuthenticated, decodeToken};
