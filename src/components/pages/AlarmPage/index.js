// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import moment from 'moment';
import _ from 'lodash';
import { Container, Input, Badge, Button, Form, Table, FormGroup, Label, InputGroup, InputGroupAddon, ButtonGroup } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import { Creators as Actions } from './reducer';
import { makeSelectSaleAlarms, makeSelectPurchaseAlarms } from './selector';
import { getToken } from '../../../utils/localStorage';

type Props = {
  saleAlarms: Map<string, any>,
  purchaseAlarms: Map<string, any>,
  getAlarms: () => void,
  deleteAlarms: () => void,
};

class AlarmPage extends React.PureComponent <Props> {
  constructor(props) {
    super(props);
    this.handleDeleteAlarms = this.handleDeleteAlarms.bind(this);
  }

  componentDidMount() {
    this.props.getAlarms();
  }

  handleDeleteAlarms(event) {
    event.preventDefault();
    this.props.deleteAlarms();
  }

  render() {
    const {
      saleAlarms,
      purchaseAlarms,
    } = this.props;
    console.log(this.props);
    const now = moment().format('YYYY/MM/DD');

    if (!saleAlarms || !purchaseAlarms) {
      return (
        <div>
          로딩중입니다...
        </div>
      );
    }
    return (
      <Container>
        {
          !getToken() && <Redirect to='/' />
        }
        <br />
        <h1>내가 사려는 책</h1>
        <Button onClick={this.handleDeleteAlarms}>
          모든 알림 지우기
        </Button>
        <br />
        <Table>
          <thead>
            <tr>
              <th>책 제목</th>
              <th>희망 가격</th>
              <th><FaCalendarO /></th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {!!saleAlarms &&
              saleAlarms.map((alarm: any, id: string) =>
                !alarm.getIn(['sale', 'isComplete']) &&
                  <tr key={id} style={{ cursor: 'pointer' }}>
                    <td>
                      {alarm.getIn(['sale', 'bookTitle'])}&nbsp;
                      {alarm.getIn(['sale', 'sale_comments']).length !== 0 &&
                        <Badge color="primary">
                          {alarm.getIn(['sale', 'sale_comments']).length}
                        </Badge>
                      }
                    </td>
                    <td>{alarm.getIn(['sale', 'price'])} 원</td>
                    <td>{now === moment(alarm.getIn(['sale', 'updated']))
                      .format('YYYY/MM/DD') ? moment(alarm.getIn(['sale', 'updated']))
                      .format('HH:mm') : moment(alarm.getIn(['sale', 'updated']))
                      .format('YYYY/MM/DD')}
                    </td>
                    <td>
                      <Button size="sm" color="info" onClick={() => window.location.replace(`/saledetail/${alarm.getIn(['sale', 'id'])}`)}>
                        자세히 보기
                      </Button>
                    </td>
                  </tr>
              )
            }
          </tbody>
        </Table>
        <br />
        <h1>내가 파려는 책</h1>
        <br />
        <Table>
          <thead>
            <tr>
              <th>책 제목</th>
              <th>희망 가격</th>
              <th><FaCalendarO /></th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {!!purchaseAlarms &&
              purchaseAlarms.map((alarm: any, id: string) =>
                !alarm.getIn(['purchase', 'isComplete']) &&
                  <tr key={id} style={{ cursor: 'pointer' }}>
                    <td>
                      {alarm.getIn(['purchase', 'bookTitle'])}&nbsp;
                      {alarm.getIn(['purchase', 'purchase_comments']).length !== 0 &&
                        <Badge color="primary">
                          {alarm.getIn(['purchase', 'purchase_comments']).length}
                        </Badge>
                      }
                    </td>
                    <td>{alarm.getIn(['purchase', 'price'])} 원</td>
                    <td>{now === moment(alarm.getIn(['purchase', 'updated']))
                      .format('YYYY/MM/DD') ? moment(alarm.getIn(['purchase', 'updated']))
                      .format('HH:mm') : moment(alarm.getIn(['purchase', 'updated']))
                      .format('YYYY/MM/DD')}
                    </td>
                    <td>
                      <Button size="sm" color="info" onClick={() => window.location.replace(`/purchasedetail/${alarm.getIn(['purchase', 'id'])}`)}>
                        자세히 보기
                      </Button>
                    </td>
                  </tr>
              )
            }
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  saleAlarms: makeSelectSaleAlarms(),
  purchaseAlarms: makeSelectPurchaseAlarms(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAlarms: Actions.getAlarmsRequest,
  deleteAlarms: Actions.deleteAlarmsRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlarmPage);