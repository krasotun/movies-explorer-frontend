import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../LogoImage/LogoImage';

function Logo() {
	return (
		<Link className="logo" to="/" aria-label="Перейти на главную страницу">
			<LogoImage />
		</Link>
	);
}

export default Logo;
