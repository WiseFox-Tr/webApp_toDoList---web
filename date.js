exports.getCurrentDate = function() {
    const currentDate = new Date()
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    return currentDate.toLocaleDateString("fr-FR", options)
}
