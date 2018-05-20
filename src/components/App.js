import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';
import { injectGlobal, ThemeProvider } from 'styled-components';
import UpperBar from '../containers/UpperBar';
import theme from './themes/default';

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
        {children}
      </Container>
    </ThemeProvider>
  );
};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
