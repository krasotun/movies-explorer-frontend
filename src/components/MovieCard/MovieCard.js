import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import MovieAddButton from '../MovieAddButton/MovieAddButton';
import MovieRemoveButton from '../MovieRemoveButton/MovieRemoveButton';
// import { CurrentUserContext } from '../../contexts/CurrenUserContext';

function MovieCard({ data, saveMovie }) {
	const [isOwn, setisOwn] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	// const currentUser = React.useContext(CurrentUserContext);
	const location = useLocation();

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
	const baseUrl = 'https://api.nomoreparties.co';
	const setHover = () => setIsHovered(true);

	const removeHover = () => setIsHovered(false);

	// eslint-disable-next-line no-unused-vars
	const [movieData, setMovieData] = React.useState({
		country: data.country || 'Нет данных',
		description: data.description || 'Нет данных',
		director: data.director || 'Нет данных',
		duration: data.duration || 0,
		year: data.year || 'Нет данных',
		image: `${baseUrl}${data.image.url}`,
		trailerLink: data.trailerLink,
		nameRU: data.nameRU || 'Нет данных',
		nameEN: data.nameEN || 'Нет данных',
		movieId: data.id,
		thumbnail: `${baseUrl}${data.image.url}`,
	});
	const toggleSaveMovie = () => {
		saveMovie(movieData);
	};

	return (
		<article key={data.id} className="movie-card" onMouseOver={setHover} onMouseLeave={removeHover} onFocus={setHover}>
			{isOwn && <Button onClick={toggleIsOwn} type="movie-card_saved" label={isHovered ? <MovieRemoveButton /> : <MovieAddButton />} />}
			{(!isOwn && isHovered) && <Button onClick={toggleSaveMovie} type="movie-card_save" label="Сохранить" />}
			<a className="movie-card__link" href={data.trailerLink} target="_blanc">
				<img className="movie-card__image" src={location.pathname === '/saved-movies' ? data.image : movieData.image} alt={data.nameRU} />
			</a>
			<div className="movie-card__text-container">
				<p className="movie-card__title">
					{data.nameRU}
				</p>
				<span className="movie-card__length">{timeConverter(data.duration)}</span>
			</div>
		</article>
	);
}

export default MovieCard;
