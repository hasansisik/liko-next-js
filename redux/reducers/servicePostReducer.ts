import { createReducer } from "@reduxjs/toolkit";
import {
  getAllServicePosts,
  getServicePost,
  getServicePostById,
  createServicePost,
  updateServicePost,
  deleteServicePost,
  addServiceComment,
  getServiceCategories
} from "../actions/servicePostActions";
import { ServicePostData, ServicePostsPagination } from "../actions/servicePostActions";

interface ServiceCategory {
  name: string;
  postCount: number;
}

interface ServicePostState {
  servicePosts: ServicePostData[];
  currentServicePost: ServicePostData | null;
  categories: ServiceCategory[];
  pagination: ServicePostsPagination | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: ServicePostState = {
  servicePosts: [],
  currentServicePost: null,
  categories: [],
  pagination: null,
  loading: false,
  error: null,
  success: false,
};

export const servicePostReducer = createReducer(initialState, (builder) => {
  builder
    // Get All Service Posts
    .addCase(getAllServicePosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllServicePosts.fulfilled, (state, action) => {
      state.loading = false;
      state.servicePosts = action.payload.servicePosts;
      state.pagination = action.payload.pagination;
      state.error = null;
    })
    .addCase(getAllServicePosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Single Service Post
    .addCase(getServicePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getServicePost.fulfilled, (state, action) => {
      state.loading = false;
      state.currentServicePost = action.payload;
      state.error = null;
    })
    .addCase(getServicePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Service Post
    .addCase(createServicePost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createServicePost.fulfilled, (state, action) => {
      state.loading = false;
      state.servicePosts.unshift(action.payload);
      state.success = true;
      state.message = "Service post başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createServicePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Service Post
    .addCase(updateServicePost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateServicePost.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.servicePosts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.servicePosts[index] = action.payload;
      }
      if (state.currentServicePost?._id === action.payload._id) {
        state.currentServicePost = action.payload;
      }
      state.success = true;
      state.message = "Service post başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateServicePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Service Post
    .addCase(deleteServicePost.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteServicePost.fulfilled, (state, action) => {
      state.loading = false;
      state.servicePosts = state.servicePosts.filter(post => post._id !== action.payload);
      if (state.currentServicePost?._id === action.payload) {
        state.currentServicePost = null;
      }
      state.success = true;
      state.message = "Service post başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteServicePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Add Comment
    .addCase(addServiceComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addServiceComment.fulfilled, (state, action) => {
      state.loading = false;
      const { postId, comment } = action.payload;
      
      // Update current service post if it matches
      if (state.currentServicePost?._id === postId) {
        if (!state.currentServicePost.comments) {
          state.currentServicePost.comments = [];
        }
        state.currentServicePost.comments.push(comment);
        state.currentServicePost.commentCount = state.currentServicePost.comments.length;
      }
      
      // Update in service posts list
      const postIndex = state.servicePosts.findIndex(post => post._id === postId);
      if (postIndex !== -1) {
        if (!state.servicePosts[postIndex].comments) {
          state.servicePosts[postIndex].comments = [];
        }
        state.servicePosts[postIndex].comments!.push(comment);
        state.servicePosts[postIndex].commentCount = state.servicePosts[postIndex].comments!.length;
      }
      
      state.error = null;
    })
    .addCase(addServiceComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Categories
    .addCase(getServiceCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getServiceCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    })
    .addCase(getServiceCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default servicePostReducer; 
 
 
 
 