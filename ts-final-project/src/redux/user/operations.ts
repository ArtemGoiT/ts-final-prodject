import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../store'; // Импортируйте RootState из вашего хранилища
import { axiosInstance, clearAuthToken, setAuthToken } from '../../servise/axiosConfig';

// Типизация данных для пользователя
interface UserCredentials {
  email: string;
  password: string;
}

interface User {
  accessToken: string;
}

interface UpdateFields {
  [key: string]: any;
}

// Регистрация пользователя
export const registerUser = createAsyncThunk<
  User, // Тип возвращаемых данных
  UserCredentials, // Тип аргументов
  { rejectValue: string } // Тип ошибки
>('user/register', async (userCredentials, thunkApi) => {
  try {
    await axiosInstance.post('/users/register', userCredentials);

    const {
      data: {
        data: { accessToken },
      },
    } = await axiosInstance.post('users/login', userCredentials);

    setAuthToken(accessToken);

    return { accessToken };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Логин пользователя
export const loginUser = createAsyncThunk<
  User, // Тип возвращаемых данных
  UserCredentials, // Тип аргументов
  { rejectValue: string } // Тип ошибки
>('user/login', async (userCredentials, thunkApi) => {
  try {
    const {
      data: {
        data: { accessToken },
      },
    } = await axiosInstance.post('users/login', userCredentials);

    setAuthToken(accessToken);

    return { accessToken };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Логаут пользователя
export const logoutUser = createAsyncThunk<
  void, // Нет возвращаемых данных
  void, // Нет аргументов
  { rejectValue: string } // Тип ошибки
>('user/logout', async (_, thunkApi) => {
  try {
    await axiosInstance.post('users/logout');
    clearAuthToken();
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Обновление данных пользователя
export const updateUser = createAsyncThunk<
  any, // Тип возвращаемых данных (можно уточнить)
  UpdateFields, // Аргументы — поля для обновления
  { rejectValue: string } // Тип ошибки
>('user/update', async (fieldsToUpdate, thunkApi) => {
  try {
    const { data } = await axiosInstance.patch('/users/userId', fieldsToUpdate);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Обновление токена пользователя
export const refreshUser = createAsyncThunk<
  string, // Тип возвращаемых данных — новый токен
  void, // Нет аргументов
  { rejectValue: string } // Тип ошибки
>('user/refresh', async (_, thunkApi) => {
  try {
    const {
      data: {
        data: { accessToken },
      },
    } = await axiosInstance.post('/users/refresh');

    setAuthToken(accessToken);

    return accessToken;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Обновление аватара пользователя
export const updateAvatar = createAsyncThunk<
  string, // Тип возвращаемых данных — URL аватара
  File, // Аргумент — файл аватара
  { rejectValue: string } // Тип ошибки
>('user/updateAvatar', async (file, thunkApi) => {
  try {
    const {
      data: {
        data: { avatar },
      },
    } = await axiosInstance.patch('users/avatar', file);
    return avatar;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Получение данных пользователя
export const getUserData = createAsyncThunk<
  any, // Тип возвращаемых данных (можно уточнить)
  void, // Нет аргументов
  { rejectValue: string; state: RootState } // Тип ошибки и состояния
>('user/getUserData', async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    setAuthToken(state.auth.token);

    const response = await axiosInstance.get('users/data');

    return response.data.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});
