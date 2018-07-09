const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {return new Date().getFullYear()})
hbs.registerHelper('screamIt', (text) => {return text.toUpperCase()})
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now} ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (error) => {
    console.log(error)
  })
  next()
})
app.use((req, res, next) => {
  res.render('maintenance.hbs')
})
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  // res.send({
  //   name: 'Marcelo',
  //   likes: ['Bike', 'Cities']
  // })
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my site'
  })
})
app.get('/about', (req, res) => {
  //res.send('about page')
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})
app.get('/bad', (req, res) => {
  res.send({
    error:'unable to fullfil your request'
  })
})

app.listen(3000)
