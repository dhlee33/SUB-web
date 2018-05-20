import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchContentList() {
  yield takeLatest(Types.CONTENT_LIST_REQUEST, fetchContentList);
}

export function* fetchContentList() {
  try {
    const response = yield api.get('sale/sales');
    yield put(Actions.contentListSuccess(response));
  } catch (error) {
    yield put(Actions.contentListFailure(error));
  }
}

export default [
  watchFetchContentList,
];
