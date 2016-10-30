var firebase = require('firebase')
var router = require('express').Router()
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(function(req, res, next) {
    console.log("Using data routes")
    next()
})

router.get('/user/:houseId/:uid', function(req, res){

    var ref = firebase.database().ref(`/houses/${req.params.houseId}/users/${req.params.uid}`)
    ref.once('value', function(snapshot){
      res.json(snapshot.val())
    })

})

router.post('/user/add', function(req, res, next) {
    var uid = firebase.auth().currentUser.uid
    var ref = firebase.database().ref(`/houses/${req.body.houseId}/users`)
    console.log(req.body)
    ref.update({
        [uid]: {
            name: req.body.name,
            admin: req.body.admin,
            preferences: req.body.preferences
        }
    })

    var ref = firebase.database().ref('/users')
    ref.update({
        [uid]: {
            houseId: req.body.houseId
        }
    })
})


router.get('/room/:houseId/:roomId', function(req, res) {

    var ref = firebase.database().ref(`/houses/${req.params.houseId}/rooms/${req.params.roomId}`)
    ref.once('value', function(snapshot){
      res.json(snapshot.val())
    })
})

router.get('/house/:uid', function(req, res) {
    var ref = firebase.database().ref(`/users/${req.params.uid}`)
    ref.once('value', function(snapshot) {
        res.json(snapshot.val())
    })
})

router.get('/schedule/:houseId/', function(req, res) {

    var ref = firebase.database().ref(`/houses/${req.params.houseId}`)
    ref.once('value', function(snapshot){

      if(req.query.day != null){
        res.json(snapshot.val().schedule[req.query.day])
      }
      else {
        res.json(snapshot.val().schedule)
      }
    })
})

router.get('/houses', function(req, res) {
    var ref = firebase.database().ref('/')
    ref.once('value', function(snapshot) {
        res.json(snapshot.val().houses)
    })
})

router.put('/user/update', function(req, res){
    var ref = firebase.database().ref(`/houses/${req.body.houseId}/users/${req.body.uid}`)
    ref.update({
      preferences: {
        temp: req.body.temp,
        range: req.body.range
      }
    })
})

module.exports = router
