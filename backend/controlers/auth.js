// Imports
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const models = require('../models');

// Constants
const 
  jwtKey = "my_secret_key", // dupliquer dans le middleware, mettre dans l'environnement
  jwtExpiryTime = 5 * 3600000; // 5 * (1h in sec)

// Routes
module.exports = {
  signup: async (req, res) => {
    if (req.body.username && req.body.email && req.body.password) {
        const salt = await bcrypt.genSalt(10),
            password = await bcrypt.hash( req.body.password, salt );

        models.User.create( {
            username: req.body.username,
            email: req.body.email,
            password: password
        } )
        .then( _ => {
            res.status(200).json( { success: true } );
        } )
        .catch( err => {
            res.status(400).json( { success: false, message: err } );
        } );
    }
  },
  login: async (req, res) => {
        const email = req.body.email,
            password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).send({ error: "Veuillez remplir tous les champs !" })
        }

        // get user data
        const userReq = await models.User.scope( 'withPassword' ).findOne({
            include: [{
                model: models.Right,
                attributes: ['name'],
                as: "rights"
            }],
            where: [{ email }]
        });
        if(userReq === null) {
            return res.status( 401 ).send( { message: "Utilisateur inexistant ou mot de passe incorect" } )
        }
        
        // filter key,value in userReq.dataValues object : keep all except the three ones
        const { bio, createdAt, updatedAt, ...user } = userReq.dataValues;
        

        // filter Rights object in order to keep only right names
        user.rights = user.rights.reduce( ( acc, currValue ) => acc.concat( currValue.name ), [] );

        if ( user ) {
            const isValid = await bcrypt.compare( password, user.password );

            // remove password from user object before to use it
            delete user.password;
            if ( isValid ) {
                const token = jwt.sign( { user }, jwtKey, { expiresIn: jwtExpiryTime } );
                res.cookie( "acces_token", token, { maxAge: jwtExpiryTime, httpOnly: true, } );
                res.status( 200 ).send( { user, token } )
            } else {
                return res.status( 401 ).send( { message: "Mot de passe incorrect !" } );
            }
        } else {
            return res.status( 401 ).send( { message: "Utilisateur inexistant" } )
        }
    }
}

