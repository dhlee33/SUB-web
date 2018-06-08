import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { getToken, removeToken } from '../../../utils/localStorage';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators: Actions } = createActions({
  newProfileRequest: ['data'],
  newProfileSuccess: ['payload'],
  newProfileFailure: ['error'],
  newTransactionRequest: ['data'],
  newTransactionSuccess: ['payload'],
  newTransactionFailure: ['error'],
  profileRequest: null,
  profileSuccess: ['profile'],
  profileFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  newProfile: {
    isFetching: false,
    payload: null,
    error: null,
  },
  newTransaction: {
    isFetching: false,
    payload: null,
    error: null,
  },
  user: {
    isFetching: false,
    profile: null,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const newProfileRequest = (state) =>
  state.mergeDeep({ newProfile: { isFetching: true, error: null } });

export const newProfileSuccess = (state, { payload }) =>
  state.mergeDeep({ newProfile: { isFetching: false, payload, error: null } });

export const newProfileFailure = (state, { error }) =>
  state.mergeDeep({ newProfile: { isFetching: false, error } });

export const newTransactionRequest = (state) =>
  state.mergeDeep({ newTransaction: { isFetching: true, error: null } });

export const newTransactionSuccess = (state, { payload }) =>
  state.mergeDeep({ newTransaction: { isFetching: false, payload, error: null } });

export const newTransactionFailure = (state, { error }) =>
  state.mergeDeep({ newTransaction: { isFetching: false, error } });

export const profileRequest = (state) =>
  state.mergeDeep({ user: { isFetching: true, profile: null, error: null } });

export const profileSuccess = (state, { profile }) =>
  state.mergeDeep({ user: { isFetching: false, profile, error: null } });

export const profileFailure = (state, { error }) =>
  state.mergeDeep({ user: { isFetching: false, profile: null, error } });




/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.NEW_PROFILE_REQUEST]: newProfileRequest,
  [Types.NEW_PROFILE_SUCCESS]: newProfileSuccess,
  [Types.NEW_PROFILE_FAILURE]: newProfileFailure,
  [Types.NEW_TRANSACTION_REQUEST]: newTransactionRequest,
  [Types.NEW_TRANSACTION_SUCCESS]: newTransactionSuccess,
  [Types.NEW_TRANSACTION_FAILURE]: newTransactionFailure,
  [Types.PROFILE_REQUEST]: profileRequest,
  [Types.PROFILE_SUCCESS]: profileSuccess,
  [Types.PROFILE_FAILURE]: profileFailure,
});

