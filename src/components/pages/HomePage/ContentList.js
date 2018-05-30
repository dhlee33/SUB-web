// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import qs from 'qs';
import { Container, Pagination, PaginationLink, PaginationItem, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { Actions } from './reducer';
import { makeSelectContentList, makeSelectListPage } from './selector';
import Paginator from '../../../containers/Paginator';
import './ContentList.css';
import Search from '../../../containers/Search';
import { getToken } from '../../../utils/localStorage';


type Props = {
  fetchContent: Function,
  saleContent: Array,
  location: Object,
};

type State = {
  activeTab: string,
  page: number,
};

class ContentList extends Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'sale',
      page: 1,
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.props.fetchContent({ page: 1, ...search });
    this.setState(search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.props.fetchContent({ page: 1, ...search });
      this.setState(search);
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  search(query) {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.props.history.push({ search: qs.stringify({ query: search.query, ...query }) });
  }

  render() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    return (
      <Container>
        <Search
          searchFunction={this.search}
          query={this.state.query}
        />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'sale' })}
              onClick={() => { this.toggleTab('sale'); }}
            >
            팝니다
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'purchase' })}
              onClick={() => { this.toggleTab('purchase'); }}
            >
            삽니다
          </NavLink>
          </NavItem>
        </Nav>
        <br />
        <br />
        {!!this.props.saleContent &&
          this.props.saleContent.toJS().map(s =>
            <div key={s.id} style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
              <Card className="contentCard" style={{width: '90%'}}>
                <CardHeader className="contentCardHeader">
                  <h4>{s.title}</h4>
                  <span>
                    <FaUser />&nbsp;{_.get(s.user, 'nickname')}&nbsp;&nbsp;
                  </span>
                  <span>
                    <FaCalendarO />&nbsp;{moment(s.updated).format('YYYY/MM/DD HH:mm')}
                  </span>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col style={{textAlign: 'center'}} sm={12} md={5}><img src="https://images-na.ssl-images-amazon.com/images/I/51rPLfOvqxL._SX376_BO1,204,203,200_.jpg" alt="BOOKIMG" width="190px" /></Col>
                    <Col sm={12} md={7}>
                      <p><b>책 제목: </b> {s.bookTitle}</p>
                      <p><b>저자: </b> {s.author}</p>
                      <p><b>출판사: </b> {s.publisher}</p>
                      <p><b>가격: </b>{s.price} 원</p>
                      <Button style={{width: '300px', marginBottom: '10px'}} href={`/saledetail/${s.id}`}>상세 보기</Button>
                      <Button color="danger" style={{width: '300px'}} href={`/saledetail/${s.id}`}>장바구니</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          )}
        <Row>
          <Col sm={10}>
            <Paginator
              total={+this.props.page}
              current={+this.state.page}
              search={search}
            />
          </Col>
          <Col sm={2}>
            <Button disabled={!getToken()} href="/newpost">글 등록</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  saleContent: makeSelectContentList(),
  page: makeSelectListPage(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentListRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentList));

