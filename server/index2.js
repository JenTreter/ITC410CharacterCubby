const express = require('express')
const app = express()

app.use((req, res, next) => {//myLoggingMiddleware
    console.log(req.method + ' ' + req.path)
    req.greet = '!'
    next()//if you leave this out, it will never stop running
}) //runs no matter what the path or method

//middleware modifies request object, modifies the response object, or, provides/handles a response

app.use(express.json()) 
app.use(express.text()) 

app.get('/', function (req, res) { //if substitute myLogging for function, only runs if path and method is run
  res.send('Hello World' + req.greet)
})

app.post('/', (req, res) => {
    console.log('Body', req.headers['content-type'])
    if (req.headers['content-type'] != 'application/json' && req.headers['content-type'] != 'text/plain'){ //req.type
        res.status(400).send('error')
    } else {
        res.send(req.body)
    }
    
})

app.listen(3000)