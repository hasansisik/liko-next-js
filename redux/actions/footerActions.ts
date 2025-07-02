import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface Link {
  text: string;
  url: string;
}

export interface Company {
  logo: string;
  logoDark: string;
  description: string;
}

export interface Office {
  title: string;
  address: {
    text: string;
    url: string;
  };
  phone: {
    text: string;
    number: string;
  };
  email: {
    text: string;
    address: string;
  };
}

export interface Sitemap {
  title: string;
  links: Link[];
}

export interface Legal {
  title: string;
  links: Link[];
}

export interface Copyright {
  text: string; // {year} will be replaced with current year
  socialLinks: Link[];
}

export interface FooterData {
  _id?: string;
  company: Company;
  office: Office;
  sitemap: Sitemap;
  legal: Legal;
  copyright: Copyright;
  companyId?: string;
  isActive?: boolean;
}

export interface CreateFooterPayload {
  company: FooterData['company'];
  office: FooterData['office'];
  sitemap: FooterData['sitemap'];
  legal: FooterData['legal'];
  copyright: FooterData['copyright'];
}

export interface UpdateFooterPayload {
  footerId: string;
  company?: Partial<FooterData['company']>;
  office?: Partial<FooterData['office']>;
  sitemap?: Partial<FooterData['sitemap']>;
  legal?: Partial<FooterData['legal']>;
  copyright?: Partial<FooterData['copyright']>;
}

// Get Footer Data (Public - no auth required)
export const getFooter = createAsyncThunk(
  "footer/getFooter",
  async (companyId: string | undefined, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/footer`, { params });
      
      return data.footer;
    } catch (error: any) {
      console.error('getFooter - Error:', error);
      const message = error.response?.data?.message || 'Footer verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Footer Data
export const createFooter = createAsyncThunk(
  "footer/createFooter",
  async (payload: CreateFooterPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/footer`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.footer;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Footer verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Footer Data
export const updateFooter = createAsyncThunk(
  "footer/updateFooter",
  async (payload: UpdateFooterPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { footerId, ...updateData } = payload;
      
      const { data } = await axios.put(`${server}/footer/${footerId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return data.footer;
    } catch (error: any) {
      console.error('updateFooter - Error:', error);
      console.error('updateFooter - Error response:', error.response?.data);
      const message = error.response?.data?.message || 'Footer verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Footer Data
export const deleteFooter = createAsyncThunk(
  "footer/deleteFooter",
  async (footerId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/footer/${footerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return footerId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Footer verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Footer Data (Admin)
export const getAllFooter = createAsyncThunk(
  "footer/getAllFooter",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/footer/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.footerList;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Footer verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);