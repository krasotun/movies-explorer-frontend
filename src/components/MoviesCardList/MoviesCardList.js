import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import useScreenSize from '../../utils/ScreenSize';

function MoviesCardList({
	isLoading, moviesList, saveMovie, savedMoviesList, deleteMovie, isNotFound,
}) {
	// eslint-disable-next-line no-unused-vars
	const [renderedMoviesArray, setRenderedMoviesArray] = React.useState([]);
	const [moreButtonShown, setMoreButtonShown] = React.useState(false);
	const [moviesToRender, setMoviesToRender] = React.useState(0);
	const [moviesToAdd, setMoviesToAdd] = React.useState(0);
	const screenSize = useScreenSize();
	const location = useLocation();

	const screenSizeToRender = {
		large: 1280,
		medium: 1279,
		small: 320,
	};
	const numberMoviesToRender = {
		large: 12,
		medium: 8,
		small: 5,
	};
	const numberMoviesToAdd = {
		large: 3,
		medium: 2,
	};

	const countRenderedMovies = () => {
		if (screenSize.width >= screenSizeToRender.large) {
			setMoviesToRender(numberMoviesToRender.large);
			setMoviesToAdd(numberMoviesToAdd.large);
		} else if (screenSize.width < screenSizeToRender.large
			&& screenSize.width >= screenSizeToRender.medium) {
			setMoviesToRender(numberMoviesToRender.medium);
			setMoviesToAdd(numberMoviesToAdd.medium);
		} else if (screenSize.width < screenSizeToRender.medium
			&& screenSize.width >= screenSizeToRender.small) {
			setMoviesToRender(numberMoviesToRender.small);
			setMoviesToAdd(numberMoviesToAdd.medium);
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
			{isNotFound
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
								savedMoviesList={savedMoviesList}
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
