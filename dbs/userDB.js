const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "User must provide an e-mail"]
    },
    password: {
        type: String,
        required: [true, "User must provide a password"]
    }
})


const UserModel = mongoose.model("User", userSchema)

exports.saveUser = function(email, password) {
    return UserModel({
        email: email,
        password: password
    }).save()
}

exports.getUserByEmail = function(email) {
    return UserModel.findOne({email: email})
}

exports.getUserById = function(id) {
    return UserModel.findOne({_id: id})
}