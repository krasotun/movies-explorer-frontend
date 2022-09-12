/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import FilterActiveCheckbox from '../FilterActiveCheckbox/FilterActiveCheckbox';
import FilterInactiveCheckbox from '../FilterInactiveCheckbox/FilterInactiveCheckbox';

function FilterCheckbox({ className, toggleIsShortFilmsShown, isShortFilmsShown }) {
	return (
		<label className={className}>
			<input
				type="checkbox"
				onChange={() => {
					// setIsChecked(!isChecked);
					toggleIsShortFilmsShown();
				}}
			/>
			{isShortFilmsShown ? <FilterActiveCheckbox /> : <FilterInactiveCheckbox />}
		</label>
	);
}
export default FilterCheckbox;
