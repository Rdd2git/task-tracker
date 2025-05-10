import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.state';

const STORAGE_KEY = 'app_state';

export const storageMetaReducer: MetaReducer<AppState> = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    const nextState = reducer(state, action);

    // Сохраняем состояние в localStorage после каждого действия
    if (action.type !== '@ngrx/store/init') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } else {
      // Восстанавливаем состояние при инициализации
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    return nextState;
  };
};
