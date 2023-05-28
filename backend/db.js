const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/inotebook";  // your connection string

const connectToMongo = async () => {
    mongoose.connect(mongoURI, await console.log("Connected to mongo `Successful")
    );
}

module.exports = connectToMongo;


