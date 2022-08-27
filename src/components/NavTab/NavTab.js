import React from 'react';

function NavTab() {
	const tabsArray = [
		{
			title: 'О проекте',
			link: '/',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 1,
		},
		{
			title: 'Технологии',
			link: '/',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 2,
		},
		{
			title: 'Студент',
			link: '/',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 3,
		},
	];

	const navTabContent = tabsArray.map((item) => (
		<li
			className={item.itemClassName}
			key={item.id}
		>
			<a
				className={item.linkClassName}
				href={item.link}
			>
				{item.title}
			</a>
		</li>
	));

	return (
		<section className="navigation-tab">
			<ul className="navigation-tab__list">
				{navTabContent}
			</ul>
		</section>
	);
}

export default NavTab;
