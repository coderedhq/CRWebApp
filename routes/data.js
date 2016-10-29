var firebase = require('firebase')
var router = require('express').Router()

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

router.get('/room/:houseId/:roomId', function(req, res) {

    var ref = firebase.database().ref(`/houses/${req.params.houseId}/rooms/${req.params.roomId}`)
    ref.once('value', function(snapshot){
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

module.exports = router
