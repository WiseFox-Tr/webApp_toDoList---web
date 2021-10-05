const commonDB = require("../dbs/commonDB")
const tasksDB = require("../dbs/tasksDB.js")

exports.displayTasks = async function(res) {
    try {
        await commonDB.connectToDB()
        const tasksItems = await tasksDB.getTaskItems()
        res.render('list', {listTitle : "Vos tâches", tasksList : tasksItems})
    } catch(e) {
        console.log(`Error - unable to load tasks list ! \n${e}`)
        res.send("Unable to load tasks list")
    } finally {
        commonDB.disconnectToDB()
    }
}

exports.addNewTask = async function(newTask, res) {
    try {
        if(!newTask) throw Error("Error task name field is empty")
        await commonDB.connectToDB()
        await tasksDB.addNewTask(newTask.trim())
        console.log(`task ${newTask} successfully added`)
    } catch(e) {
        console.log(`Error - adding new task failled ! \n${e}`)
    } finally {
        commonDB.disconnectToDB()
        res.redirect("/tasks")
    }
}

exports.deleteTaskById = async function(taskId, res) {
    try {
        await commonDB.connectToDB()
        await tasksDB.deleteTaskById(taskId)
        console.log(`Deleting task with id ${taskId} succeed !`)
    } catch(e) {
        console.log(`Deleting item with id ${taskId} failled ! \n${e}`)
    } finally {
        commonDB.disconnectToDB()
        res.redirect("/tasks")
    }
}
