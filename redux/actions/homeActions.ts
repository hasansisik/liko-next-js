import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

// Type definitions matching home-1-data.ts
export interface IHeroBannerData {
  videoSrc: string;
  desktopTitle: string;
  mobileTitle: string;
  description: string;
}

export interface IServiceSectionData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface IAboutSectionItem {
  id: number;
  image: string;
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
}

export interface IAboutSectionData {
  mainTitle: string;
  items: IAboutSectionItem[];
}

export interface IVideoSectionData {
  videoSrc: string;
}

export interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface IFaqSectionData {
  title: string;
  description: string;
  shapeImage: string;
  faqItems: IFaqItem[];
}

export interface ITeamMember {
  id: number;
  img: string;
}

export interface ITeamSectionData {
  spacing?: string;
  teamMembers: ITeamMember[];
}

export interface HomeData {
  _id?: string;
  heroBanner: IHeroBannerData;
  serviceSection: IServiceSectionData;
  aboutSection: IAboutSectionData;
  teamSection: ITeamSectionData;
  videoSection: IVideoSectionData;
  faqSection: IFaqSectionData;
  companyId?: string;
  isActive?: boolean;
}

export interface CreateHomePayload {
  heroBanner: HomeData['heroBanner'];
  serviceSection: HomeData['serviceSection'];
  aboutSection: HomeData['aboutSection'];
  teamSection: HomeData['teamSection'];
  videoSection: HomeData['videoSection'];
  faqSection: HomeData['faqSection'];
}

export interface UpdateHomePayload {
  heroBanner?: Partial<HomeData['heroBanner']>;
  serviceSection?: Partial<HomeData['serviceSection']>;
  aboutSection?: Partial<HomeData['aboutSection']>;
  teamSection?: Partial<HomeData['teamSection']>;
  videoSection?: Partial<HomeData['videoSection']>;
  faqSection?: Partial<HomeData['faqSection']>;
}

// Get Home Data (Public - no auth required)
export const getHome = createAsyncThunk(
  "home/getHome",
  async (companyId?: string, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/home`, { params });
      return data.home;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Home verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Home Data
export const createHome = createAsyncThunk(
  "home/createHome",
  async (payload: CreateHomePayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/home`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.home;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Home verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Home Data
export const updateHome = createAsyncThunk(
  "home/updateHome",
  async (payload: UpdateHomePayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(`${server}/home`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.home;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Home verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Home Data
export const deleteHome = createAsyncThunk(
  "home/deleteHome",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Home verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Home Data (Admin)
export const getAllHome = createAsyncThunk(
  "home/getAllHome",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/home/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.homes;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Home verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 