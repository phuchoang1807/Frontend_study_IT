import axiosClient from './axiosClient';
import {
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getRefreshToken,
} from './tokenStorage';

// ApiResponse envelope theo AUTH_FLOW.md
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

// Schemas bám đúng openapi.yaml
export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type ForgotPasswordRequest = {
  email?: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type MessageResponse = {
  message: string;
};

export type UserInfo = {
  id: string;
  email: string;
  fullName: string;
  status: string;
  emailVerified: boolean;
  roles: string[];
  permissions: string[];
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpiresIn: number;
  user: UserInfo;
};

export type ErrorResponse = {
  code: string;
  message: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  fullName?: string;
};

// Auth API functions - luôn trả về data.data (unwrap ApiResponse)

export async function login(payload: LoginRequest): Promise<TokenResponse> {
  // Mock admin login
  if (payload.email === 'admin@gmail.com' && payload.password === 'admin123@') {
    const mockTokenData: TokenResponse = {
      accessToken: 'mock-admin-access-token',
      refreshToken: 'mock-admin-refresh-token',
      expiresIn: 3600,
      refreshTokenExpiresIn: 86400,
      user: {
        id: 'admin-id',
        email: 'admin@gmail.com',
        fullName: 'Nguyễn Văn An',
        status: 'ACTIVE',
        emailVerified: true,
        roles: ['ADMIN'],
        permissions: ['ALL'],
      },
    };
    setAccessToken(mockTokenData.accessToken);
    setRefreshToken(mockTokenData.refreshToken);
    return mockTokenData;
  }

  const response = await axiosClient.post<ApiResponse<TokenResponse>>(
    '/auth/login',
    payload
  );

  const tokenData = response.data.data;
  setAccessToken(tokenData.accessToken);
  setRefreshToken(tokenData.refreshToken);

  return tokenData;
}

export async function register(
  payload: RegisterRequest
): Promise<MessageResponse> {
  const response = await axiosClient.post<ApiResponse<MessageResponse>>(
    '/auth/register',
    payload
  );

  return response.data.data;
}

export async function logout(): Promise<MessageResponse> {
  const refreshToken = getRefreshToken();
  const response = await axiosClient.post<ApiResponse<MessageResponse>>(
    '/auth/logout',
    {},
    {
      headers: refreshToken
        ? { 'X-Refresh-Token': refreshToken }
        : undefined,
    }
  );

  clearTokens();
  return response.data.data;
}

export async function logoutAll(): Promise<MessageResponse> {
  const response = await axiosClient.post<ApiResponse<MessageResponse>>(
    '/auth/logout-all'
  );

  clearTokens();
  return response.data.data;
}

export async function getCurrentUser(): Promise<UserInfo> {
  const response = await axiosClient.get<ApiResponse<UserInfo>>('/auth/me');
  return response.data.data;
}

export async function forgotPassword(
  payload: ForgotPasswordRequest
): Promise<MessageResponse> {
  const response = await axiosClient.post<ApiResponse<MessageResponse>>(
    '/auth/forgot-password',
    payload
  );
  return response.data.data;
}

export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<MessageResponse> {
  const response = await axiosClient.post<ApiResponse<MessageResponse>>(
    '/auth/reset-password',
    payload
  );
  return response.data.data;
}

// Optional helper: gọi refresh chủ động nếu cần (đa số case rely vào interceptor)
export async function manualRefresh(): Promise<TokenResponse | null> {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    return null;
  }

  const response = await axiosClient.post<ApiResponse<TokenResponse>>(
    '/auth/refresh',
    {
      refreshToken: currentRefreshToken,
    } as RefreshRequest
  );

  const tokenData = response.data.data;
  setAccessToken(tokenData.accessToken);
  setRefreshToken(tokenData.refreshToken);

  return tokenData;
}

