import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const { Types, Creators: Actions } = createActions({
  contentDetailRequest: ['id'],
  contentDetailSuccess: ['saleDetail'],
  contentDetailFailure: ['error'],

});

export const initialState = fromJS({
  contentDetail: {
    isFetching: false,
    contentDetail: {},
    error: null,
  },
});

export const contentDetailRequest = (state) =>
  state.mergeDeep({ contentDetail: { isFetching: true, error: null } });

export const contentDetailSuccess = (state, { contentDetail }) =>
  state.mergeDeep({ contentDetail: { isFetching: false, contentDetail: contentDetail.results, error: null }});

export const contentDetailFailure = (state, { error }) =>
  state.mergeDeep({ contentDetail: { isFetching: false, contentDetail: null, error } });

const handlers = {
  [Types.CONTENT_DETAIL_REQUEST]: contentDetailRequest,
  [Types.CONTENT_DETAIL_SUCCESS]: contentDetailSuccess,
  [Types.CONTENT_DETAIL_SUCCESS]: contentDetailFailure,
};

export default createReducer(initialState, handlers);
