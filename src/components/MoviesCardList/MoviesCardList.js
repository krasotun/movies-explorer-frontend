import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import useScreenSize from '../../utils/ScreenSize';

function MoviesCardList({
	moreButtonShown, isLoading, moviesList, saveMovie, savedMoviesList, deleteMovie,
}) {
	const getMoviesIds = (array, id) => {
		const arr = [];
		array.forEach((item) => {
			arr.push(item.movieId);
		});
		return arr.indexOf(id) >= 0;
	};
	// eslint-disable-next-line consistent-return
	const getIdByMovieId = (array, id) => {
		if (array) {
			const filtered = array.filter((item) => item.movieId === id);
			return filtered[0]._id;
		}
	};
	const location = useLocation();
	const deleteMoviefromSearch = (id) => {
		deleteMovie(getIdByMovieId(savedMoviesList, id));
	};

	const screenSize = useScreenSize();
	console.log(screenSize);
	return (
		<section className="movies">
			{isLoading && <Preloader />}
			{moviesList.length === 0
				&& (
					<div div className="movies__error-container">
						<p className="movies__error-text">Ничего не найдено </p>
					</div>
				)}
			{moviesList.length > 0
				&& (
					<div className="movies__cards-container">
						{moviesList.map((item) => (
							<MovieCard
								saveMovie={saveMovie}
								deleteMovie={deleteMovie}
								deleteMoviefromSearch={deleteMoviefromSearch}
								data={item}
								key={item._id}
								isSaved={location.pathname === '/movies' ? getMoviesIds(savedMoviesList, item.id) : true}
							/>
						))}
					</div>
				)}
			{
				moreButtonShown
					? (
						<div className="movies__button-container">
							<Button
								type="more"
								label="Ещё"
							/>
						</div>
					)
					: (
						<div className="movies__divider" />
					)
			}

		</section>
	);
}

export default MoviesCardList;
