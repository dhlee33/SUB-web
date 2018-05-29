import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  signUpRequest: ['data'],
  signUpSuccess: null,
  signUpFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  signUp: {
    isFetching: false,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const signUpRequest = (state) =>
  state.mergeDeep({ signUp: { isFetching: true, error: null } });

export const signUpSuccess = (state) =>
  state.mergeDeep({ signUp: { isFetching: false, error: null } });

export const signUpFailure = (state, { error }) =>
  state.mergeDeep({ signUp: { isFetching: false, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
});
