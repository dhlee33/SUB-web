import { take, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchNewPostRequest() {
  yield takeLatest(Types.NEW_POST_REQUEST, newPost);
}

export function* newPost({ contentType, data }) {
  try {
    const response = yield api.post(`transaction/${contentType}`, data, { isFormData: true });
    yield put(Actions.newPostSuccess(response));
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.newPostFailure(error.response));
  }
}

export default [
  watchNewPostRequest,
];
