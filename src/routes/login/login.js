const { Router } = require('express')
const jwt = require('jsonwebtoken')

// Base de datos
const { sql } = require('../conection.js')

const router = Router()

const secretKey = process.env.secret_key || 'secret'

router.post('/login', (req, res) => {
    const { email, password } = req.body
})

module.exports = router
