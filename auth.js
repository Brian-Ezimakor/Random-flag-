function signUp() {    
    let userName = document.getElementById("uname").value

    let eMail = document.getElementById("email").value

    let password = document.getElementById("password").value

    sessionStorage.setItem("currentUser", userName)

    let all_user = new Array()
    all_user = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")):[]
    if(all_user.some((v)=>{
        return v.emailAddress==eMail
    })){
        document.getElementById("tell").innerHTML = "You already have an account why don't you Login?";
    }
    else{
        all_user.push({
            "name": userName,
            "emailAddress": eMail,
            "passKey": btoa(password)   
        })
        localStorage.setItem("users", JSON.stringify(all_user));
        localStorage.setItem("yourname", userName)
        window.location.href = "dashboard.html"
    }
}

function logIn() {

    let emailAddress = document.getElementById("email1").value

    let passKey = document.getElementById("password1").value

    let all_user = new Array()
    all_user = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")):[]
    if(all_user.some((v)=>{
        return v.emailAddress==emailAddress && btoa(passKey)==btoa(passKey)
    })){
        document.getElementById("tell").innerHTML = ""
        document.getElementById("tell1").innerHTML = "Login Successful"
        let currentUser = all_user.filter((v)=>{
            return v.emailAddress==emailAddress && btoa(passKey)==btoa(passKey)         
        })[0]
        localStorage.setItem("name", currentUser.name)
        localStorage.setItem("email", currentUser.emailAddress)
        window.location.href = "dashboard.html"
    }
    else {
        document.getElementById("tell").innerHTML = "Login failed, Check your details or create a new account!";
    }

}

function logOut() {
    document.getElementById("leave").style.display = "block"
    document.getElementById("leaveChild").style.scale = "1"
}
document.addEventListener("click", e => {
if (e.target.matches(".no")) {
    document.getElementById("leave").style.display = "none"
}
else if (e.target.matches(".yes")) {
localStorage.removeItem("name")
localStorage.removeItem("email")
window.location.href = "auth.html"
}
})

function restart() {
document.getElementById("leave2").style.display = "block"
document.getElementById("leaveChild2").style.scale = "1"
}
document.addEventListener("click", e => {
if (e.target.matches(".no2")) {
document.getElementById("leave2").style.display = "none"
}
else if (e.target.matches(".yes2")) {
localStorage.removeItem("flags")
localStorage.removeItem("totalScore")
localStorage.removeItemItem("yourname")
}
})
