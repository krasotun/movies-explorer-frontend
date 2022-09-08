import React from 'react';

function Button({ type, label, onClick }) {
	return (
		<button type="button" className={`button button_type_${type}`} onClick={onClick}>
			{label}
		</button>
	);
}

export default Button;
