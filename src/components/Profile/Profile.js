import React from 'react';
import Sign from '../Sign/Sign';

function Profile() {
	return (
		<section className="profile">
			<Sign
				title="Привет, Марат!"
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
							value="marat@marat.ru"
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
							value="Марат"
						/>
					</div>
				</div>
			</Sign>
		</section>
	);
}
export default Profile;
