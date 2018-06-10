import React from 'react';
import { Table, Badge } from 'reactstrap';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import moment from 'moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

const PurchaseList = ({ contentList, history }) => {
  const now = moment().format('YYYY/MM/DD');
  return (
    <Table hover>
      <thead>
        <tr>
          <th>책 제목</th>
          <th>희망 가격</th>
          <th>글쓴이</th>
          <th><FaCalendarO /></th>
        </tr>
      </thead>
      <tbody>
        {!_.isEmpty(contentList) && contentList.toJS().map(p =>
          <tr
            key={p.id}
            onClick={() => history.push(`purchasedetail/${p.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <td>
              {p.bookTitle}&nbsp;
              {p.purchase_comments !== 0 &&
                <Badge color="primary">
                  {p.purchase_comments}
                </Badge>
              }
              {p.isComplete && <Badge color="info">완료됨</Badge>}
            </td>
            <td>{p.price} 원</td>
            <td>{_.get(p.user, 'nickname')}</td>
            <td>{now === moment(p.updated).format('YYYY/MM/DD') ? moment(p.updated).format('HH:mm') : moment(p.updated).format('YYYY/MM/DD')}</td>
          </tr>
      )}
      </tbody>
    </Table>
  );
};

export default withRouter(PurchaseList);
