import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

function Sign({
	title, children, buttonText, questionTitle, bottomLink, bottomLinkText,
}) {
	return (
		<section className="sign">
			<form className="form sign-form">
				<div>
					<Logo />
					<h2 className="sign-form__title">{title}</h2>
					{children}
				</div>
				<div>
					<Button
						label={buttonText}
						type="sign-form-submit"
					/>
					<div className="sign-form__link-block">
						<p className="sign__question">{questionTitle}</p>
						<Link to={bottomLink} className="sign__link">{bottomLinkText}</Link>
					</div>
				</div>
			</form>
		</section>
	);
}

export default Sign;
