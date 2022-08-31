import React from 'react';
import Button from '../Button/Button';
import firstImagePath from '../../images/first-movie.png';

function MoviesCard() {
	return (
		<article className="movie-card">
			<Button
				type="movie-card"
				label="Сохранить"
			/>
			<img className="movie-card__image" alt="33 слова о дизайне" src={firstImagePath} />
			<div className="movie-card__text-container">
				<p className="movie-card__title"> 33 слова о дизайне</p>
				<span className="movie-card__length">1ч 17м</span>
			</div>
		</article>
	);
}

export default MoviesCard;
