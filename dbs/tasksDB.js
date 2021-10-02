const mongoose = require("mongoose")

exports.connectToDB = function(){
    return mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`)
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
