var firebase = require('firebase')
var router = require('express').Router()

router.use(function(req, res, next) {
    console.log("Using image routes")
    next()
})

router.post('/test', function(req, res) {
    //send to docker
    //get resonponse
    //if uid != null then add uid to roomId.users[]
})

router.post('/train', function(req, res) {
    //send to docker, no further action
    //maybe confirmation?
})

module.exports = router
