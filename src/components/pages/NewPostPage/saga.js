import { take, call, put, takeLatest } from 'redux-saga/effects';
import { Types, Creators as Actions } from './reducer';
import api from '../../../services/api';
import { getToken } from '../../../utils/localStorage';

export function* watchNewPostRequest() {
  console.log('b');
  yield takeLatest(Types.NEW_POST_REQUEST, newPost);
}

export function* newPost({ data }) {
  console.log(data);
  try {
    const response = yield api.post('http://localhost:8000/sale/sales', data);
    console.log(response);
    yield put(Actions.newPostSuccess(response));
  } catch (error) {
    yield put(Actions.newPostFailure(error.errors));
  }
}

export default [
  watchNewPostRequest,
];