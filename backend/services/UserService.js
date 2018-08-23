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

}

module.exports = UserService;