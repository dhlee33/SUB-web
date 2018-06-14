import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.AlarmReducer;

const makeSelectSaleAlarms = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['alarm', 'alarms', 'sale_alarm']),
);

const makeSelectPurchaseAlarms = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['alarm', 'alarms', 'purchase_alarm']),
);

export {
  makeSelectSaleAlarms,
  makeSelectPurchaseAlarms,
};
