import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface BlogPostData {
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

export interface BlogComment {
  _id?: string;
  name: string;
  email: string;
  avatar?: string;
  date: string;
  comment: string;
  isApproved?: boolean;
  isGuest?: boolean;
}

export interface CreateBlogPostPayload {
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

export interface UpdateBlogPostPayload {
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

export interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  published?: boolean;
  search?: string;
}

export interface BlogPostsPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
}

// Get all blog posts with filtering and pagination
export const getAllBlogPosts = createAsyncThunk(
  "blogPosts/getAllBlogPosts",
  async (params: GetBlogPostsParams = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.published !== undefined) queryParams.append('published', params.published.toString());
      if (params.search) queryParams.append('search', params.search);

      const { data } = await axios.get(`${server}/blog-posts?${queryParams}`);
      return {
        blogPosts: data.blogPosts,
        pagination: data.pagination
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog postları alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single blog post
export const getBlogPost = createAsyncThunk(
  "blogPosts/getBlogPost",
  async (postId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/blog-posts/${postId}`);
      return data.blogPost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog post alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create blog post
export const createBlogPost = createAsyncThunk(
  "blogPosts/createBlogPost",
  async (payload: CreateBlogPostPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/blog-posts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blogPost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog post oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update blog post
export const updateBlogPost = createAsyncThunk(
  "blogPosts/updateBlogPost",
  async (payload: UpdateBlogPostPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { postId, ...updateData } = payload;
      const { data } = await axios.put(`${server}/blog-posts/${postId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.blogPost;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog post güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete blog post
export const deleteBlogPost = createAsyncThunk(
  "blogPosts/deleteBlogPost",
  async (postId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/blog-posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return postId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Blog post silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add comment to blog post
export const addComment = createAsyncThunk(
  "blogPosts/addComment",
  async ({ postId, comment }: { postId: string; comment: any }, thunkAPI) => {
    try {
      console.log('Sending comment request:', { postId, comment });
      const { data } = await axios.post(`${server}/blog-posts/${postId}/comments`, comment);
      return { postId, comment: data.comment };
    } catch (error: any) {
      console.error('Comment submission error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Comment could not be added';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get blog categories
export const getBlogCategories = createAsyncThunk(
  "blogPosts/getBlogCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${server}/categories`);
      return data.categories;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kategoriler alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all comments for admin
export const getAllComments = createAsyncThunk(
  "blogPosts/getAllComments",
  async (params: { status?: string; page?: number; limit?: number } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const queryParams = new URLSearchParams();
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const { data } = await axios.get(`${server}/blog-posts/comments?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        comments: data.comments,
        pagination: data.pagination
      };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Yorumlar alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve comment
export const approveComment = createAsyncThunk(
  "blogPosts/approveComment",
  async ({ postId, commentId }: { postId: string; commentId: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.put(`${server}/blog-posts/${postId}/comments/${commentId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { postId, commentId, comment: data.comment };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Yorum onaylanamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete comment
export const deleteComment = createAsyncThunk(
  "blogPosts/deleteComment",
  async ({ postId, commentId }: { postId: string; commentId: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/blog-posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { postId, commentId };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Yorum silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
); 