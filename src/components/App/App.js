import React from 'react';
import {
	Redirect, Route, Switch, useRouteMatch, useHistory,
} from 'react-router-dom';
import { auth } from '../../utils/Auth';
import { userInfo } from '../../utils/UserInfo';
import { movies } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrenUserContext';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../SideMenu/SideMenu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = React.useState(null);
	const [isNotFound, setIsNotFound] = React.useState(false);
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const [isInfoTipShown, setInfoTipShown] = React.useState(false);
	const [formErrorMessage, setFormErrorMessage] = React.useState('');
	const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', _id: '' });
	const [isLoading, setIsLoading] = React.useState(false);
	const [moviesArray, setMoviesArray] = React.useState([]);
	const [savedMoviesArray, setSavedMoviesArray] = React.useState([]);
	const [isShortFilmsShown, setIsShortFilmsShown] = React.useState(false);
	const [isSavedShortFilmsShown, setIsSavedShortFilmsShown] = React.useState(false);
	let firstMovies = JSON.parse(localStorage.getItem('firstMovies'));
	const isRequestSaved = () => {
		const request = localStorage.getItem('searchRequest');
		if (request) {
			return request;
		} return '';
	};
	const [searchRequest, setSearchRequest] = React.useState(isRequestSaved());
	const shortMoviesDuration = 40;
	const noHeaderShown = [
		'/signin',
		'/signup',
		'/404',
	];

	const noFooterShown = [
		'/signin',
		'/signup',
		'/profile',
		'/404',
	];
	const getSavedMovies = () => {
		const token = localStorage.getItem('jwt');
		if (token) {
			mainApi.getMovies(token)
				.then((res) => {
					setSavedMoviesArray(res);
				})
				.catch((err) => {
					console.log('Ошибка при загрузке своих фильмов', err);
				});
		}
	};

	const saveMovie = (data) => {
		const token = localStorage.getItem('jwt');
		mainApi.saveMovie(data, token)
			.then((savedMovie) => {
				const updatedSavedMovies = [...savedMoviesArray, savedMovie];
				setSavedMoviesArray(updatedSavedMovies);
			})
			.catch((err) => {
				console.log('Ошибка при сохранении фильма', err);
			});
	};

	const deleteMovie = (id) => {
		const token = localStorage.getItem('jwt');
		mainApi.deleteMovie(id, token)
			.then((deletedMovie) => {
				const updatedSavedMovies = savedMoviesArray.filter(
					(movie) => movie._id !== deletedMovie._id,
				);
				setSavedMoviesArray(updatedSavedMovies);
			})
			.catch((err) => {
				console.log('Ошибка при удалении фильма', err);
			});
	};

	const toggleIsSavedShortFilmsShown = () => {
		if (isSavedShortFilmsShown) {
			setIsSavedShortFilmsShown(false);
			localStorage.removeItem('savedShortMoviesChecked');
		} else {
			setIsSavedShortFilmsShown(true);
			localStorage.setItem('savedShortMoviesChecked', 'true');
		}
	};

	const filterBySymbols = (movie, symbols) => movie.nameRU.toLowerCase()
		.includes(symbols.toLowerCase());
	// const getMovies = () => {
	// 	// eslint-disable-next-line no-shadow
	// 	const firstMovies = JSON.parse(localStorage.getItem('firstMovies'));
	// 	if (!firstMovies) {
	// 		setIsLoading(true);
	// 		movies.getMovies()
	// 			.then((res) => {
	// 				localStorage.setItem('firstMovies', JSON.stringify(res));
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			})
	// 			.finally(() => {
	// 				setIsLoading(false);
	// 			});
	// 	}
	// };

	const handleMoviesSearch = async (search) => {
		// eslint-disable-next-line no-shadow
		if (!firstMovies) {
			setIsLoading(true);
			await movies.getMovies()
				.then((res) => {
					localStorage.setItem('firstMovies', JSON.stringify(res));
					firstMovies = JSON.parse(localStorage.getItem('firstMovies'));
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
		setIsNotFound(false);
		if (isShortFilmsShown) {
			const filtered = firstMovies.filter((movie) => filterBySymbols(movie, search));
			localStorage.setItem('extraMovies', JSON.stringify(filtered));
			const shortMovies = filtered.filter((movie) => movie.duration <= shortMoviesDuration);
			if (shortMovies.length === 0) {
				setIsNotFound(true);
			}
			localStorage.setItem('foundedMovies', JSON.stringify(shortMovies));
			setMoviesArray(shortMovies);
		}
		if (!isShortFilmsShown) {
			const filtered = firstMovies.filter((movie) => filterBySymbols(movie, search));
			if (filtered.length === 0) {
				setIsNotFound(true);
			}
			localStorage.setItem('foundedMovies', JSON.stringify(filtered));
			setMoviesArray(filtered);
		}
		localStorage.setItem('searchRequest', search);
		setSearchRequest(search);
	};
	const handleSavedMoviesSearch = (search) => {
		setIsNotFound(false);
		const token = localStorage.getItem('jwt');
		setIsLoading(true);
		mainApi.getMovies(token)
			.then((res) => {
				const filtered = res.filter((movie) => filterBySymbols(movie, search));
				if (isSavedShortFilmsShown) {
					localStorage.setItem('extraSavedMovies', JSON.stringify(filtered));
					const shortFiltered = filtered.filter((movie) => movie.duration <= shortMoviesDuration);
					if (shortFiltered.length === 0) {
						setIsNotFound(true);
					}
					setSavedMoviesArray(shortFiltered);
				} else setSavedMoviesArray(filtered);
				if (filtered.length === 0) {
					setIsNotFound(true);
				}
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const toggleIsShortFilmsShown = () => {
		if (isShortFilmsShown) {
			setIsShortFilmsShown(false);
			localStorage.removeItem('shortMoviesChecked');
		} else {
			setIsShortFilmsShown(true);
			localStorage.setItem('shortMoviesChecked', 'true');
		}
	};
	const toggleMenuShown = () => {
		if (isMenuShown) {
			setIsMenuShown(false);
		} else setIsMenuShown(true);
	};
	const handleEditUserInfo = (name, email) => {
		userInfo.setUserInfo(name, email)
			.then((res) => {
				setCurrentUser(res);
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при редактировании');
			});
	};

	const handleTokenCheck = () => {
		const token = localStorage.getItem('jwt');
		if (token) {
			auth.checkTokenValidity(token)
				.then((res) => {
					setIsLoggedIn(true);
					setCurrentUser(res);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const handleLogin = (email, password) => {
		auth.authorization(email, password)
			.then((res) => {
				localStorage.setItem('jwt', res.token);
				handleTokenCheck();
				history.push('/movies');
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при авторизации');
			});
	};
	const handleRegistration = (name, email, password) => {
		auth.registration(name, email, password)
			.then(() => {
				handleLogin(email, password);
			})
			.catch(() => {
				setInfoTipShown(true);
				setFormErrorMessage('Ошибка при регистрации');
			});
	};
	const handleSignOut = (evt) => {
		evt.preventDefault();
		setIsLoggedIn(false);
		localStorage.clear();
		setCurrentUser({});
		setSearchRequest('');
		setMoviesArray([]);
		history.push('/');
	};
	React.useEffect(() => {
		const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
		if (foundedMovies) {
			const filteredMovies = foundedMovies.filter((movie) => movie.duration <= shortMoviesDuration);
			const shortMoviesChecked = JSON.parse(localStorage.getItem('shortMoviesChecked'));
			const extraMovies = JSON.parse(localStorage.getItem('extraMovies'));
			if (extraMovies && !isShortFilmsShown) {
				setMoviesArray(extraMovies);
			} else if (isShortFilmsShown) {
				setMoviesArray(filteredMovies);
			} else setMoviesArray(foundedMovies);
			if (shortMoviesChecked) {
				setIsShortFilmsShown(true);
			}
		} else setMoviesArray([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShortFilmsShown]);
	React.useEffect(() => {
		const filteredMovies = savedMoviesArray
			.filter((movie) => movie.duration <= shortMoviesDuration);
		const savedShortMoviesChecked = JSON.parse(localStorage.getItem('savedShortMoviesChecked'));
		const extraSavedMovies = JSON.parse(localStorage.getItem('extraSavedMovies'));
		if (extraSavedMovies && !isSavedShortFilmsShown) {
			setSavedMoviesArray(extraSavedMovies);
		} else if (isSavedShortFilmsShown) {
			setSavedMoviesArray(filteredMovies);
		} else {
			setSavedMoviesArray(savedMoviesArray);
		}
		if (savedShortMoviesChecked) {
			setIsSavedShortFilmsShown(true);
		} else getSavedMovies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSavedShortFilmsShown]);
	React.useEffect(() => {
		getSavedMovies();
		handleTokenCheck();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);
	return (
		<div className="app">
			<CurrentUserContext.Provider value={currentUser}>
				{useRouteMatch(noHeaderShown)
					? null
					: (<Header onClick={toggleMenuShown} isLoggedIn={isLoggedIn} />)}
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						path="/saved-movies"
						component={SavedMovies}
						toggleIsShortFilmsShown={toggleIsSavedShortFilmsShown}
						moviesList={savedMoviesArray}
						deleteMovie={deleteMovie}
						isShortFilmsShown={isSavedShortFilmsShown}
						onSubmit={handleSavedMoviesSearch}
						isNotFound={isNotFound}
						getSavedMovies={getSavedMovies}
					/>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						isLoading={isLoading}
						onSubmit={handleMoviesSearch}
						path="/movies"
						component={Movies}
						savedMoviesList={savedMoviesArray}
						moviesList={moviesArray}
						toggleIsShortFilmsShown={toggleIsShortFilmsShown}
						isShortFilmsShown={isShortFilmsShown}
						searchRequest={searchRequest}
						saveMovie={saveMovie}
						deleteMovie={deleteMovie}
						isNotFound={isNotFound}
					/>
					<Route path="/signin">
						{isLoggedIn
							? <Redirect to="/" />
							: (
								<Login
									onLogin={handleLogin}
									isInfoTipShown={isInfoTipShown}
									formErrorMessage={formErrorMessage}
								/>
							)}
					</Route>
					<Route path="/signup">
						{isLoggedIn
							? <Redirect to="/" />
							: (
								<Register
									onRegistration={handleRegistration}
									isInfoTipShown={isInfoTipShown}
									formErrorMessage={formErrorMessage}
								/>
							)}
					</Route>
					<ProtectedRoute
						path="/profile"
						isLoggedIn={isLoggedIn}
						component={Profile}
						onEditUserInfo={handleEditUserInfo}
						isInfoTipShown={isInfoTipShown}
						formErrorMessage={formErrorMessage}
						signOut={handleSignOut}
					/>
					<Route path="/404">
						<NotFoundPage />
					</Route>
					<Redirect to="/404" />
				</Switch>
				{useRouteMatch(noFooterShown) ? null : (<Footer />)}
				{isMenuShown && <SideMenu onClick={toggleMenuShown} />}
			</CurrentUserContext.Provider>
		</div>
	);
}
export default App;
