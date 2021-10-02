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

exports.addNewTask = function(newTask) {
    return ItemModel({
        name: newTask
    }).save()
}

exports.deleteTaskById = function(id) {
    return ItemModel.findByIdAndDelete(id).exec()
}
