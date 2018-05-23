// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import { Actions } from './reducer';

type Props = {
  login: (State) => void,
};

class LoginPage extends React.Component <Props> {
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
    console.log(this.props);
    return (
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
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login: Actions.loginRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
