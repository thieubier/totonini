import BaseController from './basecontroller.js'
import myModel from '../models/myModel.js'
class Accueil extends BaseController {
    constructor() {
        super()
        this.model = new myModel()
        this.retour = []
        this.date = new Date()
        this.stringDate = this.date.getDate()+'/'+this.date.getMonth()+'/'+this.date.getFullYear()
        this.username = sessionStorage.getItem('username')
        this.points = sessionStorage.getItem('points')
        this.userId = sessionStorage.getItem('userId')
        this.liste = []

        this.afficherInfo()
        this.getAllMenus()
    }
    async openPopup(id) {
        document.getElementById('popup').style.display = 'block';
        const menu = await this.model.getMenuById(id)
        console.log(menu)
        document.getElementById('numeroMenu').innerHTML = menu.menu_id
    }
    closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    async getAllMenus(){
        let menus =  await this.model.getAllMenus()
        for (const menu of menus) {

            let divCards = document.getElementById('divCards')

            divCards.innerHTML += ` 
            <div class="card" style="display: flex; align-items: center;">
                <div class="card-content">
                    <i class="fa-solid fa-taco" style="color: #16294b;"></i>
                    <div class="card-item">Menu ${menu.menu_id}</div>
                    <div class="card-item">Plat : ${menu.plat}</div>
                    <div class="card-item">${menu.prix}€</div>
                    <button onclick="accueil.openPopup(${menu.menu_id})">Commander</button>
                </div>
            </div>
`
        }
    }
    async getMenuById(id) {
        this.retour = await this.model.getMenuById(id)
        console.log(this.retour)
        //document.getElementById('').innerHTML = this.retour.plat
    }

    async creerCommandeCache(id){
        this.liste += this.model.getMenuById(id).toString()
        console.log('liste : '+this.liste)
    }
    async creerCommande(){
        await this.model.creerCommande(this.userId, prix, this.stringDate, this.liste)
    }

    async getUserByUsername(){
        return await this.model.getUserByUsername(this.username)
    }

    afficherInfo(){
        document.getElementById('username').innerHTML = this.username
        document.getElementById('point').innerHTML = this.points
        console.log(this.username)

    }
}
export default () => window.accueil = new Accueil()
