import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import LoginPage from 'components/pages/LoginPage';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route exact path="/login" component={LoginPage} />
  </Route>
)

export default routes
