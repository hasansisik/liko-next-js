import { createSlice } from '@reduxjs/toolkit';
import { getService, createService, updateService, deleteService, getAllService, ServiceData } from '../actions/serviceActions';

// Types
export interface IServiceHero {
  title: string;
  description: string;
  image: string;
}

export interface IServiceSection {
  subtitle: string;
  title: string;
}

export interface IServiceBigText {
  leftText: string;
  rightText: string;
  mainText: string;
  linkUrl: string;
}

export interface IService {
  _id?: string;
  hero: IServiceHero;
  serviceSection: IServiceSection;
  bigText: IServiceBigText;
  company?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceState {
  service: ServiceData | null;
  services: ServiceData[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  service: null,
  services: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearService: (state) => {
      state.service = null;
      state.services = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Service
    builder
      .addCase(getService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null;
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Service
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.services.unshift(action.payload);
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Service
    builder
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        const index = state.services.findIndex(service => service._id === action.payload._id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Service
    builder
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.service = null;
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get All Services
    builder
      .addCase(getAllService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(getAllService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearService } = serviceSlice.actions;
export default serviceSlice.reducer; 