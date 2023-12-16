const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();


module.exports = function(passport) {

// localstrategy not required
    // passport.use(
    //     new LocalStrategy(async ( username, password, done ) => {
    //         try {
    //             const user = await User.findOne({ username: username });
    //             if (!user) {
    //                 return done( null, false, { message: 'Incorrect username' })
    //             }

    //             const match = await bcrypt.compare(password, user.password);
    //             if (!match) {
    //                 return done (null, false, { message: 'Incorrect password' })
    //             }
    //             return done(null, user)
    //         }
    //         catch(err) {
    //             done(err)
    //         }
    //     })
    // )

    passport.use(
        new JWTStrategy(
            {
                secretOrKey: process.env.JWT_SECRET_KEY,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },

            (jwt_payload, done) => {
                console.log('is this being called')
                console.log(jwt_payload)
                // User.findOne({username: jwt_payload.username})
                // if () return done(null, true)
                // return done(null, false)
            }

        )
    )


}

