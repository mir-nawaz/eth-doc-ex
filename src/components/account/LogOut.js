import React, { Component } from 'react';
import  {Redirect} from 'react-router-dom';
import menu from '../../constants/menu';
import { connect } from 'react-redux';
import {logOut} from '../../redux/actions/user';
import Loader from '../common/Loader';

@connect((store) => {
  return {
    user: store.user.details
  };
})

export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      home: menu.home.url
    }
  }

  logOut = () =>{
    this.props.dispatch(logOut());
    if(!this.props.user.loading){
      this.setState({redirect: true});
    }
  };

  render() {
    if(this.state.redirect){
      return (<Redirect to={this.state.home}/>)
    }
    if(this.props.user.loading)
      return (<Loader/>);
    return (
      <div className='container'>
        <p>LogOut</p>
        <p>LogOut</p>
        <p>LogOut</p>
        <button onClick={this.logOut}>LogOut</button>
      </div>
    );
  }

};
