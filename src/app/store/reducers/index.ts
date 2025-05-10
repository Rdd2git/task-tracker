import { ActionReducerMap } from '@ngrx/store';
import * as fromTasks from './tasks.reducer';

export interface State {
  tasks: fromTasks.State;
  // ...other states...
}

export const reducers: ActionReducerMap<State> = {
  tasks: fromTasks.reducer,
  // ...other reducers...
};
