// src/features/water/operations.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../servise/axiosConfig';

// Определите интерфейс для portionData
interface PortionData {
  amount: number; // Пример свойства
  date: string;   // Пример свойства
}

// Определите интерфейс для возвращаемых данных
interface WaterData {
  _id: string;     // Уникальный идентификатор
  amount: number;  // Количество воды
  date: string;    // Дата записи
  // добавьте другие поля по необходимости
}

// Определите интерфейс для параметров получения воды по месяцу
interface MonthParams {
  month: number; // например, 1 - Январь
  year: number;  // год
}

// Определите интерфейс для параметров получения воды по дню
interface DayParams {
  day: number; // день
  month: number; // месяц
  year: number; // год
}

// Добавление воды
export const addWater = createAsyncThunk<WaterData, PortionData>(
  'water/add',
  async (portionData, thunkApi) => {
    try {
      const { data } = await axiosInstance.post('/water', portionData);
      return data; // data должно соответствовать типу WaterData
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Ошибка добавления воды');
    }
  }
);

// Обновление воды
export const updateWater = createAsyncThunk<WaterData, { id: string; portionData: PortionData }>(
  'water/update',
  async ({ id, portionData }, thunkApi) => {
    try {
      const { data } = await axiosInstance.patch(`/water/${id}`, portionData);
      return data; // data должно соответствовать типу WaterData
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Ошибка обновления воды');
    }
  }
);

// Удаление воды
export const deleteWater = createAsyncThunk<WaterData, string>(
  'water/delete',
  async (id, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete(`/water/${id}`);
      return data; // data должно соответствовать типу WaterData
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Ошибка удаления воды');
    }
  }
);

// Получение воды по месяцу
export const getWaterByMonth = createAsyncThunk<WaterData[], MonthParams>(
  'water/getByMonth',
  async (params, thunkApi) => {
    try {
      const { data } = await axiosInstance.post('/water/month', params);
      return data; // data должно соответствовать типу WaterData[]
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Ошибка получения воды по месяцу');
    }
  }
);

// Получение воды по дню
export const getWaterByDay = createAsyncThunk<WaterData[], DayParams>(
  'water/getByDay',
  async (params, thunkApi) => {
    try {
      const { data } = await axiosInstance.post('/water/day', params);
      return data.resultData; // resultData должно соответствовать типу WaterData[]
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || 'Ошибка получения воды по дню');
    }
  }
);
