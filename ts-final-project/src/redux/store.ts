import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './user/slice';
import waterReducer from './water/slice';




// Типизация хранилища
export const store = configureStore({
    reducer: {
        auth: authReducer,
        water: waterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Типизация persistor
export const persistor = persistStore(store);

// Определение типов для store и dispatch
export type RootState = ReturnType<typeof store.getState>; // Тип состояния (state)
export type AppDispatch = typeof store.dispatch; // Тип dispatch для правильной работы с thunk
