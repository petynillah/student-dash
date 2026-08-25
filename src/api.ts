import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically injects the JWT token for authorization checks
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const pureToken = token.replace(/^(Bearer\s+)+/i, '').trim();
    config.headers.Authorization = `Bearer ${pureToken}`;
  }
  return config;
});

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// 👤 STUDENT PROFILE SYNC
export const getStudentById = async (id: string | number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/student/${id}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.error || 'Sync failed' };
  }
};

// 📚 GENERAL CATALOG
export const getAllBooks = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/book/all');
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.error || 'Load failed' };
  }
};

// 🔍 AVAILABLE CATALOG
export const getAvailableBooks = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/book/available');
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.error || 'Load failed' };
  }
};

export const searchAvailableBooks = async (search: string): Promise<ApiResponse> => {
  try {
    const response = await api.get('/book/available', {
      params: { search }
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || error.response?.data?.error || 'Search failed' 
    };
  }
};

// ⏳ PERSONAL ACTIVE LOANS
export const getBorrowedBooks = async (studentId: string | number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/book/borrowed/${studentId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.error || 'Fetch failed' };
  }
};

export default api;
