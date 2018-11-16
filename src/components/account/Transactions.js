import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../redux/actions/user';

@connect((store) => {
  return {
    user: store.user,
    transactions: store.user.transactions
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
        <div className="row">
          <div className="col-3">Number</div>
          <div className="col-3">Transaction Hash</div>
          <div className="col-3">Gas Used</div>
          <div className="col-3">Gas Limit</div>
        </div>
        {this.props.transactions.map((transaction, index)=>{
          return (<div className="row" key={index}>
            <div className="col-3 break-word">{transaction.number}</div>
            <div className="col-3 break-word">{transaction.hash}</div>
            <div className="col-3 break-word">{transaction.gasUsed}</div>
            <div className="col-3 break-word">{transaction.gasLimit}</div>
          </div>);
        })}
        {!this.props.transactions.length && (<div className="row">
          <div className="col-12">No Transactions ...</div>
        </div>)}
      </div>
    );
  }

};
