const assetsManifest = process.env.webpackAssets
    && JSON.parse(process.env.webpackAssets);

const layout = (head = '', body = '') => `
    <!doctype html>
    <html>
      <head>${head}</head>
      <body>${body}</body>
    </html>`;

const base = (h = '', b = '') => {
  const head = (h !== '') ? h :
    `${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
    <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
    <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />`;

  const body = (b !== '') ? b :
    `<div id="root"></div>
    <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
    <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>`;

  return layout(head, body);
};

export { layout, base };
