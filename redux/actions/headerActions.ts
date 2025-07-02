import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface SubMenu {
  id: number;
  title: string;
  url: string;
}

export interface Menu {
  id: number;
  title: string;
  url: string;
  hasDropdown: boolean;
  subMenus?: SubMenu[];
}

export interface Navigation {
  menus: Menu[];
  cta: {
    text: string;
    action: string;
  };
}

export interface Logo {
  default: string;
  dark: string;
  sticky: string;
  alt: string;
  dimensions: {
    default: {
      width: number;
      height: number;
    };
    sticky: {
      width: number;
      height: number;
    };
  };
}

export interface Mobile {
  hamburgerIcon: {
    lines: number;
    animation: boolean;
  };
  offcanvas: {
    logo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    information: {
      title: string;
      phone: {
        text: string;
        number: string;
      };
      email: {
        text: string;
        address: string;
      };
      address: {
        text: string;
        link?: string;
      };
    };
    socialMedia: {
      title: string;
      links: Array<{
        platform: string;
        url: string;
        icon: string;
      }>;
    };
  };
}

export interface Dialog {
  enabled: boolean;
  backdrop: {
    backgroundColor: string;
    closeOnClick: boolean;
  };
  closeButton: {
    text: string;
    size: string;
    position: {
      top: string;
      right: string;
    };
  };
}

export interface Styling {
  container: {
    padding: string;
    maxWidth: string;
  };
  header: {
    padding: string;
    transition: string;
    stickyBackground: string;
    transparentBackground: string;
    boxShadow: {
      default: string;
      sticky: string;
    };
  };
  colors: {
    hamburger: {
      default: string;
      black: string;
      white: string;
      sticky: string;
    };
  };
}

export interface HeaderData {
  _id?: string;
  logo: Logo;
  navigation: Navigation;
  mobile: Mobile;
  dialog: Dialog;
  styling: Styling;
  companyId?: string;
  isActive?: boolean;
}

export interface CreateHeaderPayload {
  logo: HeaderData['logo'];
  navigation: HeaderData['navigation'];
  mobile: HeaderData['mobile'];
  dialog: HeaderData['dialog'];
  styling: HeaderData['styling'];
}

export interface UpdateHeaderPayload {
  headerId: string;
  logo?: Partial<HeaderData['logo']>;
  navigation?: Partial<HeaderData['navigation']>;
  mobile?: Partial<HeaderData['mobile']>;
  dialog?: Partial<HeaderData['dialog']>;
  styling?: Partial<HeaderData['styling']>;
}

// Get Header Data (Public - no auth required)
export const getHeader = createAsyncThunk(
  "header/getHeader",
  async (companyId: string | undefined, thunkAPI) => {
    try {
      const params = companyId ? { companyId } : {};
      
      const { data } = await axios.get(`${server}/header`, { params });

      return data.header;
    } catch (error: any) {
      console.error('getHeader - Error:', error);
      const message = error.response?.data?.message || 'Header verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Header Data
export const createHeader = createAsyncThunk(
  "header/createHeader",
  async (payload: CreateHeaderPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/header`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.header;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Header verisi oluşturulamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Header Data
export const updateHeader = createAsyncThunk(
  "header/updateHeader",
  async (payload: UpdateHeaderPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { headerId, ...updateData } = payload;
      
      const { data } = await axios.put(`${server}/header/${headerId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return data.header;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Header verisi güncellenemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Header Data
export const deleteHeader = createAsyncThunk(
  "header/deleteHeader",
  async (headerId: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${server}/header/${headerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return headerId;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Header verisi silinemedi';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All Header Data (Admin)
export const getAllHeader = createAsyncThunk(
  "header/getAllHeader",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/header/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.headerList;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Header verileri alınamadı';
      return thunkAPI.rejectWithValue(message);
    }
  }
);