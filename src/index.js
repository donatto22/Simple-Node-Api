const express = require('express')
const morgan = require('morgan')

const app = express()

// Global
app.set('port', process.env.PORT || 3000)

// Configuraciones
app.use(morgan('dev'))
app.use(express.json())

// Endpoints
app.use(require('./routes/index.js'))
app.use(require('./routes/auth.js'))

// Server
app.listen(app.get('port'), () => {
    console.log('Server Running at port ' + app.get('port'))
})
