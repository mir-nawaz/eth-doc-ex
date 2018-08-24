import React, { Component } from 'react';
import homeImg from '../../assets/images/eth.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
          <div className='align-center'>
            <img src={homeImg}/>
              <h3> Ethereum Document Exchange </h3>
          </div>
        );
    }
}

