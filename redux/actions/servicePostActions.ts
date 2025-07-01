import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface ServicePostData {
  _id?: string;
  title: string;
  slug?: string; // Auto-generated, read-only
  img: string;
  images?: string[];
  categories: string[]; // Multiple categories
  tags?: string[]; // New tags field
  date?: string; // Virtual field from createdAt
  author?: string;
  videoId?: string;
  avatar?: string;
  blogQuote?: boolean;
  video?: boolean;
  imgSlider?: boolean;
  blogQuoteTwo?: boolean;
  blogHeroSlider?: boolean;
  desc: string;
  content: {
    htmlContent: string;
  };
  comments?: Array<{
    id?: string;
    name: string;
    avatar?: string;
    date: string;
    comment: string;
  }>;
  commentCount?: number;
  companyId?: string;
  isPublished?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceComment {
  _id?: string;
  name: string;
  avatar?: string;
  date: string;
  comment: string;
}

export interface CreateServicePostPayload {
  title: string;
  img: string;
  images?: string[];
  categories: string[]; // Multiple categories
  tags?: string[]; // New tags field
  author?: string;
  videoId?: string;
  avatar?: string;
  blogQuote?: boolean;
  video?: boolean;
  imgSlider?: boolean;
  blogQuoteTwo?: boolean;
  blogHeroSlider?: boolean;
  desc: string;
  content: {
    htmlContent: string;
  };
  isPublished?: boolean;
}

export interface UpdateServicePostPayload {
  postId: string;
  title?: string;
  img?: string;
  images?: string[];
  categories?: string[]; // Multiple categories
  tags?: string[]; // New tags field
  author?: string;
  videoId?: string;
  avatar?: string;
  blogQuote?: boolean;
  video?: boolean;
  imgSlider?: boolean;
  blogQuoteTwo?: boolean;
  blogHeroSlider?: boolean;
  desc?: string;
  content?: {
    htmlContent: string;
  };
  isPublished?: boolean;
}

export interface GetServicePostsParams {
  page?: number;
  limit?: number;
  category?: string;
  published?: boolean;
  search?: string;
}

export interface ServicePostsPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
}

// Get all service posts with filtering and pagination
export const getAllServicePosts = createAsyncThunk(
  "servicePosts/getAllServicePosts",
  async (params: GetServicePostsParams = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.published !== undefined) queryParams.append('published', params.published.toString());
      if (params.search) queryParams.append('search', params.search);

      const { data } = await axios.get(`${server}/service-posts?${queryParams}`);
      return {
        servicePosts: data.servicePosts,
        pagination: data.pagination
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service postları alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single service post
export const getServicePost = createAsyncThunk(
  "servicePosts/getServicePost",
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/service-posts/${postId}`);
      return data.servicePost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service post alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Alias for getServicePost
export const getServicePostById = getServicePost;

// Create service post
export const createServicePost = createAsyncThunk(
  "servicePosts/createServicePost",
  async (payload: CreateServicePostPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/service-posts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.servicePost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service post oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update service post
export const updateServicePost = createAsyncThunk(
  "servicePosts/updateServicePost",
  async (payload: UpdateServicePostPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { postId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/service-posts/${postId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.servicePost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service post güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete service post
export const deleteServicePost = createAsyncThunk(
  "servicePosts/deleteServicePost",
  async (postId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/service-posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return postId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Service post silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add comment to service post
export const addServiceComment = createAsyncThunk(
  "servicePosts/addServiceComment",
  async ({ postId, comment }: { postId: string; comment: any }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${server}/service-posts/${postId}/comments`, comment);
      return { postId, comment: data.comment };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Yorum eklenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get service categories
export const getServiceCategories = createAsyncThunk(
  "servicePosts/getServiceCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/service-posts/categories`);
      return data.categories;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategoriler alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 
 
 
 
 