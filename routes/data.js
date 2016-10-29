var firebase = require('firebase')
var router = require('express').Router()

router.use(function(req, res, next) {
    console.log("Using data routes")
    next()
})

router.get('/user/:uid', function(req, res) {
    var uid = req.params.uid
    var random = req.query.var
    res.json({uid: uid, random: random})
})

router.get('/room/:roomId', function(req, res) {
    var roomId = req.params.roomId
    res.json({roomId: roomId})
})

router.get('/schedule/:houseId', function(req, res) {
    var houseId = req.params.houseId
    res.json({houseId: houseId})
})

module.exports = router
