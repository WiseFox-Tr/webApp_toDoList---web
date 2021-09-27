const express = require("express")
const ejs = require("ejs")
const tasks = require(__dirname + "/tasks.js")
const tasksDB = require(__dirname + "/tasksDB.js")

const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
    tasksDB.getTaskItems(res)
})

app.post("/", function(req, res) {
    tasksDB.addTaskItem(req.body.newTask, res)
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
