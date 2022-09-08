import React, { useState } from 'react';
import Button from '../Button/Button';
// import firstImagePath from '../../images/first-movie.png';
import MovieAddButton from '../MovieAddButton/MovieAddButton';
import MovieRemoveButton from '../MovieRemoveButton/MovieRemoveButton';

function MovieCard({ name, link, length }) {
	const [isOwn, setisOwn] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const toggleIsOwn = () => {
		if (isOwn) {
			setisOwn(false);
		} else setisOwn(true);
	};

	const setHover = () => setIsHovered(true);

	const removeHover = () => setIsHovered(false);

	return (
		<article className="movie-card" onMouseOver={setHover} onMouseLeave={removeHover} onFocus={setHover}>
			{isOwn && <Button onClick={toggleIsOwn} type="movie-card_saved" label={isHovered ? <MovieRemoveButton /> : <MovieAddButton />} />}
			{(!isOwn && isHovered) && <Button onClick={toggleIsOwn} type="movie-card_save" label="Сохранить" />}
			<img className="movie-card__image" src={link} alt="33 слова о дизайне" />
			<div className="movie-card__text-container">
				<p className="movie-card__title">
					{name}
				</p>
				<span className="movie-card__length">{length}</span>
			</div>
		</article>
	);
}

export default MovieCard;
