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

    var ref = firebase.database().ref(`/houses/${req.params.houseId}/rooms/${req.params.roomId}`)

    ref.once('value', function(snapshot) {
        var room = snapshot.val()
        var state
        if (room.users.length == 0) {
            setStateFromSchedule(room.temp, ref)
        } else {
            var users = []
            room.users.forEach(function(user) {
                var ref = firebase.database().ref(`/houses/${req.params.houseId}/users/${user}`)
                ref.once('value', function(snapshot) {
                    users.push({user: snapshot.val()})
                })
            })

            var admin = checkForAdmin(users)

            if(admin == null) {
                setStateFromPreferences(room.temp, users[0].preference, ref)
            } else {
                setStateFromPreferences(room.temp, admin.preference, req.params.roomId)
            }
        }
    })
})

module.exports = router
