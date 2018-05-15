import { call, put, take, select, fork, takeLatest } from 'redux-saga/effects';
import api, { parseSettings } from '../../../services/api';
import { saveToken, getToken } from '../../../utils/localStorage';
import { Actions, Types } from './reducer';

export function* fetchContentList() {
  try {
    const response = yield api.get('http://localhost:8000/sale/sales');
    console.log(response);
    yield put(Actions.fetchContentListSuccess(response));
  } catch (error) {
    yield put(Actions.fetchContentListFailure('Fetch Content List Failure'));
  }
}
export default function* () {
  yield takeLatest(Types.FETCH_CONTENT_LIST_REQUEST, fetchContentList);
}
