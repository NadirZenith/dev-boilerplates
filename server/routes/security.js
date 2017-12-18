import { Router } from 'express';
import passport from 'passport';

const router = new Router();

router.route('/signup').post(passport.authenticate('local-signup', {
    successRedirect: '/me',
    failureRedirect: '/signup',
    failureFlash: true,
}));


router.route('/signup').get( (req, res) => {
    // const message = req.flash('error');
    res.send(`
        <form action="/signup" method="post">
            ${req.flash('error')}
            <div>
                <label>Email:</label>
                <input type="email" name="email"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
                <div>
                <label>Verify Password:</label>
                <input type="password" name="password_check"/>
            </div>
            <div>
                <input type="submit" value="Register"/>
            </div>
        </form>
    `);
});


router.route('/login').post(passport.authenticate('local-login', {
    successRedirect: '/me',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.route('/login').get( (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/me');
    }

    const message = req.flash('error');

    res.send(`
        ${message}
        <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="email"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    `);
});

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
});

// router.route('/').get((req, res) => {
//     const menu = req.isAuthenticated()
//         ? '<a href="/me">Me</a>'
//         : '<a href="/login">Login</a>';
//
//     res.send(`
//   ${menu}<br>
//   Hello World!
//   `);
// });

export default router;
