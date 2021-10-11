const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name should be provided"]
    },
    owner: {
        type: String,
        required: [true, "A task should have an owner"]
    }
})

const TaskModel = mongoose.model("Task", taskSchema)

exports.getAllTasks = function() {
    return TaskModel.find({}).exec()  
}

exports.getTaskByOwnerId = function(ownerId) {
    return TaskModel.find({owner: ownerId})
}

exports.addNewTask = function(newTask, ownerId) {
    return TaskModel({
        name: newTask,
        owner: ownerId
    }).save()
}

exports.deleteTaskById = function(id) {
    return TaskModel.findByIdAndDelete(id).exec()
}
