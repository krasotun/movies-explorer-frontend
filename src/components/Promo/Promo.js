import React from 'react';

const promoTitle = 'Учебный проект студента факультета Веб-разработки.';

function Promo() {
	return (
		<section className="promo">
			<h1 className="promo__title">{promoTitle}</h1>
		</section>
	);
}

export default Promo;
