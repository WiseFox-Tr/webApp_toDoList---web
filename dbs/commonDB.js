const mongoose = require("mongoose")

exports.connectToDB = function(){
    return mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`)
}

exports.disconnectToDB = function(){
    mongoose.connection.close()
}
