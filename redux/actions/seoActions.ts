import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface SEOData {
  _id?: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots: string;
  structuredData?: any;
  companyId?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSEOPayload {
  pageName: string;
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: any;
  isActive?: boolean;
}

export interface UpdateSEOPayload {
  id: string;
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: any;
  isActive?: boolean;
}

// Get all SEO data (admin only)
export const getAllSEO = createAsyncThunk(
  "seo/getAllSEO",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/seo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.seoData;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get SEO data by page name (admin only)
export const getSEOByPage = createAsyncThunk(
  "seo/getSEOByPage",
  async (pageName: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/seo/${pageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.seoData;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verisi alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get public SEO data (for frontend)
export const getPublicSEO = createAsyncThunk(
  "seo/getPublicSEO",
  async (params: { pageName: string; companyId?: string }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.companyId) queryParams.append('companyId', params.companyId);
      
      const { data } = await axios.get(`${server}/seo/public/${params.pageName}?${queryParams}`);
      return data.seoData;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verisi alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create SEO data
export const createSEO = createAsyncThunk(
  "seo/createSEO",
  async (payload: CreateSEOPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/seo`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.seoData;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update SEO data
export const updateSEO = createAsyncThunk(
  "seo/updateSEO",
  async (payload: UpdateSEOPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { id, ...updateData } = payload;
      const { data } = await axios.put(`${server}/seo/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.seoData;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete SEO data
export const deleteSEO = createAsyncThunk(
  "seo/deleteSEO",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/seo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || 'SEO verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 