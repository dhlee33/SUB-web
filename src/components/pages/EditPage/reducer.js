import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  editRequest: ['contentType', 'id', 'data'],
  editSuccess: null,
  editFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  edit: {
    isFetching: false,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const editRequest = (state) =>
  state.mergeDeep({ newPost: { isFetching: true, error: null } });

export const editSuccess = (state) =>
  state.mergeDeep({ newPost: { isFetching: false, error: null } });

export const editFailure = (state, { error }) =>
  state.mergeDeep({ newPost: { isFetching: false, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.EDIT_REQUEST]: editRequest,
  [Types.EDIT_SUCCESS]: editSuccess,
  [Types.EDIT_FAILURE]: editFailure,
});
