const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const passport = require('passport');

    const extractCookie = (req) => {
        const jwt = (req && req.cookies) ? req.cookies['token'] : null; 
        return jwt;
    }

    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET_KEY,
                jwtFromRequest: extractCookie,
            },

            async (jwt_payload, done) => {

                try {
                    const user = await User.findById(jwt_payload.sub);
                    if (user) {
                        return done(null, user)
                    } 
                        return done(null, false)
                }
                catch(err) {return done(err, false)}
            },
        )
    )


// }

