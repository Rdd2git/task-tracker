import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { taskReducer } from './store/task.reducer';
import { TaskEffects } from './store/task.effects'; // Убедились, что TaskEffects импортирован
import { provideAnimations } from '@angular/platform-browser/animations';
import { StorageService } from './services/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ tasks: taskReducer }),
    provideEffects(TaskEffects), // Убедились, что TaskEffects зарегистрирован
    provideAnimations(),
    StorageService,
  ],
};
