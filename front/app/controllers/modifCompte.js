import myModel from "../models/myModel.js";
import BaseController from "./baseController.js";

class modifCompte extends BaseController{
    constructor() {
        super()
        this.model = new myModel()
    }

    openPopUp(){
        document.getElementById("popup").style.display = "block"
    }
    closePopUp(){
        document.getElementById("popup").style.display = "none"
    }

    async deleteUser(){
        try {
            await this.model.deleteUser(sessionStorage.getItem("userId"))
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(){
        try{
            await this.model.updateUser(sessionStorage.getItem("userId"), document.getElementById("username"),document.getElementById("password"))
            navigate("login")
        } catch {

        }
    }
}
export default () => window.modifCompte= new modifCompte()
