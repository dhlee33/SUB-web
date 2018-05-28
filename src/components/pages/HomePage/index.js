import React from 'react';
import { Container, Button, Nav, NavItem, NavLink } from 'reactstrap';
import UpperBar from '../../../containers/UpperBar';
import ContentList from './ContentList';

const HomePage = () => {
  return (
    <Container>
      <br />
      <ContentList />
    </Container>
  );
};

export default HomePage;
