// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import { Actions } from './reducer';

type Props = {
  login: Function,
}

class LoginPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.props.login(this.state);
    //window.location.replace('/');
  }
  render() {
    return (
      <Container>
        <UpperBar />
        <br />
        <h1>
          로그인 하세요
        </h1>
        <hr />
        <Row>
          <Col sm={7}>
            <Input placeholder="USERNAME" onChange={e => this.setState({ username: e.target.value })} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={7}>
            <Input placeholder="PASSWORD" onChange={e => this.setState({ password: e.target.value })} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={7}>
            <Button onClick={this.login}>LOGIN</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: Actions.loginRequest,
}, dispatch);

const mapStateToProps = (state) => ({
  errorMessage: state.LoginReducer.errorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
