var firebase = require('firebase')

const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
]

export function setStateFromSchedule(temp, ref) {
    var schedule
    var date = new Date(Date.now())
    var hour = date.getHour()
    var day = days[date.getDay()]

    ref.parent.parent.once('value', function(snapshot) {
        schedule = snapshot.val().schedule
    })

    var scheduledPreference = schedule[day][hour]

    setStateFromPreferences(temp, scheduledPreference, ref)
}

export function setStateFromPreferences(temp, preference, ref) {
    if (preference.range = '-') {
        if (preference.temp > temp) {
            ref.update({state: true, action: 'cool'})
        } else {
            ref.update({state: false})
        }
    } else if (preference.range = '+') {
        if (preference.temp < temp) {
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

export function checkForAdmin(users) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].admin) {
            return users[i]
        }
    }

    return null
}
