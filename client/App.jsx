/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import Wrapper from './containers/MainContainer';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id="maincontainer">
				<Wrapper/>
			</div>
		)
	}
};

export default App;