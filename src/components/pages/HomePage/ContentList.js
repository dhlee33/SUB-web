// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Container, Pagination, PaginationLink, PaginationItem, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { Actions } from './reducer';
import { saleContentSelector } from './selector'

type Props = {
  username: string,
  isAuthenticated: boolean,
  fetchContent: Function,
  saleContent: Array,
}

class ContentList extends Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
    this.props.fetchContent();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            팝니다
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            삽니다
          </NavLink>
          </NavItem>
        </Nav>
        <br />
        <br />
        {this.props.saleContent.map(s =>
          <div><Card>
            <CardHeader>
              {s.bookTitle}
            </CardHeader>
            <CardBody>
              <Row>
                <Col><image>book picture</image></Col>
                <Col>{s.price} 원</Col>
              </Row>
            </CardBody>
          </Card>
            <br />
          </div>)}
        <Row>
          <Col sm={10}>
            <Pagination>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         1
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         2
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         3
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         4
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
         5
         </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
          <Col sm={2}>
            <Button href="/newpost">글 등록</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  saleContent: saleContentSelector(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchContent: Actions.fetchContentListRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);

