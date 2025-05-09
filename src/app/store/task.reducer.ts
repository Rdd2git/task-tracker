import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task.model';
import { TaskActions } from './task.actions';

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: EntityState<Task> = adapter.getInitialState();

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (state, { tasks }) => {
    const validTasks = tasks.filter((task): task is Task => task !== undefined);
    return adapter.setAll(validTasks, state);
  }),
  on(TaskActions.addTask, (state, { task }) => adapter.addOne(task, state)),
  on(TaskActions.updateTask, (state, { id, task }) =>
    adapter.updateOne({ id, changes: task }, state)
  ),
  on(TaskActions.deleteTask, (state, { id }) => adapter.removeOne(id, state))
);
