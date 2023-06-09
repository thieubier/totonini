const seederRepository = require("../repository/seeder-repository");
const express = require("express");
const router = express.Router();
const bcrypt = require ('bcryptjs');
const salt = bcrypt.genSaltSync(12);


router.get('/menu', async (req, res) => {
    const fakeJson = [];
        fakeJson.push({
            plat: "gros tacos énervé",
            boisson: "coca bien frais chacal",
            prix: 9,
        });
        fakeJson.push({
            plat: "grosse pizza énervée",
            boisson: "ice tea chaud",
            prix: 12,
        });
        fakeJson.push({
            plat: "delicious ramen",
            boisson: "sauce soja à boire",
            prix: 15.5,
        });
    await seederRepository.populateMenu(fakeJson);
    res.send({}).status(201);
});

router.get('/users', async (req, res) => {
    const fakeJson = [];
    fakeJson.push({
        username: "thieu",
        password: bcrypt.hashSync("thieu", salt),
        points: 0,
    });
    fakeJson.push({
        username: "titi",
        password: bcrypt.hashSync("titi", salt),
        points: 25,
    });
    fakeJson.push({
        username: "rémi",
        password: bcrypt.hashSync("rémi", salt),
        points: 50,
    });
    await seederRepository.populateUsers(fakeJson);
    res.send({}).status(201);
});

router.get('/users', async (req, res) => {
    const fakeJson = [];
    fakeJson.push({
        user_id: "1",
        prix: "thieu",
        date: 0,
    });
    fakeJson.push({
        username: "titi",
        password: "titi",
        points: 25,
    });
    fakeJson.push({
        username: "rémi",
        password: "rémi",
        points: 50,
    });
    await seederRepository.populateUsers(fakeJson);
    res.send({}).status(201);
});

exports.initializeRoutes = () => router;
