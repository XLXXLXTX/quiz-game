const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/user')

const isAuthenticated = async (req, res, next) => {

    try {

        // retrieve token from cookies
        const { token } = req.cookies;

        if (!token) {
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

/* function called from index.html with the JWT Cookie to get the username
 * in case we dont have the username cookie, we need to call the API to get the username
 * and save it in a cookie, otherwise we can get the username from the cookie
 */
const decodeToken = async (req, res) => {

    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decoded;

        // create the url to get the username from the API in a dynamic way
        // we need to use the protocol and the host from the request
        // to avoid problems with the port (if we switch ports or hosts)
        const apiUrl = new URL(`/users/user/${id}`, `${req.protocol}://${req.get('host')}`);

        // use fetch to get the username from the API
        const response = await fetch(apiUrl.toString());


        if (!response.ok) {
            const error = await response.text();

            console.log('Error while obtaining user', error);
            throw new Error('Error while obtaining user');
        }

        const userData = await response.json();
        const { username } = userData;

        //res.cookie('usernameCookie', username);

        res.json({ username });

    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(500).json({ error: 'Error decoding token:' });
    }
};


module.exports = { isAuthenticated, decodeToken };
