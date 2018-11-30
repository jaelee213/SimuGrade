/**
 * ************************************
 *
 * @module  GradeContainer
 * @author
 * @date
 * @description stateful component that renders GradeDisplay, GradeCreator, ModeModifier
 *
 * ************************************
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import GradeDisplay from '../components/GradeDisplay';
import GradeCreator from '../components/GradeCreator';
import ModeModifier from '../components/ModeModifier';


const mapStateToProps = (store) => ({
	mode: store.grades.mode,
	newStatus: store.grades.newStatus,
	grades: store.grades,
	gradedList: store.grades.gradedList,
	tbdList: store.grades.tbdList,
	newStatus: store.grades.newStatus,
	calculated: store.grades.calculated
});

const mapDispatchToProps = dispatch => ({
	calculate: () => {dispatch(actions.calculate())},
	remove: (id) => {dispatch(actions.deleteGrade(id))},
	addGrade: () => {dispatch(actions.addGrade())},
	setNewMode: (mode) => {dispatch(actions.setNewMode(mode))},
	setNewStatus: (status) => {dispatch(actions.setNewStatus(status))},
	setNewName: (name) => {dispatch(actions.setNewName(name))},
	setNewGrade: (grade) => {dispatch(actions.setNewGrade(grade))},
	setNewTotal: (total) => {dispatch(actions.setNewTotal(total))}
});


class GradeContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const list = [];
		this.props.gradedList.map((el, ind) => list.push(
			<div className="grades" id={'grd' + ind}>
				<label className="grdname"> {el.name} </label><span id="spaces"></span>
				<label className="grdstatus"> {el.status} </label><span id="spaces"></span>
				<label className="grdgrade"> Received: <b>{el.got}</b><span id="spaces"></span> Total: <b>{el.total}</b> </label>
				<span id="spaces"></span>
				<a className="removeButton" onClick={() => this.props.remove('grd' + ind)}>remove</a>
			</div>
		));
		this.props.tbdList.map((el, ind) => list.push(
			<div className="grades" id={'tbd' + ind}>
				<label className="tbdname"> {el.name} &nbsp; </label><span id="spaces"></span>
				<label className="tbdstatus"> {el.status} &nbsp; </label><span id="spaces"></span>
				<label className="tbdgrade"> Received: <b className="score">{el.got}</b><span id="spaces"></span>Total: <b>{el.total}</b> </label>
				<span id="spaces"></span> 
				<a className="removeButton" onClick={() => this.props.remove('tbd' + ind)}>remove</a>
			</div>
		));

		return( 
			<div className="gradeContainer">
				<h1 id="header">GRADE SIMMER</h1>
				<div className="gccontents">
					<h3 className="gclabel"> Add New Grade </h3>
					<ModeModifier mode={this.props.mode} status={this.props.newStatus} list={list} setNewMode={this.props.setNewMode}/>
					<GradeCreator 
						mode={this.props.mode}
						newStatus={this.props.newStatus}
						grades={this.props.grades}
						setNewName={this.props.setNewName} 
						setNewStatus={this.props.setNewStatus}
						setNewGrade={this.props.setNewGrade}
						setNewTotal={this.props.setNewTotal}
						addGrade={this.props.addGrade}
					/>
				</div>
				<GradeDisplay list={list}/>
				<div className="but">
					<button id="calcButton" onClick={() => this.props.calculate()}>{this.props.calculated === true ? 'Update' : "Calculate"}</button>
				</div>
			</div>
	)};
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeContainer);