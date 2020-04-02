const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const cool = require('cool-ascii-faces')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear() })
hbs.registerHelper('screamIt', (text) => { return text.toUpperCase() })
hbs.registerHelper('cool', (text) => { return cool() })
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now} ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (error) => {
    console.log(error)
  })
  next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site'
  })
})
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})
app.get('/bad', (req, res) => {
  res.send({
    error: 'unable to fullfil your request'
  })
})
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  })
})
app.get('/cool', (req, res) => {
  res.render('cool.hbs', {
    pageTitle: 'Projects Page'
  })
})
app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
