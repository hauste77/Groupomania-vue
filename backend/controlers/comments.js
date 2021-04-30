const models = require('../models');


module.exports = {
    createComment: (req, res) => {
        models.Comment.create({
                include: [
                    {
                        model: models.Post,
                        attributes: ["id"],
                    },
                    {
                        model: models.User,
                        attributes: [ 'id' ]
                    }
                ],
                content: req.body.content,
                userId: req.user.id,
                postId: req.params.id,
              })
              .then(comment => res.status(200).json({ commentaire: comment }) )
              .catch( err => res.status(400).json( err ) )
        },
        getAllCommentsByPost: (req, res) => {
            models.Comment.findAll({ 
                where: { postId: req.params.id },
                include: {
                    model: models.User,
                    as: 'user',
                    attributes: ["username", "id"],
                }
            })
            .then(comment => res.status(200).json({ comment }) )
            .catch( err => res.status(503).json( err ) );
        },

        deleteComment: async (req, res, next) => {
            const user = req.user,
                commentId = req.params.id;
    
    
            const comment = await models.Comment.findByPk( commentId );
    
            if ( comment ) {
                if ( comment.userId === user.id || user.rights.includes( 'admin' ) ) {
                    const d = await models.Comment.destroy( { where: { id: commentId } } );
    
                    if ( d ) {
                        return res.status( 204 ).send( { message: "Resource deleted" } );
                    }
                } else {
                    return res.status( 403 ).send( { message: "Not allowed" } );
                }
            }
            return res.status( 404 ).send( { message: "Resource does not exist" } );
        }
    };