import React from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Table } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { FaUser, FaCalendarO } from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import _ from 'lodash';
import { Actions } from './reducer';
import { makeSelectInterestList } from './selector';

type Props = {
  interest: Object,
}
class InterestPage extends React.Component <Props> {
  constructor(props) {
    super(props);
    this.state = {
      contentType: 'sales',
    };
  }
  render() {
    const interest = this.props.interest ? this.props.interest.toJS() : {};
    console.log(interest);
    return(
      <div>
        <br />
        <h1>관심 목록</h1>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  interest: makeSelectInterestList(),
});

export default connect(mapStateToProps)(InterestPage);
