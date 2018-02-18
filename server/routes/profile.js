import { Router } from 'express';
import User from '../app/model/user';

const router = new Router();

const getMenu = (req) => {
  let menu = `<a href="${req.baseUrl}/edit">Edit</a> | <a href="/logout">Logout</a> | <a href="/">Home</a>`;
  if (true) {
    menu += ' | <a href="/admin/status">Admin</a>';
    menu += ' | <a href="/dev/status">Dev</a>';
  }

  return menu;
};

router.route('/').get((req, res) => {
  res.send(`
        ${getMenu(req)}<br>
        ${req.flash('error')}<br>
        Hello ${req.user.username ? req.user.username : ''}! (${req.user.id ? req.user.id : 'n/a'})
    `);
});

router.route('/edit').get((req, res) => {
  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) { return res.send('error fetching user'); }

    res.send(`
            ${getMenu(req)}<br>
            ${req.flash('error')}<br>
            <form method="post">
                ${req.flash('error')}
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value="${user.local.username ? user.local.username : ''}"/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" readonly value="${user.local.email}"/>
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
                    <input type="submit" value="Save"/>
                </div>
            </form>
        `);
  });
});


router.route('/edit').post((req, res) => {
  // @todo handle duplicate username when saving
  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) { return res.send('error fetching user'); }
    user.local.username = req.body.username;
    user.save();
    req.flash('error', 'Data saved ' + req.body.username);
    res.redirect(req.baseUrl);
  });
});
export default router;
