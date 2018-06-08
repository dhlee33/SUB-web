// @flow

import React, { Component } from 'react';
import { Row, Col, InputGroup, Input, Button, Form } from 'reactstrap';

type Props = {
  searchFunction: Function;
};

class Search extends Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query || '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ query: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchFunction(this.state);
  }

  render() {
    return (
      <Row style={{ justifyContent: 'flex-end' }}>
        <Col sm={5}>
          <Form onSubmit={e => this.onSubmit(e)}>
            <InputGroup>
              <Input
                value={this.state.query}
                onChange={e => this.onInputChange(e)}
                style={{ border: '1px solid #17a2b8' }}
              />
              <Button
                type="submit"
                color="info"
              >
                검색
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Search;
