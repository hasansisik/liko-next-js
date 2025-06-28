import { createSlice } from '@reduxjs/toolkit';
import { getBlog, createBlog, updateBlog, deleteBlog, getAllBlog, BlogData } from '../actions/blogActions';

export interface BlogState {
  blog: BlogData | null;
  blogs: BlogData[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blog: null,
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBlog: (state) => {
      state.blog = null;
      state.blogs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Blog
    builder
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.error = null;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Blog
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.blogs.unshift(action.payload);
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Blog
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Blog
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = null;
        state.error = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get All Blogs
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearBlog } = blogSlice.actions;
export default blogSlice.reducer; 