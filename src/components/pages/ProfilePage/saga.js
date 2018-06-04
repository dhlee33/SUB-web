import { take, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchNewProfileRequest() {
  yield takeLatest(Types.NEW_PROFILE_REQUEST, newProfile);
}

export function* newProfile({ data }) {
  try {
    const { contentType } = data;
    const response = yield api.put(`user/profile/${contentType}`, _.omit(data, ['contentType']));
    yield put(Actions.newProfileSuccess(response));
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.newProfileFailure(error.response));
  }
}

export function* watchNewTransactionRequest() {
  yield takeLatest(Types.NEW_TRANSACTION_REQUEST, newTransaction);
}
export function* newTransaction({ data }) {
  try {
    const { contentType } = data;
    const response = yield api.put(`user/transaction${contentType}`, _.omit(data, ['contentType']));
    yield put(Actions.newTransactionSuccess(response));
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.newTransactionFailure(error.response));
  }
}
export default [
  watchNewProfileRequest,
  watchNewTransactionRequest,
];
