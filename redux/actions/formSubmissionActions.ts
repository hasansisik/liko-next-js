import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface FormSubmission {
  _id?: string;
  name: string;
  phone: string;
  countryCode: string;
  countryName: string;
  message?: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  notes: string;
  companyId?: string;
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmitFormPayload {
  name: string;
  phone: string;
  countryCode: string;
  countryName: string;
  message?: string;
  companyId?: string;
}

export interface UpdateFormSubmissionPayload {
  submissionId: string;
  status?: "new" | "contacted" | "completed" | "cancelled";
  notes?: string;
  isArchived?: boolean;
}

// Submit a new form (Public)
export const submitForm = createAsyncThunk(
  "formSubmission/submitForm",
  async (payload: SubmitFormPayload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/form-submissions`, payload);
      return data.formSubmission;
    } catch (error: any) {
      console.error('Form submission error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Form gönderilemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all form submissions (Admin/Editor)
export const getAllFormSubmissions = createAsyncThunk(
  "formSubmission/getAllFormSubmissions",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const url = `${server}/form-submissions`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      if (!data.formSubmissions || !Array.isArray(data.formSubmissions)) {
        console.error('Invalid form submissions response format:', data);
        return [];
      }
      
      return data.formSubmissions;
    } catch (error: any) {
      console.error('Get form submissions error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Form verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a single form submission (Admin/Editor)
export const getFormSubmission = createAsyncThunk(
  "formSubmission/getFormSubmission",
  async (submissionId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/form-submissions/${submissionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.formSubmission;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verisi alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a form submission (Admin/Editor)
export const updateFormSubmission = createAsyncThunk(
  "formSubmission/updateFormSubmission",
  async (payload: UpdateFormSubmissionPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { submissionId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/form-submissions/${submissionId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.formSubmission;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a form submission (Admin)
export const deleteFormSubmission = createAsyncThunk(
  "formSubmission/deleteFormSubmission",
  async (submissionId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/form-submissions/${submissionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return submissionId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 