import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ moreButtonShown, isLoading, moviesList }) {
	return (
		<section className="movies">
			{isLoading && <Preloader />}
			<div className="movies__cards-container">
				{moviesList.map((item) => <MovieCard data={item} />)}
			</div>
			{moreButtonShown
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
				)}

		</section>
	);
}

export default MoviesCardList;
