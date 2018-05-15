import { createActions, createReducer } from 'reduxsauce';
import {
  getToken, getUserId, getUsername, removeTokens, removeUsername,
  saveUsername, saveUserId, removeUserId,
} from '../../../utils/localStorage';

const initialState = {
  isFetching: false,
  isAuthenticated: !!getToken(),
  errorMessage: '',
  username: getUsername() || '',
  userId: getUserId() || '',
  users: [],
};

export const { Types, Creators: Actions } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: ['errorMessage'],
  logout: null,
});

export const loginRequest = state =>
  ({ ...state, isFetching: true, isAuthenticated: false, errorMessage: '' });
export const loginSuccess = (state, { payload }) => {
  saveUsername(payload.username);
  saveUserId(payload.id);
  console.log(state);
  return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '', username: payload.username, userId: payload.id };
};
export const loginFailure = (state, { errorMessage }) =>

  ({ ...state, isFetching: false, isAuthenticated: false, errorMessage });

export const logout = (state) => {
  removeTokens();
  removeUsername();
  removeUserId();
  return { ...state, isFetching: false, isAuthenticated: false, username: '', userId: '' };
};

const handlers = {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
};
export default createReducer(initialState, handlers);
