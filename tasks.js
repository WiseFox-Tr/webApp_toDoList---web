const tasksList = ["Faire du sport", "Coder du javascript", "Dessiner 1/4 d'heure"]

exports.updateTaskList = function(newTask) {
    console.log(`task.js -> new task = ${newTask}`)
    tasksList.push(newTask)
}

exports.getTasksList = function() {
    return tasksList
}
