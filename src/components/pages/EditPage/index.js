// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Container, Input, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, ButtonGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { Creators as Actions } from './reducer';
import InterparkSearch from '../../../utils/InterparkSearch';
import { getToken } from '../../../utils/localStorage';
import { makeSelectContentDetail } from '../DetailPage/selector';
import { Actions as DetailActions } from '../DetailPage/reducer';

type Props = {
  edit: (State) => void,
};

type State = {
  title: string,
  content: string,
  department: string,
  bookTitle: string,
  author: string,
  publisher: string,
  price: number,
  contact: string,
};

class EditPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      department: '',
      price: 0,
      contact: '',
      priceStandard: 0,
      bookSelected: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.type, this.props.match.params.id, this.props);
    this.props.fetchContent(this.props.type, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.content && nextProps.content) {
      const contentDetail = nextProps.content.toJS();
      const { title, content, price, department, contact, bookTitle, author, publisher } = contentDetail;
      let interparkImage = '';
      let priceStandard = 0;
      if (contentDetail.book) {
        priceStandard = contentDetail.book.priceStandard;
        interparkImage = contentDetail.book.image;
      }
      this.setState({ title, content, price, department, contact, bookTitle, author, publisher, priceStandard, interparkImage, bookSelected: true });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.edit(this.props.type, this.props.match.params.id, _.omit(this.state, 'bookSelected'));
    window.location.replace(`/${this.props.type}detail/${this.props.match.params.id}`);
  }

  render() {
    if (!this.props.content) {
      return (<div>loading...</div>);
    }

    return (
      <Container>
        {
          !getToken() && <Redirect to="/" />
        }
        <br />
        <h1>글 작성</h1>
        <hr />
        <Form>
          <FormGroup>
            <Label>글 제목</Label>
            <Input value={this.state.title} onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>글 종류</Label>
            <div>
              <Button disabled>{this.props.type === 'sale' ? '팝니다' : '삽니다'}</Button>
            </div>
          </FormGroup>
        </Form>
        <hr />
        <h4>책 정보 <InterparkSearch bookSelected={this.state.bookSelected} handleBook={b => this.setState(b)} /></h4>
        <hr />
        <Form>
          {this.state.interparkImage && <img src={this.state.interparkImage} alt="book" />}
          <FormGroup>
            <Label>책 제목</Label>
            <Input disabled={this.state.bookSelected} value={this.state.bookTitle} onChange={e => this.setState({ bookTitle: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>저자</Label>
            <Input disabled={this.state.bookSelected} value={this.state.author} onChange={e => this.setState({ author: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>출판사</Label>
            <Input disabled={this.state.bookSelected} value={this.state.publisher} onChange={e => this.setState({ publisher: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>원가</Label>
            <InputGroup>
              <Input disabled={this.state.bookSelected} type="number" value={this.state.priceStandard} onChange={e => this.setState({ priceStandard: e.target.value })} />
              <InputGroupAddon>
              원
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>해당 단과대</Label>
            <Input value={this.state.department} onChange={({ target }) => this.setState({ department: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>중고 가격</Label>
            <InputGroup>
              <Input value={this.state.price} type="number" onChange={({ target }) => this.setState({ price: target.value })} />
              <InputGroupAddon>
                원
              </InputGroupAddon>
            </InputGroup>
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
            <Label >내용</Label>
            <Input value={this.state.content} onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input value={this.state.contact} onChange={({ target }) => this.setState({ contact: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>수정하기</Button>
          <hr />
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  edit: Actions.editRequest,
  fetchContent: DetailActions.contentDetailRequest,
}, dispatch);

const mapStateToProps = createStructuredSelector({
  content: makeSelectContentDetail(),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage));
