const commonDB = require("../dbs/commonDB")
const tasksDB = require("../dbs/tasksDB.js")
const appStrings = require("../strings/appStrings.js")
const errors = require("../strings/errors")
const routes = require("../strings/routes.js")
const render = require("../strings/render.js")

exports.displayTasksForCurrentUser = async function(req, res) {
    const ownerId = req.user._id
    try {
        await commonDB.connectToDB()
        const tasks = await tasksDB.getTasksByOwnerId(ownerId)
        res.render(render.tasks, {listTitle : appStrings.tasksTitle, tasksList : tasks})
    } catch(e) {
        console.log(`display tasks : \n${e}`)
        res.send(errors.tasksNotFound)
        //todo - make an error page
    } finally {
        commonDB.disconnectToDB()
    }
}

exports.addNewTask = async function(req, res) {
    const newTask = req.body.newTask
    const ownerId = req.user.id
    try {
        if(!newTask) throw Error(errors.taskFieldIsEmpty)
        await commonDB.connectToDB()
        await tasksDB.addNewTask(newTask.trim(), ownerId)
        console.log("task successfully added")
    } catch(e) {
        console.log(`add task :  \n${e}`)
        //TODO : add message area when adding task failled 
    } finally {
        commonDB.disconnectToDB()
        res.redirect(routes.tasks)
    }
}

exports.deleteCheckedTask = async function(req, res) {
    const taskId = req.body.check
    try {
        await commonDB.connectToDB()
        await tasksDB.deleteTaskById(taskId)
        console.log("Deleting task succeed !")
    } catch(e) {
        console.log(`delete task : \n${e}`)
        //TODO : add message area when deleting task failled 
    } finally {
        commonDB.disconnectToDB()
        res.redirect(routes.tasks)
    }
}
