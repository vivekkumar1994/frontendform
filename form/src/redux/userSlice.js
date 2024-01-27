// Import necessary libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching projects
export const fetchData = createAsyncThunk(
  'alldaat',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5010/api/users");
      
      dispatch(setAllData(response.data.users));  // Dispatch the action to update the state
      return response.data.users;
    } catch (error) {
      // Handle the error and dispatch rejectWithValue with the error message
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

// Company Project slice
const getallDataSlice = createSlice({
  name: 'alldata',
  initialState: {
    user: [],
    err: null,
    loading: false,
  },
  reducers: {
    setAllData: (state, action) => {
      // Assuming action.payload is an array, replace the existing user array with the new data
      state.user = action.payload;
      state.loading = 'succeeded';
      state.err = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = 'loading';
        state.err = null; // Reset error state when starting to fetch
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.err = action.payload; // Assuming action.payload contains the error message
      });
  },
});

export default getallDataSlice.reducer;

export const { setAllData } = getallDataSlice.actions;
