exports.display = function(errorMessage) {
    if(errorMessage.includes("E11000 duplicate key error") && errorMessage.includes("dup key: { username:")) 
        return "Le mail saisi correspond à un compte utilisateur"

    switch (errorMessage) {
        case "Missing email or password": return "L'un des champs est vide"
        case "Password is too weak...": return "Le mot de passe est trop faible (minimum 8 caractères dont 1 majuscule, 1 minuscule, un caractère spécial et un nombre)"    
        case "Passwords are not matching": return "Les mots de passe sont différents"
        default: return "Oups .. un problème est survenu !"
    }
}
