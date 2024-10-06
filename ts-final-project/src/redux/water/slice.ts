// src/features/water/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  getWaterByDay,
  getWaterByMonth,
  updateWater,
} from './operations';

// Определяем интерфейсы для данных
interface WaterRecord {
  _id: string; // Уникальный идентификатор
  amount: number; // Количество воды
  date: string; // Дата записи
}

interface DailyIntakes {
  records: WaterRecord[]; // Записи о потреблении воды
  percentage: string; // Процент
  totalWater: string; // Общая сумма воды
  dailyNorma: string; // Норма потребления
}

// Определяем тип состояния
interface WaterState {
  monthIntakes: WaterRecord[]; // Записи о месячном потреблении
  dailyIntakes: DailyIntakes; // Дневные записи
  loading: boolean; // Статус загрузки
  error: string | null; // Ошибка, если она есть
}

const initialState: WaterState = {
  monthIntakes: [],
  dailyIntakes: {
    records: [],
    percentage: '0',
    totalWater: '0',
    dailyNorma: '1500',
  },
  loading: false,
  error: null, // Инициализируем error как null
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null; // Очистка ошибки
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getWaterByMonth.fulfilled, (state, { payload }: PayloadAction<WaterRecord[]>) => {
        state.monthIntakes = payload;
        state.loading = false;
      })
      .addCase(getWaterByMonth.pending, (state) => {
        state.loading = true;
        state.error = null; // Сброс ошибки при новом запросе
      })
      .addCase(getWaterByMonth.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message; // Сохранение сообщения об ошибке
      })
      .addCase(getWaterByDay.fulfilled, (state, { payload }: PayloadAction<DailyIntakes>) => {
        state.dailyIntakes = payload;
        state.loading = false; // Устанавливаем loading в false
      })
      .addCase(getWaterByDay.pending, (state) => {
        state.loading = true;
        state.error = null; // Сброс ошибки при новом запросе
      })
      .addCase(getWaterByDay.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message; // Сохранение сообщения об ошибке
      })
      .addCase(addWater.fulfilled, (state, { payload }: PayloadAction<WaterRecord>) => {
        state.monthIntakes.push(payload);
        state.dailyIntakes.records.push(payload);

        state.dailyIntakes.totalWater = state.dailyIntakes.records.reduce(
          (sum, record) => sum + record.amount,
          0,
        ).toString(); // Преобразуем в строку для соответствия типам
      })
      .addCase(updateWater.fulfilled, (state, { payload }: PayloadAction<WaterRecord>) => {
        const indexToUpdateMonth = state.monthIntakes.findIndex(
          ({ _id }) => _id === payload._id,
        );
        if (indexToUpdateMonth !== -1) {
          state.monthIntakes[indexToUpdateMonth] = payload;
        }
        const indexToUpdateDate = state.dailyIntakes.records.findIndex(
          ({ _id }) => _id === payload._id,
        );

        if (indexToUpdateDate !== -1) {
          state.dailyIntakes.records[indexToUpdateDate] = payload;
        }

        state.dailyIntakes.totalWater = state.dailyIntakes.records.reduce(
          (sum, record) => sum + record.amount,
          0,
        ).toString(); // Преобразуем в строку
      })
      .addCase(deleteWater.fulfilled, (state, { payload }: PayloadAction<{ id: string }>) => {
        state.monthIntakes = state.monthIntakes.filter(
          ({ _id }) => _id !== payload.id,
        );
        state.dailyIntakes.records = state.dailyIntakes.records.filter(
          ({ _id }) => _id !== payload.id,
        );
        state.dailyIntakes.totalWater = state.dailyIntakes.records.reduce(
          (sum, record) => sum + record.amount,
          0,
        ).toString(); // Преобразуем в строку
      })
      .addCase(deleteWater.rejected, (state, { error }) => {
        state.error = error.message; // Сохранение сообщения об ошибке при неудаче
      }),
});

const waterReducer = waterSlice.reducer;

export const { clearError } = waterSlice.actions; // Экспортируем действие очистки ошибки
export default waterReducer;
