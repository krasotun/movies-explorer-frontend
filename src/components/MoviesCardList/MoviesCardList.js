import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
	return (
		<section className="movies">
			{/* <Preloader /> */}
			<MoviesCard />
		</section>
	);
}

export default MoviesCardList;
