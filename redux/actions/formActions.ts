import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface Country {
  name: string;
  code: string;
  flag: string;
  phone: string;
}

export interface Placeholders {
  name: string;
  phone: string;
  countrySearch: string;
}

export interface FormData {
  _id?: string;
  title: string;
  subtitle: string;
  responseTime: string;
  showWhatsApp: boolean;
  whatsAppText: string;
  whatsAppLink: string;
  submitButtonText: string;
  placeholders: Placeholders;
  defaultCountry: string;
  countries: Country[];
  companyId?: string;
  isActive?: boolean;
}

export interface CreateFormPayload {
  title: FormData['title'];
  subtitle: FormData['subtitle'];
  responseTime: FormData['responseTime'];
  showWhatsApp: FormData['showWhatsApp'];
  whatsAppText: FormData['whatsAppText'];
  whatsAppLink: FormData['whatsAppLink'];
  submitButtonText: FormData['submitButtonText'];
  placeholders: FormData['placeholders'];
  defaultCountry: FormData['defaultCountry'];
  countries: FormData['countries'];
}

export interface UpdateFormPayload {
  formId: string;
  title?: string;
  subtitle?: string;
  responseTime?: string;
  showWhatsApp?: boolean;
  whatsAppText?: string;
  whatsAppLink?: string;
  submitButtonText?: string;
  placeholders?: Partial<FormData['placeholders']>;
  defaultCountry?: string;
  countries?: FormData['countries'];
}

// Get Form Data (Public - no auth required)
export const getForm = createAsyncThunk(
  "form/getForm",
  async (companyId: string | undefined, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      console.log('getForm - Making request to:', `${server}/form`);
      console.log('getForm - Params:', params);
      
      const { data } = await axios.get(`${server}/form`, { params });
      
      console.log('getForm - Response data:', data);
      console.log('getForm - Form object:', data.form);
      console.log('getForm - Form ID:', data.form?._id);
      
      return data.form;
    } catch (error: any) {
      console.error('getForm - Error:', error);
      const message = error.response?.data?.message || 'Form verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Form Data
export const createForm = createAsyncThunk(
  "form/createForm",
  async (payload: CreateFormPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/form`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.form;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Form Data
export const updateForm = createAsyncThunk(
  "form/updateForm",
  async (payload: UpdateFormPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { formId, ...updateData } = payload;
      
      console.log('updateForm - Payload:', payload);
      console.log('updateForm - Token:', token ? 'Present' : 'Missing');
      console.log('updateForm - URL:', `${server}/form/${formId}`);
      console.log('updateForm - Update data:', updateData);
      
      const { data } = await axios.put(`${server}/form/${formId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('updateForm - Response:', data);
      return data.form;
    } catch (error: any) {
      console.error('updateForm - Error:', error);
      console.error('updateForm - Error response:', error.response?.data);
      const message = error.response?.data?.message || 'Form verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Form Data
export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async (formId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/form/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return formId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Form Data (Admin)
export const getAllForm = createAsyncThunk(
  "form/getAllForm",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/form/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.formList;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Form verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 
 