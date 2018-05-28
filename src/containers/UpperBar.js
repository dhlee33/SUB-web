// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import { usernameSelecter, Authenticated } from '../components/pages/LoginPage/selector';

type Props = {
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
            <Nav className="ml-auto" navbar>
              {/*this.props.isAuthenticated ?
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
              </UncontrolledDropdown> :*/}
                <NavItem>
                  <NavLink href={'/login'}>LOGIN</NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(UpperBar);

