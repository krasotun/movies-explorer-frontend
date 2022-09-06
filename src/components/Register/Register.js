import React from 'react';
import Sign from '../Sign/Sign';

function Register({ onRegistration, isInfoTipShown }) {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	function handleNameChange(event) {
		setName(event.target.value);
	}
	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}
	function handleRegistration(event) {
		event.preventDefault();
		onRegistration(name, email, password);
	}

	return (
		<section className="sign">
			<Sign
				title="Добро пожаловать!"
				buttonText="Зарегистрироваться"
				questionTitle="Уже зарегистрированы?"
				bottomLink="/signin"
				bottomLinkText="Войти"
				formType="sign"
				// eslint-disable-next-line react/jsx-no-bind
				onSubmit={handleRegistration}
				isInfoTipShown={isInfoTipShown}
			>
				<label className="sign-form__label" htmlFor="name">
					Имя
					<input
						className="form__item sign-form__item"
						type="text"
						name="name"
						placeholder="Марат"
						value={name || ''}
						onChange={handleNameChange}
					/>
				</label>
				<span className="sign-form__error"><p className="sign-form__error-text sign-form__error-text_hidden ">Что то пошло не так...</p></span>
				<label className="sign-form__label" htmlFor="email">
					E-mail
					<input
						className="form__item sign-form__item"
						type="text"
						name="email"
						placeholder="E-mail"
						value={email || ''}
						onChange={handleEmailChange}
					/>
				</label>
				<span className="sign-form__error"><p className="sign-form__error-text sign-form__error-text_hidden ">Что то пошло не так...</p></span>
				<label className="sign-form__label" htmlFor="password">
					Пароль
					<input
						className="form__item sign-form__item"
						type="password"
						name="password"
						placeholder="******"
						value={password || ''}
						onChange={handlePasswordChange}
					/>
				</label>
				<span className="sign-form__error"><p className="sign-form__error-text ">Что то пошло не так...</p></span>
			</Sign>
		</section>
	);
}

export default Register;
