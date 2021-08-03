const express = require('express')
const routes = require('./routes')
const corsMiddleware = require('./cors')
const moment = require('moment')
require('dotenv/config')
require('./db/index')

const app = express()
app.use(corsMiddleware)
app.options('*', corsMiddleware)
app.use((req, res, next) =>{
  console.log(`>> ${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  next()
})

app.use(express.json())
app.use(routes)
app.listen(process.env.PORT || 8003)
