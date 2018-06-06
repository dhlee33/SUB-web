import { take, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchEditRequest() {
  yield takeLatest(Types.EDIT_REQUEST, edit);
}

export function* edit({ data }) {
  try {
    const { contentType } = data;
    const response = yield api.put(`transaction/${contentType}`, _.omit(data, ['contentType']));
    yield put(Actions.newPostSuccess(response));
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.newPostFailure(error.response));
  }
}

export default [
  watchEditRequest,
];
