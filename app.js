require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const session = require("express-session")
const passport = require("passport")
const flash = require("express-flash")
const methodOverride = require("method-override")
const initializePassport = require("./services/passportConfig.js")
const tasksController = require("./controllers/tasksController.js") 
const userController = require( "./controllers/userController.js")
const date = require(__dirname + "/services/date.js")
const routes = require("./strings/routes.js")
const render = require("./strings/render.js")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {maxAge: 1_200_000}
}))

//initialize passport & use session with passport 
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)

app.use(methodOverride('_method'))

app.get(routes.home, userController.checkIfUserIsNotAuthenticated, function(req, res) {
    console.log(`GET request on url '${routes.home}'`)
    res.render(render.home, {date: date.getCurrentDate()})
})

app.route(routes.register)
    .get(userController.checkIfUserIsNotAuthenticated, function(req, res) {
        console.log(`GET request on url '${routes.register}'`)
        res.render(render.register, {errorMessage: null})
    })
    .post(function(req, res) {
        console.log(`POST request on url '${routes.register}'`)
        userController.registerUser(req, res)
    })

app.route(routes.login)
    .get(userController.checkIfUserIsNotAuthenticated, function(req, res) {
        console.log(`GET request on url '${routes.login}'`)
        res.render(render.login)
    })
    .post(passport.authenticate('local', {
        successRedirect: routes.tasks,
        failureRedirect: routes.login,
        failureFlash: true
    }))

app.route(routes.logout)
    .delete(userController.checkIfUserIsAuthentificated, (req, res) => {
        console.log(`DELETE request on url '${routes.logout}'`)
        userController.logOut(req, res)
    })    
    
app.route(routes.tasks)
    .get(userController.checkIfUserIsAuthentificated, function(req, res) {
        console.log(`GET request on url '${routes.tasks}'`)
        tasksController.displayTasksForCurrentUser(req, res) 
    })
    .post(function(req, res) {
        console.log(`POST request on url '${routes.tasks}'`)
        tasksController.addNewTask(req, res)
    })

app.post(routes.deleteTask, function(req, res) {
    console.log(`POST request on url '${routes.deleteTask}'`)
    tasksController.deleteCheckedTask(req, res)
})

app.get(routes.about, function(req, res) {
    console.log(`GET request on url '${routes.about}'`)
    res.render(render.about)
})

app.listen(process.env.PORT, function() {
    console.log(`Server started on port ${process.env.PORT}`)
})
