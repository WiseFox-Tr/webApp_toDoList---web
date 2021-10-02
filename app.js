require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const tasksController = require(__dirname + "/controllers/tasksController.js") 
const date = require(__dirname + "/services/date.js")

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
    console.log("GET request on url '/'")
    res.render("home", {date: date.getCurrentDate()})
})

app.route("/register")
    .get(function(req, res) {
        console.log("GET request on url '/register'")
        res.render("register")
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
