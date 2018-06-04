import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.SaleDetailReducer;

const makeSelectSaleDetail = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['saleDetail', 'saleDetail']),
);

const makeSelectSaleComments = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['comment', 'comments']),
);

export {
  makeSelectSaleDetail,
  makeSelectSaleComments,
};
