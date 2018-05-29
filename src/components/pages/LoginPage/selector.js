import { createSelector } from 'reselect';

const makeSelectRoute = () => (state) => state.get('route');

const makeSelectPage = () => (state) => state.LoginReducer;

const makeSelectPrev = () => createSelector(
  makeSelectRoute(),
  (route) => route.get('locationBeforeTransitions'),
);

const makeSelectUser = () => createSelector(
  makeSelectPage(),
  (page) => page.get('user'),
);

const makeSelectProfile = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['user', 'profile']),
);

export {
  makeSelectPrev,
  makeSelectProfile,
};
