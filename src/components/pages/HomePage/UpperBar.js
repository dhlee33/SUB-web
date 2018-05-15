// @flow

import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class UpperBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      nickname: '로그인 해주세요',
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({ isAuthenticated: true });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">SNU-USEDBOOK</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.state.isAuthenticated ?
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                  별명
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    Option 1
                  </DropdownItem>
                    <DropdownItem>
                    Option 2
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    LOGOUT
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> :
                <NavItem>
                  <NavLink href={'/login'}>LOGIN</NavLink>
                </NavItem>
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default UpperBar;

