import { ActionReducer } from '@ngrx/store';
import { StorageService } from './storage.service';
import { EntityState } from '@ngrx/entity';
import { Task } from '../models/task.model';

export interface AppState {
  tasks: EntityState<Task>;
}

export function localStorageMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  const storageService = new StorageService();

  return (state, action) => {
    const nextState = reducer(state, action);

    if (action.type !== '@ngrx/store/init') {
      if (nextState?.tasks) {
        const tasks = Object.values(nextState.tasks.entities).filter(
          (task): task is Task => task !== undefined
        );
        storageService.saveTasks(tasks);
      }
    }

    return nextState;
  };
}
