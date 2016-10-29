var express = require('express')
var firebase = require('firebase')

var app = express()

var config = {
    apiKey: "AIzaSyCU_6Unlwm6M2xZFDSkVna2FXD7UwF69LI",
    authDomain: "hacktathon.firebaseapp.com",
    databaseURL: "https://hacktathon.firebaseio.com",
    storageBucket: "hacktathon.appspot.com",
}

firebase.initializeApp(config)

var dataRouter = require('./routes/data.js')
var imageRouter = require('./routes/image.js')
var piRouter = require('./routes/pi.js')

app.get('/:var', function(req, res) {
    var database = firebase.database().ref('/')
    res.json({testing: true})
})

app.use('/api/data/', dataRouter)
app.use('/api/image/', imageRouter)
app.use('/api/pi/', piRouter)


app.listen(3000, function() {
    console.log("Listening on 3000")
})
