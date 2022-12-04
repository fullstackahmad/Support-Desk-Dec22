import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
  
  // to work with different scenarios like , registeration pending / or successfull
  }

})

export default authSlice.reducer
