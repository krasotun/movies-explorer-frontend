import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Sign from '../Sign/Sign';

function Register({ isInfoTipShown, onRegistration }) {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isButtonDisable, setisButtonDisable] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitSuccessful },
		reset,
	} = useForm({ mode: 'onChange' });

	React.useEffect(() => {
		if (!isValid) {
			setisButtonDisable(true);
		} else setisButtonDisable(false);
	}, [isValid]);

	React.useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	function handleNameChange(event) {
		setName(event.target.value);
	}
	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	const handleRegistration = (event) => {
		onRegistration(name, email, password);
		console.log('Нажали', event);
		reset();
	};

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
				onSubmit={handleSubmit(handleRegistration)}
				isInfoTipShown={isInfoTipShown}
				buttonDisabled={isButtonDisable}
			>
				<label className="sign-form__label" htmlFor="name">
					Имя
					<input
						{...register('name', {
							required: 'Обязательное поле',
							pattern: {
								// value: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
								value: /[A-Za-zа-яА-ЯёЁ -]{1}/,
								message: 'Не является именем',
							},
							onChange: (e) => handleNameChange(e),
						})}
						className={errors?.name
							? 'form__item sign-form__item sign-form__item_error'
							: 'form__item sign-form__item'}
						type="text"
						name="name"
						value={name || ''}
					/>
				</label>
				<span className="sign-form__error">
					<ErrorMessage
						errors={errors}
						name="name"
						render={({ message }) => <p className="sign-form__error-text">{message}</p>}
					/>
				</span>
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
					<p className={errors?.email
						? 'sign-form__error-text'
						: 'sign-form__error-text sign-form__error-text_hidden'}
					>
						{email.message}
					</p>
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
					<p className={errors?.name
						? 'sign-form__error-text'
						: 'sign-form__error-text sign-form__error-text_hidden'}
					>
						{name.message}
					</p>
				</span>
			</Sign>
		</section>
	);
}

export default Register;
