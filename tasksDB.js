const date = require(__dirname + "/date.js")

const mongoose = require("mongoose")
const dbPort = 27017
const dbName = "webToDoListDB" 
mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name must be provided"]
    }
})

const ItemModel = mongoose.model("Item", itemSchema)

exports.getTaskItems = function(res) {

    ItemModel.find({}, function(err, items) {
        if(err) {
            console.log("Unable to find task items")
        } else {
            res.render('list', {listTitle : date.getCurrentDate(), tasksList : items})
        }
    })   
}

exports.addTaskItem = function(newTask, res) {

    ItemModel({
        name: newTask
    }).save(function (e) {
        if(e) {
            console.log(`adding new task ${newTask} failled`)
        } else {
            console.log(`adding new task ${newTask} succeed`)
        }
        res.redirect("/")
    })
}

exports.deleteTaskItemById = function(id, res) {
    ItemModel.findByIdAndDelete(id, function (e) {
        if(e) {
            console.log(`Deleting item with id ${id} failled`)
        } else {
            console.log(`Deleting item with id ${id} succeed`)
        }
        res.redirect("/")
    })
}
