const errors = require("../strings/errors.js")

exports.display = function(errorMessage) {
    if(errorMessage.includes("E11000 duplicate key error") && errorMessage.includes("dup key: { username:")) 
        return errors.frMailAlreadyUsed

    switch (errorMessage) {
        case errors.missingMailOrPassword: return errors.frEmptyField
        case errors.passwordTooWeak: return errors.frPasswordTooWeak 
        case errors.passwordsNotMatching: return errors.frPasswordsNotMatching
        default: return errors.frOups
    }
}
