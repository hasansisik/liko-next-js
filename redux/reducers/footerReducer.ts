import { createReducer } from "@reduxjs/toolkit";
import {
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
  getAllFooter
} from "../actions/footerActions";
import { FooterData } from "../actions/footerActions";

interface FooterState {
  footer: FooterData | null;
  footerList: FooterData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: FooterState = {
  footer: null,
  footerList: [],
  loading: false,
  error: null,
  success: false,
};

export const footerReducer = createReducer(initialState, (builder) => {
  builder
    // Get Footer
    .addCase(getFooter.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getFooter.fulfilled, (state, action) => {
      state.loading = false;
      state.footer = action.payload;
      state.error = null;
    })
    .addCase(getFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Footer
    .addCase(createFooter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createFooter.fulfilled, (state, action) => {
      state.loading = false;
      state.footer = action.payload;
      state.success = true;
      state.message = "Footer verisi başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Footer
    .addCase(updateFooter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateFooter.fulfilled, (state, action) => {
      state.loading = false;
      state.footer = action.payload;
      state.success = true;
      state.message = "Footer verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Footer
    .addCase(deleteFooter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteFooter.fulfilled, (state, action) => {
      state.loading = false;
      state.footerList = state.footerList.filter(footer => footer._id !== action.payload);
      state.success = true;
      state.message = "Footer verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Footer
    .addCase(getAllFooter.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllFooter.fulfilled, (state, action) => {
      state.loading = false;
      state.footerList = action.payload;
      state.error = null;
    })
    .addCase(getAllFooter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default footerReducer; 