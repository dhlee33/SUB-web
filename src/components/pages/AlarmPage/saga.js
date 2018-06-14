import { take, call, put, takeLatest } from 'redux-saga/effects';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchGetAlarmsRequest() {
  yield takeLatest(Types.GET_ALARMS_REQUEST, getAlarms);
}

export function* getAlarms() {
  try {
    const response = yield api.get('user/alarms');
    yield put(Actions.getAlarmsSuccess(response));
  } catch (error) {
    yield put(Actions.getAlarmsFailure(error.response));
  }
}

export function* watchDeleteAlarmsRequest() {
  yield takeLatest(Types.DELETE_ALARMS_REQUEST, deleteAlarms);
}

export function* deleteAlarms() {
  try {
    yield api.delete('user/alarms');
    yield put(Actions.deleteAlarmsSuccess());
    window.location.reload();
  } catch (error) {
    yield put(Actions.deleteAlarmsFailure(error.response));
  }
}

export default [
  watchGetAlarmsRequest,
  watchDeleteAlarmsRequest,
];
