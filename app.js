require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const session = require("express-session")
const passport = require("passport")
const flash = require("express-flash")
const methodOverride = require("method-override")

const tasksController = require("./controllers/tasksController.js") 
const userController = require( "./controllers/userController.js")
const initializePassport = require("./services/passportConfig.js")
const date = require(__dirname + "/services/date.js")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {maxAge: 100000} //set up timelife of cookie in milliseconds
}))

//initialize passport & use session with passport 
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method')) //what we can override

//initialize passport call with instance of passport & email id 
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)


app.get("/", function(req, res) {
    console.log("GET request on url '/'")
    res.render("home", {date: date.getCurrentDate()})
})

app.route("/register")
    .get(function(req, res) {
        console.log("GET request on url '/register'")
        res.render("register")
    })
    .post(function(req, res) {
        console.log("POST request on url '/register'")
        userController.registerUser(req, res)
    })

app.route("/login")
    .get(function(req, res) {
        console.log("GET request on url '/login'")
        res.render("login")
    })    

app.route("/tasks")
    .get(function(req, res) {
        console.log("GET request on url '/tasks'")
        tasksController.displayTasks(res) 
    })
    .post(function(req, res) {
        console.log("POST request on url '/tasks'")
        tasksController.addNewTask(req.body.newTask, res)
    })

app.post("/tasks/delete", function(req, res) {
    console.log("POST request on url '/tasks/delete'")
    tasksController.deleteTaskById(req.body.check, res)
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}`)
})
