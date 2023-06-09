import myModel from "../models/myModel.js";
import BaseController from "./baseController.js";

class login extends BaseController{
    constructor() {
        super()
        this.model = new myModel()
    }

     async login ()
    {
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        if(username !== "" && password !== ""){
            let token =  await this.model.login(username, password)
            if(token!=null){
                sessionStorage.setItem("token", token.token)
                sessionStorage.setItem("username", token.username)
                sessionStorage.setItem("userId" , token.userId)
                sessionStorage.setItem("points", token.points)
                navigate('accueil')
            }else{
                document.getElementById("divErreur").style.display = "block"
            }
        }
    }
}
export default () => window.login= new login()
