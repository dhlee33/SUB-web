import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.HomePageReducer;

const makeSelectContentList = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentList', 'saleContent']),
);

const makeSelectListPage = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentList', 'page']),
);

export {
  makeSelectContentList,
  makeSelectListPage,
};
