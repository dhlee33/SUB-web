// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Container, Badge } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { makeSelectProfile } from '../components/pages/ProfilePage/selector';
import { Actions } from '../components/pages/LoginPage/reducer';

type Props = {
  user: any,
  logout: () => void,
};

type State = {
  isOpen: boolean,
};

class UpperBar extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    window.location.replace('/');
  }

  render() {
    const { user } = this.props;

    return (
      <div style={{zIndex: 2, position: 'fixed', width: '100%', marginTop: '-60px'}}>
        <Navbar
          light
          expand="md"
          style={{
            borderBottom: '1px solid #17a2b8',
            backgroundColor: 'white',
          }}
        >
          <Container>
          <NavbarBrand href="/">
            <b>SNU-USEDBOOK</b>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user &&
                <React.Fragment>
                  <NavItem>
                    <Button color="light" href="/newpost">
                      글 등록
                    </Button>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {user.get('nickname')} 님 {user.get('alarm_count') > 0 && <Badge color="info">{user.get('alarm_count')}</Badge>}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={() => window.location.replace('/profile')}>
                        내 프로필
                      </DropdownItem>
                      <DropdownItem onClick={() => window.location.replace('/interest')}>
                        장바구니
                      </DropdownItem>
                      <DropdownItem onClick={() => window.location.replace('/alarm')}>
                        알림
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.handleLogout}>
                        로그아웃
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </React.Fragment>
              }
              {!user &&
                <NavItem>
                  <NavLink href="/login">
                    로그인
                  </NavLink>
                </NavItem>
              }
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectProfile(),
});

const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  logout: Actions.logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpperBar);
