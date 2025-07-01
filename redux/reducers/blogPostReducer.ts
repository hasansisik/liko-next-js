import { createReducer } from "@reduxjs/toolkit";
import {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  getBlogCategories,
  BlogPostData
} from "../actions/blogPostActions";
import { CategoryData } from "../actions/categoryActions";

interface BlogPostState {
  blogPosts: BlogPostData[];
  selectedBlogPost: BlogPostData | null;
  categories: CategoryData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: BlogPostState = {
  blogPosts: [],
  selectedBlogPost: null,
  categories: [],
  pagination: null,
  loading: false,
  error: null,
  success: false,
};

export const blogPostReducer = createReducer(initialState, (builder) => {
  builder
    // Get All Blog Posts
    .addCase(getAllBlogPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllBlogPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.blogPosts = action.payload.blogPosts;
      state.pagination = action.payload.pagination;
      state.error = null;
    })
    .addCase(getAllBlogPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Single Blog Post
    .addCase(getBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getBlogPost.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedBlogPost = action.payload;
      state.error = null;
    })
    .addCase(getBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Blog Post
    .addCase(createBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createBlogPost.fulfilled, (state, action) => {
      state.loading = false;
      state.blogPosts.unshift(action.payload);
      state.selectedBlogPost = action.payload;
      state.success = true;
      state.message = "Blog post başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Blog Post
    .addCase(updateBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateBlogPost.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.blogPosts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.blogPosts[index] = action.payload;
      }
      state.selectedBlogPost = action.payload;
      state.success = true;
      state.message = "Blog post başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Blog Post
    .addCase(deleteBlogPost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteBlogPost.fulfilled, (state, action) => {
      state.loading = false;
      state.blogPosts = state.blogPosts.filter(post => post._id !== action.payload);
      if (state.selectedBlogPost?._id === action.payload) {
        state.selectedBlogPost = null;
      }
      state.success = true;
      state.message = "Blog post başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteBlogPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Add Comment
    .addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      const { postId, comment } = action.payload;
      
      // Update selected blog post if it's the same
      if (state.selectedBlogPost?._id === postId) {
        if (!state.selectedBlogPost.comments) {
          state.selectedBlogPost.comments = [];
        }
        state.selectedBlogPost.comments.push(comment);
        state.selectedBlogPost.commentCount = state.selectedBlogPost.comments.length;
      }
      
      // Update in blog posts list
      const postIndex = state.blogPosts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        if (!state.blogPosts[postIndex].comments) {
          state.blogPosts[postIndex].comments = [];
        }
        state.blogPosts[postIndex].comments!.push(comment);
        state.blogPosts[postIndex].commentCount = state.blogPosts[postIndex].comments!.length;
      }
      
      state.success = true;
      state.message = "Yorum başarıyla eklendi";
      state.error = null;
    })
    .addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Blog Categories
    .addCase(getBlogCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getBlogCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    })
    .addCase(getBlogCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default blogPostReducer; 
 
 
 
 