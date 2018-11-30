/**
 * ************************************
 *
 * @module  GradeCreator
 * @author
 * @date
 * @description presentation component that takes user input for new grade creation
 *
 * ************************************
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GradeCreator extends Component {

	render() {
			return (
				<div className="gradeCreator">		
					<div className="selectinline">
						<h3 className="selectlabel"><span id="asspace"></span> Assignment: &nbsp;</h3>
						<input id="name" type="text" value={this.props.grades.newName} onChange={(event) =>  this.props.setNewName(event.target.value)}/>
					</div>
					<div className="selectinline">
						<h3 className="selectlabel"><span id='statusspace'></span>Status: &nbsp;</h3>
						<div className="custom-select">
							<select value={this.props.newStatus} onChange={(event) => this.props.setNewStatus(event.target.value)}>
								<option value="graded"> Graded </option>
								<option value="tbd"> TBD</option>
							</select>
						</div>
					</div>
					<div className="received">
						<div className="selectinline">
							<h3 className="selectlabel"><span id="rspace"></span>Received: <span id="pspace"></span></h3>
							<input 
								id="received" 
								type="text" 
								onChange={this.props.newStatus === 'tbd' ? '' : (event) => this.props.setNewGrade(event.target.value)}
								value={this.props.newStatus === 'tbd' ? 0 : this.props.grades.newGrade} 
							/>
							<h3 className='selectlabel'>{this.props.mode === 'points' ? 'points' : '%'}</h3>
						</div>
					</div>
					<div className="outof">
						<div className="selectinline">
							<h3 className="selectlabel"><span id="tspace"></span>{this.props.mode === 'points' ? 'Out of Total:' : '% Of Total %:'}<span id="pspace"></span></h3>
							<input id="outof" type="text" value={this.props.grades.newTotal} onChange={(event) => this.props.setNewTotal(event.target.value)}/>
							<h3 className='selectlabel'>{this.props.mode === 'points' ? 'points' : '%'}</h3>	
						</div>
					</div>
					<div className="but">
						<button id="add" onClick={this.props.addGrade}> Add </button>
					</div>
				</div>
			);
	}
}

export default GradeCreator;