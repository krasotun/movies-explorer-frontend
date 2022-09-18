import React from 'react';
import SearchSection from '../SearchSection/SearchSection';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
	moviesList, deleteMovie, toggleIsShortFilmsShown, isShortFilmsShown, onSubmit, searchRequest,
}) {
	return (
		<>
			<SearchSection
				toggleIsShortFilmsShown={toggleIsShortFilmsShown}
				isShortFilmsShown={isShortFilmsShown}
				onSubmit={onSubmit}
				searchRequest={searchRequest}
			/>
			<MoviesCardList
				moreButtonShown={false}
				moviesList={moviesList}
				deleteMovie={deleteMovie}
			/>
		</>
	);
}

export default SavedMovies;
