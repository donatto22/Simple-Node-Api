const { Router } = require('express')

const router = Router()

// Endpoints
router.get('/books', verifyToken, (req, res) => {
    
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