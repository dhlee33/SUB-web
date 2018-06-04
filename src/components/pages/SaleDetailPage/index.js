// @flow
import React from 'react';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
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
  contentList: Map<string, any>,
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
    const {
      contentList,
      comments,
    } = this.props;

    if (!contentList || !comments) {
      return (
        <div>loading...</div>
      );
    }
    return (
      <Container>
        <br />
        <h1>
          {contentList.get('title')}
        </h1>
        <span>
          <FaUser />&nbsp;{_.get(contentList.get('user'), 'nickname')}&nbsp;&nbsp;
        </span>
        <span style={{ alignSelf: 'flex-end' }}>
          <FaCalendarO />&nbsp;{moment(contentList.get('updated')).format('YYYY/MM/DD HH:mm')}
        </span>
        <hr />
        <Row >
          <Col sm={6}>
            <img src="https://images-na.ssl-images-amazon.com/images/I/41-1VkO%2B1lL._SX359_BO1,204,203,200_.jpg" alt="algorithm" width="300px" />
          </Col>
          <Col sm={6}>
            <p><b>책 제목: </b>{contentList.get('bookTitle')}</p>
            <p><b>저자: </b>{contentList.get('author')}</p>
            <p><b>출판사: </b>{contentList.get('publisher')}</p>
            <p><b>단과대: </b>{contentList.get('department')}</p>
            <p><b>연락처: </b>연락처</p>
            <p style={{ color: 'red' }}><b>가격: </b>{contentList.get('price')}</p>
            <Button color="danger" size="lg">장바구니</Button>
          </Col>
        </Row>
        <hr />
        <h3>상세설명</h3>
        <p>{contentList.get('content')}</p>
        <hr />
        <h1>댓글</h1>
        <div>
          <Input
            value={this.state.newComment}
            onChange={({ target }) => this.setState({ newComment: target.value })}
          />
          <Button onClick={this.handleSubmitNewComment}>
            등록
          </Button>
        </div>
        {!!comments &&
          comments.map((comment: Object, index: number) => (
            <div key={index}>
              <p>{comment.getIn(['user', 'nickname'])}</p>
              <p>{comment.get('content')}</p>
            </div>
          ))
        }
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  contentList: makeSelectSaleDetail(),
  comments: makeSelectSaleComments(),
  newCommentState: makeSelectNewComment(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.saleDetailRequest,
  getComments: Actions.saleCommentRequest,
  postNewComment: Actions.newCommentRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaleDetailPage));

