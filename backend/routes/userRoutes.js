const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// when we need to protect a route we add another argument containing the protect function
router.get('/me', protect, getMe)

module.exports = router