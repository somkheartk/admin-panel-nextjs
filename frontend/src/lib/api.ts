import apiClient from './api-client';
import { AuthResponse, LoginCredentials, RegisterData } from '@/types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
};

export const usersApi = {
  getAll: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await apiClient.post('/users/change-password', data);
    return response.data;
  },
};
