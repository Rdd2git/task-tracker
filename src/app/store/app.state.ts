import { EntityState } from '@ngrx/entity';
import { Task } from '../models/task.model';

export interface AppState {
  tasks: EntityState<Task>;
}
