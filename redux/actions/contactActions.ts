import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface SocialMedia {
  id: number;
  name: string;
  link: string;
}

export interface ContactForm {
  nameLabel: string;
  namePlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  buttonText: string;
}

export interface Location {
  id: number;
  img: string;
  country: string;
  time: string;
  locationTitle: string;
  address: string;
  phone: string;
  email: string;
  mapsText: string;
  mapsUrl: string;
}

export interface ContactData {
  _id?: string;
  hero: {
    backgroundImage: string;
    subtitle: string;
    title: string;
  };
  contactForm: {
    title: string;
    subtitle: string;
    socialText: string;
    socialMedia: SocialMedia[];
    form: ContactForm;
  };
  contactInfo: {
    locations: Location[];
  };
  companyId?: string;
  isActive?: boolean;
}

export interface CreateContactPayload {
  hero: ContactData['hero'];
  contactForm: ContactData['contactForm'];
  contactInfo: ContactData['contactInfo'];
}

export interface UpdateContactPayload {
  contactId: string;
  hero?: Partial<ContactData['hero']>;
  contactForm?: Partial<ContactData['contactForm']>;
  contactInfo?: Partial<ContactData['contactInfo']>;
}

// Get Contact Data (Public - no auth required)
export const getContact = createAsyncThunk(
  "contact/getContact",
  async (companyId?: string, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/contact`, { params });
      return data.contact;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Contact verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Contact Data
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (payload: CreateContactPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/contact`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.contact;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Contact verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Contact Data
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (payload: UpdateContactPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { contactId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/contact/${contactId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.contact;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Contact verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Contact Data
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return contactId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Contact verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Contact Data (Admin)
export const getAllContact = createAsyncThunk(
  "contact/getAllContact",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/contact/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.contactList;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Contact verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 