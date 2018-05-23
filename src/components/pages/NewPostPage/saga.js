import { take, call, put, takeLatest } from 'redux-saga/effects';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';
import { getToken } from 'utils/localStorage';

export function* watchNewPostRequest() {
  yield takeLatest(Types.NEW_POST_REQUEST, newPost);
}

export function* newPost({ data }) {
  try {
    const response = yield api.post('transaction/sales', data);
    yield put(Actions.newPostSuccess(response));
    window.location.replace('/');
  } catch (error) {
    yield put(Actions.newPostFailure(error.errors));
  }
}

export default [
  watchNewPostRequest,
];
