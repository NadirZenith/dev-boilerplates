import { Router } from 'express';
import path from 'path';
const router = new Router();
import { renderToString } from "react-dom/server";

router.route('*').get((req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/vendor.js"></script>
        <script src="/app.js"></script>
      </body>
    </html>
    `);
});

router.route('/api').get((req, res) => {
  res.json({msg: 'status ok'})
});

export default router;
