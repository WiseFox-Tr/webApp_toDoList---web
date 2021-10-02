const express = require("express")
const ejs = require("ejs")
const tasksController = require(__dirname + "/controllers/tasksController.js")

const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res){
    console.log("GET request on url '/'")
    res.send("Home tasks")
})

app.route("/tasks")
    .get(function(req, res){
        console.log("GET request on url '/tasks'")
        tasksController.displayTasks(res) 
    })
    .post(function(req, res){
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

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
