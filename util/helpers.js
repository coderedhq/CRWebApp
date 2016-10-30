var firebase = require('firebase')
var exports = module.exports = {}



exports.setStateFromSchedule = function(temp, ref) {
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ]
    var schedule
    var date = new Date(Date.now())
    var hour = date.getHours()
    var day = days[date.getDay()]

    ref.parent.parent.once('value', function(snapshot) {
        schedule = snapshot.val().schedule
    })

    var scheduledPreference = schedule[day][hour]

    exports.setStateFromPreferences(temp, scheduledPreference, ref)
}

exports.setStateFromPreferences = function(temp, preference, ref) {
    //console.log(temp, preference, ref)
    console.log(preference)
    if (preference.range == '-') {
        if (temp > preference.temp) {
            ref.update({state: true, action: 'cool'})
        } else {
            ref.update({state: false})
        }
    } else if (preference.range == '+') {
        console.log('+ here')
        if (temp < preference.temp) {
            ref.update({state: true, action: 'heat'})
        } else {
            ref.update({state: false})
        }
    } else {
        var range = preference.range
        if (Math.abs(temp - preference.temp) > range) {
            if (temp - preference.temp < 0) {
                ref.update({state: true, action: 'heat'})
            } else {
                ref.update({state: true, action: 'cool'})
            }
        } else {
            ref.update({state: false})
        }
    }
}

exports.checkForAdmin = function(users) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].admin) {
            return users[i]
        }
    }

    return null
}
