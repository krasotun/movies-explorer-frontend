import React from 'react';
import Logo from '../Logo/Logo';
import PromoNavigation from '../PromoNavigation/PromoNavigation';
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';

function Header({ isLoggedIn, onClick }) {
	return (
		<section className={isLoggedIn ? 'header header_transparent' : 'header'}>
			<Logo />
			{isLoggedIn ? <LoggedNavigation onClick={onClick} /> : <PromoNavigation />}
		</section>
	);
}

export default Header;
