// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';

type Props = {
  login: Function,
}

class NewPostPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <Container>
        <UpperBar />
        <br />
        <h1>글 작성</h1>
        <hr />
        <h4>책 정보</h4>
        <hr />
        <Button color="primary">팝니다</Button>
        <Button color="secondary">삽니다</Button>
        <Form>
          <FormGroup>
            <br />
            <Label for="exampleEmail">책 제목</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">저자</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">출판사</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">해당 단과대</Label>
            <Input type="select" name="email" id="exampleEmail" placeholder="">
              <option>단과대 이름</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">가격</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Button>책 사진 추가</Button>
          </FormGroup>
        </Form>
        <hr />
        <h4>글 내용</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label for="exampleEmail">글 제목</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">내용</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">연락처</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="" />
          </FormGroup>
        </Form>
        <Button>등록하기</Button>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
