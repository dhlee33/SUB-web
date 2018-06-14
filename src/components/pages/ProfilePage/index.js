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
  history: Object,
}

type State = {
  password: string,
  passwordConfirm: string,
  nickname: string,
}

class ProfilePage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      profile: null,
      password: '',
      passwordConfirm: '',
      nickname: '',
    };
    this.OnClickModifyButton = this.OnClickModifyButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.callTransaction();
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
    if (this.state.password !== this.state.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const confirmSubmit = confirm('수정하시겠습니까');
    if (confirmSubmit) {
      const { nickname, password } = this.state;
      const data = {};
      if (nickname) {
        data.nickname = nickname;
      }
      if (password) {
        if (this.state.password.length < 8) {
          alert('비밀번호는 8자리 이상이어야 합니다.');
          return;
        }
        data.password = password;
      }
      this.props.updateProfile(data);
      window.location.reload();
    }
  }

  render() {
    const now = moment().format('YYYY/MM/DD');
    const profile = this.state.profile;
    const transaction = this.props.transaction ? this.props.transaction.toJS() : {};
    if (!profile) { return (<div>connecting...</div>); }
    return (
      <Container>
        <br />
        <h1>내 정보<Button onClick={this.OnClickModifyButton} color="link">{this.state.isDisabled ? '수정' : '취소'}</Button></h1>
        <hr />
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Label >이메일</Label>
            <Input value={profile.email} disabled />
          </FormGroup>
          <FormGroup>
            <Label >아이디</Label>
            <Input value={profile.username} disabled />
          </FormGroup>
          <FormGroup>
            <Label >별명</Label>
            <Input onChange={e => this.setState({ profile: { ...this.props.profile, nickname: e.target.value }, nickname: e.target.value })} value={profile.nickname} disabled={this.state.isDisabled} />
          </FormGroup>
          {!this.state.isDisabled &&
            <div>
              <FormGroup>
                <Label>비밀번호</Label>
                <Input type="password" onChange={e => this.setState({ password: e.target.value })} disabled={this.state.isDisabled} />
              </FormGroup>
              <FormGroup >
                <Label>비밀번호 확인</Label>
                <Input type="password" onChange={e => this.setState({ passwordConfirm: e.target.value })} disabled={this.state.isDisabled} />
              </FormGroup>
              <Button type="submit" color="success">저장</Button>
            </div>
          }
        </Form>
        <hr />
        <h2>판매 정보 </h2>
        <Table hover>
          <thead>
            <tr>
              <th>책 제목</th>
              <th>가격</th>
              <th>등록된 날짜</th>
              <th>댓글 수</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(transaction) &&
              transaction.my_sale.map(p =>
                <tr
                  key={p.id}
                  onClick={() => window.location.replace(`/saledetail/${p.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{p.bookTitle}</td>
                  <td>{p.price} 원</td>
                  <td>{now === moment(p.updated).format('YYYY/MM/DD') ? moment(p.updated).format('HH:mm') : moment(p.updated).format('YYYY/MM/DD')}</td>
                  <td>{p.sale_comments ? p.sale_comments.length : 0 }</td>
                </tr>
              )}
          </tbody>
        </Table>
        <hr />
        <h2>구매 정보</h2>
        <Table hover>
          <thead>
            <tr>
              <th>책 제목</th>
              <th>가격</th>
              <th>등록된 날짜</th>
              <th>댓글 수</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(transaction) &&
            transaction.my_purchase.map(p =>
              <tr
                key={p.id}
                onClick={() => window.location.replace(`/purchasedetail/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>{p.bookTitle}</td>
                <td>{p.price} 원</td>
                <td>{now === moment(p.updated).format('YYYY/MM/DD') ? moment(p.updated).format('HH:mm') : moment(p.updated).format('YYYY/MM/DD')}</td>
                <td>{p.purchase_comments ? p.purchase_comments.length : 0}</td>
              </tr>
            )}
          </tbody>
        </Table>
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
  callTransaction: Actions.newTransactionRequest,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
