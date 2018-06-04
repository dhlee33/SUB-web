import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import { HomePage } from 'components';
import LoginPage from 'components/pages/LoginPage';
import NewPostPage from 'components/pages/NewPostPage';
import SaleDetailPage from 'components/pages/SaleDetailPage';
import SignUpPage from 'components/pages/SignUpPage';

const routes = (
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/newpost" component={NewPostPage} />
      <Route exact path="/saledetail/:id" component={SaleDetailPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </Switch>
  </Router>
);

export default routes;
