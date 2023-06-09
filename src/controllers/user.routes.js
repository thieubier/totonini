const userRepository = require("../repository/user-repository");
const express = require("express");
const {body, validationResult} = require("express-validator");


const router = express.Router();


router.get('/', async (req, res) => {
    res.send(await userRepository.getUsers());
});

router.get('/:username', async (req, res) => {
    const foundUser = await userRepository.getUserByUsername(req.params.username);
    if (!foundUser) {
        //throw new Error('User not found');
        res.status(500).send("peut pas trouver user")
    } else {
        res.send(foundUser)
    }
});

router.post('/',
    body('username').not().isEmpty().isLength({min: 3}),
    body('password').not().isEmpty().isLength({min: 3}),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const existingUser = await userRepository.getUserByUsername(req.body.username);
            if (existingUser) {
                res.status(500).send("peut pas créer user back")
            } else {
                await userRepository.createUser(req.body);
                res.status(201).end();
            }
        } catch (e) {
            console.log(e)
        }
    });

router.put('/:id', async (req, res) => {
    try{
        await userRepository.updateUser(req.params.id, req.body);
        res.status(204).end();
    } catch(e){
        console.log(e)
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await userRepository.deleteUser(req.params.id);
        res.status(204).end();
    }
    catch{
    }
});


exports.initializeRoutes = () => router;
