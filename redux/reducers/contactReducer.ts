import { createReducer } from "@reduxjs/toolkit";
import {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getAllContact
} from "../actions/contactActions";
import { ContactData } from "../actions/contactActions";

interface ContactState {
  contact: ContactData | null;
  contactList: ContactData[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message?: string;
}

const initialState: ContactState = {
  contact: null,
  contactList: [],
  loading: false,
  error: null,
  success: false,
};

export const contactReducer = createReducer(initialState, (builder) => {
  builder
    // Get Contact
    .addCase(getContact.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.error = null;
    })
    .addCase(getContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Create Contact
    .addCase(createContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.success = true;
      state.message = "Contact verisi başarıyla oluşturuldu";
      state.error = null;
    })
    .addCase(createContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Update Contact
    .addCase(updateContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.success = true;
      state.message = "Contact verisi başarıyla güncellendi";
      state.error = null;
    })
    .addCase(updateContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Delete Contact
    .addCase(deleteContact.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contactList = state.contactList.filter(contact => contact._id !== action.payload);
      state.success = true;
      state.message = "Contact verisi başarıyla silindi";
      state.error = null;
    })
    .addCase(deleteContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    
    // Get All Contact
    .addCase(getAllContact.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contactList = action.payload;
      state.error = null;
    })
    .addCase(getAllContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});

export default contactReducer; 