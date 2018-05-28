import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.ContentDetailReducer;

const makeSelectContentDetail = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentDetail', 'contentDetail']),
);


export {
  makeSelectContentDetail,
};
