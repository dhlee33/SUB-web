// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { makeSelectIsAuthenticated, makeSelectUserName } from '../components/pages/LoginPage/selector';
import { bindActionCreators } from 'redux';
import { Actions } from '../components/pages/LoginPage/reducer';

type Props = {
  isAuthenticated: boolean,
  userName: string,
  logout: Function,
};

class UpperBar extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '로그인 해주세요',
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><b>SNU-USEDBOOK</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.props.isAuthenticated ?
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href={'/newpost'}>글 등록</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {this.props.userName}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.props.logout}>
                      LOGOUT
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav> :
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href={'/login'}>LOGIN</NavLink>
                </NavItem>
              </Nav>
              }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  userName: makeSelectUserName(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout: Actions.logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpperBar);

