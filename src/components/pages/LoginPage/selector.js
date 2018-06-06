import { createSelector } from 'reselect';

const makeSelectRoute = () => (state) => state.get('route');

const makeSelectPage = () => (state) => state.LoginReducer;

const makeSelectPrev = () => createSelector(
  makeSelectRoute(),
  (route) => route.get('locationBeforeTransitions'),
);

export {
  makeSelectPrev,
};
