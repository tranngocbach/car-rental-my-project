const passport = require('passport')
const passportLocal = require('passport-local')
const loginService = require('../services/loginService')

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'mail',
        passwordField: 'pass',
        passReqToCallback: true
    },
        async (req, mail, pass, done) => {
            try {
                let user = await loginService.findUserByEmail(mail);
                if (!user) {
                    return done(null, false, req.flash("errors", `This user mail "${mail}" doesn't exist`));
                }
                if (user) {
                    //compare pass
                    let match = await loginService.comparePasswordUser(user, pass);
                    if (match === true) {
                        console.log("Well done");
                        return done(null, user, null);
                    } else {
                        return done(null, false, req.flash("errors", match));
                    }
                }
            } catch (err) {
                return done(null, false, err)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user.mail);
});

passport.deserializeUser((mail, done) => {
    loginService.findUserByEmail(mail).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal;