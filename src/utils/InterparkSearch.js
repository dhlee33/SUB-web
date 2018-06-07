// @flow
import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup, Input, Table, Form } from 'reactstrap';
import _ from 'lodash';
import fetchJsonp from 'fetch-jsonp';

const search = (query) => {
  const url = `http://book.interpark.com/api/search.api?key=DEA640B18A1E001E0A7C44568D07A7F6F68BB2A79304649B3BA4A7E65BF078D7&query=${query}&output=json`;
  return new Promise((resolve => fetchJsonp(url).then(response => response.json()).then(response => resolve(response))));
};

type Props = {
  handleBook: Function,
};

class InterparkSearch extends Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      query: '',
      bookList: [],
      isFetching: false,
      bookSelected: false,
    };

    this.toggleModalButton = this.toggleModalButton.bind(this);
    this.toggleSearchButton = this.toggleSearchButton.bind(this);
    this.onClickBook = this.onClickBook.bind(this);
  }

  onClickBook(b) {
    const book = {
      itemId: b.itemId,
      bookTitle: b.title,
      author: b.author,
      publisher: b.publisher,
      interparkImage: b.coverLargeUrl,
      priceStandard: b.priceStandard,
      bookSelected: true,
    };
    this.props.handleBook(book);
    this.setState({ modal: false, bookSelected: true });
  }

  toggleModalButton() {
    if (this.state.bookSelected) {
      this.setState({ bookSelected: false });
      const book = {
        itemId: '',
        bookTitle: '',
        author: '',
        publisher: '',
        interparkImage: '',
        priceStandard: 0,
        bookSelected: false,
      };
      this.props.handleBook(book);
    } else {
      this.setState({ modal: !this.state.modal });
    }
  }

  toggleSearchButton(e) {
    e.preventDefault();
    this.setState({ isFetching: true }, (() =>
      search(this.state.query).then(response =>
        this.setState({
          bookList: response.item,
          isFetching: false,
        }))));
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <Button onClick={this.toggleModalButton} color="link">{this.state.bookSelected ? '취소' : '책 정보 검색'}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModalButton} size="lg">
          <ModalHeader toggle={this.toggleModalButton}>책 정보 검색</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.toggleSearchButton}>
              <InputGroup>
                <Input onChange={e => this.setState({ query: e.target.value })} /><Button type="submit">검색</Button>
              </InputGroup>
            </Form>
            {this.state.isFetching ? <span>검색 중입니다...</span> :
            <Table hover>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>저자</th>
                  <th>출판사</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bookList.map(b =>
                  <tr key={b.itemId} onClick={() => this.onClickBook(b)}>
                    <td>
                      {b.title}
                    </td>
                    <td>
                      {b.author}
                    </td>
                    <td>
                      {b.publisher}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalButton} disabled={this.state.isFetching}>취소</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InterparkSearch;
