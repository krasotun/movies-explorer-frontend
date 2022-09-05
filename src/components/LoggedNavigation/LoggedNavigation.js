import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountIcon from '../AccountIcon/AccountIcon';

function LoggedNavigation({ vertical }) {
	return (
		<nav className={vertical ? 'navigation navigation_vertical' : 'navigation'}>
			<ul className={vertical ? 'navigation__list navigation__list_vertical' : 'navigation__list navigation__list_logged'}>
				<div className={vertical ? 'navigation__links navigation__links_vertical' : 'navigation__links'}>
					{vertical && (
						<NavLink className="navigation__item navigation__item_logged" to="/" aria-label="Перейти на главную страницу">
							<li>
								Главная
							</li>
						</NavLink>
					)}
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
				</div>
				<div className={vertical ? 'navigation__account navigation__account_vertical' : 'navigation__account'}>
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
