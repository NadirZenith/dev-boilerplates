import { Router } from 'express';
import path from 'path';
import logger from '../utils/logger';

const router = new Router();

router.route('*').get((req, res) => {

  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

  res.send(`
    <!doctype html>
    <html>
      <head>
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root"></div>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
    `);
});

router.route('/api').get((req, res) => {
  res.json({msg: 'status ok'})
});


// Express 404 -------------------------------------
router.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")

  logger('error_404').log('Not found')
})

// Express 500 -------------------------------------
router.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default router;
