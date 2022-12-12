
// initializing an express router
const express = require('express')
const router = express.Router({mergeParams: true})

// importing necessary stuff for this router
const {getNotes, addNote} = require('../controllers/noteController')
const {protect} = require('../middleware/authMiddleware')

// passing stuff as arguments, and finally export the router
router.route('/').get(protect, getNotes).post(protect, addNote)
module.exports = router

// we need to get this endpoint API
//  --  /api/tickets/:ticketId/notes
// so we use    {mergeParams: true} in express.Router
