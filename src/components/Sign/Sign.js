import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

function Sign({
	title, children, buttonText, questionTitle, bottomLink, bottomLinkText, formType,
}) {
	// eslint-disable-next-line consistent-return
	const bottomBlockMarkup = () => {
		if (formType === 'sign') {
			return (
				<div className="sign-form__link-block">
					<p className="sign__question">{questionTitle}</p>
					<Link to={bottomLink} className="sign__link">{bottomLinkText}</Link>
				</div>
			);
			// eslint-disable-next-line no-else-return
		} else if (formType === 'profile') {
			return (
				<Link to={bottomLink} className="profile__link">{bottomLinkText}</Link>
			);
		}
	};

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
				{bottomBlockMarkup()}
			</div>
		</form>
	);
}

export default Sign;
