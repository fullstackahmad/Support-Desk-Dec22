import axios from 'axios'

const API_URL = '/api/tickets/'

// Create Notes Service
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // Axios.GET
  const response = await axios.post(API_URL + ticketId + '/notes', {
    text: noteText,
  }, config)
  return response.data
}

// Get Notes Service
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // Axios.GET
  const response = await axios.get(API_URL + ticketId + '/notes', config)
  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService