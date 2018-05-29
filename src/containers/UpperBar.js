// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { makeSelectProfile } from '../components/pages/LoginPage/selector';
import { Actions } from '../components/pages/LoginPage/reducer';

type Props = {
  user: any,
  logout: () => void,
};

type State = {
  isOpen: boolean,
};

class UpperBar extends React.Component <Props> {
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
      <div>
        <Navbar
          color="light"
          light expand="md"
        >
          <NavbarBrand href="/">
            <b>SNU-USEDBOOK</b>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user &&
                <React.Fragment>
                  <NavItem>
                    <NavLink>
                      {user.get('nickname')} 님
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.handleLogout}>
                      로그아웃
                    </NavLink>
                  </NavItem>
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
