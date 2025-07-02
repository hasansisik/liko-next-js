import { createReducer } from "@reduxjs/toolkit";
import {
  submitForm,
  getAllFormSubmissions,
  getFormSubmission,
  updateFormSubmission,
  deleteFormSubmission
} from "../actions/formSubmissionActions";
import { FormSubmission } from "../actions/formSubmissionActions";

interface FormSubmissionState {
  formSubmission: FormSubmission | null;
  formSubmissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: FormSubmissionState = {
  formSubmission: null,
  formSubmissions: [],
  loading: false,
  error: null,
  success: false,
};

export const formSubmissionReducer = createReducer(initialState, (builder) => {
  builder
    // Submit Form
    .addCase(submitForm.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(submitForm.fulfilled, (state, action) => {
      state.loading = false;
      state.formSubmission = action.payload;
      // Add the new submission to the array if it exists
      if (action.payload && action.payload._id) {
        state.formSubmissions = [action.payload, ...state.formSubmissions];
      }
      state.success = true;
      state.message = "Form başarıyla gönderildi";
      state.error = null;
    })
    .addCase(submitForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Form Submissions
    .addCase(getAllFormSubmissions.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllFormSubmissions.fulfilled, (state, action) => {
      state.loading = false;
      // Handle both direct array and object with formSubmissions property
      if (action.payload && Array.isArray(action.payload)) {
        state.formSubmissions = action.payload;
      } else if (action.payload && typeof action.payload === 'object' && action.payload.formSubmissions) {
        state.formSubmissions = action.payload.formSubmissions;
      } else {
        state.formSubmissions = [];
      }
      state.error = null;
    })
    .addCase(getAllFormSubmissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Form Submission
    .addCase(getFormSubmission.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getFormSubmission.fulfilled, (state, action) => {
      state.loading = false;
      state.formSubmission = action.payload;
      state.error = null;
    })
    .addCase(getFormSubmission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Update Form Submission
    .addCase(updateFormSubmission.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateFormSubmission.fulfilled, (state, action) => {
      state.loading = false;
      state.formSubmission = action.payload;
      state.formSubmissions = state.formSubmissions.map(submission => 
        submission._id === action.payload._id ? action.payload : submission
      );
      state.success = true;
      state.message = "Form verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateFormSubmission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Form Submission
    .addCase(deleteFormSubmission.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteFormSubmission.fulfilled, (state, action) => {
      state.loading = false;
      state.formSubmissions = state.formSubmissions.filter(
        submission => submission._id !== action.payload
      );
      state.success = true;
      state.message = "Form verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteFormSubmission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
});

export default formSubmissionReducer; 