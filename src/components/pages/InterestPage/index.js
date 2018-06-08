import React from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Table, Badge } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectInterestList } from './selector';

type Props = {
  interest: Object,
}
class InterestPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchInterest(this.props.type);
  }

  handleDelete(contentType, id) {
    this.props.deleteInterest(contentType, id);
  }
  render() {
    const now = moment().format('YYYY/MM/DD');
    const interest = this.props.interest ? this.props.interest.toJS() : {};
    return (
      <Container>
        <br />
        <h1>장바구니</h1>
        <br />
        <Table >
          <thead>
            <tr>
              <th>책 제목</th>
              <th>희망 가격</th>
              <th><FaCalendarO /></th>
              <th>자세히 보기</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(interest) &&
          interest.my_interest_sale.map(s => {
            const { sale } = s;
            return (<tr
              key={sale.id}
              style={{ cursor: 'pointer' }}
            >
              <td>{sale.bookTitle}&nbsp;
                {sale.sale_comments.length !== 0 &&
                <Badge color="primary">
                  {sale.sale_comments.length}
                </Badge>
                }
                {sale.isComplete && <Badge color="info">완료됨</Badge>
                }

              </td>
              <td>{sale.price} 원</td>
              <td>{now === moment(sale.updated)
                .format('YYYY/MM/DD') ? moment(sale.updated)
                .format('HH:mm') : moment(sale.updated)
                .format('YYYY/MM/DD')}</td>
              <td>
                <Button color="info" onClick={() => window.location.replace(`/saledetail/${sale.id}`)}>
                  자세히 보기
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={() => this.handleDelete('sale', sale.id)}>
                  지우기
                </Button>
              </td>
            </tr>);
          })}
          </tbody>
        </Table>
        <br />
        <h1>관심 목록</h1>
        <br />
        <Table >
          <thead>
            <tr>
              <th>책 제목</th>
              <th>희망 가격</th>
              <th><FaCalendarO /></th>
              <th>자세히 보기</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {!_.isEmpty(interest) &&
          interest.my_interest_purchase.map(p => {
            const { purchase } = p;
            return (<tr
              key={purchase.id}
              style={{ cursor: 'pointer' }}
            >
              <td>{purchase.bookTitle}&nbsp;
                {purchase.purchase_comments.length !== 0 &&
                <Badge color="primary">
                  {purchase.purchase_comments.length}
                </Badge>
                }
                {purchase.isComplete && <Badge color="info">완료됨</Badge>
                }

              </td>
              <td>{purchase.price} 원</td>
              <td>{now === moment(purchase.updated)
                .format('YYYY/MM/DD') ? moment(purchase.updated)
                .format('HH:mm') : moment(purchase.updated)
                .format('YYYY/MM/DD')}</td>
              <td>
                <Button color="info" onClick={() => window.location.replace(`/purchasedetail/${purchase.id}`)}>
                  자세히 보기
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={() => this.handleDelete('purchase', purchase.id)}>
                  지우기
                </Button>
              </td>
            </tr>);
          })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  interest: makeSelectInterestList(),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchInterest: Actions.interestListRequest,
  deleteInterest: Actions.deleteInterestRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterestPage));
