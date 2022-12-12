import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// CREATE  a new ticket (protected route)
export const createTicket = createAsyncThunk(
  // action type string
  'tickets/create',
  // callback function (referred to as a payloadCreator)
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
 )


// GET TICKETS (protected route)
export const getTickets = createAsyncThunk(
  // action type string
  'tickets/getAll',
  // callback function (referred to as a payloadCreator)
  async (_, thunkAPI) => {
    // ^ we passed _ b/c we still need thunkAPI to get user token ( above line ^ )
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
 )


// GET TICKET (protected route)
export const getTicket = createAsyncThunk(
  // action type string
  'tickets/get',
  // callback function (referred to as a payloadCreator)
  async (ticketId, thunkAPI) => {
    // ^ we passed _ b/c we still need thunkAPI to get user token ( above line ^ )
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
 )



 // Close Ticket - UPDATE - (protected route)
export const closeTicket = createAsyncThunk(
  // action type string
  'tickets/close',
  // callback function (referred to as a payloadCreator)
  async (ticketId, thunkAPI) => {
    // ^ we passed _ b/c we still need thunkAPI to get user token ( above line ^ )
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
 )


export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (reset) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        // i think brad choice is not smart here, i will try update only the ticket
        // another imp concept is that , backend is already handled in ticketService
        // we are only dealing in UI here 
        // state.tickets.map((ticket) => 
        //   ticket._id === action.payload._id
        //   ? (ticket.status = 'closed') 
        //   : ticket  
        // )
        state.ticket.status = 'closed'
        // i think it worked fine .. will check later for any bug..
      })
  },
})

// {reset} is an ActionCreatorWithoutPayload
export const {reset} = ticketSlice.actions

export default ticketSlice.reducer