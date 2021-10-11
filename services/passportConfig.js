const LocalStrategy = require("passport-local").Strategy
const userController = require("../controllers/userController.js")

//take instance of passport
function initialize(passport) {

    //make sure user email & password are corrects by calling authenticateUser method from userController
    const authenticateUser = async (email, password, done) => {
        await userController.authenticateUser(email, password, done)
    }
    
    //define LocalStrategy
    passport.use(new LocalStrategy(
        {usernameField: 'email'},
        authenticateUser
    ))

    //serialize & deserialize user
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => done(null, await userController.getUserById(id)))
}

module.exports = initialize
