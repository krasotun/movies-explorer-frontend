import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrenUserContext';

import Sign from '../Sign/Sign';

function Profile() {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');

	function handleNameChange(event) {
		setName(event.target.value);
	}
	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	React.useEffect(() => {
		setName(currentUser.name);
		setEmail(currentUser.email);
	}, [currentUser]);

	return (
		<section className="profile">
			<Sign
				title={`Привет, ${currentUser.name}`}
				buttonText="Редактировать"
				questionTitle="Ещё не зарегистрированы?"
				bottomLink="/"
				bottomLinkText="Выйти из аккаунта"
				formType="profile"
			>
				<div className="profile-form__inputs-block">
					<div className="profile-form__input">
						<span className="profile-form__label profile-form__label_email">
							E-mail
						</span>
						<input
							required
							className="form__item profile-form__item"
							id="email"
							type="email"
							name="email"
							placeholder="E-mail"
							value={email || ''}
							onChange={handleEmailChange}
						/>
					</div>
					<div className="profile-form__input">
						<span className="profile-form__label profile-form__label_name">
							Имя
						</span>
						<input
							required
							className="form__item profile-form__item"
							id="name"
							type="name"
							name="name"
							placeholder="Марат"
							value={name || ''}
							onChange={handleNameChange}
						/>
					</div>
				</div>
			</Sign>
		</section>
	);
}
export default Profile;
