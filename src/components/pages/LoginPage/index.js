// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import { Actions } from './reducer';
import { getToken, removeToken } from '../../../utils/localStorage';

type Props = {
  login: (State) => void,
};

type State = {
  username: string,
  password: string,
};

class LoginPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        {
          getToken() && <Redirect to="/" />
        }
        <Container>
        <br />
        <h1>
          로그인 하세요
        </h1>
        <hr />
        <Form onSubmit={this.handleLogin}>
          <Row>
            <Col sm={7}>
              <Input placeholder="USERNAME" onChange={e => this.setState({ username: e.target.value })} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={7}>
              <Input type="password" placeholder="PASSWORD" onChange={e => this.setState({ password: e.target.value })} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={7}>
              <Button type="submit">LOGIN</Button>
              <Button color="link" href="/signup">회원가입</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: Actions.loginRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
