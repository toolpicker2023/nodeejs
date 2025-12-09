const express = require("express")
const app = express()
const port = 3000;
const path = require('path');
const bcrypt = require("bcrypt")

const products = [
    {"id": 1, "description":"Cone", "flavour":"vanilla", "cost": 4.15},
    {"id": 2, "description":"Cone", "flavour":"Chocholate", "cost": 3.24},
    {"id": 3, "description":"Cone", "flavour":"Strawberry", "cost": 2.22},
    {"id": 4, "description":"Cone", "flavour":"Banana", "cost": 3.82},
    {"id": 5, "description":"bowl", "flavour":"Vanilla", "cost": 4.12},
]

const users = [
    {
        "username": "user1",
        "email": "user1@aueb.gr",
        "password": "123456"
    },
    {
        "username": "user2",
        "email": "user2@email.com",
        "password": "123456"
    },
    {
        "username": "user3",
        "email": "user3@aueb.gr",
        "password": "123456"
    }
]

// const hashPassword = async (password) => {
//   const saltRounds = 12; // the higher the number, the slower but more secure
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   return hashedPassword;
// };

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))


app.get("/", (req, res)=> {
    console.log("Homepage")
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

})

app.get("/login", (req,res)=> {
    console.log("Login")
    // res.sendFile(path.join(__dirname, 'views', 'login.html'));
    res.render("login", {})
})

app.get("/register", (req, res)=> {
    console.log("Register")
    res.sendFile(path.join(__dirname, 'views', 'register.html'));

})

app.post("/user", (req, res) => {
    console.log("User Post")
    let data = req.body
    let username = data.username
    let password = data.password
    console.log(username, password)
    

    res.render("user", {
        username: username,
        email: email
    })

})

app.get("/users", (req, res)=> {
    console.log("UsersPage")
    res.render("users", {users})
})


app.get("/products",(req, res)=> {
    console.log("products page")
    res.render("createProduct", {products})
})

app.post("/createUser", async (req, res)=> {
    let data = req.body
    let username = data.username.trim("")
    let password = data.password.trim("")
    let email = data.email.trim("")
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    if (username.length > 1 && password.length > 5 && email.length > 6 && email.includes("@") && email.includes(".") && atIndex < dotIndex) {
        console.log("everythig seems fine")
        const usernameexists = users.some(user => user.username === username)
        const emailexists = users.some(user => user.email === email)
        if (usernameexists || emailexists) {
            console.log("Username or email already in use")
            res.sendFile(path.join(__dirname, 'views', 'register.html'));
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let account = {
                "username": username,
                "password": hashedPassword,
                "email": email
            }
            users.push(account)
            console.log("user created login")
            res.sendFile(path.join(__dirname, 'views', 'login.html'));
        }

    } else {
        console.log("Not valid input")
        res.sendFile(path.join(__dirname, 'views', 'register.html'));
    }
    
    
})



app.listen(port,() => {
    console.log(`Server is up and running on port ${port}`)

})