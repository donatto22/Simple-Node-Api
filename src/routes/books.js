const { Router } = require('express')
const jwt = require('jsonwebtoken')

// Base de datos
const { sql } = require('../conection.js')

const router = Router()

const secretKey = process.env.secret_key || 'secret'


// Obtener libros
const getBooks = async () => {
    const [books] = await sql.query('select * from books')
    return books
}

// Endpoints
router.get('/books', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, async (error, data) => {
        if (error) {
            res.sendStatus(403)
        } else {
            // Asignamos los libros
            let booksData = await getBooks()

            // Adicionalmente, mostramos en consola
            console.log( booksData)

            res.json({
                booksData: booksData,
                data
            })
        }
    })
})

function verifyToken (req, res, next) {
    const header = req.headers["authorization"]

    if (header != undefined) {
        const token = header.split(" ")[1]
        req.token = token
        next()
    } else {
        res.sendStatud(403)
    }
}

module.exports = router