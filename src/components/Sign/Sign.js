import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

function Sign({
	title, children, buttonText, questionTitle, bottomLink, bottomLinkText, formType,
}) {
	return (
		<form className={`form ${formType}-form`}>
			<div className={`${formType}-form__container`}>
				{(formType === 'sign') && <Logo />}
				<h2 className={`${formType}-form__title`}>{title}</h2>
				{children}
			</div>
			<div className={`${formType}-form__container_bottom`}>
				<Button
					label={buttonText}
					type={`${formType}-form-submit`}
				/>
				{formType === 'sign'
					&& (
						<div className="sign-form__link-block">
							<p className="sign__question">{questionTitle}</p>
							<Link to={bottomLink} className="sign__link">{bottomLinkText}</Link>
						</div>
					)}

				{formType === 'profile'
					&& (
						<Link to={bottomLink} className="profile__link">{bottomLinkText}</Link>
					)}
			</div>
		</form>
	);
}

export default Sign;
