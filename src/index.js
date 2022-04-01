const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const route = require('./routes/routerWeb');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


route(app)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

