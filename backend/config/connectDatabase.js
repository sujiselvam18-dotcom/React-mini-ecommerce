const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then((con) => {
            console.log('MongoDB connected to host: ' + con.connection.host);
        })
        .catch((err) => {
            console.error('MongoDB connection failed:', err.message);
            process.exit(1);
        });
};

module.exports = connectDatabase;