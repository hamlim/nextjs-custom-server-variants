const express = require('express')
const cookieParser = require('cookie-parser');
const { parse } = require('url')
const next = require('next')

const app = express()

app.use(cookieParser());
app.use(express.json({limit: '1mb'}));
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()
 
nextApp.prepare().then(() => {

  app.get('/', async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl


    await nextApp.render(req, res, '/', query)
  })

  app.get('/legacy-page', async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl


    await nextApp.render(req, res, '/legacy-page', query)
  })
  
  app.use(async (req, res) => {

    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    // const { pathname, query } = parsedUrl


    await handle(req, res, parsedUrl)
  })

  app.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
