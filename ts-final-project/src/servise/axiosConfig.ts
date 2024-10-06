import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { resetToken } from '../redux/user/slice';
import { refreshUser } from '../redux/user/operations';
import { store } from '../redux/store';


// Создание экземпляра axios с предустановленной конфигурацией
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

// Интерцептор для обработки ответов
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // Типизация ответа
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; // Расширение конфигурации запроса для добавления поля _retry
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Установка флага, чтобы избежать повторных запросов

      try {
        // Получение нового accessToken с помощью функции refreshUser
        const accessToken = await store.dispatch(refreshUser()).unwrap();
        console.log(accessToken);

        // Установка нового токена
        setAuthToken(accessToken);

        // Обновление токена в хранилище
        store.dispatch(resetToken(accessToken));

        // Обновление заголовков оригинального запроса
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // Повторный запрос с новым токеном
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('refreshError', refreshError);
        store.dispatch(refreshError());
      }
    }

    // Обработка других кодов ошибок
    if (
      error.response?.status === 409 ||
      error.response?.status === 404 ||
      error.response?.status === 400 ||
      error.response?.status === 500
    ) {
      return Promise.reject(error);
    }
  }
);

// Функция для установки токена авторизации в заголовки
export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Функция для очистки токена авторизации
export const clearAuthToken = () => {
  axiosInstance.defaults.headers.common['Authorization'] = '';
};
