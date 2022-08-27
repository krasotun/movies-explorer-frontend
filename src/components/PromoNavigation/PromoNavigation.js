import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';

function PromoNavigation() {
	return (
		<nav className="navigation navigation_place_promo">
			<ul className="navigation__list">
				<NavLink className="navigation__item" to="/signup" aria-label="Перейти на страницу регистрации">
					<li>
						Регистрация
					</li>
				</NavLink>
				<NavLink className="navigation__item" to="/signin" aria-label="Перейти на страницу авторизации">
					<li>
						<Button
							place="navigation"
							color="green"
							text="Войти"
						/>
					</li>
				</NavLink>
			</ul>
		</nav>
	);
}

export default PromoNavigation;
