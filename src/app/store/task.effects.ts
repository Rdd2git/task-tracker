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
}
