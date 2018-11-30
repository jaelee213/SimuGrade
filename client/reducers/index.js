/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';
import gradesReducer from './gradesReducer';

// combine all the reducers and make it available through store.grades
const reducers = combineReducers({
  grades: gradesReducer
});

export default reducers;