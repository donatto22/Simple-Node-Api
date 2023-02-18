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


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    try {
        await sql.execute(`call register("${username}", "${email}", "${password}")`)

        // Dependiento de regla de negocio, se envía un mensaje
        // O puede logearse ni bien se registre
        // Se tendrá hacer el proceso de login
        res.json({ message: "Registro exitoso" })
    } catch(e) {
        res.json({ message: "Ocurrió un error al registrar el usuario" })
    }
})

module.exports = router
