/**
 * ************************************
 *
 * @module  gradesReducer
 * @author
 * @date
 * @description reducer for grades data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
	mode: 'points',
	gradedList: [],
	tbdList: [],
	sliderArray: [],
	calculated: false,

	newGrade: 0,
	newTotal: 0,
	newStatus: 'graded',
	newName: '',

	// current grade earned so far
	gradeAON: 0,
	// total grade so far 
	totalAON: 0,
	// the current grade produced
	currentGrade: 0,
	// grade that changes based on sliders
	simulatedGrade: 0,

	// sliders total value
	sliderTotal: 0,

	// total possible including tbd
	totalPossible: 0
}

const gradesReducer = (state=initialState, action) => {
	let gradedList = state.gradedList;
	let tbdList = state.tbdList;
	let gradeAON = state.gradeAON;
	let totalAON = state.totalAON;
	let totalPossible = state.totalPossible;

	switch(action.type) {

		/************************* ADD GRADE ************************** */
		case types.ADD_GRADE:
			const grade = {
				status: state.newStatus,
				name: state.newName,
				got: state.newGrade * 1,
				total: state.newTotal * 1
			};
			
			if (state.mode === 'points') {
				
				if (grade.status === 'graded') {
					gradedList = state.gradedList.slice();
					gradedList.push(grade);
					gradeAON = state.gradeAON + grade.got;
					totalAON = state.totalAON + grade.total;
					totalPossible = state.totalPossible + grade.total;
				}
				
				if (grade.status === 'tbd') {
					tbdList = state.tbdList.slice();
					tbdList.push(grade);
					totalPossible = state.totalPossible + grade.total;
				}
			} else if (state.mode === 'percentages') {

				if (grade.status === 'graded') {
					gradedList = state.gradedList.slice();
					gradedList.push(grade);
					gradeAON = state.gradeAON + ((grade.got * grade.total)/100).toFixed(4);
					totalAON = state.totalAON + grade.total;
					totalPossible = state.totalPossible + grade.total;
				}
				
				if (grade.status === 'tbd') {
					tbdList = state.tbdList.slice();
					tbdList.push(grade);
					totalPossible = state.totalPossible + grade.total;
				}
			}

			// return updated state
			return Object.assign({}, state, {
				gradedList: gradedList,
				tbdList: tbdList,
				gradeAON: gradeAON,
				totalAON: totalAON,
				totalPossible: totalPossible,
				newStatus: 'graded',
				newTotal: 0,
				newGrade: 0,
				newName: ''
			});
				
		/************************* DELETE_GRADE ************************** */
		case types.DELETE_GRADE: 
			const index = action.payload.substring(3) * 1;
			let removedGrade;

			if (state.mode === 'points') {

				// we assume the id is a string
				if (action.payload.includes('grd')) {
					gradedList = state.gradedList.slice();
					removedGrade = gradedList.splice(index, 1);
					gradeAON = state.gradeAON - removedGrade.got;
					totalAON = state.totalAON - removedGrade.total;
					totalPossible = state.totalPossible - removedGrade.total;
				}
				
				if (action.payload.includes('tbd')) {
					tbdList = state.tbdList.slice();
					removedGrade = tbdList.splice(index, 1);
					totalPossible = state.totalPossible - removedGrade.total;
				}
			} 

			if (state.mode === 'percentages') {

				if (action.payload.includes('grd')) {
					gradedList = state.gradedList.slice();
					removedGrade = gradedList.splice(index, 1);
					gradeAON = state.gradeAON - ((removedGrade.got * removedGrade.total)/100).toFixed(4);
					totalAON = state.totalAON - removedGrade.total;
					totalPossible = state.totalPossible - removedGrade.total;
				}
				
				if (action.payload.includes('tbd')) {
					tbdList = state.tbdList.slice();
					removedGrade = tbdList.splice(index, 1);
					totalPossible = state.totalPossible - removedGrade.total;
				}
			}
			return Object.assign({}, state, {
				gradedList: gradedList,
				tbdList: tbdList,
				gradeAON: gradeAON,
				totalAON: totalAON,
				totalPossible: state.totalPossible - removedGrade.total
			});
				
		/************************* SET_NEW_MODE ************************** */
		case types.SET_NEW_MODE:
			return Object.assign({}, state, {
				mode: action.payload
			});

		/*************************** SET_NEW_GRADE ************************ */
		case types.SET_NEW_GRADE: 

			return Object.assign({}, state, {
				newGrade: action.payload
			});

		/************************* SET_NEW_TOTAL ************************** */
		case types.SET_NEW_TOTAL: 
			return Object.assign({}, state, {
				newTotal: action.payload
			});

		/************************* SET_NEW_STATUS ************************** */
		case types.SET_NEW_STATUS: 
			return Object.assign({}, state, {
				newStatus: action.payload
			});

		/************************* SET_NEW_NAME ************************** */
		case types.SET_NEW_NAME: 
			return Object.assign({}, state, {
				newName: action.payload
			});

		/************************* SET_NEW_SIMULATED_GRADE ************************** */
		case types.SET_NEW_SIMULATED_GRADE: 
			let sliderTotal;
			let simulatedGrade;
			let simGradeArr = action.payload;

			let simTotalArr = state.tbdList;

			if (state.mode === 'points') {
				sliderTotal = simGradeArr.reduce((acc, cur) => acc + cur);
				simulatedGrade = ((state.gradeAON + sliderTotal) / state.totalPossible);
			} 

			if (state.mode === 'percentages') {
				simGradeArr = simGradeArr.map((el, ind) => ((el * simTotalArr[ind])/100).toFixed(4));
				sliderTotal = simGradeArr.reduce((acc, cur) => acc + cur);
				simulatedGrade = ((state.gradeAON + sliderTotal) / state.totalPossible);
			}
			
			return Object.assign({}, state, {
				sliderArray: action.payload,
				sliderTotal: sliderTotal,
				simulatedGrade: simulatedGrade.toFixed(4) * 100
			});

		/************************** CALCULATE ************************* */
		case types.CALCULATE:
			let currentGrade = state.currentGrade;
			simulatedGrade = state.simulatedGrade;
			let calculated;

			if (state.gradedList.length !== 0 || state.tbdList.length !== 0) {
				if (state.mode === 'points') {
					currentGrade = (state.gradeAON / state.totalAON).toFixed(4) * 100;					
					simulatedGrade = (state.gradeAON / state.totalPossible).toFixed(4) * 100;
					calculated = true;
				}

				if (state.mode === 'percentages') {
					currentGrade = (state.gradeAON / state.totalAON).toFixed(4);
					simulatedGrade = (state.gradeAON / state.totalPossible).toFixed(4);
					calculated = true;
				}
			} else {
				calculated = false;
			}

			return Object.assign({}, state, {
				calculated: calculated,
				currentGrade: currentGrade,
				simulatedGrade: simulatedGrade
			});

		default:
		  return state;
	}
};

 export default gradesReducer;