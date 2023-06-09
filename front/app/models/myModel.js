import myApi from "../services/myApi.js";

export default class myModel {
    constructor() {
        this.api = new myApi()
    }
    async login(username, password) {
        console.log("passage login Model")
        try {
            return await this.api.login(username, password)
        } catch {
            return undefined
        }
    }

    async creerCompte(username, password) {
        console.log("passage creercompte Model")
        try {
            await this.api.creerCompte(username, password)
        } catch {
            return undefined
        }
    }

    async deleteUser(id){
        try{
            await this.api.deleteUser(id)
        } catch (e) {
            return undefined
        }
    }

    async updateUser(id, username, password){
        try {
            await this.api.updateUser(id, username, password)
        } catch (e) {
            console.log(e)
            return undefined
        }
    }
    async getAllCompte() {
        console.log("passage API Model")
        try {
            await this.api.getAllCompte()
        } catch {
            return undefined
        }
    }

    async getAllMenus() {
        console.log("passage API Model")
        try {
            return await this.api.getAllMenus()
        } catch(e) {
            return e
        }
    }

    async getMenuById(id) {
        console.log("passage API Model")
        try {
           return await this.api.getMenuById(id)
        } catch (e){
            console.log(e)
            return e
        }
    }

    async creerCommande(userId, prix, date, liste) {
        console.log("passage API Model")
        try {
            await this.api.creerCommande(userId, prix, date, liste)
        } catch {
            return undefined
        }
    }

    async getUserByUsername(username){
        return await this.api.getUserByUsername(username)
    }


}