import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion = createAsyncThunk(
    'suggestion/fetchSuggestion',
    async () => {
      const response = await fetch('http://localhost:3004/api/suggestion');
      const data = await response.json();
      return data;
    }
);

const initialState = {
  suggestion: '',
  loading: false,
  error: false,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchSuggestion.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(fetchSuggestion.fulfilled, (state, action) => {
          state.loading = false;
          state.suggestion = action.payload;
        })
        .addCase(fetchSuggestion.rejected, (state) => {
          state.loading = false;
          state.error = true;
        });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;