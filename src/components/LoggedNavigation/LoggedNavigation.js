import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountIcon from '../AccountIcon/AccountIcon';

function LoggedNavigation() {
	return (
		<nav className="navigation">
			<ul className="navigation__list navigation__list_logged">
				<NavLink className="navigation__item navigation__item_logged" to="/movies" aria-label="Перейти на страницу с фильмами">
					<li>
						Фильмы
					</li>
				</NavLink>
				<NavLink className="navigation__item navigation__item_logged" to="/saved-movies" aria-label="Перейти на страницу с сохраненными фильмами">
					<li>
						Сохраненные фильмы
					</li>
				</NavLink>
				<div className="navigation__account">
					<NavLink className="navigation__item navigation__item_logged" to="/profile" aria-label="Перейти на страницу редактирования аккаунта">
						<li>
							Аккаунт
						</li>
					</NavLink>
					<AccountIcon />
				</div>
			</ul>
		</nav>
	);
}

export default LoggedNavigation;
