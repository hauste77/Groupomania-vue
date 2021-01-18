// Imports
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const models = require('../models');
const asyncLib = require('async');

// Routes
module.exports = {
    getUser: (req, res) => {
        const userId = req.params.id || req.user.id;

        models.User.findOne({
            include: [{
                model: models.Right,
                attributes: ['name'],
                as: 'rights'
            }],
            where: [{
                id: userId
            }],
            attributes: ['id', 'username', 'bio', 'email']
        }).then( data => {
            res.status( 200 ).send( data )
        })
        .catch( error => res.status(500).send( console.log(error) ) )
    },
    updateUser: (req, res) => {

        // // Params
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const bio = req.body.bio;
        const userId = req.params.id || req.body.id;

        asyncLib.waterfall([
            (done) => {
            models.User.findOne({
                attributes: ['id', 'bio',],
                where: {
                    id: userId,
                }
                }).then((userFound) => {
                done(null, userFound);
                })
                .catch((err) => res.status(500).json({
                    'error': 'unable to verify user'
                }));
            },
            (userFound, done) => {
            if (userFound) {
                userFound.update({
                bio: (bio ? bio : userFound.bio),
                username: (username ? username : userFound.username),
                email: (email ? email : userFound.email),
                password: (password ? password : userFound.password),
                }).then(() => {
                done(userFound);
                }).catch((err) => {
                res.status(500).json({
                    'error': 'cannot update user'
                });
                });
            } else {
                res.status(404).json({
                'error': 'user not found'
                });
            }
            },
        ], (userFound) => {
            if (userFound) {
            return res.status(201).json(userFound);
            } else {
            return res.status(500).json({
                'error': 'cannot update user profile'
            });
            }
        });
    },
    deleteUser:  (req, res, next) => {
        models.User.destroy( 
            {where: { id: req.params.id}
        })
        .then(() => res.status(200).send({ message: 'La suppression est effectuée!'}))
        .catch((error) => res.status(500).send(error))
    }
}