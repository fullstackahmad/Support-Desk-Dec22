const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc    Get User Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({user: req.user.id})

  res.status(200).json(tickets)
})


// @desc    Get User Ticket (Single)
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  // because ticket id is coming from URL , hence we use req.params.id
  
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // restrict user to his own ticket only
  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User Not Authorized for this ticket')
  }

  res.status(200).json(ticket)
})


// @desc    Create a New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {

  // destructuring request.body
  const { product, description } = req.body
  if(!product || !description) {
    res.status(400) // Bad request 400
    throw new Error('Please add a product & description')
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.status(201).json(ticket)
  // 201 - created 
})



// @desc    Delete Ticket (Single)
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  // because ticket id is coming from URL , hence we use req.params.id
  
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // restrict user to his own ticket only
  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User Not Authorized for this ticket')
  }

  await ticket.remove() // we dont need anything in return when deleting
  
  res.status(200).json({success: true})
})



// @desc    Update Ticket (Single)
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  // because ticket id is coming from URL , hence we use req.params.id
  
  if(!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  // restrict user to his own ticket only
  if(ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User Not Authorized for this ticket')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
  
  res.status(200).json(updatedTicket)
})


module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}