import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CurrentUserContext } from '../../contexts/CurrenUserContext';
import Sign from '../Sign/Sign';

function Profile({ isInfoTipShown, onEditUserInfo, formErrorMessage }) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [isButtonDisable, setisButtonDisable] = React.useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			name: currentUser.name,
			email: currentUser.email,
		},
	});

	function handleNameChange(event) {
		setName(event.target.value);
	}
	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handleEditUserInfo() {
		onEditUserInfo(name, email);
	}
	React.useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

	React.useEffect(() => {
		if (name === currentUser.name && email === currentUser.email) {
			setisButtonDisable(true);
		} else if (isValid) {
			setisButtonDisable(false);
		} else if (!isValid) {
			setisButtonDisable(true);
		}
	}, [name, email, currentUser.name, currentUser.email, isValid]);
	return (
		<section className="profile">
			<Sign
				title={`Привет, ${currentUser.name}`}
				buttonText="Редактировать"
				questionTitle="Ещё не зарегистрированы?"
				bottomLink="/"
				bottomLinkText="Выйти из аккаунта"
				formType="profile"
				buttonDisabled={isButtonDisable}
				onSubmit={handleSubmit(handleEditUserInfo)}
				isInfoTipShown={isInfoTipShown}
				formErrorMessage={formErrorMessage}
			>
				<div className="profile-form__inputs-block">
					<div className="profile-form__input">
						<span className="profile-form__label">
							E-mail
						</span>
						<ErrorMessage
							errors={errors}
							name="email"
							render={({ message }) => <p className="profile-form__error-text">{message}</p>}
						/>
						<input
							{...register('email', {
								required: 'Обязательное поле',
								pattern: {
									value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
									message: 'Не является e-mail',
								},
								onChange: (e) => handleEmailChange(e),
							})}
							className="form__item profile-form__item"
							type="text"
							name="email"
							value={email || ''}
						/>
					</div>
					<div className="profile-form__input">
						<span className="profile-form__label">
							Имя
						</span>
						<ErrorMessage
							errors={errors}
							name="name"
							render={({ message }) => <p className="profile-form__error-text">{message}</p>}
						/>
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
							className="form__item profile-form__item"
							type="text"
							name="name"
							value={name || ''}
						/>
					</div>
				</div>
			</Sign>
		</section>
	);
}
export default Profile;
