import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface PolicyData {
  _id?: string;
  title: string;
  subtitle: string;
  type: "privacy-policy" | "terms-of-service" | "cookie-policy";
  htmlContent: string;
  lastUpdated?: Date;
  companyId?: string;
  isActive?: boolean;
}

export interface CreatePolicyPayload {
  title: string;
  subtitle: string;
  type: "privacy-policy" | "terms-of-service" | "cookie-policy";
  htmlContent: string;
}

export interface UpdatePolicyPayload {
  policyId: string;
  title?: string;
  subtitle?: string;
  htmlContent?: string;
}

// Get Policy Data (Public - no auth required)
export const getPolicy = createAsyncThunk(
  "policy/getPolicy",
  async (
    params: { 
      type: "privacy-policy" | "terms-of-service" | "cookie-policy";
      companyId?: string;
    }, 
    thunkAPI
  ) => {
    try {
      const { type, companyId } = params;
      const queryParams = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/policies/${type}`, { params: queryParams });
      return data.policy;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to retrieve policy';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Policy Data
export const createPolicy = createAsyncThunk(
  "policy/createPolicy",
  async (payload: CreatePolicyPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/policies`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.policy;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create policy';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Policy Data
export const updatePolicy = createAsyncThunk(
  "policy/updatePolicy",
  async (payload: UpdatePolicyPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { policyId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/policies/${policyId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.policy;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update policy';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Policy Data
export const deletePolicy = createAsyncThunk(
  "policy/deletePolicy",
  async (policyId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/policies/${policyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return policyId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete policy';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Policies (Admin)
export const getAllPolicies = createAsyncThunk(
  "policy/getAllPolicies",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/policies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.policies;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to retrieve policies';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 