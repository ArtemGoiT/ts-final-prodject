import { useDispatch } from 'react-redux';
import { axiosInstance, setAuthToken } from '../../servise/axiosConfig';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshError, resetToken } from '../../redux/user/slice';



// Функция для перехвата запросов Axios
export function AxiosInterceptor() {
  const dispatch = useDispatch();

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response, // Типизация ответа
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }; 
      // Дополнение интерфейса AxiosRequestConfig для добавления поля _retry

      console.log(originalRequest);

      if (error.response && error.response.status === 401 && originalRequest._retry === undefined) {
        originalRequest._retry = true; // Пометка для предотвращения повторного запроса

        try {
          const response = await axiosInstance.post('/users/refresh');
          console.log(response);

          const { accessToken } = response.data.data;
          console.log(accessToken);

          // Установка нового токена
          setAuthToken(accessToken);

          // Обновление токена в Redux
          dispatch(resetToken(accessToken));

          // Добавление нового токена в заголовки оригинального запроса
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          // Повторный вызов оригинального запроса с новым токеном
          return await axiosInstance(originalRequest);
        } catch (error) {
          console.log('refreshError', error);

          // Обработка ошибки обновления токена
          dispatch(refreshError());

          return Promise.reject(error);
        }
      }

      // Возврат ошибки, если она не связана с 401 или если обновление токена не удалось
      return Promise.reject(error);
    },
  );

  return null; // Компонент ничего не рендерит
}
