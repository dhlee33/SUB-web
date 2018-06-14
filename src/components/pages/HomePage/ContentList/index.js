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
import { Actions } from '../reducer';
import { makeSelectContentList, makeSelectListPage } from '../selector';
import Paginator from '../../../../containers/Paginator';
import Search from '../../../../containers/Search';
import { getToken } from '../../../../utils/localStorage';
import SaleList from './SaleList';
import PurchaseList from './PurchaseList';
import { Actions as DetailActions } from '../../DetailPage/reducer';
import './ContentList.css';


type Props = {
  fetchContent: Function,
  contentList: Array,
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
      search: '',
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    const search = qs.parse(this.props.location.search.replace('?', ''));
    this.props.fetchContent('sale', { page: 1, ...search });
    this.setState(search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const search = qs.parse(nextProps.location.search.replace('?', ''));
      this.props.fetchContent(this.state.activeTab, { page: 1, ...search });
      this.setState(search);
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      const search = qs.parse(this.props.location.search.replace('?', ''));
      if (_.isEmpty(search)) {
        this.setState({
          activeTab: tab,
          search: '',
        });
        this.props.fetchContent(tab);
      } else {
        this.setState({
          activeTab: tab,
          search: '',
        }, () => this.props.history.push());
      }
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
        <Nav
          tabs
          style={{
            borderBottom: '1px solid #17a2b8',
          }}
        >
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'sale' })}
              onClick={() => { this.toggleTab('sale'); }}
              color="info"
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
        {this.state.activeTab === 'sale' ?
          <SaleList postInterest={this.props.postInterest} contentList={this.props.content} />
          : <PurchaseList contentList={this.props.content} />}
        <Row>
          <Col sm={10}>
            <Paginator
              total={+this.props.page}
              current={+this.state.page}
              search={search}
            />
          </Col>
          <Col sm={2}>
            <Button
              disabled={!getToken()}
              href="/newpost"
              color="info"
            >
              글 등록
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContentList(),
  page: makeSelectListPage(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.contentListRequest,
  postInterest: DetailActions.interestRequest,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContentList));

