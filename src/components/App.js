// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { ThemeProvider } from 'styled-components';
import { bindActionCreators } from 'redux';
import { Actions } from '../components/pages/ProfilePage/reducer';
import UpperBar from '../containers/UpperBar';
import theme from './themes/default';
import NewPostPage from './pages/NewPostPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import routes from '../routes';
import { getToken } from '../utils/localStorage';

type Props = {
  children: any,
  getProfile: () => void,
}

class App extends React.PureComponent<Props> {
  componentDidMount() {
    if (getToken()) {
      this.props.getProfile();
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <UpperBar />
          {routes}
        </Container>
      </ThemeProvider>
    );
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProfile: Actions.profileRequest,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
