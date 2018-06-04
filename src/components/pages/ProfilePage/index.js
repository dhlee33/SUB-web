import React from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Table } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectTransaction, makeSelectProfile } from './selector';

type Props = {
  profile: Object,
  transaction: Object,
}

class ProfilePage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      profile: null,
    };
    this.OnClickModifyButton = this.OnClickModifyButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.profile && nextProps.profile) {
      this.setState({ profile: nextProps.profile.toJS() });
    }
  }

  OnClickModifyButton() {
    this.setState({
      isDisabled: !this.state.isDisabled,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
  }

  render() {
    const profile = this.state.profile;
    const transaction = this.props.transaction;
    if (!profile) { return (<div>connecting...</div>); }
    console.log(profile);
    return (
      <Container>
        <br />
        <h1>내 정보<Button onClick={this.OnClickModifyButton} color="link">{this.state.isDisabled ? '수정' : '취소'}</Button></h1>
        <hr />
        <Form>
          <FormGroup>
            <Label >이메일</Label>
            <Input onChange={e => this.setState({ profile: { ...this.props.profile, email: e.target.value } })} value={profile.email} disabled={this.state.isDisabled} />
          </FormGroup>
          <FormGroup>
            <Label >아이디</Label>
            <Input onChange={e => this.setState({ profile: { ...this.props.profile, username: e.target.value } })} value={profile.username} disabled={this.state.isDisabled} />
          </FormGroup>
          <FormGroup>
            <Label >별명</Label>
            <Input onChange={e => this.setState({ profile: { ...this.props.profile, nickname: e.target.value } })} value={profile.nickname} disabled={this.state.isDisabled} />
          </FormGroup>
          {!this.state.isDisabled &&
            <div>
              <FormGroup>
                <Label>비밀번호</Label>
                <Input name="이메일" value={profile.password} disabled={this.state.isDisabled} />
              </FormGroup>
              <FormGroup >
                <Label > 비밀번호확인 </Label>
                <Input name="이메일" value={profile.password} disabled={this.state.isDisabled} />
              </FormGroup>
              <Button onClick={this.handleSubmit}color="success">저장</Button>
            </div>
          }
          <hr />
          <h2>구매 정보 </h2>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>책 제목</th>
                  <th>가격</th>
                  <th>날짜</th>
                  <th>댓글 수</th>
                </tr>
              </thead>
              <tbody>


              </tbody>
            </Table>
          <hr />
          <h2>판매 정보</h2>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  transaction: makeSelectTransaction(),

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateProfile: Actions.newProfileRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
