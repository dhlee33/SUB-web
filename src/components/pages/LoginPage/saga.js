import { call, put, take, select, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { saveToken, removeToken } from '../../../utils/localStorage';
import { Actions, Types } from './reducer';
import { makeSelectPrev } from './selector';

export function* watchLoginRequest() {
  yield takeLatest(Types.LOGIN_REQUEST, login);
}

export function* login({ data }) {
  try {
    const response = yield api.post('user/login', data);
    yield put(Actions.loginSuccess(response));
    saveToken(response);
    yield call(profile);
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.loginFailure(error));
  }
}

export function* watchLogout() {
  while (true) {
    yield take(Types.LOGOUT);
    removeToken();
  }
}

export function* watchProfileRequest() {
  yield takeLatest(Types.PROFILE_REQUEST, profile);
}

export function* profile() {
  try {
    const response = yield api.get('user/profile');
    yield put(Actions.profileSuccess(response));
  } catch (error) {
    yield put(Actions.profileFailure(error));
  }
}

export default [
  watchLoginRequest,
  watchLogout,
  watchProfileRequest,
];
