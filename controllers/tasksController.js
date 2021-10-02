const tasksDB = require("../dbs/tasksDB.js")
const date = require("../date")

exports.displayTasks = async function(res) {
    try {
        await tasksDB.connectToDB()
        const tasksItems = await tasksDB.getTaskItems()
        res.render('list', {listTitle : date.getCurrentDate(), tasksList : tasksItems})
    } catch(e) {
        console.log(`Error - unable to load tasks list ! \n${e}`)
        res.send("Unable to load tasks list")
    } finally {
        tasksDB.disconnectToDB()
    }
}

exports.addNewTask = async function(newTask, res) {
    try {
        if(!newTask) throw Error("Error task name field is empty")
        await tasksDB.connectToDB()
        await tasksDB.addNewTask(newTask.trim())
        console.log(`task ${newTask} successfully added`)
    } catch(e) {
        console.log(`Error - adding new task failled ! \n${e}`)
    } finally {
        tasksDB.disconnectToDB()
        res.redirect("/tasks")
    }
}

exports.deleteTaskById = async function(taskId, res) {
    try {
        await tasksDB.connectToDB()
        await tasksDB.deleteTaskById(taskId)
        console.log(`Deleting task with id ${taskId} succeed !`)
    } catch(e) {
        console.log(`Deleting item with id ${taskId} failled ! \n${e}`)
    } finally {
        tasksDB.disconnectToDB()
        res.redirect("/tasks")
    }
}
