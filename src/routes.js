import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from 'components/App';
import { HomePage } from 'components';
import LoginPage from 'components/pages/LoginPage';
import NewPostPage from 'components/pages/NewPostPage';
import DetailPage from 'components/pages/DetailPage';
import SignUpPage from 'components/pages/SignUpPage';
import EditPage from 'components/pages/EditPage';
import ProfilePage from 'components/pages/ProfilePage';
import InterestPage from 'components/pages/InterestPage';

const routes = (
  <Router basename="/">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/newpost" component={NewPostPage} />
      <Route exact path="/saledetail/:id" render={() => <DetailPage type="sale" />} />
      <Route exact path="/purchasedetail/:id" render={() => <DetailPage type="purchase" />} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/interest" component={InterestPage} />
    </Switch>
    <Route exact path="/purchaseedit/:id" render={() => <EditPage type="purchase" />} />
    <Route exact path="/saleedit/:id" render={() => <EditPage type="edit" />} />
  </Router>
);

export default routes;
