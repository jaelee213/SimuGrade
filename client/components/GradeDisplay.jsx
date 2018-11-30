/**
 * ************************************
 *
 * @module  GradeDisplay
 * @author
 * @date
 * @description presentation component that renders grades
 *
 * ************************************
 */

import React from 'react';

const GradeDisplay = (props) => (
	<div className="gradeDisplay">
		<h3 className="gclabel"><b>Grade List</b></h3>
		{props.list}
	</div>
);

export default GradeDisplay;