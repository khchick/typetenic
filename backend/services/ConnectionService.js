class ConnectionService {

    constructor(knex) {
        this.knex = knex;
    }

    listSentRequests(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'connection.req_receiver_id', 'users.mbti')
            .from('connection')
            .innerJoin('users', 'users.id', 'connection.req_receiver_id')
            .where('connection.req_sender_id', userID)
            .andWhere('connection.system_matched', false)
            .orderBy('connection.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                mbti: row.mbti
            }))
        })
    }

    createSentRequest(userID, targetID) {
        let query = this.knex
            .select('mbti', 'display_name')
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            let myName = rows[0].display_name;
            let newQuery;
            switch (rows[0].mbti) {
                case 'ISTJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'ISTJ' ||
                            rows[0].mbti === 'INTJ' ||
                            rows[0].mbti === 'ISTP' ||
                            rows[0].mbti === 'ESTP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are  matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ISTP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'ISTJ' ||
                            rows[0].mbti === 'ENTJ' ||
                            rows[0].mbti === 'ESTP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ESTP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ISTJ' ||
                            rows[0].mbti === 'ESTP' ||
                            rows[0].mbti === 'ISTP' ||
                            rows[0].mbti === 'ESFP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ESTJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ISTJ' ||
                            rows[0].mbti === 'ESFJ' ||
                            rows[0].mbti === 'ISFJ' ||
                            rows[0].mbti === 'ENTJ' ||
                            rows[0].mbti === 'INTJ' ||
                            rows[0].mbti === 'ISTP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });
                case 'ISFJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ISFJ' ||
                            rows[0].mbti === 'ENFJ' ||
                            rows[0].mbti === 'ESTJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ISFP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESFP' ||
                            rows[0].mbti === 'ISFP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ESFP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTP' ||
                            rows[0].mbti === 'ISFP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} has been matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTSs for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ESFJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'ENFP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPDE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'INFJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ENTP' ||
                            rows[0].mbti === 'ENFP' ||
                            rows[0].mbti === 'INFJ' ||
                            rows[0].mbti === 'INFP' ||
                            rows[0].mbti === 'ENFJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}!`,
                                                'content': `${myName} has invited you to connect. Go to the RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'INFP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ENFP' ||
                            rows[0].mbti === 'INFP' ||
                            rows[0].mbti === 'ENFJ' ||
                            rows[0].mbti === 'INFJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ENFP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'INFJ' ||
                            rows[0].mbti === 'INFP' ||
                            rows[0].mbti === 'ENFJ' ||
                            rows[0].mbti === 'ENFP' ||
                            rows[0].mbti === 'ESFJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ENFJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ISFJ' ||
                            rows[0].mbti === 'ENFJ' ||
                            rows[0].mbti === 'ENTJ' ||
                            rows[0].mbti === 'INFJ' ||
                            rows[0].mbti === 'ENFP' ||
                            rows[0].mbti === 'INFP') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK  to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'INTJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'INTJ' ||
                            rows[0].mbti === 'ISTP' ||
                            rows[0].mbti === 'ENTJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} has been matched. Go to TYPE DECK to start chattingr!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'INTP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ENTP' ||
                            rows[0].mbti === 'INTP' ||
                            rows[0].mbti === 'INTJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ENTP':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ENTP' ||
                            rows[0].mbti === 'INTP' ||
                            rows[0].mbti === 'INFJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

                case 'ENTJ':
                    newQuery = this.knex
                        .select('mbti', 'display_name')
                        .from('users')
                        .where('id', targetID)

                    return newQuery.then(rows => {
                        let targetName = rows[0].display_name;
                        if (rows[0].mbti === 'ESTJ' ||
                            rows[0].mbti === 'ISTP' ||
                            rows[0].mbti === 'ENTJ' ||
                            rows[0].mbti === 'ENFJ' ||
                            rows[0].mbti === 'INTJ') {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Connected',
                                        'system_matched': true
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `You are connected with ${targetName}!`,
                                                'content': `You and ${targetName} are matched. Go to TYPE DECK to start chatting!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Approved',
                                                'type_id': id[0],
                                                'note_receiver_id': userID
                                            })
                                            .into('notification')
                                            .then(res => {
                                                return trx
                                                    .insert({
                                                        'title': `You are connected with ${myName}!`,
                                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                                        'read_status': 'Unread',
                                                        'type': 'Request Approved',
                                                        'type_id': id[0],
                                                        'note_receiver_id': targetID
                                                    })
                                                    .into('notification')
                                            })
                                            .then(trx.commit)
                                            .catch(trx.rollback)
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        } else {
                            return this.knex.transaction(trx => {
                                return trx
                                    .insert({
                                        'req_sender_id': userID,
                                        'req_receiver_id': targetID,
                                        'status': 'Requested',
                                        'system_matched': false
                                    })
                                    .into('connection')
                                    .returning('id')
                                    .then(id => {
                                        return trx
                                            .insert({
                                                'title': `Connection request from ${myName}!`,
                                                'content': `${myName} has invited you to connect. Go to RECEIVED REQUESTS for further action!`,
                                                'read_status': 'Unread',
                                                'type': 'Request Received',
                                                'type_id': id[0],
                                                'note_receiver_id': targetID
                                            })
                                            .into('notification')
                                    })
                                    .then(trx.commit)
                                    .catch(trx.rollback)
                            })
                        }
                    });

            }
        })
    }

    listConnectedSuggestions(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti', 'connection.flip_status', 'flip_req_sender')
            .from('users')
            .innerJoin('connection', function () {
                this
                    .on(function () {
                        this.on('connection.req_receiver_id', 'users.id')
                            .andOn('connection.req_sender_id', userID)
                    })
                    .orOn(function () {
                        this.on('connection.req_sender_id', 'users.id')
                            .andOn('connection.req_receiver_id', userID)
                    })
            })
            .andWhere('status', 'Connected')
            .andWhere('system_matched', true)
            .orderBy('connection.created_at', 'desc')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                mbti: row.mbti,
                flip_status: row.flip_status,
                flip_req_sender: row.flip_req_sender
            })
            )
        })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select('id')
                            .from('conversation')
                            .where(function () {
                                this.where('user1', userID)
                                    .andWhere('user2', row.id)
                            })
                            .orWhere(function () {
                                this.where('user1', row.id)
                                    .andWhere('user2', userID)
                            })

                        return query.then(conIDRows => {
                            conIDRows.forEach(conIDRow => {
                                row.conID = conIDRow.id
                            })
                            return row;

                        })
                    })
                )
            })
    }

    listConnectedUsers(userID) {
        let query = this.knex
            .select('users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti', 'connection.flip_status', 'flip_req_sender')
            .from('users')
            .innerJoin('connection', function () {
                this
                    .on(function () {
                        this.on('connection.req_receiver_id', 'users.id')
                            .andOn('connection.req_sender_id', userID)
                    })
                    .orOn(function () {
                        this.on('connection.req_sender_id', 'users.id')
                            .andOn('connection.req_receiver_id', userID)
                    })
            })
            .andWhere('status', 'Connected')
            .andWhere('system_matched', false)
            .orderBy('connection.created_at', 'desc')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                mbti: row.mbti,
                flip_status: row.flip_status,
                flip_req_sender: row.flip_req_sender
            }))
        })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select('id')
                            .from('conversation')
                            .where(function () {
                                this.where('user1', userID)
                                    .andWhere('user2', row.id)
                            })
                            .orWhere(function () {
                                this.where('user1', row.id)
                                    .andWhere('user2', userID)
                            })

                        return query.then(conIDRows => {
                            conIDRows.forEach(conIDRow => {
                                row.conID = conIDRow.id
                            })
                            return row;

                        })
                    })
                )
            })
    }

    deleteConnectedSuggestion(userID, targetID) {
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .delete()
                    .from('connection')
                    .where(function () {
                        this.where('req_sender_id', userID)
                            .andWhere('req_receiver_id', targetID)
                    })
                    .orWhere(function () {
                        this.where('req_sender_id', targetID)
                            .andWhere('req_receiver_id', userID)
                    })
                    .andWhere('status', 'Connected')
                    .andWhere('system_matched', true)
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({
                                'title': `Your card has been removed`,
                                'content': `${myName} has removed your card from his/her deck. More suggested matches in CARDS of the DAY`,
                                'read_status': 'Unread',
                                'type': 'Connection Lost',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
    }

    deleteConnectedUser(userID, targetID) {
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .delete()
                    .from('connection')
                    .where(function () {
                        this.where('req_sender_id', userID)
                            .andWhere('req_receiver_id', targetID)
                    })
                    .orWhere(function () {
                        this.where('req_sender_id', targetID)
                            .andWhere('req_receiver_id', userID)
                    })
                    .andWhere('status', 'Connected')
                    // .andWhere('system_matched', false)
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({
                                'title': `Your card has been removed`,
                                'content': `${myName} has removed your card from his/her DECK. Check out DISCOVER to connect with other users!`,
                                'read_status': 'Unread',
                                'type': 'Connection Lost',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
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
        let query = this.knex // Check user's and target's deck capacity
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
                console.log(new Error('Either your DECK or the request sender\'s DECK is full. Connection cannot be done at the moment.'));
            } else {
                let myName;
                let query = this.knex
                    .select('id', 'display_name') // Get names for notification content
                    .from('users')
                    .where('id', userID)

                return query.then(rows => {
                    myName = rows[0].display_name;
                    return this.knex.transaction(trx => {
                        return trx
                            .update('status', 'Connected') // Update connection status
                            .from('connection')
                            .where('req_sender_id', targetID)
                            .andWhere('req_receiver_id', userID)
                            .andWhere('system_matched', false)
                            .returning('id')
                            .then(id => {
                                return trx
                                    .insert({ // Create notification
                                        'title': `Connection request approved!`,
                                        'content': `You and ${myName} are matched. Go to TYPE DECK to start chatting!`,
                                        'read_status': 'Unread',
                                        'type': 'Request Approved',
                                        'type_id': id[0],
                                        'note_receiver_id': targetID
                                    })
                                    .into('notification')
                            })
                            .then(trx.commit)
                            .catch(trx.rollback)
                    })
                })
            }
        })
    }

    rejectRequest(userID, targetID) {
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .update('status', 'Rejected') // Update connection status
                    .from('connection')
                    .where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
                    .andWhere('system_matched', false)
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({ // Create notification
                                'title': `Connection request rejected`,
                                'content': `We are sorry that ${myName} turned down your connection request. Please check out DISCOVER for more suggestions`,
                                'read_status': 'Unread',
                                'type': 'Request Rejected',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
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
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .update({
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
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({
                                'title': `Flip request received`,
                                'content': `${myName} has invited you to flip your cards. Check out his/her profile page for further action`,
                                'read_status': 'Unread',
                                'type': 'Flip Request Received',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
    }

    approveFlipRequest(userID, targetID) {
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .update('flip_status', 'Flipped')
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
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({
                                'title': `Flip request approved!`,
                                'content': `${myName} has approved your flip request. You can now access his/her private profile!`,
                                'read_status': 'Unread',
                                'type': 'Flip Request Approved',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
    }

    rejectFlipRequest(userID, targetID) {
        let myName;
        let query = this.knex
            .select('id', 'display_name') // Get names for notification content
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            myName = rows[0].display_name;
            return this.knex.transaction(trx => {
                return trx
                    .update('flip_status', 'Rejected')
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
                    .returning('id')
                    .then(id => {
                        return trx
                            .insert({
                                'title': `Flip request rejected`,
                                'content': `${myName} has rejected your flip request. Maybe you should chat with him/her to find out more?`,
                                'read_status': 'Unread',
                                'type': 'Flip Request Rejected',
                                'type_id': id[0],
                                'note_receiver_id': targetID
                            })
                            .into('notification')
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
        })
    }

    cancelFlipRequest(userID, targetID) {
        return this.knex
            .update('flip_status', null)
            .from('connection')
            .where(function () {
                this.where('req_sender_id', userID)
                    .andWhere('req_receiver_id', targetID)
            })
            .orWhere(function () {
                this.where('req_sender_id', targetID)
                    .andWhere('req_receiver_id', userID)
            })
            .andWhere('flip_req_sender', userID)
            .andWhere('status', 'Connected')
    }
}

module.exports = ConnectionService;