import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
	isLoading, onSubmit,
	moviesList, toggleIsShortFilmsShown,
	isShortFilmsShown,
}) {
	return (
		<>
			<SearchSection
				onSubmit={onSubmit}
				toggleIsShortFilmsShown={toggleIsShortFilmsShown}
				isShortFilmsShown={isShortFilmsShown}
			/>
			<MoviesCardList
				moreButtonShown
				moviesList={moviesList}
				isLoading={isLoading}
			/>
		</>
	);
}

export default Movies;
