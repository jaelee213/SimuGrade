/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders ResultContainer and GradeContainer
 *
 * ************************************
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultContainer from './ResultContainer';
import GradeContainer from './GradeContainer';

const mapStateToProps = (store) => ({	
});

const mapDispatchToProps = dispatch => ({
});

class MainContainer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="container">
				<ResultContainer/>
				<GradeContainer/>
			</div>
		);
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);