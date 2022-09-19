import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import useScreenSize from '../../utils/ScreenSize';

function MoviesCardList({
	isLoading, moviesList, saveMovie, savedMoviesList, deleteMovie,
}) {
	// eslint-disable-next-line no-unused-vars
	const [renderedMoviesArray, setRenderedMoviesArray] = React.useState([]);
	const [moreButtonShown, setMoreButtonShown] = React.useState(false);
	const [moviesToRender, setMoviesToRender] = React.useState(0);
	const [moviesToAdd, setMoviesToAdd] = React.useState(0);
	const screenSize = useScreenSize();
	const location = useLocation();

	const screenSizeToRender = {
		large: 1024,
		medium: 768,
		small: 320,
	};

	const countRenderedMovies = () => {
		if (screenSize.width >= screenSizeToRender.large) {
			setMoviesToRender(12);
			setMoviesToAdd(3);
		} else if (screenSize.width < screenSizeToRender.large
			&& screenSize.width >= screenSizeToRender.medium) {
			setMoviesToRender(8);
			setMoviesToAdd(2);
		} else if (screenSize.width < screenSizeToRender.medium
			&& screenSize.width >= screenSizeToRender.small) {
			setMoviesToRender(5);
			setMoviesToAdd(2);
		}
	};
	React.useEffect(() => {
		countRenderedMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [screenSize.width]);

	React.useEffect(() => {
		if (location.pathname === '/movies') {
			setRenderedMoviesArray(moviesList.slice(0, moviesToRender));
			if (moviesList.length <= moviesToRender) {
				setMoreButtonShown(false);
			} else {
				setMoreButtonShown(true);
			}
		} else if (location.pathname === '/saved-movies') {
			setRenderedMoviesArray(moviesList);
			setMoreButtonShown(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [moviesList, moviesToRender]);

	const handleShowMoreButtonClick = () => {
		setRenderedMoviesArray(moviesList.slice(0, renderedMoviesArray.length + moviesToAdd));
		if (renderedMoviesArray.length >= moviesList.length - moviesToAdd) {
			setMoreButtonShown(false);
		}
	};

	const getMoviesIds = (array, id) => {
		const arr = [];
		array.forEach((item) => {
			arr.push(item.movieId);
		});
		return arr.indexOf(id) >= 0;
	};
	// eslint-disable-next-line consistent-return
	const getIdByMovieId = (array, id) => {
		if (array) {
			const filtered = array.filter((item) => item.movieId === id);
			return filtered[0]._id;
		}
	};

	const deleteMoviefromSearch = (id) => {
		deleteMovie(getIdByMovieId(savedMoviesList, id));
	};
	return (
		<section className="movies">
			{isLoading && <Preloader />}
			{moviesList.length === 0
				&& (
					<div div className="movies__error-container">
						<p className="movies__error-text">Ничего не найдено </p>
					</div>
				)}
			{moviesList.length > 0
				&& (
					<div className="movies__cards-container">
						{renderedMoviesArray.map((item) => (
							<MovieCard
								saveMovie={saveMovie}
								deleteMovie={deleteMovie}
								deleteMoviefromSearch={deleteMoviefromSearch}
								data={item}
								key={item.id || item._id}
								isSaved={location.pathname === '/movies' ? getMoviesIds(savedMoviesList, item.id) : true}
							/>
						))}
					</div>
				)}
			{(moreButtonShown && location.pathname === '/movies')
				&& (
					<div className="movies__button-container">
						<Button
							onClick={handleShowMoreButtonClick}
							type="more"
							label="Ещё"
						/>
					</div>
				)}
			<div className="movies__divider" />
		</section>
	);
}

export default MoviesCardList;
