import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isLoading, onSubmit, moviesList }) {
	return (
		<>
			<SearchSection
				onSubmit={onSubmit}
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
