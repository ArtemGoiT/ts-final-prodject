import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  updateUser,
  updateAvatar,
  getUserData,
} from './operations';

// Типы для состояния пользователя
interface User {
  name: string | null;
  email: string | null;
  avatar: string | null;
  gender: string | null;
  weight: number | null;
  activeSportTime: number | null;
  dailyNorma: number;
}

// Тип состояния Auth
interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
}

// Начальное состояние
const initialState: AuthState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    gender: null,
    weight: null,
    activeSportTime: null,
    dailyNorma: 0,
  },
  token: null,
  isLoggedIn: false,
};

// Создание slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Типизация resetToken
    resetToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
      state.isLoggedIn = !!payload; // Если payload есть, то isLoggedIn = true
    },
    // Типизация refreshError
    refreshError: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, (state, { payload }: PayloadAction<{ accessToken: string }>) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }: PayloadAction<{ accessToken: string }>) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = initialState.user;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.token = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }: PayloadAction<{ data: Partial<User> }>) => {
        state.user = { ...state.user, ...payload.data };
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.user.avatar = payload;
      })
      .addCase(getUserData.fulfilled, (state, { payload }: PayloadAction<Partial<User>>) => {
        state.user = { ...state.user, ...payload };
      }),
});

// Конфигурация для persist
const persistConfig = {
  key: 'auth',
  storage,
};

// Экспортируем actions и reducer
export const { refreshError, resetToken } = authSlice.actions;
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
