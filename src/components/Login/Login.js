import React from 'react';
import Sign from '../Sign/Sign';

function Login() {
	return (
		<Sign
			title="Рады видеть!"
			buttonText="Войти"
			questionTitle="Ещё не зарегистрированы?"
			bottomLink="/signup"
			bottomLinkText="Регистрация"
		>
			<label className="sign-form__label" htmlFor="email">
				E-mail
				<input
					required
					className="form__item sign-form__item"
					id="email"
					type="email"
					name="email"
					placeholder="E-mail"
					value=""
				/>
			</label>
			<span className="sign-form__error"><p className="sign-form__error-text sign-form__error-text_hidden ">Что то пошло не так...</p></span>
			<label className="sign-form__label" htmlFor="password">
				Пароль
				<input
					required
					className="form__item sign-form__item"
					id="password"
					type="password"
					name="password"
					placeholder="******"
					value=""
				/>
			</label>
			<span className="sign-form__error"><p className="sign-form__error-text ">Что то пошло не так...</p></span>
		</Sign>

	);
}

export default Login;
