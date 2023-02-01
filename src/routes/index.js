const { Router } = require('express')

const router = Router()

// Endpoints
router.post('/users', (req, res) => {
    console.log(req.body)
    res.json({"msg": "Recibido"})
})


router.get('/users', (req, res) => {
    let response = [
        {
            "name": "Pedro",
            "edad": 32
        },

        {
            "name": "Luis",
            "edad": 21
        }
    ]

    res.json(response)
})

module.exports = router