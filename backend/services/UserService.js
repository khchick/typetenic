class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    getMBTI(userID) {
        let query = this.knex
            .select('mbti')
            .from('users')
            .where('users.id', userID);

        return query.then(rows => {
            return rows.map(row => ({
                mbti: row.mbti
            }))
        })
    }

    updateMBTI(userID, atr1, atr2, atr3, atr4) {
        let mbti = atr1 + atr2 + atr3 + atr4;
        return this.knex('users').where('id', userID).update({ 'mbti': mbti })
    }

    getKeyAtr(userID) {
        let query = this.knex
            .select('key_atr')
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                key_atr: row.key_atr
            })
            )
        })
    }

    getKeyAtrDesc(userID) {
        let query = this.knex
            .select('key_atr_desc')
            .from('users')
            .where('id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                key_atr_desc: row.key_atr_desc
            })
            )
        })
    }

    updateKeyAtr(userID, atr) {
        return this.knex('users').update('key_atr', atr).where('id', userID);
    }

    updateKeyAtrDesc(userID, desc) {
        return this.knex('users').update('key_atr_desc', desc).where('id', userID);
    }

    getPublicProfile(targetID) {
        let query = this.knex.select(
            'id',
            'display_name',
            'dob',
            'gender',
            'location',
            'mbti',
            'key_atr',
            'key_atr_desc'
        )
            .from('users')
            .where('id', targetID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                mbti: row.mbti,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc
            }))
        })
    }

    getSuggestedUsers(userID) {
        let query = this.knex
            .select('mbti')
            .from('users')
            .where('users.id', userID)

        return query.then(rows => {
            let query;
            switch (rows[0].mbti) {
                case 'ISTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTJ')
                                .orWhere('users.mbti', 'ISTJ')
                                .orWhere('users.mbti', 'INTJ')
                                .orWhere('users.mbti', 'ISTP')
                                .orWhere('users.mbti', 'ESTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTJ')
                                .orWhere('users.mbti', 'ISTJ')
                                .orWhere('users.mbti', 'ENTJ')
                                .orWhere('users.mbti', 'ESTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ISTJ')
                                .orWhere('users.mbti', 'ESTP')
                                .orWhere('users.mbti', 'ISTP')
                                .orWhere('users.mbti', 'ESFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ISTJ')
                                .orWhere('users.mbti', 'ESFJ')
                                .orWhere('users.mbti', 'ISFJ')
                                .orWhere('users.mbti', 'ENTJ')
                                .orWhere('users.mbti', 'INTJ')
                                .orWhere('users.mbti', 'ISTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ISFJ')
                                .orWhere('users.mbti', 'ENFJ')
                                .orWhere('users.mbti', 'ESTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESFP')
                                .orWhere('users.mbti', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;


                case 'ESFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTP')
                                .orWhere('users.mbti', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTP')
                                .orWhere('users.mbti', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;


                case 'INFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ENTP')
                                .orWhere('users.mbti', 'ENFP')
                                .orWhere('users.mbti', 'INFJ')
                                .orWhere('users.mbti', 'INFP')
                                .orWhere('users.mbti', 'ENFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ENFP')
                                .orWhere('users.mbti', 'INFP')
                                .orWhere('users.mbti', 'ENFJ')
                                .orWhere('users.mbti', 'INFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'INFJ')
                                .orWhere('users.mbti', 'INFP')
                                .orWhere('users.mbti', 'ENFJ')
                                .orWhere('users.mbti', 'ENFP')
                                .orWhere('users.mbti', 'ESFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ISFJ')
                                .orWhere('users.mbti', 'ENFJ')
                                .orWhere('users.mbti', 'ENTJ')
                                .orWhere('users.mbti', 'INFJ')
                                .orWhere('users.mbti', 'ENFP')
                                .orWhere('users.mbti', 'INFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTJ')
                                .orWhere('users.mbti', 'INTJ')
                                .orWhere('users.mbti', 'ISTP')
                                .orWhere('users.mbti', 'ENTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ENTP')
                                .orWhere('users.mbti', 'INTP')
                                .orWhere('users.mbti', 'INTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ENTP')
                                .orWhere('users.mbti', 'INTP')
                                .orWhere('users.mbti', 'INFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', 'ESTJ')
                                .orWhere('users.mbti', 'ISTP')
                                .orWhere('users.mbti', 'ENTJ')
                                .orWhere('users.mbti', 'ENFJ')
                                .orWhere('users.mbti', 'INTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;
            }

            return query.then(rows => {
                let suggestedUsers = [];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].status === null) {
                        suggestedUsers.push(rows[i]);
                    }
                }
                return suggestedUsers;
            })

        })
    }

    getNonSuggestedUsers(userID) {
        let query = this.knex
            .select('mbti')
            .from('users')
            .where('users.id', userID)

        return query.then(rows => {
            let query;
            switch (rows[0].mbti) {
                case 'ISTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTJ')
                                .andWhere('users.mbti', '!=', 'ISTJ')
                                .andWhere('users.mbti', '!=', 'INTJ')
                                .andWhere('users.mbti', '!=', 'ISTP')
                                .andWhere('users.mbti', '!=', 'ESTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTJ')
                                .andWhere('users.mbti', '!=', 'ISTJ')
                                .andWhere('users.mbti', '!=', 'ENTJ')
                                .andWhere('users.mbti', '!=', 'ESTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ISTJ')
                                .andWhere('users.mbti', '!=', 'ESTP')
                                .andWhere('users.mbti', '!=', 'ISTP')
                                .andWhere('users.mbti', '!=', 'ESFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ISTJ')
                                .andWhere('users.mbti', '!=', 'ESFJ')
                                .andWhere('users.mbti', '!=', 'ISFJ')
                                .andWhere('users.mbti', '!=', 'ENTJ')
                                .andWhere('users.mbti', '!=', 'INTJ')
                                .andWhere('users.mbti', '!=', 'ISTP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ISFJ')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                                .andWhere('users.mbti', '!=', 'ESTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ISFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESFP')
                                .andWhere('users.mbti', '!=', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;


                case 'ESFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTP')
                                .andWhere('users.mbti', '!=', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ESFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTP')
                                .andWhere('users.mbti', '!=', 'ISFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;


                case 'INFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ENTP')
                                .andWhere('users.mbti', '!=', 'ENFP')
                                .andWhere('users.mbti', '!=', 'INFJ')
                                .andWhere('users.mbti', '!=', 'INFP')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ENFP')
                                .andWhere('users.mbti', '!=', 'INFP')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                                .andWhere('users.mbti', '!=', 'INFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENFP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'INFJ')
                                .andWhere('users.mbti', '!=', 'INFP')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                                .andWhere('users.mbti', '!=', 'ENFP')
                                .andWhere('users.mbti', '!=', 'ESFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENFJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ISFJ')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                                .andWhere('users.mbti', '!=', 'ENTJ')
                                .andWhere('users.mbti', '!=', 'INFJ')
                                .andWhere('users.mbti', '!=', 'ENFP')
                                .andWhere('users.mbti', '!=', 'INFP')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTJ')
                                .andWhere('users.mbti', '!=', 'INTJ')
                                .andWhere('users.mbti', '!=', 'ISTP')
                                .andWhere('users.mbti', '!=', 'ENTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'INTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ENTP')
                                .andWhere('users.mbti', '!=', 'INTP')
                                .andWhere('users.mbti', '!=', 'INTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENTP':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ENTP')
                                .andWhere('users.mbti', '!=', 'INTP')
                                .andWhere('users.mbti', '!=', 'INFJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;

                case 'ENTJ':
                    query = this.knex.select('connection.status', 'users.id', 'users.display_name', 'users.dob', 'users.gender', 'users.location', 'users.key_atr', 'users.key_atr_desc', 'users.mbti')
                        .from('users')
                        .leftOuterJoin('connection', function () {
                            this
                                .on('connection.req_receiver_id', 'users.id')
                                .orOn('connection.req_sender_id', 'users.id')
                        })
                        .where(function () {
                            this.where('users.mbti', '!=', 'ESTJ')
                                .andWhere('users.mbti', '!=', 'ISTP')
                                .andWhere('users.mbti', '!=', 'ENTJ')
                                .andWhere('users.mbti', '!=', 'ENFJ')
                                .andWhere('users.mbti', '!=', 'INTJ')
                        })
                        .andWhere('users.id', '!=', userID)
                        .orderBy('users.created_at');
                    break;
            }

            return query.then(rows => {
                let nonSuggestedUsers = [];
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].status === null) {
                        nonSuggestedUsers.push(rows[i]);
                    }
                }
                return nonSuggestedUsers;
            })
        })
    }

    getFullProfile(targetID) {
        let query = this.knex.select(
            'id',
            'display_name',
            'dob',
            'gender',
            'location',
            'mbti',
            'key_atr',
            'key_atr_desc',
            'profile_pic',
            'ig_account',
            'ideal_first_date'
        )
            .from('users')
            .where('id', targetID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                location: row.location,
                mbti: row.mbti,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                profile_pic: row.profile_pic,
                ig_account: row.ig_account,
                ideal_first_date: row.ideal_first_date
            }))
        })
    }

    getOwnProfile(userID) {
        let query = this.knex
        .select(
            'id',
            'email',
            'password',
            'display_name',
            'dob',
            'gender',
            'orientation',
            'location',
            'mbti',
            'key_atr',
            'key_atr_desc',
            'profile_pic',
            'ig_account',
            'ideal_first_date',
            'token'
        )
            .from('users')
            .where('users.id', userID);

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                email: row.email,
                password: row.password,
                display_name: row.display_name,
                dob: row.dob,
                gender: row.gender,
                orientation: row.orientation,
                location: row.location,
                mbti: row.mbti,
                key_atr: row.key_atr,
                key_atr_desc: row.key_atr_desc,
                profile_pic: row.profile_pic,
                ig_account: row.ig_account,
                ideal_first_date: row.ideal_first_date,
                token: row.token
            }))
        })
    }

    drawCard(userID) {
        let pool = this.getNonSuggestedUsers(userID);
        return pool[Math.floor(Math.random() * pool.length)];
    }
    
}

module.exports = UserService;