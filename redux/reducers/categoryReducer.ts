import { createReducer } from "@reduxjs/toolkit";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
} from "../actions/categoryActions";
import { CategoryData } from "../actions/categoryActions";

interface CategoryState {
  categories: CategoryData[];
  allCategories: CategoryData[];
  selectedCategory: CategoryData | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: CategoryState = {
  categories: [],
  allCategories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  success: false,
};

export const categoryReducer = createReducer(initialState, (builder) => {
  builder
    // Get Categories (Public)
    .addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Get Single Category
    .addCase(getCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCategory = action.payload;
      state.error = null;
    })
    .addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Category
    .addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.allCategories.unshift(action.payload);
      state.categories.unshift(action.payload);
      state.success = true;
      state.message = "Kategori başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Category
    .addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const updatedCategory = action.payload;
      
      // Update in allCategories
      const allIndex = state.allCategories.findIndex(cat => cat._id === updatedCategory._id);
      if (allIndex !== -1) {
        state.allCategories[allIndex] = updatedCategory;
      }
      
      // Update in categories
      const index = state.categories.findIndex(cat => cat._id === updatedCategory._id);
      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
      
      // Update selected category if it's the same
      if (state.selectedCategory?._id === updatedCategory._id) {
        state.selectedCategory = updatedCategory;
      }
      
      state.success = true;
      state.message = "Kategori başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Category
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      const deletedId = action.payload;
      
      state.allCategories = state.allCategories.filter(cat => cat._id !== deletedId);
      state.categories = state.categories.filter(cat => cat._id !== deletedId);
      
      if (state.selectedCategory?._id === deletedId) {
        state.selectedCategory = null;
      }
      
      state.success = true;
      state.message = "Kategori başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Categories (Admin)
    .addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.allCategories = action.payload;
      state.error = null;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default categoryReducer; 
 
 
 
 