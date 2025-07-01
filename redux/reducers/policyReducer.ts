import { createReducer } from "@reduxjs/toolkit";
import {
  getPolicy,
  createPolicy,
  updatePolicy,
  deletePolicy,
  getAllPolicies
} from "../actions/policyActions";
import { PolicyData } from "../actions/policyActions";

interface PolicyState {
  policy: PolicyData | null;
  policies: PolicyData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: PolicyState = {
  policy: null,
  policies: [],
  loading: false,
  error: null,
  success: false,
};

export const policyReducer = createReducer(initialState, (builder) => {
  builder
    // Get Policy
    .addCase(getPolicy.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.policy = action.payload;
      state.error = null;
    })
    .addCase(getPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Policy
    .addCase(createPolicy.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createPolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.policy = action.payload;
      state.policies = [action.payload, ...state.policies];
      state.success = true;
      state.message = "Policy created successfully";
      state.error = null;
    })
    .addCase(createPolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Policy
    .addCase(updatePolicy.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updatePolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.policy = action.payload;
      state.policies = state.policies.map(policy => 
        policy._id === action.payload._id ? action.payload : policy
      );
      state.success = true;
      state.message = "Policy updated successfully";
      state.error = null;
    })
    .addCase(updatePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Policy
    .addCase(deletePolicy.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deletePolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.policies = state.policies.filter(policy => policy._id !== action.payload);
      state.success = true;
      state.message = "Policy deleted successfully";
      state.error = null;
    })
    .addCase(deletePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Policies
    .addCase(getAllPolicies.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllPolicies.fulfilled, (state, action) => {
      state.loading = false;
      state.policies = action.payload;
      state.error = null;
    })
    .addCase(getAllPolicies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default policyReducer; 