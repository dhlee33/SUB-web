import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.ProfileReducer;

const makeSelectTransaction = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['newTransaction', 'payload']),
);

const makeSelectProfile = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['user', 'profile']),
);

export {
  makeSelectTransaction,
  makeSelectProfile,
};
