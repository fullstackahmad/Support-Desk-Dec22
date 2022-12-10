import axios from 'axios'

const API_URL = '/api/tickets/'


// Create new ticket service
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // Axios.POST
  const response = await axios.post(API_URL, ticketData, config)
  return response.data
}


// Get tickets service
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // Axios.GET
  const response = await axios.get(API_URL, config)
  return response.data
}

const ticketService = {
  createTicket, 
  getTickets,
}

export default ticketService
