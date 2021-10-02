const express = require("express")
const ejs = require("ejs")
const tasksController = require(__dirname + "/controllers/tasksController.js")

const port = 3000 

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get("/", function(req, res){
    console.log("Get request on url '/'")
    res.send("Home tasks")
})

app.route("/tasks")
    .get(function(req, res){
        console.log("Get request on url '/tasks'")
        tasksController.displayTasks(res) 
    })
    .post(function(req, res){
        //add new task -> from tasksController
        // tasksDB.addTaskItem(req.body.newTask, res)
    })

app.post("/tasks/delete", function(req, res) {
    //delete specific task by checkbox on -> from tasksController
    // tasksDB.deleteTaskItemById(req.body.check, res)
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
