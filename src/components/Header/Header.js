import React from 'react';
import Logo from '../Logo/Logo';
import PromoNavigation from '../PromoNavigation/PromoNavigation';

function Header() {
	return (
		<section className="header">
			<Logo />
			<PromoNavigation />
		</section>
	);
}

export default Header;
