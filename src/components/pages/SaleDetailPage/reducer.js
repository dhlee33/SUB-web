import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const { Types, Creators: Actions } = createActions({
  saleDetailRequest: ['id'],
  saleDetailSuccess: ['saleDetail'],
  saleDetailFailure: ['error'],
  saleCommentRequest: ['id'],
  saleCommentSuccess: ['comments'],
  saleCommentFailure: ['error'],
  newCommentRequest: ['data'],
  newCommentSuccess: null,
  newCommentFailure: ['error'],
});

export const initialState = fromJS({
  saleDetail: {
    isFetching: false,
    saleDetail: null,
    error: null,
  },
  saleComment: {
    isFetching: false,
    comments: null,
    error: null,
  },
  newComment: {
    isFetching: false,
    error: null,
  },
});

export const saleDetailRequest = (state) =>
  state.mergeDeep({ saleDetail: { isFetching: true, error: null } });

export const saleDetailSuccess = (state, { saleDetail }) =>
  state.mergeDeep({ saleDetail: { isFetching: false, saleDetail, error: null } });

export const saleDetailFailure = (state, { error }) =>
  state.mergeDeep({ saleDetail: { isFetching: false, saleDetail: null, error } });

export const saleCommentRequest = (state) =>
  state.mergeDeep({ comment: { isFetching: true, error: null } });

export const saleCommentSuccess = (state, { comments }) =>
  state.mergeDeep({ comment: { isFetching: false, comments, error: null } });

export const saleCommentFailure = (state, { error }) =>
  state.mergeDeep({ comment: { isFetching: false, comments: null, error } });

export const newCommentRequest = (state) =>
  state.mergeDeep({ newComment: { isFetching: true, error: null } });

export const newCommentSuccess = (state) =>
  state.mergeDeep({ newComment: { isFetching: false, error: null } });

export const newCommentFailure = (state, { error }) =>
  state.mergeDeep({ newComment: { isFetching: false, error } });

const handlers = {
  [Types.SALE_DETAIL_REQUEST]: saleDetailRequest,
  [Types.SALE_DETAIL_SUCCESS]: saleDetailSuccess,
  [Types.SALE_DETAIL_FAILURE]: saleDetailFailure,
  [Types.SALE_COMMENT_REQUEST]: saleCommentRequest,
  [Types.SALE_COMMENT_SUCCESS]: saleCommentSuccess,
  [Types.SALE_COMMENT_FAILURE]: saleCommentFailure,
  [Types.NEW_COMMENT_REQUEST]: newCommentRequest,
  [Types.NEW_COMMENT_SUCCESS]: newCommentSuccess,
  [Types.NEW_COMMENT_FAILURE]: newCommentFailure,
};

export default createReducer(initialState, handlers);
