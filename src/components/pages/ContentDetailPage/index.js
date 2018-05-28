
import React from 'react';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from './reducer';
import { makeSelectContentDetail } from './selector';


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
    this.props.fetchContent(this.props.match.params.id);
  }


  render() {
    console.log(this.props);
    const saleContent = this.props.saleContent.toJS();
    return (
      <Container>
        <br />
        <h1>
          {saleContent.title}
        </h1>
        <hr />
        <Row >
          <Col sm={6}>
            <img src="https://images-na.ssl-images-amazon.com/images/I/41-1VkO%2B1lL._SX359_BO1,204,203,200_.jpg" alt="algorithm" width="300px" />
          </Col>
          <Col sm={6}>
            <p><b>책 제목: </b>{saleContent.bookTitle} </p>
            <p><b>저자: </b>{saleContent.author}</p>
            <p><b>출판사: </b>{saleContent.publisher}</p>
            <p><b>단과대: </b>{saleContent.department}</p>
            <p><b>판매자 별명: </b>판매자 별명</p>
            <p><b>연락처: </b>연락처</p>
            <p style={{ color: 'red' }}><b>가격: </b>{saleContent.price}</p>
            <Button color="danger" size="lg">장바구니</Button>


          </Col>
        </Row>
        <hr />
        <h3> 상세설명 </h3>
        <p> {saleContent.content} </p>
        <hr />
        <h1> 댓글 </h1>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  saleContent: makeSelectContentDetail(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentDetailRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentDetailPage));

