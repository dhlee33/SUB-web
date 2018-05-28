import { createSelector } from 'reselect';

const makeSelectRoute = () => (state) => state.routing;
const makeSelectPrev = () => createSelector(
  makeSelectRoute(),
  (route) => route.locationBeforeTransitions,
);

const makeSelectPage = () => (state) => state.LoginReducer;
const makeSelectIsAuthenticated = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['user', 'isAuthenticated'])
);
const makeSelectUserName = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['user', 'profile', 'username'])
);
export {
  makeSelectPrev,
  makeSelectIsAuthenticated,
  makeSelectUserName,
};
