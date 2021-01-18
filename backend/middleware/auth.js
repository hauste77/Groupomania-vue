const jwt = require('jsonwebtoken');

const jwtKey = "my_secret_key"; // dupliquer dans le middleware, mettre dans l'environnement

module.exports = (req, res, next) => {
    const token = req.cookies.acces_token || '';

    try {
        if ( token ) {
            const decoded = jwt.verify( token, jwtKey ),
                user = decoded.user;

            req.user = user;
            return next();
        }
    } catch( error ) {
        return res.status( 403 ).json( { error } );
    }
};