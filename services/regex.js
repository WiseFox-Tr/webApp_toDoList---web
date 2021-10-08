const passwordRegex = new RegExp(("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\?#\$%\^&\*])(?=.{8,})"))

exports.isPasswordEnoughStrong = function(password) {
    return passwordRegex.test(password)
}
