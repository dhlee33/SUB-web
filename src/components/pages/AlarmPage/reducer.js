import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  getAlarmsRequest: null,
  getAlarmsSuccess: ['alarms'],
  getAlarmsFailure: ['error'],
  deleteAlarmsRequest: null,
  deleteAlarmsSuccess: null,
  deleteAlarmsFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  alarm: {
    isFetching: false,
    alarms: null,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const getAlarmsRequest = (state) =>
  state.mergeDeep({ alarm: { isFetching: true, error: null } });

export const getAlarmsSuccess = (state, { alarms }) =>
  state.mergeDeep({ alarm: { isFetching: false, alarms, error: null } });

export const getAlarmsFailure = (state, { error }) =>
  state.mergeDeep({ alarm: { isFetching: false, alarms: null, error } });

export const deleteAlarmsRequest = (state) =>
  state.mergeDeep({ alarm: { isFetching: true, error: null } });

export const deleteAlarmsSuccess = (state) =>
  state.mergeDeep({ alarm: { isFetching: false, alarms: null, error: null } });

export const deleteAlarmsFailure = (state, { error }) =>
  state.mergeDeep({ alarm: { isFetching: false, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.GET_ALARMS_REQUEST]: getAlarmsRequest,
  [Types.GET_ALARMS_SUCCESS]: getAlarmsSuccess,
  [Types.GET_ALARMS_FAILURE]: getAlarmsFailure,
  [Types.DELETE_ALARMS_REQUEST]: deleteAlarmsRequest,
  [Types.DELETE_ALARMS_SUCCESS]: deleteAlarmsSuccess,
  [Types.DELETE_ALARMS_FAILURE]: deleteAlarmsFailure,
});
