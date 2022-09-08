import React from 'react';
import ArrowLink from '../ArrowLink/ArrowLink';

function Portfolio() {
	const portfolioData = [
		{
			title: 'Статичный сайт',
			link: 'https://krasotun.github.io/how-to-learn/',
			id: 1,
		},
		{
			title: 'Адаптивный сайт',
			link: 'https://krasotun.github.io/russian-travel/',
			id: 2,
		},
		{
			title: 'Одностраничное приложение',
			link: 'https://krasotun.nomoredomains.sbs/',
			id: 3,
		},
	];
	const portfolioContent = portfolioData.map((item) => (
		<a className="portfolio__link" target="_blanc" href={item.link}>
			<li className="portfolio__item" key={item.id}>
				<p className="portfolio__text">
					{item.title}
				</p>
				<ArrowLink />
			</li>
		</a>
	));
	return (
		<section className="portfolio">
			<p className="portfolio__title">
				Портфолио
			</p>
			<ul className="portfolio__links">
				{portfolioContent}
			</ul>
		</section>
	);
}

export default Portfolio;
