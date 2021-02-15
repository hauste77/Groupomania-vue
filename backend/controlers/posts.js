const models = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const asyncLib = require('async');

module.exports = {
    createPost: (req, res) => {
        if ( req.body.title && req.body.content ) {
            models.Post.create({
                include: {
                    model: models.User,
                    attributes: ["username", "id"],
                },
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id,
                attachment: req.file ? req.file.buffer : null
            })
            .then( post => {
                return res.status(201).json( post );
            })
            .catch( err => {
                return res.status(503).json( { err } );
            });
        } else {
            return res.status(400).json( { 'error': 'missing parameters' } );
        }

    },
 
    getAllPosts: (req, res) => {
        models.Post.findAll( {
            include: [ {
                model: models.User, 
                as: 'user',
                attributes: [ 'username' ]
            },
            // {
            //     model: models.Likes,
            //     attributes: ["like"],
            // }
         ]
        } )
        .then( ( data ) => res.status( 200 ).json( data ) )
        .catch( ( err ) => res.status( 500 ).json( { err } ) );
    },

    getMyPosts: (req, res) => {
        models.Post.findAll( {
            include: [ {
                model: models.User,
                as: 'user',
                attributes: [ 'username' ],
            } ],
            where: { userId: req.user.id }
        } )
        .then( ( data ) => res.status( 200 ).json( data ) )
        .catch( ( err ) => res.status( 500 ).json( { err } ) );
    },

    getPost: (req, res, next) => {
        models.Post.findByPk( req.params.id )
            .then( data => res.status( 200 ).json( data ) )
            .catch( error => res.status( 400 ).json( { error } ) );
    },

    updatePost: async (req, res, next) => {
        const user = req.user,
            postId = req.params.id,
            post = await models.Post.findByPk( postId ),
            data = {
                title: req.body.title,
                content: req.body.content,
                userId: req.user.id,
            };

        if ( post ) {
            if ( post.userId === user.id ) {
                if ( req.file ) {
                    data[ 'attachment' ] = req.file.buffer;
                }

                const row = await models.Post.update( data, { where: { id: postId } } );

                if ( row ) {
                    return res.status( 200 ).send( { message: "Ressource updated" } );
                }
            } else {
                return res.status( 403 ).send( { message: "Not allowed" } );
            }
        } else {
            return res.status( 404 ).send( { message: "Resource does not exist" } );
        }
    },

    deletePost: async (req, res, next) => {
        const user = req.user,
            postId = req.params.id;

        const post = await models.Post.findByPk( postId );

        if ( post ) {
            if ( post.userId === user.id || user.rights.includes( 'admin' ) ) {
                const d = await models.Post.destroy( { where: { id: postId } } );

                if ( d ) {
                    return res.status( 204 ).send( { message: "Resource deleted" } );
                }
            } else {
                return res.status( 403 ).send( { message: "Not allowed" } );
            }
        }
        return res.status( 404 ).send( { message: "Resource does not exist" } );
    }
}