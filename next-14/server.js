const express = require('express')
const cookieParser = require('cookie-parser');
const { parse } = require('url')
const next = require('next')

const app = express()

app.use(cookieParser());
app.use(express.json({limit: '1mb'}));
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = dev ? 443 : 3000
// when using middleware `hostname` and `port` must be provided below
const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()
 
nextApp.prepare().then(() => {
  
  app.use(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)

    await handle(req, res, parsedUrl)
  })

  if (process.env.NODE_ENV !== 'production') {
    const https = require('https');
    const fs = require('fs');
    const homedir = require('os').homedir();
    const path = require('path')
  
    server = https
      .createServer(
        {
          key: fs.readFileSync(
            path.join(homedir, '.local-certs', 'key.pem'),
            'utf8'
          ),
          cert: fs.readFileSync(
            path.join(homedir, '.local-certs', 'cert.pem'),
            'utf8'
          ),
        },
        app
      )
      .listen(port, () => {
        console.log(`Listening at https://localhost:${port}/`);
      });
  } else {
    server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/`);
    });
  }
})
