import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
	moreButtonShown, isLoading, moviesList, saveMovie, savedMoviesList,
}) {
	const getMoviesIds = (array, id) => {
		const arr = [];
		array.forEach((item) => {
			arr.push(item.movieId);
		});
		return arr.indexOf(id) >= 0;
	};
	const location = useLocation();
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
								data={item}
								key={item.id}
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
