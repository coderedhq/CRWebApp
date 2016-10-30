var express = require('express')
var router = express.Router()

app.use(function(req, res, next) {
    console.log('Using the web routes')
    next()
})

app.get('/', express.static('index.html'))

app.get('/assets', express.static('assets'))
