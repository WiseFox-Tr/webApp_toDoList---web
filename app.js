const express = require("express")
const ejs = require("ejs")
const { getCurrentDate } = require("./date")
const date = require(__dirname + "/date.js")

const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

const tasksList = ["Faire du sport", "Coder du javascript", "Dessiner 1/4 d'heure"]

app.get("/", function(req, res) {
    const currentDate = date.getCurrentDate()
    res.render('list', {listTitle : currentDate, tasksList : tasksList})
})

app.post("/", function(req, res) {
    console.log("request on '/' url")
    const newTask = req.body.newTask
    console.log(`new task = ${newTask}`)
    tasksList.push(newTask)
    res.redirect("/")
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})