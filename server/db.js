/* define and configure db connection and create methods for queries */

const mongoose = require('mongoose');

const connectDB = async (server, url, port = null) => {
    try {
        // load db uri for mongoose connection 
        let uri = `${url}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${server}`;

        if (port) {
            uri = `${uri}:${port}`;
        }

        uri = `${uri}/${process.env.MONGODB_DB}`;

        console.log(`⌛ Connecting to Database with the string connection ...`); //:\n\t ${uri}`)
        await mongoose.connect(uri);

        console.log('✅ Connected to MongoDB!');
    } catch (error) {
        console.error('❌ Error in the connection :', error);
    }
};


module.exports = { connectDB };
