const bcrypt = require("bcrypt")
const passport = require("passport")
const commonDB = require("../dbs/commonDB.js")
const userDB = require("../dbs/userDB.js")

exports.registerUser = async function (req, res) {
    try {
        await commonDB.connectToDB()
        console.log(`plain info mail : ${req.body.email} & pwd : ${req.body.password}`)
        await userDB.saveUser(req.body.email, await bcrypt.hash(req.body.password, 10))
        res.redirect("/login")
    } catch(e) {
        console.log(`register error : ${e}`)
        res.redirect("/register")
    } finally {
        commonDB.disconnectToDB()
    }
}

//login method
exports.authenticateUser = async function (email, password, done) {
    try {            
        await commonDB.connectToDB()
        const user = await userDB.getUserByEmail(email)

        if(!user) {
            return done(null, false, {message: `Aucun utilisateur pour le mail ${email}`})
        }
        if(await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: "Le mot de passe saisi ne correspond pas à celui de ce compte"})
        }
    } catch(e) {
        console.log(`log in error --> ${e}`)
        return done(null, false, {message: "Oups .. un problème est survenu !"})
    } finally {
        commonDB.disconnectToDB()
    }
}

//middleware to check if user is currently authenticated
exports.checkIfUserIsAuthentificated = function (req, res, next) {
    if(req.isAuthenticated()) {
        console.log("user is currently authenticated")
        return next()
    }
    console.log("user is not authenticated")
    res.redirect("/login")
    
}

//middleware to check if user is currently NOT authenticated
exports.checkIfUserIsNotAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()) {
        console.log("user is already authenticated")
        return res.redirect("/tasks")
    } 
    return next()
}

exports.getUserById = async function (id) {
    try {
        await commonDB.connectToDB()
        await userDB.getUserById(id)
    } catch(e) {
        console.log(`getUserById error --> ${e}`)
    }
    commonDB.disconnectToDB()
}

exports.logOut = function (req, res) {
    req.logOut()
    console.log("User successfully log out")
    res.redirect("/")
}
