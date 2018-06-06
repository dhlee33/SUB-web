// @flow
import React from 'react';
import { Container, Row, Col, Input, Button, Form, InputGroup, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectContentDetail, makeSelectContentComments, makeSelectNewComment } from './selector';
import { makeSelectProfile } from '../LoginPage/selector';


type Props = {
  content: Map<string, any>,
  comments: Map<string, any>,
  newCommentState: Map<string, any>,
  fetchContent: (contentTYpe: String, id: number) => void,
  getComments: (contentTYpe: String, id: number) => void,
  postNewComment: (contentTYpe: String, data: Object) => void,
  profile: Object,
  complete: Function,
  contentDelete: Function,
  type: String,
};

type State = {
  newComment: string,
};

class DetailPage extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newComment: '',
      dropdownOpen: false,
    };
    this.handleSubmitNewComment = this.handleSubmitNewComment.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchContent(this.props.type, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.newCommentState.get('isFetching')) {
      this.props.getComments(this.props.type, this.props.match.params.id);
    }
  }

  handleSubmitNewComment(event) {
    event.preventDefault();
    if (this.props.type === 'sale') {
      this.props.postNewComment('sale', {
        saleId: this.props.match.params.id,
        content: this.state.newComment,
      });
    } else {
      this.props.postNewComment('purchase', {
        purchaseId: this.props.match.params.id,
        content: this.state.newComment,
      });
    }
  }

  handleComplete() {
    const complete = confirm('완료하시겠습니까?');
    if (complete) {
      this.props.complete(this.props.type, this.props.content.get('id'));
      window.location.reload();
    }
  }

  handleDelete() {
    const deleteConfirm = confirm('삭제하시겠습니까?');
    if (deleteConfirm) {
      this.props.contentDelete(this.props.type, this.props.content.get('id'));
      window.location.replace('/');
    }
  }


  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }


  render() {
    const now = moment().format('YYYY/MM/DD');
    const {
      content,
      comments,
      profile,
    } = this.props;

    if (!content || !comments) {
      return (
        <div>loading...</div>
      );
    }
    return (
      <Container>
        <br />
        <h1>
          {content.get('title')}&nbsp;
        </h1>
        <Row>
          <Col>
            <span>
              <FaUser />&nbsp;{content.getIn(['user', 'nickname'])}&nbsp;&nbsp;
            </span>
            <span style={{ alignSelf: 'flex-end' }}>
              <FaCalendarO />&nbsp;{moment(content.get('updated')).format('YYYY/MM/DD HH:mm')}
            </span>
          </Col>
          <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {content.get('isComplete') && <span style={{ fontSize: '15px', color: 'blue' }} >완료된 거래입니다. &nbsp;</span>}
            {profile && profile.get('id') === content.getIn(['user', 'id']) &&
              <Dropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>
                  수정
                </DropdownToggle>
                <DropdownMenu>
                  {!content.get('isComplete') &&
                    <DropdownItem>수정</DropdownItem>
                  }
                  <DropdownItem onClick={this.handleDelete}>삭제</DropdownItem>
                  {!content.get('isComplete') &&
                    <DropdownItem onClick={this.handleComplete}>
                    거래 완료
                  </DropdownItem>
                  }
                </DropdownMenu>
              </Dropdown>}
          </Col>
        </Row>
        <hr />
        <Row >
          <Col sm={6} lg={4}>
            <img src={content.get('book') ? content.getIn(['book', 'image']) : 'https://www.classicposters.com/images/nopicture.gif'} alt="algorithm" height="350px" />
          </Col>
          <Col sm={6}>
            <p><b>책 제목: </b>{content.get('bookTitle')}</p>
            <p><b>저자: </b>{content.get('author')}</p>
            <p><b>출판사: </b>{content.get('publisher')}</p>
            <p><b>단과대: </b>{content.get('department')}</p>
            <p><b>연락처: </b>{content.get('contact')}</p>
            <p><b>원가: </b>{content.getIn(['book', 'priceStandard'])} 원</p>
            <p style={{ color: 'red' }}><b>{this.props.type ==='sale' ? '중고가: ' : '희망 가격: '}</b>{content.get('price')} 원</p>
            <Button color="danger" size="lg">장바구니</Button>
          </Col>
        </Row>
        <hr />
        <h3>상세설명</h3>
        <p>{content.get('content')}</p>
        <hr />
        <h1>댓글</h1>
        <div>
          <br />
          <Form onSubmit={this.handleSubmitNewComment}>
            <InputGroup>
              <Input
                value={this.state.newComment}
                onChange={({ target }) => this.setState({ newComment: target.value })}
              />
              <Button type="submit">
            등록
          </Button>
            </InputGroup>
          </Form>
        </div>
        <br />
        {!_.isEmpty(comments.toJS()) ?
          comments.map((comment: Object, index: number) => (
            <div key={index}>
              <div>{comment.get('content')}</div>
              <div style={{ fontSize: '13px' }}>
                <span>
                  <FaUser />&nbsp;{comment.getIn(['user', 'nickname'])}&nbsp;&nbsp;
                </span>
                <span style={{ alignSelf: 'flex-end' }}>
                  <FaCalendarO />&nbsp;{now === moment(comment.get('updated')).format('YYYY/MM/DD') ? moment(comment.get('updated')).format('HH:mm') : moment(comment.get('updated')).format('YYYY/MM/DD')}
                </span>
              </div>
              <hr style={{ marginTop: '5px' }} />
            </div>
          )) : <div>아직 댓글이 없습니다.</div>
        }
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContentDetail(),
  comments: makeSelectContentComments(),
  newCommentState: makeSelectNewComment(),
  profile: makeSelectProfile(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentDetailRequest,
  getComments: Actions.contentCommentRequest,
  postNewComment: Actions.newCommentRequest,
  complete: Actions.completeRequest,
  contentDelete: Actions.deleteRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPage));

