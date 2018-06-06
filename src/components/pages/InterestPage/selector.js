import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.InterestReducer;

const makeSelectInterestList = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['interestList', 'interestList']),
);

export {
  makeSelectInterestList,
};
