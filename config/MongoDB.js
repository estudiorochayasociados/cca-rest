const mongoose = require('mongoose'); 
const config  = (process.env.MONGO_DB) ? process.env : require('dotenv').config().parsed;
 mongoose.connect('mongodb+srv://'+config.MONGO_USER+':'+config.MONGO_PASS+'@'+config.MONGO_HOST+'/'+config.MONGO_DB+'?retryWrites=true&useNewUrlParser=true&w=majority', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

