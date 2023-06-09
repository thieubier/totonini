const userRepository = require("../repository/user-repository");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
require('dotenv').config()


router.post('/login',
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const existingUser = await userRepository.getUserByUsername(req.body.username);
            console.log('auth route')
            if (!existingUser) {
                res.sendStatus(401)
            } else {
                if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                    const token = jwt.sign({username: req.body.username}, process.env.MOTDEPASSEAPP);
                    res.json({
                        "token" : token,
                        "username" : existingUser.username,
                        "userId" : existingUser.user_id,
                        "points" : existingUser.points
                    })
                }else res.send('mot de passe pas bon')
            }
        } catch (e) {
            console.log(e)
        }
    }
)
;

exports.initializeRoutes = () => router;