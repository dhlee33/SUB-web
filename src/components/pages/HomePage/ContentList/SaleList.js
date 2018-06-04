import React from 'react';
import { Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import moment from 'moment';
import _ from 'lodash';

const SaleList = ({ contentList }) => {
  const now = moment().format('YYYY/MM/DD');
  return (
    <div>
      {contentList &&
        contentList.toJS().map(s =>
          <div key={s.id} style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <Card className="contentCard" style={{ width: '90%' }}>
              <CardHeader className="contentCardHeader">
                <h4>{s.title}</h4>
                <span>
                  <FaUser />&nbsp;{_.get(s.user, 'nickname')}&nbsp;&nbsp;
                </span>
                <span>
                  <FaCalendarO />&nbsp;{now === moment(s.updated).format('YYYY/MM/DD') ? moment(s.updated).format('HH:mm') : moment(s.updated).format('YYYY/MM/DD')}&nbsp;&nbsp;
                </span>
                <span>댓글: </span>
                <span style={{color: 'blue'}}>
                  {s.sale_comments ? s.sale_comments.length : 0}
                </span>
                <span>개</span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col style={{ textAlign: 'center' }} sm={12} md={5}><img src={s.book ? s.book.image : 'https://www.classicposters.com/images/nopicture.gif'} alt="BOOKIMG" width="190px" /></Col>
                  <Col sm={12} md={7}>
                    <p><b>책 제목: </b> {s.bookTitle}</p>
                    <p><b>저자: </b> {s.author}</p>
                    <p><b>출판사: </b> {s.publisher}</p>
                    <p><b>가격: </b>{s.price} 원</p>
                    <Button style={{ width: '100%', marginBottom: '10px' }} href={`/saledetail/${s.id}`}>상세 보기</Button>
                    <Button color="danger" style={{ width: '100%' }} href={`/saledetail/${s.id}`}>장바구니</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
      )}
    </div>
  );
};

export default SaleList;
