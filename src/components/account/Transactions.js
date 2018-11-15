import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/user';

@connect((store) => {
  return {
    user: store.user,
    transactions: store.transactions
  };
})

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getTransactions({account: this.props.user.details.account}));
  }

  render() {
    return (
      <div className='container'>
        <p>Transactions</p>
        <p>Transactions</p>
        <p>Transactions</p>
      </div>
    );
  }

};
