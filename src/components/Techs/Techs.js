import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {
	const techsTitle = '7 технологий';
	const techsDesc = 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.';
	const techListData = [
		{
			title: 'HTML',
			id: 1,
		},
		{
			title: 'CSS',
			id: 2,
		},
		{
			title: 'JS',
			id: 3,
		},
		{
			title: 'React',
			id: 4,
		},
		{
			title: 'Git',
			id: 5,
		},
		{
			title: 'Express.js',
			id: 6,
		},
		{
			title: 'mongoDB',
			id: 7,
		},
	];
	const techListContent = techListData.map((item) => (
		<li className="techs-list__item" key={item.id}>
			{item.title}
		</li>
	));
	return (
		<section className="techs" id="techs">
			<SectionTitle
				title="Технологии"
			/>
			<div className="techs__content-block">
				<h2 className="techs__title">
					{techsTitle}
				</h2>
				<p className="techs__description">
					{techsDesc}
				</p>
				<div>
					<ul className="techs-list">
						{techListContent}
					</ul>
				</div>
			</div>
		</section>
	);
}

export default Techs;
