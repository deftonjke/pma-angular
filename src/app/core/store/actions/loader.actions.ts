import { createAction, props } from '@ngrx/store';

export const setIsLoading = createAction(
  '[App] Set Loader',
  props<{ isLoading: boolean }>()
);
