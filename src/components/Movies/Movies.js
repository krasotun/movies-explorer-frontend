import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
	isLoading, onSubmit,
	moviesList, toggleIsShortFilmsShown,
	isShortFilmsShown, searchRequest, saveMovie,
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
				moreButtonShown
				moviesList={moviesList}
				isLoading={isLoading}
				saveMovie={saveMovie}
			/>
		</>
	);
}

export default Movies;
