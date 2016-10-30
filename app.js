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

app.get('/', function(req, res) {
    var database = firebase.database().ref('/')
    res.json({testing: true})
})

app.use('/api/data/', dataRouter)
app.use('/api/image/', imageRouter)
app.use('/api/pi/', piRouter)

// app.get('/push', function(req, res) {
//     var ref = firebase.database().ref('/houses')
//     var house = {
//         rooms: {
//             abcdef: {
//                 users: ['123abc'],
//                 temp: 72,
//                 state: false,
//             },
//             ghijklm: {
//                 users: ['abc123'],
//                 temp: 75,
//                 state: true
//             }
//         },
//         schedule: {
//             sunday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             monday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             tuesday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             wednesday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             thursday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             friday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//             saturday: {
//                 8: 74,
//                 16: 72,
//                 24: 74
//             },
//         },
//         users: {
//            '123abc': {
//                name: 'James Dean',
//                img: null,
//                admin: false,
//                preference: {
//                    temp: 72,
//                    range: '-'
//                }
//            },
//            'abc123': {
//                name: 'Paul Manafort',
//                img: null,
//                admin: true,
//                preference: {
//                    temp: 75,
//                    range: 3
//                }
//            }
//        }
//     }
//
//     ref.push(house, function() {
//         res.json(house)
//     })
//
// })

app.listen(3000, function() {
    console.log("Listening on 3000")
})
