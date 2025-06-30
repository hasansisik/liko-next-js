import { createReducer } from "@reduxjs/toolkit";
import {
  getForm,
  createForm,
  updateForm,
  deleteForm,
  getAllForm
} from "../actions/formActions";
import { FormData } from "../actions/formActions";

interface FormState {
  form: FormData | null;
  formList: FormData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: FormState = {
  form: null,
  formList: [],
  loading: false,
  error: null,
  success: false,
};

export const formReducer = createReducer(initialState, (builder) => {
  builder
    // Get Form
    .addCase(getForm.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getForm.fulfilled, (state, action) => {
      state.loading = false;
      state.form = action.payload;
      state.error = null;
    })
    .addCase(getForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Form
    .addCase(createForm.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createForm.fulfilled, (state, action) => {
      state.loading = false;
      state.form = action.payload;
      state.success = true;
      state.message = "Form verisi başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Form
    .addCase(updateForm.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateForm.fulfilled, (state, action) => {
      state.loading = false;
      state.form = action.payload;
      state.success = true;
      state.message = "Form verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Form
    .addCase(deleteForm.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteForm.fulfilled, (state, action) => {
      state.loading = false;
      state.formList = state.formList.filter(form => form._id !== action.payload);
      state.success = true;
      state.message = "Form verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Form
    .addCase(getAllForm.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllForm.fulfilled, (state, action) => {
      state.loading = false;
      state.formList = action.payload;
      state.error = null;
    })
    .addCase(getAllForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default formReducer; 
 