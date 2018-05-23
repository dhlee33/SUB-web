import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import UpperBar from '../containers/UpperBar';
import theme from './themes/default';
import NewPostPage from './pages/NewPostPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import routes from '../routes';


injectGlobal`
  body {
    margin: 0;
  }
`;

const App = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <UpperBar />
        {routes}
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
