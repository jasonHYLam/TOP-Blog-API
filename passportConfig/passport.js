const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const passport = require('passport');

console.log('i cri evritiem')
// localstrategy not required

    const extractCookie = (req) => {
        const jwt = (req && req.cookies) ? req.cookies['token'] : null; 
        console.log('trying to find a smidgeon of req.cookies anywhere')
        console.log(req.cookies)
        console.log('time to reveal the identity of jwt!')
        console.log(jwt)
        return jwt;
    }

    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET_KEY,
                jwtFromRequest: extractCookie,
                // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            },

            async (jwt_payload, done) => {

                // User.findOne({id: jwt_payload.id}, (err, user) => {
                //     console.log(jwt_payload)
                //     if (err) return done(err, false)
                //     if (user) return done(null, user)
                //     return done(null, false)
                console.log('lets try take a look at jwt_payload')
                console.log(jwt_payload)
                // })
                try {
                    const user = await User.findById(jwt_payload.sub);
                    console.log(user)
                    if (user) return done(null, user)
                    return done(null, false)
                }
                catch(err) {return done(err, false)}

                // return done(null, false)

            },
            console.log('this is hell, pure hell'),
            // console.log(req.cookies)

        )
    )


// }

