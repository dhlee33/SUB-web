import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.ProfileReducer;

const makeSelectTransaction = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['user', 'transaction']),
);

export {
  makeSelectTransaction,
};
