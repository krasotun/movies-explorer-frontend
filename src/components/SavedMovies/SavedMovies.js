import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ moviesList, deleteMovie }) {
	return (
		<>
			<SearchSection />
			<MoviesCardList
				moreButtonShown={false}
				moviesList={moviesList}
				deleteMovie={deleteMovie}
			/>
		</>
	);
}

export default SavedMovies;
