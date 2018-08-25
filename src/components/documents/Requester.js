import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Requester extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className='row align-center'>
          <div className='col-12'>
            <h2> Requester Documents </h2>
          </div>
        </div>
      </div>
    );
  }

};
