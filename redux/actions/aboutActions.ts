import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface AboutData {
  _id?: string;
  hero: {
    backgroundImage: string;
    subtitle: string;
    title: string;
    description: string;
    scrollText: string;
  };
  aboutInfo: {
    welcomeText: string;
    mainContent: string;
    services: {
      title: string;
      subtitle: string;
      servicesList: {
        column1: string[];
        column2: string[];
      };
    };
  };
  companyId?: string;
  isActive?: boolean;
}

export interface CreateAboutPayload {
  hero: AboutData['hero'];
  aboutInfo: AboutData['aboutInfo'];
}

export interface UpdateAboutPayload {
  aboutId: string;
  hero?: Partial<AboutData['hero']>;
  aboutInfo?: Partial<AboutData['aboutInfo']>;
}

// Get About Data (Public - no auth required)
export const getAbout = createAsyncThunk(
  "about/getAbout",
  async (companyId?: string, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/about`, { params });
      return data.about;
    } catch (error: any) {
      const message = error.response?.data?.message || 'About verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create About Data
export const createAbout = createAsyncThunk(
  "about/createAbout",
  async (payload: CreateAboutPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/about`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.about;
    } catch (error: any) {
      const message = error.response?.data?.message || 'About verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update About Data
export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (payload: UpdateAboutPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { aboutId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/about/${aboutId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.about;
    } catch (error: any) {
      const message = error.response?.data?.message || 'About verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete About Data
export const deleteAbout = createAsyncThunk(
  "about/deleteAbout",
  async (aboutId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/about/${aboutId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return aboutId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'About verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All About Data (Admin)
export const getAllAbout = createAsyncThunk(
  "about/getAllAbout",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/about/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.aboutList;
    } catch (error: any) {
      const message = error.response?.data?.message || 'About verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 