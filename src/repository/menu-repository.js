const Menu = require('../models/menu')

exports.getMenus = async () => await Menu.findAll();

exports.getMenuById =  async (menu_id) => {
    return await Menu.findOne({where: {menu_id}})
};
exports.createMenu = async (body) => {
    const menu = body;
    await Menu.create(menu);
};

exports.updateMenu = async (id, data) => {
    const foundMenu = await Menu.findOne({ where : { id } });

    if (!foundMenu) {
        throw new Error('Menu not found');
    }
    await Menu.update({ username: "Doe" }, {
        where: {
            username: null
        }
    });
    foundMenu.id = data.id;

    exports.deleteMenu = async (id) => {
        await Menu.destroy({ where : { id }});
    }
}
