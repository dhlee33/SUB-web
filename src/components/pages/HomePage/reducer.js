import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const { Types, Creators: Actions } = createActions({
  contentListRequest: ['contentType', 'params'],
  contentListSuccess: ['contents'],
  contentListFailure: ['error'],
});

export const initialState = fromJS({
  contentList: {
    isFetching: false,
    contentList: [],
    error: null,
    page: 1,
  },
});


export const contentListRequest = (state) =>
  state.mergeDeep({ contentList: { isFetching: true, error: null } });

export const contentListSuccess = (state, { contents }) =>
  state.merge({ contentList: { isFetching: false, contentList: contents.results, page: Math.ceil(contents.count / 10), error: null } });

export const contentListFailure = (state, { error }) =>
  state.mergeDeep({ contentList: { isFetching: false, contentList: null, error } });

const handlers = {
  [Types.CONTENT_LIST_REQUEST]: contentListRequest,
  [Types.CONTENT_LIST_SUCCESS]: contentListSuccess,
  [Types.CONTENT_LIST_FAILURE]: contentListFailure,
};

export default createReducer(initialState, handlers);
