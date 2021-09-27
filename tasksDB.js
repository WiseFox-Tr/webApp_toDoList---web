const date = require(__dirname + "/date.js")

const mongoose = require("mongoose")
const dbPort = 27017
const dbName = "webToDoListDB" 
mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name must be provided"]
    }
})

const ItemModel = mongoose.model("Item", itemSchema)

exports.getTaskItems = function(res) {
    const taskItems = []

    ItemModel.find({}, function(err, items) {
        if(err) {
            console.log("Unable to find task items")
        } else {
            items.forEach(item => {
                taskItems.push(item)
            })
            res.render('list', {listTitle : date.getCurrentDate(), tasksList : taskItems})
        }
    })   
}
