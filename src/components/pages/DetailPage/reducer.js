import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const { Types, Creators: Actions } = createActions({
  contentDetailRequest: ['contentType', 'id'],
  contentDetailSuccess: ['contentDetail'],
  contentDetailFailure: ['error'],
  contentCommentRequest: ['contentType', 'id'],
  contentCommentSuccess: ['comments'],
  contentCommentFailure: ['error'],
  newCommentRequest: ['contentType', 'data'],
  newCommentSuccess: null,
  newCommentFailure: ['error'],
  completeRequest: ['contentType', 'id'],
  completeSuccess: null,
  completeFailure: ['error'],
  deleteRequest: ['contentType', 'id'],
  deleteSuccess: null,
  deleteFailure: ['error'],
  interestRequest: ['contentType', 'id'],
  interestSuccess: null,
  interestFailure: ['error'],
});

export const initialState = fromJS({
  contentDetail: {
    isFetching: false,
    contentDetail: null,
    error: null,
  },
  contentComment: {
    isFetching: false,
    comments: null,
    error: null,
  },
  newComment: {
    isFetching: false,
    error: null,
  },
  interest: {
    isFetching: false,
    error: null,
  },
});

export const contentDetailRequest = (state) =>
  state.mergeDeep({ contentDetail: { isFetching: true, error: null } });

export const contentDetailSuccess = (state, { contentDetail }) =>
  state.mergeDeep({ contentDetail: { isFetching: false, contentDetail, error: null } });

export const contentDetailFailure = (state, { error }) =>
  state.mergeDeep({ contentDetail: { isFetching: false, contentDetail: null, error } });

export const contentCommentRequest = (state) =>
  state.mergeDeep({ comment: { isFetching: true, error: null } });

export const contentCommentSuccess = (state, { comments }) =>
  state.mergeDeep({ comment: { isFetching: false, comments, error: null } });

export const contentCommentFailure = (state, { error }) =>
  state.mergeDeep({ comment: { isFetching: false, comments: null, error } });

export const newCommentRequest = (state) =>
  state.mergeDeep({ newComment: { isFetching: true, error: null } });

export const newCommentSuccess = (state) =>
  state.mergeDeep({ newComment: { isFetching: false, error: null } });

export const newCommentFailure = (state, { error }) =>
  state.mergeDeep({ newComment: { isFetching: false, error } });

export const request = (state) =>
  state.merge({ sailDetail: { isFetching: true, error: null } });

export const success = (state) =>
  state.merge({ sailDetail: { isFetching: false } });

export const failure = (state, { error }) =>
  state.merge({ sailDetail: { isFetching: false, error } });

export const interestRequest = (state) =>
  state.mergeDeep({ interest: { isFetching: true, payload: null, error: null } });

export const interestSuccess = (state, { error }) =>
  state.mergeDeep({ interest: { isFetching: false, error: null } });

export const interestFailure = (state, { error }) =>
  state.mergeDeep({ interest: { isFetching: false, payload: null, error } });

const handlers = {
  [Types.CONTENT_DETAIL_REQUEST]: contentDetailRequest,
  [Types.CONTENT_DETAIL_SUCCESS]: contentDetailSuccess,
  [Types.CONTENT_DETAIL_FAILURE]: contentDetailFailure,
  [Types.CONTENT_COMMENT_REQUEST]: contentCommentRequest,
  [Types.CONTENT_COMMENT_SUCCESS]: contentCommentSuccess,
  [Types.CONTENT_COMMENT_FAILURE]: contentCommentFailure,
  [Types.NEW_COMMENT_REQUEST]: newCommentRequest,
  [Types.NEW_COMMENT_SUCCESS]: newCommentSuccess,
  [Types.NEW_COMMENT_FAILURE]: newCommentFailure,
  [Types.COMPLETE_REQUEST]: request,
  [Types.COMPLETE_SUCCESS]: success,
  [Types.COMPLETE_FAILURE]: failure,
  [Types.DELETE_REQUEST]: request,
  [Types.DELETE_SUCCESS]: success,
  [Types.DELETE_FAILURE]: failure,
  [Types.INTEREST_REQUEST]: interestRequest,
  [Types.INTEREST_SUCCESS]: interestSuccess,
  [Types.INTEREST_FAILURE]: interestFailure,
};

export default createReducer(initialState, handlers);
