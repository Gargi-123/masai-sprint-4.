window.addEventListener("load", add)

function add() {
    var submit = document.getElementById("submit")
    submit.addEventListener("click", auth)
}

var auth_customer_arr = [
    {
        user: "dasgargi100@gmail.com",
        pass: "12345"
    },
    {
        user: "mithu100@gmail.com",
        pass: "5500"
    }
]


var current_user = ""

function auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log").value
    var pass = document.getElementById("pass").value
    console.log(user,pass)
    var flag = false
    for (var i = 0; i < auth_customer_arr.length; i++) {
        var x = auth_customer_arr[i]
        if (user == x.user && pass == x.pass) {
            current_user = x.user
            localStorage.setItem("user", x.user)
            window.location.replace("covid.html")
            flag = true
        }
    }
    if (flag == false){
        var res=document.getElementById("res")
        res.style.color="red"
        res.textContent="Wrong Credentials"

    }
}