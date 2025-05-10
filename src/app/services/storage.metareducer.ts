import { ActionReducer } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'tasks-entity-state';

export interface AppState {
  tasks: EntityState<Task>;
}

export function storageMetaReducer<T>(
  reducer: ActionReducer<T>
): ActionReducer<T> {
  return (state, action) => {
    // При инициализации приложения пробуем загрузить из localStorage
    if (state === undefined) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // ignore parse errors
        }
      }
    }
    const nextState = reducer(state, action);

    // Сохраняем только tasks в localStorage
    if (nextState && (nextState as any).tasks) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // ignore storage errors
      }
    }
    return nextState;
  };
}
