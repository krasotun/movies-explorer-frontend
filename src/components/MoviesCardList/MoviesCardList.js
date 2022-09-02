import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import firstImagePath from '../../images/first-movie.png';
import secondImagePath from '../../images/second-movie.png';
import thirdImagePath from '../../images/third-movie.png';
import Button from '../Button/Button';

function MoviesCardList({ moreButtonShown }) {
	const moreButtonMarkup = () => {
		if (moreButtonShown) {
			return (
				<div className="movies__button-container">
					<Button
						type="more"
						label="Ещё"
					/>
				</div>
			);
			// eslint-disable-next-line no-else-return
		} else {
			return (
				<div className="movies__divider" />
			);
		}
	};
	return (
		<section className="movies">
			<div className="movies__cards-container">
				{/* <Preloader /> */}
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
			{moreButtonMarkup()}
		</section>
	);
}

export default MoviesCardList;
