import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import MovieAddButton from '../MovieAddButton/MovieAddButton';
import MovieRemoveButton from '../MovieRemoveButton/MovieRemoveButton';
import getTrailerLink from '../../utils/getTrailerLink';
import useScreenSize from '../../utils/ScreenSize';

function MovieCard({
	data, saveMovie, isSaved, deleteMovie, deleteMoviefromSearch,
}) {
	const [isHovered, setIsHovered] = useState(false);
	const [isShown, setIsShown] = useState(isSaved);
	const location = useLocation();
	const toggleIsShown = () => {
		if (isShown) {
			setIsShown(false);
		} else if (!isShown) {
			setIsShown(true);
		}
	};
	const screenSize = useScreenSize();
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
		trailerLink: getTrailerLink(data),
		nameRU: data.nameRU || 'Нет данных',
		nameEN: data.nameEN || 'Нет данных',
		movieId: data.id,
		thumbnail: `${baseUrl}${data.image.url}`,
	});
	const toggleSaveMovie = () => {
		toggleIsShown();
		saveMovie(movieData);
	};
	const toggleDeleteMovie = () => {
		deleteMovie(data._id);
	};
	const toggleDeleteMoviefromSearch = () => {
		deleteMoviefromSearch(movieData.movieId);
		toggleIsShown();
	};

	return (
		<article className="movie-card" onMouseOver={setHover} onMouseLeave={removeHover} onFocus={setHover}>
			{(isShown && location.pathname === '/movies') && <Button onClick={toggleDeleteMoviefromSearch} type="movie-card_saved" label={(isHovered || screenSize.width <= 768) ? <MovieRemoveButton /> : <MovieAddButton />} />}
			{(location.pathname === '/saved-movies') && <Button onClick={toggleDeleteMovie} type="movie-card_saved" label={(isHovered || screenSize.width <= 768) && <MovieRemoveButton />} />}
			{(!isShown && isHovered) && <Button onClick={toggleSaveMovie} type="movie-card_save" label="Сохранить" />}
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
