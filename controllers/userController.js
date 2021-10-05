const bcrypt = require("bcrypt")

const commonDB = require("../dbs/commonDB.js")
const userDB = require("../dbs/userDB.js")


async function registerUser (req, res) {
    try {
        await commonDB.connectToDB()
        await userDB.saveUser(req.body.email, await bcrypt.hash(req.body.password, 10))
        res.redirect("/login")
    } catch(e) {
        console.log(`register error : ${e}`)
        res.redirect("/register")

    } finally {
        commonDB.disconnectToDB()
    }
}

module.exports = {
    registerUser,
}
