import React from 'react';
import Button from '../Button/Button';
import LoggedNavigation from '../LoggedNavigation/LoggedNavigation';
import MenuIconClose from '../MenuIconClose/MenuIconClose';

function SideMenu({ onClick }) {
	return (
		<section className="side-menu">
			<span className="side-menu__close">
				<Button
					onClick={onClick}
					type="menu-icon-close"
					label={<MenuIconClose />}
				/>
			</span>
			<div className="side-menu__navigation-container">
				<LoggedNavigation
					vertical
				/>
			</div>
		</section>
	);
}

export default SideMenu;
