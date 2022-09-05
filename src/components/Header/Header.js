import React from 'react';
import Logo from '../Logo/Logo';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';
import Button from '../Button/Button';
import MenuIconOpen from '../MenuIconOpen/MenuIconOpen';

function Header({ isLoggedIn, onClick }) {
	return (
		<section className={isLoggedIn ? 'header header_transparent' : 'header'}>
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
		</section>
	);
}

export default Header;
