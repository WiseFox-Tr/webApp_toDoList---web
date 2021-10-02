const tasksDB = require("../dbs/tasksDB.js")
const date = require("../date")

exports.displayTasks = async function(res) {
    try {
        await tasksDB.connectToDB()
        const tasksItems = await tasksDB.getTaskItems()
        res.render('list', {listTitle : date.getCurrentDate(), tasksList : tasksItems})
    } catch(e) {
        console.log(e)
        res.send("Unable to load tasks list")
    } finally {
        tasksDB.disconnectToDB()
    }
}
