import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
	isLoading, onSubmit,
	moviesList, toggleIsShortFilmsShown,
	isShortFilmsShown, searchRequest, saveMovie, savedMoviesList, deleteMovie,
}) {
	return (
		<>
			<SearchSection
				onSubmit={onSubmit}
				toggleIsShortFilmsShown={toggleIsShortFilmsShown}
				isShortFilmsShown={isShortFilmsShown}
				searchRequest={searchRequest}
			/>
			<MoviesCardList
				moviesList={moviesList}
				savedMoviesList={savedMoviesList}
				isLoading={isLoading}
				saveMovie={saveMovie}
				deleteMovie={deleteMovie}
			/>
		</>
	);
}

export default Movies;
