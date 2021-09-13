const express = require("express")
const ejs = require("ejs")
const date = require(__dirname + "/date.js")
const tasks = require(__dirname + "/tasks.js")

const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
    res.render('list', {listTitle : date.getCurrentDate(), tasksList : tasks.getTasksList()})
})

app.post("/", function(req, res) {
    tasks.updateTaskList(req.body.newTask)
    res.redirect("/")
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
