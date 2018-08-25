import React, { Component } from 'react';
import { connect } from 'react-redux';
import Requester from './Requester';
import Verifier from './Verifier';
import Create from './Create';
import {count} from "../../redux/actions/user";
import {calcPercentage} from '../../utils/math';

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Main extends Component {
  constructor(props) {
    super(props);
    const count = calcPercentage(props.user.count);
    this.state = {
      countPer: {
        rejected: count.rejected,
        verified: count.verified,
        pending: count.pending
      },
      count: props.user.count,
      isRequester: props.user.details.type === 1,
      isVerifier: props.user.details.type === 0,
      showCreateScreen: true
    }
  }
  componentDidMount(){
    this.props.dispatch(count({account: this.props.user.details.account}));
  }
  componentWillReceiveProps(nextProps){
    this.setState({count: nextProps.user.count, countPer: calcPercentage(nextProps.user.count)});
  }
  createScreen = (event) => {
    event.preventDefault();
    this.setState({showCreateScreen: !this.state.showCreateScreen})
  };
  render() {
    return (
      <div className='container'>
        <div className='row align-center'>
          <div className='col-12'>
            <h2> Documents <span className='doc-count'>{this.state.count.total}</span></h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div className='card text-white bg-success mb-3' >
              <div className='card-header'>Verified</div>
              <div className='card-body'>
                <h5 className='card-title'>
                  {this.state.count.verified}
                </h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-success' role='progressbar'
                       aria-valuemin='0' aria-valuemax='100' style={{width: this.state.countPer.verified}}>
                    {this.state.countPer.verified}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card text-white bg-danger mb-3' >
              <div className='card-header'>Rejected</div>
              <div className='card-body'>
                <h5 className='card-title'>{this.state.count.rejected}</h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger'
                       role='progressbar' aria-valuemax='100' style={{width: this.state.countPer.rejected}}>
                    {this.state.countPer.rejected}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='card text-white bg-warning mb-3' >
              <div className='card-header'>Pending</div>
              <div className='card-body'>
                <h5 className='card-title'>
                  {this.state.count.total - (this.state.count.rejected + this.state.count.verified)}
                </h5>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-warning'
                       role='progressbar' aria-valuemax='100' style={{width: this.state.countPer.pending}}>
                    {this.state.countPer.pending}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        {this.state.isRequester && (<div>
          <div className='float-right'>
            <button type="button" className="btn btn-secondary" onClick={this.createScreen}>Create</button>
          </div>
          <div className='clear'> </div>
          </div>
          )}
        {this.state.isRequester && this.state.showCreateScreen && (<Create back={this.createScreen}/>)}
        {this.state.isRequester && !this.state.showCreateScreen && (<Requester/>)}
        {this.state.isVerifier && !this.state.showCreateScreen  && (<Verifier/>)}
      </div>
    );
  }

};
