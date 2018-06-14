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
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.loginFailure(error.response));
    window.alert('로그인에 실패했습니다');
  }
}

export function* watchLogout() {
  while (true) {
    yield take(Types.LOGOUT);
    removeToken();
  }
}

export default [
  watchLoginRequest,
  watchLogout,
];
