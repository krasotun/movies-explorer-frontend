import React from 'react';

function Button({
	type, label, onClick, formSubmitButton,
}) {
	return (
		<button type={formSubmitButton ? 'submit' : 'button'} className={`button button_type_${type}`} onClick={onClick}>
			{label}
		</button>
	);
}

export default Button;
