import React from 'react';

function Footer() {
	const currentYear = new Date().getFullYear();
	const footerTitle = 'Учебный проект Яндекс.Практикум х BeatFilm.';
	return (
		<footer className="footer">
			<p className="footer__title">{footerTitle}</p>
			<div className="footer__content-block">
				<p className="footer__text">
					{`(c) ${currentYear}`}
				</p>
				<div className="footer__links">
					<a className="footer__text" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
					<a className="footer__text" href="https://github.com/krasotun/">Github</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
