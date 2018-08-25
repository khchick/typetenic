class ConnectionService {

    constructor(knex) {
        this.knex = knex;
    }

    listSentRequest(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'connection.req_receiver_id')
            .from('connection')
            .innerJoin('users', 'users.id', 'connection.req_receiver_id')
            .where('connection.req_sender_id', userID)
            .orderBy('connection.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
            }))
        })
    }

    createSentRequest(userID, targetID) {
        let query = this.knex
            .select('mbti')
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            switch (rows[0].mbti) {
                case 'ISTJ':
                    let newQuery = this.knex
                        .select('mbti')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'ISTJ' ||
                            rows[0].mbti === 'INTJ' ||
                            rows[0].mbti === 'ISTP' ||
                            rows[0].mbti === 'ESTP') {
                            return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                        } else {
                            return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                        }
                    });

                // case 'ISTP':
                //     let newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESTJ' ||
                //             rows[0].mbti === 'ISTJ' ||
                //             rows[0].mbti === 'ENTJ' ||
                //             rows[0].mbti === 'ESTP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     });

                // case 'ESTP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ISTJ' ||
                //             rows[0].mbti === 'ESTP' ||
                //             rows[0].mbti === 'ISTP' ||
                //             rows[0].mbti === 'ESFP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ESTJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ISTJ' ||
                //             rows[0].mbti === 'ESFJ' ||
                //             rows[0].mbti === 'ISFJ' ||
                //             rows[0].mbti === 'ENTJ' ||
                //             rows[0].mbti === 'INTJ' ||
                //             rows[0].mbti === 'ISTP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ISFJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ISFJ' ||
                //             rows[0].mbti === 'ENFJ' ||
                //             rows[0].mbti === 'ESTJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ISFP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESFP' ||
                //             rows[0].mbti === 'ISFP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ESFP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESTP' ||
                //             rows[0].mbti === 'ISFP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ESFJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESTJ' ||
                //             rows[0].mbti === 'ENFP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'INFJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ENTP' ||
                //             rows[0].mbti === 'ENFP' ||
                //             rows[0].mbti === 'INFJ' ||
                //             rows[0].mbti === 'INFP' ||
                //             rows[0].mbti === 'ENFJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'INFP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ENFP' ||
                //             rows[0].mbti === 'INFP' ||
                //             rows[0].mbti === 'ENFJ' ||
                //             rows[0].mbti === 'INFJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ENFP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'INFJ' ||
                //             rows[0].mbti === 'INFP' ||
                //             rows[0].mbti === 'ENFJ' ||
                //             rows[0].mbti === 'ENFP' ||
                //             rows[0].mbti === 'ESFJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ENFJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ISFJ' ||
                //             rows[0].mbti === 'ENFJ' ||
                //             rows[0].mbti === 'ENTJ' ||
                //             rows[0].mbti === 'INFJ' ||
                //             rows[0].mbti === 'ENFP' ||
                //             rows[0].mbti === 'INFP') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'INTJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESTJ' ||
                //             rows[0].mbti === 'INTJ' ||
                //             rows[0].mbti === 'ISTP' ||
                //             rows[0].mbti === 'ENTJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'INTP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ENTP' ||
                //             rows[0].mbti === 'INTP' ||
                //             rows[0].mbti === 'INTJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ENTP':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ENTP' ||
                //             rows[0].mbti === 'INTP' ||
                //             rows[0].mbti === 'INFJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })

                // case 'ENTJ':
                //     newQuery = this.knex
                //         .select('mbti')
                //         .from('users')
                //         .where('id', targetID)

                //     return newQuery.then(rows => {
                //         if (rows[0].mbti === 'ESTJ' ||
                //             rows[0].mbti === 'ISTP' ||
                //             rows[0].mbti === 'ENTJ' ||
                //             rows[0].mbti === 'ENFJ' ||
                //             rows[0].mbti === 'INTJ') {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Connected', 'system_matched': true })
                //         } else {
                //             return this.knex('connection').insert({ 'req_sender_id': userID, 'req_receiver_id': targetID, 'status': 'Requested', 'system_matched': false })
                //         }
                //     })
            }
        })
    }

    listConnectedSuggestions(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
            .from('users')
            .innerJoin('connection', function () {
                this
                    .on(function() {
                        this.on('connection.req_receiver_id', 'users.id')
                            .andOn('connection.req_sender_id', userID)
                    })
                    .orOn(function() {
                        this.on('connection.req_sender_id', 'users.id')
                            .andOn('connection.req_receiver_id', userID)
                    })
            })
            .andWhere('status', 'Connected')
            .andWhere('system_matched', true)
            .orderBy('connection.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                mbti: row.mbti
            }))
        })
    }

    listConnectedUsers(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
            .from('users')
            .innerJoin('connection', function () {
                this
                    .on(function() {
                        this.on('connection.req_receiver_id', 'users.id')
                            .andOn('connection.req_sender_id', userID)
                    })
                    .orOn(function() {
                        this.on('connection.req_sender_id', 'users.id')
                            .andOn('connection.req_receiver_id', userID)
                    })
            })
            .andWhere('status', 'Connected')
            .andWhere('system_matched', false)
            .orderBy('connection.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                mbti: row.mbti
            }))
        })
    }

    deleteConnectedSuggestion(userID, targetID) {
        return this.knex.delete()
            .from('connection')
            .where('req_sender_id', userID)
            .andWhere('req_receiver_id', targetID)
            .andWhere('system_matched', true)
    }

    deleteConnectedUser(userID, targetID) {
        return this.knex.delete()
            .from('connection')
            .where('req_sender_id', userID)
            .andWhere('req_receiver_id', targetID)
            .andWhere('system_matched', false)
    }

    listReceivedRequests(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
            .from('users')
            .innerJoin('connection', 'users.id', 'connection.req_sender_id')
            .where('connection.req_receiver_id', userID)
            .andWhere('status', 'Requested')
            .andWhere('system_matched', false)
            .orderBy('connection.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                mbti: row.mbti
            }))
        })
    }

    approveRequest(userID, targetID) {
        let query = this.knex
            .select('id')
            .from('connection')
            .where(function () {
                this.where('connection.req_sender_id', userID)
                    .andWhere('system_matched', false)
                    .andWhere('status', 'Connected')
            })
            .orWhere(function () {
                this.where('connection.req_receiver_id', userID)
                    .andWhere('system_matched', false)
                    .andWhere('status', 'Connected')
            })
            .orWhere(function () {
                this.where('connection.req_sender_id', targetID)
                    .andWhere('system_matched', false)
                    .andWhere('status', 'Connected')
            })
            .orWhere(function () {
                this.where('connection.req_receiver_id', targetID)
                    .andWhere('system_matched', false)
                    .andWhere('status', 'Connected')
            })

        return query.then(rows => {
            if (rows.length >= 10) {
                console.log(new Error('Either your deck or your target\'s deck is full. Connection cannot be made at the moment.'));
            } else {
                return this.knex.update('status', 'Connected')
                    .from('connection')
                    .where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
                    .andWhere('system_matched', false)
            }
        })
    }


    rejectRequest(userID, targetID) {
        return this.knex.update('status', 'Rejected')
            .from('connection')
            .where('req_sender_id', targetID)
            .andWhere('req_receiver_id', userID)
            .andWhere('system_matched', false)
    }

    getFlipStatus(userID, targetID) {
        let query = this.knex
            .select('connection.flip_status', 'connection.flip_req_sender')
            .from('connection')
            .where(function () {
                this.where('connection.req_sender_id', userID)
                    .andWhere('connection.req_receiver_id', targetID)
                    .andWhere('status', 'Connected')
            })
            .orWhere(function () {
                this.where('connection.req_sender_id', targetID)
                    .andWhere('connection.req_receiver_id', userID)
                    .andWhere('status', 'Connected')
            })

        return query.then(rows => {
            return rows.map(row => ({
                flip_status: row.flip_status,
                flip_req_sender: row.flip_req_sender
            }))
        })
    }

    sendFlipRequest(userID, targetID) {
        return this.knex.update({
            'flip_status': 'Requested',
            'flip_req_sender': userID
        })
            .from('connection')
            .where(function () {
                this.where('req_sender_id', userID)
                    .andWhere('req_receiver_id', targetID)
                    .andWhere('status', 'Connected')
            })
            .orWhere(function () {
                this.where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
                    .andWhere('status', 'Connected')
            })
    }

    approveFlipRequest(userID, targetID) {
        return this.knex.update('flip_status', 'Flipped')
            .from('connection')
            .where(function () {
                this.where('req_sender_id', userID)
                    .andWhere('req_receiver_id', targetID)
            })
            .orWhere(function () {
                this.where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
            })
            .andWhere('flip_req_sender', targetID)
            .andWhere('status', 'Connected')
    }

    rejectFlipRequest(userID, targetID) {
        return this.knex.update('flip_status', 'Rejected')
            .from('connection')
            .where(function () {
                this.where('req_sender_id', userID)
                    .andWhere('req_receiver_id', targetID)
            })
            .orWhere(function () {
                this.where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
            })
            .andWhere('flip_req_sender', targetID)
            .andWhere('status', 'Connected')
    }
}

module.exports = ConnectionService;