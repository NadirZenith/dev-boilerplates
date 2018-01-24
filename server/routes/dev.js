import { Router } from 'express';
import User from '../app/model/user';

const router = new Router();

router.route('/test').get((req, res) => {
  res.send('OK');
  // return;
  // const user = new User();
  // user.local.username = 'agata';
  // user.local.password = user.generateHash('agata');
  //
  //
  // user.save((err) => {
  //   if (err) {
  //     console.log(err);
  //     res.send(`error saving user: ${err.message}`);
  //   } else {
  //     res.send('user saved');
  //     console.log('meow');
  //   }
  // });
});


export default router;
