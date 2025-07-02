import { createReducer } from "@reduxjs/toolkit";
import {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  getAllComments,
  approveComment,
  deleteComment,
  getBlogCategories,
  BlogPostData
} from "../actions/blogPostActions";
import { CategoryData } from "../actions/categoryActions";

interface BlogPostState {
  blogPosts: BlogPostData[];
  selectedBlogPost: BlogPostData | null;
  categories: CategoryData[];
  comments: any[];
  commentsPagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
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
  comments: [],
  commentsPagination: null,
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
      state.message = "Blog post created successfully";
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
      state.message = "Blog post updated successfully";
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
      state.message = "Blog post deleted successfully";
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
      // Don't add comment to state since it needs approval
      // Just show success message
      state.success = true;
      state.message = "Comment submitted successfully. It will appear after approval.";
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
    })
    
    // Get All Comments
    .addCase(getAllComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload.comments;
      state.commentsPagination = action.payload.pagination;
      state.error = null;
    })
    .addCase(getAllComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Approve Comment
    .addCase(approveComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(approveComment.fulfilled, (state, action) => {
      state.loading = false;
      const { postId, commentId } = action.payload;
      
      // Update in comments list
      const commentIndex = state.comments.findIndex(c => c.comment._id === commentId);
      if (commentIndex !== -1) {
        state.comments[commentIndex].comment.isApproved = true;
      }
      
      state.success = true;
      state.message = "Comment approved";
      state.error = null;
    })
    .addCase(approveComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Delete Comment
    .addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      const { commentId } = action.payload;
      
      // Remove from comments list
      state.comments = state.comments.filter(c => c.comment._id !== commentId);
      
      state.success = true;
      state.message = "Comment deleted";
      state.error = null;
    })
    .addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default blogPostReducer; 
 
 
 
 