import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ moviesList }) {
	return (
		<>
			<SearchSection />
			<MoviesCardList
				moreButtonShown={false}
				moviesList={moviesList}
			/>
		</>
	);
}

export default SavedMovies;
