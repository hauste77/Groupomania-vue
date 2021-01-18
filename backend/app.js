const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const likesRoutes = require('./routes/likes');

const app = express();
 
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});  

// pour gerer les jwt dans des cookies
app.use(
    cors( {
        origin: [
            `${process.env.FRONT_URL}`,
            'http://localhost:3000',
            'http://localhost:8000'
        ],
        credentials: true
    })
);
app.use(cookieParser());

// pour tranformer le corps en objet
app.use(bodyParser.json());

// pour avoir accè au images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Importation des routes
app.use('/api/', likesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
  
module.exports = app;