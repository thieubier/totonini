const commandeRepository = require("../repository/commande-repository");
const express = require("express");
const {body, validationResult} = require("express-validator");


const router = express.Router();


router.get('/', async (req, res) => {
    res.send(await commandeRepository.getCommandes());
});

router.get('/:id', async (req, res) => {
    const foundCommande = await commandeRepository.getCommandeById(req.params.id);
    if (!foundCommande) {
        //throw new Error('User not found');
        res.status(500).send("peut pas créer commande")
    } else {
        res.send(foundCommande)
    }
});

router.post('/',
    body('user_id').not().isEmpty().isLength({min: 5}),
    body('prix').not().isEmpty().isLength({min: 5}),
    body('date').not().isEmpty().isLength({min: 6}),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const existingCommande = await commandeRepository.getCommandeById(req.body.id);
            if (existingCommande) {
                //throw new Error('Unable to create the user');
                res.status(500).send("peut pas créer commande")
            } else {
                await commandeRepository.createCommande(req.body);
                res.status(201)
            }
        } catch (e) {
            console.log(e)
        }
    });

router.put('/:id', async (req, res) => {
    await commandeRepository.updateCommande(req.params.id, req.body);
    res.status(204).end();
});

router.delete('/:id', async (req, res) => {
    await commandeRepository.deleteCommande(req.params.id);
    res.status(204).end();
});


exports.initializeRoutes = () => router;
