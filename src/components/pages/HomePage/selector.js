import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.HomePageReducer;

const makeSelectContentList = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentList', 'contentList']),
);

const makeSelectListPage = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentList', 'page']),
);

export {
  makeSelectContentList,
  makeSelectListPage,
};
