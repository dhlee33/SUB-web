import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';
import { deleteInterestList } from './saga';

export const { Types, Creators: Actions } = createActions({
  interestListRequest: ['contentType'],
  interestListSuccess: ['interestList'],
  interestListFailure: ['error'],
  deleteInterestRequest: ['contentType', 'id'],
  deleteInterestSuccess: null,
  deleteInterestFailure: ['error'],
});

export const initialState = fromJS({
  interestList: {
    isFetching: false,
    interestList: [],
    error: null,
  },
  deleteInterest: {
    isFetching: false,
    error: null,
  },
});

export const interestListRequest = (state) =>
  state.merge({ interestList: { isFetching: true, error: null } });

export const interestListSuccess = (state, { interestList }) =>
  state.merge({ interestList: { isFetching: false, interestList, error: null } });

export const interestListFailure = (state, { error }) =>
  state.merge({ interestList: { isFetching: false, interestList: null, error } });

export const deleteInterestRequest = (state) =>
  state.merge({ interestList: { isFetching: true, error: null } });

export const deleteInterestSuccess = (state) =>
  state.merge({ interestList: { isFetching: false, error: null } });

export const deleteInterestFailure = (state, { error }) =>
  state.merge({ interestList: { isFetching: false, interestList: null, error } });

const handlers = {
  [Types.INTEREST_LIST_REQUEST]: interestListRequest,
  [Types.INTEREST_LIST_SUCCESS]: interestListSuccess,
  [Types.INTEREST_LIST_FAILURE]: interestListFailure,
  [Types.DELETE_INTEREST_REQUEST]: deleteInterestRequest,
  [Types.DELETE_INTEREST_SUCCESS]: deleteInterestSuccess,
  [Types.DELETE_INTEREST_FAILURE]: deleteInterestFailure,
};

export default createReducer(initialState, handlers);
