import React from 'react';
import { Container, Button, Nav, NavItem, NavLink } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import ContentList from './ContentList';
import Search from '../../../containers/Search';

const HomePage = () => {
  return (
    <Container>
      <br />
      <Search />
      <ContentList />
    </Container>
  );
};

export default HomePage;
