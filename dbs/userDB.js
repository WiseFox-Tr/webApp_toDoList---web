const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must provide an e-mail"],
        index: true, 
        unique: true, 
        sparse: true
    },
    password: {
        type: String,
        required: [true, "User must provide a password"]
    }
})

const UserModel = mongoose.model("User", userSchema)

exports.saveUser = function(email, password) {
    return UserModel({
        username: email,
        password: password
    }).save()
}

exports.getUserByEmail = function(email) {
    return UserModel.findOne({username: email})
}

exports.getUserById = function(id) {
    return UserModel.findOne({_id: id})
}