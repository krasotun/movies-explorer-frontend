import React from 'react';

function Button({ type, label }) {
	return (
		<button type="button" className={`button button_type_${type}`}>
			{label}
		</button>
	);
}

export default Button;
