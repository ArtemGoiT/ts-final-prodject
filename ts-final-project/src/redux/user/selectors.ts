// Импортируем RootState из хранилища
import { RootState } from "../store";

// Определяем тип состояния Auth
interface User {
  name: string | null;
  email: string | null;
  avatar: string | null;
  gender: string | null;
  weight: number | null;
  activeSportTime: number | null;
  dailyNorma: number;
}

interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
}

// Типизация селекторов
export const selectName = (state: RootState): string | null => state.auth.user.name;
export const selectEmail = (state: RootState): string | null => state.auth.user.email;
export const selectAvatarUrl = (state: RootState): string | null => state.auth.user.avatar;
export const selectGender = (state: RootState): string | null => state.auth.user.gender;
export const selectWeight = (state: RootState): number | null => state.auth.user.weight;
export const selectTimeForSports = (state: RootState): number | null => state.auth.user.activeSportTime;
export const selectDailyIntake = (state: RootState): number => state.auth.user.dailyNorma;
export const selectToken = (state: RootState): string | null => state.auth.token;
export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;
