import { Router } from 'express';

const router = new Router();

// ------------------------------------
router.route('*').get((req, res) => {
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

  const menu = req.isAuthenticated()
    ? '<a href="/me">Me</a>'
    : '<a href="/login">LogIn</a>|<a href="/signup">SignUp</a>';

  res.send(`
    <!doctype html>
    <html>
      <head>
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
      ${menu}<br>
        <div id="root"></div>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
    `);
});

export default router;
