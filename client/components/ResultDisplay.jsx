/**
 * ************************************
 *
 * @module  ResultDisplay
 * @author
 * @date
 * @description presentation component that renders results
 *
 * ************************************
 */

import React from 'react';
import Slider from 'rc-slider'; 
import ToolTip from 'rc-tooltip';
import '!style-loader!css-loader!rc-slider/assets/index.css';

const Handle = Slider.Handle;
let sliderArray = [];
let index = 0;
let value = 0;

const ResultDisplay = (props) => {
		
	sliderArray = new Array(props.tbdList.length).fill(0);

	const handle = (p) => {
		const { value, dragging, index, tabIndex, ...restProps } = p;
		sliderArray[tabIndex] = value;

		return (
			<ToolTip
				prefixCls="rc-slider-tooltip"
				overlay={value}
				visible={dragging}
				placement="top"
				key={index}
			>
				<Handle value={value} index={tabIndex} {...restProps}/>
			</ToolTip>
		);
	};


	const handleChange = () => {
	  props.setNewSimTotal(sliderArray);
	}

	const sliders = [];

	if (props.mode === 'points') {
		let index = 0;
		props.tbdList.map(el => {
			return(sliders.push(
				<div>
					<div className="sliderbox">
						<h3 className="selectinline">{el.name} : {props.sliderArray[index] || 0} {props.mode === 'points' ? ' points' : ' %'} out of {el.total}</h3>
						<Slider tabIndex={index++} defaultValue={0} min={0} max={props.mode === 'points' ? el.total : 100} handle={handle} onAfterChange={handleChange}/>
					</div>
				</div>
			))
		});
		return(
			<div id="resultDisplay">
				<div className="ua">
					<h3 className="gclabel">Upcoming Assignments</h3>
				</div>
				{sliders}
			</div>
		);
	}
}

export default ResultDisplay;