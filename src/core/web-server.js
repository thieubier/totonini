const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user.routes');
const authRoutes = require('../controllers/auth.route');
const commandeRoutes = require('../controllers/commande.routes');
const menuRoutes = require('../controllers/menu.route');
const seederRoutes = require('../controllers/seeder.route');



const {sequelize} = require("../../database/sqlite.db.js");

class WebServer {
  app = undefined;
  port = 3000;
  server = undefined;

  constructor() {
    this.app = express();
    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
    sequelize.sync();
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`app listening on port ${this.port}`);
    });
  }
  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/user', userRoutes.initializeRoutes());
    this.app.use('/auth',authRoutes.initializeRoutes());
    this.app.use('/commande', commandeRoutes.initializeRoutes());
    this.app.use('/menu', menuRoutes.initializeRoutes());
    this.app.use('/seeder', seederRoutes.initializeRoutes());
  }
}

module.exports = WebServer;
