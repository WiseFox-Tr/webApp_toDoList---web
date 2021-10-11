const bcrypt = require("bcrypt")
const commonDB = require("../dbs/commonDB.js")
const userDB = require("../dbs/userDB.js")
const regex = require("../services/regex.js")
const errorDisplayer = require("../services/errorDisplayer.js")
const errors = require("../strings/errors.js")
const routes = require("../strings/routes.js")
const render = require("../strings/render.js")

exports.registerUser = async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const passwordConfirmation = req.body.passwordConfirmation
    try {
        if(!email || !password) throw Error(errors.missingMailOrPassword)
        if(!regex.isPasswordEnoughStrong(password)) throw Error(errors.passwordTooWeak)
        if(password !== passwordConfirmation) throw Error(errors.passwordsNotMatching)

        await commonDB.connectToDB()
        await userDB.saveUser(email, await bcrypt.hash(password, 10))
        res.redirect(routes.login)
    } catch(e) {
        console.log(`register : ${e}`)
        res.render(render.register, {errorMessage: errorDisplayer.display(e.message)})
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
            return done(null, false, {message: errors.frNoUserFound})
        }
        if(await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: errors.frBadPassword})
        }
    } catch(e) {
        console.log(`log in : ${e}`)
        return done(null, false, {message: errors.frOups})
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
    res.redirect(routes.login)
    
}

//middleware to check if user is currently NOT authenticated
exports.checkIfUserIsNotAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()) {
        console.log("user is already authenticated")
        return res.redirect(routes.tasks)
    } 
    return next()
}

exports.findUser = async function (id) {
    let currentUser = null
    try {
        await commonDB.connectToDB()
        currentUser = await userDB.getUserById(id)
    } catch(e) {
        console.log(`find user : ${e}`)
    } finally {
        commonDB.disconnectToDB()
        return currentUser
    }
}

exports.logOut = function (req, res) {
    req.logOut()
    console.log("User successfully log out")
    res.redirect(routes.home)
}
