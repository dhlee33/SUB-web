// @flow
import React from 'react';
import { Container, Row, Col, Input, Button, Form, InputGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectSaleDetail, makeSelectSaleComments, makeSelectNewComment } from './selector';


type Props = {
  content: Map<string, any>,
  comments: Map<string, any>,
  newCommentState: Map<string, any>,
  fetchContent: (id: number) => void,
  getComments: (id: number) => void,
  postNewComment: (saleId: number, content: string) => void,
};

type State = {
  newComment: string,
};

class SaleDetailPage extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newComment: '',
    };
    this.handleSubmitNewComment = this.handleSubmitNewComment.bind(this);
  }

  componentDidMount() {
    this.props.fetchContent(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.newCommentState.get('isFetching')) {
      this.props.getComments(this.props.match.params.id);
    }
  }

  handleSubmitNewComment(event) {
    event.preventDefault();
    this.props.postNewComment({
      saleId: this.props.match.params.id,
      content: this.state.newComment,
    });
  }


  render() {
    const now = moment().format('YYYY/MM/DD');
    const {
      content,
      comments,
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
          {content.get('title')}
        </h1>
        <span>
          <FaUser />&nbsp;{content.getIn(['user', 'nickname'])}&nbsp;&nbsp;
        </span>
        <span style={{ alignSelf: 'flex-end' }}>
          <FaCalendarO />&nbsp;{moment(content.get('updated')).format('YYYY/MM/DD HH:mm')}
        </span>
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
            <p style={{ color: 'red' }}><b>중고가: </b>{content.get('price')} 원</p>
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
  content: makeSelectSaleDetail(),
  comments: makeSelectSaleComments(),
  newCommentState: makeSelectNewComment(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.saleDetailRequest,
  getComments: Actions.saleCommentRequest,
  postNewComment: Actions.newCommentRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleDetailPage));

