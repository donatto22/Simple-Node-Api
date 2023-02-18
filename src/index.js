const express = require('express')
const morgan = require('morgan')

const { sql } = require('./conection')

const app = express()

// Global
app.set('port', process.env.PORT || 3000)

// Prueba que funciona la base de datos
async function testData() {
    const [a] = await sql.query('select * from books')
    
    if (a !== null || a !== undefined) {
        console.log('Los datos se obtienen correctamente.')
    } else {
        console.log('Verificar testData index.js 18')
    }
}

testData()

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

