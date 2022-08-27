import React from 'react';

function Button({ place, color, text }) {
	return (
		<button type="button" className={`button button__${place} button_${color}`}>
			{text}
		</button>
	);
}

export default Button;
