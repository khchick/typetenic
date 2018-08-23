class ConnectionService {

    constructor(knex) {
        this.knex = knex;
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
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTJ')
                                .orWhere('mbti', 'ISTJ')
                                .orWhere('mbti', 'INTJ')
                                .orWhere('mbti', 'ISTP')
                                .orWhere('mbti', 'ESTP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ISTP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTJ')
                                .orWhere('mbti', 'ISTJ')
                                .orWhere('mbti', 'ENTJ')
                                .orWhere('mbti', 'ESTP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ESTP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ISTJ')
                                .orWhere('mbti', 'ESTP')
                                .orWhere('mbti', 'ISTP')
                                .orWhere('mbti', 'ESFP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ESTJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ISTJ')
                                .orWhere('mbti', 'ESFJ')
                                .orWhere('mbti', 'ISFJ')
                                .orWhere('mbti', 'ENTJ')
                                .orWhere('mbti', 'INTJ')
                                .orWhere('mbti', 'ISTP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ISFJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ISFJ')
                                .orWhere('mbti', 'ENFJ')
                                .orWhere('mbti', 'ESTJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ISFP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESFP')
                                .orWhere('mbti', 'ISFP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;


                case 'ESFP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTP')
                                .orWhere('mbti', 'ISFP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ESFJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTP')
                                .orWhere('mbti', 'ISFP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;


                case 'INFJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ENTP')
                                .orWhere('mbti', 'ENFP')
                                .orWhere('mbti', 'INFJ')
                                .orWhere('mbti', 'INFP')
                                .orWhere('mbti', 'ENFJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'INFP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ENFP')
                                .orWhere('mbti', 'INFP')
                                .orWhere('mbti', 'ENFJ')
                                .orWhere('mbti', 'INFJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ENFP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'INFJ')
                                .orWhere('mbti', 'INFP')
                                .orWhere('mbti', 'ENFJ')
                                .orWhere('mbti', 'ENFP')
                                .orWhere('mbti', 'ESFJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ENFJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ISFJ')
                                .orWhere('mbti', 'ENFJ')
                                .orWhere('mbti', 'ENTJ')
                                .orWhere('mbti', 'INFJ')
                                .orWhere('mbti', 'ENFP')
                                .orWhere('mbti', 'INFP')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'INTJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTJ')
                                .orWhere('mbti', 'INTJ')
                                .orWhere('mbti', 'ISTP')
                                .orWhere('mbti', 'ENTJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'INTP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ENTP')
                                .orWhere('mbti', 'INTP')
                                .orWhere('mbti', 'INTJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ENTP':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ENTP')
                                .orWhere('mbti', 'INTP')
                                .orWhere('mbti', 'INFJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;

                case 'ENTJ':
                    query = this.knex.select('id', 'email', 'dob', 'gender', 'location', 'key_atr', 'key_atr_desc', 'mbti')
                        .from('users')
                        .where(function () {
                            this.where('mbti', 'ESTJ')
                                .orWhere('mbti', 'ISTP')
                                .orWhere('mbti', 'ENTJ')
                                .orWhere('mbti', 'ENFJ')
                                .orWhere('mbti', 'INTJ')
                        })
                        .andWhere('id', '!=', userID)
                        .orderBy('created_at');
                    break;
            }

            return query.then(rows => {
                return rows.map(row => (
                    {
                        id: row.id,
                        email: row.email,
                        dob: row.dob,
                        gender: row.gender,
                        location: row.location,
                        key_atr: row.key_atr,
                        key_atr_desc: row.key_atr_desc,
                        mbti: row.mbti
                    }
                ))
            })
        })
    }

    updateUserDetail(userID, name, imgURL) {
        let query = this.knex
            .select()
            .from('users')
            .where('users.id', userID);

        return query.then(rows => {
            if (rows.length !== 1) {
                return new Error('Invalid user');
            } else {
                return this.knex('users')
                    .where('id', userID)
                    .update({
                        name: name,
                        img: imgURL
                    })
            }
        })
    }

    // Tag services
    listAllTags() {
        let query = this.knex
            .select('tag.id', 'tag.name')
            .from('tag')
            .orderBy('tag.name')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name
            }))
        })
    }

    getFavTags(userID) {
        let query = this.knex
            .select('users_fav_tag.tag_id', 'tag.name')
            .from('users_fav_tag')
            .innerJoin('tag', 'users_fav_tag.tag_id', 'tag.id')
            .where('users_fav_tag.users_id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.tag_id,
                name: row.name
            }))
        })
    }

    clearFavTags(userID) {
        return this.knex("users_fav_tag").where("users_id", userID).delete()
    }

    insertFavTag(userID, tagID) {
        return this.knex("users_fav_tag")
            .insert({
                users_id: userID,
                tag_id: tagID
            })
    }

    // User's review services
    listOwnReview(userID) {
        let query = this.knex
            .select('restaurant.name', 'users_review.id', 'users_review.comment', 'users_review.rating')
            .from('users_review')
            .innerJoin('restaurant', 'users_review.rest_id', 'restaurant.id')
            .where('users_review.users_id', userID)
            .orderBy('users_review.created_at')

        return query.then(rows => {
            return rows.map(row => ({
                rest_name: row.name,
                id: row.id,
                comment: row.comment,
                rating: row.rating
            }))
        })
    }

    updateReview(reviewID, comment, rating) {
        let query = this.knex
            .select()
            .from('users_review')
            .where('users_review.id', reviewID);

        return query.then(rows => {
            if (rows.length !== 1) {
                return new Error('Invalid user');
            } else {
                return this.knex('users_review')
                    .where('users_review.id', reviewID)
                    .update({
                        comment: comment,
                        rating: rating
                    })
            }
        })
    }

    deleteReview(reviewID) {
        return this.knex("users_review")
            .where("users_review.id", reviewID)
            .delete()
    }

}

module.exports = ConnectionService;