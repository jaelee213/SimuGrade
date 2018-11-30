/**
 * ************************************
 *
 * @module  ModeModifier
 * @author
 * @date
 * @description presentational component that renders a single div containing options
 *
 * ************************************
 */

import React from 'react';

const ModeModifier = (props) => {

	if (props.list.length === 0) {
		return(
			<div className="modeModifier">
				<div className="selectinline">
					<h3 className="selectlabel">Grading Type: &nbsp;</h3>
					<div className="custom-select">
						<select onChange={(event) => props.setNewMode(event.target.value)}>
							<option value="points"> Points </option>
							<option value="percentages"> Percentages</option>
						</select>
					</div>
				</div>
			</div>
		)
	} else {
		return(
		<div className="modeModifier">
			<h1 className="selectlabel"> Current Mode: {props.mode} </h1>
		</div>
	)}
}

export default ModeModifier;