import { createActions, createReducer } from 'reduxsauce';
import {
  getToken, getUserId, getUsername, removeTokens, removeUsername,
  saveUsername, saveUserId, removeUserId,
} from '../../../utils/localStorage';

const initialState = {
  isFetching: false,
  errorMessage: '',
  saleContent: [],
};

export const { Types, Creators: Actions } = createActions({
  fetchContentListRequest: ['id'],
  fetchContentListSuccess: ['payload'],
  fetchContentListFailure: ['errorMessage'],
});

const fetchContentListRequest = state => ({ ...state, isFetching: true, errorMessage: '' });
const fetchContentListSuccess = (state, { payload }) => {
  console.log(payload);
  return ({ ...state, isFetching: false, errorMessage: '', saleContent: payload });
};
const fetchContentListFailure = (state, { errorMessage }) => ({ ...state, isFetching: false, errorMessage });


const handlers = {
  [Types.FETCH_CONTENT_LIST_REQUEST]: fetchContentListRequest,
  [Types.FETCH_CONTENT_LIST_SUCCESS]: fetchContentListSuccess,
  [Types.FETCH_CONTENT_LIST_FAILURE]: fetchContentListFailure,
};
export default createReducer(initialState, handlers);
