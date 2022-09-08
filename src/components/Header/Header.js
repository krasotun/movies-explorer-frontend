import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';
import Button from '../Button/Button';
import MenuIconOpen from '../MenuIconOpen/MenuIconOpen';

function Header({ isLoggedIn, onClick }) {
	const location = useLocation();

	return (
		<header className={(isLoggedIn && location.pathname !== '/') ? 'header header_transparent' : 'header'}>
			<Logo />
			{isLoggedIn ? <LoggedNavigation />
				: <PromoNavigation />}
			{isLoggedIn && (
				<Button
					onClick={onClick}
					type="menu-icon-open"
					label={<MenuIconOpen />}
				/>
			)}
		</header>
	);
}

export default Header;
