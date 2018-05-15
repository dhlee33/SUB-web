import React from 'react';
import { Container, Button } from 'reactstrap'
import UpperBar from '../../../containers/UpperBar';

const HomePage = () => {
  return (
    <Container>
      <UpperBar />
      <Button>글 올리기</Button>
    </Container>
  );
};

export default HomePage;
