const models = require('../models');
const token = require('../middleware/auth');

module.exports = async (req, res, next) => {
    const user = req.user;

    if ( user.rights.includes( 'admin' ) ) {
        return next();
    }
    return res.status( 403 ).json( { message: "Vous n'avez pas acces a cette ressource", } );
};