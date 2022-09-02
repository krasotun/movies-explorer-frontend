import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
	return (
		<>
			<SearchSection />
			<MoviesCardList
				moreButtonShown={false}
			/>
		</>
	);
}

export default SavedMovies;
