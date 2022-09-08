import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import firstImagePath from '../../images/first-movie.png';
import secondImagePath from '../../images/second-movie.png';
import thirdImagePath from '../../images/third-movie.png';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ moreButtonShown }) {
	return (
		<section className="movies">
			<Preloader />
			<div className="movies__cards-container">
				<MovieCard
					name="33 слова о дизайне"
					link={firstImagePath}
					length="1ч 17м"
				/>
				<MovieCard
					name="Киноальманах «100 лет дизайна»"
					link={secondImagePath}
					length="1ч 17м"
				/>
				<MovieCard
					name="В погоне за Бенкси "
					link={thirdImagePath}
					length="1ч 17м"
				/>
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
