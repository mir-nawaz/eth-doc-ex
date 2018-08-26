import React, { Component } from 'react';

export default class About extends Component {

	render() {
	  return (
	    <div className='container'>
				<h1> About </h1>
				<hr/>
				<br/>
        <p>The basic idea of this application is to automate the process of document verification from different entities.</p>
        <p>A requester upload a document to blockchain for a verifier.</p>
				<p>Requester pay the price for document verification in ether.</p>
        <p>The verifier verifies or rejects the document.</p>
				<p>Once a verifier verifies the document, he gets ethers in reward.</p>
	    </div>
	  );
	}

};
