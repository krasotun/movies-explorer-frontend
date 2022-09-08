import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
	const atriclesData = [
		{
			title: 'Дипломный проект включал 5 этапов',
			text: 'Составление плана, работу над бэкендом,вёрстку, добавление функциональности и финальные доработки.',
			id: 1,
		},
		{
			title: 'На выполнение диплома ушло 5 недель',
			text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
			id: 2,
		},
	];
	const articlesContent = atriclesData.map((item) => (
		<div
			className="about-project-article"
			key={item.id}
		>
			<h3 className="about-project-article__title">
				{item.title}
			</h3>
			<p className="about-project-article__text">
				{item.text}
			</p>
		</div>
	));
	return (
		<section className="about-project" id="about-project">
			<SectionTitle
				title="О проекте"
			/>
			<div className="about-project__articles-section">
				{articlesContent}
			</div>
			<div className="about-project-progress">
				<div className="about-project-progress__section about-project-progress__section_size_low">
					<p className="about-project-progress__text about-project-progress__text_color_green">
						1 неделя
					</p>
					<p className="about-project-progress__task">
						Back-end
					</p>
				</div>
				<div className="about-project-progress__section  about-project-progress__section_size_high">
					<p className="about-project-progress__text about-project-progress__text_color_gray">
						4 недели
					</p>
					<p className="about-project-progress__task">
						Front-end
					</p>

				</div>
			</div>
		</section>
	);
}

export default AboutProject;
