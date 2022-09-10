import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Sign from '../Sign/Sign';

function Login({ isInfoTipShown, onLogin, formErrorMessage }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isButtonDisable, setisButtonDisable] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange' });
	React.useEffect(() => {
		if (!isValid) {
			setisButtonDisable(true);
		} else setisButtonDisable(false);
	}, [isValid]);
	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}
	function handleLogin() {
		onLogin(email, password);
	}

	return (
		<section className="sign">
			<Sign
				title="Рады видеть!"
				buttonText="Войти"
				questionTitle="Ещё не зарегистрированы?"
				bottomLink="/signup"
				bottomLinkText="Регистрация"
				formType="sign"
				onSubmit={handleSubmit(handleLogin)}
				isInfoTipShown={isInfoTipShown}
				buttonDisabled={isButtonDisable}
				formErrorMessage={formErrorMessage}
			>
				<label className="sign-form__label" htmlFor="email">
					E-mail
					<input
						{...register('email', {
							required: 'Обязательное поле',
							pattern: {
								value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
								message: 'Не является e-mail',
							},
							onChange: (e) => handleEmailChange(e),
						})}
						className={errors?.email
							? 'form__item sign-form__item sign-form__item_error'
							: 'form__item sign-form__item'}
						type="text"
						name="email"
						value={email || ''}
					/>
				</label>
				<span className="sign-form__error">
					<ErrorMessage
						errors={errors}
						name="email"
						render={({ message }) => <p className="sign-form__error-text">{message}</p>}
					/>
				</span>
				<label className="sign-form__label" htmlFor="password">
					Пароль
					<input
						{...register('password', {
							required: 'Обязательное поле',
							onChange: (e) => handlePasswordChange(e),
						})}
						className={errors?.password
							? 'form__item sign-form__item sign-form__item_error'
							: 'form__item sign-form__item'}
						type="password"
						name="password"
						value={password || ''}
					/>
				</label>
				<span className="sign-form__error">
					<ErrorMessage
						errors={errors}
						name="password"
						render={({ message }) => <p className="sign-form__error-text">{message}</p>}
					/>
				</span>
			</Sign>
		</section>
	);
}

export default Login;
