import React, { Component } from 'react';
import { Row, Col, InputGroup, Input, Button } from 'reactstrap';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row style={{justifyContent: 'flex-end'}}>
        <Col sm={5}>
          <InputGroup>
            <Input />
            <Button>검색</Button>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

export default Search;
