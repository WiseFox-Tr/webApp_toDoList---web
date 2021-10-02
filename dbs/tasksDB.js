const mongoose = require("mongoose")
const dbPort = 27017
const dbName = "webToDoListDB" 

exports.connectToDB = function(){
    return mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)
}

exports.disconnectToDB = function(){
    mongoose.connection.close()
}


const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name must be provided"]
    }
})

const ItemModel = mongoose.model("Item", itemSchema)

exports.getTaskItems = function() {
    return ItemModel.find({}).exec()  
}

exports.addTaskItem = function(newTask, res) {
    ItemModel({
        name: newTask.trim()
    }).save(function (err) {
        if(err) {
            console.log(`adding new task ${newTask} failled`)
        } else {
            console.log(`adding new task ${newTask} succeed`)
        }
        res.redirect("/")
    })
}

exports.deleteTaskItemById = function(id, res) {
    ItemModel.findByIdAndDelete(id, function (err) {
        if(err) {
            console.log(`Deleting item with id ${id} failled`)
        } else {
            console.log(`Deleting item with id ${id} succeed`)
        }
        res.redirect("/")
    })
}
