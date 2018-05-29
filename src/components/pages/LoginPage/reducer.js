import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { getToken, removeToken } from '../../../utils/localStorage';

export const { Types, Creators: Actions } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: ['error'],
  logout: null,
  profileRequest: null,
  profileSuccess: ['profile'],
  profileFailure: ['error'],
});

export const initialState = fromJS({
  login: {
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

export const loginRequest = (state) =>
  state.mergeDeep({ login: { isFetching: true, error: null } });

export const loginSuccess = (state, { payload }) =>
  state.mergeDeep({ login: { isFetching: false, payload, error: null } });

export const loginFailure = (state, { error }) =>
  state.mergeDeep({ login: { isFetching: false, payload: null, error } });

export const logout = (state) =>
  state.mergeDeep({ login: { isFetching: false, payload: null }, user: { profile: null } });

export const profileRequest = (state) =>
  state.mergeDeep({ user: { isFetching: true, profile: null, error: null } });

export const profileSuccess = (state, { profile }) =>
  state.mergeDeep({ user: { isFetching: false, profile, error: null } });

export const profileFailure = (state, { error }) =>
  state.mergeDeep({ user: { isFetching: false, profile: null, error } });

const handlers = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.PROFILE_REQUEST]: profileRequest,
  [Types.PROFILE_SUCCESS]: profileSuccess,
  [Types.PROFILE_FAILURE]: profileFailure,
};

export default createReducer(initialState, handlers);
