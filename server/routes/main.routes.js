import { Router } from 'express';
import path from 'path';
const router = new Router();


router.route('/').get((req, res) => {
  // console.log(`${__dirname}/../index.html`)
  /* eslint prefer-template: "error"*/
/* eslint-env es6*/

  // res.sendFile(path.join(`${__dirname}/../index.html`));

  res.json({ msg: 'index' });
});

export default router;
