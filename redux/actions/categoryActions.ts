import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface CategoryData {
  _id?: string;
  name: string;
  slug?: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive?: boolean;
  companyId?: string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateCategoryPayload {
  categoryId: string;
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive?: boolean;
}

// Get all categories (Public)
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (companyId: string | undefined, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      const { data } = await axios.get(`${server}/categories`, { params });
      return data.categories;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategoriler alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single category (Public)
export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/categories/${categoryId}`);
      return data.category;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategori alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create category (Admin/Editor)
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload: CreateCategoryPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/categories`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.category;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategori oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update category (Admin/Editor)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (payload: UpdateCategoryPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { categoryId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/categories/${categoryId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.category;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategori güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete category (Admin)
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return categoryId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategori silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all categories for admin (Admin/Editor)
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/categories/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.categories;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategoriler alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 
 
 
 
 