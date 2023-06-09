const uuid = require('uuid');
const Commande = require('../models/commande')

exports.getCommandes = async () => await Commande.findAll();

exports.getCommandeById =  (id) => {
    return  Commande.findOne({ where : {id} });
};
exports.createCommande = async (body) => {
    const commande = body;
    commande.id = uuid.v4();
    return await Commande.create(commande);
};

exports.updateCommande = async (id, data) => {
    const foundCommande = await Commande.findOne({ where : { id } });

    if (!foundCommande) {
        throw new Error('Commande not found');
    }
    await Commande.update(foundCommande)
}

exports.deleteCommande = async (id) => {
    await Commande.destroy({ where : { id }});
}

