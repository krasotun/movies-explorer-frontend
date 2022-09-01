import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import firstImagePath from '../../images/first-movie.png';

function MoviesCardList() {
	return (
		<section className="movies">
			{/* <Preloader /> */}
			<MovieCard
				name="33 слова о дизайне"
				link={firstImagePath}
				length="1ч 17м"
			/>
		</section>
	);
}

export default MoviesCardList;
