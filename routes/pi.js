var firebase = require('firebase')
var router = require('express').Router()

router.use(function(req, res, next) {
    console.log("Using pi routes")
    next()
})

router.get('/activate/:houseId/:roomId', function(req, res) {
    //find room in firebase
    //set listener for temp change
    //if temp change determing if action needs to be taken
    res.json({houseId: req.params.houseId, roomId: req.params.roomId})
})

module.exports = router
