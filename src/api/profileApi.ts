import axiosClient from './axiosClient';
import type { UserInfo } from './authApi';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type UpdateProfilePayload = {
  fullName?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
};

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserInfo> {
  const response = await axiosClient.put<ApiResponse<UserInfo>>(
    '/users/profile',
    payload
  );
  return response.data.data;
}
