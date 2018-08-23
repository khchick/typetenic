const passport = require('passport');
const passportJWT = require('passport-jwt');
const config = require('../utils/config')
const ExtractJwt = passportJWT.ExtractJwt;
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

module.exports = function () {
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => {
        const user = await knex.select('id')
            .from('users')
            .where('id', payload.id)
        if (user.length !== 0) {
            return done(null, { id: user[0].id });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}