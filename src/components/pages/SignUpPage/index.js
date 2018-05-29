// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { Container, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import Upperbar from '../../../containers/UpperBar';
import { Creators as Actions } from './reducer';
import { makeSelectDuplicate, makeSelectDuplicateFetching } from './selector';

type Props = {
  isFetching: true,
  isDuplicate: any,
  signUp: (State) => void,
  duplicate: (string) => void,
};

type State = {
  username: string,
  password: string,
  email: string,
  nickname: string,
  usernameChecked: boolean,
};

class SignUpPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      nickname: '',
      usernameChecked: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDuplicate = this.handleDuplicate.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.isFetching && (this.props.isDuplicate !== nextProps.isDuplicate)) {
      this.setState({ usernameChecked: false });
      alert('중복되는 아이디가 존재합니다');
    } else if (!nextProps.isFetching && !nextProps.isDuplicate) {
      this.setState({ usernameChecked: true });
      alert('사용할 수 있는 아이디입니다');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.usernameChecked) {
      this.props.signUp(this.state);
    } else {
      alert('아이디 중복확인을 해주세요');
    }
  }

  handleDuplicate(event) {
    event.preventDefault();
    this.props.duplicate(this.state.username);
  }

  render() {
    return (
      <Container>
        <br />
        <h1>회원가입</h1>
        <hr />
        <br />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              value={this.state.username}
              onChange={({ target }) => this.setState({ username: target.value })}
            />
            <br />
            <Button onClick={this.handleDuplicate}>
              중복확인
            </Button>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={this.state.password}
              onChange={({ target }) => this.setState({ password: target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>서울대학교 이메일</Label>
            <Input
              type="text"
              value={this.state.email}
              onChange={({ target }) => this.setState({ email: target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={this.state.nickname}
              onChange={({ target }) => this.setState({ nickname: target.value })}
            />
          </FormGroup>
          <Button type="submit">
            회원가입
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: makeSelectDuplicateFetching(),
  isDuplicate: makeSelectDuplicate(),
});

const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  signUp: Actions.signUpRequest,
  duplicate: Actions.duplicateRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
