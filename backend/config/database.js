const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log(`MongoDb connected with server: ${mongoose.connection.host}`);
        })
};

module.exports = connectDatabase;