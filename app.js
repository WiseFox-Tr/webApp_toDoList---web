const express = require("express")
const ejs = require("ejs")
const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');

let tasksList = ["Faire du sport", "Coder du javascript", "Dessiner 1/4 d'heure"]

app.get("/", function(req, res) {
    let currentDate = new Date()
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    let currentDateFormatted = currentDate.toLocaleDateString("fr-FR", options)
    res.render('list', {currentDateFormatted : currentDateFormatted, tasksList : tasksList})
})

app.post("/", function(req, res) {
    console.log("request on '/' url")
    const newTask = req.body.newTask
    console.log(`new task = ${newTask}`)
    tasksList.push(newTask)
    console.log("task list = " + tasksList)
    res.redirect("/")
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})