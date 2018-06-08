import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchInterestList() {
  yield takeLatest(Types.INTEREST_LIST_REQUEST, fetchInterestList);
}

export function* fetchInterestList() {
  try {
    const response = yield api.get('user/interests');
    yield put(Actions.interestListSuccess(response));
  } catch (error) {
    yield put(Actions.interestListFailure(error.response));
  }
}

export function* watchDeleteInterest() {
  yield takeLatest(Types.DELETE_INTEREST_REQUEST, deleteInterestDetail);
}

export function* deleteInterestDetail({ contentType, id }) {
  try {
    const response = yield api.delete(`transaction/${contentType}/${id}/interest`);
    yield put(Actions.deleteInterestSuccess(response));
    window.location.reload();
  } catch (error) {
    yield put(Actions.deleteInterestFailure(error.response));
  }
}

export default [
  watchFetchInterestList,
  watchDeleteInterest,
];
