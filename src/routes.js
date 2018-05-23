import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import { HomePage } from 'components';
import LoginPage from 'components/pages/LoginPage';
import NewPostPage from 'components/pages/NewPostPage';

const routes = (
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/newpost" component={NewPostPage} />
    </Switch>
  </Router>
);

export default routes;
