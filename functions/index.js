const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.incrementGroups = functions.database
    .ref('/groups/{groupId}')
    .onCreate(event => {
        return _incrementStat('/statistics/groups')
    })

exports.incrementUsers = functions.database
    .ref('/groups/{groupId}/members/{memberId}')
    .onCreate(event => {
        return Promise.all([
            _incrementStat('/statistics/users'),
            _setIfLargestGroup(event.data.ref.parent),
        ])
    })

const _incrementStat = ref => {
    return admin
        .database()
        .ref(ref)
        .once('value', snapshot => {
            const count = snapshot.val() || 0

            return admin
                .database()
                .ref(ref)
                .set(count + 1)
        })
}

const _setIfLargestGroup = groupRef => {
    const ref = '/statistics/largestGroup'

    return admin
        .database()
        .ref(ref)
        .once('value', largestGroupSnapshot => {
            const largestGroupSize = largestGroupSnapshot.val() || 0

            return groupRef.once('value', snapshot => {
                const groupSize = snapshot.numChildren() || 0

                if (groupSize > largestGroupSize) {
                    return admin
                        .database()
                        .ref(ref)
                        .set(groupSize)
                }

                return Promise.resolve()
            })
        })
}
