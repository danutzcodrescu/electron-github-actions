/* eslint-disable no-param-reassign */
import { createModel } from '@rematch/core';
import { uniqBy } from 'lodash';
import { Result, ResultWithDetails, SearchWithDetails, Selected } from '../types/search';

const initialState = {
  query: '',
  requesting: false,
  result: {
    total: 0,
    results: [],
  },
  offset: 0,
  error: false,
  selected: null,
  selectedData: null,
  selectedLoading: false,
  tag: false,
};

export interface SearchState {
  offset: number;
  query: string;
  requesting: boolean;
  result: SearchWithDetails;
  error: boolean;
  selected: Selected | null;
  selectedLoading: boolean;
  selectedData: any;
  tag: boolean;
}

export const search = createModel({
  state: initialState as SearchState,
  reducers: {
    setQuery: (state: SearchState, query: string): SearchState => ({
      ...state,
      query,
    }),
    startRequest: (state: SearchState, { query, offset }: { offset: number; query: string }): SearchState => ({
      ...state,
      query,
      error: false,
      offset,
      tag: offset > 0 ? state.tag : false,
      requesting: true,
      selected: offset > 0 ? state.selected : null,
      selectedData: offset > 0 ? state.selectedData : null,
    }),
    finishRequest: (state: SearchState, result: SearchWithDetails): SearchState => {
      if (state.offset > 0) {
        return {
          ...state,
          result: {
            ...result,
            // results: [...state.result.results, ...result.results],
            results: uniqBy([...state.result.results, ...result.results], (item: Result) => item.name.id),
          },
          requesting: false,
        };
      }
      return {
        ...state,
        result,
        requesting: false,
      };
    },
    setError: (state: SearchState, error: boolean): SearchState => ({
      ...state,
      error,
      requesting: false,
      result: { total: 0, results: [] },
    }),
    logOut: (state: SearchState): SearchState => ({
      ...initialState,
    }),
    selectItem: (state: SearchState, selected: Selected): SearchState => {
      if (state.selected && state.selected.id === selected.id) return state;
      return {
        ...state,
        selected,
        selectedLoading: true,
      };
    },
    setData: (state: SearchState, data: any): SearchState => ({
      ...state,
      selectedData: data,
      selectedLoading: false,
    }),
    setTag: (state: SearchState, tag): SearchState => ({
      ...state,
      tag,
    }),
  }})
