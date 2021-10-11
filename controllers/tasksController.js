const commonDB = require("../dbs/commonDB")
const tasksDB = require("../dbs/tasksDB.js")

exports.displayTasksForCurrentUser = async function(req, res) {
    const ownerId = req.user._id
    try {
        await commonDB.connectToDB()
        const tasks = await tasksDB.getTaskByOwnerId(ownerId)
        res.render('list', {listTitle : "Vos tâches", tasksList : tasks})
    } catch(e) {
        console.log(`Error - unable to load tasks list ! \n${e}`)
        res.send("Unable to load tasks list")
    } finally {
        commonDB.disconnectToDB()
    }
}

exports.addNewTask = async function(req, res) {
    const newTask = req.body.newTask
    const ownerId = req.user.id
    try {
        if(!newTask) throw Error("Error task name field is empty")
        await commonDB.connectToDB()
        await tasksDB.addNewTask(newTask.trim(), ownerId)
        console.log(`task ${newTask} successfully added`)
    } catch(e) {
        console.log(`Error - adding new task failled ! \n${e}`)
    } finally {
        commonDB.disconnectToDB()
        res.redirect("/tasks")
    }
}

exports.deleteTaskById = async function(req, res) {
    const taskId = req.body.check
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
