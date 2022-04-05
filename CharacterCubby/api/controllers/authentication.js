module.exports = function (passport) {
    const authenticate = passport.authenticate('local')

    return {
        loginUser (req, res, next) {
            authenticate(req, res, err => {
                if (err) return next(err)

                // // Tell the browser to set an extra cookie. This cookie
                // // is not secure, but it can help the UI to determine
                // // if the user is logged in or not.
                // res.cookie('user', JSON.stringify(req.user.username), {
                //     maxAge: 36000000 // expires in 10 hours
                // })

                res.enforcer.status(200).send()
            })
        },

        logoutUser (req, res) {
            if (req.user) req.logout()
            res.enforcer.status(200).send()
        }
    }
}