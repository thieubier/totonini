import myModel from "../models/myModel.js";
import BaseController from "./baseController.js";

class CreerCompte extends BaseController{
    constructor() {
        super()
        this.model = new myModel()
    }

    verifForm ()
    {
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let confirm = document.getElementById("confirm").value

        if(username !== "" && password !== "" && password === confirm){
            try{
                this.model.creerCompte(username, password)
                navigate("login")
            } catch (e) {
            }
        }
    }
}
export default () => window.CreerCompte = new CreerCompte()
