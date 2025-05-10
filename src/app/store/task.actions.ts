import { createActionGroup, props } from '@ngrx/store';
import { Task, TaskForm } from '../models/task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Load Tasks': props<{ tasks: Task[] }>(), // Action to load tasks
    'Add Task': props<{ task: Task }>(), // Action to add a new task
    'Update Task': props<{ id: number; task: TaskForm }>(), // Action to update an existing task
    'Delete Task': props<{ id: number }>(), // Action to delete a task
  },
});
