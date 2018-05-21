import { createSelector } from 'reselect';

const makeSelectRoute = () => (state) => state.routing;

const makeSelectPrev = () => createSelector(
  makeSelectRoute(),
  (route) => route.locationBeforeTransitions,
);

export {
  makeSelectPrev,
};
