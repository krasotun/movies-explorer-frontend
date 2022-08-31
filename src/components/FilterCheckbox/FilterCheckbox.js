/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import FilterActiveCheckbox from '../FilterActiveCheckbox/FilterActiveCheckbox';
import FilterInactiveCheckbox from '../FilterInactiveCheckbox/FilterInactiveCheckbox';

function FilterCheckbox({ className }) {
	const [isChecked, setIsChecked] = useState(false);
	return (
		<label className={className}>
			<input
				type="checkbox"
				onChange={() => {
					setIsChecked(!isChecked);
				}}
			/>
			{isChecked ? <FilterActiveCheckbox /> : <FilterInactiveCheckbox />}
		</label>
	);
}
export default FilterCheckbox;
