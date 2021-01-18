// Imports
const models = require('../models');
const asyncLib = require('async');


// Routes
module.exports = {
    likeDislike: async (req, res) => {
        const userId = req.user.id,
            postId = req.params.postId;

        let like = await models.Likes.findOne( { where: { userId, postId } } );

        if ( like ) {
            const d = await like.destroy();
            
            if ( d ) {
                return res.status( 204 ).send( { message: "Resource deleted" } );
            }
        } else {
            like = await models.Likes.create( {
                userId,
                postId,
            } );

            return res.status(201).json( like );
        }
    }
}
