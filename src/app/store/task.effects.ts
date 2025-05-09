import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, withLatestFrom } from 'rxjs/operators';
import { TaskActions } from './task.actions';
import { StorageService } from '../services/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Task } from '../models/task.model';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private storageService: StorageService,
    private store: Store<AppState>
  ) {}

  get saveToStorage$() {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(
            TaskActions.addTask,
            TaskActions.updateTask,
            TaskActions.deleteTask
          ),
          withLatestFrom(this.store.select((state) => state.tasks)),
          tap(([_, tasks]) => {
            const taskArray = Object.values(tasks.entities).filter(
              (task): task is Task => task !== undefined
            );
            this.storageService.saveTasks(taskArray);
          })
        ),
      { dispatch: false }
    );
  }

  get loadInitialState$() {
    return createEffect(() =>
      this.actions$.pipe(
        ofType('@ngrx/effects/init'),
        map(() => {
          const tasks = this.storageService.getTasks();
          return TaskActions.loadTasks({ tasks });
        })
      )
    );
  }
}
