import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.SignUpReducer;

const makeSelectDuplicateFetching = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['duplicate', 'isFetching']),
);

const makeSelectDuplicate = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['duplicate', 'error']),
);


export {
  makeSelectDuplicateFetching,
  makeSelectDuplicate,
};
