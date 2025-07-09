import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllSEO, 
  getSEOByPage, 
  getPublicSEO, 
  createSEO, 
  updateSEO, 
  deleteSEO,
  SEOData
} from "../actions/seoActions";

interface SEOState {
  seoData: SEOData[];
  currentSEO: SEOData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SEOState = {
  seoData: [],
  currentSEO: null,
  loading: false,
  error: null,
};

const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSEO: (state) => {
      state.currentSEO = null;
    },
  },
  extraReducers: (builder) => {
    // Get all SEO data
    builder
      .addCase(getAllSEO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.seoData = action.payload;
      })
      .addCase(getAllSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get SEO by page name
      .addCase(getSEOByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSEOByPage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSEO = action.payload;
      })
      .addCase(getSEOByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get public SEO data
      .addCase(getPublicSEO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSEO = action.payload;
      })
      .addCase(getPublicSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create SEO
      .addCase(createSEO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.seoData.push(action.payload);
      })
      .addCase(createSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update SEO
      .addCase(updateSEO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSEO.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.seoData.findIndex(seo => seo._id === action.payload._id);
        if (index !== -1) {
          state.seoData[index] = action.payload;
        }
        if (state.currentSEO && state.currentSEO._id === action.payload._id) {
          state.currentSEO = action.payload;
        }
      })
      .addCase(updateSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete SEO
      .addCase(deleteSEO.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.seoData = state.seoData.filter(seo => seo._id !== action.payload);
        if (state.currentSEO && state.currentSEO._id === action.payload) {
          state.currentSEO = null;
        }
      })
      .addCase(deleteSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentSEO } = seoSlice.actions;
export default seoSlice.reducer; 