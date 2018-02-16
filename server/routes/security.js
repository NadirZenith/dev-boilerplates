import {Router} from 'express'
import passport from 'passport'

const router = new Router()

router.route('/signup-form').post(passport.authenticate('local-form-signup', {
  successRedirect: '/me',
  failureRedirect: '/signup-form',
  failureFlash: true,
}))


router.route('/signup-form').get((req, res) => {
  // const message = req.flash('error');
  res.send(`
        <form action="/signup-form" method="post">
            ${req.flash('error')}
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
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
       <p>Have an account? <a href="/login-form">login</a></p>
    `)
})


router.route('/login-form').post(passport.authenticate('local-form-login', {
  successRedirect: '/me',
  failureRedirect: '/login-form',
  failureFlash: true,
}))

router.route('/login-form').get((req, res) => {

  if (req.isAuthenticated()) {
    return res.redirect('/me')
  }

  const message = req.flash('error')

  res.send(`
        ${message}
        <form action="/login-form" method="post">
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
        <p>dont have an account? <a href="/signup-form">signup</a></p>
    `)
})

router.route('/logout').get((req, res) => {
  req.logout()
  res.redirect('/')
})

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

export default router
