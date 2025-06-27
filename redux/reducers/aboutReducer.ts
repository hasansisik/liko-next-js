import { createReducer } from "@reduxjs/toolkit";
import {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
  getAllAbout
} from "../actions/aboutActions";
import { AboutData } from "../actions/aboutActions";

interface AboutState {
  about: AboutData | null;
  aboutList: AboutData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: AboutState = {
  about: null,
  aboutList: [],
  loading: false,
  error: null,
  success: false,
};

export const aboutReducer = createReducer(initialState, (builder) => {
  builder
    // Get About
    .addCase(getAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.about = action.payload;
      state.error = null;
    })
    .addCase(getAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create About
    .addCase(createAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.about = action.payload;
      state.success = true;
      state.message = "About verisi başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update About
    .addCase(updateAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.about = action.payload;
      state.success = true;
      state.message = "About verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete About
    .addCase(deleteAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.aboutList = state.aboutList.filter(about => about._id !== action.payload);
      state.success = true;
      state.message = "About verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All About
    .addCase(getAllAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllAbout.fulfilled, (state, action) => {
      state.loading = false;
      state.aboutList = action.payload;
      state.error = null;
    })
    .addCase(getAllAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default aboutReducer; 