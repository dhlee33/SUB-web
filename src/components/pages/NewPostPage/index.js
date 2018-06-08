// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { Container, Input, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, ButtonGroup } from 'reactstrap';
import { Creators as Actions } from './reducer';
import InterparkSearch from '../../../utils/InterparkSearch';
import { getToken } from '../../../utils/localStorage';

type Props = {
  newPost: (State) => void,
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

class NewPostPage extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'sales',
      bookSelected: false,
      title: '',
      content: '',
      department: '',
      bookTitle: '',
      author: '',
      publisher: '',
      price: 0,
      priceStandard: 0,
      contact: '',
      interparkImage: '',
      image: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newPost(_.omit(this.state, ['bookSelected', 'imagePreviewUrl']));
  }

  addImage(e) {
    e.preventDefault();
    const reader = new FileReader();
    const image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image,
        imagePreviewUrl: reader.result,
      }, () => console.log(this.state));
    };

    reader.readAsDataURL(image);
  }

  render() {
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
            <Input onChange={({ target }) => this.setState({ title: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>글 종류</Label>
            <div>
              <ButtonGroup>
                <Button
                  onClick={() => this.setState({ contentType: 'sales' })}
                  color={this.state.contentType === 'sales' ? 'primary' : 'secondary'}
                >팝니다</Button>
                <Button
                  onClick={() => this.setState({ contentType: 'purchases' })}
                  color={this.state.contentType === 'purchases' ? 'primary' : 'secondary'}
                >삽니다</Button>
              </ButtonGroup>
            </div>
          </FormGroup>
        </Form>
        <hr />
        <h4>책 정보 <InterparkSearch handleBook={b => this.setState(b)} /></h4>
        <hr />
        <Form>
          {this.state.interparkImage && <div style={{ display: 'inline-block' }}><img src={this.state.interparkImage} alt="book" style={{ height: '300px', width: '170px' }} /></div>}
          {this.state.image && <div style={{ display: 'inline-block' }}><img src={this.state.imagePreviewUrl} alt="book" style={{ height: '300px', width: '170px' }} /></div>}
          <FormGroup>
            <Label>책 제목</Label>
            <Input disabled={this.state.bookSelected} value={this.state.bookTitle} onChange={({ target }) => this.setState({ bookTitle: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>저자</Label>
            <Input disabled={this.state.bookSelected} value={this.state.author} onChange={({ target }) => this.setState({ author: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>출판사</Label>
            <Input disabled={this.state.bookSelected} value={this.state.publisher} onChange={({ target }) => this.setState({ publisher: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>원가</Label>
            <InputGroup>
              <Input disabled={this.state.bookSelected} type="number" value={this.state.priceStandard} onChange={({ target }) => this.setState({ priceStandard: target.value })} />
              <InputGroupAddon>
              원
            </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label>해당 단과대</Label>
            <Input onChange={({ target }) => this.setState({ department: target.value })} />
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
            <Label>책 사진 추가</Label>
            <Input
              type="file"
              onChange={this.addImage}
              accept=".jpg,.png"
            />
          </FormGroup>
        </Form>
        <hr />
        <h4>글 내용</h4>
        <hr />
        <Form>
          <FormGroup>
            <Label >내용</Label>
            <Input onChange={({ target }) => this.setState({ content: target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>연락처</Label>
            <Input onChange={({ target }) => this.setState({ contact: target.value })} />
          </FormGroup>
          <Button onClick={this.handleSubmit}>등록하기</Button>
          <hr />
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  newPost: Actions.newPostRequest,
}, dispatch);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostPage);
