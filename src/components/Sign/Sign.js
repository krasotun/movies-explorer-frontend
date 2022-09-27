import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import InfoTip from '../InfoTip/InfoTip';

function Sign({
	title, children, buttonText, questionTitle, bottomLink,
	bottomLinkText, formType, onSubmit, isInfoTipShown, buttonDisabled, formErrorMessage, signOut,
}) {
	return (
		<form className={`form ${formType}-form`} onSubmit={onSubmit}>
			<div className={`${formType}-form__container`}>
				<div className={`form ${formType}-form__title-container`}>
					{(formType === 'sign') && <Logo />}
					<h2 className={`${formType}-form__title`}>{title}</h2>
				</div>
				{children}
			</div>
			<div className={`${formType}-form__container_bottom`}>
				<InfoTip
					isInfoTipShown={isInfoTipShown}
					messageText={formErrorMessage}
				/>
				<Button
					buttonDisabled={buttonDisabled}
					formSubmitButton
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
						<Link onClick={signOut} to={bottomLink} className="profile__link">{bottomLinkText}</Link>
					)}
			</div>
		</form>
	);
}

export default Sign;
