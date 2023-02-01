const { Router } = require('express')
const jwt = require('jsonwebtoken')
const router = Router()

const secretKey = process.env.secret_key || 'secret'

router.post('/api/login', (req, res) => {
    const { email, password } = req.body

    const user = {
        id: 1,
        name: 'John',
        email: "john@em9ail.com",
        password: "test"
    }

    if (email == user.email && password == user.password) {
        // dentro de Sign, se registra el usuario del token
        jwt.sign({ user: user }, secretKey, (error, token) => {
            res.json({ token })
        })
    } else {
        res.json({ message: "Email or password invalid" })
    }
})

router.post('/api/users', verifyToken, (req, res) => {
    // data, es el usuario que va dentro del token, en la línea 19 se registró
    jwt.verify(req.token, secretKey, (error, data) => {
        if (error) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Get all users", data
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