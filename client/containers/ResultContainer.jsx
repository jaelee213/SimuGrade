/**
 * ************************************
 *
 * @module  ResultContainer
 * @author
 * @date
 * @description stateful component that renders ResultDisplay
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ResultDisplay from '../components/ResultDisplay';

const mapStateToProps = (store) => ({
	currentGrade: store.grades.currentGrade,
	simulatedGrade: store.grades.simulatedGrade,
	calculated: store.grades.calculated,
	tbdList: store.grades.tbdList,
	mode: store.grades.mode,
	sliderArray: store.grades.sliderArray
});

const mapDispatchToProps = dispatch => ({
	setNewSimTotal: (total) => {dispatch(actions.setNewSimTotal(total))},
});

class ResultContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		if (this.props.calculated) {
			return(
				<div className="result">
					<div className="calc">
						<div className="currentGrade">
							<h2 className="selectinline"> Current Grade: {this.props.currentGrade || 0} % </h2>
						</div>
						<ResultDisplay 
							sliderArray={this.props.sliderArray}
							mode={this.props.mode} 
							tbdList={this.props.tbdList} 
							setNewSimTotal={this.props.setNewSimTotal}/>
						<div className="possibleGrade">
							<h2 className="selectinline"> Possible Final Grade: {this.props.simulatedGrade || 0} % </h2>
						</div>
					</div>
				</div>
			);
		} else {
			return(
				<div className="result">
					<div className="precalc">
						<div className='nothing'>
							<h1 id="emptyheader"> There is currently nothing to display. </h1>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);