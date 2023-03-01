import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from '../state/loader.state';

export const getLoaderSelector = createFeatureSelector<LoaderState>('loader');

export const getIsLoading = createSelector(
  getLoaderSelector,
  loader => loader.isLoading
);
