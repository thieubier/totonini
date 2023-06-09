export default class myApi {
    constructor() {
        this.baseurl = "http://localhost:3000"
    }

    myFetch(url, init) {
        return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/${url}`, init)
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }

    login(username, password) {
        return this.myFetch('auth/login', {
            method: "POST",
            body: JSON.stringify({
                    username: username,
                    password: password
                }
            ),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }

    getAllCompte() {
        return this.myFetch('user', {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }

    getUserByUsername(username) {
        return this.myFetch(`user/${username}`, {
        headers : {"Authorization" : `Bearer ${sessionStorage.getItem("token")}`}
        })

    }

    creerCompte(username, password) {
        return this.myFetch('user', {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    updateUser(id, username, password) {
        return this.myFetch(`user/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }

    deleteUser(id){
        return this.myFetch(`user/${id}`, {
            method: "DELETE",
            headers : {"Authorization" : `Bearer ${sessionStorage.getItem("token")}`}
        })    }

    getAllMenus() {
        return this.myFetch('menu', {
            headers: {"Authorization" : `Bearer ${sessionStorage.getItem("token")}`}
        })
    }

    getMenuById(id) {
        return this.myFetch(`menu/${id}`, {})
    }

    creerCommande(userId, prix, date, liste) {
        return this.myFetch('commande', {
            method: "POST",
            body: JSON.stringify({
                user_id: userId,
                prix: prix,
                date: date,
                menu_ids: liste
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }


}
