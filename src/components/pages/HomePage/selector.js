import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.HomePageReducer;

const makeSelectContentList = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['content', 'content']),
);

const makeSelectListPage = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['content', 'page']),
);

export {
  makeSelectContentList,
  makeSelectListPage,
};
