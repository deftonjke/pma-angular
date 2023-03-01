import { createReducer, on } from '@ngrx/store';

import { initialLoaderState, LoaderState } from '../state/loader.state';
import { setIsLoading } from '../actions/loader.actions';

export const loaderReducer = createReducer(
  initialLoaderState,
  on(
    setIsLoading,
    (state, { isLoading }): LoaderState => ({
      isLoading,
    })
  )
);
