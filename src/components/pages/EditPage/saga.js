import { take, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchEditRequest() {
  yield takeLatest(Types.EDIT_REQUEST, edit);
}

export function* edit({ contentType, id, data }) {
  try {
    console.log(...data);
    const response = yield api.put(`transaction/${contentType}/${id}`, data, { isFormData: true });
    yield put(Actions.newPostSuccess(response));
    window.location.replace(`/${contentType}detail/${id}`);
  } catch (error) {
    yield put(Actions.newPostFailure(error.response));
  }
}

export default [
  watchEditRequest,
];
