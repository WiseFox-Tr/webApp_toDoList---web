const express = require("express")
const ejs = require("ejs")
const port = 3000 

const app = express()
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    let currentDate = new Date()
    let currentDayNumber = currentDate.getDay()
    let currentDayName = ""
    console.log(`current date is : ${currentDate}`)

    switch(currentDayNumber) {
        case 0: currentDayName = "dimanche"; break
        case 1: currentDayName = "lundi"; break
        case 2: currentDayName = "mardi"; break
        case 3: currentDayName = "mercredi"; break
        case 4: currentDayName = "jeudi"; break
        case 5: currentDayName = "vendredi"; break
        case 6: currentDayName = "samedi"; break
        default: currentDayName = "N/A"; console.log(`error... current day is number ${currentDayNumber} `)
    }
    res.render('list', {currentDayName : currentDayName})
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})