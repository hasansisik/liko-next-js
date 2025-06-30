import { createReducer } from "@reduxjs/toolkit";
import {
  getHeader,
  createHeader,
  updateHeader,
  deleteHeader,
  getAllHeader
} from "../actions/headerActions";
import { HeaderData } from "../actions/headerActions";

interface HeaderState {
  header: HeaderData | null;
  headerList: HeaderData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: HeaderState = {
  header: null,
  headerList: [],
  loading: false,
  error: null,
  success: false,
};

export const headerReducer = createReducer(initialState, (builder) => {
  builder
    // Get Header
    .addCase(getHeader.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.header = action.payload;
      state.error = null;
    })
    .addCase(getHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Header
    .addCase(createHeader.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.header = action.payload;
      state.success = true;
      state.message = "Header verisi başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Header
    .addCase(updateHeader.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.header = action.payload;
      state.success = true;
      state.message = "Header verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Header
    .addCase(deleteHeader.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.headerList = state.headerList.filter(header => header._id !== action.payload);
      state.success = true;
      state.message = "Header verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Header
    .addCase(getAllHeader.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllHeader.fulfilled, (state, action) => {
      state.loading = false;
      state.headerList = action.payload;
      state.error = null;
    })
    .addCase(getAllHeader.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default headerReducer; 