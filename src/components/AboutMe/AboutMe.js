import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {
	const studentName = 'Марат';
	const studentJob = 'Веб-разработчик, 40 лет';
	const studentDescription = 'Я живу в Ростове-на-Дону, закончил РГСУ в 2004г. Работаю веб-разработчиком в НПП ЮГПА, сектор разработки технологического ПО. Мы разрабатываем веб-приложения для Российских Железных Дорог и Московского метрополитена. Мои увлечения - тяжелая музыка, пешеходные прогулки, футбол (болею за Real Madrid).';
	const github = {
		title: 'Github',
		link: 'https://github.com/krasotun/',
	};
	return (
		<section className="student">
			<SectionTitle
				title="Студент"
			/>
			<div className="student__content">
				<div className="student-text-content">
					<h3 className="student__name">
						{studentName}
					</h3>
					<h4 className="student__job">
						{studentJob}
					</h4>
					<p className="student__description">
						{studentDescription}
					</p>
					<a className="student__github" href={github.link}>{github.title}</a>
				</div>
				<div className="student__photo" />
			</div>

		</section>
	);
}
export default AboutMe;
