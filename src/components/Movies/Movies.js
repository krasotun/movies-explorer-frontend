import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
	return (
		<>
			<SearchSection />
			<MoviesCardList
				moreButtonShown
			/>
		</>
	);
}

export default Movies;
