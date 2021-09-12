const express = require("express")
const ejs = require("ejs")
const port = 3000 

const app = express()
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    
    let currentDate = new Date()
    let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
    let currentDateFormatted = currentDate.toLocaleDateString("fr-FR", options)
    res.render('list', {currentDateFormatted : currentDateFormatted})
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})