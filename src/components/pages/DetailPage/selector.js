import { createSelector } from 'reselect';

const makeSelectPage = () => (state) => state.ContentDetailReducer;

const makeSelectContentDetail = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['contentDetail', 'contentDetail']),
);

const makeSelectContentComments = () => createSelector(
  makeSelectPage(),
  (page) => page.getIn(['comment', 'comments']),
);

const makeSelectNewComment = () => createSelector(
  makeSelectPage(),
  (page) => page.get('newComment'),
);

export {
  makeSelectContentDetail,
  makeSelectContentComments,
  makeSelectNewComment,
};
