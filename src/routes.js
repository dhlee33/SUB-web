import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import { HomePage } from 'components';
import LoginPage from 'components/pages/LoginPage';
import NewPostPage from 'components/pages/NewPostPage';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/newpost" component={NewPostPage} />
  </Route>
);

export default routes;
