import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchInterestList() {
  yield takeLatest(Types.INTEREST_LIST_REQUEST, fetchInterestList);
}

export function* fetchInterestList({ contentType }) {
  try {
    const response = yield api.get(`user/interest/${contentType}`);
    yield put(Actions.interestListSuccess(response));
  } catch (error) {
    yield put(Actions.interestListFailure(error.response));
  }
}

export default [
  watchFetchInterestList,
];
