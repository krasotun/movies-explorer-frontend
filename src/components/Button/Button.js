import React from 'react';

function Button({
	type, label, onClick, formSubmitButton, buttonDisabled,
}) {
	console.log(buttonDisabled);
	return (
		<button disabled={buttonDisabled} type={formSubmitButton ? 'submit' : 'button'} className={`button button_type_${type}`} onClick={onClick}>
			{label}
		</button>
	);
}

export default Button;
