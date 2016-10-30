var firebase = require('firebase')
var router = require('express').Router()
var helper = require('../util/helpers.js')

router.use(function(req, res, next) {
    console.log("Using pi routes")
    next()
})

router.get('/activate/:houseId/:roomId', function(req, res) {
    //find room in firebase
    //set listener for temp change
    //if temp change determing if action needs to be taken

    var ref = firebase.database().ref(`/houses/${req.params.houseId}/rooms/${req.params.roomId}`)

    ref.on('value', function(snapshot){
      processSnapshot(snapshot, ref, req)
      console.log('once completed')


    })
      res.json({Success:true})
})

function processSnapshot(snapshot, ref, req){
    var room = snapshot.val()
    //console.log(snapshot.val())
    var state
    if (room.users.length == 0) {
        helper.setStateFromSchedule(room.temp, ref)
    } else {
        var users = []
        var ref1 = firebase.database().ref(`/houses/${req.params.houseId}/users/`)
        ref1.once('value').then(function(snapshot){
            var houseUsers = snapshot.val()
            room.users.forEach(function(user){
              //console.log(user)
              //console.log(houseUsers['' + user])
              users.push(houseUsers['' + user])

            })
            //console.log(room.users)
            //console.log(users)
            var admin = null
            for (var i = 0; i < users.length; i++) {
                if (users[i].admin) {
                    admin = user[i]
                    break
                }

            }
            //console.log(admin)
            if(admin == null) {
              //  console.log(users[0])
                 helper.setStateFromPreferences(room.temp, users[0].preference, ref)

            } else {
                helper.setStateFromPreferences(room.temp, admin.preference, ref)
            }
        })

    }
}


module.exports = router
