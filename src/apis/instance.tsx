import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshTokenApi } from './refresh';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const skipAuthUrls = ['/auth/signup', '/auth/login', '/auth/refresh'];
    if (skipAuthUrls.some((url) => config.url?.includes(url))) {
      return config;
    }

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (!accessToken || !refreshToken) {
      // accessToken 또는 refreshToken 없으면 헤더 안 넣음
      return config;
    }

    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        // refreshToken 없으면 재발급 시도 안 함
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshTokenApi(); // 리프레시 토큰으로 accessToken 재발급
        const accessToken = Cookies.get('accessToken');
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest); // 재요청
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
