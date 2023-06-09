const express = require('express');
const {DateTime} = require('luxon');
const {expressjwt: jwt} = require("express-jwt");
var cors = require ('cors')

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initCorsMiddlware = (app) => {
    app.use(cors());
    console.log("cors enable")
}

const initLoggerMiddlware = (app) => {
    app.use((req, res, next) => {
        const begin = new DateTime(new Date());

        res.on('finish', () => {
            const { DateTime } = require('luxon');
            const requestDate = begin.toFormat('dd/MM/yyyy HH:mm:ss.SSS');
            const remoteIP = `IP: ${req.socket.remoteAddress}`;
            const urlInfo = `${req.baseUrl}${req.path}`
            const method = `${req.method}` ;

            const end = new DateTime(new Date());
            const requestDurationMs = end.diff(begin).toMillis();
            const requestDuration = `Duration: ${requestDurationMs}ms`;
            process.stdout.write(`\x1b[36m[${requestDate}] - \x1b[0m`)
            process.stdout.write(`\x1b[35m[${remoteIP}] - \x1b[0m`)
            switch (method) {
                case "GET": process.stdout.write(`\x1b[92m[${method}] - \x1b[0m`);break
                case "POST": process.stdout.write(`\x1b[93m[${method}] - \x1b[0m`);break
                case "PUT": process.stdout.write(`\x1b[94m[${method}] - \x1b[0m`);break
                case "DELETE": process.stdout.write(`\x1b[91m[${method}] - \x1b[0m`);break
            }
            process.stdout.write(`\x1b[97m[${urlInfo}] - \x1b[0m`)
            console.log(`\x1b[36m[${requestDuration}]\x1b[0m`);
        })
        next();
    });
};
const initStaticMiddlware = (app) => {
    app.use(express.static(__dirname + "../../front"))
}
const initJWTMiddlware = (app) => {
    app.use(
        jwt({
            secret: process.env.MOTDEPASSEAPP,
            algorithms: ["HS256"],
        }).unless({
            path: [{url: "/auth/login"},
                {url: "/user"},
                {url: "/menu", methods: ["POST"]},
                {url: "/menu/1", methods: ["GET"]},
                {url: "/menu/2", methods: ["GET"]},
                {url: "/menu/3", methods: ["GET"]},
                {url: "/seeder/users", methods: ["GET"]},
            ]
        })
    );
}

exports.initializeConfigMiddlewares = (app) => {
    initJsonHandlerMiddlware(app);
    initLoggerMiddlware(app);
    initStaticMiddlware(app);
    initJWTMiddlware(app);
    initCorsMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
    app.use((err, req, res, next) => {
        res.status(500).send(err.message);
    });

}
