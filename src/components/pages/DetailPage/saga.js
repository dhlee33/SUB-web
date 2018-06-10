import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchContentDetail() {
  yield takeLatest(Types.CONTENT_DETAIL_REQUEST, fetchContentDetail);
}

export function* fetchContentDetail({ contentType, id }) {
  try {
    const response = yield api.get(`transaction/${contentType}/${id}`);
    yield put(Actions.contentDetailSuccess(response));
  } catch (error) {
    yield put(Actions.contentDetailFailure(error));
  }
}

export function* watchGetCommentsRequest() {
  yield takeLatest(Types.CONTENT_COMMENT_REQUEST, getComments);
}

export function* getComments({ contentType, id }) {
  try {
    const response = yield api.get(`transaction/${contentType}/${id}/comments`);
    yield put(Actions.contentCommentSuccess(response));
  } catch (error) {
    yield put(Actions.contentCommentFailure(error.response));
  }
}

export function* watchNewCommentRequest() {
  yield takeLatest(Types.NEW_COMMENT_REQUEST, newComment);
}

export function* newComment({ contentType, data }) {
  try {
    yield api.post(`transaction/${contentType}/comments`, data);
    yield put(Actions.newCommentSuccess());
  } catch (error) {
    yield put(Actions.newCommentFailure(error.response));
  }
}

export function* watchCompleteRequest() {
  yield takeLatest(Types.COMPLETE_REQUEST, complete);
}

export function* complete({ contentType, id }) {
  try {
    yield api.post(`transaction/${contentType}/${id}/complete`);
    yield put(Actions.completeSuccess());
  } catch (error) {
    yield put(Actions.completeFailure(error));
  }
}

export function* watchDeleteRequest() {
  yield takeLatest(Types.DELETE_REQUEST, contentDelete);
}

export function* contentDelete({ contentType, id }) {
  try {
    yield api.delete(`transaction/${contentType}/${id}`);
    yield put(Actions.deleteSuccess());
  } catch (error) {
    yield put(Actions.deleteFailure(error));
  }
}

export function* watchInterestRequest() {
  yield takeLatest(Types.INTEREST_REQUEST, postInterest);
}

export function* postInterest({ contentType, id }) {
  try {
    yield api.post(`transaction/${contentType}/${id}/interest`);
    yield put(Actions.interestSuccess());
  } catch (error) {
    yield put(Actions.interestFailure(error.response));
  }
}


export default [
  watchFetchContentDetail,
  watchGetCommentsRequest,
  watchNewCommentRequest,
  watchCompleteRequest,
  watchDeleteRequest,
  watchInterestRequest,
];
