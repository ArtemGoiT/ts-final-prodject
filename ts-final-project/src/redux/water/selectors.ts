// src/features/water/selectors.ts
import { RootState } from "../store"; 

interface DailyIntakeRecord {
  amount: number; // Сколько воды было выпито
  date: string; // Дата записи
}

interface DailyIntakes {
  records: DailyIntakeRecord[]; 
  percentage: number; // Изменил на number
  totalWater: number; // Изменил на number
}

// Селектор для месячного потребления воды
export const selectWaterByMonth = (state: RootState): DailyIntakeRecord[] => 
  state.water.monthIntakes; // Изменено на правильный тип

// Селектор для записей о дневном потреблении воды
export const selectWaterDayRecords = (state: RootState): DailyIntakeRecord[] => 
  state.water.dailyIntakes.records;

// Селектор для процента дневного потребления воды
export const selectDayPercentage = (state: RootState): number => 
  state.water.dailyIntakes.percentage;

// Селектор для общей суммы воды по дню
export const selectTotalWaterByDay = (state: RootState): number => 
  state.water.dailyIntakes.totalWater;

// Селектор для статуса загрузки
export const selectLoading = (state: RootState): boolean => 
  state.water.loading;
