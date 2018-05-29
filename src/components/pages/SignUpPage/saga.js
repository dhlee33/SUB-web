import { take, call, put, takeLatest } from 'redux-saga/effects';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchSignUpRequest() {
  yield takeLatest(Types.SIGN_UP_REQUEST, signUp);
}

export function* signUp({ data }) {
  try {
    yield api.post('user/signup', data);
    yield put(Actions.signUpSuccess());
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.signUpFailure(error.response));
  }
}

export function* watchDuplicateRequest() {
  yield takeLatest(Types.DUPLICATE_REQUEST, duplicate);
}

export function* duplicate({ username }) {
  try {
    yield api.post('user/duplicate', username);
    yield put(Actions.duplicateSuccess());
  } catch (error) {
    yield put(Actions.duplicateFailure(error.response));
  }
}

export default [
  watchSignUpRequest,
  watchDuplicateRequest,
];
