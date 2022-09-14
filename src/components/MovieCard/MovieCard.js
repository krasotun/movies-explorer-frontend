import React, { useState } from 'react';
import Button from '../Button/Button';
// import firstImagePath from '../../images/first-movie.png';
import MovieAddButton from '../MovieAddButton/MovieAddButton';
import MovieRemoveButton from '../MovieRemoveButton/MovieRemoveButton';
import { CurrentUserContext } from '../../contexts/CurrenUserContext';

function MovieCard({ data }) {
	const [isOwn, setisOwn] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const currentUser = React.useContext(CurrentUserContext);

	console.log(currentUser._id);
	const toggleIsOwn = () => {
		if (isOwn) {
			setisOwn(false);
		} else setisOwn(true);
	};

	const timeConverter = (duration) => {
		const hours = Math.floor(duration / 60);
		const minutes = Math.floor(duration % 60);
		return `${hours}ч ${minutes}м`;
	};

	const setHover = () => setIsHovered(true);

	const removeHover = () => setIsHovered(false);

	// eslint-disable-next-line no-unused-vars
	const [movieData, setMovieData] = React.useState({
		country: data.country || 'Нет данных',
		director: data.director || 'Нет данных',
		duration: data.duration || 0,
		year: data.year || 'Нет данных',
		description: data.description || 'Нет данных',
		image: `https://api.nomoreparties.co/${data.image.url}`,
		trailer: data.trailerLink,
		nameRU: data.nameRU || 'Нет данных',
		nameEN: data.nameEN || 'Нет данных',
		movieId: data.id,
		thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
	});

	return (
		<article key={data.id} className="movie-card" onMouseOver={setHover} onMouseLeave={removeHover} onFocus={setHover}>
			{isOwn && <Button onClick={toggleIsOwn} type="movie-card_saved" label={isHovered ? <MovieRemoveButton /> : <MovieAddButton />} />}
			{(!isOwn && isHovered) && <Button onClick={toggleIsOwn} type="movie-card_save" label="Сохранить" />}
			<a className="movie-card__link" href={movieData.trailer} target="_blanc">
				<img className="movie-card__image" src={movieData.image} alt={movieData.nameRU} />
			</a>
			<div className="movie-card__text-container">
				<p className="movie-card__title">
					{movieData.nameRU}
				</p>
				<span className="movie-card__length">{timeConverter(movieData.duration)}</span>
			</div>
		</article>
	);
}

export default MovieCard;
