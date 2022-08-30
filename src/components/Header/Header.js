import React from 'react';
import Logo from '../Logo/Logo';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';

function Header({ isLoggedIn }) {
	return (
		<section className={isLoggedIn ? 'header header_transparent' : 'header'}>
			<Logo />
			{isLoggedIn ? <LoggedNavigation /> : <PromoNavigation />}
		</section>
	);
}

export default Header;
