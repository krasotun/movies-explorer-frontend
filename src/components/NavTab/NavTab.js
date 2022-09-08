import React from 'react';

function NavTab() {
	const tabsData = [
		{
			title: 'О проекте',
			link: '#about-project',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 1,
		},
		{
			title: 'Технологии',
			link: '#techs',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 2,
		},
		{
			title: 'Студент',
			link: '#student',
			itemClassName: 'navigation-tab__list-item',
			linkClassName: 'navigation-tab__list-link',
			id: 3,
		},
	];
	const navTabContent = tabsData.map((item) => (
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
