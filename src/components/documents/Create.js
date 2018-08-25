import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifiers } from "../../redux/actions/documents";
import { create } from "../../redux/actions/documents";

@connect((store) => {
  return {
    verifiers: store.documents.verifiers,
    user: store.user
  };
})


export default class DocumentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      verifier: '',
      document: '',
      rate: 0,
      errors: {
        name: 'Please enter name',
        description: 'Please enter description',
        verifier: 'Please select verifier',
        document: 'Please upload document',
      }
    };
  }
  componentDidMount(){
    this.props.dispatch(verifiers({account: this.props.user.details.account}));
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if(e.target.name === 'verifier'){
      this.props.verifiers.map((verifier) => {
        if(verifier.address === e.target.value){
          this.setState({rate: verifier.price});
        }
      })
    }
  };
  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };
  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({document: buffer});
  };
  onSubmit = (event) =>{
    event.preventDefault();
    this.setState({submitted: true});
    if(this.state.name && this.state.description && this.state.verifier && this.state.document){
      const payload =  {
        name: this.state.name,
        description: this.state.description,
        verifier: this.state.verifier,
        account: this.props.user.details.account,
        document: this.state.document,
        rate: this.state.rate
      };
      this.props.dispatch(create(payload));
    }
  };
  render() {
    return (
      <div>
        <div className='form-group row padding-40'>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Name</label>
              <div className='col-8'>
                <input className='form-control' name='name' type='text' onChange={this.onChange} defaultValue={this.state.name}/>
                {this.state.submitted && !this.state.name && (<p className='error-msg'>{this.state.errors.name}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Description</label>
              <div className='col-8'>
                <input className='form-control' name='description' type='text' onChange={this.onChange} defaultValue={this.state.description}/>
                {this.state.submitted && !this.state.description && (<p className='error-msg'>{this.state.errors.description}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Verifier</label>
              <div className='col-8'>
                <select name='verifier' className='custom-select' onChange={this.onChange} defaultValue={this.state.type}>
                  <option selected disabled hidden>Choose here</option>
                  {this.props.verifiers.map((type, index) => (<option value={type.address} key={index}>{type.name}</option>))}
                </select>
                {this.state.submitted && !this.state.verifier && (<p className='error-msg'>{this.state.errors.verifier}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Document</label>
              <div className='col-8'>
                <input className='form-control-file' name='document' type='file' onChange={this.captureFile}/>
                {this.state.submitted && !this.state.document && (<p className='error-msg'>{this.state.errors.document}</p>)}
              </div>
            </div>
          </div>
          <div className='col-6 padding-top-15'>
            <div className='row'>
              <label htmlFor='select' className='col-4 col-form-label'>Rate <span className='unit'>(wei)</span></label>
              <div className='col-8'>
                <input className='form-control' name='rate' type='number' readOnly={true} value={this.state.rate}/>
              </div>
            </div>
          </div>
        </div>
        <div className='float-right'>
          <button type="button" className="btn btn-success margin-right-12" onClick={this.onSubmit}>Submit</button>
          <button type="button" className="btn btn-info" onClick={this.props.back}>Back</button>
        </div>
        <div className='clear'> </div>
      </div>
    );
  }

};
