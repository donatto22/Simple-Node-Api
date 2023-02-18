const { Router } = require('express')
const jwt = require('jsonwebtoken')

// Base de datos
const { sql } = require('../../conection.js')

const router = Router()

const secretKey = process.env.secret_key || 'secret'

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const [user] = await sql.execute(`call login("${email}", "${password}")`)

    // Se obtiene el json dentro de un arreglo dentro de otro arreglo
    // Verificar en consola para obtener el json necesario
    const userJson = user[0][0]
    console.log(userJson)

    if (userJson === undefined || userJson === null) {
        res.json({ message: "Usuario no encontrado" })
    } else {
        jwt.sign({ user: userJson }, secretKey, (error, token) => {
            res.json({ token })
        })
    }
})

module.exports = router
