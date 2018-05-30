import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchContentList() {
  yield takeLatest(Types.CONTENT_LIST_REQUEST, fetchContentList);
}

export function* fetchContentList({ contentType, params }) {
  try {
    const response = yield api.get(`transaction/${contentType}s`, params);
    yield put(Actions.contentListSuccess(response));
  } catch (error) {
    yield put(Actions.contentListFailure(error.response));
  }
}

export default [
  watchFetchContentList,
];
