/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes'


export const ADD_GRADE = "ADD_GRADE";
export const DELETE_GRADE = "DELETE_GRADE";
export const SET_NEW_GRADE = "SET_NEW_GRADE";
export const SET_NEW_TOTAL = "SET_NEW_TOTAL";
export const CALCULATE = "CALCULATE";

// gradeObj = { status: , name: , got: , total: }
export const addGrade = () => ({
  type: types.ADD_GRADE
});

export const setNewMode = (mode) => ({
	type: types.SET_NEW_MODE,
	payload: mode
});

export const setNewStatus = (status) => ({
	type: types.SET_NEW_STATUS,
	payload: status
});

export const setNewName = (name) => ({
	type: types.SET_NEW_NAME,
	payload: name
});

// delete grade based on the id
export const deleteGrade = (id) => ({
	type: types.DELETE_GRADE,
	payload: id
});

export const setNewGrade = (grade) => ({
  type: types.SET_NEW_GRADE,
  payload: grade
});

export const setNewTotal = (total) => ({
  type: types.SET_NEW_TOTAL,
  payload: total
});

export const setNewSimTotal = (array) => ({
	type: types.SET_NEW_SIMULATED_GRADE,
	payload: array
});

export const calculate = () => ({
	type: types.CALCULATE
});


// export const updateSliderArray = (array) => ({
// 	type: types.UPDATE_SLIDER_ARRAY,
// 	payload: array
// })