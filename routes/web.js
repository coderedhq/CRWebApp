var express = require('express')
var router = express.Router()
var firebase = require('firebase')

var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.use(function(req, res, next) {
    console.log('Using the web routes')
    next()
})

router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(result) {
        console.log(result.uid)
        res.json({uid: result.uid})
    }, function(error) {
        console.error(error.code)
        res.json({error: error.code})
    })
})

router.get('/authenticated', function(req, res, next) {
    if (firebase.auth().currentUser) {
        res.json({auth:firebase.auth().currentUser})
    } else {
        res.json({authenticated: false})
    }
})

router.get('/logout', function(req, res, next){
    firebase.auth().signOut()
    res.json({success:true})
})


module.exports = router
