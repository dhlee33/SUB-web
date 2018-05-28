
import React from 'react';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './reducer';
import { makeSelectContentList, makeSelectListPage } from '../HomePage/selector';


type Props = {
  login: (State) => void,
};

class ContentDetailPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      bookTitle: '',
      author: '',
      publisher: '',
      department: '',
      price: '',
      contact: '',
      description: '',
    };
    this.props.fetchContent(this.props.id);
  }


  render() {
    return (
      <Container>
        <br />
        <h1>
          제목 : 알골리즘 책 상태 A 팔아요~
        </h1>
        <hr />
        <Row >
          <Col sm={6}>
            <img src="https://images-na.ssl-images-amazon.com/images/I/41-1VkO%2B1lL._SX359_BO1,204,203,200_.jpg" alt="algorithm" width="300px" />
          </Col>
          <Col sm={6}>
            <p><b>책 제목: </b>책 제목 </p>
            <p><b>저자: </b>저자</p>
            <p><b>출판사: </b>출판사</p>
            <p><b>단과대: </b>단과대</p>
            <p><b>판매자 별명: </b>판매자 별명</p>
            <p><b>연락처: </b>연락처</p>
            <p style={{ color: 'red' }}><b>가격: </b>1000000</p>
            <Button color="danger" size="lg">장바구니</Button>


          </Col>
        </Row>
        <hr />
        <h3> 상세설명 </h3>
        <p> 이 책 상태는 A급 </p>
        <hr />
        <h1> 댓글 </h1>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  saleContent: makeSelectContentList(),
  page: makeSelectListPage(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentDetailRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentDetailPage));

