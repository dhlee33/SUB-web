import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';


export function* watchFetchContentDetail() {
  yield takeLatest(Types.CONTENT_DETAIL_REQUEST, fetchContentDetail);
}

export function* fetchContentDetail({ id }) {
  try {
    const response = yield api.get(`transaction/sale/${id}`);
    yield put(Actions.contentDetailSuccess(response));
  } catch (error) {
    yield put(Actions.contentDetailFailure(error));
  }
}

export default [
  watchFetchContentDetail,
];
