import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const { Types, Creators: Actions } = createActions({
  interestListRequest: ['contentType'],
  interestListSuccess: ['contents'],
  interestListFailure: ['error'],
});

export const initialState = fromJS({
  interestList: {
    isFetching: false,
    interestList: [],
    error: null,
  },
});

export const interestListRequest = (state) =>
  state.merge({ interestList: { isFetching: true, error: null } });

export const interestListSuccess = (state, { interestList }) =>
  state.merge({ interestList: { isFetching: false, interestList: interestList.results, error: null } });

export const interestListFailure = (state, { error }) =>
  state.merge({ interestList: { isFetching: false, contentList: null, error } });

const handlers = {
  [Types.INTEREST_LIST_REQUEST]: interestListRequest,
  [Types.INTEREST_LIST_SUCCESS]: interestListSuccess,
  [Types.INTEREST_LIST_FAILURE]: interestListFailure,
};

export default createReducer(initialState, handlers);
