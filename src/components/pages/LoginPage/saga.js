import { call, put, take, select, fork, takeLatest } from 'redux-saga/effects';
import api, { parseSettings } from '../../../services/api';
import { saveToken, getToken } from '../../../utils/localStorage';
import { Actions, Types } from './reducer';

export function* login({ data }) {
  console.log(data);
  try {
    const response = yield api.post('user/login', data);
    console.log(response);
    saveToken(response);
    yield put(Actions.loginSuccess(response));
  } catch (error) {
    yield put(Actions.loginFailure('Login Failure'));
  }
}

export default function* () {
  yield takeLatest(Types.LOGIN_REQUEST, login);
}
