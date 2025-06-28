import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface BlogData {
  _id?: string;
  hero: {
    videoSrc: string;
    title: string;
    description: string;
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

export interface CreateBlogPayload {
  hero: BlogData['hero'];
  bigText: BlogData['bigText'];
}

export interface UpdateBlogPayload {
  hero?: Partial<BlogData['hero']>;
  bigText?: Partial<BlogData['bigText']>;
}

// Get Blog Data
export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blog;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Blog Data
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (payload: CreateBlogPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/blog`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blog;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Blog Data
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (payload: UpdateBlogPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(`${server}/blog`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blog;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Blog Data
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Blog Data (Admin)
export const getAllBlog = createAsyncThunk(
  "blog/getAllBlog",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/blog/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blogs;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 