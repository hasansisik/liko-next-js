import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

// Types
export interface IServiceHero {
  title: string;
  description: string;
  image: string;
}

export interface IServiceSection {
  subtitle: string;
  title: string;
}

export interface IServiceBigText {
  leftText: string;
  rightText: string;
  mainText: string;
  linkUrl: string;
}

export interface IService {
  _id?: string;
  hero: IServiceHero;
  serviceSection: IServiceSection;
  bigText: IServiceBigText;
  company?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceData {
  _id?: string;
  hero: {
    title: string;
    description: string;
    image: string;
  };
  serviceSection: {
    subtitle: string;
    title: string;
  };
  bigText: {
    leftText: string;
    rightText: string;
    mainText: string;
    linkUrl: string;
  };
  companyId?: string;
  isActive?: boolean;
}

export interface CreateServicePayload {
  hero: ServiceData['hero'];
  serviceSection: ServiceData['serviceSection'];
  bigText: ServiceData['bigText'];
}

export interface UpdateServicePayload {
  hero?: Partial<ServiceData['hero']>;
  serviceSection?: Partial<ServiceData['serviceSection']>;
  bigText?: Partial<ServiceData['bigText']>;
}

// Get Service Data
export const getService = createAsyncThunk(
  "service/getService",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/service`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.service;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Service Data
export const createService = createAsyncThunk(
  "service/createService",
  async (payload: CreateServicePayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/service`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.service;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Service Data
export const updateService = createAsyncThunk(
  "service/updateService",
  async (payload: UpdateServicePayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(`${server}/service`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.service;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Service Data
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/service`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Service Data (Admin)
export const getAllService = createAsyncThunk(
  "service/getAllService",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/service/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.services;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 