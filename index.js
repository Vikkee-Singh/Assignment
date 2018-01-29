import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';

import router from './router';
import config from './config';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

const MongoStore = require("connect-mongo")(session);

// Database Setup
mongoose.connect(config.database, (mongooseErr) => {
    if(mongooseErr) {
        console.error(mongooseErr);
    }
    else {
        // session store Setup
        const sessionParameters = session({
            secret: config.secret,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection
            }),
            cookie: {
                path: "/",
                secure: true
            }
        });
        app.use(sessionParameters);

        // Import routes to be served
        router(app);
    }
});


// app.get('/', ( req, res )=>{
//     res.send({"message":"Done..."})
// });

// Start the server
const server = app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// necessary for testing
module.exports = server;