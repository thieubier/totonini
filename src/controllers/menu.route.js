const menuRepository = require("../repository/menu-repository");
const express = require("express");
const {body, validationResult} = require("express-validator");


const router = express.Router();


router.get('/', async (req, res) => {
    res.send(await menuRepository.getMenus());
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try{
        const foundMenu = await menuRepository.getMenuById(req.params.id);
        console.log(foundMenu)
        if (foundMenu == null) {
            console.log("erreur recuperation menu route")
            res.status(500).send("peut pas récup menu")
        } else {
            console.log(foundMenu)
            res.send(foundMenu.dataValues)
        }
    } catch (e) {
        res.send(e)
    }
});

router.post('/',
    body('plat').not().isEmpty().isLength({min: 2}),
    body('boisson').not().isEmpty().isLength({min: 2}),
    body('prix').not().isEmpty().isLength({min: 1}),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try{
            await menuRepository.createMenu(req.body);
            res.status(201).end();
        } catch (e) {
            console.log(e)
        }
    });

router.put('/:id', async (req, res) => {
    await menuRepository.updateMenu(req.params.id, req.body);
    res.status(204).end();
});

router.delete('/:id', async (req, res) => {
    await menuRepository.deleteMenu(req.params.id);
    res.status(204).end();
});


exports.initializeRoutes = () => router;
