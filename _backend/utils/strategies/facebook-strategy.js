const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();


module.exports = (passport)=>{
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    },(accessToken, refreshToken, profile, cb)=>{
            return cb(null,{profile:profile,accessToken:accessToken});
        }
    )); 
}