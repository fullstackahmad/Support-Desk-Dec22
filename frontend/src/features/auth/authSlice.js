import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from LOCAL STORAGE
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}


// REGISTER a new user
export const register = createAsyncThunk(
  // action type string
  'auth/register',
  // callback function (referred to as a payloadCreator)
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
 )
 
 // LOGIN a user
 export const login = createAsyncThunk(
  // action type string
  'auth/login',
  // callback function (referred to as a payloadCreator)
  async (user, thunkAPI) => {
    console.log(user)
  }
 )

 // LOGOUT a user
 export const logout = createAsyncThunk(
  // action type string
  'auth/logout',
  // callback function (referred to as a payloadCreator)
  async () => {
    await authService.logout()
  }
 )


// THE AUTH SLICE
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  // AsyncThunk stuff goes into this extra reducers
  extraReducers: (builder) => { 
    builder
      .addCase(register.pending, (state) => { 
        state.isLoading = true
       })
      .addCase(register.fulfilled, (state, action) => { 
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
       })
      .addCase(register.rejected, (state, action) => { 
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
       })
      .addCase(logout.fulfilled, (state) => { 
        state.user = null
       })
  }
})

// no doubt the redux code is so wierd and make no sense
export const {reset} = authSlice.actions
export default authSlice.reducer
// or 
// export const authReducer = authSlice.reducer
