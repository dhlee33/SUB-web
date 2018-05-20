import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.HomePageReducer;

const makeSelectContentList = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentList', 'saleContent']),
);

export {
  makeSelectContentList,
};
