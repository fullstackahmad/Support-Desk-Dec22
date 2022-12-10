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
  },
})

// {reset} is an ActionCreatorWithoutPayload
export const {reset} = ticketSlice.actions

export default ticketSlice.reducer