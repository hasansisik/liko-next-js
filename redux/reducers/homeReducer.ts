import { createSlice } from '@reduxjs/toolkit';
import { getHome, createHome, updateHome, deleteHome, getAllHome, HomeData } from '../actions/homeActions';

export interface HomeState {
  home: HomeData | null;
  homes: HomeData[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  home: null,
  homes: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearHome: (state) => {
      state.home = null;
      state.homes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Home
    builder
      .addCase(getHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHome.fulfilled, (state, action) => {
        state.loading = false;
        state.home = action.payload;
        state.error = null;
      })
      .addCase(getHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Home
    builder
      .addCase(createHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHome.fulfilled, (state, action) => {
        state.loading = false;
        state.home = action.payload;
        state.homes.unshift(action.payload);
        state.error = null;
      })
      .addCase(createHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Home
    builder
      .addCase(updateHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHome.fulfilled, (state, action) => {
        state.loading = false;
        state.home = action.payload;
        const index = state.homes.findIndex(home => home._id === action.payload._id);
        if (index !== -1) {
          state.homes[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Home
    builder
      .addCase(deleteHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHome.fulfilled, (state, action) => {
        state.loading = false;
        state.home = null;
        state.error = null;
      })
      .addCase(deleteHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get All Homes
    builder
      .addCase(getAllHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHome.fulfilled, (state, action) => {
        state.loading = false;
        state.homes = action.payload;
        state.error = null;
      })
      .addCase(getAllHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearHome } = homeSlice.actions;
export default homeSlice.reducer; 